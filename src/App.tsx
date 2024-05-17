import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./App.css"
import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard";
import { createContext, useState } from "react";
import { Product } from "./types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }, 
  {
    path: "/dashboard",
    element: <Dashboard />,
  }, 
]);
type GlobalContext ={
  cart: Product[]
}

type GlobalContextType ={
  state : GlobalContext
  handleAddToCart:(product :Product) => void
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalContext>({
    cart:[]
  })

  const handleAddToCart =(product: Product) => {
    setState({
      ...state,
      cart:[...state.cart , product]
    })
  }

  return (
    <div className="App">
      <GlobalContext.Provider value={{state, handleAddToCart}}>
    <RouterProvider router={router} />
    </GlobalContext.Provider>
    </div>
  )
}

export default App
