import React from "react";
import PropTypes from "prop-types";
import { List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import styles from "./FilterByStoreAddress.module.scss";

FilterByStoreAddress.propTypes = {
  products: PropTypes.array.isRequired,
  selectedStoreAddress: PropTypes.array.isRequired,
  handleStoreAddressCheckboxChange: PropTypes.func.isRequired,
  handleStoreAddressListItemButtonClick: PropTypes.func.isRequired,
};

function FilterByStoreAddress(props) {
  const products = props.products || [
    "Hồ Chí Minh",
    "Tokyo, Japan",
    "Texas, USA",
    "Seoul, South Korea",
    "Cupertino, California, USA",
  ]; // Make sure the products is identified
  const storeAddress = [
    ...new Set(products.map((product) => product.storeAddress)),
  ]; // Get the list of storeAddress from the products array

  const selectedStoreAddress = props.selectedStoreAddress || []; // Make sure the selectedStoreAddress is identified

  return (
    <List id={styles.list}>
      {storeAddress.map((storeAddressItem, index) => (
        <ListItem disablePadding key={index} className={styles.listItem}>
          <ListItemButton
            className={styles.listItemButton}
            id={storeAddressItem}
            onClick={() =>
              props.handleStoreAddressCheckboxChange(storeAddressItem)
            }
          >
            <input
              type="checkbox"
              id={storeAddressItem}
              name="storeAddressItem"
              checked={selectedStoreAddress.includes(storeAddressItem)}
              onChange={() =>
                props.handleStoreAddressListItemButtonClick(storeAddressItem)
              }
            />
            <label htmlFor={storeAddressItem}>{storeAddressItem}</label>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default FilterByStoreAddress;
