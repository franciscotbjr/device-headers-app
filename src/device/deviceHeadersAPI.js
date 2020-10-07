import axios from 'axios';
import { buildDeviceInfo } from './deviceInfo';
import { getDeviceId } from './deviceStorage';

const URL_BASE = "";

const DEVICE_ID_HEADER_NAME = 'X-GCS-ALG-DEVICE-ID';
const DEVICE_INFO_HEADER_NAME = 'X-GCS-ALG-DEVICE-INFO';

export default function deviceRegister() {
  axios.interceptors.request.use(async req => {

    if (req.url.indexOf(URL_BASE) === 0) {
      req.headers[DEVICE_ID_HEADER_NAME] = getDeviceId();
      req.headers[DEVICE_INFO_HEADER_NAME] = await buildDeviceInfo();
    }

    return req;
  });
}
