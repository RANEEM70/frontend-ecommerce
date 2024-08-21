import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./App.css"
import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard";
import { createContext, useEffect, useState } from "react";
import { DecodedUser, Product } from "./types";
import { LogIn } from "./pages/login";
import { SignUp } from "./pages/signUp";
import { PrivateRoute } from "./components/ui/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }, 
  {
    path: "/dashboard",
    element: 
    
    <Dashboard/>
  
    
}, 
  {
    path: "/login",
    element: <LogIn />,
  }, 
  {
    path: "/signup",
    element: <SignUp />,
  }, 
]);
type GlobalContext ={
  user: any;
  cart: Product[]
}

type GlobalContextType ={
  state : GlobalContext
  handleAddToCart:(product :Product) => void
  handleDeleteFromCart:(id :string) => void
  handleStoreUser:(user :DecodedUser) => void
}

type GlobalState={
  cart: Product[]
  user : DecodedUser | null
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart:[],
    user: null
  })

  useEffect(()=> {
    const user = localStorage.getItem("user")
    if (user){
      const decodedUser = JSON.parse(user)
      setState({
        ...state,
        user: decodedUser
      })
    }
  })

  const handleAddToCart =(product: Product) => {
    const isDuplicated = state.cart.find((cartItem)=> cartItem.id ===product.id) 
    if (isDuplicated) return
    setState({
      ...state,
      cart:[...state.cart , product]
    })
  }

  const handleStoreUser = (user: DecodedUser)=> {
    setState({
      ...state,
      user
    })
  }
    

  const handleDeleteFromCart =(id:string)=>
    {
      const filteredCart = state.cart.filter((item)=> item.id !== id)

      setState({
        ...state,
        cart:filteredCart
      })
    }

  return (
    <div className="App">
      <GlobalContext.Provider value={{
        state,
         handleAddToCart,
         handleDeleteFromCart,
         handleStoreUser}}>
    <RouterProvider router={router} />
    </GlobalContext.Provider>
    </div>
  )
}

export default App
