import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as Yup from 'yup';

import prisma from '../database/prisma';

interface IStoreCategory {
  name: string;
}

class ProductController {
  async index(req: Request, res: Response): Promise<Response> {
    const categories = await prisma.category.findMany();

    return res.json({ categories });
  }

  async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
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

    const { name }: IStoreCategory = req.body;

    const categoryExists = await prisma.category.findUnique({
      where: { name },
    });

    if (categoryExists) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return res.json(category);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid category id' });
    }

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await prisma.category.delete({
      where: { id },
    });

    return res.json({ message: 'Category deleted' });
  }
}

export default new ProductController();
