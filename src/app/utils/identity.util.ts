import { GB2260 } from './identity.data'

/**
 * 获取身份信息
 * @param {string} idNo
 * @returns {{addrCode: string; dateOfBirth: string; gender: boolean}}
 */
export function extractInfo( idNo: string ) {
  const addrPart = idNo.substring(0, 6); // 前六位地址码
  const birthPart = idNo.substring(6, 14); // 八位生日
  const genderPart = parseInt(idNo.substring(14, 17), 10); // 性别
  return {
    addrCode: addrPart,
    dateOfBirth: birthPart,
    gender: genderPart%2 !== 0
  };
}

/**
 * 验证身份证地址合法性
 * @param {string} code
 * @returns {boolean}
 */
export function isValidAddr( code: string ): boolean {
  return GB2260[ code ] !== undefined;
}

/**
 * 获得地址信息
 * @param code
 * @returns {{province: any; city: (string | any | void); district: (string | any | void)}}
 */
export const getAddrByCode = ( code ) => {
  const provinceStr = GB2260[ code.substring(0, 2) + '0000' ]; //省
  const cityStr = GB2260[ code.substring(0, 4) + '00' ].replace(provinceStr, ''); //市
  const districtStr = GB2260[ code ].replace(provinceStr + cityStr, ''); //区

  return {
    province: provinceStr,
    city: cityStr,
    district: districtStr
  };
};