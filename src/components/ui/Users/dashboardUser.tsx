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
import { User } from "@/types"
import { EditProduct } from "@/components/ui/Products/editProduct"

export function DashboardUser() {
  const queryClient = useQueryClient()

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    password: ""
  })

  // Handle
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id)
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postUser()
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }

  const postUser = async () => {
    try {
      const res = await api.post("/users", user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const deleteUser = async (id: string) => {
    try {
      const res = await api.delete(`/users/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const getUsers = async () => {
    try {
      const userToken = localStorage.getItem("userToken")
      const res = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries

  const { data: users } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  return (
    <>
      <form className="mt-20  w-1/6 mx-auto" onSubmit={handleSubmit}>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Add New User
        </h1>
        <Input
          className="mt-4"
          name="firstName"
          type="text"
          placeholder="FirstName"
          onChange={handleChange}
        />
        <Input
          className="mt-4"
          name="lastName"
          type="text"
          placeholder="LastName"
          onChange={handleChange}
        />
        <Input
          className="mt-4"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          className="mt-4"
          name="phoneNumber"
          type="number"
          placeholder="PhoneNumber"
          onChange={handleChange}
        />
        <Input
          className="mt-4"
          name="password"
          type="text"
          placeholder="Password"
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
        <h1>User Info</h1>
        <Table className="relative w-full max-w-lg">
          <TableCaption>A list of recent users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">user</TableHead>
              <TableHead>FirstName</TableHead>
              <TableHead>LastName</TableHead>
              <TableHead className="text-right">Email</TableHead>
              <TableHead>PhoneNumber</TableHead>
              <TableHead>Password</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.Id}>
                <TableCell className="font-medium"></TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    color="red"
                    className="w-6 h-6"
                    onClick={() => handleDeleteUser(user.Id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </TableCell>
                <TableCell></TableCell>
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
