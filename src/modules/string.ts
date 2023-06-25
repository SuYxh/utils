/**
 * 生成指定位数的随机数，最大为16位数，最大随机数不超过 9007199254740991
 * @public
 * @param places - 随机数的位数
 * @returns 随机数
 * @example
 * ```ts
 * randomNumber(4) // 1998
 * ```
 */
function randomNumber(places: number) {
  if (!places) {
    places = 1
  }
  if (places < 1) {
    throw new Error('位数必须大于等于1');
  }
  if (places > 16) {
    throw new Error('最大只支持16位数, 最大数字为 9007199254740991')
  }
  let rnd = '';
  for (let i = 0; i < places; i++) {
    rnd += Math.floor(Math.random() * 10);
  }
  // 如果以0开头,但是可以生成数字 0
  if (rnd.startsWith('0') && places > 1) {
    rnd += Math.floor(Math.random() * 10);
    rnd = rnd.slice(1)
  }
  const max = '9007199254740991'
  return rnd > max ? Number(max) : Number(rnd)
}

/**
 * 随机生成一个自定义长度，不重复的字母加数字组合，可用来做id标识
 * @public
 * @param randomLength - 生成随机字符串的长度， 类型： number, 默认为 10
 * @returns 随机字符串，类型： string
 * @example
 * ```ts
 * randomId() // 28ybpe5skgys00
 * ```
 */
function randomId(randomLength = 10) {
  return  Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
}


/**
 * 生成的UUID遵循RFC4122版本4的规定
 * @public
 * @param len - 生成uuid的长度（选填）
 * @param radix - 基数（选填）
 * @returns 返回一个uuid 类型： string
 * @example
 * ```ts
 * uuid() // FF5F0575-CC3A-440A-85AF-AF884B71FA07
 * ```
 */
function uuid(len?: number, radix?:number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = []
  let i;
  radix = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    let r;

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

/**
 * 格式化金额
 * @public
 * @param amount - 需要格式化的金额
 * @param decimalDigits - 金额需要保留的小数位数
 * @returns 返回格式化后的金额
 * @example
 * ```ts
 * formatAmount(1234567890) // 1,234,567,890
 * formatAmount(1234567890, 2) // 1,234,567,890.00
 * ```
 */
function formatAmount(amount: number | string, decimalDigits = 0) {
  const amountStr = String(Number(amount).toFixed(decimalDigits))
  const reg = /\B(?=(?:\d{3})+$)/g
  // 是否是小数
  const isDecimal = amountStr.indexOf('.') > -1
  if (isDecimal) {
    // 整数部分
    const integerPart = amountStr.substring(0, amountStr.indexOf('.'))
    // 小数部分
    const decimalPart = amountStr.substring(amountStr.length, amountStr.indexOf('.'))
    return `${integerPart.replace(reg, ',')}${decimalPart}`
  } else {
    return amountStr.replace(reg, ',')
  }
}

/**
 * 手机号脱敏处理
 * @public
 * @param phnoeNum - 手机号
 * @returns 脱敏后的手机号
 * @example
 * ```ts
 * phoneDesensitization('18372635819') // 183****5819
 * ```
 */
function phoneDesensitization(phnoeNum: string) {
  return phnoeNum.replace(/(\d{3})(\d{4})(\d{4})/, (str, $1, $2, $3) => {
    return $1 + '****' + $3;
  })
}


export {
  randomNumber,
  randomId,
  uuid,
  formatAmount,
  phoneDesensitization
};