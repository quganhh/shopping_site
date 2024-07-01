import React from "react";
import PropTypes from "prop-types";
import { List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import styles from "./FilterByService.module.scss";

FilterByService.propTypes = {
  selectedServices: PropTypes.array.isRequired,
  handleServiceCheckboxChange: PropTypes.func.isRequired,
  handleServiceListItemButtonClick: PropTypes.func.isRequired,
};

function FilterByService(props) {
  const service = ["Free Shipping", "Promotion"];

  const selectedServices = props.selectedServices || []; // Make sure the selectedBrands is identified

  return (
    <List id={styles.list}>
      {service.map((serviceItem) => (
        <ListItem disablePadding key={serviceItem} className={styles.listItem}>
          <ListItemButton
            className={styles.listItemButton}
            id={serviceItem}
            onClick={() => props.handleServiceListItemButtonClick(serviceItem)}
          >
            <input
              type="checkbox"
              id={serviceItem}
              name="serviceItem"
              checked={selectedServices.includes(serviceItem)}
              onChange={() => props.handleServiceCheckboxChange(serviceItem)}
            />
            <label htmlFor={serviceItem}>{serviceItem}</label>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default FilterByService;
