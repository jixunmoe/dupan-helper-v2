import { RAPID_UPLOAD_REPLACE } from "../api/rapidupload";
import baiduUploadAPI from "../api/upload";
import { bus } from "../EventBus";
import { baiduContext } from "../external/baidu";
import { DuParseEntry } from "../utils/DuParser";

// TODO: 在 UI 展示进度
bus.on("add_rapid_upload", async (items: DuParseEntry[]) => {
  for (const { md5, md5s, name, size } of items) {
    const resp = await baiduUploadAPI.rapidUpload({
      contentMD5: md5,
      sliceMD5: md5s,
      name,
      size,
      replaceType: RAPID_UPLOAD_REPLACE.DUPLICATE,
    });

    console.info("upload result: %o", resp);
  }

  // 刷新所在目录
  const ctx = await baiduContext.getAsync();
  ctx.ctx.currentInstance.reloadList();
});
