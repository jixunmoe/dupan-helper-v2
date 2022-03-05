import { RapidUploadResp, RAPID_UPLOAD_REPLACE } from "../api/rapidupload";
import baiduUploadAPI from "../api/upload";
import { EVENTS } from "../constants";
import { bus } from "../EventBus";
import { baiduContext } from "../external/baidu";
import { DuParseEntry } from "../utils/DuParser";

type AddRapidUploadTask$UpdateProgress = (
  entry: DuParseEntry,
  resp: RapidUploadResp
) => void;

bus.on(
  EVENTS.ADD_RAPID_UPLOAD_TASKS,
  async (
    items: DuParseEntry[],
    replaceType: RAPID_UPLOAD_REPLACE,
    updateProgress: AddRapidUploadTask$UpdateProgress
  ) => {
    for (const item of items) {
      const { md5, md5s, name, size } = item;
      const resp = await baiduUploadAPI.rapidUpload({
        contentMD5: md5,
        sliceMD5: md5s,
        name,
        size,
        replaceType,
      });
      updateProgress(item, resp);
    }

    // 刷新所在目录
    const ctx = await baiduContext.getAsync();
    ctx.ctx.currentInstance.reloadList();
  }
);
