import { BaiduContext, baiduContext, BaiduYunData } from "../external/baidu";
import { scrambleMD5 } from "../utils/baiduMD5Scramble";
import { RapidUploadResp, RAPID_UPLOAD_REPLACE } from "./rapidupload";

const URL_RAPID_UPLOAD = "/api/rapidupload";

const DAYS_IN_SECONDS = 86400;
const DAYS_90 = DAYS_IN_SECONDS * 90;
const DAYS_180 = DAYS_IN_SECONDS * 180;
const rand = (a: number, b: number) => (b - a) * Math.random();
const generateMTime = () => (Date.now() / 1000 - rand(DAYS_90, DAYS_180)) | 0;

interface RapidUploadOptions {
  name: string;
  size: number;
  contentMD5: string;
  sliceMD5: string;
  replaceType: RAPID_UPLOAD_REPLACE;
}

export class BaiduUploadAPI {
  baidu?: BaiduContext;

  constructor() {
    baiduContext.get((baidu) => {
      this.baidu = baidu;
    });
  }

  async rapidUpload(opt: RapidUploadOptions): Promise<RapidUploadResp> {
    if (!this.baidu) {
      return Promise.reject("Baidu Context 尚未初始化");
    }

    const { ctx } = this.baidu;
    const { replaceType, name, sliceMD5, contentMD5, size } = opt;
    const { bdstoken } = ctx.yunData;
    const dirPath = ctx.currentPath;
    const fullPath = dirPath + "/" + name;

    return ctx.$http.request({
      url: `${URL_RAPID_UPLOAD}?rtype=${replaceType}&bdstoken=${bdstoken}`,
      method: "POST",
      data: {
        path: fullPath,
        "content-length": size,
        "content-md5": scrambleMD5(contentMD5),
        "slice-md5": scrambleMD5(sliceMD5),
        target_path: dirPath,
        local_mtime: generateMTime(),
      },
    });
  }
}

const baiduUploadAPI = new BaiduUploadAPI();
export default baiduUploadAPI;
