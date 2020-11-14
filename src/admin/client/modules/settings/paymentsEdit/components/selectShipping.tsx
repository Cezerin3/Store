import { List } from "@material-ui/core"
import Checkbox from "material-ui/Checkbox"
import { ListItem } from "material-ui/List"
import React, { useEffect, useState } from "react"

const SelectShippingMethodsField = props => {
  const ids = Array.isArray(props.input.value) ? props.input.value : []
  const [selectedIds, setSelectedIds] = useState(ids)

  useEffect(() => {
    const newIds = Array.isArray(props.input.value) ? props.input.value : []
    if (newIds !== selectedIds) {
      setSelectedIds(newIds)
    }
  }, [props.input])

  const onCheckboxChecked = methodId => {
    let ids = selectedIds
    if (ids.includes(methodId)) {
      ids = ids.filter(id => id !== methodId)
    } else {
      ids.push(methodId)
    }
    selectedIds(ids)
    props.input.onChange(ids)
  }

  const isCheckboxChecked = methodId => {
    return selectedIds.includes(methodId)
  }

  const items = props.shippingMethods.map(method => (
    <ListItem
      key={method.id}
      leftCheckbox={
        <Checkbox
          checked={isCheckboxChecked(method.id)}
          onCheck={(e, isChecked) => {
            onCheckboxChecked(method.id)
          }}
        />
      }
      primaryText={method.name}
      secondaryText={method.description}
    />
  ))

  return <List>{items}</List>
}

export default SelectShippingMethodsField
