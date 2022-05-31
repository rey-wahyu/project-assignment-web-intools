import { useCallback } from "react";

const fetcher = async (url, options) => {
  
  const pathname = new URL(url).pathname || "";
  const { responseType = "" } = options || {};
  const isNotValidEndpoint =
    /^(v\d)/.test(pathname.split("/")[1]) && pathname.split("/")[2] === "";

  if (pathname && isNotValidEndpoint) return;

  try {
    const res = await fetch(url, options);

    // return response json on success
    if (res.status >= 200 && res.status <= 299) {
      try {
        if (responseType === "blob") {
          return await res.blob();
        }

        const data = await res.json();
        if (!data) {
          console.error(
            `[API error]: Message: Wrong data format from API,  Path: ${pathname}`
          );
          throw new Error("error not formated json api");
        }
        return data;
      } catch (err) {
        return err;
      }
    } else if (res.status === 404) {
      return 0;
    } else if (res.status >= 400 && res.status !== 401 && res.status !== 403) {
      console.error(
        `[API error]: Message: Failed fetching API, Path: ${pathname}, Status: ${res.status}`
      );
    }
    
    // return object on error
    return {
      url: url,
      is_error: true,
      status: res.status,
      response: await res.json(),
    };
  } catch (err) {
    return {
      is_error: true,
      status: 500,
      error: err,
    };
  }
};

const useFetcher = () => {
  return useCallback(
    (url, opt = {}) => {
      const options = {
        ...opt,
        headers: {
          ...(opt.headers || {}),
        },
      };
      
      return fetcher(url, options);
    },
    []
  );
};

export default useFetcher;
