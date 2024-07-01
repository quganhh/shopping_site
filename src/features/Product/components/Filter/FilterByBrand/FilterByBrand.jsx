import React from "react";
import PropTypes from "prop-types";
import { List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import styles from "./FilterByBrand.module.scss";

FilterByBrand.propTypes = {
  products: PropTypes.array.isRequired,
  selectedBrands: PropTypes.array.isRequired,
  handleBrandCheckboxChange: PropTypes.func.isRequired,
  handleBrandListItemButtonClick: PropTypes.func.isRequired,
};

function FilterByBrand(props) {
  const products = props.products || [
    "Apple",
    "Sony",
    "Dell",
    "Canon",
    "Xiaomi",
    "Samsung",
    "JBL",
  ]; // Make sure the products is identified
  const brands = [...new Set(products.map((product) => product.brand))]; // Get the list of brands from the products array

  const selectedBrands = props.selectedBrands || []; // Make sure the selectedBrands is identified

  return (
    <List id={styles.list}>
      {brands.map((brandItem, index) => (
        <ListItem disablePadding key={index} className={styles.listItem}>
          <ListItemButton
            className={styles.listItemButton}
            id={brandItem}
            onClick={() => props.handleBrandListItemButtonClick(brandItem)}
          >
            <input
              type="checkbox"
              id={brandItem}
              name="brandItem"
              checked={selectedBrands.includes(brandItem)}
              onChange={() => props.handleBrandCheckboxChange(brandItem)}
            />
            <label htmlFor={brandItem}>{brandItem}</label>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default FilterByBrand;
