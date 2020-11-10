import CezerinClient from "cezerin2-client"
import { settings } from "../lib"

const dashboardToken = localStorage.getItem("dashboard_token")
const webstoreToken = localStorage.getItem("webstore_token")

const developerMode = settings.developerMode === true

let api = new CezerinClient({
  apiBaseUrl: settings.apiBaseUrl || "/api/v1",
  apiToken: dashboardToken,
  webstoreToken: webstoreToken,
})

if (developerMode === true || dashboardToken) {
} else {
  api = null
}

export default api
