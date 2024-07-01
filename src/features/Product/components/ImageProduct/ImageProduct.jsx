import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import styles from "./ImageProduct.module.scss";

ImageProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

function ImageProduct(props) {
  const [hoveredImage, setHoveredImage] = useState(null);

  // Process the main image when hovering over the secondary image
  const handleImageHover = (imageSrc) => {
    setHoveredImage(imageSrc);
  };

  return (
    <Box>
      <Link to={props.product.id} state={props.product.id}>
        <img
          className={styles.image}
          src={hoveredImage || props.product.image}
          alt={props.product.name}
          loading="lazy"
        />
      </Link>

      <Box className={styles.distance} />

      {props.product.thumbs.map((image, i) => (
        <Link to={props.product.id} key={i}>
          <img
            className={styles.imageSmall}
            src={image}
            alt={props.product.name}
            loading="lazy"
            onMouseEnter={() => handleImageHover(image)}
            onMouseLeave={() => handleImageHover(null)}
          />
        </Link>
      ))}
    </Box>
  );
}

export default ImageProduct;
