export type userSignUpDTO = {
   userName: string
   name: string
   password: string
}

export type userSignUp = {
   userName: string
   name: string
   password: string
   userId: string
}

export interface LoginInputDTO {
   userName: string,
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
   id: string
}