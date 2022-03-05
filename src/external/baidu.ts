import DelayedValue from "../utils/DelayedValue";

export interface BaiduExplorerFile {
  tkbind_id: number;
  owner_type: number;
  category: number;
  real_category: string;
  fs_id: number;
  oper_id: number;
  server_ctime: number;
  extent_tinyint7: number;
  wpfile: number;
  local_mtime: number;
  size: number;
  server_mtime: number;

  /**
   * 文件完整路径
   * @example
   * "/111/222.zip"
   */
  path: string;
  share: number;
  server_atime: number;
  pl: number;
  local_ctime: number;
  server_filename: string;
  md5: string;
  owner_id: number;
  unlist: number;
  isdir: number;
  formatName: string;
  formatCTime: string;
  formatTime: string;
  formatSize: string;
  thumbnail: string;
  categoryImage: string;
  categoryImageGrid: string;
  isWp: boolean;
}

export interface BaiduExplorerInstance {
  category: string;

  /**
   * 刷新当前目录下的文件列表
   */
  reloadList(): void;

  /**
   * 是否正在加载当前目录下的文件列表
   */
  loading: boolean;

  fileList: BaiduExplorerFile[];
}

export interface BaiduYunData {
  /**
   * 注意：这个是当前会话的 Token，不要滥用。
   */
  bdstoken: string;
  token: string;

  /**
   * 用户 ID
   */
  uk: number;

  /**
   * 是文档用户？
   */
  isdocuser: 0 | 1;

  /**
   * 初始化时的服务器时间戳
   */
  servertime: number;
}

export interface BaiduUserInfo {
  /**
   * VIP 等级
   */
  vipLevel: number;

  /**
   * VIP 类型
   */
  vipType: number;

  /**
   * 用户识别码
   */
  uk: number;

  /**
   * 登陆用户名 (显示名)
   */
  username: string;

  /**
   * 头像图片地址
   */
  avatar: string;

  /**
   * 当前会话令牌
   */
  bdstoken: string;

  /**
   * 是企业版用户
   */
  isCertUser: boolean;

  /**
   * 未使用；标记已经取消订阅的企业版用户？
   */
  isCancelCertUser: boolean;
}

export interface BaiduInnerContext {
  $http: import("axios").Axios;

  currentInstance: BaiduExplorerInstance;

  /**
   * 当前打开的文件夹目录
   */
  currentPath: string;

  userInfo: BaiduUserInfo;
  yunData: BaiduYunData;
}

export interface BaiduContext {
  ctx: BaiduInnerContext;
}

export enum BAIDU_GLOBALS_KEY {
  SOME_API_URLS = "a",
  ENTERPRISE_URLS = "b",
  ERROR_MESSAGES = "c",
}

export type WithUserContextFunction = (user: BaiduUserInfo) => string;

export interface BaiduGlobals {
  [BAIDU_GLOBALS_KEY.SOME_API_URLS]: Record<string, string | void>;
  [BAIDU_GLOBALS_KEY.ENTERPRISE_URLS]: Record<
    "MID_ENTEPRISE" | "MID_ENTEPRISEV2",
    string
  >;
  [BAIDU_GLOBALS_KEY.ERROR_MESSAGES]: Record<
    string | number,
    string | WithUserContextFunction | void
  >;
}

export const baiduContext = new DelayedValue<BaiduContext>();

export const baiduGlobals = new DelayedValue<BaiduGlobals>();
