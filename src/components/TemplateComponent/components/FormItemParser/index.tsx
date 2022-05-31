import React, { FC, useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
} from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { InsertDriveFile, Delete, BorderAllOutlined, BorderAll } from "@material-ui/icons";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { FieldTypes } from "@components/TemplateComponent/constants/config";
import { FormItemParserProps } from "../../constants/interface";
import { cssSelectList, cssTextField, cssFileWrapper } from "./styles";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const FormItemParser: FC<FormItemParserProps> = ({ component, mode }) => {
  const {
    type = "",
    label = "",
    value = type === FieldTypes.SELECT_LIST ? [] : "",
    render = "",
    handleChange,
    dataIndex = "",
    data = [],
    customPropsFormItem = {},
    error = null,
    handleRefetch,
  } = component;

  const [radioValue, setRadioValue] = useState(`${value}`);
  const [selectedValue, setSelectedValue] = useState(null);
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (
      value &&
      (type === FieldTypes.SELECT || type === FieldTypes.SELECT_LIST)
    )
      setSelectedValue(value);
    else setSelectedValue("");
  }, []);

  const fileRef = React.useRef(null);
  const handleClickFile = (e) => {
    fileRef.current.click();
  };

  const unSelect = (d) => () => {
    const vx = selectedValue.filter((x) => x !== d);
    setSelectedValue(vx);
    handleChange(dataIndex, vx);
  };

  const handleDeleteFile = (key) => {
    setFiles((prev) => prev.filter((_, index) => index !== key));
  };

  switch (type) {
    case FieldTypes.TEXT: {
      return (
        <TextField
          label={label}
          variant="outlined"
          size="small"
          style={{ width: "100%" }}
          value={value}
          onChange={(e) => handleChange(dataIndex, e.target.value)}
          className={cssTextField}
          {...customPropsFormItem}
          {...(error && { error: true, helperText: error })}
          autoComplete="no"
        />
      );
    }

    case FieldTypes.TEXT_PASSWORD: {
      return (
        <TextField
          type="password"
          label={label}
          variant="outlined"
          size="small"
          style={{ width: "100%" }}
          value={value}
          onChange={(e) => handleChange(dataIndex, e.target.value)}
          {...(mode === "edit" && { ...customPropsFormItem })}
          autoComplete="no"
        />
      );
    }

    case FieldTypes.NUMBER: {
      return (
        <TextField
          type="number"
          label={label}
          variant="outlined"
          size="small"
          style={{ width: "100%" }}
          value={value}
          onChange={(e) => handleChange(dataIndex, e.target.value)}
          {...(mode === "edit" && { ...customPropsFormItem })}
          {...(error && { error: true, helperText: error })}
          autoComplete="no"
        />
      );
    }

    case FieldTypes.SELECT: {
      return (
        <FormControl
          className={cssSelectList}
          {...(mode === "edit" && { ...customPropsFormItem })}
          {...(error && { error: true, helperText: error })}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            value={selectedValue || value}
            label={label}
            onChange={(e) => {
              setSelectedValue(e.target.value);
              handleChange(dataIndex, e.target.value);
            }}
          >
            {data &&
              data.map((item, idx) => (
                <MenuItem key={idx} value={item.id}>
                  {item.value}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      );
    }

    case FieldTypes.TEXTAREA: {
      return (
        <TextField
          id="standard-multiline-flexible"
          label={label}
          multiline
          variant="outlined"
          size="small"
          style={{ width: "100%" }}
          maxRows={4}
          value={value}
          onChange={(e) => handleChange(dataIndex, e.target.value)}
          {...(mode === "edit" && { ...customPropsFormItem })}
          {...(error && { error: true, helperText: error })}
          autoComplete="no"
        />
      );
    }

    case FieldTypes.RADIO: {
      return (
        <FormControl
          component="fieldset"
          {...(error && { error: true, helperText: error })}
        >
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            aria-label="radio"
            name="radio"
            value={radioValue}
            onChange={(e) => {
              setRadioValue(e.target.value);
              handleChange(dataIndex, e.target.value);
            }}
            {...(mode === "edit" && { ...customPropsFormItem })}
          >
            {data &&
              data.map((item) => (
                <FormControlLabel
                  value={item.value}
                  control={<Radio />}
                  label={item.name}
                  checked={item.value == radioValue}
                />
              ))}
          </RadioGroup>
        </FormControl>
      );
    }

    case FieldTypes.SELECT_LIST: {
      return (
        <FormControl
          className={cssSelectList}
          {...(error && { error: true, helperText: error })}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            multiple
            value={selectedValue || []}
            open={open}
            onClick={() => setOpen(!open)}
            onChange={(e) => {
              setSelectedValue(e.target.value);
              handleChange(dataIndex, e.target.value);
            }}
            input={<Input id="select-multiple-chip" />}
            renderValue={() => (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {(selectedValue || []).map((val) => (
                  <Chip
                    key={val}
                    label={
                      data.find((v) => v.id.toString() === val.toString())
                        ?.name || ""
                    }
                    style={{ margin: 2 }}
                    onDelete={unSelect(value)}
                  />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
            {...(mode === "edit" && { ...customPropsFormItem })}
          >
            {data.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    case FieldTypes.CHECKBOX: {
      return (
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => handleChange(dataIndex, e.target.checked)}
              checked={Boolean(value)}
              {...(mode === "edit" && { ...customPropsFormItem })}
              {...(error && { error: true, helperText: error })}
            />
          }
          label={label}
        />
      );
    }

    case FieldTypes.FILE: {
      return (
        <>
          <input
            ref={fileRef}
            type="file"
            style={{ width: "100%", display: "none" }}
            onChange={(e) => {
              const file = (e.target as HTMLInputElement).files;
              if (file.length) {
                const tempFile = [...files];
                tempFile.push(file);
                handleChange(dataIndex, tempFile);
                setFiles(tempFile);
              }
            }}
            multiple
            className={cssTextField}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickFile}
            style={{ marginBottom: 8 }}
          >
            Choose File
          </Button>

          {(files || []).map((item, index) => {
            const src = URL.createObjectURL(item[0]);
            return (
              <div key={index} className={cssFileWrapper}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {item[0].type.includes("image") ? (
                    <img
                      src={src}
                      width="100"
                      height="100"
                      alt={`img-${index}`}
                    />
                  ) : (
                    <InsertDriveFile />
                  )}
                  {item[0].name}
                </div>
                <Delete
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteFile(index)}
                />
              </div>
            );
          })}
        </>
      );
    }

    case FieldTypes.AUTOCOMPLETE: {
      return (
        <Autocomplete
          disablePortal
          options={data}
          onChange={(_, v) => {
            handleChange(dataIndex, v.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              onChange={(e) => {
                handleRefetch(e.target.value);
              }}
              autoComplete="off"
            />
          )}
          className={cssSelectList}
        />
      );
    }

    case FieldTypes.DATEPICKER: {
      return (
        <div className="MuiOutlinedInput-input">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              size="small"
              style={{ width: "100%" }}
              margin="none"
              id="date-picker-dialog"
              label="Start Date"
              format="MM/dd/yyyy"
              value={value}
              onChange={setSelectedValue}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      );
    }

    case FieldTypes.RENDER: {
      return typeof render === "function" ? render() : render;
    }
  }
};

export default FormItemParser;
