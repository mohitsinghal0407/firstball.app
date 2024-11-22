import axios from 'axios';

export const commonAPI = async (reqMethod, url, reqBody, reqHeader) => {
  const reqConfig = {
    method: reqMethod,
    url,
    data: reqBody,
    headers: reqHeader
      ? reqHeader
      : {
          'device-id': 'd12121',
          'app-type': 'web',
        },
  };

  return await axios(reqConfig)
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
};
