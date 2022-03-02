import test from "ava";
import { scrambleMD5 } from "../baiduMD5Scramble";

const testCases = [
  ["", "\x00"],
  ["1", "1"],
  ["2", "2\x00"],
  ["1234567890", "91317131fh"],
  ["1234567890abcdef", "918888889r9f9b97"],
  ["7bf84128b43eb424dea6f10e1cf8f08e", "b51df143fi538cc71ddbb5e9570d3ce1"],
  ["055a1eb081998cf1ab8bf87f9eed88f2", "80bac9968sf1d35f9fcecd9522203590"],
  ["8ee643c4912b67abfd25693db7a7417c", "900822cc0n4d8e2bb684041b748ea4d2"],
  ["eb767987bbf707fbc8b29b19a35623c1", "bad4429c6iddb468a27566a6411956f6"],
  ["455a326dfd11f448080d0bd0f5f3f4d3", "fc32b12fcsf1ff82f4d0b1b481a6c63f"],
  ["a639edfcfe3e0b211780d47c3baf3ce9", "ff1d4e462v9220133a8c798e9e2b1993"],
];

for (const [from, to] of testCases) {
  test(`#scrambleMD5 "${from}" -> ${JSON.stringify(to)}`, (t) => {
    t.is(to, scrambleMD5(from));
  });
}
