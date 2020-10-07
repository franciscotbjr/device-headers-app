const setDurableItem = (key, value) => {
  window.localStorage.setItem(key, value);
}

const geDurableItem = key => {
  return window.localStorage.getItem(key);
}

const removeDurableItem = key => {
  window.localStorage.removeItem(key);
}

const hasDurableKey = key => {
  let has = false;
  if (key !== undefined && window.localStorage.getItem(key) !== null) {
    has = true;
  }

  return has;
}

export default {
  setItem: setDurableItem,
  getItem: geDurableItem,
  removeItem: removeDurableItem,
  hasKey: hasDurableKey,
}
