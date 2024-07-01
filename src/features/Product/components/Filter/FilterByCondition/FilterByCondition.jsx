import React from "react";
import PropTypes from "prop-types";
import { List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import styles from "./FilterByCondition.module.scss";

FilterByCondition.propTypes = {
  selectedConditions: PropTypes.array.isRequired,
  handleConditionCheckboxChange: PropTypes.func.isRequired,
  handleConditionListItemButtonClick: PropTypes.func.isRequired,
};

function FilterByCondition(props) {
  const condition = ["New", "Used"];

  const selectedConditions = props.selectedConditions || []; // Make sure the selectedConditions is identified

  return (
    <List id={styles.list}>
      {condition.map((conditionItem, index) => (
        <ListItem disablePadding key={index} className={styles.listItem}>
          <ListItemButton
            className={styles.listItemButton}
            id={conditionItem}
            onClick={() =>
              props.handleConditionListItemButtonClick(conditionItem)
            }
          >
            <input
              type="checkbox"
              id={conditionItem}
              name="conditionItem"
              checked={selectedConditions.includes(conditionItem)}
              onChange={() =>
                props.handleConditionCheckboxChange(conditionItem)
              }
            />
            <label htmlFor={conditionItem}>{conditionItem}</label>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default FilterByCondition;
