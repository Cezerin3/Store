import { toNumber } from "lodash"
import messages from "./text"

const loginPath = "/admin/login"
const homePath = "/admin/"

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
    const token = getParameterByName("token", null)
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

export const parseJWT = (jwt: string) => {
  try {
    const payload = jwt.split(".")[1]
    const tokenData = JSON.parse(atob(payload))
    return tokenData
  } catch (e) {
    return null
  }
}

export const saveToken = (data: {
  token: string
  email: string
  expirationDate: string
}) => {
  localStorage.setItem("dashboard_token", data.token)
  localStorage.setItem("dashboard_email", data.email)
  localStorage.setItem("dashboard_exp", data.expirationDate)
}

const isCurrentTokenValid = () => {
  const expirationDate = localStorage.getItem("dashboard_exp")
  return (
    localStorage.getItem("dashboard_token") &&
    expirationDate &&
    toNumber(expirationDate) > Date.now()
  )
}

export const removeToken = () => {
  localStorage.removeItem("dashboard_token")
  localStorage.removeItem("dashboard_email")
  localStorage.removeItem("dashboard_exp")
  localStorage.removeItem("webstore_token")
  localStorage.removeItem("webstore_email")
  localStorage.removeItem("webstore_exp")
  window.location.replace(loginPath)
}
