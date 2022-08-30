/**
 * This is my first keyword
 * @param {number} numberValue This is a number parameter.
 * @param {string} stringValue This is a string parameter.
 * @param {'a' | 'b' | 'c'} enumValue This is a enum parameter.
 */
export function myFirstKeyword(numberValue, stringValue, enumValue) {
  console.log("> My First Keyword:", numberValue, stringValue, enumValue);
}

/**
 * This is my second keyword
 * @param {?number} numberValue This is a number parameter.
 * @param {!string} stringValue This is a string parameter.
 * @param {'a' | 'b' | 'c'} enumValue This is a enum parameter.
 */
export function mySecondKeyword(numberValue, stringValue, enumValue) {
  console.log("> My First Keyword:", numberValue, stringValue, enumValue);
}
