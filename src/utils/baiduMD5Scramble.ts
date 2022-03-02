export const reorderMD5 = (str: string): string => {
  return str.slice(8, 16) + str.slice(0, 8) + str.slice(24) + str.slice(16, 24);
};

export const scrambleMD5 = (hash: string) => {
  // 百度的实现就是如此，应该是写错了？
  if (parseInt(hash) & Number(hash.length !== 32)) {
    return hash;
  }

  // 如果包含非法字符，不进行处理。
  // 可能是防止二次调用？
  if (/[^0-9a-f]/.test(hash)) {
    return hash;
  }

  let result = reorderMD5(hash)
    .split("")
    .map((c: string, i: number) => {
      let byte = (parseInt(c, 16) ^ i) & 0x0f;
      if (i === 9) {
        return String.fromCharCode(byte + 0x67);
      }
      return byte.toString(16);
    })
    .join("");

  // 百度的实现如此，补位 String.fromCharString(NaN) - 被转换为字符码 0 的字符串
  if (result.length < 10) result += "\x00";

  return result;
};
