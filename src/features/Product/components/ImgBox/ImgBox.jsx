import { Box, CardMedia, CssBaseline, Container, Paper } from "@mui/material";
import React, { useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styles from "../../components/ImgBox/ImgBox.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

Img.propTypes = {
  image: PropTypes.string,
  slick: PropTypes.string,
};
function Img(props) {
  const { image, slicks } = props; //Props from DetailPage
  const [selected, setSelected] = useState(image); //State for selected image with default value from props

  /**
   * Setting for React-Slick
   */
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    styles: {},
    slidesToShow: 4,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => {
      setSelected(slicks[newIndex]);
    },
    prevArrow: (
      <ArrowBackIcon
        sx={{
          color: "black",
          "&:hover": {
            color: "white",
            backgroundColor: "lightgrey",
          },
          borderRadius: "20px",
        }}
      />
    ),
    nextArrow: (
      <ArrowForwardIcon
        sx={{
          color: "black",
          "&:hover": {
            color: "white",
            backgroundColor: "lightgrey",
          },
          borderRadius: "20px",
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const handleTypeChange = (slick) => {
    setSelected(slick);
  };

  return (
    <Box className={styles.main}>
      <Container>
        <CssBaseline />
        <Box sx={{ bgcolor: "#FAFAFA" }}>
          {selected && (
            <Box>
              <CardMedia component="img" image={selected} src={image} />
            </Box>
          )}
        </Box>
        <Slider {...settings} className={styles.slider}>
          {slicks.map((slick, index) => (
            <Box key={index}>
              <Paper
                className={styles.productPaper}
                elevation={3}
                onMouseEnter={() => handleTypeChange(slick)}
              >
                <img
                  src={slick}
                  className={styles.productImage}
                  alt={`Product ${index}`}
                  style={{ width: "100%" }}
                />
              </Paper>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
}

export default Img;
