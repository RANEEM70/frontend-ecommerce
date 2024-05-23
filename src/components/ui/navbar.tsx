import { useContext } from "react"
import { Cart } from "./cart"
import { GlobalContext } from "@/App"
import { ROLE } from "@/types"

export function NavBar() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state } = context
  return (
    <header>
      <nav>
        <a href="/">HOME</a>
        {state.user?.role === ROLE.Admin &&(<a href="/dashboard">DASHBOARD</a>)}
        {state.user?.role === ROLE.Admin &&(<a href="/dashboard">Stock</a>)}
        {!state.user && (<a href="#">ABOUT</a>)}
        {!state.user && (<a href="/signup">SignUp</a>)}
        {!state.user && (<a href="/login">Login</a>)}       <div id="indicator"></div>
      </nav>
      <Cart />
    </header>
  )
}
