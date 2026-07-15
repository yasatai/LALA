export const company = {
  name: 'LALA',
  legalName: 'ララ株式会社',
  tagline: '宮城・仙台の暮らしに寄り添うリフォーム専門店',
  // TODO: 正式情報へ差し替え
  phone: '0120-189-269',
  // TODO: 正式情報へ差し替え
  hours: '受付 9:00-17:00',
  // TODO: 正式情報へ差し替え
  address: '〒982-0012　宮城県仙台市太白区長町南4丁目12-16',
  instagram: '@lala_reform',
};

export const navigation = [
  { href: '/works', label: '施工イメージ' },
  { href: '/services', label: 'サービス' },
  { href: '/company', label: '会社概要' },
  { href: '/voices', label: 'お客様の声' },
];

export const promises = [
  {
    number: '01',
    title: '丁寧なヒアリング',
    descriptionLines: ['ご家族の想いや暮らし方を丁寧に伺い', '最適なプランをご提案します。'],
  },
  {
    number: '02',
    title: '確かな品質と施工',
    descriptionLines: ['経験豊富な職人が細かな部分まで', '品質を確かめて施工します。'],
  },
  {
    number: '03',
    title: 'ずっと安心のサポート',
    descriptionLines: ['工事後も安心して暮らせるよう', '点検と相談体制を続けます。'],
  },
];

type ServiceSummary = {
  number: string;
  title: string;
  descriptionLines: readonly [string, string];
  image: string;
};

export const services = [
  {
    number: '01',
    title: '塗装工事',
    descriptionLines: ['外壁・屋根の塗装で', '住まいの美しさと耐久性を守ります。'],
    image: '/images/service-painting.webp',
  },
  {
    number: '02',
    title: '外装工事',
    descriptionLines: ['屋根・外壁・雨樋など', '建物の外まわりを整えます。'],
    image: '/images/service-exterior.webp',
  },
  {
    number: '03',
    title: '内装・水まわり工事',
    descriptionLines: ['水まわりから床・壁・天井まで', '暮らしに合わせて空間を一新。'],
    image: '/images/service-interior.webp',
  },
  {
    number: '04',
    title: '足場・解体',
    descriptionLines: ['安全な足場設置から解体まで', '工事の土台を支えます。'],
    image: '/images/service-scaffold-demolition.webp',
  },
  {
    number: '05',
    title: '床下工事・駆除',
    descriptionLines: ['床下環境を確認し', '湿気・害虫対策や必要な補修を行います。'],
    image: '/images/service-underfloor.webp',
  },
  {
    number: '06',
    title: '店舗・アパート工事',
    descriptionLines: ['店舗や集合住宅の改修を', '用途と運営に合わせてご提案します。'],
    image: '/images/service-shop-apartment.webp',
  },
] satisfies ServiceSummary[];

export const serviceDetails = [
  {
    number: '01',
    title: '塗装工事',
    image: '/images/service-painting.webp',
    items: ['スレート屋根', 'トタン屋根', 'ガルバリウム屋根', 'セメント瓦', '雨樋、軒樋', '破風板、軒天', '窯業系サイディング', '金属サイディング', 'モルタル外壁', 'ALC外壁'],
    text: '屋根塗装・外壁塗装をはじめ、付帯物、木部塗装など幅広くご対応いたします。コーキングや高圧洗浄も含めて完全自社施工の「高品質・安心価格」にてハイクオリティな塗装工事をご提供いたします。',
  },
  {
    number: '02',
    title: '外装工事',
    image: '/images/service-exterior.webp',
    items: ['屋根葺き替え', '瓦工事', '玄関', 'サッシ交換', '雨樋交換、一部補修', 'カーポート設置', '外構フェンス工事', '土間工事', '太陽光発電', '下水工事', '各種エクステリア'],
    text: '屋根の葺き替え・瓦の補修工事からカーポート・フェンス設置など、各種エクステリア工事を含む屋外の工事。基礎・外構工事も含めて完全自社施工の「高品質・安心価格」にてご対応いたします。',
  },
  {
    number: '03',
    title: '内装・水まわり工事',
    image: '/images/service-interior.webp',
    items: ['浴室工事', 'キッチン工事', 'トイレ工事', '洗面台工事', 'エコキュート', '給湯設備機器', 'クロス貼り替え', 'エコカラット', 'フローリング', '畳貼り替え', '襖貼り替え'],
    text: '浴室・キッチン・トイレ・洗面台などの水まわりから、クロス・床・畳・襖まで、現代のライフスタイルとお客様のニーズに合わせて完全自社施工の「高品質・安心価格」にてご対応いたします。',
  },
  {
    number: '04',
    title: '足場・解体',
    image: '/images/service-scaffold-demolition.webp',
    items: ['足場設置、解体', '建物解体工事'],
    text: '安全な工事を行うための足場設置。不要になった建物の解体まで完全自社施工の「高品質・安心価格」にてご対応いたします。',
  },
  {
    number: '05',
    title: '床下工事・駆除',
    image: '/images/service-underfloor.webp',
    items: ['床下防蟻処理', '景竹炭', '蟻駆除', '害虫駆除'],
    text: '湿気の問題やシロアリなどにお困りの場合は現状を確認した上で、どのような処置が必要かをお客様と相談し、迅速に対応いたします。',
  },
  {
    number: '06',
    title: '店舗・アパート工事',
    image: '/images/service-shop-apartment.webp',
    items: ['外壁塗装', '外壁貼り替え', '内外装補修', 'クロス貼り替え', '基礎補修', '水まわり全般'],
    text: '店舗のリニューアル改装、アパートのリフォーム、外壁塗装・基礎工事・内装工事等、全てLALAにお任せ！ お客様のご要望を伺って完全自社施工の「高品質・安心価格」にて対応いたします。',
  },
];

