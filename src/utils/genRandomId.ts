const dec2hex = (dec: any) => {
  return dec.toString(16).padStart(2, '0');
};

export const generateRandomId = (len?: number) => {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
};

export const genUID = function () {
  return Date.now().toString(10).slice(4, 10) + Math.random().toString(10).substr(2).slice(0, 3);
};

export const genRandomUID = function () {
  return Date.now().toString(10).slice(6, 10) + Math.random().toString(10).substr(2).slice(0, 6);
};
