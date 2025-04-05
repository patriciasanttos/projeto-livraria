import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import seedData from './seedData';

const prisma = new PrismaClient();

type BasicCategoryType = {
  id?: number;
  name: string;
};

async function main() {
  console.log('\nExecuting seeds. This may take a while...');

  const categoriesSeed = async () => {
    const categories: Array<BasicCategoryType> = [];

    for (let category of seedData) {
      if (categories.find((c) => c.name === category['Tipo de Produto']))
        continue;

      let existingCategory = await prisma.category.findFirst({
        where: { name: category['Tipo de Produto'] },
      });

      if (existingCategory) continue;

      const newCategory = await prisma.category.create({
        data: { name: category['Tipo de Produto'] },
      });

      categories.push(newCategory);
    }

    return categories;
  };

  const itemsSeed = async (categories) => {
    for (let item of seedData) {
      const category = categories.find(
        (c) => c.name === item['Tipo de Produto'],
      );

      if (!category) {
        console.warn(`Category not found for item: ${item['Descrição']}`);
        continue;
      }

      await prisma.item.create({
        data: {
          name: item['Descrição'],
          price: item['$Venda'],
          available: item['Situação'] === 'DISPONÍVEL' ? true : false,
          categories: {
            connect: {
              id: category.id,
            },
          },
        },
      });
    }
  };

  const adminSeed = async () => {
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(
      process.env.INITIAL_ADMIN_PASSWORD as string,
      salt,
    );

    await prisma.admin.create({
      data: {
        name: 'M&C Books',
        email: 'mcbooks@gmail.com',
        phone: '12345678901',
        password: hashPassword,
      },
    });
  };

  const categories = await categoriesSeed();
  await itemsSeed(categories);
  await adminSeed();

  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
