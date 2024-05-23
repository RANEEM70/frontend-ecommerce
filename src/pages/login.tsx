import { GlobalContext } from "@/App"
import api from "@/api"
import jwt from "jwt-decode"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { reshapeUser } from "@/lib/utils"



export function LogIn() {
  const navigate = useNavigate()
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleStoreUser } = context

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const objectKey = await handleLogin()

    if (objectKey) {
      localStorage.setItem("token", objectKey)
      const decodedToken = jwt(objectKey)
      const user = reshapeUser(decodedToken)
      handleStoreUser(user)
      navigate("/")
    }
  }

  const handleLogin = async () => {
    try {
      const res = await api.post(`users/login`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form action="POST" onSubmit={handleSubmit}>
        <Input
          name="email"
          className="mt-4"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          name="password"
          className="mt-4"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <div>
          <Button variant="ghost">
            <Link to="/signUp">Create An Account</Link>
          </Button>
          <Button>Login</Button>
        </div>
      </form>
    </div>
  )
}
