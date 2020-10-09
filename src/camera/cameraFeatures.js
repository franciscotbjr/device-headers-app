import { addCameraShot } from './cameraStorage'
import { handleError, handleSuccess, getVideoElement, createSnapshot, getAsBestResolution, requestCameras } from './cameraHelpers'


async function applyCamera(camera, errorCallback) {
    try {
        closeCamera();
        const result = await getAsBestResolution(camera, errorCallback);
        if (result.stream) {
            handleSuccess(result.stream);
        }
    } catch (error) {
        handleError(error, errorCallback);
    }
}

async function openCamera(errorCallback) {
    let result = undefined;
    try {
        const cameras = await requestCameras(errorCallback);
        if(cameras.front) {
            result = cameras;
            await applyCamera(cameras.front, errorCallback);
        }
    } catch (error) {
        handleError(error, errorCallback);
    }
    return result;
}

function closeCamera() {
    const video = getVideoElement();
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(function (track) {
            track.stop();
        });
        video.srcObject = undefined;
    }
}

function takeCameraShot(shotId, errorCallback) {
    try {
        const snapshot = createSnapshot(errorCallback);
        if(snapshot) {
            addCameraShot(shotId, snapshot);
        }
    } catch (error) {
        handleError(error, errorCallback);
    }
}

const cameraFeatures = {
    open: openCamera,
    close: closeCamera,
    takeShot: takeCameraShot,
    change: applyCamera,
};

export default cameraFeatures;
