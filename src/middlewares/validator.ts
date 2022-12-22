import { body } from "express-validator";

export const userFormValidator = [
  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("O nome precisa ter no minimo 3 caracteres"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("A senha precisa ter no minino 6 caracteres")
    .matches(/^(.*[A-Z].*)$/)
    .withMessage("A senha precisa ter uma letra Maiuscula")
    .matches(/(?=.*\d)/)
    .withMessage("A senha precisa ter um numero"),
];

export const loginValidator = [body("cpf").isString()];
