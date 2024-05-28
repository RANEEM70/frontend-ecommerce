import api from "@/api"
import { Button } from "../button"
import { ChangeEvent, useState } from "react"
import { Input } from "../input"
import { Product } from "@/types"
import { useQueryClient } from "@tanstack/react-query"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

export function EditProduct({ product }: { product: Product }) {
  const queryClient = useQueryClient()
  const [updatedProduct, setUpdatedProduct] = useState(product)

  const updateProduct = async () => {
    try {
      const res = await api.patch(`/products/${updatedProduct.id}`, updatedProduct)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setUpdatedProduct({
      ...updatedProduct,
      name: value
    })
  }

  const handleUpdate = async () => {
    await updateProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
            <DialogDescription>Write your New Update here.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4" id="tableblur">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value="Pedro Duarte"
                className="col-span-3"
                onChange={handleChange}
                defaultValue={updateProduct.name}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Username
              </label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdate}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
