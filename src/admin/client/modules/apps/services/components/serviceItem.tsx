import React, { FC } from "react"
import Item from "./item"

interface props {
  service: {
    id: string
    cover_url: string
    name: string
    developer: { name: string }
    enabled: boolean
  }
}

const ServiceItem: FC<props> = ({ service }: props) => {
  const { id, cover_url, name, developer, enabled } = service

  return (
    <Item
      path={`/admin/apps/service/${id}`}
      coverUrl={cover_url}
      title={name}
      developer={developer.name}
      enabled={enabled}
    />
  )
}

export default ServiceItem
