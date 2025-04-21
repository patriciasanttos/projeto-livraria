import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateItemBody from './dtos/create-item';
import UpdateItemBody from './dtos/update-item';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Prisma } from '@prisma/client';
import { CategoriesService } from 'src/categories/categories.service';

interface IHandleUpdateImages {
  tx: Prisma.TransactionClient;
  itemId: number;
  images: {
    image_1?: Express.Multer.File;
    image_2?: Express.Multer.File;
    image_3?: Express.Multer.File;
  };
  mainImage?: number;
}

@Injectable()
export class ItemsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService,
    private readonly supabase: SupabaseService,
  ) {}

  async getAll() {
    const items = await this.prisma.item.findMany({
      include: {
        categories: true,
        images: true,
      },
    });

    return items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item?.description,
      price: item.price,
      available: item.available,
      mainImage: item.images.find((img) => img.isMain)?.url ?? null,
      gallery: item.images.map((img) => img.url),
      mainCategory: item.mainCategory,
      categories: item.categories.map((category) => ({
        id: category.id,
        name: category.name,
      })),
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  }

  async getAllAvailables() {
    return await this.prisma.item.findMany({
      where: {
        available: true,
      },
      include: {
        categories: true,
        images: true,
      },
    });
  }

  async getById(itemId: number) {
    const item = await this.prisma.item.findUnique({
      where: { id: itemId },
      include: {
        images: true,
        categories: true,
      },
    });

    if (!item)
      throw new HttpException(
        { message: 'Item not found' },
        HttpStatus.NOT_FOUND,
      );

    return item;
  }

  async create(data: CreateItemBody) {
    return await this.prisma.$transaction(async (tx) => {
      const allCategories = await tx.category.findMany();

      const mainCategory = allCategories.find(
        (category) =>
          category.name.toLowerCase() === data.main_category.toLowerCase(),
      );
      if (!mainCategory)
        throw new HttpException(
          { message: 'Main category not found' },
          HttpStatus.NOT_FOUND,
        );

      const item = await tx.item.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          mainCategory: mainCategory.name,
          categories: {
            connect: {
              id: mainCategory.id,
            },
          },
        },
      });

      const images = [data.image_1, data.image_2, data.image_3].filter(Boolean);

      for (let image of images) {
        if (!image) continue;

        const path = `${item.id}/${image.fieldname}`;
        const url = await this.supabase.uploadImage(
          'products',
          image.buffer,
          path,
          image.mimetype,
          'image',
        );

        const isMainImage =
          images.length > 1
            ? images.indexOf(image) === Number(data.main_image)
            : true;

        if (isMainImage)
          await tx.itemImage.updateMany({
            where: { itemId: item.id },
            data: { isMain: false },
          });

        await tx.itemImage.create({
          data: {
            url,
            isMain: isMainImage,
            itemId: item.id,
          },
        });
      }

      return item;
    });
  }

  private async handleUpdateImages({
    tx,
    itemId,
    images,
    mainImage,
  }: IHandleUpdateImages) {
    let imagesInDb = await tx.itemImage.findMany({
      where: { itemId: Number(itemId) },
    });

    for (let [newImageKey, newImage] of Object.entries(images)) {
      if (!newImage) continue;

      const existingImage = imagesInDb.find((img) =>
        img.url.includes(newImageKey),
      );

      if (!existingImage) {
        const newPath = `${itemId}/${newImageKey}`;

        const publicUrl = await this.supabase.uploadImage(
          'products',
          newImage.buffer,
          newPath,
          newImage.mimetype,
          'image',
        );

        await tx.itemImage.create({
          data: {
            itemId,
            url: publicUrl,
            isMain: false,
          },
        });
      } else {
        const url = new URL(existingImage.url);
        const path = decodeURIComponent(
          url.pathname.replace('/storage/v1/object/public/products', ''),
        );

        await this.supabase.uploadImage(
          'products',
          newImage.buffer,
          path!,
          newImage.mimetype,
          'image',
        );

        await tx.itemImage.update({
          where: { id: existingImage.id },
          data: { updated_at: new Date() },
        });
      }
    }

    console.log(mainImage);

    if (mainImage !== undefined && mainImage !== null) {
      const mainImageKey = `image_${mainImage}`;

      const mainImageInDb = await tx.itemImage.findFirst({
        where: {
          itemId,
          url: {
            contains: mainImageKey,
          },
        },
      });

      if (!mainImageInDb)
        throw new HttpException(
          { message: 'Main image not found' },
          HttpStatus.BAD_REQUEST,
        );

      await tx.itemImage.updateMany({
        where: { itemId },
        data: { isMain: false },
      });

      await tx.itemImage.update({
        where: { id: mainImageInDb.id },
        data: { isMain: true },
      });
    }

    return;
  }

  async update(data: UpdateItemBody) {
    const item = await this.getById(Number(data.id));

    await this.prisma.$transaction(async (tx) => {
      let mainCategory: any;

      if (data.main_category) {
        const allCategories = await tx.category.findMany();

        const mainCategory = allCategories.find(
          (category) =>
            category.name.toLowerCase() === data.main_category!.toLowerCase(),
        );
        if (!mainCategory)
          throw new HttpException(
            { message: 'Main category not found' },
            HttpStatus.NOT_FOUND,
          );

        await tx.item.update({
          where: {
            id: item.id,
          },
          data: {
            mainCategory: mainCategory?.name || item.mainCategory,
            categories: {
              connect: {
                id: mainCategory.id,
              },
            },
          },
        });
      }

      await tx.item.update({
        where: {
          id: item.id,
        },
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          available: data.available,
          mainCategory: mainCategory?.name || item.mainCategory,
        },
      });

      const images = {
        image_1: data?.image_1,
        image_2: data?.image_2,
        image_3: data?.image_3,
      };

      const hasImagesChanges = Object.values(images).some((value) => value);

      if (hasImagesChanges || data.main_image)
        await this.handleUpdateImages({
          tx,
          itemId: item.id,
          images,
          mainImage: data.main_image ? Number(data.main_image) : undefined,
        });
    });

    return item;
  }

  async delete(itemId: number) {
    const item = await this.getById(itemId);

    if (item.images.length > 0) {
      const imagePaths = item.images.map((img) => {
        const url = new URL(img.url);
        const path = decodeURIComponent(
          url.pathname.replace('/storage/v1/object/public/products/', ''),
        );
        return path;
      });
  
      await this.supabase.deleteImages('products', imagePaths);
    }

    return await this.prisma.$transaction(async (tx) => {
      await tx.item.update({
        where: {
          id: itemId,
        },
        data: {
          categories: {
            set: [],
          },
        },
      });

      await tx.itemImage.deleteMany({
        where: { itemId: itemId },
      });
      console.log(item)
      await tx.item.delete({ where: { id: itemId } });

      return { message: 'Item deleted successfully' };
    });
  }
}
