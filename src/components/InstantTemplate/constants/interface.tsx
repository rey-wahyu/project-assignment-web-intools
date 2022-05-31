interface ModuleTable {
  title: string;
  dataIndex: string;
  render?: any;
  width?: number;
}

interface ModuleForm {
  type: string;
  label: string;
  dataIndex: string;
  data?: any[];
  customPropsFormItem?: any;
}

export interface PROPS {
  pageTitle?: string;
  showFilter?: boolean;
  showAddButton?: boolean;
  apiURL: string;
  defaultParams?: any;
  moduleTable?: ModuleTable[];
  moduleForms?: ModuleForm[];
  apiListResponseTransform?: (response) => any;
  apiDetailResponseTransform?: (response) => any;
  tableFixed?: boolean;
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
}

export interface FormItemParserProps {
  component?: FormItemParser;
  mode?: string;
}
