import { baiduContext, BaiduYunData } from "../external/baidu";

const URL_RAPID_UPLOAD = "/api/rapidupload";

const reorderMD5 = (str: string): string => {
  return str.slice(8, 16) + str.slice(0, 8) + str.slice(24) + str.slice(16, 24);
};

interface RapidUploadOptions {
  yunData: BaiduYunData;

  file?: {
    server_path: string;
  };

  path: string;
  size: number;
  contentMD5: string;
  sliceMD5: string;
  target_path: string;
}

export class BaiduUploadAPI {
  async rapidUpload(
    opts: RapidUploadOptions,
    query: string
  ): Promise<RapidUploadResp> {
    const { ctx } = await baiduContext.get();

    let url = URL_RAPID_UPLOAD;
    if (query) {
      url += `?${query}&bdstoken=${opts.yunData.bdstoken}`;
    }

    const data = {
      path: opts.path,
      "content-length": opts.size,
      "content-md5": this.scrambleMD5(opts.contentMD5),
      "slice-md5": this.scrambleMD5(opts.sliceMD5),
      target_path: opts?.file?.server_path,
    };

    return ctx.$http.request({
      url: url,
      method: "POST",
      data: data,
    });
  }

  scrambleMD5(hash: string) {
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
  }
}

export default new BaiduUploadAPI();
