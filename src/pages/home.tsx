import { GlobalContext } from "@/App"
import api from "@/api"
import { useContext, useState } from "react"

import { NavBar } from "@/components/ui/navbar"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { Footer } from "@/components/footer"

export function Home() {
  const [searchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""
  const [searchBy] = useState(defaultSearch)

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart } = context
  const getProducts = async () => {
    try {
      const res = await api.get(`/products?searchBy=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })


  return (
    <>
      <NavBar />
      <div className="flex justify-between" id="hero">
        {/* <img src="/src/image/Face ID glitch effect.gif" className="absolute inset-y-25 right-10 "id="homeImg"/> */}
        <div id="centeri">
          <div id="card">
           
            <img 
              src="/src/image/imgHERO.png"
              id="imgBa"
            /> 
            <h3 className="text-white">EYCY</h3>
          </div>
        </div>
        <div id="heroText">
          <h1 id="A">HOLOGRAM</h1>
          <h1 id="B">AR</h1>
        </div>
        <div id="wrap">
          <div id="shape"></div>
          <div id="shape"></div>
          <div id="shape"></div>
        </div>
      </div>
      {/* <h1 className="text-2xl uppercase mb-10">Products</h1> */}

  <div id="container">
    {data?.length === 0 && <p>No Product Found</p>}
    {data?.map((product) => (
    <div id="card" key={product.id}>
            <div id="imgBx">
            <img  alt={product.name} src={product.image} />
          </div>
          <div id="contentBx">

              <h2>{product.name}</h2>

              <div id="size">
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>

              <div id="color">

               
                <span></span>
                <span></span>
                <span></span>
              </div>
              <a href="#" onClick={() => handleAddToCart(product)}>Buy Now</a>
            </div>

          </div>
              ))}
        </div>
      
      {error && <p className="text-red-500">{error.message}</p>}

      {/* <div className="flex ... mt-10">
        <div className="flex-1 ...">01</div>
        <div className="contents">
          <div className="flex-1 ...">02</div>
          <div className="flex-1 ...">03</div>
        </div>
        <div className="flex-1 ...">04</div>
      </div> */}
    

    <Footer/>
    </>
  )
}
