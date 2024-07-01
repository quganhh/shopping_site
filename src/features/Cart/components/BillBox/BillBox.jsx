import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../BillBox/BillBox.module.scss";
import {
  Box,
  Typography,
  Grid,
  Divider,
  TextField,
  Button,
  Container,
  Paper,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { NumericFormat } from "react-number-format";

BillBox.propTypes = {
  count: PropTypes.number,
  prices: PropTypes.number,
};

function BillBox(props) {
  const { prices, count } = props;
  const [shippingFee, setShippingFee] = useState(30000);

  return (
    <Paper align="left" className={styles.main}>
      <Container>
        <Typography
          className={styles.locationTypo}
          variant="body1"
          color="text.secondary"
        >
          Địa điểm
        </Typography>
        <Grid container className={styles.location}>
          <Grid item className={styles.locationIcon}>
            <LocationOnOutlinedIcon />
          </Grid>
          <Grid item>
            <TextField
              className={styles.inputAddress}
              id="standard-basic"
              label="Add Shipping address "
              variant="standard"
              sx={{ ml: 3, mb: 2 }}
            />
          </Grid>
        </Grid>
        <Divider />
        <Typography
          variant="h6"
          color="text.primary"
          className={styles.infoTypo}
        >
          Thông tin đơn hàng
        </Typography>
        <Grid container spacing={4} className={styles.firstCount}>
          <Grid item xs={8} lg={8}>
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.countTypo}
            >
              Tạm tính ({count}):
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography variant="body2" className={styles.countTypo}>
              <NumericFormat
                value={prices}
                className={styles.priceCount}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
              />
              đ
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={styles.shippingFee}>
          <Grid item xs={8.8} sm={7} md={9} lg={8.8}>
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.shippingFeeTypo}
            >
              Phí vận chuyển:
            </Typography>
          </Grid>
          <Grid item xs={3.2} sm={5} md={3} lg={3.2}>
            <Box>
              <Typography variant="body2" className={styles.shippingFeePrice}>
                <NumericFormat
                  value={shippingFee}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                />
                đ
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} className={styles.fillFormPromo}>
          <Grid item xs={5} md={10} lg={8}>
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Mã giảm giá (Mã chỉ áp dụng 1 lần)"
              variant="outlined"
              size="small"
              className={styles.promoField}
            />
          </Grid>
          <Grid item xs={7} md={2} lg={4}>
            <Button
              className={styles.promoButton}
              sx={{
                bgcolor: "#1A9CB7",
                "&:hover": {
                  bgcolor: "lightblue",
                },
                color: "white",
              }}
            >
              Áp dụng
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={4} className={styles.totalBox}>
          <Grid item xs={8} md={10} lg={8}>
            <Typography
              variant="body1"
              color="text.primary"
              className={styles.totalTypo}
            >
              Tổng cộng:
            </Typography>
          </Grid>
          <Grid item xs={4} md={2} lg={4} className={styles.price}>
            <Box>
              <Typography variant="body2" className={styles.totalPriceTypo}>
                <NumericFormat
                  value={shippingFee + prices}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                />
                đ
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box align="right" className={styles.vat}>
          <Typography variant="body2" className={styles.vatTypo}>
            Đã bao gồm VAT (nếu có)
          </Typography>
        </Box>
        <Button className={styles.confirmButton}>
          Xác nhận Đặt hàng ({count})
        </Button>
      </Container>
    </Paper>
  );
}

export default BillBox;
