/*
    SIMPLIFY YOUR FETCHER WITH THIS HELPER
    how to use it :
    1. create helper folder on your module routes
    2. import this file, and then `export default () => useXFetcher(<your-base-url>)`
    3. your fetcher helper is ready to use on your components
*/
import qs from "qs";

import { useCallback } from "react";
import useFetcher from "./useFetcher";

const _get = (fetcher, baseURL, path, params, options) => {
  let url = `${baseURL}${path}`;

  const initiateHeader = options?.headers || {};
  const headers = {
    ...initiateHeader,
  };

  const reqParam = params || {};
  if (reqParam) {
    url += `?${qs.stringify(reqParam)}`;
  }

  const requestOptions = {
    ...options,
    headers,
  };
  return fetcher(url, requestOptions);
};

const _callAPI = (fetcher, baseURL, method, path, options, params = {}) => {
  let body = params;
  const url = `${baseURL}${path}`;

  let headers = options?.headers;
  if (!options?.includeFile) headers = {};
  if (headers && !headers["Content-Type"])
    headers["Content-Type"] = "application/json";

  const bodyReq = params || {};
  if (headers) {
    switch (headers["Content-Type"]) {
      case "application/json":
        body = JSON.stringify(bodyReq);
        break;
      case "application/x-www-form-urlencoded":
        body = qs.stringify(bodyReq);
        break;
      default:
        body = JSON.stringify(bodyReq);
    }
  }

  const requestOptions = {
    ...options,
    headers,
    method,
    body,
  };
  return fetcher(url, requestOptions);
};

const useXFetcher = (baseURL: string) => {
  const fetcher = useFetcher();
  const get = useCallback(
    (path: string, params?: any, options?: any) => {
      return _get(fetcher, baseURL, path, params, options);
    },
    [baseURL, fetcher]
  );
  const put = useCallback(
    (path: string, params?: any, options?: any) => {
      return _callAPI(fetcher, baseURL, "PUT", path, options, params);
    },
    [baseURL, fetcher]
  );
  const post = useCallback(
    (path: string, params?: any, options?: any) => {
      return _callAPI(fetcher, baseURL, "POST", path, options, params);
    },
    [baseURL, fetcher]
  );
  const del = useCallback(
    (path: string, params?: any, options?: any) => {
      return _callAPI(fetcher, baseURL, "DELETE", path, options, params);
    },
    [baseURL, fetcher]
  );
  const patch = useCallback(
    (path: string, params?: any, options?: any) => {
      return _callAPI(fetcher, baseURL, "PATCH", path, options, params);
    },
    [baseURL, fetcher]
  );
  return { post, put, get, del, patch };
};

export default useXFetcher;
