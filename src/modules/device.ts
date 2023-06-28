import { DeviceInfoType } from '../types/index';

/**
 * 是否是移动端
 * @public
 * @returns 返回boolean
 * @example
 * ```ts
 * isMobile() // true
 * ```
 */
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}


/**
 * 获取设备信息
 * @public
 * @returns 返回设备信息
 * @example
 * ```ts
 * getDeviceInfo() // {"version":"537.36","plat":"macintel","type":"chrome","pc":"pc","prefix":"webkit","isMobile":false}
 * ```
 */
function getDeviceInfo(): DeviceInfoType {
  const ua = navigator.userAgent.toLowerCase();
  let btypeInfo = (ua.match(/firefox|chrome|safari|opera/g) || 'other')[0];
  if ((ua.match(/msie|trident/g) || [])[0]) {
    btypeInfo = 'msie';
  }
  let pc = '';
  let prefix = '';
  let plat = '';
  //如果没有触摸事件 判定为PC
  const isTocuh = 'ontouchstart' in window || ua.indexOf('touch') !== -1 || ua.indexOf('mobile') !== -1;
  if (isTocuh) {
    if (ua.indexOf('ipad') !== -1) {
      pc = 'pad';
    } else if (ua.indexOf('mobile') !== -1) {
      pc = 'mobile';
    } else if (ua.indexOf('android') !== -1) {
      pc = 'androidPad';
    } else {
      pc = 'pc';
    }
  } else {
    pc = 'pc';
  }
  switch (btypeInfo) {
    case 'chrome':
    case 'safari':
    case 'mobile':
      prefix = 'webkit';
      break;
    case 'msie':
      prefix = 'ms';
      break;
    case 'firefox':
      prefix = 'Moz';
      break;
    case 'opera':
      prefix = 'O';
      break;
    default:
      prefix = 'webkit';
      break;
  }
  plat = ua.indexOf('android') > 0 ? 'android' : navigator.platform.toLowerCase();
  return {
    version: (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], //版本
    plat: plat, //系统
    type: btypeInfo, //浏览器
    pc: pc,
    prefix: prefix, //前缀
    isMobile: pc !== 'pc' //是否是移动端
  };
}


/**
 * 是否iPhone x 系列
 * @public
 * @returns 返回boolean
 * @example
 * ```ts
 * isiPhoneX() // true
 * ```
 */
function isiPhoneX() {
  const { width, height } = window.screen;
  const devicePixelRatio = window.devicePixelRatio;

  // Define the supported iPhone X series screen sizes
  const screenSizeConfig = [
    { width: 375, height: 812 },
    { width: 414, height: 896 }
    // Add more screen sizes for future iPhone X series devices if needed
  ];

  // Check if the current screen size matches any of the defined configurations
  return screenSizeConfig.some(({ width: configWidth, height: configHeight }) => {
    return (
      [2, 3].includes(devicePixelRatio) &&
      (width === configWidth && height === configHeight)
    );
  });
}


/**
 * 判断是否为微信浏览器环境
 * @public
 * @returns 返回boolean
 * @example
 * ```ts
 * isWeixin() // false
 * ```
 */
function isWeixin() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('micromessenger');
}


export {
  isMobile,
  getDeviceInfo,
  isWeixin,
  isiPhoneX
};
