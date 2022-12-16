import { Request, Response } from "express";
import { FreightBusiness } from "../business/FreightBusiness";
import { FreightInputDTO } from "../model/freights";

export class FreightController {
  public createFreight = async (req: Request, res: Response) => {
    try {
      const {
        code,
        description,
        value,
        deadline,
        destiny,
        origin,
        points,
        date,
        trucktype,
      } = req.body;

      const input: FreightInputDTO = {
        code,
        description,
        value,
        deadline,
        destiny,
        origin,
        points,
        date,
        trucktype,
      };
      const freightBusiness = new FreightBusiness();
      await freightBusiness.createFreight(input);
      res.status(201).send({ message: "Frete cadastrado!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public getFreights = async (req: Request, res: Response) => {
    try {
      const freightBusiness = new FreightBusiness();
      const result = await freightBusiness.getFreights();
      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public deleteFreight = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;

      const freightBusiness = new FreightBusiness();
      await freightBusiness.deleteFreight(id);
      res.status(200).send("O frete foi deletado.");
    } catch (error: any) {
      res.status(400).send("Este frete não existe.");
    }
  };

  public editFreight = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const {
        id,
        code,
        description,
        value,
        deadline,
        destiny,
        origin,
        points,
        date,
        trucktype,
      } = req.body;

      const input = {
        id,
        code,
        description,
        value,
        deadline,
        destiny,
        origin,
        points,
        date,
        trucktype,
      };

      const freightBusiness = new FreightBusiness();
      await freightBusiness.editFreight(input, token);
    } catch (error: any) {}
  };
}
