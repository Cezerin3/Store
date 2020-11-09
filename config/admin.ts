// config used by dashboard client side only
const Config = {
  // dashboard UI language
  language: process.env.CONFIG_ADMIN_LANGUAGE || "en", // Edit at .env file!
  apiBaseUrl: "http://localhost:3001/api/v1",
  apiWebSocketUrl: "ws://localhost:3001",
  developerMode: true,
}

export default Config
