import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cartApi from "../../api/cartApi";
import TakeAll from "../Cart/components/TakeAll/TakeBox";
import BillBox from "./components/BillBox/BillBox";
import styles from "../Cart/Cart.module.scss";
import productApi from "../../api/productApi";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Header from "../../components/Header/Header";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  CircularProgress,
  Checkbox,
  CardMedia,
  Typography,
  Paper,
  ButtonBase,
  Dialog,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// CartPage.propTypes = {};

function CartPage(props) {
  const [products, setProducts] = useState([]); //State manage data get from API Products
  const [loading, setLoading] = useState(true); //State Loading Page
  const [idItems, setIdItems] = useState([]);
  const [select, setSelect] = useState(false);
  const [selectedProductPrice, setSelectedProductPrice] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    Array(products.length).fill(false),
  );
  const [successPopup, setSuccessPopup] = useState(false);
  const [successDeletedPopup, setSuccessDeletedPopup] = useState(false);
  const [failurePopup, setFailurePopup] = useState(false); //State Failure Popup
  const [loadingPopup, setLoadingPopup] = useState(false); //State Loading Popup
  const [deletedFailurePopup, setDeletedFailurePopup] = useState(false);

  /**
   * Call Api get product list
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Call Api Cart
        const res = await cartApi.getAll();

        //Use productId from Api Cart to call Api Products
        const responses = await Promise.all(
          res.map((item) => productApi.get(`${item.products.productId}`)),
        );
        const product = responses.map((response, index) => ({
          ...response,
          quantity: res[index].products.quantity,
        }));
        setProducts(product);
        setIdItems(res);
        setLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);

  /** Handle Delete Items */
  const handleDeletedItems = async (index) => {
    try {
      setLoadingPopup(true);
      const id = idItems[index].id;

      //Delete Cart Products
      const response = await cartApi.remove(`${id}`);

      //Update products
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);

      //Call Api to Update idItems
      const res = await cartApi.getAll();
      setIdItems(res);

      setTimeout(() => {
        setSuccessDeletedPopup(true);
      }, 1200);
    } catch (error) {
      setDeletedFailurePopup(true);
    }
  };

  /** Handle Change Quantity */
  const handleQuantityChange = async (index, changeAmount) => {
    try {
      const currentQuantity = products[index].quantity;
      const newQuantity = Math.max(1, currentQuantity + changeAmount);

      if (newQuantity === 0) {
        await handleDeletedItems(index);
      } else {
        const data = {
          products: {
            productId: products[index].id,
            quantity: newQuantity,
          },
          id: idItems[index].id,
        };
        // Request a new data to API
        const res = await cartApi.update(data);

        //Call Api to get new data
        const response = await cartApi.getAll();
        const dataFetch = await Promise.all(
          response.map((item) => productApi.get(`${item.products.productId}`)),
        );
        const product = dataFetch.map((responses, index) => ({
          ...responses,
          quantity: response[index].products.quantity,
        }));
        setProducts(product);
        setLoadingPopup(true);
        setTimeout(() => {
          setSuccessPopup(true);
        }, 1200);
      }
    } catch (error) {
      setFailurePopup(true);
    }
  };

  /** Handle Increase Quantity */
  const handleIncreaseQuantity = async (index) => {
    await handleQuantityChange(index, 1);
  };

  /** Handle Decrease Quantity */
  const handleDecreaseQuantity = async (index) => {
    await handleQuantityChange(index, -1);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (failurePopup) {
        setFailurePopup(false);
      } else if (loadingPopup) {
        setLoadingPopup(false);
      } else if (successPopup) {
        setSuccessPopup(false);
      } else if (deletedFailurePopup) {
        setDeletedFailurePopup(false);
      } else if (successDeletedPopup) {
        setSuccessDeletedPopup(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [
    failurePopup,
    loadingPopup,
    successPopup,
    deletedFailurePopup,
    successDeletedPopup,
  ]);

  /**
   * Close Popup
   */
  const handleClose = () => {
    setFailurePopup(false);
    setLoadingPopup(false);
    setDeletedFailurePopup(false);
    setSuccessPopup(false);
    setSuccessDeletedPopup(false);
  };

  /*
   * Sum price*quantity
   */
  useEffect(() => {
    const total = products.reduce((acc, product) => {
      const cartProduct = products.find((item) => item.id === product.id);
      const isChecked = selectedCheckboxes[products.indexOf(product)];

      if (cartProduct && isChecked) {
        return acc + product.salePrice * cartProduct.quantity;
      }
      return acc;
    }, 0);

    setTotalPrice(total);
  }, [products, selectedCheckboxes]);

  /** Handle CheckBoxes */
  const handleCheckBox = (event, index, id, price) => {
    const updatedCheckboxes = [...selectedCheckboxes];
    updatedCheckboxes[index] = event.target.checked;
    setSelectedCheckboxes(updatedCheckboxes);

    if (!event.target.checked) {
      setSelect(false);
    }else {
      const allChecked = updatedCheckboxes.every((checkbox) => checkbox);
      setSelect(allChecked); 
    }

    if (event.target.checked || select) {
      setSelectedProductPrice((prevSelectedProductPrice) => [
        ...prevSelectedProductPrice,
        { id, price },
      ]);
    } else {
      setSelectedProductPrice((prevSelectedProductPrice) =>
        prevSelectedProductPrice.filter((item) => item.id !== id),
      );
    }
  };

  /** Handle CheckboxAll */
  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setSelect(isChecked);

    const updatedCheckboxes = Array(products.length).fill(isChecked);
    setSelectedCheckboxes(updatedCheckboxes);

    if (isChecked) {
      const selectedPrices = products.map((product) => ({
        id: product.id,
        price: product.salePrice,
      }));
      setSelectedProductPrice(selectedPrices);
    } else if (!isChecked) {
      setSelectedProductPrice([]);
    }
  };

  const countSelectedProducts = selectedProductPrice.length;

  /**
   * Loading Page
   */
  if (loading) {
    return (
      <Box className={styles.loadingPage}>
        <CircularProgress className={styles.loadingPage} />
      </Box>
    );
  }
  return (
    <Box className={styles.main}>
      <CssBaseline />
      <Container>
        <Box align="left" className={styles.header}>
          <Header />
        </Box>
        <Grid container spacing={3} className={styles.products}>
          <Grid item xs={12} md={8} lg={8}>
            <TakeAll change={(e) => handleCheckAll(e)} check={select} />
            <Box className={styles.mainBox} align="left">
              {products?.map((product, index) => (
                <Paper key={`${product.id}-${index}`} sx={{ mt: 3 }}>
                  <Grid container spacing={1}>
                    <Grid
                      item
                      xs={2}
                      md={1}
                      lg={1}
                      className={styles.checkBox}
                      key={index}
                    >
                      <Checkbox
                        checked={selectedCheckboxes[index] || select}
                        onChange={(e) => {
                          handleCheckBox(
                            e,
                            index,
                            product.id,
                            product.salePrice,
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={1} md={2} lg={2} className={styles.imgBox}>
                      <CardMedia
                        component="img"
                        className={styles.img}
                        src={product.image}
                        alt="Product Image"
                      />
                    </Grid>
                    <Grid item xs={3} md={5} lg={5} className={styles.mainDesc}>
                      <Typography variant="body1" className={styles.descTitle}>
                        {product.name}
                      </Typography>
                      <Typography
                        className={styles.desc}
                        variant="body2"
                        color="textSecondary"
                      >
                        {product.shortDescription}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} md={2} lg={2} className={styles.priceBox}>
                      <Typography variant="body2" className={styles.price}>
                        <NumericFormat
                          value={product.salePrice}
                          thousandSeparator="."
                          decimalSeparator=","
                          displayType="text"
                        />
                        đ
                      </Typography>
                      <DeleteOutlineOutlinedIcon
                        className={styles.deleteOutline}
                        onClick={() => handleDeletedItems(index)}
                      />
                    </Grid>
                    <Grid item xs={1} md={2} lg={2} className={styles.quantity}>
                      <ButtonBase
                        onClick={() => handleDecreaseQuantity(index)}
                        className={styles.buttonQuantity}
                      >
                        <Typography variant="body2" sx={{ fontSize: 25 }}>
                          -
                        </Typography>
                      </ButtonBase>
                      <Box component="label" className={styles.numberQuantity}>
                        {product.quantity}
                      </Box>
                      <ButtonBase
                        onClick={() => handleIncreaseQuantity(index)}
                        className={styles.buttonQuantity}
                      >
                        <Typography variant="body2" sx={{ fontSize: 15 }}>
                          +
                        </Typography>
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <BillBox count={countSelectedProducts} prices={totalPrice} />
          </Grid>
        </Grid>
        <Snackbar
          open={deletedFailurePopup}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Lỗi! Không thể xoá sản phẩm khỏi giỏ hàng{" "}
          </Alert>
        </Snackbar>
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
            Thay đổi số lượng sản phẩm thành công{" "}
          </Alert>
        </Snackbar>
        <Snackbar
          open={successDeletedPopup}
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
            Xoá sản phẩm thành công{" "}
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
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Lỗi! Không thể thay đổi số lượng sản phẩm{" "}
          </Alert>
        </Snackbar>
        <Dialog
          open={loadingPopup}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          disablebackdropclick
          disableEscapeKeyDown
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <Box className={styles.loadingBackground}>
              <Typography variant="h6" className={styles.loadingTypo}>
                Please wait
              </Typography>
              <CircularProgress color="secondary" className={styles.loading} />
            </Box>
          </DialogTitle>
        </Dialog>
      </Container>
    </Box>
  );
}

export default CartPage;
