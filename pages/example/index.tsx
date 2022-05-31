import React, { FC } from "react";
import InstantTemplateProvider from "@components/InstantTemplate/context";
import FilterView from "@components/InstantTemplate";
import {
  COLUMNS_TABLE_EXAMPLE,
  MODULE_FORMS_EXAMPLE,
} from "@components/Example/config";
import DateFnsUtils from "@date-io/date-fns";

const Examples: FC = () => {
  
  const handleListResponseTransform = (response) => {    
    let temp = response;
    temp = temp.map((item, i) => ({
      ...item,
      no: i + 1,
      dob: new DateFnsUtils().format(item.dob, 'dd MMM yyyy')
    }));

    return temp;
  };

  return (
    <InstantTemplateProvider>
      <FilterView
        menuName="Examples"
        elementTagPrefix="Examples"
        pageTitle="Example List"
        showAddButton
        apiURL="/api/example"
        moduleTable={COLUMNS_TABLE_EXAMPLE}
        moduleForms={MODULE_FORMS_EXAMPLE}
        apiListResponseTransform={handleListResponseTransform}
        exportFilename="example"
      />
    </InstantTemplateProvider>
  );
};
export default Examples;
