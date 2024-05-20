import { Cart } from "./cart"

export function NavBar() {
  return (
    <header>
      <nav>
        <a href="/">HOME</a>
        <a href="/dashboard">DASHBOARD</a>
        <a href="#">ABOUT</a>
        <div id="indicator"></div>
      </nav>
      <Cart />
    </header>
  )
}
