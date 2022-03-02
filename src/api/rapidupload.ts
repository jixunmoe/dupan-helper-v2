export interface RapidUploadResp {
  errno: number;
  request_id: number;

  info: {
    md5: string;
    category: number;
    fs_id: number;
    request_id: number;
    from_type: number;
    size: number;
    isdir: number;
    mtime: number;
    ctime: number;
    path: string;
  };
}

export enum RAPID_UPLOAD_REPLACE {
  FAILURE = 0,
  DUPLICATE = 1,
  // UNKNOWN_REPLACE_RULE = 2,
  REPLACE = 3,
}
