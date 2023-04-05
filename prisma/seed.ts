import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const productsData: Prisma.ProductCreateInput[] = [
  {
    title: 'Smartphone',
    description: 'Smartphone top de linha',
    price: 7000,
    unitsInStock: 6,
    images: {
      create: [
        {
          path: 'https://i.zst.com.br/thumbs/12/29/19/-846658799.jpg',
        },
      ],
    },
    category: {
      connectOrCreate: {
        where: {
          name: 'eletronicos',
        },
        create: {
          name: 'eletronicos',
        },
      },
    },
  },
  {
    title: 'Smartphone 2',
    description: 'Smartphone top de linha',
    price: 5000,
    unitsInStock: 10,
    images: {
      create: [
        {
          path: 'https://i.zst.com.br/thumbs/12/29/19/-846658799.jpg',
        },
      ],
    },
    category: {
      connectOrCreate: {
        where: {
          name: 'eletronicos',
        },
        create: {
          name: 'eletronicos',
        },
      },
    },
  },
  {
    title: 'Sofa',
    description: 'Sofa top de linha',
    price: 1000,
    unitsInStock: 10,
    images: {
      create: [
        {
          path: 'https://rufermoveis.com.br/wp-content/uploads/Sofa-Retratil-Reclinavel-2.30m-Emanuelly-Veludo-Azul.jpg',
        },
      ],
    },
    category: {
      connectOrCreate: {
        where: {
          name: 'moveis',
        },
        create: {
          name: 'moveis',
        },
      },
    },
  },
  {
    title: 'Sofa 2',
    description: 'Sofa top de linha',
    price: 10000,
    unitsInStock: 2,
    images: {
      create: [
        {
          path: 'https://rufermoveis.com.br/wp-content/uploads/Sofa-Retratil-Reclinavel-2.30m-Emanuelly-Veludo-Azul.jpg',
        },
      ],
    },
    category: {
      connectOrCreate: {
        where: {
          name: 'moveis',
        },
        create: {
          name: 'moveis',
        },
      },
    },
  },
  {
    title: 'Camisa',
    description: 'Camisa top de linha',
    price: 1000,
    unitsInStock: 10,
    images: {
      create: [
        {
          path: 'https://img.elo7.com.br/product/original/17B1547/camisa-sublimacao-poliester.jpg',
        },
      ],
    },
    category: {
      connectOrCreate: {
        where: {
          name: 'roupas',
        },
        create: {
          name: 'roupas',
        },
      },
    },
  },
  {
    title: 'Camisa 2',
    description: 'Camisa top de linha',
    price: 1200,
    unitsInStock: 10,
    images: {
      create: [
        {
          path: 'https://img.elo7.com.br/product/original/17B1547/camisa-sublimacao-poliester.jpg',
        },
      ],
    },
    category: {
      connectOrCreate: {
        where: {
          name: 'roupas',
        },
        create: {
          name: 'roupas',
        },
      },
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  productsData.forEach(async (product) => {
    await prisma.product.create({
      data: product,
    });
  });

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
