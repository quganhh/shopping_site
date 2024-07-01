import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Grid, ImageListItem } from "@mui/material";

import styles from "./ListProductsPage.module.scss";
import Pagination from "../Pagination/Pagination";
import ImageProduct from "../ImageProduct/ImageProduct";
import ImageBar from "../ImageBar/ImageBar";

ListProductsPage.propTypes = {
  products: PropTypes.array.isRequired,
  selectedBrands: PropTypes.array.isRequired,
  selectedStoreAddress: PropTypes.array.isRequired,
  minPrice: PropTypes.string.isRequired,
  maxPrice: PropTypes.string.isRequired,
  selectedConditions: PropTypes.array.isRequired,
  selectedServices: PropTypes.array.isRequired,
};

function ListProductsPage(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Get products for the current page
  // Filter products based on selected categories
  useEffect(() => {
    const filteredList = filteredProductsList();
    setFilteredProducts(filteredList);
  }, [
    props.products,
    props.selectedBrands,
    props.selectedStoreAddress,
    props.minPrice,
    props.maxPrice,
    props.selectedConditions,
    props.selectedServices,
  ]);

  const filteredProductsList = () => {
    let filteredList = props.products;
    setCurrentPage(1);

    if (props.selectedBrands.length > 0) {
      filteredList = filteredList.filter((product) =>
        props.selectedBrands.includes(product.brand),
      );
    }

    if (props.selectedStoreAddress.length > 0) {
      filteredList = filteredList.filter((product) =>
        props.selectedStoreAddress.includes(product.storeAddress),
      );
    }

    if (props.minPrice !== "") {
      filteredList = filteredList.filter(
        (product) => props.minPrice <= product.salePrice,
      );
    }

    if (props.maxPrice !== "") {
      filteredList = filteredList.filter(
        (product) => props.maxPrice >= product.salePrice,
      );
    }

    if (props.selectedConditions.length > 0) {
      filteredList = filteredList.filter((product) => {
        return props.selectedConditions.some((condition) => {
          if (condition === "New") {
            return product.isNew;
          }
          if (condition === "Used") {
            return !product.isNew;
          }
          return false;
        });
      });
    }

    if (props.selectedServices.length > 0) {
      filteredList = filteredList.filter((product) => {
        return props.selectedServices.every((service) => {
          if (service === "Free Shipping") {
            return product.isFreeShip;
          }
          if (service === "Promotion") {
            return product.isPromotion;
          }
          return false;
        });
      });
    }

    return filteredList;
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  // Handles page transitions
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Grid container spacing={2}>
      {currentProducts.length === 0 ? (
        <Grid item xs={12} className={styles.productNotAvailable}>
          Không tìm thấy sản phẩm phù hợp
        </Grid>
      ) : (
        currentProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box className={styles.product}>
              <ImageListItem>
                <ImageProduct product={product} />
                <Box className={styles.distance} />
                <ImageBar product={product} />
              </ImageListItem>
            </Box>
          </Grid>
        ))
      )}

      <Grid item xs={12}>
        {currentProducts.length === 0 ? (
          ""
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
            handlePageChange={handlePageChange}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default ListProductsPage;
