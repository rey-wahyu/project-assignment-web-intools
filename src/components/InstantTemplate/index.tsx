import React, { FC, useEffect, useReducer, useContext, useState } from "react";
import { cx } from "react-emotion";
import { Check as CheckIcon } from "@material-ui/icons";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TablePagination,
  Button,
  ButtonGroup,
  TableContainer,
  Chip,
  LinearProgress,
} from "@material-ui/core";

import { API_BACKOFFICE } from "@constants/config";
import useXFetcher from "@helpers/fetcher/useXFetcher";
import Wrapper from "./components/Wrapper";
import PageTitle from "@components/PageTitle";

import { reducerParams, initialStateParams } from "./reducers/tableReducer";
import { PROPS } from "@components/TemplateComponent/constants/interface";
import ActionModal from "@components/TemplateComponent/components/Modal";
import EmptyComponent from "@components/TemplateComponent/components/EmptyData";

import { DEFAULT_RESPONSE } from "@components/TemplateComponent/constants/config";
import { InstantTemplateContext } from "./context";
import { cssTableWidget, cssSetColumnTableWidth } from "./styles";

import ModalConfirm from "@components/ModalConfirm";
import { failedToast, successToast } from "@helpers/toast";
import { ExportToExcel } from "@components/ExportToExcel";
import { ERR_MESSAGE } from "@helpers/toast/message";

