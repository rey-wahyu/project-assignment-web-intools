import { ReactNode, CSSProperties } from "react";

export interface DisplayModal {
  open: boolean;
  handleCloseModal: (params) => void;
  id: number;
  data?: any[];
}

export interface ModuleTable {
  title: string;
  dataIndex: string;
  render?: any;
  width?: number;
  compare?: string;
  compareValue?: string;
  compareValueOnHold?: string;
}

interface ActionModalBody {
  label: string;
  type: string;
  dataIndex: string;
  customPropsFormItem?: any;
}

export interface ModuleForm {
  type: string;
  label: string;
  dataIndex: string;
  data?: any[];
  customPropsFormItem?: any;
}

interface ExportHeader {
  label: string;
  key: string;
}

interface AdditionalButton {
  text: string;
  element: (any) => any;
}

export interface PROPS {
  menuName?: string;
  elementTagPrefix?: string;
  pageTitle?: string;
  showFilter?: boolean;
  showAddButton?: boolean;
  showAppointmentAddButton?: boolean;
  showExtraButton?: boolean;
  showBulkButton?: boolean;
  apiUrlExtraButton?: string;
  apiUrlBulkButton?: string;
  apiUrlAppointmentAddButton?: string;
  showDateRangeFilter?: boolean;
  exportData?: boolean;
  exportHeader?: ExportHeader[];
  exportFilename?: string;
  apiURL: string;
  postURL?: string;
  defaultParams?: any;
  moduleTable?: ModuleTable[];
  moduleForms?: ModuleForm[];
  moduleExtraForm?: ModuleForm[];
  moduleBulkForm?: ModuleForm[];
  moduleAppointmentAddButton?: ModuleForm[];
  apiListResponseTransform?: (response) => any;
  apiDetailResponseTransform?: (response) => any;
  tableFixed?: boolean;
  data?: any;
  depthValue?: string;
  customFilter?: ModuleForm[];
  deleteMessage?: string;
  triggerRefetch?: boolean;
  overlayLoading?: boolean;
  errDeleteCode?: string;
  additionalButton?: AdditionalButton;
}

interface FilterProps {
  show: boolean;
  handleChange?: (e) => void;
  value?: string;
  clearFilter?: () => void;
  handleSearchData?: () => void;
}

export interface WrapperProps {
  children: ReactNode;
  title?: string;
  header?: ReactNode;
  style?: CSSProperties;
  bodyClass?: string;
  filter?: FilterProps;
  showAddButton?: boolean;
  modalComponent?: ActionModalBody[];
}

export interface ActionModalProps {
  open?: boolean;
  handleClose?: () => void;
  body?: ActionModalBody[];
  initialValue?: any;
  url: string;
  postUrl?: string;
  transformResponse?: (response) => any;
  modalType?: string;
  clear?: () => any;
}

export interface ActionExtraModalProps {
  open?: boolean;
  handleClose?: () => void;
  body?: ActionModalBody[];
  url: string;
  clear?: () => any;
}

export interface ActionBulkModalProps {
  open?: boolean;
  handleClose?: () => void;
  body?: ActionModalBody[];
  url: string;
  clear?: () => any;
}

export interface ActionAppointmentCreateModalProps {
  open?: boolean;
  handleClose?: () => void;
  body?: ActionModalBody[];
  url: string;
  clear?: () => any;
}

interface FormItemParser {
  type?: string;
  label?: string;
  value?: string | string[];
  render?: any;
  handleChange?: (type, value) => void;
  dataIndex?: string;
  data?: any[];
  customPropsFormItem?: any;
  error?: any;
  handleRefetch?: (value) => void;
}

export interface FormItemParserProps {
  component?: FormItemParser;
  mode?: string;
}
