import {
  Folder,
  GetApp,
  Home,
  Settings,
  VisibilityOff,
} from "@material-ui/icons"
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
  nestedListStyle: {
    padding: "0 0 0 15px",
  },
}

const FolderIcon = <Folder />
const DraftIcon = <VisibilityOff />

const Item = props => {
  const handleClick = () => {
    const { item } = props
    props.onSelect(item.id)
  }

  const { item, opened, selectedId, nestedItems } = props
  const icon = item.enabled ? FolderIcon : DraftIcon
  const style = item.id === selectedId ? styles.selectedItem : null

  return (
    <ListItem
      className="treeItem"
      initiallyOpen={opened}
      style={style}
      innerDivStyle={styles.innerItem}
      primaryText={item.name}
      nestedItems={nestedItems}
      leftIcon={icon}
      onClick={handleClick}
      nestedListStyle={styles.nestedListStyle}
    />
  )
}

const Categories = props => {
  useEffect(() => {
    props.onLoad()
  }, [])

  function getItem(selectedId, allItems, item, opened) {
    const nestedItems = getChildren(selectedId, allItems, item.id, opened)
    return (
      <Item
        key={item.id}
        item={item}
        opened={opened}
        selectedId={selectedId}
        nestedItems={nestedItems}
        onSelect={props.onSelect}
      />
    )
  }

  function getChildren(selectedId, allItems, id, opened) {
    if (allItems && id) {
      return allItems
        .filter(item => item.parent_id === id)
        .map(item => getItem(selectedId, allItems, item, opened))
    } else {
      return []
    }
  }

  const handleClickAll = () => {
    props.onSelect("all")
    document.getElementsByClassName("product-list")[0].style.display = "block"
    if (
      document.getElementsByClassName("spread-sheet-container")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "spread-sheet-container"
      )[0].style.display = "none"
    }
  }

  const handleClickRoot = () => {
    props.onSelect("root")
    document.getElementsByClassName("product-list")[0].style.display = "block"
    if (
      document.getElementsByClassName("spread-sheet-container")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "spread-sheet-container"
      )[0].style.display = "none"
    }
  }

  const handleClickImport = () => {
    document.getElementsByClassName("product-list")[0].style.display = "none"
    if (
      document.getElementsByClassName("spread-sheet-container")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "spread-sheet-container"
      )[0].style.display = "block"
    }
  }

  const {
    selectedId,
    items,
    showAll = false,
    showRoot = false,
    showManage = false,
    showImport = true,
    rootName = messages.productCategories_root,
    allName = messages.productCategories_all,
    opened = false,
  } = props

  var rows = items
    .filter(item => item.parent_id === null)
    .map(item => getItem(selectedId, items, item, opened))

  return (
    <List>
      {showRoot && (
        <ListItem
          primaryText={rootName}
          style={"root" === selectedId ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={<Home />}
          onClick={handleClickRoot}
        />
      )}

      {showAll && (
        <ListItem
          className="treeItem"
          primaryText={allName}
          style={"all" === selectedId ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={<Folder />}
          onClick={handleClickAll}
        />
      )}

      {rows}

      {showManage && (
        <Link
          to="/admin/products/categories"
          style={{ textDecoration: "none" }}
        >
          <ListItem
            className="treeItem"
            primaryText={messages.productCategories_titleEditMany}
            innerDivStyle={styles.innerItem}
            leftIcon={<Settings />}
          />
        </Link>
      )}

      {showImport && (
        <Link to="/admin/products/import" style={{ textDecoration: "none" }}>
          <ListItem
            className="treeItem"
            primaryText={messages.drawer_importing}
            innerDivStyle={styles.innerItem}
            leftIcon={<GetApp />}
            onClick={handleClickImport}
          />
        </Link>
      )}
    </List>
  )
}

export default Categories
