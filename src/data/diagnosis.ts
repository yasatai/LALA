import type { AgeKey, AgeOption, DiagnosisResult } from '../types';

export const ageOptions: AgeOption[] = [
  { key: '~3', label: '〜3年' },
  { key: '4-7', label: '4〜7年' },
  { key: '8-12', label: '8〜12年' },
  { key: '13+', label: '13年以上' },
  { key: '?', label: 'わからない' },
];

export const ageMap: Record<AgeKey, DiagnosisResult> = {
  '~3': {
    lvl: 1,
    title: 'まだ安心。相談はほぼ不要です',
    msg: '塗膜はまだ十分に機能している時期です。定期的にセルフチェックをしながら、きれいな状態を長く保ちましょう。',
  },
  '4-7': {
    lvl: 2,
    title: 'そろそろ一度ご相談を',
    msg: '小さな色あせや汚れが出はじめる時期です。今のうちにプロの目で状態を確認しておくと、将来の費用を抑えやすくなります。',
  },
  '8-12': {
    lvl: 3,
    title: '早めのご相談がおすすめです',
    msg: '塗り替え検討の目安となる時期です。劣化が進む前に診断を受けることで、傷みの拡大と費用の増加を防ぎやすくなります。',
  },
  '13+': {
    lvl: 3,
    title: 'お早めにご相談ください',
    msg: '塗り替え時期に達している可能性が高い状態です。まずは無料診断で現状を把握し、必要な工事を見極めましょう。',
  },
  '?': {
    lvl: 0,
    title: 'まずは無料診断から',
    msg: '築年数が分からなくても大丈夫です。プロが建物の状態を確認し、塗り替えに適したタイミングをご提案します。',
  },
};

export const segLabels = ['安心', '要相談', 'お早めに'] as const;
