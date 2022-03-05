import { RapidUploadResp } from "../api/rapidupload";
import { DuParseEntry } from "../utils/DuParser";

export interface VueUploadResult extends RapidUploadResp, DuParseEntry {
  result: string;
  resultType: "success" | "danger";
}
