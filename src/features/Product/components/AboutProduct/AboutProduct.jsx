import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Container,
  Alert,
  Box,
  Grid,
  CardMedia,
  Link,
  Divider,
  Button,
  Collapse,
} from "@mui/material";
import styles from "../../components/AboutProduct/AboutProduct.module.scss";

Product.propTypes = {
  infos: PropTypes.arrayOf(PropTypes.object),
  img: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  name: PropTypes.string,
};
function Product(props) {
  const { infos, img, image, name } = props; //Props from DetailPage
  const [open, setOpen] = useState(false); //State for collapse

  /**
   * Function handle open collapse
   */
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ mb: 2 }} className={styles.main}>
      <Box sx={{ bgcolor: "#FAFAFA" }}>
        <Typography
          sx={{ mx: 2, ml: 2, padding: 1, fontWeight: "bold" }}
          variant="body1"
        >
          Mô tả sản phẩm {name}
        </Typography>
      </Box>
      <Container>
        <Alert
          sx={{
            fontSize: "12px",
            bgcolor: "transparent",
            border: "1px solid lightgrey",
          }}
          severity="info"
        >
          Đây là sản phẩm được bán và xuất hóa đơn bởi Lazada.
        </Alert>
        <Box className={styles.blurBox}>
          <CardMedia
            className={styles.customCardMedia}
            component="img"
            height="700"
            src={image}
          />
          <div className={!open ? styles.blurOverlay : ""}></div>
        </Box>
        <Collapse in={open}>
          {img.map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              height="2100"
              src={image}
              alt="Iphone 15 Pro Max"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          ))}
          <Divider sx={{ mt: 2 }} />
          <Typography sx={{ mt: 1, fontWeight: "bold" }} variant="body1">
            Đặc tính sản phẩm {name}
          </Typography>
          <Grid container spacing={3}>
            {infos.map((info, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Typography variant="body2" color="text.secondary">
                  {info.title}
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>{info.value}</Typography>
              </Grid>
            ))}
          </Grid>
          <Box>
            <Grid container spacing={5} sx={{ my: 1 }}>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  Bộ sản phẩm gồm:
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: "14px" }}>{name}</Typography>
              </Grid>
            </Grid>
            <Divider />
          </Box>
        </Collapse>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 2,
          }}
        >
          <Button
            sx={{ border: "1px solid #1976D2", mb: 2 }}
            onClick={handleOpen}
          >
            {open ? "Thu gọn" : "Xem thêm"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
export default Product;
