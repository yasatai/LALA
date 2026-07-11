export interface CaseItem {
  before: string;
  after: string;
  label: string;
  no: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

/** Diagnosis level: 0 = unknown, 1 = safe, 2 = consider, 3 = soon */
export type DiagnosisLevel = 0 | 1 | 2 | 3;

export type AgeKey = '~3' | '4-7' | '8-12' | '13+' | '?';

export interface AgeOption {
  key: AgeKey;
  label: string;
}

export interface DiagnosisResult {
  lvl: DiagnosisLevel;
  title: string;
  msg: string;
}

export type PlaceKey = '屋根塗装' | '外壁塗装' | '屋根＋外壁';
