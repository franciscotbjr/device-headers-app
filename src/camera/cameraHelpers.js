import CAMERA_ERRORS from './cameraErrors';

const IMAGE_MAX_SIZE = Math.floor(1024 * 1000 * 2);
const RESIZE_TARGET = Math.floor(IMAGE_MAX_SIZE * 0.9);

export const hdConstraints = {
    video: { width: { min: 1280 }, height: { min: 720 } },
    audio: false,
}

export const vgaConstraints = {
    video: { width: { exact: 640 }, height: { exact: 480 } },
    audio: false,
}

export async function startByConstraints(errorCallback, constraint = { video: true, audio: false }) {
    const result = {};
    try {
        result.stream = await navigator.mediaDevices.getUserMedia(constraint);
    } catch (error) {
        result.error = handleError(error, errorCallback);
    }
    return result;
}

export function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}

export function handleSuccess(stream) {
    getVideoElement().srcObject = stream;
}

export function handleError(error, errorCallback) {
    let cameraError = undefined;
    if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
        cameraError = CAMERA_ERRORS.constraintNotSatisfied;
        errorCallback(cameraError);
    } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        cameraError = CAMERA_ERRORS.permissionDenied;
        errorCallback(cameraError);
    }
    return cameraError;
}

export function getVideoElement() {
    return document.querySelector('video');
}

export function createSnapshot(errorCallback) {
    let snapshot = undefined;
    try {
        const videoElement = getVideoElement();
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d').drawImage(videoElement, 0, 0);
        snapshot = canvas.toDataURL('image/png');
        if(snapshot) {
            snapshot = clearSnapshot(snapshot);
            if(isResizeRequired(snapshot)) {
                snapshot = resizeSnapshot(canvas, snapshot, errorCallback);
            }
        }
    } catch (error) {
        errorCallback(CAMERA_ERRORS.failToCreateSnapshot);
    }
    return snapshot;
}

function isResizeRequired(snapshot) {
    return byteCount(snapshot) > IMAGE_MAX_SIZE;
}

function resizeSnapshot(canvas, snapshot, errorCallback) {
    let newSnapshot = undefined;
    try {
        const realSize = byteCount(snapshot);
        const newCanvas = document.createElement('canvas');

        const percentResize = IMAGE_MAX_SIZE / realSize;

        newCanvas.width = canvas.width * percentResize;
        newCanvas.height = canvas.height * percentResize;
        
        const newCanvasCtx = newCanvas.getContext('2d');

        newCanvasCtx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);

        newSnapshot = newCanvas.toDataURL('image/png');

        if(newSnapshot) {
            newSnapshot = clearSnapshot(newSnapshot);
        }
        
    } catch (error) {
        errorCallback(CAMERA_ERRORS.failToCreateSnapshot);
    }
    return newSnapshot;
}

function byteCount(snapshot) {
    return snapshot.split(/%..|./).length - 1;
}

function clearSnapshot(snapshot) {
    return snapshot.replace('data:image/png;base64,', '');
}
