import React, { FC, useContext, useReducer, useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import FormItemParser from "@components/TemplateComponent/components/FormItemParser";
import { FieldTypes } from "@components/TemplateComponent/constants/config";

import { InstantTemplateContext } from "../../context";
import { cssFlex, cssWidgetHeader, gridContainer } from "./styles";
import { filterReducer, initialState } from "./reducers";
import ExtraModal from "@components/AdditionalComponent/ExtraModal";
import BulkModal from "@components/AdditionalComponent/BulkModal";

const Filter: FC = () => {
  const { value: templateVal } = useContext(InstantTemplateContext);
  const [filter, dispatch] = useReducer(filterReducer, initialState);
  const [openExtraModal, setOpenExtraModal] = useState(false);
  const [openBulkModal, setOpenBulkModal] = useState(false);
  const [openAdditionalModal, setOpenAdditionalModal] = useState(false);

  useEffect(() => {
    if (filter.showFilter && (templateVal.filter.customFilter || []).length) {
      let temp = {};
      (templateVal.filter.customFilter || []).forEach((v) => {
        temp = {
          ...temp,
          [v.dataIndex]: v.type === FieldTypes.CHECKBOX ? false : "",
        };
      });

      dispatch({
        type: "SET_FILTER_VALUE",
        value: {
          filterValue: temp,
        },
      });
    }
  }, [filter.showFilter]);

  const handleShowFilter = () => {
    dispatch({
      type: "SET_SHOW_FILTER",
      value: { showFilter: !filter.showFilter },
    });
  };

  const handleClearFilter = () => {
    dispatch({
      type: "CLEAR_FILTER",
      value: {},
    });
    templateVal.filter.clearFilter();
  };

  const handleFilterValue = (dataIndex, value) => {
    dispatch({
      type: "SET_FILTER_VALUE",
      value: {
        filterValue: { [dataIndex]: value },
      },
    });
  };

  const handleStartDateChange = (date: Date | null) => {
    dispatch({
      type: "SET_START_DATE",
      value: {
        start_date: date,
      },
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    dispatch({
      type: "SET_END_DATE",
      value: {
        end_date: date,
      },
    });
  };

  const handleShowExtraModal = () => {
    setOpenExtraModal((prev) => !prev);
  };

  const handleShowBulkModal = () => {
    setOpenBulkModal((prev) => !prev);
  };

  const handleShowAdditionalModal = () => {
    setOpenAdditionalModal((prev) => !prev);
  };

  return (
    <div style={{ padding: 24, paddingBottom: 28 }}>
      <div className={cssWidgetHeader}>
        {templateVal.filter.show && (
          <Button variant="contained" onClick={handleShowFilter}>
            Filter
          </Button>
        )}
        {templateVal.addButton.show && (
            <Button
              variant="contained"
              color="primary"
              onClick={templateVal.addButton.handleClick}
            >
              Add Data
            </Button>
          )}
        {templateVal.addExtraButton.show && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleShowExtraModal}
            >
              Edit Floating Banner
            </Button>
          )}
        {templateVal.addBulkButton.show && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleShowBulkModal}
            >
              Create Bulk
            </Button>
          )}
        {templateVal.additionalButton && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowAdditionalModal}
            >
              {templateVal.additionalButton.text}
            </Button>
          )}
      </div>
      {filter.showFilter && (
        <Grid container className={gridContainer} spacing={4}>
          {!templateVal.filter.customFilter ? (
            <>
              <Grid item xs={5}>
                <TextField
                  label="Search"
                  variant="outlined"
                  size="medium"
                  style={{ width: "100%" }}
                  onChange={(e) => handleFilterValue("search", e.target.value)}
                  value={filter.filterValue.search}
                />
              </Grid>
              {templateVal.dateRangeFilter.show && (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={7} className={cssFlex} spacing={2}>
                    <Grid item xs={4} style={{ marginRight: 20 }}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Start Date"
                        format="MM/dd/yyyy"
                        value={filter.start_date}
                        onChange={handleStartDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="End Date"
                        format="MM/dd/yyyy"
                        value={filter.end_date}
                        onChange={handleEndDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
              )}
            </>
          ) : (
            <>
              {(templateVal.filter.customFilter || []).map(
                (component, index) => (
                  <Grid item xs={6} key={index}>
                    <FormItemParser
                      component={{
                        ...component,
                        value: filter.filterValue[`${component.dataIndex}`],
                        handleChange: handleFilterValue,
                        ...(component.customFilterProps && {
                          customPropsFormItem: {
                            [component.customFilterProps.type]:
                              !filter.filterValue[
                                component.customFilterProps.dataIndex
                              ],
                          },
                        }),
                      }}
                      mode="edit"
                    />
                  </Grid>
                )
              )}
            </>
          )}
          <Grid item xs={12} style={{ marginTop: 24 }}>
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={handleClearFilter}>
                  Clear Filter
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    templateVal.filter.handleSearchData({
                      ...filter.filterValue,
                      start_date:
                        templateVal.dateRangeFilter.show && filter.start_date
                          ? new Date(filter.start_date).toISOString()
                          : null,
                      end_date:
                        templateVal.dateRangeFilter.show && filter.end_date
                          ? new Date(filter.end_date).toISOString()
                          : null,
                    })
                  }
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <ExtraModal
        open={openExtraModal}
        handleClose={handleShowExtraModal}
        body={templateVal.addExtraButton.body}
        url={templateVal.addExtraButton.url}
      />
      <BulkModal
        open={openBulkModal}
        handleClose={handleShowBulkModal}
        body={templateVal.addBulkButton.body}
        url={templateVal.addBulkButton.url}
      />
      {templateVal.additionalButton &&
        templateVal.additionalButton.element({
          open: openAdditionalModal,
          handleClose: handleShowAdditionalModal,
        })}
    </div>
  );
};

export default Filter;
