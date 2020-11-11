import { CheckCircle } from "@material-ui/icons"
import { Card, CardMedia, CardTitle } from "material-ui/Card"
import React, { FC } from "react"
import { Link } from "react-router-dom"
import style from "./style.module.sass"

const styles = {
  card: {
    width: 280,
    marginBottom: 15,
    marginRight: 15,
  },
  textContainer: {
    paddingBottom: 0,
  },
  title: {
    color: "#212121",
    fontSize: "15px",
    lineHeight: "18px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  subtitle: {
    color: "#616161",
    fontSize: "13px",
    lineHeight: "16px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginTop: 5,
  },
  link: {
    textDecoration: "none",
  },
}

interface props {
  path
  coverUrl
  title
  developer
  enabled
}

const Item: FC<props> = (props: props) => {
  const { path, coverUrl, title, developer, enabled } = props
  return (
    <Link to={path} style={styles.link}>
      <Card
        style={styles.card}
        containerStyle={styles.textContainer}
        className={style.card}
      >
        <CardMedia
          className={style.servicesCover}
          style={{ backgroundImage: `url(${coverUrl})` }}
        />
        <CardTitle
          title={title}
          subtitle={
            <>
              {developer}
              {enabled && (
                <CheckCircle style={{ color: "#FF9900", float: "right" }} />
              )}
            </>
          }
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
        />
      </Card>
    </Link>
  )
}

export default Item
