import * as uuid from 'uuid';
import { durableStorage } from '../storage';

const DEVICE_ID_KEY = 'gcs_al_device';
const DUMMY_ID = '0d0u0m0m-0y0d-0e0v-0i0c-0e0i0d0d0d0i';

export function getDeviceId() {
  let deviceId = DUMMY_ID
  try {
    deviceId = durableStorage.getItem(DEVICE_ID_KEY);
    if (!deviceId) {
      deviceId = uuid.v4();
      durableStorage.setItem(DEVICE_ID_KEY, deviceId);
    }
  } catch (err) { }
  return deviceId;
}
