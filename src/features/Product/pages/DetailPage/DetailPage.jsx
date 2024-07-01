import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Description from "../../components/Description/Description";
import Img from "../../components/ImgBox/ImgBox";
import Privacy from "../../components/Privacy/Privacy";
import Product from "../../components/AboutProduct/AboutProduct";
import Header from "../../../../components/Header/Header";
import { Grid, Container, CssBaseline, Paper, Box } from "@mui/material";
import productApi from "../../../../api/productApi";
import cartApi from "../../../../api/cartApi";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "../DetailPage/DetailPage.module.scss";

DetailPage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function DetailPage(props) {
  const location = useLocation();
  const id = location.state;
  const [products, setProducts] = useState(); //State get Api type Object
  const [loading, setLoading] = useState(true); //State loading
  const [specs, setSpecs] = useState([]); //State get Api type Array
  /**
   * Call API get Data from API
   */
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await productApi.get(`/${id}`);
        setLoading(false);
        setProducts(res);
        setSpecs(res);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi tải dữ liệu từ API:", error);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <Box className={styles.loading}>
        <CircularProgress className={styles.loading} />
      </Box>
    );
  }

  return (
    <Container className={styles.main}>
      <CssBaseline />
      <Box align="left" className={styles.header}>
        <Header />
      </Box>
      <Paper className={styles.firstPaper}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={6} lg={3} sx={{ bgcolor: "white" }}>
            <Img image={products.image} slicks={products.imageSlicks} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5} sx={{ bgcolor: "white" }}>
            <Description product={products} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} sx={{ bgcolor: "white" }}>
            <Privacy
              storeName={products.storeName}
              storeAddress={products.storeAddress}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid container sx={{ mt: 2, bgcolor: "white" }} align="left">
        <Grid item xs={12} sm={12} md={12}>
          <Paper>
            <Product
              infos={specs.specifications}
              img={products.details.imageDetails}
              image={products.image}
              name={products.name}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DetailPage;
