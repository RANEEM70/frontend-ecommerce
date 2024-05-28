export type Category = 
{
  id: string
  name: string
}
export type Product = 
{
  id: string
  name: string
  categoryId: number
  image : string
  price : boolean
}
export type User =
 {
    firstName: string,
    lastName: string,
    email: string,
    Id: string,
    phoneNumber: number,
    password: string,
    role: string
}

export const ROLE =
{
  Admin:"Admin",
  Customer: "Customer"
} as const

export type DecodedUser =
{
  aud: string
  emailaddress: string
  exp:number
  iss : string
  name:string
  nameidentifier:string
  role : keyof typeof ROLE
}
