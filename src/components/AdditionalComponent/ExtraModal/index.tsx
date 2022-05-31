import React, { FC, useState, useReducer, useEffect } from "react";
import {
  Modal,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import {
  ArrowForwardIos,
  ArrowForward,
  PlayArrow,
  ArrowRight,
  Cancel,
} from "@material-ui/icons";

import { API_BACKOFFICE } from "@constants/config";
import {
  gridWrapper,
  modalWrapper,
  floatingBannerInput,
  inputStyle,
  titleStyle,
} from "./styles";
import useXFetcher from "@helpers/fetcher/useXFetcher";
import Loading from "@components/Loading";
import { BlockPicker } from "react-color";
import Tippy from "@tippyjs/react";

import { ActionExtraModalProps } from "../../TemplateComponent/constants/interface";
import { failedToast, successToast } from "@helpers/toast";
import { initialState, reducer } from "../reducers/reducer";

const ExtraModal: FC<ActionExtraModalProps> = ({ open, handleClose, url }) => {
  const { post, get } = useXFetcher(`${API_BACKOFFICE}/v1${url}`);
  const [loading, setLoading] = useState(false);
  const [required, setRequired] = useState({
    text_id: null,
    text_en: null,
    link: null,
    icon: null,
    button_link_text_id: null,
    button_link_text_en: null,
    text_color: null,
    link_color: null,
    bg_color: null,
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    text_id,
    text_en,
    link,
    icon,
    button_link_text_id,
    button_link_text_en,
    text_color,
    link_color,
    bg_color,
  } = state;

  useEffect(() => {
    const getData = () => {
      get("/").then((response) => {
        dispatch({ type: "SET_DATA", data: response });
      });
    };

    getData();
  }, [open]);

  const handleRequiredValue = ({ isRequired, key }) => {
    if (isRequired) {
      setRequired((prev) => ({
        ...prev,
        [`${key}`]: `${key.replace(/_/g, " ")} is required`,
      }));
    } else {
      setRequired((prev) => ({ ...prev, [`${key}`]: null }));
    }
  };

  const handleSubmitForm = async () => {
    Object.keys(state).forEach((key) => {
      const payload = {
        isRequired: state[`${key}`] ? false : true,
        key,
      };
      handleRequiredValue(payload);
    });
    console.log(!Object.values(required).every((x) => x === null));
    if (!Object.values(required).every((x) => x === null))
      return failedToast("Please fill all of required fields");
    setLoading(true);
    post("", state)
      .then((res) => {
        res.is_error
          ? failedToast(res.response.error_message.replace(/_/g, " "))
          : successToast("Success, Item updated!");
      })
      .catch(() => failedToast("Failed!"))
      .finally(() => {
        setLoading(false);
      });

    handleClose();
  };

  const handleCloseModal = () => {
    handleClose();
    Object.keys(state).forEach((key) => {
      handleRequiredValue({ isRequired: false, key });
    });
  };

  const handleChange = (key, value) => {
    handleRequiredValue({ isRequired: !value ? true : false, key });
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
                Floating Banner
              </Grid>

              <Grid item xs={2}>
                <IconButton onClick={handleCloseModal}>
                  <Cancel />
                </IconButton>
              </Grid>

              <Grid item xs={12} className={gridWrapper}></Grid>
            </Grid>

            <Grid item xs={12}>
              <div className={floatingBannerInput}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Text (IDN)"
                  value={text_id}
                  onChange={(e) => {
                    dispatch({ type: "TEXT_ID", data: e.target.value });
                    handleChange("text_id", e.target.value);
                  }}
                  className={inputStyle}
                  multiline
                  maxRows={5}
                  {...(required.text_id && {
                    error: true,
                    helperText: required.text_id,
                  })}
                />
              </div>
              <div className={floatingBannerInput}>
                <TextField
                  label="Text (ENG)"
                  className={inputStyle}
                  multiline
                  maxRows={5}
                  value={text_en}
                  onChange={(e) => {
                    dispatch({ type: "TEXT_EN", data: e.target.value });
                    handleChange("text_en", e.target.value);
                  }}
                  {...(required.text_en && {
                    error: true,
                    helperText: required.text_en,
                  })}
                />
              </div>
              <div className={floatingBannerInput}>
                <TextField
                  label="Link"
                  className={inputStyle}
                  multiline
                  maxRows={5}
                  value={link}
                  onChange={(e) => {
                    dispatch({ type: "LINK", data: e.target.value });
                    handleChange("link", e.target.value);
                  }}
                  {...(required.link && {
                    error: true,
                    helperText: required.link,
                  })}
                />
              </div>
              <div className={floatingBannerInput}>
                <Select
                  className={inputStyle}
                  value={icon}
                  label="Icon"
                  onChange={(e) => {
                    dispatch({ type: "ICON", data: e.target.value });
                    handleChange("icon", e.target.value);
                  }}
                  {...(required.icon && {
                    error: true,
                    helperText: required.icon,
                  })}
                >
                  <MenuItem value={"ArrowForward"}>
                    <ArrowForward />
                    ArrowForward
                  </MenuItem>
                  <MenuItem value={"ArrowForwardIos"} disabled>
                    <ArrowForwardIos />
                    ArrowForwardIos
                  </MenuItem>
                  <MenuItem value={"PlayArrow"} disabled>
                    <PlayArrow />
                    PlayArrow
                  </MenuItem>
                  <MenuItem value={"ArrowRight"} disabled>
                    <ArrowRight />
                    ArrowRight
                  </MenuItem>
                </Select>
              </div>

              <div className={floatingBannerInput}>
                <TextField
                  label="Button Link Text (IDN)"
                  className={inputStyle}
                  multiline
                  maxRows={3}
                  value={button_link_text_id}
                  onChange={(e) => {
                    dispatch({ type: "BUTTON_TEXT_ID", data: e.target.value });
                    handleChange("button_link_text_id", e.target.value);
                  }}
                  {...(required.button_link_text_id && {
                    error: true,
                    helperText: required.button_link_text_id,
                  })}
                />
              </div>
              <div className={floatingBannerInput}>
                <TextField
                  label="Button Link Text (ENG)"
                  className={inputStyle}
                  multiline
                  maxRows={3}
                  value={button_link_text_en}
                  onChange={(e) => {
                    dispatch({ type: "BUTTON_TEXT_EN", data: e.target.value });
                    handleChange("button_link_text_en", e.target.value);
                  }}
                  {...(required.button_link_text_en && {
                    error: true,
                    helperText: required.button_link_text_en,
                  })}
                />
              </div>
              <div className={floatingBannerInput}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9}>
                    <TextField
                      label="Text Color"
                      className={inputStyle}
                      multiline
                      maxRows={1}
                      value={text_color}
                      onChange={(e) => {
                        dispatch({ type: "TEXT_COLOR", data: e.target.value });
                        handleChange("text_color", e.target.value);
                      }}
                      {...(required.text_color && {
                        error: true,
                        helperText: required.text_color,
                      })}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Tippy
                      interactive={true}
                      placement={"top"}
                      arrow={false}
                      content={
                        <BlockPicker
                          color={text_color}
                          onChangeComplete={(color) =>
                            dispatch({ type: "TEXT_COLOR", data: color.hex })
                          }
                        />
                      }
                    >
                      <Button
                        color="secondary"
                        size="small"
                        variant="contained"
                      >
                        pick
                      </Button>
                    </Tippy>
                  </Grid>
                </Grid>
              </div>

              <div className={floatingBannerInput}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9}>
                    <TextField
                      label="Link Color"
                      className={inputStyle}
                      multiline
                      maxRows={1}
                      value={link_color}
                      onChange={(e) => {
                        dispatch({ type: "LINK_COLOR", data: e.target.value });
                        handleChange("link_color", e.target.value);
                      }}
                      {...(required.link_color && {
                        error: true,
                        helperText: required.link_color,
                      })}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Tippy
                      interactive={true}
                      placement={"top"}
                      arrow={false}
                      content={
                        <BlockPicker
                          color={link_color}
                          onChangeComplete={(color) =>
                            dispatch({ type: "LINK_COLOR", data: color.hex })
                          }
                        />
                      }
                    >
                      <Button
                        color="secondary"
                        size="small"
                        variant="contained"
                      >
                        pick
                      </Button>
                    </Tippy>
                  </Grid>
                </Grid>
              </div>

              <div className={floatingBannerInput}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9}>
                    <TextField
                      label="Background Color"
                      className={inputStyle}
                      multiline
                      maxRows={4}
                      value={bg_color}
                      onChange={(e) => {
                        dispatch({ type: "BG_COLOR", data: e.target.value });
                        handleChange("bg_color", e.target.value);
                      }}
                      {...(required.bg_color && {
                        error: true,
                        helperText: required.bg_color,
                      })}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Tippy
                      interactive={true}
                      arrow={false}
                      content={
                        <BlockPicker
                          color={bg_color}
                          onChangeComplete={(color) =>
                            dispatch({ type: "BG_COLOR", data: color.hex })
                          }
                        />
                      }
                    >
                      <Button
                        color="secondary"
                        size="small"
                        variant="contained"
                      >
                        pick
                      </Button>
                    </Tippy>
                  </Grid>
                </Grid>
              </div>
            </Grid>

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

export default ExtraModal;