export const works = [
  {
    title: 'トイレリフォーム', area: '', period: '',
    before: '/images/works-gallery/20-1.webp', after: '/images/works-gallery/20-2.webp',
    text: 'トイレ本体と内装、収納を整えた施工例です。',
  },
  {
    title: '洗面・ランドリーリフォーム', area: '', period: '',
    before: '/images/works-gallery/17-1.webp', after: '/images/works-gallery/18-2.webp',
    text: '洗面台とランドリースペースを一体的に整えた施工例です。',
  },
  {
    title: '洗面台リフォーム', area: '', period: '',
    before: '/images/works-gallery/16-1.webp', after: '/images/works-gallery/16-2.webp',
    text: '収納力と清掃性を高めた洗面台交換の施工例です。',
  },
  {
    title: 'LDK・キッチンリフォーム', area: '', period: '',
    before: '/images/works-gallery/15-1.webp', after: '/images/works-gallery/15-2.webp',
    text: 'キッチンの配置と空間全体を見直した施工例です。',
  },
  {
    title: 'キッチンリフォーム', area: '', period: '',
    before: '/images/works-gallery/14-1.webp', after: '/images/works-gallery/14-2.webp',
    text: '壁面と収納を含め、明るく使いやすく整えた施工例です。',
  },
  {
    title: 'キッチン交換', area: '', period: '',
    before: '/images/works-gallery/13-1.webp', after: '/images/works-gallery/13-2.webp',
    text: '既存のレイアウトを活かして設備を更新した施工例です。',
  },
  {
    title: '玄関まわりリフォーム', area: '', period: '',
    before: '/images/works-gallery/12-1.webp', after: '/images/works-gallery/12-2.webp',
    text: '玄関ドアとアプローチまわりを明るく整えた施工例です。',
  },
  {
    title: '玄関ドア交換', area: '', period: '',
    before: '/images/works-gallery/10-1.webp', after: '/images/works-gallery/10-2.webp',
    text: '住まいの印象を変える玄関ドア交換の施工例です。',
  },
  {
    title: 'トタン屋根塗装', area: '', period: '',
    before: '/images/works-gallery/09-1.webp', after: '/images/works-gallery/09-2.webp',
    text: '傷みの見られた金属屋根を保護し、美しく仕上げた施工例です。',
  },
  {
    title: 'スレート屋根塗装', area: '', period: '',
    before: '/images/works-gallery/07-1.webp', after: '/images/works-gallery/07-2.webp',
    text: '屋根全体を塗り替え、住まいを保護した施工例です。',
  },
  {
    title: 'アパート外装リフォーム', area: '', period: '',
    before: '/images/works-gallery/05-1.webp', after: '/images/works-gallery/05-2.webp',
    text: '建物全体の外観を整えたアパート外装の施工例です。',
  },
  {
    title: '平屋住宅の外装塗装', area: '', period: '',
    before: '/images/works-gallery/04-1.webp', after: '/images/works-gallery/04-2.webp',
    text: '外壁と付帯部を塗り替え、明るく整えた施工例です。',
  },
  {
    title: '戸建て外装塗装 A', area: '', period: '',
    before: '/images/works-gallery/02-1.webp', after: '/images/works-gallery/02-2.webp',
    text: '外壁と付帯部の色調を整えた戸建て住宅の施工例です。',
  },
  {
    title: '戸建て外装塗装 B', area: '', period: '',
    before: '/images/works-gallery/01-1.webp', after: '/images/works-gallery/01-2.webp',
    text: '外壁の状態を整え、明るい印象へ仕上げた施工例です。',
  },
  {
    title: '戸建て外装塗装 C', area: '', period: '',
    before: '/images/works-gallery/03-1.webp', after: '/images/works-gallery/03-2.webp',
    text: '屋根と外壁を含めて住まい全体を整えた施工例です。',
  },
];

