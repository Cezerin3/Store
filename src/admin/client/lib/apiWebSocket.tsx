import { fetchOrders } from "../modules/orders/actions"
import { installReceive } from "../modules/settings/actions"
import settings from "./settings"
import messages from "./text"

const autoReconnectInterval = 1000 //1 seconds
const orderCreated = "order.created"
const themeInstalled = "theme.installed"
let store = null

export const connectToWebSocket = (reduxStore: any) => {
  store = reduxStore
  connect()
}

const connect = () => {
  const wsUrl =
    settings.apiWebSocketUrl && settings.apiWebSocketUrl.length > 0
      ? settings.apiWebSocketUrl
      : getWebSocketUrlFromCurrentLocation()

  const token = localStorage.getItem("dashboard_token")
  const ws = new WebSocket(`${wsUrl}/ws/dashboard?token=${token}`)

  ws.onmessage = onMessage
  ws.onopen = onOpen
  ws.onclose = onClose
  ws.onerror = onError
}

const getWebSocketUrlFromCurrentLocation = () => {
  const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
  return `${wsProtocol}//${window.location.host}`
}

const onMessage = (event: { data: string }) => {
  try {
    const message = JSON.parse(event.data)
    eventHandler(message)
  } catch (err) {}
}

const onOpen = () => {
  if (settings.developerMode === true) {
    console.log("Connection established.")
  }
}

const onError = () => {}

const onClose = event => {
  if (event.code !== 1000) {
    if (settings.developerMode === true) {
      console.log(`WebSocket connection closed with code: ${event.code}.`)
    }
    // try to reconnect
    setTimeout(() => {
      connect()
    }, autoReconnectInterval)
  }
}

const showNotification = (
  title: string,
  body: string,
  requireInteraction = false
) => {
  let msg = new Notification(title, {
    body: body,
    tag: "dashboard",
    requireInteraction: requireInteraction,
  })

  msg.addEventListener("click", event => {
    window.parent.focus()
    // event.target.close()
  })
}

const eventHandler = ({ event, payload }) => {
  switch (event) {
    case themeInstalled:
      const fileName = payload
      store.dispatch(installReceive())
      showNotification(messages.settings_theme, messages.themeInstalled)
      break
    case orderCreated:
      const order = payload
      store.dispatch(fetchOrders())
      showNotification(
        `${messages.order} #${order.number}`,
        `${order.shipping_address.full_name}, ${order.shipping_address.city}`,
        true
      )
      break
    default:
      break
  }
}
