import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import styles from "./FilterByPrice.module.scss";

FilterByPrice.propTypes = {
  onPriceRange: PropTypes.func.isRequired,
};

function FilterByPrice(props) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterPriceClick = () => {
    props.onPriceRange({ minPrice, maxPrice });
  };

  return (
    <Box className={styles.priceBox}>
      <input
        type="number"
        id="minPrice"
        name="minPrice"
        placeholder="Min"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <div className={styles.dash}></div>

      <input
        type="number"
        id="maxPrice"
        name="maxPrice"
        placeholder="Max"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button className={styles.applyButton} onClick={handleFilterPriceClick}>
        <PlayArrowIcon className={styles.playIcon} />
      </button>
    </Box>
  );
}

export default FilterByPrice;
