import React, { useState, useEffect } from "react";
import styles from "../../components/Description/Description.module.scss";
import PropTypes from "prop-types";
import CheckIcon from "@mui/icons-material/Check";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import cartApi from "../../../../api/cartApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Typography,
  Box,
  Divider,
  Avatar,
  Grid,
  Rating,
  Button,
  Link,
} from "@mui/material";
import { NumericFormat } from "react-number-format";

Description.propTypes = {
  product: PropTypes.object.isRequired,
  handle: PropTypes.func,
};

function Description(props) {
  const { product, handle } = props;
  const [count, setCount] = useState(1); //State for quantity
  const [value, setValue] = useState(5); // Value Star Rating
  const [selectedType, setSelectedType] = useState(null); // State Type Memories
  const [successPopup, setSuccessPopup] = useState(false); //State Success Popup
  const [failurePopup, setFailurePopup] = useState(false); //State Failure Popup
  /**
   *  SetState for Memories Type
   */
  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  /**
   * Increase quantiy function
   */
  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };

  /**
   * Decrease quantity function
   */
  const handleDecrease = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  /**
   * Function AddToCart
   */

  const addToCart = () => {
    const params = {
      products: { productId: product.id, quantity: count },
    };

    updateCart(params);
  };

  /**
   * Post Request
   */
  const updateCart = async (params) => {
    try {
      const res = await cartApi.add(params);
      setSuccessPopup(true);
    } catch (error) {
      setFailurePopup(true);
    }
  };

  /**
   * setTimeOut for Popup
   */
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (successPopup) {
        setSuccessPopup(false);
      } else if (failurePopup) {
        setFailurePopup(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [successPopup, failurePopup]);

  /**
   * Close Popup
   */
  const handleClose = () => {
    setSuccessPopup({ ...successPopup, open: false });
    setFailurePopup(false);
  };

  return (
    <Box className={styles.main}>
      <Box align="left" sx={{ ml: 2 }}>
        <Avatar
          variant="square"
          sx={{ width: 53, height: 26, mt: 2 }}
          src="/lazadalogo.png"
          alt="lazadalogo"
        ></Avatar>
        <Typography variant="h6">{product.name}</Typography>
        <Typography
          className={styles.shortDescription}
          variant="body2"
          color="text.secondary"
        >
          "{product.shortDescription}"
        </Typography>
        <Box className={styles.boxRate}>
          <Rating name="read-only" value={value} readOnly />
          <Link className={styles.linksRate} underline="none">
            2034 đánh giá
          </Link>
        </Box>
        <Box className={styles.brandBox}>
          <Typography color="text.secondary" variant="body2">
            Thương hiệu:{" "}
          </Typography>
          <Link className={styles.linksBrand} underline="none">
            {product.brand}
          </Link>
          {"|"}
          <Link className={styles.linksLookMore} underline="none">
            Xem thêm sản phẩm của {product.storeName}
          </Link>
        </Box>
      </Box>
      <Divider></Divider>
      <Box className={styles.priceBox} align="left" sx={{ ml: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <NumericFormat
            className={styles.salePrices}
            value={product.salePrice}
            thousandSeparator="."
            decimalSeparator=","
            displayType="text"
          />
          <Typography variant="h6" className={styles.currencyPrices}>
            đ
          </Typography>
        </Box>
        <Grid
          container
          spacing={1}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Grid item variant="body1">
            <NumericFormat
              className={styles.originPrices}
              value={product.originalPrice}
              thousandSeparator="."
              decimalSeparator=","
              displayType="text"
            ></NumericFormat>
          </Grid>
          <Grid item variant="body2">
            <Typography>
              {Math.floor(
                ((product.originalPrice - product.salePrice) /
                  product.originalPrice) *
                  100,
              )}{" "}
              %OFF
            </Typography>
          </Grid>
        </Grid>
        <Grid className={styles.promoGrid} container spacing={2}>
          <Grid item variant="body1">
            <Typography
              className={styles.promoHeadingText}
              color="text.secondary"
            >
              Ưu đãi
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={styles.promoFirstText}>
              🤑SINH NHẬT SALE XỊN - RINH DEAL GIẢM SỐC🤑
            </Typography>
            <Typography className={styles.promoSecondText}>
              Đơn hàng từ 31.500.000 ₫
            </Typography>
          </Grid>
        </Grid>
        <Grid className={styles.payLaterGrid} container spacing={2}>
          <Grid item variant="body1">
            <Typography className={styles.payLaterTypo} color="text.secondary">
              Trả góp 0%
            </Typography>
          </Grid>
          <Grid className={styles.payLaterTextGrid} item variant="body2">
            <CalendarMonthIcon
              className={styles.iconCalender}
            ></CalendarMonthIcon>
            <Typography className={styles.payLaterText}>
              Trả góp trong 6 tháng, chỉ với 5.265.000 ₫ mỗi tháng
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider></Divider>
      <Box align="left" sx={{ ml: 2 }}>
        <Grid className={styles.categoriesGrid} container spacing={5}>
          <Grid item className={styles.typeMemmories}>
            <Typography
              className={styles.categoriesMemmories}
              color="text.secondary"
            >
              Dung Lượng Lưu Trữ: {selectedType}
            </Typography>
            <Box className={styles.memoriesButton}>
              <Button
                className={styles.cusButtonGroup}
                endIcon={
                  selectedType === "256GB" ? (
                    <CheckIcon sx={{ color: "#f57224" }} />
                  ) : null
                }
                variant={selectedType === "256GB" ? "contained" : "outlined"}
                onClick={() => handleTypeChange("256GB")}
              >
                256GB
              </Button>
              <Button
                className={styles.cusButtonGroup}
                endIcon={
                  selectedType === "512GB" ? (
                    <CheckIcon sx={{ color: "#f57224" }} />
                  ) : null
                }
                variant={selectedType === "512GB" ? "contained" : "outlined"}
                onClick={() => handleTypeChange("512GB")}
              >
                512GB
              </Button>
              <Button
                className={styles.cusButtonGroup}
                endIcon={
                  selectedType === "1TB" ? (
                    <CheckIcon sx={{ color: "#f57224" }} />
                  ) : null
                }
                variant={selectedType === "1TB" ? "contained" : "outlined"}
                onClick={() => handleTypeChange("1TB")}
              >
                1TB
              </Button>
            </Box>
          </Grid>
          <Grid item sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              className={styles.categoriesTypography2}
              color="text.secondary"
            >
              Số Lượng:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <button className={styles.buttonCount} onClick={handleDecrease}>
                -
              </button>
              <Box sx={{ ml: 2 }}>{count}</Box>
              <button className={styles.buttonCount} onClick={handleIncrease}>
                +
              </button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ ml: 2, mb: 2 }} className={styles.eventButton}>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          <Grid item>
            <Button className={styles.buttonBuyNow} variant="contained">
              Mua ngay
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={styles.buttonAddToCart}
              variant="contained"
              onClick={addToCart}
            >
              Thêm vào giỏ hàng
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={successPopup}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Thêm sản phẩm thành công{" "}
        </Alert>
      </Snackbar>

      <Snackbar
        open={failurePopup}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="failure"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Thêm sản phẩm thất bại{" "}
        </Alert>
      </Snackbar>
    </Box>
  );
}
export default Description;
