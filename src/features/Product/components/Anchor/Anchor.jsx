import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./Anchor.module.scss";
import FilterPage from "../Filter/FilterPage";

Anchor.propTypes = {
  products: PropTypes.array.isRequired,
  // Brand
  selectedBrands: PropTypes.array.isRequired,
  handleBrandCheckboxChange: PropTypes.func.isRequired,
  handleBrandListItemButtonClick: PropTypes.func.isRequired,
  // StoreAddress
  selectedStoreAddress: PropTypes.array.isRequired,
  handleStoreAddressCheckboxChange: PropTypes.func.isRequired,
  handleStoreAddressListItemButtonClick: PropTypes.func.isRequired,
  // Price
  onPriceRange: PropTypes.func.isRequired,
  // Condition
  selectedConditions: PropTypes.array.isRequired,
  handleConditionCheckboxChange: PropTypes.func.isRequired,
  handleConditionListItemButtonClick: PropTypes.func.isRequired,
  // Service and Promotion
  selectedServices: PropTypes.array.isRequired,
  handleServiceCheckboxChange: PropTypes.func.isRequired,
  handleServiceListItemButtonClick: PropTypes.func.isRequired,
};

function Anchor(props) {
  const [anchor, setAnchor] = useState(null);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Box className={styles.iconmenu}>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
        className={styles.icon}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu"
        anchor={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose}
        className={styles.menu}
      >
        <MenuItem>
          <FilterPage
            products={props.products}
            // Brand
            selectedBrands={props.selectedBrands}
            handleBrandCheckboxChange={props.handleBrandCheckboxChange}
            handleBrandListItemButtonClick={
              props.handleBrandListItemButtonClick
            }
            // StoreAddress
            selectedStoreAddress={props.selectedStoreAddress}
            handleStoreAddressCheckboxChange={
              props.handleStoreAddressCheckboxChange
            }
            handleStoreAddressListItemButtonClick={
              props.handleStoreAddressListItemButtonClick
            }
            // Price
            onPriceRange={props.onPriceRange}
            // Condition
            selectedConditions={props.selectedConditions}
            handleConditionCheckboxChange={props.handleConditionCheckboxChange}
            handleConditionListItemButtonClick={
              props.handleConditionListItemButtonClick
            }
            // Service and Promotion
            selectedServices={props.selectedServices}
            handleServiceCheckboxChange={props.handleServiceCheckboxChange}
            handleServiceListItemButtonClick={
              props.handleServiceListItemButtonClick
            }
          />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Anchor;
