import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function SignUp() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: null
  })

  const handleSignUp = async () => {
    try {
      const res = await api.post(`users/signup`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    } 
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, valueAsNumber } = e.target

    setUser({
      ...user,
      [name]: name === "phone" ? valueAsNumber : value
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    const userToken = await handleSignUp()
    console.log("response", userToken)
    if (userToken) {
      navigate("/login")
    }
  }
  return (
    <section id="sect">
    <div id="leaves">
    </div>
    <img id="bg" src="/src/image/LSD.gif" alt="background"/>
    <form action="POST" onSubmit={handleSubmit} id="LSD">
      <h2>Sign In</h2>
      <div id="inputBox">
      <Input
name="firstName"
className="mt-4"
type="text"
placeholder="FirstName"
onChange={handleChange}
/>
      </div>
      <div id="inputBox">
      <Input
name="lastName"
className="mt-4"
type="text"
placeholder="LastName"
onChange={handleChange}
/>
</div>
      <div id="inputBox">
      <Input
name="email"
className="mt-4"
type="text"
placeholder="Email"
onChange={handleChange}
/>
</div>
      <div id="inputBox">
      <Input
name="password"
className="mt-4"
type="password"
placeholder="Password"
onChange={handleChange}
/>
</div>
<div id="inputBox">
<Input
name="phoneNumber"
className="mt-4"
type="number"
placeholder="YourPhone"
onChange={handleChange}
/>
      </div>
      <div id="inputBox">
        <Button id="submit">
               Login</Button>
      </div>
      <div id="group">
        <a href="#">Forget Password</a>
        <a href="/login">Login</a>
      </div>
    </form>
    </section>
  )
}

