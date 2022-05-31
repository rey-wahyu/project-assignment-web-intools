import { FieldTypes } from "@components/TemplateComponent/constants/config";

export const COLUMNS_TABLE_EXAMPLE = [
  { title: "No.", dataIndex: "no" },
  { title: "Name", dataIndex: "name" },
  { title: "Date of Birth", dataIndex: "dob" },
  { title: "Actions", dataIndex: "actions" }
];

export const MODULE_FORMS_EXAMPLE = [
  {
    type: FieldTypes.TEXT,
    label: "Name",
    dataIndex: "name",
  },
  {
    type: FieldTypes.DATEPICKER,
    label: "Date of Birth",
    dataIndex: "dob",
  },
];
