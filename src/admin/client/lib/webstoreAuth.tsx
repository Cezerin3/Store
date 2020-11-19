import { toNumber } from "lodash"
import { parseJWT } from "./auth"
import messages from "./text"

const loginPath = "/admin/apps/login"
const homePath = "/admin/apps"

const getParameterByName = (name: string, url: string) => {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

export const validateCurrentToken = () => {
  if (window.location.pathname !== loginPath) {
    if (!isCurrentTokenValid()) {
      window.location.replace(loginPath)
    }
  }
}

export const checkTokenFromUrl = () => {
  if (window.location.pathname === loginPath) {
    const token = getParameterByName("webstoretoken", null)
    if (token && token !== "") {
      const tokenData = parseJWT(token)

      if (tokenData) {
        const expirationDate = tokenData.exp * 1000
        if (expirationDate > Date.now()) {
          saveToken({
            token,
            email: tokenData.email,
            expirationDate: expirationDate.toString(),
          })
          window.location.replace(homePath)
        } else {
          alert(messages.tokenExpired)
        }
      } else {
        alert(messages.tokenInvalid)
      }
    } else {
      if (isCurrentTokenValid()) {
        window.location.replace(homePath)
      }
    }
  }
}

const saveToken = (data: {
  token: string
  email: string
  expirationDate: string
}) => {
  localStorage.setItem("webstore_token", data.token)
  localStorage.setItem("webstore_email", data.email)
  localStorage.setItem("webstore_exp", data.expirationDate)
}

export const isCurrentTokenValid = () => {
  const expirationDate = toNumber(localStorage.getItem("webstore_exp"))
  return (
    localStorage.getItem("webstore_token") &&
    expirationDate &&
    expirationDate > Date.now()
  )
}
