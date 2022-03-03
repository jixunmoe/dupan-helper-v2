/**
 * 将数字形式的文件大小转换为更可读的文本形式
 */
export default function readableSize(size: number) {
  let unit = "MiB";
  let sizeInUnit = size / 1024 / 1024;

  // 超过 GB
  if (sizeInUnit > 1024) {
    unit = "GiB";
    sizeInUnit /= 1024;
  }

  return `${sizeInUnit.toFixed(2)} ${unit}`;
}
