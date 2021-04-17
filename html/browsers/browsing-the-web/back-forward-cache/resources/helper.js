function clearData() {
  const keysToBeRemoved = [];
  for (let i = 0; i < localStorage.length; ++i) {
    const key = localStorage.key(i);
    if (key.startsWith(localStoragePrefix)) {
      keysToBeRemoved.push(key);
    }
  }
  for (const key of keysToBeRemoved) {
    localStorage.removeItem(key);
    console.log(key);
  }
}

function getData(name) {
  return localStorage.getItem(localStoragePrefix + name);
}

function setData(name, value) {
  localStorage.setItem(localStoragePrefix + name, value);
}

function pushData(name, value) {
  const old = getData(name);
  let newArray;
  if (!old) {
    newArray = [value];
  } else {
    newArray = JSON.parse(old);
    newArray.push(value);
  }
  setData(name, JSON.stringify(newArray));
}

function dumpData() {
  const ret = {};
  for (let i = 0; i < localStorage.length; ++i) {
    const key = localStorage.key(i);
    ret[key] = localStorage.getItem(key);
  }
  return ret;
}
