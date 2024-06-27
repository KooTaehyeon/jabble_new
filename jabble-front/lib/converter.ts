export const GMTtoKSTconverter = (time: string | number | Date) => {
  let gmtTime = new Date(time);
  return new Date(gmtTime.getTime());
};

export const getKeyByValue = (obj: any, value: any) =>
  Object.keys(obj).find((key) => obj[key] === value);

export const stringToSnakeCase = (word: string) => {
  return word?.replace(' ', '_').toLowerCase();
};

export const toSnakeCase = (object: any) => {
  return Object.keys(object)
    .map((key) => {
      return { before: key, after: stringToSnakeCase(key) };
    })
    .reduce((cur, { before, after }) => {
      return Object.assign(cur, { [after]: object[before] });
    }, {});
};

export const objectKeyChangeFromXtoY = (
  object: any,
  presentKey: any,
  newKey: any
) => {
  return Object.keys(object)
    .map((key) => {
      return { before: key, after: key.replace(presentKey, newKey) };
    })
    .reduce((cur, { before, after }) => {
      return Object.assign(cur, { [after]: object[before] });
    }, {});
};
export const convertKeysToLowercase = (
  obj: Record<string, any>
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key.toLowerCase()] = obj[key];
    }
  }

  return result;
};
