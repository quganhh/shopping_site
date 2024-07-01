import React from "react";
import PropTypes from "prop-types";
import { Grid, Box } from "@mui/material";

import styles from "./FilterPage.module.scss";
import FilterByBrand from "./FilterByBrand/FilterByBrand";
import FilterByStoreAddress from "./FilterByStoreAddress/FilterByStoreAddress";
import FilterByPrice from "./FilterByPrice/FilterByPrice";
import FilterByCondition from "./FilterByCondition/FilterByCondition";
import FilterByService from "./FilterByService/FilterByService";

FilterPage.propTypes = {
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

function FilterPage(props) {
  return (
    <Grid container spacing={2}>
      <Grid item lg={12} className={styles.boxFilter}>
        <Box className={`${styles.filterTitle} ${styles.borderHead}`}>
          Brand
        </Box>

        <FilterByBrand
          products={props.products}
          selectedBrands={props.selectedBrands}
          handleBrandCheckboxChange={props.handleBrandCheckboxChange}
          handleBrandListItemButtonClick={props.handleBrandListItemButtonClick}
        />
      </Grid>

      <Grid item lg={12} className={styles.boxFilter}>
        <Box className={styles.filterTitle}>Shipped From</Box>

        <FilterByStoreAddress
          products={props.products}
          selectedStoreAddress={props.selectedStoreAddress}
          handleStoreAddressCheckboxChange={
            props.handleStoreAddressCheckboxChange
          }
          handleStoreAddressListItemButtonClick={
            props.handleStoreAddressListItemButtonClick
          }
        />
      </Grid>

      <Grid item lg={12} className={styles.boxFilter}>
        <Box className={styles.filterTitle}>Price</Box>

        <FilterByPrice onPriceRange={props.onPriceRange} />
      </Grid>

      <Grid item lg={12} className={styles.boxFilter}>
        <Box className={styles.filterTitle}>Condition</Box>

        <FilterByCondition
          selectedConditions={props.selectedConditions}
          handleConditionCheckboxChange={props.handleConditionCheckboxChange}
          handleConditionListItemButtonClick={
            props.handleConditionListItemButtonClick
          }
        />
      </Grid>
      <Grid item lg={12} className={styles.boxFilter}>
        <Box className={styles.filterTitle}>Service & Promotion</Box>

        <FilterByService
          selectedServices={props.selectedServices}
          handleServiceCheckboxChange={props.handleServiceCheckboxChange}
          handleServiceListItemButtonClick={
            props.handleServiceListItemButtonClick
          }
        />
      </Grid>
    </Grid>
  );
}

export default FilterPage;
