import CAMERA_ERRORS from './cameraErrors';
import { addCameraShot } from './cameraStorage'
import { hasGetUserMedia, startByConstraints, handleError, handleSuccess, hdConstraints, vgaConstraints, getVideoElement, createSnapshot } from './cameraHelpers'

async function openCamera(errorCallback) {
    let result = undefined;
    try {
        closeCamera();
        if (hasGetUserMedia()) {
            result = await startByConstraints(errorCallback, hdConstraints);
            if (result.error
                && !CAMERA_ERRORS.isPermissionDenied(result.error.code)) {
                result = await startByConstraints(errorCallback, vgaConstraints);
            }
            if (!result.error) {
                handleSuccess(result.stream);
            }

        } else {
            errorCallback(CAMERA_ERRORS.noDeviceAvailable);
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
};

export default cameraFeatures;
