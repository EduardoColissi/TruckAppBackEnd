import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { isCPForCNPJ } from "js-cpf-cnpj-validation";
import bcryptjs from "bcryptjs";

type IUser = {
  id: string;
  name: string;
  password: string;
  cpf: string;
  licensePlate: string;
  vehicleType: string;
  numCelular: string;
};

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const user = await prismaClient.user.findMany();

      if (user.length <= 0) {
        return res.status(404).json({ message: "No user found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Internal Error" });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { name, cpf, password, licensePlate, vehicleType, numCelular } =
        req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let userExists = await prismaClient.user.findUnique({ where: { cpf } });

      if (userExists) {
        return res.status(422).json({ message: "User already exists" });
      }

      const hashPassword = await hash(password, 8);

      if (!isCPForCNPJ(cpf)) {
        return res.status(400).json({ message: "CPF invalido" });
      }

      const newUser = await prismaClient.user.create({
        data: <IUser>{
          name,
          password: hashPassword,
          cpf,
          licensePlate,
          vehicleType,
          numCelular,
        },
      });

      const isValuePassword = await compare(password, newUser.password);

      if (!isValuePassword) {
        return res.status(422).json({ message: "Invalid Password" });
      }

      const token = sign({}, process.env.JWT_KEY as string, {
        subject: newUser.id,
        expiresIn: "1h",
      });

      res.status(200).json({ newUser, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Internal Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const { id: id } = req.params;

      let userExists = await prismaClient.user.findUnique({ where: { id } });

      if (!userExists) {
        return res.status(404).json({ message: "Usuario nao encontrado" });
      }
      const user = await prismaClient.user.update({
        where: { id },
        data: {
          name,
        },
      });

      res.status(200).json({ message: "Usuario atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Internal Error" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id: id } = req.params;

      const user = await prismaClient.user.findUnique({ where: { id } });
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Internal Error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { cpf, password } = req.body;

      const user = await prismaClient.user.findUnique({ where: { cpf } });

      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      if (!(await bcryptjs.compare(password, user.password))) {
        return res.status(422).json({ message: "Invalid Password" });
      }

      const token = sign({}, process.env.JWT_KEY as string, {
        subject: user.id,
        expiresIn: "1h",
      });

      res.status(201).json({ user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Internal Error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id: id } = req.params;

      const user = await prismaClient.user.delete({ where: { id } });

      if (!user) {
        res.status(404).json({ message: "User not Found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { search, take, skip } = req.query;

      const result = await prismaClient.user.findMany({
        where: {
          name: {
            contains: String(search),
          },
        },
        take: Number(take),
        skip: Number(skip),
      });

      if (!search) {
        return res.status(404).json({ message: "Please write something" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Usuario nao encontrado!" });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
