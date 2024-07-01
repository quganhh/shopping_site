import React from "react";
import { Routes, Route } from "react-router-dom";

import PropTypes from "prop-types";
import ProductPage from "./pages/ProductPage/ProductPage";
import DetailPage from "./pages/DetailPage/DetailPage";

ProductFeature.propTypes = {};

function ProductFeature(props) {
  return (
    <div>
      <Routes>
        <Route path="" element={<ProductPage />}></Route>
        <Route path=":productId" element={<DetailPage />}></Route>
      </Routes>
    </div>
  );
}

export default ProductFeature;
