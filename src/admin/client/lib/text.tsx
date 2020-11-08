import locales from "./locales"
import config from "./settings"

const locale = locales.find(({ local }) => config.language == local)

export default locale
