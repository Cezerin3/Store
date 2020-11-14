import { Clear, Folder, Settings } from "@material-ui/icons"
import messages from "lib/text"
import { List, ListItem } from "material-ui/List"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"

const styles = {
  selectedItem: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  innerItem: {
    paddingLeft: 55,
  },
}

const FolderIcon = <Folder />

const Groups = props => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { onSelect, selectedId, items, showAll, showRoot, showManage } = props

  const rows = items.map(item => (
    <ListItem
      key={item.id}
      className="treeItem"
      style={item.id === selectedId ? styles.selectedItem : null}
      innerDivStyle={styles.innerItem}
      primaryText={item.name}
      leftIcon={FolderIcon}
      onClick={() => {
        props.onSelect(item.id)
      }}
    />
  ))

  return (
    <List>
      {showRoot && (
        <ListItem
          className="treeItem"
          primaryText={messages.customers_noGroup}
          style={"root" === selectedId ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={<Clear />}
          onClick={() => {
            onSelect("root")
          }}
        />
      )}

      {showAll && (
        <ListItem
          className="treeItem"
          primaryText={messages.customerGroups_all}
          style={"all" === selectedId ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={FolderIcon}
          onClick={() => {
            onSelect("all")
          }}
        />
      )}

      {rows}

      {showManage && (
        <Link to="/admin/customers/groups" style={{ textDecoration: "none" }}>
          <ListItem
            className="treeItem"
            primaryText={messages.customerGroups_titleEditMany}
            innerDivStyle={styles.innerItem}
            leftIcon={<Settings />}
          />
        </Link>
      )}
    </List>
  )
}

export default Groups
