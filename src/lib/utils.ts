import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTokenFromStorage() {
  const token = localStorage.getItem("token")
  if (!token) return null

  return token
}

export function reshapeUser(decodedToken: unknown){
  const decodedUser: any = {}

  if (decodedToken) {
    for (const [key, value] of Object.entries(decodedToken)) {
      let objectKey = ""

      if (key.startsWith("http")) {
        objectKey = key.split("identity/claims/")[1]
      } else {
        objectKey = key
      }

      decodedUser[objectKey] = value
    }
  }
    return decodedUser
} 
