import React, { FC, useReducer, useState } from "react";
import { Modal, Grid, Button, TextField, IconButton } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

import { API_BACKOFFICE } from "@constants/config";
import {
  gridWrapper,
  modalWrapper,
  titleStyle,
  createBulkInput,
  cssTextField,
} from "./styles";
import useXFetcher from "@helpers/fetcher/useXFetcher";
import Loading from "@components/Loading";

import { ActionBulkModalProps } from "../../TemplateComponent/constants/interface";
import { failedToast, successToast } from "@helpers/toast";
import { bulkReducer, initialBulkState } from "../reducers/reducer";

const BulkModal: FC<ActionBulkModalProps> = ({ open, handleClose, url }) => {
  const { post } = useXFetcher(`${API_BACKOFFICE}/v1${url}`);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(bulkReducer, initialBulkState);

  const { files } = state;

  const handleSubmitForm = async () => {
    if (files.length === 0) {
      failedToast("Files is required");
      return;
    }

    setLoading(true);
    const data = new FormData();

    for (const localFile of files) {
      data.append("files", localFile, localFile.name);
    }

    post("", data, { includeFile: true })
      .then((res) => {
        if (res.is_error) {
          failedToast(res.response.error_message.replace(/_/g, " "));
        } else {
          successToast("Success, file added!");
          handleCloseModal();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch(() => failedToast("Failed!"))
      .finally(() => {
        setLoading(false);
      });
  };

  const allowedFiles = (array) => {
    const allowed = [];
    array.forEach((element) => {
      if (element.type.match("text/csv")) {
        allowed.push(element);
      }
    });
    return allowed;
  };

  const onChangeUpload = (e) => {
    const data = e.target.files || [];

    const newFiles = [];

    for (const element of data) {
      newFiles.push({
        type: element.type,
        filename: element.name,
      });
    }

    const allowedTypeFiles = allowedFiles(newFiles);

    if (allowedTypeFiles.length === 0) {
      failedToast("Please upload file with type: csv");
      return;
    }

    dispatch({
      type: "FILES",
      data: data,
    });
  };

  const handleCloseModal = () => {
    handleClose();
    dispatch({ type: "FILES", data: [] });
  };

  const fileRef = React.useRef(null);
  const handleClickFile = () => {
    fileRef.current.click();
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
              <Grid item xs={8} className={titleStyle}>
                Create Bulk
              </Grid>

              <Grid item xs={2}>
                <IconButton onClick={handleCloseModal}>
                  <Cancel />
                </IconButton>
              </Grid>

              <Grid item xs={12} className={gridWrapper}></Grid>
            </Grid>

            <Grid item xs={12}>
              <div className={createBulkInput}>
                <form encType="multipart/form-data">
                  <TextField
                    variant="outlined"
                    size="small"
                    style={{ width: "100%", marginBottom: "10px" }}
                    disabled
                    value={files[0]?.name ?? "Select a File"}
                    className={cssTextField}
                  />
                  <input
                    ref={fileRef}
                    type="file"
                    style={{ width: "100%", display: "none" }}
                    className={cssTextField}
                    onChange={onChangeUpload}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickFile}
                  >
                    Choose File
                  </Button>
                </form>
              </div>
            </Grid>

            <Grid item xs={12} style={{ textAlign: "right", marginTop: 24 }}>
              <Button
                disabled={files.length === 0}
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

export default BulkModal;
