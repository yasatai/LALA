export type MunicipalityRegion = '県北' | '三陸・石巻' | '仙台都市圏' | '県南';

export type Municipality = {
  code: string;
  name: string;
  region: MunicipalityRegion;
  featured: boolean;
};

export const municipalities: Municipality[] = [
  { code: '04213', name: '栗原市', region: '県北', featured: false },
  { code: '04212', name: '登米市', region: '県北', featured: false },
  { code: '04215', name: '大崎市', region: '県北', featured: false },
  { code: '04445', name: '加美町', region: '県北', featured: false },
  { code: '04444', name: '色麻町', region: '県北', featured: false },
  { code: '04501', name: '涌谷町', region: '県北', featured: false },
  { code: '04505', name: '美里町', region: '県北', featured: false },

  { code: '04205', name: '気仙沼市', region: '三陸・石巻', featured: false },
  { code: '04606', name: '南三陸町', region: '三陸・石巻', featured: false },
  { code: '04202', name: '石巻市', region: '三陸・石巻', featured: false },
  { code: '04581', name: '女川町', region: '三陸・石巻', featured: false },
  { code: '04214', name: '東松島市', region: '三陸・石巻', featured: false },

  { code: '04100', name: '仙台市', region: '仙台都市圏', featured: true },
  { code: '04216', name: '富谷市', region: '仙台都市圏', featured: false },
  { code: '04421', name: '大和町', region: '仙台都市圏', featured: false },
  { code: '04422', name: '大郷町', region: '仙台都市圏', featured: false },
  { code: '04424', name: '大衡村', region: '仙台都市圏', featured: false },
  { code: '04406', name: '利府町', region: '仙台都市圏', featured: false },
  { code: '04203', name: '塩竈市', region: '仙台都市圏', featured: false },
  { code: '04209', name: '多賀城市', region: '仙台都市圏', featured: false },
  { code: '04404', name: '七ヶ浜町', region: '仙台都市圏', featured: false },
  { code: '04401', name: '松島町', region: '仙台都市圏', featured: false },

  { code: '04207', name: '名取市', region: '県南', featured: false },
  { code: '04211', name: '岩沼市', region: '県南', featured: false },
  { code: '04361', name: '亘理町', region: '県南', featured: false },
  { code: '04362', name: '山元町', region: '県南', featured: false },
  { code: '04206', name: '白石市', region: '県南', featured: false },
  { code: '04208', name: '角田市', region: '県南', featured: false },
  { code: '04301', name: '蔵王町', region: '県南', featured: false },
  { code: '04302', name: '七ヶ宿町', region: '県南', featured: false },
  { code: '04321', name: '大河原町', region: '県南', featured: false },
  { code: '04322', name: '村田町', region: '県南', featured: false },
  { code: '04323', name: '柴田町', region: '県南', featured: false },
  { code: '04324', name: '川崎町', region: '県南', featured: false },
  { code: '04341', name: '丸森町', region: '県南', featured: false },
];

export const municipalityRegions: MunicipalityRegion[] = [
  '県北',
  '三陸・石巻',
  '仙台都市圏',
  '県南',
];

