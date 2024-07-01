import React from "react";
import PropTypes from "prop-types";
import styles from "../TakeAll/TakeBox.module.scss";
import { Grid, Checkbox, CssBaseline, Typography, Paper } from "@mui/material";

TakeAll.propTypes = {
  change: PropTypes.func,
  check: PropTypes.bool,
};

function TakeAll(props) {
  const { change, check } = props;

  return (
    <Paper className={styles.main} align="left">
      <CssBaseline />
      <Grid container className={styles.grid}>
        <Grid item xs={1} lg={1}>
          <Checkbox
            onChange={change}
            checked={check}
            className={styles.checkBox}
            data-testid="master-checkbox"
          />
        </Grid>
        <Grid item xs={11} lg={11}>
          <Typography className={styles.checkBoxTypo}> Chọn tất cả</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TakeAll;
