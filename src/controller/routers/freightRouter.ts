import express from "express";
import { FreightController } from "../FreightController";

export const freightRouter = express.Router()

const freightController = new FreightController()

freightRouter.post('/create/', freightController.createFreight)
freightRouter.get('/all/', freightController.getFreights )
freightRouter.delete('/delete/', freightController.deleteFreight )
freightRouter.put('/update/', freightController.editFreight )