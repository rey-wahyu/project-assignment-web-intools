export const generateFormData = (data: Record<any, any>): any => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (key === "files") {
      data[key].map((item) => formData.append("files", item[0], item[0].name));
    }

    if (Array.isArray(data[key]))
      data[key].map((x) => {
        formData.append(key, x);
      });
    else formData.append(key, data[key]);
  });

  return formData;
};
