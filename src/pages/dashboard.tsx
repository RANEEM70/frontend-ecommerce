import api from "@/api"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Product } from "@/types"


export function Dashboard (){
  const queryClient = useQueryClient()

  const [product, setProduct]= useState({
    name :"",
    categoryId:"",
    image:"",
    price:""
  })

  const handleChange =(e: React.ChangeEvent<HTMLInputElement>) => {
    const {name , value} = e.target
    setProduct({
      ...product,
      [name]:value
  })
}
  const postProduct = async () =>{
    try {
      const res = await api.post("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    await postProduct()
   queryClient.invalidateQueries({queryKey:["products"]})
  }
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data : products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  }) 
  return(
  <>
  <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add New Product</h1>
          <Input className="mt-4 "
              type="text"
              placeholder="Name"
              onChange={handleChange} />
          <Input className="mt-4 "
              type="text"
              placeholder="Category Id"
              onChange={handleChange} />

          <div className="flex justify-between">
              <Button variant="outline" type="reset" className="mt-4">Reset</Button>
              <Button type="submit" className="mt-4">Submit</Button>
          </div>
      </form>
      <div>
        <h1>Products Info</h1>
        <Table>
      <TableCaption>A list of your recent products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">product</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>CategoryId</TableHead>
          {/* <TableHead className="text-right">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => (
          <TableRow key={product.id}>
            {/* <TableCell className="font-medium"></TableCell> */}
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.categoryId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
        </div></>
)}