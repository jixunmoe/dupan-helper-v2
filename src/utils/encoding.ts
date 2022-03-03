export const hex = (value: number): string => {
  const hex = Math.floor(value).toString(16);
  return `0${hex}`.slice(-2);
};

/**
 * UTF-8 字符转换成 base64 后在 JS 里解析会出毛病。
 * 这个转换会进行一些特别的纠正。
 */
export const decodeBase64 = (str: string): string => {
  try {
    str = atob(str);
  } catch (e) {
    console.error("base64 decode failed: %s", str);
    return "";
  }
  return decodeURIComponent(
    str.replace(/[^\x00-\x7F]/g, (z) => `%${hex(z.charCodeAt(0))}`)
  );
};
