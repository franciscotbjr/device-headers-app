import { sessionStorage } from '../storage'

const CAMERA_SHOTS_PREFIX = "al-camera-shot_";

export function addCameraShot(shotId, shot) {
    sessionStorage.setItem(getCameraItemId(shotId), shot)
}

function getCameraShot(shotId) {
    return sessionStorage.getItem(getCameraItemId(shotId));
}

function clearCameraShot(shotId) {
    sessionStorage.removeItem(getCameraItemId(shotId));
}

function getCameraItemId(shotId) {
    return `${CAMERA_SHOTS_PREFIX}${shotId}`;
}

const cameraStorage = {
    getShot: getCameraShot,
    clearShot: clearCameraShot,
}

export default cameraStorage;
