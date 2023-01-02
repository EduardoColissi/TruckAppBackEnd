import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

type IFreights = {
  value: string;
  truckType: string;
  points: string;
  origin: string;
  grossWeight: number;
  destiny: string;
  description: string;
  deadline: string;
  date: string;
  customHouse: string;
  commodityValue: number;
  code: string;
};

export class FreightsController {
  async create(req: Request, res: Response) {
    try {
      const {
        value,
        truckType,
        points,
        origin,
        grossWeight,
        destiny,
        description,
        deadline,
        date,
        customHouse,
        commodityValue,
        code,
      } = req.body;

      const newFreights = await prismaClient.freights.create({
        data: <IFreights>{
          value,
          truckType,
          points,
          origin,
          grossWeight,
          destiny,
          description,
          deadline,
          date,
          customHouse,
          commodityValue,
          code,
        },
      });

      res.status(201).json(newFreights);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Internal Error" });
    }
  }

  async getAllFreights(req: Request, res: Response) {
    try {
      const freights = await prismaClient.freights.findMany();

      if (freights.length <= 0) {
        return res.status(404).json({ message: "Nao existe nenhum frete" });
      }

      res.status(200).json(freights);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Internal Error" });
    }
  }

  async getFreightsById(req: Request, res: Response) {
    try {
      const { id: id } = req.params;

      const freight = await prismaClient.freights.findUnique({ where: { id } });

      if (!freight) {
        return res.status(404).json({ message: "Freight Not Found" });
      }

      return res.status(201).json(freight);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Internal Error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id: id } = req.params;
      const freights = await prismaClient.freights.delete({ where: { id } });

      if (!freights) {
        return res.status(404).json({ message: "Frete Inexistente" });
      }

      res.status(200).json({ message: "Frete Deletado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Internal Error" });
    }
  }

  async updateFreight(req: Request, res: Response) {
    try {
      const {
        value,
        truckType,
        points,
        origin,
        grossWeight,
        destiny,
        description,
        deadline,
        date,
        customHouse,
        commodityValue,
        code,
      } = req.body;

      const { id: id } = req.params;

      let freightExists = await prismaClient.freights.findUnique({
        where: { id },
      });

      if (!freightExists) {
        return res.status(404).json({ message: "Nao existe esse frete!!" });
      }

      const freight = await prismaClient.freights.update({
        where: { id },
        data: <IFreights>{
          value,
          truckType,
          points,
          origin,
          grossWeight,
          destiny,
          description,
          deadline,
          date,
          customHouse,
          commodityValue,
          code,
        },
      });

      res.status(200).json(freight);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Internal Error" });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { search, take, skip } = req.query;

      const result = await prismaClient.freights.findMany({
        where: {
          OR: [
            {
              destiny: {
                contains: String(search),
              },
            },
            {
              origin: {
                contains: String(search),
              },
            },
          ],
        },
        take: Number(take),
        skip: Number(skip),
      });

      if (!search) {
        return res.status(404).json({ message: "Please write something" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Frete nao encontrado!" });
      }

      return res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
