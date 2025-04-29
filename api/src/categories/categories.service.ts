import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import CreateCategoryBody from "./dtos/create-category";
import UpdateCategoryBody from "./dtos/update-category";
import { ItemsService } from "src/items/items.service";
import { SupabaseService } from "src/supabase/supabase.service";

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly itemsService: ItemsService,
    private readonly supabase: SupabaseService
  ) {}

  async getAll({ availableCategories }: { availableCategories: boolean }) {
    let queryData = {
      where: {},
      select: {
        id: true,
        name: true,
        available: true,
        image: true,
        banner: true,

        items: {
          where: {},
          select: {
            id: true,
            name: true,
            price: true,
            description: true,
            available: true,
            mainCategory: true,

            images: {
              select: {
                id: true,
                url: true,
                isMain: true,
                itemId: true,
              },
            },
          },
        },
      },
    };

    if (availableCategories) {
      queryData.where = {
        available: true,
      };

      queryData.select.items.where = {
        available: true,
      };
    }

    return await this.prisma.category.findMany(queryData);
  }

  async getById(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category)
      throw new HttpException(
        { message: "Category not found" },
        HttpStatus.NOT_FOUND
      );

    return category;
  }

  async create(data: CreateCategoryBody) {
    let category = await this.prisma.category.create({
      data: {
        name: data.name,
        available: data.available,
      },
    });

    if (data.image) {
      if (!Buffer.isBuffer(data.image.buffer)) {
        console.error("Invalid image buffer");
        throw new Error("Invalid image buffer");
      }

      const path = `${category.id}/image`;

      const imageUrl = await this.supabase.uploadImage(
        "categories",
        data.image.buffer,
        path,
        data.image.mimetype,
        "image"
      );

      category = await this.prisma.category.update({
        where: { id: category.id },
        data: { image: imageUrl },
      });
    }

    if (data.banner) {
      const path = `${category.id}/banner`;
      const bannerUrl = await this.supabase.uploadImage(
        "categories",
        data.banner.buffer,
        path,
        data.banner.mimetype,
        "banner"
      );

      category = await this.prisma.category.update({
        where: { id: category.id },
        data: { banner: bannerUrl },
      });
    }

    return category;
  }

  async update(data: UpdateCategoryBody) {
    const category = await this.getById(Number(data.id));

    const updatedCategoryData: Record<string, any> = {};

    if (typeof data.name !== "undefined") updatedCategoryData.name = data.name;

    if (typeof data.available !== "undefined")
      updatedCategoryData.available = data.available;

    if (category.image && data.deleteImage) {
      updatedCategoryData.image = null;

      const url = new URL(category.image);
      const path = decodeURIComponent(
        url.pathname.replace("/storage/v1/object/public/categories/", "")
      );

      await this.supabase.deleteImages("categories", [path]);
    } else if (data.image) {
      const path = `${category.id}/image`;
      updatedCategoryData.image = await this.supabase.uploadImage(
        "categories",
        data.image.buffer,
        path,
        data.image.mimetype,
        "image"
      );
    }

    if (category.banner && data.deleteBanner) {
      updatedCategoryData.banner = null;

      const url = new URL(category.banner);
      const path = decodeURIComponent(
        url.pathname.replace("/storage/v1/object/public/categories/", "")
      );

      await this.supabase.deleteImages("categories", [path]);
    }
    if (data.banner) {
      const path = `${category.id}/banner`;
      updatedCategoryData.banner = await this.supabase.uploadImage(
        "categories",
        data.banner.buffer,
        path,
        data.banner.mimetype,
        "banner"
      );
    }

    return await this.prisma.category.update({
      where: {
        id: category.id,
      },
      data: updatedCategoryData,
    });
  }

  async delete(categoryId: number) {
    await this.getById(categoryId);

    return await this.prisma.$transaction(async (tx) => {
      const category = await tx.category.update({
        where: { id: categoryId },
        data: {
          items: {
            set: [],
          },
        },
      });

      if (category.image) {
        const url = new URL(category.image);
        const path = decodeURIComponent(
          url.pathname.replace("/storage/v1/object/public/categories/", "")
        );

        await this.supabase.deleteImages("categories", [path]);
      }

      if (category.banner) {
        const url = new URL(category.banner);
        const path = decodeURIComponent(
          url.pathname.replace("/storage/v1/object/public/categories/", "")
        );

        await this.supabase.deleteImages("categories", [path]);
      }

      await tx.category.delete({ where: { id: categoryId } });

      return { message: "Category deleted successfully" };
    });
  }

  async addItemToCategory({
    categoryId,
    itemId,
  }: {
    categoryId: number;
    itemId: number;
  }) {
    await this.getById(categoryId);
    await this.itemsService.getById(itemId);

    await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        items: {
          connect: {
            id: itemId,
          },
        },
      },
    });

    return { message: "Item added to category successfully" };
  }

  async removeItemFromCategory({
    categoryId,
    itemId,
  }: {
    categoryId: number;
    itemId: number;
  }) {
    const category = await this.getById(categoryId);
    const item = await this.itemsService.getById(itemId);

    if (item.mainCategory.toLowerCase() === category.name.toLowerCase()) {
      if (item.categories.length > 1) {
        const newMainCategory = item.categories.find(
          (cat) => cat.id !== categoryId
        );

        await this.prisma.item.update({
          where: {
            id: item.id,
          },
          data: {
            mainCategory: newMainCategory?.name || "",
          },
        });
      } else {
        await this.prisma.item.update({
          where: {
            id: item.id,
          },
          data: {
            mainCategory: "",
          },
        });
      }
    }

    await this.prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        items: {
          disconnect: {
            id: item.id,
          },
        },
      },
    });

    return { message: "Item removed from category" };
  }
}
