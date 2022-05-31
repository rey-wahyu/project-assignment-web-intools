import React, { FC, useEffect, useState } from "react";
import { Modal, Grid, Button, IconButton } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

import { API_BACKOFFICE } from "@constants/config";
import useXFetcher from "@helpers/fetcher/useXFetcher";
import Loading from "@components/Loading";
import FormItemParser from "@components/TemplateComponent/components/FormItemParser";

import { ActionModalProps } from "../../constants/interface";
import { gridWrapper, modalWrapper, titleStyle } from "./styles";
import { failedToast, successToast } from "@helpers/toast";
import { FieldTypes } from "@components/InstantTemplate/constants/config";
import { generateFormData } from "@helpers/generateFormData";

const ActionModal: FC<ActionModalProps> = ({
  open,
  handleClose,
  body,
  initialValue,
  url,
  transformResponse,
  clear,
}) => {
  const { get, post, put } = useXFetcher(`${API_BACKOFFICE}/v1${url}`);
  const [form, setForm] = useState({ id: 0 });
  const [loading, setLoading] = useState(Boolean(initialValue.id));
  const [includeFile, setIncludeFile] = useState(false);
  const [errors, setErrors] = useState({});
  const [newBody, setNewBody] = useState([]);

  useEffect(() => {
    const data = body?.find((x) => x.type === FieldTypes.FILE);
    if (data) setIncludeFile(true);
    const handleGetDetail = () => {
      get(`/${initialValue.id}`).then((response) => {
        setForm(transformResponse(response || {}));
        setLoading(false);
      });
    };

    if (initialValue.id) handleGetDetail();
  }, [initialValue]);

  useEffect(() => {
    setLoading(Boolean(initialValue.id));
  }, [initialValue]);

  useEffect(() => {
    if (initialValue.id) {
      const requiredData = body.filter(
        (item) =>
          item.customPropsFormItem?.disabled !== true &&
          item.customPropsFormItem?.required !== false &&
          item.type !== FieldTypes.RADIO &&
          item.type !== FieldTypes.FILE
      );
      requiredData.forEach((key) => {
        setErrors((previous) => ({
          ...previous,
          [`${key.dataIndex}`]: "",
        }));
      });
    }
  }, [initialValue]);

  useEffect(() => {
    if (!initialValue.id) {
      const newData = (body || []).map((item) => {
        if (
          item.dataIndex === "username" &&
          item.customPropsFormItem?.disabled === true
        ) {
          return {
            ...item,
            customPropsFormItem: { disabled: false },
          };
        } else return item;
      });
      setNewBody(newData);
    }
  }, [initialValue, body]);

  const handleFormChange = (type, value) => {
    setForm((prev) => ({ ...prev, [`${type}`]: value }));
    setErrors((prev) => ({ ...prev, [`${type}`]: "" }));
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [`${type}`]: `${type.replace(/_/g, " ")} is required`,
      }));
    }
  };

  const validate = (formFilter = null) => {
    if (formFilter) {
      return Object.values(formFilter).every((x) => x === "");
    }
    return Object.values(errors).every((x) => x === "");
  };

  const handleCloseModal = () => {
    setForm({ id: 0 });
    setErrors({});
    handleClose();
  };

  const handleSubmitForm = async () => {
    const formFilter = {};

    const requiredData = (form.id ? body : newBody).filter(
      (bodyItem) =>
        bodyItem.customPropsFormItem?.disabled !== true &&
        bodyItem.customPropsFormItem?.required !== false &&
        bodyItem.type !== FieldTypes.RADIO &&
        bodyItem.type !== FieldTypes.FILE
    );

    requiredData.forEach((key) => {
      formFilter[`${key.dataIndex}`] = form[`${key.dataIndex}`]
        ? ""
        : `${key.dataIndex.replace(/_/g, " ")} is required`;
    });

    setErrors((previous) => ({
      ...previous,
      ...formFilter,
    }));

    const validation = await validate(formFilter);

    if (!validation) {
      return failedToast("Please fill all of required fields");
    }

    setLoading(true);
    const data = !includeFile ? form : generateFormData(form);
    if (form.id) {
      put(`/${form.id}`, data, { includeFile })
        .then((res) => {
          if (res.is_error)
            failedToast(res.response.error_message.replace(/_/g, " "));
          else successToast("Success, Item updated!");
          clear();
        })
        .catch(() => failedToast("Failed!"))
        .finally(() => {
          setForm({ id: 0 });
          handleCloseModal();
        });
    } else {
      post("", data, { includeFile })
        .then((res) => {
          if (res.is_error)
            failedToast(res.response.error_message.replace(/_/g, " "));
          else successToast("Success, Item added!");
          clear();
        })
        .catch(() => failedToast("Failed!"))
        .finally(() => {
          setForm({ id: 0 });
          handleCloseModal();
        });
    }
  };

  const addOrUpdate = (val) => {
    if (val) return "Update Item";
    else return "Add Item";
  };

  const bodyOrNewbody = (val) => {
    if (val) return body || [];
    else return newBody || [];
  };

  return (
    <Modal open={open}>
      <div className={modalWrapper}>
        {loading ? (
          <Loading />
        ) : (
          <Grid container spacing={2}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Grid item xs={11} className={titleStyle}>
                {addOrUpdate(form.id)}
              </Grid>

              <Grid item xs={1}>
                <IconButton onClick={handleCloseModal}>
                  <Cancel />
                </IconButton>
              </Grid>

              <Grid item xs={12} className={gridWrapper}></Grid>
            </Grid>
            {includeFile && (
              <Grid container item xs={12} spacing={2}>
                <form encType="multipart/form-data">
                  {bodyOrNewbody(form.id).map((component, index) => (
                    <Grid item xs={12} style={{ marginBottom: 20 }} key={index}>
                      <FormItemParser
                        component={{
                          ...component,
                          value:
                            component.dataIndex === "files"
                              ? form[
                                  `${component.customPropsFormItem.fieldName}`
                                ]
                              : form[`${component.dataIndex}`],
                          handleChange: handleFormChange,
                          error: errors[`${component.dataIndex}`],
                        }}
                        mode={initialValue.id ? "edit" : "add"}
                      />
                    </Grid>
                  ))}
                </form>
              </Grid>
            )}
            {!includeFile &&
              bodyOrNewbody(form.id).map((component, index) => (
                <Grid item xs={12} key={index}>
                  <FormItemParser
                    component={{
                      ...component,
                      value: form[`${component.dataIndex}`],
                      handleChange: handleFormChange,
                      error: errors[`${component.dataIndex}`],
                    }}
                    mode={initialValue.id ? "edit" : "add"}
                  />
                </Grid>
              ))}
            <Grid item xs={12} style={{ textAlign: "right", marginTop: 24 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitForm}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        )}
      </div>
    </Modal>
  );
};

export default ActionModal;
