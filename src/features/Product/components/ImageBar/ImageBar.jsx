import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, ImageListItemBar } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import styles from "./ImageBar.module.scss";

ImageBar.propTypes = {
  product: PropTypes.object.isRequired,
};

function ImageBar(props) {
  return (
    <ImageListItemBar
      className={styles.imageBar}
      title={
        <Link
          className={styles.productName}
          to={props.product.id}
          state={props.product.id}
        >
          {props.product.name}
        </Link>
      }
      subtitle={
        <Box display="flex" flexDirection="column">
          <span className={styles.productPrice}>
            {props.product.salePrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
            đ
          </span>
          <span className={styles.productSale}>
            {Math.floor(
              (100 * (props.product.originalPrice - props.product.salePrice)) /
                props.product.originalPrice,
            )}
            % Off
          </span>
          <div className={styles.productReview}>
            <span className={styles.productSold}>
              <span className={styles.sold}>{props.product.sold} sold</span>
              <span className={styles.straightLine}></span>
            </span>
            <div className={styles.productRating}>
              {[...Array(5)].map((_, index) => (
                <StarRoundedIcon
                  key={index}
                  htmlColor="#FFA500"
                  className={styles.starRoundedIcon}
                />
              ))}
            </div>
            <span className={styles.productStoreAddress}>
              {props.product.storeAddress}
            </span>
          </div>
        </Box>
      }
      position="below"
    />
  );
}

export default ImageBar;
