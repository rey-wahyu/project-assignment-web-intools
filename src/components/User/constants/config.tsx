import { FieldTypes } from "@components/TemplateComponent/constants/config";
import type { ModuleTable } from "@components/TemplateComponent/constants/interface";
import { Button } from "@material-ui/core";

export const COLUMNS_TABLE_USER = ({ handleShowDetail }): ModuleTable[] => [
    { title: "No.", dataIndex: "no" },
    { title: "Name", dataIndex: "name" },
    { title: "Date of Birth", dataIndex: "dob" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
        title: "See Detail",
        dataIndex: "id",
        render: (value) => (
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleShowDetail(value)}
            >
                Detail
            </Button>
        ),
    },
    { title: "Actions", dataIndex: "actions" },
];

export const MODULE_FORMS_USER = [
    {
        type: FieldTypes.TEXT,
        label: "Name",
        dataIndex: "name",
    },
    {
        type: FieldTypes.TEXT,
        label: "Email",
        dataIndex: "email",
    },
    {
        type: FieldTypes.TEXT,
        label: "Phone",
        dataIndex: "phone",
    },
];
