import React, { FC, useState } from "react";
import { CSVLink } from "react-csv";

import { Button } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

import { PROPS } from "./interface";
import { API_BACKOFFICE } from "@constants/config";
import useXFetcher from "@helpers/fetcher/useXFetcher";

export const ExportToExcel: FC<PROPS> = ({
  fileName,
  header,
  params,
  apiUrl,
  apiListResponseTransform,
}) => {
  const { get } = useXFetcher(`${API_BACKOFFICE}/v1${apiUrl}`);
  const [exportedData, setExportedData] = useState([]);
  const [loadData, setLoadData] = useState(false);

  const csvRef = React.useRef(null);

  const setExported = () => {
    const param = {
      ...params,
      start_date: params.start_date || null,
      end_date: params.end_date || null,
      limit: 999999999,
      page: 1,
    };
    setLoadData(true);
    get("/", param)
      .then((resp) => {
        setExportedData(apiListResponseTransform(resp.data || []));
      })
      .finally(() => {
        setLoadData(false);
        csvRef.current.link.click();
      });
  };

  return (
    <>
      <CSVLink
        data={exportedData}
        asyncOnClick={true}
        headers={header}
        filename={`${new Date().getTime()}-${fileName}.csv`}
        separator={","}
        ref={csvRef}
      ></CSVLink>
      <Button
        variant="contained"
        color="primary"
        startIcon={!loadData && <CloudUpload />}
        style={{ margin: 20, marginLeft: 0, width: 150 }}
        onClick={setExported}
        disabled={loadData}
      >
        {loadData ? "Loading..." : "Export"}
      </Button>
    </>
  );
};
