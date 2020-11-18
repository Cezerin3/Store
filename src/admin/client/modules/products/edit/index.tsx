import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { messages } from "../../../lib"
import { fetchCategoriesIfNeeded } from "../../productCategories/actions"
import { cancelProductEdit, fetchProduct } from "../actions"
import ProductAdditional from "./additional"
import ProductAttributes from "./attributes"
import ProductGeneral from "./general"
import ProductImages from "./images"
import ProductInventory from "./inventory"
import ProductVariants from "./variants"

const ProductEditContainer = props => {
  useEffect(() => {
    props.fetchData()
  }, [])

  useEffect(() => {
    return () => props.eraseData()
  }, [])

  return (
    <>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.description}
      </div>
      <ProductGeneral />

      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.products_inventory}
      </div>
      <ProductInventory />

      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.productVariants}
      </div>
      <ProductVariants />

      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.attributes}
      </div>
      <ProductAttributes />

      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.additionalInfo}
      </div>
      <ProductAdditional />

      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.images}
      </div>
      <ProductImages />
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.editProduct,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: () => {
      const { productId } = ownProps.match.params
      dispatch(fetchProduct(productId))
      dispatch(fetchCategoriesIfNeeded())
    },
    eraseData: () => {
      dispatch(cancelProductEdit())
    },
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductEditContainer)
)
