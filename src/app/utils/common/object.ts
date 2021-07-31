export const getObjectKeysAsKeyof = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;
