import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

import styles from "./ProductPage.module.scss";
import FilterPage from "../../components/Filter/FilterPage";
import ListProductsPage from "../../components/ListProductsPage/ListProductsPage";
import Anchor from "../../components/Anchor/Anchor";
import Header from "../../../../components/Header/Header";
import productApi from "../../../../api/productApi";

ProductPage.propTypes = {};

function ProductPage(props) {
  // Get API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Variable that checks whether the page is loading or not

  useEffect(() => {
    productApi
      .getAll()
      .then((response) => {
        setProducts(response);
        setLoading(false);
      })
      .catch((error) => {
        window.location.href = "/404"; // Redirect to 404 page Not found
      });
  }, []);

  // Filter products by Brand
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleBrandCheckboxChange = (brandItem) => {
    if (selectedBrands.includes(brandItem)) {
      setSelectedBrands(
        selectedBrands.filter((selectedBrand) => selectedBrand !== brandItem),
      );
    } else {
      setSelectedBrands([...selectedBrands, brandItem]);
    }
  };

  const handleBrandListItemButtonClick = (brandItem) => {
    handleBrandCheckboxChange(brandItem);
  };

  // Filter products by StoreAddress
  const [selectedStoreAddress, setSelectedStoreAddress] = useState([]);

  const handleStoreAddressCheckboxChange = (storeAddressItem) => {
    if (selectedStoreAddress.includes(storeAddressItem)) {
      setSelectedStoreAddress(
        selectedStoreAddress.filter(
          (selectedStoreAddress) => selectedStoreAddress !== storeAddressItem,
        ),
      );
    } else {
      setSelectedStoreAddress([...selectedStoreAddress, storeAddressItem]);
    }
  };

  const handleStoreAddressListItemButtonClick = (storeAddressItem) => {
    handleStoreAddressCheckboxChange(storeAddressItem);
  };

  // Filter products by Price
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterPrice = ({ minPrice, maxPrice }) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  // Filter products by Condition
  const [selectedConditions, setSelectedConditions] = useState([]);

  const handleConditionCheckboxChange = (condition) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(
        selectedConditions.filter(
          (selectedCondition) => selectedCondition !== condition,
        ),
      );
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const handleConditionListItemButtonClick = (condition) => {
    handleConditionCheckboxChange(condition);
  };

  // Filter products by Service and Promotion
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceCheckboxChange = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(
        selectedServices.filter(
          (selectedService) => selectedService !== service,
        ),
      );
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleServiceListItemButtonClick = (service) => {
    handleServiceCheckboxChange(service);
  };

  return (
    <Box className={styles.product}>
      <Container maxWidth="xl" className={styles.container}>
        <Box className={styles.header}>
          {loading ? (
            <Box className={styles.skeletonHeader}>
              <Skeleton
                variant="rounded"
                width="20%"
                height={30}
                style={{ marginBottom: 20 }}
              />

              <Skeleton
                variant="rounded"
                width="3%"
                height={30}
                style={{ marginBottom: 20 }}
              />
            </Box>
          ) : (
            <Box className={styles.headerBar}>
              <Header />
            </Box>
          )}
        </Box>
        <Box className={styles.anchor}>
          {loading ? (
            <Skeleton variant="rounded" width="80%" height={30} />
          ) : (
            <Anchor
              products={products}
              // Brand
              selectedBrands={selectedBrands}
              handleBrandCheckboxChange={handleBrandCheckboxChange}
              handleBrandListItemButtonClick={handleBrandListItemButtonClick}
              // StoreAddress
              selectedStoreAddress={selectedStoreAddress}
              handleStoreAddressCheckboxChange={
                handleStoreAddressCheckboxChange
              }
              handleStoreAddressListItemButtonClick={
                handleStoreAddressListItemButtonClick
              }
              // Price
              onPriceRange={handleFilterPrice}
              // Condition
              selectedConditions={selectedConditions}
              handleConditionCheckboxChange={handleConditionCheckboxChange}
              handleConditionListItemButtonClick={
                handleConditionListItemButtonClick
              }
              // Service and Promotion
              selectedServices={selectedServices}
              handleServiceCheckboxChange={handleServiceCheckboxChange}
              handleServiceListItemButtonClick={
                handleServiceListItemButtonClick
              }
            />
          )}
        </Box>

        <Grid container spacing={2} className={styles.main}>
          <Grid item xs={12} sm={2.4} className={styles.filterPage}>
            {loading ? (
              <Box>
                <Skeleton
                  variant="rounded"
                  width="60%"
                  height={25}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={28}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={28}
                  style={{ marginBottom: 30 }}
                />
                <Skeleton
                  variant="rounded"
                  width="60%"
                  height={25}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={28}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton variant="text" width="40%" height={28} />
              </Box>
            ) : (
              <FilterPage
                loading={loading}
                products={products}
                // Brand
                selectedBrands={selectedBrands}
                handleBrandCheckboxChange={handleBrandCheckboxChange}
                handleBrandListItemButtonClick={handleBrandListItemButtonClick}
                // StoreAddress
                selectedStoreAddress={selectedStoreAddress}
                handleStoreAddressCheckboxChange={
                  handleStoreAddressCheckboxChange
                }
                handleStoreAddressListItemButtonClick={
                  handleStoreAddressListItemButtonClick
                }
                // Price
                onPriceRange={handleFilterPrice}
                // Condition
                selectedConditions={selectedConditions}
                handleConditionCheckboxChange={handleConditionCheckboxChange}
                handleConditionListItemButtonClick={
                  handleConditionListItemButtonClick
                }
                // Service and Promotion
                selectedServices={selectedServices}
                handleServiceCheckboxChange={handleServiceCheckboxChange}
                handleServiceListItemButtonClick={
                  handleServiceListItemButtonClick
                }
              />
            )}
          </Grid>
          <Grid item xs={12} sm={9.6} className={styles.listProductsPage}>
            {loading ? (
              <Box className={styles.productsSkeleton}>
                {[...Array(8)].map((_, index) => (
                  <Box key={index} className={styles.productSkeleton}>
                    <Skeleton variant="rectangular" width="100%" height={118} />
                    <Skeleton
                      variant="rectangular"
                      width="10%"
                      height={18}
                      className={styles.mallImg}
                    />
                    <Skeleton variant="text" width="80%" height={18} />
                    <Skeleton variant="text" width="40%" height={18} />
                    <Skeleton variant="text" width="10%" height={18} />
                    <Skeleton variant="text" width="60%" height={18} />
                  </Box>
                ))}
              </Box>
            ) : (
              <ListProductsPage
                products={products}
                // Brand
                selectedBrands={selectedBrands}
                // StoreAddress
                selectedStoreAddress={selectedStoreAddress}
                // Price
                minPrice={minPrice}
                maxPrice={maxPrice}
                // Condition
                selectedConditions={selectedConditions}
                // Service and Promotion
                selectedServices={selectedServices}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductPage;
