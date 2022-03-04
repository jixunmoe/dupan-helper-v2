import { RAPID_UPLOAD_REPLACE } from "../api/rapidupload";
import baiduUploadAPI from "../api/upload";
import { EVENTS } from "../constants";
import { bus } from "../EventBus";
import { baiduContext } from "../external/baidu";
import { DuParseEntry } from "../utils/DuParser";

bus.on(
  EVENTS.ADD_RAPID_UPLOAD_TASKS,
  async (items: DuParseEntry[], replaceType: RAPID_UPLOAD_REPLACE) => {
    const count = items.length;
    for (const [i, { md5, md5s, name, size }] of items.entries()) {
      const resp = await baiduUploadAPI.rapidUpload({
        contentMD5: md5,
        sliceMD5: md5s,
        name,
        size,
        replaceType,
      });
      bus.emit(EVENTS.UPDATE_RAPID_UPLOAD_STATUS, i, count, resp);
    }

    // 刷新所在目录
    const ctx = await baiduContext.getAsync();
    ctx.ctx.currentInstance.reloadList();
  }
);
