export const setItem = (key, value) => {
  let serializedValue = null;

  if (value !== undefined) {
    serializedValue = JSON.stringify(value);
  }

  window.sessionStorage.setItem(key, serializedValue);
};

export const getItem = key => {
  let value = null;

  if (key !== undefined) {
    const serializedValue = window.sessionStorage.getItem(key);
    if (serializedValue !== null) {
      value = JSON.parse(serializedValue);
    }
  }

  return value;
};

export const removeItem = key => {
  window.sessionStorage.removeItem(key);
};

export const hasKey = key => {
  let has = false;
  if (key !== undefined && window.sessionStorage.getItem(key) !== null) {
    has = true;
  }

  return has;
};
