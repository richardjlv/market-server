import { Request, Response } from 'express';
import prisma from 'src/database/prisma';
import * as Yup from 'yup';

interface IStoreProduct {
  title: string;
  description: string;
  price: number;
  images: string[];
  unitsInStock: number;
  category: string;
}

interface IUpdateProduct extends IStoreProduct {}

class ProductController {
  async index(req: Request, res: Response): Promise<Response> {
    const { search, page = 1, orderBy, category } = req.query;
    const order = orderBy === 'maxPrice' ? 'desc' : 'asc';
    const orderName =
      orderBy === 'maxPrice' || orderBy === 'minPrice' ? 'price' : orderBy;

    const productData = await prisma.$transaction([
      prisma.product.count({
        where: {
          title: {
            contains: search as string,
            mode: 'insensitive',
          },
          category: {
            name: {
              contains: category as string,
              mode: 'insensitive',
            },
          },
        },
      }),
      prisma.product.findMany({
        skip: (Number(page) - 1) * 10,
        take: 10,
        include: {
          images: true,
        },
        where: {
          title: {
            contains: search as string,
            mode: 'insensitive',
          },
          category: {
            name: {
              equals: category as string,
              mode: 'insensitive',
            },
          },
        },
        orderBy: {
          ...(orderBy && {
            [orderName as string]: order,
          }),
        },
      }),
    ]);

    return res.json({ products: productData[1], count: productData[0] });
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
      },
    });

    return res.json(product);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required(),
      images: Yup.array().of(Yup.string()).required(),
      unitsInStock: Yup.number().required(),
      category: Yup.string().required(),
    });

    try {
      await schema.validate(req.body, {
        abortEarly: false,
      });
    } catch (err) {
      const validationErrors = [];
      const messages = [];

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors.push(error.path);
          messages.push(error.message);
        });
      }

      return res.status(400).json({
        error: 'Validation fails',
        field: validationErrors,
        messages,
      });
    }

    const {
      title,
      description,
      price,
      category: categoryName,
      images,
      unitsInStock,
    }: IStoreProduct = req.body;

    const categoryExists = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    const category =
      categoryExists ||
      (await prisma.category.create({
        data: {
          name: categoryName,
        },
      }));

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        unitsInStock,
        category: {
          connect: {
            id: category.id,
          },
        },
      },
    });

    await prisma.image.createMany({
      data: images.map((image) => ({
        path: image,
        productId: product.id,
      })),
    });

    return res.json({
      id: product.id,
      title,
      description,
      price,
      unitsInStock,
      images: images.map((image) => ({ path: image })),
      category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      price: Yup.number(),
      images: Yup.array().of(Yup.string()),
      unitsInStock: Yup.number(),
      category: Yup.string(),
    });

    try {
      await schema.validate(req.body, {
        abortEarly: false,
      });
    } catch (err) {
      const validationErrors = [];
      const messages = [];

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors.push(error.path);
          messages.push(error.message);
        });
      }

      return res.status(400).json({
        error: 'Validation fails',
        field: validationErrors,
        messages,
      });
    }

    const { id } = req.params;
    const {
      title,
      description,
      price,
      category: categoryName,
      images,
      unitsInStock,
    }: IUpdateProduct = req.body;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const categoryExists = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    const category =
      categoryExists ||
      (await prisma.category.create({
        data: {
          name: categoryName,
        },
      }));

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price,
        unitsInStock,
        category: {
          connect: {
            id: category.id,
          },
        },
      },
    });

    if (images) {
      await prisma.image.deleteMany({
        where: {
          productId: id,
        },
      });

      await prisma.image.createMany({
        data: images.map((image) => ({
          path: image,
          productId: id,
        })),
      });
    }

    return res.json({
      id: updatedProduct.id,
      title,
      description,
      price,
      unitsInStock,
      images: images.map((image) => ({ path: image })),
      category,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await prisma.product.delete({
      where: { id },
    });

    return res.json({ message: 'Product deleted' });
  }
}

export default new ProductController();
