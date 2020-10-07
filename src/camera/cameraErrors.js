class CameraErros {
    constructor() {
        this.noDeviceAvailable = {name: 'NoDeviceAvailable', code: 1};
        this.permissionDenied = {name: 'PermissionDenied', code: 2};
        this.constraintNotSatisfied = {name: 'ConstraintNotSatisfied', code: 3};
        this.failToCreateSnapshot = {name: 'failToCreateSnapshot', code: 4};
    }

    isNoDeviceAvailable = (code) => {
        return this.noDeviceAvailable.code === code;
    }

    isPermissionDenied = (code) => {
        try {
            return this.permissionDenied.code === code;
        } catch (error) {
            console.error(error);
        }
    }

    isConstraintNotSatisfied = (code) => {
        return this.constraintNotSatisfied.code === code;
    }

    isFailToCreateSnapshot = (code) => {
        return this.failToCreateSnapshot.code === code;
    }
}

const CAMERA_ERRORS = new CameraErros();

Object.freeze(CAMERA_ERRORS);

export default CAMERA_ERRORS;
