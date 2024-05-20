import api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUp ()
{
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        phone:null

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
    const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
    const {name, value, valueAsNumber } = e.target

    setUser({
        ...user,
        [name]:name ==="phone" ? valueAsNumber :value
    })
    }
    const handleSubmit = async(e:FormEvent)=> {
    e.preventDefault()
    const response = await handleSignUp()
    console.log("response",response)
    if (response){
        navigate("/login")
    }
    }
    return (
        <div>
            <h1>SignUp</h1>
            <form action="POST" onSubmit={handleSubmit}>
                <Input 
                name="firstName"
                className="mt-4"
                type="text"
                placeholder="FirstName"
                onChange={handleChange}
                />
                <Input 
                name="lastName"
                className="mt-4"
                type="text"
                placeholder="LastName"
                onChange={handleChange}
                />
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
                <Input 
                name="phoneNumber"
                className="mt-4"
                type="number"
                placeholder="YourPhone"
                onChange={handleChange}
                />
               <div>
               <Button variant="ghost">
                    <Link to="/login">
                    Have An Account Already ?
                    </Link>
                    </Button>
                <Button className="mt-7">Create Account</Button>
                </div> 

            </form>
        </div>
    )
}