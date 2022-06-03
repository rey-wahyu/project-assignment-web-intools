import React, { FC, useState } from "react";
import InstantTemplateProvider from "@components/InstantTemplate/context";
import FilterView from "@components/InstantTemplate";
import DateFnsUtils from "@date-io/date-fns";
import { COLUMNS_TABLE_USER, MODULE_FORMS_USER } from "@components/User/constants/config";
import DetailModal from "@components/User/components/DetailModal";

const User: FC = () => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [userId, setUserId] = useState(null);
  
  const handleListResponseTransform = (response) => {    
    let temp = response;
    temp = temp.map((item, i) => ({
      ...item,
      no: i + 1,
      dob: new DateFnsUtils().format(new Date(item.dob), 'dd MMM yyyy')
    }));

    return temp;
  };

  const handleShowDetail = (id: number) => {
    setOpenDetailModal((prev) => !prev);
    setUserId(id);
  };

  return (
    <InstantTemplateProvider>
      <FilterView
        menuName="User"
        elementTagPrefix="User"
        pageTitle="User Management"
        showAddButton
        apiURL="/api/user"
        moduleTable={COLUMNS_TABLE_USER({ handleShowDetail })}
        moduleForms={MODULE_FORMS_USER}
        apiListResponseTransform={handleListResponseTransform}
        exportFilename="user"
      />
      <DetailModal
          open={openDetailModal}
          handleCloseModal={() => setOpenDetailModal(false)}
          id={userId}
      />
    </InstantTemplateProvider>
  );
};
export default User;
