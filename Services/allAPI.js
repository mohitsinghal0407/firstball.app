import {commonAPI} from './commonAPI';
import {serverURL} from './serverURL';

// user registration
export const registerAPI = async details => {
  return await commonAPI(
    'POST',
    `${serverURL}/api/1.0/auth/signup`,
    details,
    '',
  );
};

// user login
export const loginAPI = async details => {
  return await commonAPI(
    'POST',
    `${serverURL}/api/1.0/auth/login`,
    details,
    '',
  );
};
