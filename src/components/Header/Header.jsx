import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import styles from "./Header.module.scss";

Header.propTypes = {};

function Header(props) {
  return (
    <Grid container spacing={2} id={styles.header}>
      <Grid item xs={6} lg={6} className={styles.logo}>
        <a href="/products">
          <img
            className={styles.logoImg}
            src="https://laz-img-cdn.alicdn.com/images/ims-web/TB1T7K2d8Cw3KVjSZFuXXcAOpXa.png"
            alt="Logo.png"
            loading="lazy"
          />
        </a>
      </Grid>

      <Grid item xs={6} lg={6} className={styles.icon}>
        <Link to="/cart">
          <ShoppingCartOutlinedIcon className={styles.cartIcon} />
        </Link>
      </Grid>
    </Grid>
  );
}

export default Header;
