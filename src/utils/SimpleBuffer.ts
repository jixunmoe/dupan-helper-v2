import { hex } from "./encoding";

const slice = Function.prototype.call.bind(Array.prototype.slice);

/**
 * 一个简单的类似于 NodeJS Buffer 的实现.
 * 用于解析游侠度娘提取码。
 */
export default class SimpleBuffer {
  buf: Uint8Array = new Uint8Array();

  constructor(str: string) {
    this.fromString(str);
  }

  fromString(str: string) {
    const len = str.length;

    this.buf = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      this.buf[i] = str.charCodeAt(i);
    }
  }

  readUnicode(index: number, size: number) {
    const bufText = slice(this.buf, index, index + size).map(hex);

    const buf = [""];
    for (let i = 0; i < size; i += 2) {
      buf.push(bufText[i + 1] + bufText[i]);
    }

    return JSON.parse(`"${buf.join("\\u")}"`);
  }

  /**
   * Read a number (Big Endian) from buffer.
   * @param index Index
   * @param size Integer size
   * @returns {number} an integer representing the value at given index
   */
  readNumber(index: number, size: number) {
    let ret = 0;

    for (let i = index + size; i > index; i--) {
      // 2^8 = 256
      ret = this.buf[i] + ret * 256;
    }

    return ret;
  }

  readUInt(index: number) {
    return this.readNumber(index, 4);
  }

  readULong(index: number) {
    return this.readNumber(index, 8);
  }

  readHex(index: number, size: number) {
    const blob = slice(this.buf, index, index + size);
    return blob.map(hex).join("");
  }
}
