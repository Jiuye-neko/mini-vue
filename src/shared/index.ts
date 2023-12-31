export const extend = Object.assign;

export const isObject = (val) => {
  return val !== null && typeof val === 'object';
};

export const hasChange = (val, newVal) => {
  return !Object.is(val, newVal);
};

export const isOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key);

export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c) => {
    return c ? c.toUpperCase() : '';
  });
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toHanderKey = (str: string) => {
  return str ? 'on' + capitalize(str) : '';
};
