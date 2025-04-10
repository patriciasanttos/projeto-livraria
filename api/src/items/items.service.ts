import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateItemBody from './dtos/create-item';
import UpdateItemBody from './dtos/update-item';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Prisma } from '@prisma/client';

interface IHandleUpdateImages {
  tx: Prisma.TransactionClient;
  itemId: number;
  images: Array<Express.Multer.File>;
  oldImages: Array<string>;
  mainImage?: string;
}

@Injectable()
export class ItemsService {
  constructor(
    private readonly prisma: PrismaService,
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
      const item = await tx.item.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
        },
      });

      const images = [data.image_1, data.image_2, data.image_3].filter(Boolean);

      for (let image of images) {
        if (!image) continue;

        const path = `${item.id}/image_${images.indexOf(image) + 1}`;
        const url = await this.supabase.uploadImage(
          'products',
          image.buffer,
          path,
          image.mimetype,
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

  async update(data: UpdateItemBody) {
    const item = await this.getById(Number(data.id));

    await this.prisma.$transaction(async (tx) => {
      await tx.item.update({
        where: {
          id: item.id,
        },
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          available: data.available,
        },
      });

      const images = [data.image_1, data.image_2, data.image_3].filter(
        (img): img is Express.Multer.File => Boolean(img),
      );
      const oldImages = [
        data.old_image_1,
        data.old_image_2,
        data.old_image_3,
      ].filter((img): img is string => Boolean(img));

      if (images.length > 0 || data.main_image)
        await this.handleUpdateImages({
          tx,
          itemId: item.id,
          images,
          oldImages,
          mainImage: data.main_image,
        });
    });

    return item;
  }

  private async handleUpdateImages({
    tx,
    itemId,
    images,
    oldImages,
    mainImage,
  }: IHandleUpdateImages) {
    let imagesInDb = await tx.itemImage.findMany({
      where: { itemId: Number(itemId) },
    });

    for (let i = 0; i < images.length; i++) {
      const newImage = images[i];
      const oldImage = oldImages[i];

      if (!newImage) continue;

      if (imagesInDb.length >= 3 && !oldImage)
        throw new HttpException(
          { message: 'Image limit reached. You can only have 3 images.' },
          HttpStatus.BAD_REQUEST,
        );

      if (oldImage) {
        const imageToUpdate = imagesInDb.find((img) => img.url === oldImage);
        if (!imageToUpdate)
          throw new HttpException(
            { message: 'Invalid image url' },
            HttpStatus.BAD_REQUEST,
          );

        const oldImageUrlFormated = new URL(oldImage!);
        const oldImagePath = decodeURIComponent(
          oldImageUrlFormated.pathname.replace(
            '/storage/v1/object/public/products',
            '',
          ),
        );

        await this.supabase.uploadImage(
          'products',
          newImage.buffer,
          oldImagePath!,
          newImage.mimetype,
        );

        await tx.itemImage.update({
          where: { id: imageToUpdate.id },
          data: { updated_at: new Date() },
        });
      } else {
        const newPath = `${itemId}/image_${i + 1}`;

        const publicUrl = await this.supabase.uploadImage(
          'products',
          newImage.buffer,
          newPath,
          newImage.mimetype,
        );

        await tx.itemImage.create({
          data: {
            itemId,
            url: publicUrl,
            isMain: false,
          },
        });
      }
    }

    const updated_at = new Date();

    if (mainImage) {
      const imageExists = imagesInDb.find((img) => img.url === mainImage);
      if (!imageExists)
        throw new HttpException(
          { message: 'Main image not found' },
          HttpStatus.BAD_REQUEST,
        );

      await tx.itemImage.updateMany({
        where: { itemId },
        data: { isMain: false },
      });

      await tx.itemImage.update({
        where: { url: mainImage },
        data: { isMain: true, updated_at },
      });
    }

    await tx.itemImage.updateMany({
      where: { itemId },
      data: { updated_at },
    });
  }

  async delete(itemId: number) {
    const item = await this.getById(itemId);

    const imagePaths = item.images.map((img) => {
      const url = new URL(img.url);
      const path = decodeURIComponent(
        url.pathname.replace('/storage/v1/object/public/products/', ''),
      );
      return path;
    });

    await this.supabase.deleteImages('products', imagePaths);

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

      await tx.item.delete({ where: { id: item.id } });

      return { message: 'Item deleted successfully' };
    });
  }
}
