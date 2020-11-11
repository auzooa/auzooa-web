// @ts-ignore
const m = [
  -680876936,
  -389564586,
  606105819,
  -1044525330,
  -176418897,
  1200080426,
  -1473231341,
  -45705983,
  1770035416,
  -1958414417,
  -42063,
  -1990404162,
  1804603682,
  -40341101,
  -1502002290,
  1236535329,
  -165796510,
  -1069501632,
  643717713,
  -373897302,
  -701558691,
  38016083,
  -660478335,
  -405537848,
  568446438,
  -1019803690,
  -187363961,
  1163531501,
  -1444681467,
  -51403784,
  1735328473,
  -1926607734,
  -378558,
  -2022574463,
  1839030562,
  -35309556,
  -1530992060,
  1272893353,
  -155497632,
  -1094730640,
  681279174,
  -358537222,
  -722521979,
  76029189,
  -640364487,
  -421815835,
  530742520,
  -995338651,
  -198630844,
  1126891415,
  -1416354905,
  -57434055,
  1700485571,
  -1894986606,
  -1051523,
  -2054922799,
  1873313359,
  -30611744,
  -1560198380,
  1309151649,
  -145523070,
  -1120210379,
  718787259,
  -343485551
]
const md5 = function (c: any) {
  var e,
    g,
    f,
    a,
    h: any[] = []
  c = unescape(encodeURI(c))
  for (var b = c.length, k = [(e = 1732584193), (g = -271733879), ~e, ~g], d = 0; d <= b; )
    h[d >> 2] |= (c.charCodeAt(d) || 128) << (8 * (d++ % 4))
  h[(c = 16 * ((b + 8) >> 6) + 14)] = 8 * b
  for (d = 0; d < c; d += 16) {
    b = k
    for (a = 0; 64 > a; )
      b = [
        (f = b[3]),
        (e = b[1] | 0) +
          (((f =
            b[0] +
            [(e & (g = b[2])) | (~e & f), (f & e) | (~f & g), e ^ g ^ f, g ^ (e | ~f)][
              (b = a >> 4)
            ] +
            (m[a] + (h[([a, 5 * a + 1, 3 * a + 5, 7 * a][b] % 16) + d] | 0))) <<
            (b = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * b + (a++ % 4)])) |
            (f >>> (32 - b))),
        e,
        g
      ]
    for (a = 4; a; ) k[--a] = k[a] + b[a]
  }
  // @ts-ignore
  for (c = ''; 32 > a; ) c += ((k[a >> 3] >> (4 * (1 ^ (a++ & 7)))) & 15).toString(16)
  return c
} // eslint-disable-line

export const createHash = md5