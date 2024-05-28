import api from "@/api"
import { Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import { useSearchParams } from "react-router-dom"

export function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultSearch = searchParams.get("searchBy") || ""
    const queryClient = useQueryClient()
    const [searchBy, setSearchBy] = useState(defaultSearch)


    const getProducts = async () => {
        try {
          const res = await api.get(`/products?searchBy=${searchBy}`)
          return res.data
        } catch (error) {
          console.error(error)
          return Promise.reject(new Error("Something went wrong"))
        }
      }

      const { data, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts
      })


    // handle

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { value } = e.target
        setSearchBy(value)
        queryClient.invalidateQueries({ queryKey: ["products"] })
        setSearchBy(value)
        setSearchParams({
          ...searchParams,
          searchBy: value
        })
      }
return(
    <div className="flex items-center justify-center">
    <div className="relative text-gray-400 focus-within:text-gray-400">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" className="focus:outline-none focus:shadow-outline">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </span>
      <input
        type="search"
        name="q"
        className="py-2 text-sm text-white bg-black rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
        placeholder="Search"
        autoComplete="off"
        onChange={handleChange}
        value={searchBy}
      />
    </div>
  </div>
)
}