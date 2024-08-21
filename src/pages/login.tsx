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
      const decodedToken = jwt(objectKey)
      const user = reshapeUser(decodedToken)
      localStorage.setItem("token", objectKey)
      localStorage.setItem("user",JSON.stringify(user))

      handleStoreUser(user)
      navigate("/")
    }
  }

  const handleLogin = async () => {
    try {
      const res = await api.post(`/users/login`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  return (
<section id="sect">
<div id="leaves">
</div>
<img id="bg" src="/src/image/LSD.gif" alt="background"/>
<form action="POST" onSubmit={handleSubmit} id="LSD">
  <h2>Log In </h2>
  <div id="inputBox">
    <Input id="field"
          name="email"
          className="mt-4"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
  </div>
  <div id="inputBox">
    <Input id="field"
          name="password"
          className="mt-4"
          type="text"
          placeholder="Password"
          onChange={handleChange}
        />
  </div>
  <div id="inputBox">
    <Button>Login</Button>
  </div>
  <div id="group">
    <a href="#">Forget Password</a>
    <a href="/signUp">Sign up</a>
  </div>
</form>
</section>
  )
}
