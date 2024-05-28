import { GlobalContext } from "@/App"
import { useContext } from "react"


import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state , handleDeleteFromCart } = context
  return (
    
    <Popover>
      <PopoverTrigger asChild>
        {/* <Button variant="outline">Cart({state.cart.length})</Button> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-8 h-8"
          color="#9d9da1d2"
        >
          ({state.cart.length})
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>

      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4 mb-4 rgb(55 48 163)">
            {state.cart.length===0 && <p>No Product</p>}
            
          {state.cart.map((product) => {
            return (
              <div className="mb-5 flex items-center gap-9" key={product.id}>
                <img src={product.image} alt={product.name} className="object-contain w-20 h-20" id="imgCart"/>
                <h4>{product.name}</h4>
                <span>
                  {product.price}
                  <p>SR</p>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  color="red"
                  className="w-6 h-6"
                  onClick={() => handleDeleteFromCart(product.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}


