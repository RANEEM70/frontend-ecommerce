import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./App.css"
import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard";
import { createContext, useState } from "react";
import { Product } from "./types";
import { LogIn } from "./pages/login";
import { SignUp } from "./pages/signUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }, 
  {
    path: "/dashboard",
    element: <Dashboard />,
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
  cart: Product[]
}

type GlobalContextType ={
  state : GlobalContext
  handleAddToCart:(product :Product) => void
  handleDeleteFromCart:(id :string) => void
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalContext>({
    cart:[]
  })

  const handleAddToCart =(product: Product) => {
    const isDuplicated = state.cart.find((cartItem)=> cartItem.id ===product.id) 
    if (isDuplicated) return
    setState({
      ...state,
      cart:[...state.cart , product]
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
         handleDeleteFromCart}}>
    <RouterProvider router={router} />
    </GlobalContext.Provider>
    </div>
  )
}

export default App