const InstantTemplate: FC<PROPS> = ({
  menuName,
  elementTagPrefix,
  pageTitle,
  showFilter,
  showAddButton,
  showDateRangeFilter,
  exportData,
  exportHeader,
  exportFilename,
  apiURL = "/",
  defaultParams,
  moduleTable,
  moduleForms,
  apiListResponseTransform = DEFAULT_RESPONSE,
  apiDetailResponseTransform = DEFAULT_RESPONSE,
  tableFixed = false,
  customFilter,
  deleteMessage = "Are you sure delete this item?",
  depthValue,
  showExtraButton,
  apiUrlExtraButton,
  moduleExtraForm,
  triggerRefetch,
  showBulkButton,
  apiUrlBulkButton,
  moduleBulkForm,
  overlayLoading = false,
  errDeleteCode,
  additionalButton,
}) => {
  const { get, del } = useXFetcher(`${API_BACKOFFICE}/v1${apiURL}`);
  const { value: templateVal, setValue } = useContext(InstantTemplateContext);
  const [firstLoad, setFirstLoad] = useState(true);

  const [stateParams, dispatchParams] = useReducer(
    reducerParams,
    initialStateParams
  );

  const [delConfirm, setDelConfirm] = useState({
    open: false,
    id: null,
  });

  //get data
  useEffect(() => {
    const getData = () => {
      get("", {
        ...defaultParams,
        page: 1,
        limit: stateParams.params.rowsPerPage,
      })
        .then((resp) => {
          dispatchParams({
            type: "SET_LIST",
            value: {
              list: apiListResponseTransform(resp.data || []),
              meta: resp.meta,
              params: { ...stateParams.params, ...defaultParams },
            },
          });
          setFirstLoad(false);
        })
        .catch((error) => {
          console.error(error);
          dispatchParams({
            type: "SET_LIST",
            value: {
              list: [],
              meta: {},
              params: { ...stateParams.params, ...defaultParams },
            },
          });
          setFirstLoad(false);
        });
    };
    getData();
  }, []);

  //set initial params value
  useEffect(() => {
    const handleSetInitialValue = () => {
      setValue({
        ...templateVal,
        bodyClass: cssTableWidget,
        menuName,
        elementTagPrefix,
        filter: {
          show: showFilter,
          handleChange: handleChangeFilter,
          value: "",
          clearFilter,
          handleSearchData: handleSearchData,
          customFilter,
        },
        addButton: { show: showAddButton, handleClick: handleModal },
        dateRangeFilter: { show: showDateRangeFilter },
        addExtraButton: {
          show: showExtraButton,
          url: apiUrlExtraButton,
          body: moduleExtraForm,
        },
        addBulkButton: {
          show: showBulkButton,
          url: apiUrlBulkButton,
          body: moduleBulkForm,
        },
        additionalButton,
      });
    };
    handleSetInitialValue();
  }, []);

  const handleChangeFilter = (e) => {
    setValue({
      ...templateVal,
      filter: {
        ...templateVal.filter,
        value: e.target.value,
      },
    });
  };

  const handleSearchData = (param) => {
    const { rowsPerPage, ...restParams } = stateParams.params;
    const paramsSearch = {
      ...restParams,
      ...param,
      limit: rowsPerPage,
    };

    get("", paramsSearch)
      .then((resp) => {
        dispatchParams({
          type: "SET_LIST",
          value: {
            list: apiListResponseTransform(resp.data || []),
            meta: resp.meta || {},
            params: { ...stateParams.params, ...param, ...defaultParams },
          },
        });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!firstLoad) handleSearchData({ ...defaultParams, search: "" });
  }, [triggerRefetch]);

  const clearFilter = () => handleSearchData({ ...defaultParams, search: "" });

  const handleModal = () => {
    dispatchParams({
      type: "SET_OPEN_MODAL",
      value: { show: !stateParams.openModal, form: {} },
    });
    clearFilter();
  };

  const handleShowModal = (editVal, modalType) =>
    dispatchParams({
      type: "SET_OPEN_MODAL",
      value: { show: !stateParams.openModal, form: editVal, modalType },
    });

  const handleDeleteData = (id) => {
    del(`/${id}`)
      .then((res) => {
        if (res.is_error) {
          if (
            errDeleteCode &&
            res.response.error_message === ERR_MESSAGE["BAD_REQUEST"]
          )
            failedToast(ERR_MESSAGE[errDeleteCode]);
          else failedToast("Failed");
        } else {
          successToast("Success, Item deleted!");
        }
        clearFilter();
      })
      .catch(() => failedToast("Failed!"));
  };

  const handleChangePage = (event, newPage) => {
    handleSearchData({ page: newPage + 1 });
  };
  let num = (stateParams.params.page - 1) * stateParams.params.rowsPerPage;

  const handleDelConfirm = (openVal, idVal) => {
    setDelConfirm({
      open: openVal,
      id: idVal,
    });
  };

  return (
    <>
      {pageTitle && <PageTitle title={pageTitle} />}
      <Wrapper>
        {exportData && (
          <ExportToExcel
            fileName={exportFilename}
            header={exportHeader}
            apiListResponseTransform={apiListResponseTransform}
            apiUrl={apiURL}
            params={stateParams.params}
          />
        )}
        <TableContainer>
          {overlayLoading && (
            <LinearProgress color="secondary" style={{ height: "8px" }} />
          )}
          <Table
            className={cx("mb-0", cssSetColumnTableWidth(tableFixed))}
            size="medium"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                {(moduleTable || []).map(({ title }, index) => (
                  <TableCell
                    key={index}
                    style={{
                      borderBottom: "4px double black",
                      textAlign: "center",
                    }}
                  >
                    <b>{title}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stateParams.list.length === 0 ? (
                <EmptyComponent length={moduleTable.length} />
              ) : (
                stateParams.list.map((value, index) => {
                  num += 1;
                  return (
                    <TableRow key={index}>
                      {(moduleTable || []).map(
                        (
                          {
                            dataIndex,
                            render,
                            compare,
                            compareValue,
                            compareValueOnHold,
                          },
                          idx
                        ) => {
                          if (!depthValue) {
                            return (
                              <TableCell key={idx}>
                                {compare &&
                                  dataIndex !== "actions" &&
                                  (value[`${compare}`] === compareValue ||
                                    value[`${compare}`] ===
                                      compareValueOnHold) &&
                                  render(value[`${dataIndex}`])}
                                {compare &&
                                  dataIndex !== "actions" &&
                                  dataIndex !== "custom" &&
                                  value[`${compare}`] !== compareValue &&
                                  value[`${compare}`] !== compareValueOnHold &&
                                  "-"}
                                {dataIndex === "is_active" &&
                                  (value[`${dataIndex}`]
                                    ? "ACTIVE"
                                    : "INACTIVE")}
                                {dataIndex === "number" && num}
                                {dataIndex === "force_update" &&
                                  (value[`${dataIndex}`] ? <CheckIcon /> : "")}
                                {dataIndex === "maintenance_mode" &&
                                  (value[`${dataIndex}`] ? <CheckIcon /> : "")}
                                {dataIndex !== "actions" &&
                                  !compare &&
                                  !Array.isArray(value[`${dataIndex}`]) &&
                                  (render
                                    ? render(value[`${dataIndex}`], value)
                                    : value[`${dataIndex}`])}
                                {dataIndex !== "actions" &&
                                  !compare &&
                                  Array.isArray(value[`${dataIndex}`]) &&
                                  value[`${dataIndex}`].map((item) => (
                                    <Chip
                                      color="primary"
                                      variant="outlined"
                                      label={item}
                                      style={{ marginInline: 3 }}
                                    />
                                  ))}
                                {dataIndex === "actions" && (
                                  <ButtonGroup
                                    orientation="vertical"
                                    color="primary"
                                    variant="contained"
                                  >
                                    {(
                                      <Button
                                        color="primary"
                                        onClick={() =>
                                          handleShowModal(value, "edit")
                                        }
                                      >
                                        Edit
                                      </Button>
                                    )}
                                    {(
                                      <Button
                                        color="secondary"
                                        onClick={() =>
                                          handleDelConfirm(true, value.id)
                                        }
                                      >
                                        Delete
                                      </Button>
                                    )}
                                  </ButtonGroup>
                                )}
                                {dataIndex === "custom" &&
                                  render(
                                    value[`${compare}`],
                                    value[`${compareValue}`],
                                    clearFilter
                                  )}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={idx}>
                                {compare &&
                                  dataIndex !== "actions" &&
                                  value[`${depthValue}`][`${compare}`] ===
                                    compareValue &&
                                  render(
                                    value[`${depthValue}`][`${dataIndex}`]
                                  )}
                                {dataIndex === "is_active" &&
                                  (value[`${depthValue}`][`${dataIndex}`]
                                    ? "ACTIVE"
                                    : "INACTIVE")}
                                {dataIndex === "number" && num}
                                {dataIndex === "force_update" &&
                                  (value[`${depthValue}`][`${dataIndex}`] ? (
                                    <CheckIcon />
                                  ) : (
                                    ""
                                  ))}
                                {dataIndex === "maintenance_mode" &&
                                  (value[`${depthValue}`][`${dataIndex}`] ? (
                                    <CheckIcon />
                                  ) : (
                                    ""
                                  ))}
                                {dataIndex !== "actions" &&
                                  !compare &&
                                  !Array.isArray(
                                    value[`${depthValue}`][`${dataIndex}`]
                                  ) &&
                                  (render
                                    ? render(
                                        value[`${depthValue}`][`${dataIndex}`]
                                      )
                                    : value[`${depthValue}`][`${dataIndex}`])}
                                {dataIndex !== "actions" &&
                                  !compare &&
                                  Array.isArray(
                                    value[`${depthValue}`][`${dataIndex}`]
                                  ) &&
                                  value[`${depthValue}`][`${dataIndex}`].map(
                                    (data) => (
                                      <Chip
                                        color="primary"
                                        variant="outlined"
                                        label={data}
                                        style={{ marginInline: 3 }}
                                      />
                                    )
                                  )}
                                {dataIndex === "actions" && (
                                  <ButtonGroup
                                    orientation="vertical"
                                    color="primary"
                                    variant="contained"
                                  >
                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        handleShowModal(value, "edit")
                                      }
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      color="secondary"
                                      onClick={() =>
                                        handleDelConfirm(true, value.id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </ButtonGroup>
                                )}
                              </TableCell>
                            );
                          }
                        }
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={stateParams.meta?.total_data || 0}
          onPageChange={handleChangePage}
          rowsPerPage={stateParams.params.rowsPerPage}
          page={stateParams.params.page - 1}
          rowsPerPageOptions={[-1]}
          style={{ background: "#f8f8fe" }}
        />
      </Wrapper>
      <ActionModal
        open={stateParams.openModal}
        handleClose={handleModal}
        body={moduleForms}
        initialValue={stateParams.formValue}
        url={apiURL}
        transformResponse={apiDetailResponseTransform}
        modalType={stateParams.modalType}
        clear={() => clearFilter()}
      />
      <ModalConfirm
        title={deleteMessage}
        open={delConfirm.open}
        handleConfirm={() => handleDeleteData(delConfirm.id)}
        handleClose={() => setDelConfirm({ open: false, id: null })}
      />
    </>
  );
};

export default InstantTemplate;
