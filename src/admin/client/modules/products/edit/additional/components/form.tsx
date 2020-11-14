import { Button, Paper } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"
import api from "lib/api"
import * as helper from "lib/helper"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import React, { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import TagsInput from "react-tagsinput"
import { Field, FieldArray, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"
import ProductSearchDialog from "../../../../shared/productSearch"
import ProductCategoryMultiSelect from "./productCategoryMultiSelect"
import ProductCategorySelect from "./productCategorySelect"
import style from "./style.module.sass"

const TagsField = ({ input, placeholder }) => {
  const tagsArray = input.value && Array.isArray(input.value) ? input.value : []
  return (
    <TagsInput
      value={tagsArray}
      inputProps={{ placeholder: placeholder }}
      onChange={tags => {
        input.onChange(tags)
      }}
    />
  )
}

const ProductShort = ({
  id,
  name,
  thumbnailUrl,
  priceFormatted,
  enabled,
  discontinued,
  actions,
}) => (
  <div
    className={
      style.relatedProduct +
      (enabled === false || discontinued === true
        ? " " + style.relatedProductDisabled
        : "")
    }
  >
    <div className={style.relatedProductImage}>
      {thumbnailUrl && thumbnailUrl !== "" && <img src={thumbnailUrl} />}
    </div>
    <div className={style.relatedProductText}>
      <Link to={`/admin/product/${id}`}>{name}</Link>
      <br />
      <p>{priceFormatted}</p>
    </div>
    <div className={style.relatedProductActions}>{actions}</div>
  </div>
)

const RelatedProductActions = ({ fields, index }) => (
  <IconMenu
    targetOrigin={{ horizontal: "right", vertical: "top" }}
    anchorOrigin={{ horizontal: "right", vertical: "top" }}
    iconButtonElement={
      <IconButton touch>
        <MoreVert htmlColor="#777" />
      </IconButton>
    }
  >
    <MenuItem
      primaryText={messages.actions_delete}
      onClick={() => fields.remove(index)}
    />
    {index > 0 && (
      <MenuItem
        primaryText={messages.actions_moveUp}
        onClick={() => fields.move(index, index - 1)}
      />
    )}
    {index + 1 < fields.length && (
      <MenuItem
        primaryText={messages.actions_moveDown}
        onClick={() => fields.move(index, index + 1)}
      />
    )}
  </IconMenu>
)

const RelatedProduct = ({ settings, product, actions }) => {
  if (product) {
    const priceFormatted = helper.formatCurrency(product.price, settings)
    const imageUrl =
      product && product.images.length > 0 ? product.images[0].url : null
    const thumbnailUrl = helper.getThumbnailUrl(imageUrl, 100)
    return (
      <ProductShort
        id={product.id}
        name={product.name}
        thumbnailUrl={thumbnailUrl}
        priceFormatted={priceFormatted}
        enabled={product.enabled}
        discontinued={product.discontinued}
        actions={actions}
      />
    )
  } else {
    // product doesn't exist
    return (
      <ProductShort
        id="-"
        name=""
        thumbnailUrl=""
        priceFormatted=""
        actions={actions}
      />
    )
  }
}

const ProductsArray = props => {
  const [showAddItem, setShowAddItem] = useState(false)
  const [products, setProducts] = useState([])

  const addItem = productId => {
    setShowAddItem(false)
    props.fields.push(productId)
  }

  useEffect(() => {
    const ids = props.fields.getAll()
    fetchProducts(ids)
  }, [])

  useEffect(() => {
    const currentIds = props.fields.getAll()
    fetchProducts(currentIds)
  }, [props.fields])

  const fetchProducts = ids => {
    if (ids && Array.isArray(ids) && ids.length > 0) {
      api.products
        .list({
          limit: 50,
          fields:
            "id,name,enabled,discontinued,price,on_sale,regular_price,images",
          ids: ids,
        })
        .then(productsResponse => {
          setProducts(productsResponse.json.data)
        })
    } else {
      setProducts([])
    }
  }

  const { settings, fields } = props

  return (
    <>
      <Paper className={style.relatedProducts} elevation={4}>
        {fields.map((field, index) => {
          const actions = (
            <RelatedProductActions fields={fields} index={index} />
          )
          const productId = fields.get(index)
          const product = products.find(item => item.id === productId)
          return (
            <RelatedProduct
              key={index}
              settings={settings}
              product={product}
              actions={actions}
            />
          )
        })}

        <ProductSearchDialog
          open={showAddItem}
          title={messages.addOrderItem}
          settings={settings}
          onSubmit={addItem}
          onCancel={() => setShowAddItem(false)}
          submitLabel={messages.add}
          cancelLabel={messages.cancel}
        />
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddItem(true)}
      >
        {messages.addOrderItem}
      </Button>
    </>
  )
}

interface props {
  handleSubmit
  pristine
  reset
  submitting
  settings
  categories
}

const ProductAdditionalForm: FC<props> = (props: props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    settings,
    categories,
  } = props
  return (
    <form onSubmit={handleSubmit}>
      <Paper className="paper-box" elevation={4}>
        <div className={style.innerBox}>
          <div
            className="row middle-xs"
            style={{
              padding: "0 0 15px 0",
              borderBottom: "1px solid #e0e0e0",
              marginBottom: 20,
            }}
          >
            <div className="col-xs-12 col-sm-4">{messages.category}</div>
            <div className="col-xs-12 col-sm-8">
              <Field
                name="category_id"
                component={ProductCategorySelect}
                categories={categories}
              />
            </div>
          </div>

          <div
            className="row middle-xs"
            style={{
              padding: "0 0 15px 0",
              borderBottom: "1px solid #e0e0e0",
              marginBottom: 25,
            }}
          >
            <div className="col-xs-12 col-sm-4">
              {messages.additionalCategories}
            </div>
            <div className="col-xs-12 col-sm-8">
              <FieldArray
                name="category_ids"
                component={ProductCategoryMultiSelect}
                categories={categories}
              />
            </div>
          </div>

          <div
            className="row middle-xs"
            style={{ padding: "0 0 20px 0", borderBottom: "1px solid #e0e0e0" }}
          >
            <div className="col-xs-12 col-sm-4">{messages.tags}</div>
            <div className="col-xs-12 col-sm-8">
              <Field
                name="tags"
                component={TagsField}
                placeholder={messages.newTag}
              />
            </div>
          </div>

          <div
            className="row middle-xs"
            style={{ borderBottom: "1px solid #e0e0e0", marginBottom: 20 }}
          >
            <div className="col-xs-12 col-sm-4">{messages.position}</div>
            <div className="col-xs-12 col-sm-8">
              <Field
                name="position"
                component={TextField}
                floatingLabelText={messages.position}
                fullWidth={false}
                style={{ width: 128 }}
                type="number"
              />
            </div>
          </div>

          {messages.relatedProducts}
          <FieldArray
            name="related_product_ids"
            component={ProductsArray}
            settings={settings}
          />
        </div>
        <div
          className={
            "buttons-box " +
            (pristine ? "buttons-box-pristine" : "buttons-box-show")
          }
        >
          <Button
            variant="contained"
            color="primary"
            className={style.button}
            onClick={reset}
            disabled={pristine || submitting}
          >
            {messages.cancel}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={style.button}
            disabled={pristine || submitting}
          >
            {messages.save}
          </Button>
        </div>
      </Paper>
    </form>
  )
}

export default reduxForm({
  form: "ProductAdditionalForm",
  enableReinitialize: true,
})(ProductAdditionalForm)