export const homeWorks = [
  {
    title: '屋根塗装',
    area: '',
    period: '',
    before: '/images/works-lala/works-01-roof-before.webp',
    after: '/images/works-lala/works-01-roof-after.webp',
  },
  {
    title: 'トタン屋根塗装',
    area: '',
    period: '',
    before: '/images/works-lala/works-02-metal-roof-before.webp',
    after: '/images/works-lala/works-02-metal-roof-after.webp',
  },
  {
    title: '玄関まわり改修',
    area: '',
    period: '',
    before: '/images/works-lala/works-03-entrance-before.webp',
    after: '/images/works-lala/works-03-entrance-after.webp',
  },
  {
    title: '玄関ドア交換',
    area: '',
    period: '',
    before: '/images/works-lala/works-04-door-before.webp',
    after: '/images/works-lala/works-04-door-after.webp',
  },
  {
    title: 'キッチン改修',
    area: '',
    period: '',
    before: '/images/works-lala/works-05-kitchen-before.webp',
    after: '/images/works-lala/works-05-kitchen-after.webp',
  },
  {
    title: 'LDK・キッチン改修',
    area: '',
    period: '',
    before: '/images/works-lala/works-06-ldk-before.webp',
    after: '/images/works-lala/works-06-ldk-after.webp',
  },
  {
    title: '洗面台交換',
    area: '',
    period: '',
    before: '/images/works-lala/works-07-washstand-before.webp',
    after: '/images/works-lala/works-07-washstand-after.webp',
  },
  {
    title: '洗面・ランドリー改修',
    area: '',
    period: '',
    before: '/images/works-lala/works-08-laundry-before.webp',
    after: '/images/works-lala/works-08-laundry-after.webp',
  },
];

export const qualities = [
  ['01', '自社施工', '担当者と職人が連携し、現場の判断を早く正確に。'],
  ['02', '品質管理', '工程ごとに写真とチェック項目を残し、仕上がりを確認。'],
  ['03', '安心保証', '工事内容に応じた保証と、完了後の相談窓口を用意。'],
  ['04', '素材選定', '木材、左官、石材など質感のある素材を適材適所に。'],
  ['05', 'アフターサポート', '暮らし始めてからの小さな違和感にも対応します。'],
];

export const voices = [
  {
    quote: '家族の時間が増えました',
    name: '仙台市青葉区 S様',
    detail: 'キッチン・リビング改修',
    image: '/images/voice-1.webp',
    text: '毎日の使いやすさまで考えてくださり職人さんの説明も丁寧でした。',
  },
  {
    quote: '相談しやすくて安心でした',
    name: '仙台市泉区 M様',
    detail: '外壁・屋根',
    image: '/images/voice-2.webp',
    text: '初めてのリフォームでしたが段階ごとに説明があり安心できました。',
  },
  {
    quote: '仕上がりに大満足です。',
    name: '多賀城市 T様',
    detail: '浴室・洗面',
    image: '/images/voice-3.webp',
    text: '細かな要望にも応えていただき毎日の暮らしが快適になりました。',
  },
  {
    quote: '説明が分かりやすく安心でした',
    name: '仙台市太白区 K様',
    detail: '外壁・屋根塗装',
    image: '/images/voices-hero-consultation.webp',
    text: '工事内容や費用を丁寧に説明してくださり納得してお願いできました。',
  },
];

