import { Request, Response } from "express";
import { ShippingBusiness } from "../business/ShippingBusiness";
import { ShippingInputDTO } from "../model/shipping";

export class ShippingController {
  public createShipping = async (req: Request, res: Response) => {
    try {
      const { title, descricao, valor, prazo, destino, origem, pontuacao } = req.body;
      const input: ShippingInputDTO = {
        title,
        descricao,
        valor,
        prazo,
        destino,
        origem,
        pontuacao,
      };
      const shippingBusiness = new ShippingBusiness();
      await shippingBusiness.createShipping(input);
      res.status(201).send({ message: "Frete cadastrado!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
}