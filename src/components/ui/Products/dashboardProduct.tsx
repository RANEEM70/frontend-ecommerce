import api from "@/api"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Product, User } from "@/types"
import { EditProduct } from "./editProduct"

export function DashboardProduct() {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    image: "",
    price: 0
  })

  // Handle
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const postProduct = async () => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const res = await api.delete(`/products/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
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
  // const getUsers = async () => {
  //   try {
  //     const userToken = localStorage.getItem("userToken")
  //     const res = await api.get("/user", {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`
  //       }
  //     })
  //     return res.data
  //   } catch (error) {
  //     console.error(error)
  //     return Promise.reject(new Error("Something went wrong"))
  //   }
  // }

  // Queries
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  // const { data: users } = useQuery<User[]>({
  //   queryKey: ["users"],
  //   queryFn: getUsers
  // })

  return (
    <>
      <form className="mt-20  w-1/6 mx-auto" onSubmit={handleSubmit}>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Add New Product
        </h1>
        <Input
          className="mt-4"
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />
        <Input
          className="mt-4"
          name="categoryId"
          type="text"
          placeholder="Category Id"
          onChange={handleChange}
        />
        <Input
          className="mt-4"
          name="image"
          type="text"
          placeholder="Image"
          onChange={handleChange}
        />
        <Input
          className="mt-4"
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
        />

        <div className="flex justify-between">
          <Button variant="outline" type="reset" className="mt-4">
            Reset
          </Button>
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </div>
      </form>
      <div>
        <h1>Products Info</h1>
        <Table className="relative w-full max-w-lg" >
          <TableCaption>A list of your recent products.</TableCaption>
          <TableHeader className="w-full min-w-max table-auto text-left">
            <TableRow className="border-y borderwhite-100 bg-blue-gray-50/50 p-4">
              <TableHead className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                product
              </TableHead>
              <TableHead className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                Name
              </TableHead>
              <TableHead className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                CategoryId
              </TableHead>
              <TableHead className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium"></TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.categoryId}</TableCell>
                <TableCell>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    color="red"
                    className="w-6 h-6"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </TableCell>
                <TableCell>
                  <EditProduct />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
        </Table>
      </div>
    </>
  )
}
