import { setItem as _setSeriazableItem} from '../storageAPI';
import { getItem as _getSeriazableItem} from '../storageAPI';
import { removeItem as _removeSeriazableItem} from '../storageAPI';
import { hasKey as _hasSeriazableKey} from '../storageAPI';


const setSessionItem = (key, value) => {
    window.sessionStorage.setItem(key, value);
}

const getSessionItem = key => {
    return window.sessionStorage.getItem(key);
}

const removeSessionItem = key => {
    window.sessionStorage.removeItem(key);
}

const hasSessionKey = key => {
    let has = false;
    if (key !== undefined && window.sessionStorage.getItem(key) !== null) {
        has = true;
    }

    return has;
}

export default {
    setItem: setSessionItem,
    getItem: getSessionItem,
    removeItem: removeSessionItem,
    hasKey: hasSessionKey,
    setSeriazableItem: _setSeriazableItem,
    getSeriazableItem: _getSeriazableItem,
    removeSeriazableItem: _removeSeriazableItem,
    hasSeriazableKey: _hasSeriazableKey,   
}
