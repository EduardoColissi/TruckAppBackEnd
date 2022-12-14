export type userSignUpDTO = {
   cpf: string
   name: string
   password: string
}

export type userSignUp = {
   cpf: string
   name: string
   password: string
   id: string
}

export interface LoginInputDTO {
   cpf: string,
   password: string
}

export interface EditUserInputDTO {
   name: string,
   nickname: string,
   id: string,
   token: string
}

export interface EditUserInput {
   name: string,
   nickname: string,
   id: string
}

export interface AuthenticationData {
   cpf: string
}