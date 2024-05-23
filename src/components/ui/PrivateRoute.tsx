import { reshapeUser } from "@/lib/utils"
import { ROLE } from "@/types"
import jwt from "jwt-decode"
import { ReactElement } from "react"
import { Navigate } from "react-router-dom"

export function PrivateRoute({ children }: { children: ReactElement }) {
  const objectKey = localStorage.getItem("token") || ""
  const decodedToken = jwt(objectKey)
  const decodedUser = reshapeUser(decodedToken)
  return decodedUser.role === ROLE.Customer ? <Navigate to="/" /> : children
}