export const voiceStories = [
  {
    number: '01',
    title: '外壁塗装',
    age: '40代',
    area: '仙台市太白区',
    service: '外壁塗装',
    concern: '外壁の色あせと雨だれが目立ってきた',
    reason: '外壁だけでなく屋根や雨樋もまとめて見てもらえたため',
    impression: '家全体が明るくなり、近所からもきれいになったと言われました。色の相談にも丁寧に乗ってもらえて安心でした。',
  },
  {
    number: '02',
    title: '屋根塗装',
    age: '50代',
    area: '仙台市青葉区',
    service: '屋根塗装',
    concern: '屋根の色あせとサビが気になっていた',
    reason: '現地確認で状態を詳しく説明してくれたため',
    impression: '見えにくい場所なので不安でしたが、写真で施工前後を確認できて納得できました。雨漏りの心配も減りました。',
  },
  {
    number: '03',
    title: 'お風呂リフォーム',
    age: '60代',
    area: '名取市',
    service: '浴室リフォーム',
    concern: '冬場のお風呂が寒く、タイルの掃除も大変だった',
    reason: '水まわりも対応できると知ったため',
    impression: '浴室が明るくなり、寒さもかなり楽になりました。掃除もしやすくなって、毎日使う場所を直してよかったです。',
  },
  {
    number: '04',
    title: 'キッチンリフォーム',
    age: '50代',
    area: '仙台市泉区',
    service: 'キッチンリフォーム',
    concern: '収納が少なく、古くて使いにくかった',
    reason: '予算に合わせた提案をしてくれたため',
    impression: '作業スペースが広くなり、片付けもしやすくなりました。見た目も明るくなって、料理をする気分が変わりました。',
  },
  {
    number: '05',
    title: 'トイレリフォーム',
    age: '70代',
    area: '仙台市若林区',
    service: 'トイレ交換・内装',
    concern: '古いトイレで掃除がしにくく、床の汚れも気になっていた',
    reason: '小さな工事でも相談できると聞いたため',
    impression: '短い期間で清潔な空間になり、とても助かりました。手すりの相談もできて安心でした。',
  },
  {
    number: '06',
    title: '玄関ドア交換',
    age: '60代',
    area: '多賀城市',
    service: '玄関ドア交換',
    concern: '玄関が暗く、古い印象になっていた',
    reason: '外装工事とあわせて相談できたため',
    impression: '玄関まわりの印象が大きく変わりました。家に帰ったときの雰囲気が明るくなり、交換してよかったです。',
  },
  {
    number: '07',
    title: 'クロス・内装リフォーム',
    age: '30代',
    area: '仙台市宮城野区',
    service: 'クロス貼り替え・床リフォーム',
    concern: '部屋全体が古く見え、子どもの傷や汚れも気になっていた',
    reason: '内装全体をまとめて相談できたため',
    impression: '部屋が明るくなり、家具を置く前から印象が変わりました。壁紙の色も提案してもらえて助かりました。',
  },
  {
    number: '08',
    title: '外構・カーポート',
    age: '40代',
    area: '岩沼市',
    service: 'カーポート設置・土間工事',
    concern: '雨の日の乗り降りが不便で、駐車場の水たまりも気になっていた',
    reason: '外構工事も対応していたため',
    impression: '駐車場が使いやすくなり、見た目もすっきりしました。雨の日のストレスが減ったのが一番よかったです。',
  },
  {
    number: '09',
    title: '店舗内装',
    age: '50代',
    area: '仙台市青葉区',
    service: '店舗内装リフォーム',
    concern: '店内が古く見え、新規のお客様に入りにくい印象があった',
    reason: '店舗工事も対応できると知ったため',
    impression: '内装が明るくなり、お客様からも雰囲気が良くなったと言われました。営業しながらの段取りも相談できて助かりました。',
  },
  {
    number: '10',
    title: 'アパート原状回復',
    age: '60代',
    area: '仙台市太白区',
    service: 'アパートの内装・水まわり補修',
    concern: '退去後の部屋が古く、次の入居に向けて整えたかった',
    reason: '内装、水まわり、外装までまとめて相談できるため',
    impression: '部屋全体がきれいになり、募集用の写真も撮りやすくなりました。必要な工事を整理して提案してもらえたのがよかったです。',
  },
];

export const flow = [
  'お問い合わせ',
  'ヒアリング',
  '現地調査',
  'プラン・お見積もり',
  'ご契約',
  '施工',
  'お引き渡し',
];
