import type { Key } from '../types';

/**
 * 该函数检查给定对象中是否存在给定键并返回布尔值。
 * @public
 * @param key - 第一个参数“key”的类型为“Key”，它可能是表示对象属性键的字符串或符号。
 * @param obj - `obj` 参数是类型为 `T` 的对象，它是扩展了 `object` 类型的泛型。这意味着 `obj` 可以是任何具有属性和方法的对象。
 * @returns 一个布尔值，指示提供的键是否存在于提供的对象的键中。
 */
function keyIn<T extends object>(key: Key, obj: T): key is keyof T {
  return key in obj;
}

/**
 * 函数“object_pick”接受一个对象和一个键数组，并返回一个新对象，该对象仅包含原始对象中的指定键。
 * @public
 * @param obj - 我们要从中选择特定键的对象。
 * @param keys - keys 是一个字符串数组，表示我们要选择的对象的键。该函数将返回一个新对象，该对象仅包含原始对象中指定的键及其对应的值。
 * @returns 函数 object_pick 返回一个新对象，该对象仅包含来自输入对象的指定键。
 */
function objectPick<T extends object, K extends keyof T>(obj: T, keys: K[]) {
  return keys.reduce((result, key) => {
    if (keyIn(key, obj)) {
      result[key] = obj[key];
    }
    return result;
  }, {} as Pick<T, K>);
}

export {
  objectPick,
  keyIn
};
