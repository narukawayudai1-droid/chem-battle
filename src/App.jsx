import { useState, useEffect, useRef } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// ── Firebase初期化 ──────────────────────────────────────────
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};
const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// ============================================================
// データ
// ============================================================
const ALL_ELEMENTS = [
  { number:1,  symbol:"H",  name:"水素" },
  { number:2,  symbol:"He", name:"ヘリウム" },
  { number:3,  symbol:"Li", name:"リチウム" },
  { number:4,  symbol:"Be", name:"ベリリウム" },
  { number:5,  symbol:"B",  name:"ホウ素" },
  { number:6,  symbol:"C",  name:"炭素" },
  { number:7,  symbol:"N",  name:"窒素" },
  { number:8,  symbol:"O",  name:"酸素" },
  { number:9,  symbol:"F",  name:"フッ素" },
  { number:10, symbol:"Ne", name:"ネオン" },
  { number:11, symbol:"Na", name:"ナトリウム" },
  { number:12, symbol:"Mg", name:"マグネシウム" },
  { number:13, symbol:"Al", name:"アルミニウム" },
  { number:14, symbol:"Si", name:"ケイ素" },
  { number:15, symbol:"P",  name:"リン" },
  { number:16, symbol:"S",  name:"硫黄" },
  { number:17, symbol:"Cl", name:"塩素" },
  { number:18, symbol:"Ar", name:"アルゴン" },
  { number:19, symbol:"K",  name:"カリウム" },
  { number:20, symbol:"Ca", name:"カルシウム" },
  { number:21, symbol:"Sc", name:"スカンジウム" },
  { number:22, symbol:"Ti", name:"チタン" },
  { number:23, symbol:"V",  name:"バナジウム" },
  { number:24, symbol:"Cr", name:"クロム" },
  { number:25, symbol:"Mn", name:"マンガン" },
  { number:26, symbol:"Fe", name:"鉄" },
  { number:27, symbol:"Co", name:"コバルト" },
  { number:28, symbol:"Ni", name:"ニッケル" },
  { number:29, symbol:"Cu", name:"銅" },
  { number:30, symbol:"Zn", name:"亜鉛" },
  { number:31, symbol:"Ga", name:"ガリウム" },
  { number:32, symbol:"Ge", name:"ゲルマニウム" },
  { number:33, symbol:"As", name:"ヒ素" },
  { number:34, symbol:"Se", name:"セレン" },
  { number:35, symbol:"Br", name:"臭素" },
  { number:36, symbol:"Kr", name:"クリプトン" },
  { number:37, symbol:"Rb", name:"ルビジウム" },
  { number:38, symbol:"Sr", name:"ストロンチウム" },
  { number:39, symbol:"Y",  name:"イットリウム" },
  { number:40, symbol:"Zr", name:"ジルコニウム" },
  { number:41, symbol:"Nb", name:"ニオブ" },
  { number:42, symbol:"Mo", name:"モリブデン" },
  { number:43, symbol:"Tc", name:"テクネチウム" },
  { number:44, symbol:"Ru", name:"ルテニウム" },
  { number:45, symbol:"Rh", name:"ロジウム" },
  { number:46, symbol:"Pd", name:"パラジウム" },
  { number:47, symbol:"Ag", name:"銀" },
  { number:48, symbol:"Cd", name:"カドミウム" },
  { number:49, symbol:"In", name:"インジウム" },
  { number:50, symbol:"Sn", name:"スズ" },
  { number:51, symbol:"Sb", name:"アンチモン" },
  { number:52, symbol:"Te", name:"テルル" },
  { number:53, symbol:"I",  name:"ヨウ素" },
  { number:54, symbol:"Xe", name:"キセノン" },
  { number:55, symbol:"Cs", name:"セシウム" },
  { number:56, symbol:"Ba", name:"バリウム" },
  { number:57, symbol:"La", name:"ランタン" },
  { number:58, symbol:"Ce", name:"セリウム" },
  { number:72, symbol:"Hf", name:"ハフニウム" },
  { number:73, symbol:"Ta", name:"タンタル" },
  { number:74, symbol:"W",  name:"タングステン" },
  { number:75, symbol:"Re", name:"レニウム" },
  { number:76, symbol:"Os", name:"オスミウム" },
  { number:77, symbol:"Ir", name:"イリジウム" },
  { number:78, symbol:"Pt", name:"白金" },
  { number:79, symbol:"Au", name:"金" },
  { number:80, symbol:"Hg", name:"水銀" },
  { number:81, symbol:"Tl", name:"タリウム" },
  { number:82, symbol:"Pb", name:"鉛" },
  { number:83, symbol:"Bi", name:"ビスマス" },
  { number:84, symbol:"Po", name:"ポロニウム" },
  { number:85, symbol:"At", name:"アスタチン" },
  { number:86, symbol:"Rn", name:"ラドン" },
  { number:87, symbol:"Fr", name:"フランシウム" },
  { number:88, symbol:"Ra", name:"ラジウム" },
  { number:89, symbol:"Ac", name:"アクチニウム" },
  { number:90, symbol:"Th", name:"トリウム" },
  { number:91, symbol:"Pa", name:"プロトアクチニウム" },
  { number:92, symbol:"U",  name:"ウラン" },
  { number:93, symbol:"Np", name:"ネプツニウム" },
  { number:94, symbol:"Pu", name:"プルトニウム" },
  { number:95, symbol:"Am", name:"アメリシウム" },
  { number:96, symbol:"Cm", name:"キュリウム" },
  { number:97, symbol:"Bk", name:"バークリウム" },
  { number:98, symbol:"Cf", name:"カリホルニウム" },
  { number:99, symbol:"Es", name:"アインスタイニウム" },
  { number:100,symbol:"Fm", name:"フェルミウム" },
  { number:101,symbol:"Md", name:"メンデレビウム" },
  { number:102,symbol:"No", name:"ノーベリウム" },
  { number:103,symbol:"Lr", name:"ローレンシウム" },
  { number:104,symbol:"Rf", name:"ラザホージウム" },
  { number:105,symbol:"Db", name:"ドブニウム" },
  { number:106,symbol:"Sg", name:"シーボーギウム" },
  { number:107,symbol:"Bh", name:"ボーリウム" },
  { number:108,symbol:"Hs", name:"ハッシウム" },
  { number:109,symbol:"Mt", name:"マイトネリウム" },
  { number:110,symbol:"Ds", name:"ダームスタチウム" },
  { number:111,symbol:"Rg", name:"レントゲニウム" },
  { number:112,symbol:"Cn", name:"コペルニシウム" },
  { number:113,symbol:"Nh", name:"ニホニウム" },
  { number:114,symbol:"Fl", name:"フレロビウム" },
  { number:115,symbol:"Mc", name:"モスコビウム" },
  { number:116,symbol:"Lv", name:"リバモリウム" },
  { number:117,symbol:"Ts", name:"テネシン" },
  { number:118,symbol:"Og", name:"オガネソン" },
];

// イオンデータ: question=イオン式, answer=名前 の両方向出題


const PRESETS = [
  { label:"1〜20番", max:20 },
  { label:"1〜36番", max:36 },
  { label:"1〜56番", max:56 },
  { label:"全範囲(〜103番)", max:103 },
];

function getElements(maxNum) { return ALL_ELEMENTS.filter(e => e.number <= maxNum); }


// ============================================================
// イオンデータ（中学・高校レベル分け）
// ============================================================
const IONS_JUNIOR = [
  // 中学理科で必須の陽イオン
  { formula:"H⁺",    name:"水素イオン" },
  { formula:"Na⁺",   name:"ナトリウムイオン" },
  { formula:"K⁺",    name:"カリウムイオン" },
  { formula:"Ca²⁺",  name:"カルシウムイオン" },
  { formula:"Mg²⁺",  name:"マグネシウムイオン" },
  { formula:"Cu²⁺",  name:"銅イオン" },
  { formula:"Zn²⁺",  name:"亜鉛イオン" },
  { formula:"Fe²⁺",  name:"鉄(II)イオン" },
  { formula:"Al³⁺",  name:"アルミニウムイオン" },
  { formula:"Ba²⁺",  name:"バリウムイオン" },
  { formula:"NH₄⁺",  name:"アンモニウムイオン" },
  // 中学理科で必須の陰イオン
  { formula:"Cl⁻",   name:"塩化物イオン" },
  { formula:"OH⁻",   name:"水酸化物イオン" },
  { formula:"SO₄²⁻", name:"硫酸イオン" },
  { formula:"NO₃⁻",  name:"硝酸イオン" },
  { formula:"CO₃²⁻", name:"炭酸イオン" },
  { formula:"HCO₃⁻", name:"炭酸水素イオン" },
];

const IONS_SENIOR_EXTRA = [
  // 高校化学で追加されるイオン
  { formula:"Li⁺",      name:"リチウムイオン" },
  { formula:"Ag⁺",      name:"銀イオン" },
  { formula:"Fe³⁺",     name:"鉄(III)イオン" },
  { formula:"Mn²⁺",     name:"マンガン(II)イオン" },
  { formula:"Pb²⁺",     name:"鉛(II)イオン" },
  { formula:"Ni²⁺",     name:"ニッケルイオン" },
  { formula:"Cr³⁺",     name:"クロム(III)イオン" },
  { formula:"H₃O⁺",     name:"オキソニウムイオン" },
  { formula:"F⁻",       name:"フッ化物イオン" },
  { formula:"Br⁻",      name:"臭化物イオン" },
  { formula:"I⁻",       name:"ヨウ化物イオン" },
  { formula:"S²⁻",      name:"硫化物イオン" },
  { formula:"O²⁻",      name:"酸化物イオン" },
  { formula:"SO₃²⁻",    name:"亜硫酸イオン" },
  { formula:"NO₂⁻",     name:"亜硝酸イオン" },
  { formula:"HSO₄⁻",    name:"硫酸水素イオン" },
  { formula:"PO₄³⁻",    name:"リン酸イオン" },
  { formula:"CH₃COO⁻",  name:"酢酸イオン" },
  { formula:"MnO₄⁻",    name:"過マンガン酸イオン" },
  { formula:"Cr₂O₇²⁻",  name:"二クロム酸イオン" },
  { formula:"CN⁻",      name:"シアン化物イオン" },
  { formula:"SCN⁻",     name:"チオシアン酸イオン" },
];

const IONS_SENIOR = [...IONS_JUNIOR, ...IONS_SENIOR_EXTRA];

function getIons(level) {
  return level === "junior" ? IONS_JUNIOR : IONS_SENIOR;
}

// ============================================================
// 化学式データ（中学・高校レベル分け）
// ============================================================
const FORMULAS_JUNIOR = [
  // 単体
  { formula:"H₂",    name:"水素" },
  { formula:"O₂",    name:"酸素" },
  { formula:"N₂",    name:"窒素" },
  { formula:"Cl₂",   name:"塩素" },
  { formula:"C",     name:"炭素" },
  { formula:"S",     name:"硫黄" },
  { formula:"Cu",    name:"銅" },
  { formula:"Fe",    name:"鉄" },
  { formula:"Ag",    name:"銀" },
  // 化合物（中学必須）
  { formula:"H₂O",   name:"水" },
  { formula:"CO₂",   name:"二酸化炭素" },
  { formula:"CO",    name:"一酸化炭素" },
  { formula:"HCl",   name:"塩化水素（塩酸）" },
  { formula:"NaCl",  name:"塩化ナトリウム（食塩）" },
  { formula:"NaOH",  name:"水酸化ナトリウム" },
  { formula:"H₂SO₄", name:"硫酸" },
  { formula:"HNO₃",  name:"硝酸" },
  { formula:"NH₃",   name:"アンモニア" },
  { formula:"H₂O₂",  name:"過酸化水素" },
  { formula:"CaCO₃", name:"炭酸カルシウム" },
  { formula:"Ca(OH)₂",name:"水酸化カルシウム" },
  { formula:"CuO",   name:"酸化銅(II)" },
  { formula:"Fe₂O₃", name:"酸化鉄(III)" },
  { formula:"MgO",   name:"酸化マグネシウム" },
  { formula:"Al₂O₃", name:"酸化アルミニウム" },
  { formula:"Na₂O",  name:"酸化ナトリウム" },
];

const FORMULAS_SENIOR_EXTRA = [
  // 高校化学で追加される化合物
  { formula:"CH₄",      name:"メタン" },
  { formula:"C₂H₅OH",   name:"エタノール" },
  { formula:"C₆H₁₂O₆",  name:"グルコース" },
  { formula:"C₁₂H₂₂O₁₁",name:"スクロース（ショ糖）" },
  { formula:"SO₂",      name:"二酸化硫黄" },
  { formula:"SO₃",      name:"三酸化硫黄" },
  { formula:"NO",       name:"一酸化窒素" },
  { formula:"NO₂",      name:"二酸化窒素" },
  { formula:"HF",       name:"フッ化水素" },
  { formula:"HBr",      name:"臭化水素" },
  { formula:"HI",       name:"ヨウ化水素" },
  { formula:"H₂S",      name:"硫化水素" },
  { formula:"H₃PO₄",    name:"リン酸" },
  { formula:"H₂CO₃",    name:"炭酸" },
  { formula:"KOH",      name:"水酸化カリウム" },
  { formula:"Ba(OH)₂",  name:"水酸化バリウム" },
  { formula:"Mg(OH)₂",  name:"水酸化マグネシウム" },
  { formula:"Al(OH)₃",  name:"水酸化アルミニウム" },
  { formula:"Cu(OH)₂",  name:"水酸化銅(II)" },
  { formula:"Fe(OH)₃",  name:"水酸化鉄(III)" },
  { formula:"NH₄Cl",    name:"塩化アンモニウム" },
  { formula:"CaSO₄",    name:"硫酸カルシウム" },
  { formula:"CuSO₄",    name:"硫酸銅(II)" },
  { formula:"FeCl₂",    name:"塩化鉄(II)" },
  { formula:"FeCl₃",    name:"塩化鉄(III)" },
  { formula:"NaHCO₃",   name:"炭酸水素ナトリウム" },
  { formula:"Na₂CO₃",   name:"炭酸ナトリウム" },
  { formula:"CH₃COOH",  name:"酢酸" },
  { formula:"HCOOH",    name:"ギ酸" },
  { formula:"SiO₂",     name:"二酸化ケイ素" },
  { formula:"O₃",       name:"オゾン" },
  { formula:"P₄O₁₀",    name:"十酸化四リン" },
];

const FORMULAS_SENIOR = [...FORMULAS_JUNIOR, ...FORMULAS_SENIOR_EXTRA];

function getFormulas(level) {
  return level === "junior" ? FORMULAS_JUNIOR : FORMULAS_SENIOR;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

// ── スコア計算 ────────────────────────────────────────────
// 元素/イオン/化学式クイズ：時間点 + 正解率ボーナス
function calcQuizScore(correct, total, rawScore) {
  if (total === 0 || correct === 0) return 0;
  const acc = correct / total;
  const accBonus = Math.round(acc * acc * 200);
  return rawScore + accBonus;
}

// mol計算：正解数×100 + 正解率ボーナス + 残り時間ボーナス
function calcMolScore(correct, total, timeLeft) {
  if (total === 0 || correct === 0) return 0;
  const acc = correct / total;
  const base = correct * 100;
  const accBonus = Math.round(acc * acc * 100);
  const timeBonus = Math.round(timeLeft * 0.5);
  return base + accBonus + timeBonus;
}

// ── mol計算：科学的記数法フォーマット ──────────────────────
// 数値を「有効数字×10ⁿ」形式に変換
// 例: 0.625 → "6.25×10⁻¹", 2 → "2×10⁰", 22.4 → "2.24×10¹"
const SUP_MAP = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻"};
function toSup(n) { return String(n).split("").map(c=>SUP_MAP[c]||c).join(""); }

function toSciNotation(val, sigFigs = 2) {
  if (val === 0) return "0";
  const sign = val < 0 ? "-" : "";
  const abs = Math.abs(val);
  const exp = Math.floor(Math.log10(abs));
  const coef = abs / Math.pow(10, exp);
  const factor = Math.pow(10, sigFigs - 1);
  const rounded = Math.round(coef * factor) / factor;
  // 有効数字2桁で表示
  const coefStr = rounded.toFixed(sigFigs - 1);
  // 10^0 や 10^1 の場合は通常表記に戻す
  if (exp === 0) {
    // 例: 1.0, 2.0 など
    return `${sign}${coefStr}`;
  }
  if (exp === 1) {
    // 例: 12, 22, 44 など
    const plain = Math.round(abs * Math.pow(10, sigFigs-1-exp)) / Math.pow(10, sigFigs-1-exp);
    return `${sign}${plain}`;
  }
  return `${sign}${coefStr}×10${toSup(exp)}`;
}

// MOL_QUESTIONS_RAW の答えと問題の数値を科学的記数法に変換
// 選択肢生成・表示で使う
function fmtMolVal(val) {
  if (typeof val === "string") return val; // すでに指数表記
  if (val === 0) return "0";
  // 1桁の整数（1〜9）はそのまま
  if (Number.isInteger(val) && val >= 1 && val <= 9) return String(val);
  return toSciNotation(val, 2);
}

// タイムアタック：正解数×100 + タイムボーナス（早いほど高得点）
function calcTimeAttackScore(correct, total, elapsedSec) {
  if (total === 0) return 0;
  const acc = correct / total;
  const base = correct * 100;
  const accBonus = Math.round(acc * acc * 100);
  const timeBonus = Math.max(0, Math.round((600 - elapsedSec) * 1));
  return base + accBonus + timeBonus;
}

// 日付フォーマット
function fmtDate(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
}

function seededRng(seed) {
  let s = seed;
  return () => { s=(s*1664525+1013904223)&0xffffffff; return (s>>>0)/0x100000000; };
}


// ============================================================
// 難易度別ダミー選択肢生成
// ============================================================

// ── イオン用ダミー ──────────────────────────────────────────
// 各イオンに「似ているイオン」を事前定義
const ION_SIMILAR = {
  // 陽イオン
  "H⁺":    { normal:["ナトリウムイオン","カリウムイオン","リチウムイオン"],           hard:["水酸化物イオン","フッ化物イオン","アンモニウムイオン"] },
  "Na⁺":   { normal:["カリウムイオン","リチウムイオン","マグネシウムイオン"],          hard:["ナトリウムイオン(2価)","Na²⁺","ナトリウムアニオン"] },
  "K⁺":    { normal:["ナトリウムイオン","リチウムイオン","ルビジウムイオン"],           hard:["カリウムイオン(2価)","K²⁺","カリウムアニオン"] },
  "Ca²⁺":  { normal:["マグネシウムイオン","バリウムイオン","銅イオン"],               hard:["カルシウムイオン(1価)","カルシウムイオン(3価)","カルシウムアニオン"] },
  "Mg²⁺":  { normal:["カルシウムイオン","亜鉛イオン","バリウムイオン"],               hard:["マグネシウムイオン(1価)","マグネシウムイオン(3価)","マグネシウムアニオン"] },
  "Ba²⁺":  { normal:["カルシウムイオン","マグネシウムイオン","ストロンチウムイオン"],   hard:["バリウムイオン(1価)","バリウムイオン(3価)","バリウムアニオン"] },
  "Cu²⁺":  { normal:["亜鉛イオン","鉄(II)イオン","ニッケルイオン"],                  hard:["銅イオン(1価)","銅イオン(3価)","銅アニオン"] },
  "Zn²⁺":  { normal:["銅イオン","ニッケルイオン","鉄(II)イオン"],                    hard:["亜鉛イオン(1価)","亜鉛イオン(3価)","亜鉛アニオン"] },
  "Fe²⁺":  { normal:["鉄(III)イオン","銅イオン","マンガン(II)イオン"],               hard:["鉄(III)イオン","鉄(I)イオン","鉄アニオン"] },
  "Fe³⁺":  { normal:["鉄(II)イオン","アルミニウムイオン","クロム(III)イオン"],        hard:["鉄(II)イオン","鉄(IV)イオン","鉄アニオン"] },
  "Al³⁺":  { normal:["鉄(III)イオン","クロム(III)イオン","アルミニウムイオン(2価)"],  hard:["アルミニウムイオン(2価)","アルミニウムイオン(4価)","アルミニウムアニオン"] },
  "NH₄⁺":  { normal:["ナトリウムイオン","カリウムイオン","水素イオン"],               hard:["アンモニウムイオン(2価)","アンモニアイオン","アンモニウムアニオン"] },
  "Ag⁺":   { normal:["ナトリウムイオン","カリウムイオン","銅イオン"],                 hard:["銀イオン(2価)","銀アニオン","銀イオン(0価)"] },
  "Li⁺":   { normal:["ナトリウムイオン","カリウムイオン","水素イオン"],               hard:["リチウムイオン(2価)","リチウムアニオン","Li²⁺"] },
  "Mn²⁺":  { normal:["鉄(II)イオン","銅イオン","亜鉛イオン"],                        hard:["マンガン(III)イオン","マンガン(I)イオン","マンガンアニオン"] },
  "Pb²⁺":  { normal:["銅イオン","亜鉛イオン","鉄(II)イオン"],                        hard:["鉛イオン(1価)","鉛イオン(4価)","鉛アニオン"] },
  "Ni²⁺":  { normal:["銅イオン","亜鉛イオン","コバルトイオン"],                       hard:["ニッケルイオン(3価)","ニッケルイオン(1価)","ニッケルアニオン"] },
  "Cr³⁺":  { normal:["鉄(III)イオン","アルミニウムイオン","マンガン(III)イオン"],     hard:["クロム(II)イオン","クロム(IV)イオン","クロムアニオン"] },
  "H₃O⁺":  { normal:["アンモニウムイオン","水素イオン","ナトリウムイオン"],            hard:["オキソニウムイオン(2価)","水分子イオン","H₂O⁺"] },
  // 陰イオン
  "Cl⁻":   { normal:["臭化物イオン","ヨウ化物イオン","フッ化物イオン"],               hard:["塩化物イオン(2価)","塩化物アニオン(2価)","Cl²⁻"] },
  "OH⁻":   { normal:["フッ化物イオン","塩化物イオン","酸化物イオン"],                 hard:["水酸化物イオン(2価)","酸素イオン","O²⁻"] },
  "SO₄²⁻": { normal:["亜硫酸イオン","炭酸イオン","リン酸イオン"],                    hard:["亜硫酸イオン","硫酸水素イオン","硫酸イオン(1価)"] },
  "NO₃⁻":  { normal:["亜硝酸イオン","硫酸イオン","塩化物イオン"],                    hard:["亜硝酸イオン","硝酸イオン(2価)","NO₄⁻"] },
  "CO₃²⁻": { normal:["炭酸水素イオン","硫酸イオン","亜硫酸イオン"],                  hard:["炭酸水素イオン","炭酸イオン(1価)","炭酸イオン(3価)"] },
  "HCO₃⁻": { normal:["炭酸イオン","硫酸水素イオン","水酸化物イオン"],                hard:["炭酸イオン","炭酸水素イオン(2価)","HCO₄⁻"] },
  "SO₃²⁻": { normal:["硫酸イオン","炭酸イオン","亜硝酸イオン"],                      hard:["硫酸イオン","亜硫酸イオン(1価)","亜硫酸イオン(3価)"] },
  "NO₂⁻":  { normal:["硝酸イオン","亜硫酸イオン","塩化物イオン"],                    hard:["硝酸イオン","亜硝酸イオン(2価)","N₂O⁻"] },
  "PO₄³⁻": { normal:["硫酸イオン","炭酸イオン","硝酸イオン"],                        hard:["リン酸イオン(2価)","リン酸イオン(4価)","HPO₄²⁻"] },
  "HSO₄⁻": { normal:["硫酸イオン","炭酸水素イオン","水酸化物イオン"],                hard:["硫酸イオン","亜硫酸水素イオン","H₂SO₄"] },
  "MnO₄⁻": { normal:["二クロム酸イオン","硫酸イオン","硝酸イオン"],                  hard:["過マンガン酸イオン(2価)","マンガン酸イオン","MnO₃⁻"] },
  "Cr₂O₇²⁻":{ normal:["過マンガン酸イオン","硫酸イオン","炭酸イオン"],              hard:["クロム酸イオン","二クロム酸イオン(3価)","Cr₂O₆²⁻"] },
  "CH₃COO⁻":{ normal:["ギ酸イオン","水酸化物イオン","炭酸水素イオン"],              hard:["酢酸イオン(2価)","プロピオン酸イオン","CH₂COO⁻"] },
  "F⁻":    { normal:["塩化物イオン","臭化物イオン","水酸化物イオン"],                hard:["フッ化物イオン(2価)","F²⁻","フッ化物アニオン(2価)"] },
  "Br⁻":   { normal:["塩化物イオン","ヨウ化物イオン","フッ化物イオン"],              hard:["臭化物イオン(2価)","Br²⁻","臭化物アニオン(2価)"] },
  "I⁻":    { normal:["臭化物イオン","塩化物イオン","フッ化物イオン"],               hard:["ヨウ化物イオン(2価)","I₃⁻","ヨウ化物アニオン(2価)"] },
  "S²⁻":   { normal:["酸化物イオン","塩化物イオン","硫酸イオン"],                   hard:["硫化物イオン(1価)","硫化物イオン(3価)","S²⁺"] },
  "O²⁻":   { normal:["硫化物イオン","水酸化物イオン","フッ化物イオン"],              hard:["酸化物イオン(1価)","酸化物イオン(3価)","O²⁺"] },
  "CN⁻":   { normal:["塩化物イオン","水酸化物イオン","亜硝酸イオン"],               hard:["シアン化物イオン(2価)","C₂N⁻","チオシアン酸イオン"] },
  "SCN⁻":  { normal:["シアン化物イオン","塩化物イオン","硝酸イオン"],               hard:["チオシアン酸イオン(2価)","SC₂N⁻","シアン化物イオン"] },
};


// ── イオン用ダミー ──────────────────────────────────────────
// 各イオンに「似ているイオン」を事前定義
const FORMULA_SIMILAR = {
  // 式→名前 の難易度別ダミー名前リスト（名前のみ）
  "H₂O":    { normal:["二酸化炭素","塩化水素（塩酸）","アンモニア"],        hard:["過酸化水素","水酸化物","三酸化水素"] },
  "CO₂":    { normal:["一酸化炭素","二酸化硫黄","水"],                     hard:["一酸化炭素","炭酸","三酸化炭素"] },
  "CO":     { normal:["二酸化炭素","一酸化窒素","二酸化硫黄"],              hard:["二酸化炭素","炭素","炭酸"] },
  "HCl":    { normal:["塩化ナトリウム（食塩）","水素","塩素"],              hard:["塩素","塩化カリウム","塩化マグネシウム"] },
  "NaCl":   { normal:["水酸化ナトリウム","塩化カリウム","塩化マグネシウム"], hard:["塩化カリウム","塩化ナトリウム(別)","塩化マグネシウム"] },
  "NaOH":   { normal:["水酸化カリウム","塩化ナトリウム（食塩）","炭酸ナトリウム"], hard:["水酸化カリウム","酸化ナトリウム","炭酸ナトリウム"] },
  "H₂SO₄":  { normal:["亜硫酸","硝酸","リン酸"],                          hard:["亜硫酸","硫酸水素","リン酸"] },
  "HNO₃":   { normal:["亜硝酸","硫酸","塩化水素（塩酸）"],                  hard:["亜硝酸","硫酸","塩化水素（塩酸）"] },
  "NH₃":    { normal:["窒素","水素","ヒドラジン"],                          hard:["アンモニウム塩","ヒドラジン","窒化水素"] },
  "H₂O₂":   { normal:["水","酸素","塩化水素（塩酸）"],                      hard:["水","酸素","過水素"] },
  "CaCO₃":  { normal:["炭酸ナトリウム","酸化カルシウム","水酸化カルシウム"], hard:["炭酸マグネシウム","炭酸バリウム","炭酸ナトリウム"] },
  "Ca(OH)₂":{ normal:["炭酸カルシウム","酸化カルシウム","水酸化マグネシウム"], hard:["水酸化マグネシウム","水酸化バリウム","酸化カルシウム"] },
  "CuO":    { normal:["酸化銅(I)","酸化鉄(II)","酸化亜鉛"],                hard:["酸化銅(I)","酸化亜鉛","酸化鉄(II)"] },
  "Fe₂O₃":  { normal:["酸化鉄(II)","四酸化三鉄","酸化アルミニウム"],        hard:["酸化鉄(II)","四酸化三鉄","酸化鉄(IV)"] },
  "MgO":    { normal:["酸化カルシウム","酸化亜鉛","酸化アルミニウム"],       hard:["酸化カルシウム","酸化亜鉛","酸化バリウム"] },
  "Al₂O₃":  { normal:["酸化鉄(III)","二酸化ケイ素","酸化マグネシウム"],     hard:["酸化鉄(III)","二酸化ケイ素","酸化クロム(III)"] },
  "Na₂O":   { normal:["水酸化ナトリウム","炭酸ナトリウム","酸化カリウム"],   hard:["過酸化ナトリウム","酸化カリウム","炭酸ナトリウム"] },
  "H₂":     { normal:["酸素","窒素","塩素"],                               hard:["酸素","ヘリウム","窒素"] },
  "O₂":     { normal:["窒素","水素","塩素"],                               hard:["オゾン","窒素","塩素"] },
  "N₂":     { normal:["酸素","水素","一酸化窒素"],                          hard:["一酸化窒素","二酸化窒素","アンモニア"] },
  "Cl₂":    { normal:["塩化水素（塩酸）","臭素","フッ素"],                   hard:["塩化水素（塩酸）","臭素","フッ素"] },
  "CH₄":    { normal:["エタン","エチレン","アンモニア"],                     hard:["エタン","プロパン","エチレン"] },
  "C₂H₅OH": { normal:["メタノール","エタン","酢酸"],                        hard:["メタノール","プロパノール","酢酸"] },
  "SO₂":    { normal:["三酸化硫黄","二酸化炭素","二酸化窒素"],               hard:["三酸化硫黄","亜硫酸","硫酸"] },
  "SO₃":    { normal:["二酸化硫黄","二酸化炭素","硫酸"],                    hard:["二酸化硫黄","亜硫酸","硫酸"] },
  "NO":     { normal:["二酸化窒素","一酸化炭素","亜酸化窒素"],               hard:["二酸化窒素","亜酸化窒素","四酸化二窒素"] },
  "NO₂":    { normal:["一酸化窒素","亜硝酸","四酸化二窒素"],                 hard:["一酸化窒素","四酸化二窒素","亜硝酸"] },
  "KOH":    { normal:["水酸化ナトリウム","塩化カリウム","酸化カリウム"],      hard:["水酸化ナトリウム","水酸化バリウム","水酸化カルシウム"] },
  "Ba(OH)₂":{ normal:["水酸化カルシウム","酸化バリウム","水酸化マグネシウム"], hard:["水酸化カルシウム","水酸化マグネシウム","水酸化ストロンチウム"] },
  "NH₄Cl":  { normal:["塩化ナトリウム（食塩）","アンモニア","塩化水素（塩酸）"], hard:["塩化ナトリウム（食塩）","塩化カリウム","塩化カルシウム"] },
  "CuSO₄":  { normal:["硫酸亜鉛","塩化銅(II)","炭酸カルシウム"],            hard:["硫酸亜鉛","硫酸鉄(II)","硫酸ニッケル"] },
  "FeCl₂":  { normal:["塩化鉄(III)","塩化ナトリウム（食塩）","塩化マグネシウム"], hard:["塩化鉄(III)","塩化コバルト(II)","塩化ニッケル"] },
  "FeCl₃":  { normal:["塩化鉄(II)","塩化アルミニウム","塩化ナトリウム（食塩）"], hard:["塩化鉄(II)","塩化クロム(III)","塩化アルミニウム"] },
  "NaHCO₃": { normal:["炭酸ナトリウム","水酸化ナトリウム","炭酸カルシウム"],  hard:["炭酸ナトリウム","炭酸水素カリウム","炭酸水素カルシウム"] },
  "Na₂CO₃": { normal:["炭酸水素ナトリウム","酸化ナトリウム","水酸化ナトリウム"], hard:["炭酸水素ナトリウム","炭酸カリウム","炭酸カルシウム"] },
  "SiO₂":   { normal:["二酸化炭素","二酸化硫黄","酸化アルミニウム"],         hard:["一酸化ケイ素","二酸化炭素","酸化アルミニウム"] },
  "O₃":     { normal:["酸素","二酸化硫黄","三酸化硫黄"],                    hard:["酸素","四酸素","二酸素"] },
  "H₂S":    { normal:["塩化水素（塩酸）","二酸化硫黄","水"],                 hard:["塩化水素（塩酸）","二酸化硫黄","二硫化炭素"] },
  "H₃PO₄":  { normal:["硫酸","硝酸","亜リン酸"],                           hard:["亜リン酸","次亜リン酸","ピロリン酸"] },
};

// 難易度に応じたダミー選択肢を生成
// ION_SIMILAR / FORMULA_SIMILAR の値は「名前の文字列リスト」
// → 式→名前 でも 名前→式 でも正しく使える
function getDifficultyCandidates(item, allItems, difficulty, mode) {
  const similarMap = mode==="ion" ? ION_SIMILAR : mode==="formula" ? FORMULA_SIMILAR : null;
  const key = mode==="ion" ? item.formula : mode==="formula" ? item.formula : item.symbol;

  if (difficulty === "easy" || !similarMap || !similarMap[key]) {
    return shuffle(allItems.filter(x => (mode==="element"?x.symbol:x.formula) !== key)).slice(0,3);
  }

  const similar = similarMap[key];
  const nameList = difficulty === "hard"
    ? (similar.hard || similar.normal || [])
    : (similar.normal || []);

  // nameListは「名前の文字列」→ allItemsから名前で検索、なければダミーオブジェクト生成
  const results = nameList.slice(0, 3).map(dummyName => {
    const found = allItems.find(x => x.name === dummyName);
    if (found) return found;
    // 実在しない名前のダミー
    // formula（式として使う値）は空文字にして、表示側でname（名前）を使う
    return { formula: "???", name: dummyName, _dummy: true };
  });

  // 3個未満なら補完
  if (results.length < 3) {
    const usedKeys = results.map(r => r._dummy ? r.name : (mode==="ion"?r.formula:r.formula));
    const extras = shuffle(allItems.filter(x => {
      const k = mode==="ion"?x.formula:x.formula;
      return k !== key && !usedKeys.includes(k);
    })).slice(0, 3 - results.length);
    return [...results, ...extras];
  }
  return results;
}

// 元素用ダミー（難易度別）
// easy: 全く違う元素 / normal: 同周期や似た記号 / hard: 記号が似ている
function getElementDummies(el, elements, difficulty) {
  if (difficulty === "easy") {
    return shuffle(elements.filter(e=>e.symbol!==el.symbol)).slice(0,3);
  }
  if (difficulty === "normal") {
    // 同周期 or 隣接原子番号
    const sameRow = elements.filter(e =>
      e.symbol!==el.symbol &&
      Math.abs(e.number - el.number) <= 8
    );
    const pool = sameRow.length >= 3 ? sameRow : elements.filter(e=>e.symbol!==el.symbol);
    return shuffle(pool).slice(0,3);
  }
  if (difficulty === "hard") {
    // 記号が似ている（頭文字一致 or 1文字違い）
    const similar = elements.filter(e => {
      if (e.symbol === el.symbol) return false;
      if (e.symbol[0] === el.symbol[0]) return true; // 頭文字同じ
      if (Math.abs(e.number - el.number) <= 2) return true; // 隣の元素
      return false;
    });
    const pool = similar.length >= 3 ? similar : elements.filter(e=>e.symbol!==el.symbol);
    return shuffle(pool).slice(0,3);
  }
  return shuffle(elements.filter(e=>e.symbol!==el.symbol)).slice(0,3);
}

function generateElementQ(elements, rng, directionMode="random", difficulty="normal") {
  const rand = rng || Math.random.bind(Math);
  const el = elements[Math.floor(rand()*elements.length)];
  const isS2N = directionMode==="s2n" ? true : directionMode==="n2s" ? false : rand() > 0.5;
  const wrongItems = getElementDummies(el, elements, difficulty);
  // 名前→記号 の場合: choicesは記号, 正解はel.symbol
  // 記号→名前 の場合: choicesは名前, 正解はel.name
  const choiceItems = shuffle([el, ...wrongItems]);
  return {
    id: el.symbol+isS2N,
    display: isS2N ? el.symbol : el.name,
    label: isS2N ? "この記号の元素名は？" : "この元素の記号は？",
    choices: choiceItems.map(c=>isS2N?c.name:c.symbol),
    answer: isS2N ? el.name : el.symbol,
    isSymbol: isS2N,
    meta: { symbol:el.symbol, name:el.name },
  };
}

function generateIonQ(ions, rng, directionMode="random", difficulty="normal") {
  const rand = rng || Math.random.bind(Math);
  const ion = ions[Math.floor(rand()*ions.length)];
  const isF2N = directionMode==="f2n" ? true : directionMode==="n2f" ? false : rand() > 0.5;

  if (isF2N) {
    // 式→名前：選択肢は「名前」のみ
    // ダミーはION_SIMILARの名前リストから（実在するものはname、しないものはname文字列）
    const wrongCandidates = getDifficultyCandidates(ion, ions, difficulty, "ion");
    const choiceItems = shuffle([ion, ...wrongCandidates]);
    const finalChoices = choiceItems.map(c => c.name);
    return {
      id: ion.formula+isF2N,
      display: ion.formula,
      label: "このイオン式の名前は？",
      choices: finalChoices,
      answer: ion.name,
      isSymbol: true,
      meta: { symbol:ion.formula, name:ion.name },
    };
  } else {
    // 名前→式：選択肢は「式」のみ
    // ダミーは必ずallItemsから選ぶ（式を持つ実在データのみ）
    const wrong = shuffle(ions.filter(i => i.formula !== ion.formula)).slice(0, 3);
    const choiceItems = shuffle([ion, ...wrong]);
    const finalChoices = choiceItems.map(c => c.formula);
    return {
      id: ion.formula+isF2N,
      display: ion.name,
      label: "このイオンの式は？",
      choices: finalChoices,
      answer: ion.formula,
      isSymbol: false,
      meta: { symbol:ion.formula, name:ion.name },
    };
  }
}

// 化学式クイズ用問題生成 directionMode: "f2n"=式→名前, "n2f"=名前→式, "random"
function generateFormulaQ(formulas, rng, directionMode="random", difficulty="normal") {
  const rand = rng || Math.random.bind(Math);
  const item = formulas[Math.floor(rand()*formulas.length)];
  const isF2N = directionMode==="f2n" ? true : directionMode==="n2f" ? false : rand() > 0.5;

  if (isF2N) {
    // 式→名前：選択肢は「名前」のみ
    const wrongCandidates = getDifficultyCandidates(item, formulas, difficulty, "formula");
    const choiceItems = shuffle([item, ...wrongCandidates]);
    const finalChoices = choiceItems.map(c => c.name);
    return {
      id: item.formula+isF2N,
      display: item.formula,
      label: "この化学式の物質名は？",
      choices: finalChoices,
      answer: item.name,
      isSymbol: false,
      meta: { symbol:item.formula, name:item.name },
    };
  } else {
    // 名前→式：選択肢は「式」のみ
    // ダミーは必ずallItemsから選ぶ
    const wrong = shuffle(formulas.filter(f => f.formula !== item.formula)).slice(0, 3);
    const choiceItems = shuffle([item, ...wrong]);
    const finalChoices = choiceItems.map(c => c.formula);
    return {
      id: item.formula+isF2N,
      display: item.name,
      label: "この物質の化学式は？",
      choices: finalChoices,
      answer: item.formula,
      isSymbol: true,
      meta: { symbol:item.formula, name:item.name },
    };
  }
}


// ============================================================
// BGM ENGINE  ─ ホーム用(落ち着いた) と プレイ用(アップテンポ) を分離
// ============================================================
class BgmEngine {
  constructor() { this.ctx=null; this.playing=false; this.nodes=[]; this.loopTO=null; this.mode="home"; }
  _ctx() { if(!this.ctx) this.ctx=new(window.AudioContext||window.webkitAudioContext)(); return this.ctx; }
  _note(freq,t,dur,type="square",vol=0.07) {
    const ctx=this._ctx(), osc=ctx.createOscillator(), g=ctx.createGain();
    osc.type=type; osc.frequency.setValueAtTime(freq,t);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+0.01);
    g.gain.setValueAtTime(vol,t+dur-0.04); g.gain.linearRampToValueAtTime(0,t+dur);
    osc.connect(g); g.connect(ctx.destination); osc.start(t); osc.stop(t+dur); this.nodes.push(osc);
  }
  _perc(t,freq=120,decay=0.1,vol=0.13) {
    const ctx=this._ctx(), buf=ctx.createBuffer(1,ctx.sampleRate*decay,ctx.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3);
    const src=ctx.createBufferSource(); src.buffer=buf;
    const g=ctx.createGain(); g.gain.setValueAtTime(vol,t); g.gain.linearRampToValueAtTime(0,t+decay);
    const f=ctx.createBiquadFilter(); f.type="bandpass"; f.frequency.setValueAtTime(freq,t);
    src.connect(f); f.connect(g); g.connect(ctx.destination); src.start(t);
  }
  // ホーム用: ゆったりしたアンビエント風メロディ
  _loopHome() {
    if(!this.playing||this.mode!=="home") return;
    const ctx=this._ctx(), now=ctx.currentTime, bpm=90, beat=60/bpm;
    // ゆったりメロディ (Cメジャーペンタ)
    const mel=[523,659,784,659,523,440,523,659, 784,880,784,659,523,440,392,440];
    mel.forEach((f,i)=>this._note(f,now+i*beat*0.75,beat*0.65,"sine",0.055));
    // 低音パッド
    [130,130,146,146,130,130,174,174].forEach((f,i)=>this._note(f,now+i*beat,beat*0.85,"sine",0.04));
    // やわらかいコード
    [[523,659],[523,659],[440,554],[440,554],[392,494],[392,494],[349,440],[349,440]].forEach(([f1,f2],b)=>{
      this._note(f1,now+b*beat,beat*0.9,"sine",0.025);
      this._note(f2,now+b*beat,beat*0.9,"sine",0.025);
    });
    this.loopTO=setTimeout(()=>this._loopHome(), beat*12*1000-80);
  }
  // プレイ用: アップテンポ8bitゲーム風
  _loopPlay() {
    if(!this.playing||this.mode!=="play") return;
    const ctx=this._ctx(), now=ctx.currentTime, bpm=145, beat=60/bpm;
    const mel=[523,659,784,880,1047,880,784,659,523,659,784,1047,1319,1047,784,659];
    mel.forEach((f,i)=>this._note(f,now+i*beat*0.5,beat*0.42,"square",0.062));
    [130,130,196,196,130,130,196,196].forEach((f,i)=>this._note(f,now+i*beat,beat*0.38,"triangle",0.085));
    [[523,659,784],[523,659,784],[392,523,659],[392,523,659]].forEach((ch,b)=>
      ch.forEach(f=>this._note(f,now+b*beat*2+beat,beat*1.7,"sawtooth",0.02)));
    for(let i=0;i<8;i++){
      this._perc(now+i*beat,80,0.11); if(i%2===1) this._perc(now+i*beat,2800,0.06);
      this._perc(now+i*beat+beat*0.5,7000,0.04,0.08);
    }
    this.loopTO=setTimeout(()=>this._loopPlay(), beat*8*1000-60);
  }
  start(mode="home") {
    if(this.playing && this.mode===mode) return;
    this.stop();
    this.playing=true; this.mode=mode;
    const ctx=this._ctx();
    if(ctx.state==="suspended") ctx.resume();
    if(mode==="home") this._loopHome(); else this._loopPlay();
  }
  stop() {
    this.playing=false; clearTimeout(this.loopTO);
    this.nodes.forEach(n=>{try{n.stop();}catch{}}); this.nodes=[];
  }
  se(type) {
    if(!this.ctx && type!=="count" && type!=="go") return;
    const ctx=this._ctx(), now=ctx.currentTime;
    if(type==="correct") [880,1047,1319].forEach((f,i)=>this._note(f,now+i*0.07,0.13,"square",0.1));
    else if(type==="wrong"){ this._note(220,now,0.18,"sawtooth",0.1); this._note(165,now+0.1,0.13,"sawtooth",0.08); }
    else if(type==="finish") [523,659,784,1047,1319,1047,1319].forEach((f,i)=>this._note(f,now+i*0.09,0.18,"square",0.09));
    else if(type==="count") this._note(660,now,0.12,"square",0.13);
    else if(type==="go") [523,659,784,1047].forEach((f,i)=>this._note(f,now+i*0.07,0.15,"square",0.13));
  }
}
const bgm = new BgmEngine();

// ============================================================
// Storage
// ============================================================
// ── Firebase Storage（window.storageの代替）─────────────────
function _fbKey(key) {
  // Firestoreのドキュメントキーに使えない文字を置換
  return key.replace(/[:/\.#$[\]]/g, "_");
}
async function sGet(key, shared=false) {
  try {
    const col = shared ? "shared" : "private";
    const ref = doc(db, col, _fbKey(key));
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { value: snap.data().value };
  } catch(e) {
    console.warn("sGet error", key, e);
    return null;
  }
}
async function sSet(key, val, shared=false) {
  try {
    const col = shared ? "shared" : "private";
    const ref = doc(db, col, _fbKey(key));
    // merge:false で完全上書き（ルームデータの整合性を保つため）
    await setDoc(ref, { value: val, updatedAt: Date.now() });
    return true;
  } catch(e) {
    console.warn("sSet error", key, e);
    return null;
  }
}

// ============================================================
// CSS
// ============================================================
const css = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#f0f4f8;--surface:#fff;--primary:#2563eb;--pl:#dbeafe;
  --accent:#f59e0b;--danger:#ef4444;--success:#22c55e;
  --ion:#7c3aed;--ion-l:#ede9fe;--form:#16a34a;--form-l:#dcfce7;
  --text:#1e293b;--muted:#64748b;--border:#e2e8f0;
  --shadow:0 2px 12px rgba(0,0,0,.08);--r:12px;
}
body{font-family:'Noto Sans JP',sans-serif;background:var(--bg);color:var(--text);}
.app{min-height:100vh;display:flex;flex-direction:column;}
.hdr{
  background:linear-gradient(135deg,#0f0c29 0%,#1a1040 40%,#0d2060 100%);
  color:#fff;padding:0;
  box-shadow:0 2px 20px rgba(99,57,255,.4);
  position:relative;overflow:hidden;
}
.hdr-inner{
  position:relative;z-index:2;
  display:flex;align-items:center;
  padding:14px 16px 13px;
  gap:10px;
}
.hdr::before{
  content:"";position:absolute;top:-40px;left:-40px;
  width:160px;height:160px;
  background:radial-gradient(circle,rgba(99,57,255,.35) 0%,transparent 70%);
  border-radius:50%;
}
.hdr::after{
  content:"";position:absolute;bottom:-50px;right:-20px;
  width:140px;height:140px;
  background:radial-gradient(circle,rgba(14,165,233,.3) 0%,transparent 70%);
  border-radius:50%;
}
.hdr-orb{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:200px;height:200px;
  background:radial-gradient(circle,rgba(139,92,246,.15) 0%,transparent 65%);
  border-radius:50%;pointer-events:none;
}
.hdr-title-wrap{flex:1;text-align:center;}
.hdr-app-name{
  font-size:1.25rem;font-weight:900;letter-spacing:.5px;
  background:linear-gradient(90deg,#a5f3fc,#c4b5fd,#818cf8);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;
  filter:drop-shadow(0 0 8px rgba(139,92,246,.6));
  line-height:1.1;
}
.hdr-tagline{font-size:.65rem;color:rgba(165,243,252,.7);letter-spacing:1.5px;margin-top:1px;font-weight:400;}
.hdr.ion-mode .hdr-app-name{background:linear-gradient(90deg,#c4b5fd,#a78bfa,#7c3aed);-webkit-background-clip:text;background-clip:text;}
.hdr h1{font-size:1.1rem;font-weight:900;flex:1;}
.main{flex:1;padding:16px 13px;max-width:520px;margin:0 auto;width:100%;}
.card{background:#fff;border-radius:var(--r);padding:20px;box-shadow:var(--shadow);margin-bottom:13px;}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 20px;border-radius:8px;border:none;font-family:inherit;font-size:.95rem;font-weight:700;cursor:pointer;transition:all .13s;}
.btn:active{transform:scale(.97);}
.btn-p{background:var(--primary);color:#fff;}.btn-p:hover{background:#1d4ed8;}
.btn-ion{background:var(--ion);color:#fff;}.btn-ion:hover{background:#6d28d9;}
.btn-s{background:var(--border);color:var(--text);}.btn-s:hover{background:#cbd5e1;}
.btn-a{background:var(--accent);color:#fff;}.btn-a:hover{background:#d97706;}
.btn-g{background:var(--success);color:#fff;}.btn-g:hover{background:#16a34a;}
.btn-blk{width:100%;}.btn-sm{padding:6px 13px;font-size:.82rem;}
.ig{margin-bottom:13px;}
.ig label{display:block;font-weight:700;margin-bottom:5px;font-size:.86rem;}
.inp{width:100%;padding:10px 12px;border:2px solid var(--border);border-radius:8px;font-family:inherit;font-size:.95rem;color:var(--text);outline:none;transition:border-color .13s;}
.inp:focus{border-color:var(--primary);}
.tit{text-align:center;padding:5px 0 13px;}
.tit h2{font-size:1.4rem;font-weight:900;color:var(--primary);margin-bottom:3px;}
.tit h2.ion{color:var(--ion);}
.tit p{color:var(--muted);font-size:.86rem;}
/* hero header */
.hero{
  background:linear-gradient(145deg,#0f0c29 0%,#1e1060 35%,#0d2060 65%,#061630 100%);
  border-radius:16px;
  padding:32px 20px 26px;
  text-align:center;
  margin-bottom:16px;
  position:relative;
  overflow:hidden;
  box-shadow:0 8px 32px rgba(99,57,255,.45), 0 0 0 1px rgba(139,92,246,.2);
}
.hero-glow1{
  position:absolute;top:-60px;left:-40px;
  width:200px;height:200px;
  background:radial-gradient(circle,rgba(139,92,246,.4) 0%,transparent 65%);
  border-radius:50%;pointer-events:none;
}
.hero-glow2{
  position:absolute;bottom:-60px;right:-30px;
  width:180px;height:180px;
  background:radial-gradient(circle,rgba(14,165,233,.35) 0%,transparent 65%);
  border-radius:50%;pointer-events:none;
}
.hero-glow3{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:280px;height:120px;
  background:radial-gradient(ellipse,rgba(99,102,241,.15) 0%,transparent 70%);
  pointer-events:none;
}
.hero-ring{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:240px;height:240px;
  border:1px solid rgba(139,92,246,.12);
  border-radius:50%;pointer-events:none;
}
.hero-ring2{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:180px;height:180px;
  border:1px solid rgba(14,165,233,.1);
  border-radius:50%;pointer-events:none;
}
.hero-dots{
  position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px);
  background-size:20px 20px;
}
.hero-icons-deco{
  position:absolute;top:12px;left:14px;
  font-size:.95rem;opacity:.25;pointer-events:none;
  display:flex;flex-direction:column;gap:14px;
}
.hero-icons-deco2{
  position:absolute;top:12px;right:14px;
  font-size:.95rem;opacity:.25;pointer-events:none;
  display:flex;flex-direction:column;gap:14px;
}
.hero-content{position:relative;z-index:2;}
.hero-badge{
  display:inline-block;
  background:rgba(139,92,246,.25);
  border:1px solid rgba(139,92,246,.5);
  border-radius:20px;padding:3px 12px;
  font-size:.68rem;font-weight:700;letter-spacing:1.5px;
  color:#c4b5fd;margin-bottom:12px;
  text-transform:uppercase;
}
.hero-main-icon{font-size:3.2rem;display:block;margin-bottom:6px;filter:drop-shadow(0 0 12px rgba(139,92,246,.8)) drop-shadow(0 2px 4px rgba(0,0,0,.4));}
.hero-app-title{
  font-size:1.8rem;font-weight:900;letter-spacing:-.5px;
  background:linear-gradient(135deg,#e0f2fe 0%,#a5b4fc 40%,#c4b5fd 70%,#7dd3fc 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:3px;line-height:1.15;
  filter:drop-shadow(0 0 16px rgba(165,180,252,.5));
}
.hero-sub-title{font-size:.75rem;color:rgba(165,243,252,.7);letter-spacing:1px;margin-bottom:18px;font-weight:400;}
.hero-nick{
  display:inline-flex;align-items:center;gap:7px;
  background:rgba(255,255,255,.1);
  backdrop-filter:blur(8px);
  border:1px solid rgba(255,255,255,.2);
  border-radius:30px;padding:8px 16px;
  color:#fff;font-weight:700;font-size:.9rem;
  box-shadow:0 2px 8px rgba(0,0,0,.2);
}
.hero-nick-btn{
  background:linear-gradient(135deg,rgba(139,92,246,.4),rgba(99,102,241,.4));
  border:1px solid rgba(139,92,246,.5);
  border-radius:20px;padding:5px 12px;
  color:#e0e7ff;font-family:inherit;font-size:.78rem;font-weight:700;cursor:pointer;
  transition:all .13s;
}
.hero-nick-btn:hover{background:linear-gradient(135deg,rgba(139,92,246,.6),rgba(99,102,241,.6));}
.hero-input-wrap{
  background:rgba(255,255,255,.08);
  border:1px solid rgba(139,92,246,.3);
  border-radius:12px;padding:14px;margin-top:4px;
}
.hero-input{
  width:100%;padding:10px 14px;
  border:1px solid rgba(139,92,246,.5);border-radius:9px;
  background:rgba(255,255,255,.1);color:#fff;
  font-family:inherit;font-size:.95rem;font-weight:700;outline:none;
  transition:border-color .13s;
}
.hero-input::placeholder{color:rgba(255,255,255,.4);}
.hero-input:focus{border-color:rgba(165,180,252,.8);box-shadow:0 0 0 3px rgba(139,92,246,.2);}
.hero-save-btn{
  background:linear-gradient(135deg,#6366f1,#8b5cf6);
  border:none;border-radius:9px;
  padding:9px 0;color:#fff;
  font-family:inherit;font-size:.9rem;font-weight:700;cursor:pointer;
  transition:all .13s;box-shadow:0 2px 8px rgba(99,102,241,.4);
}
.hero-save-btn:hover{opacity:.9;transform:translateY(-1px);}
.hero-nologin{
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(245,158,11,.15);border:1px solid rgba(245,158,11,.4);
  border-radius:20px;padding:6px 14px;
  color:#fcd34d;font-size:.8rem;font-weight:700;
}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:13px 0;}
.sc{
  border:2px solid var(--border);border-radius:var(--r);padding:15px 10px;
  cursor:pointer;text-align:center;transition:all .15s;background:#fff;
  position:relative;overflow:hidden;
}
.sc::after{content:"";position:absolute;inset:0;opacity:0;background:radial-gradient(circle at 50% 0%,rgba(37,99,235,.08),transparent 70%);transition:opacity .2s;}
.sc:hover{border-color:var(--primary);box-shadow:0 4px 14px rgba(37,99,235,.15);transform:translateY(-2px);}
.sc:hover::after{opacity:1;}
.sc.on{border-color:var(--primary);background:var(--pl);}
.sc.ion-sc:hover{border-color:var(--ion);box-shadow:0 4px 14px rgba(124,58,237,.15);}
.sc.ion-sc.on{border-color:var(--ion);background:var(--ion-l);}
.sc.form-sc:hover{border-color:#16a34a;box-shadow:0 4px 14px rgba(22,163,74,.15);}
.sc .ic{font-size:1.9rem;margin-bottom:5px;display:block;}
.sc .nm{font-weight:700;font-size:.92rem;}
.sc .ds{font-size:.72rem;color:var(--muted);margin-top:2px;}
/* quiz */
.qhd{display:flex;justify-content:space-between;align-items:center;margin-bottom:13px;}
.tmr{font-family:'Space Mono',monospace;font-size:1.3rem;font-weight:700;color:var(--primary);}
.tmr.urg{color:var(--danger);animation:pulse .5s infinite alternate;}
@keyframes pulse{from{opacity:1}to{opacity:.4}}
.scd{font-weight:700;color:var(--primary);font-family:'Space Mono',monospace;}
.fb{height:4px;border-radius:2px;margin-bottom:9px;transition:background .22s;}
.fb-ok{background:var(--success);}.fb-ng{background:var(--danger);}.fb-no{background:var(--border);}
.qc{text-align:center;margin-bottom:16px;}
.ql{font-size:.8rem;color:var(--muted);margin-bottom:7px;font-weight:700;letter-spacing:.5px;}
.qe{font-family:'Space Mono',monospace;font-size:3rem;font-weight:700;line-height:1.1;}
.qe.sm{font-size:1.7rem;font-family:'Noto Sans JP',sans-serif;}
.qe.ion-q{font-size:2rem;font-family:'Noto Sans JP',sans-serif;color:var(--ion);}
.chs{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.ch{padding:12px 7px;border:2px solid var(--border);border-radius:9px;background:#fff;font-family:'Space Mono',monospace;font-size:1rem;font-weight:700;cursor:pointer;transition:all .12s;text-align:center;line-height:1.3;}
.ch.cn{font-family:'Noto Sans JP',sans-serif;font-size:.88rem;}
.ch:hover:not(.dis){border-color:var(--primary);background:var(--pl);}
.ch.ion-ch:hover:not(.dis){border-color:var(--ion);background:var(--ion-l);}
.ch.ok{border-color:var(--success);background:#dcfce7;color:#166534;}
.ch.ng{border-color:var(--danger);background:#fee2e2;color:#991b1b;}
.ch.dis{cursor:default;}
/* countdown */
.cdown{position:fixed;inset:0;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;z-index:200;flex-direction:column;}
.cdn{font-family:'Space Mono',monospace;font-size:6.5rem;font-weight:700;color:#fff;animation:cdp .85s ease-out;}
.cdgo{font-size:3.8rem;font-weight:900;color:var(--accent);animation:cdp .5s ease-out;}
@keyframes cdp{0%{transform:scale(1.9);opacity:0}60%{transform:scale(.88)}100%{transform:scale(1);opacity:1}}
/* result */
.rbig{font-size:3.1rem;font-weight:900;color:var(--primary);font-family:'Space Mono',monospace;line-height:1;}
.s3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:13px 0;}
.sb{text-align:center;padding:10px;background:var(--bg);border-radius:8px;}
.sv{font-size:1.2rem;font-weight:700;font-family:'Space Mono',monospace;}
.sk{font-size:.71rem;color:var(--muted);margin-top:2px;}
.mi{display:flex;align-items:flex-start;gap:9px;padding:8px 0;border-bottom:1px solid var(--border);font-size:.86rem;}
.mi:last-child{border-bottom:none;}
.msym{font-family:'Space Mono',monospace;font-weight:700;font-size:1rem;width:36px;flex-shrink:0;}
.mans{color:var(--success);font-weight:700;}.myrs{color:var(--danger);font-size:.78rem;}
/* ranking */
.tabs{display:flex;gap:3px;margin-bottom:13px;background:var(--bg);padding:3px;border-radius:9px;}
.tab{flex:1;padding:6px 2px;border:none;background:none;border-radius:7px;font-family:inherit;font-size:.78rem;font-weight:700;cursor:pointer;color:var(--muted);transition:all .12s;}
.tab.on{background:#fff;color:var(--primary);box-shadow:var(--shadow);}
.rlist{list-style:none;}
.ri{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);}
.ri:last-child{border-bottom:none;}
.rn{font-family:'Space Mono',monospace;font-weight:700;font-size:1rem;width:24px;text-align:center;color:var(--muted);}
.rn1{color:#f59e0b;}.rn2{color:#94a3b8;}.rn3{color:#b45309;}
.rname{flex:1;font-weight:700;}.rsc{font-family:'Space Mono',monospace;font-weight:700;color:var(--primary);}
.rhl{background:var(--pl);border-radius:8px;padding:10px 7px;}
.bdg{display:inline-block;padding:2px 6px;border-radius:20px;font-size:.71rem;font-weight:700;}
.bh{background:#fef3c7;color:#92400e;}.by{background:var(--pl);color:var(--primary);}
.bion{background:var(--ion-l);color:var(--ion);}
.bform{background:#dcfce7;color:#166534;}
.btn-form{background:#16a34a;color:#fff;}.btn-form:hover{background:#15803d;}
.sc.form-sc:hover{border-color:#16a34a;}.sc.form-sc.on{border-color:#16a34a;background:#dcfce7;}
/* battle */
.rc{text-align:center;font-family:'Space Mono',monospace;font-size:2.3rem;font-weight:700;letter-spacing:7px;color:var(--primary);background:var(--pl);padding:16px;border-radius:var(--r);margin:9px 0;}
.pli{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);}
.pli:last-child{border-bottom:none;}
.pldot{width:8px;height:8px;border-radius:50%;background:var(--success);}
.btr{display:flex;align-items:center;gap:10px;padding:10px;border-radius:8px;margin-bottom:6px;background:var(--bg);}
/* range */
.rwrap{padding:7px 0;}
.rlbls{display:flex;justify-content:space-between;font-size:.75rem;color:var(--muted);margin-top:3px;}
input[type=range]{width:100%;accent-color:var(--primary);}
.pbtns{display:flex;flex-wrap:wrap;gap:5px;margin:8px 0;}
.pbtn{padding:4px 9px;border-radius:20px;border:2px solid var(--border);background:#fff;font-family:inherit;font-size:.75rem;font-weight:700;cursor:pointer;transition:all .12s;}
.pbtn.on{border-color:var(--primary);background:var(--pl);color:var(--primary);}
/* modal */
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:300;padding:16px;}
.modal{background:#fff;border-radius:var(--r);padding:24px;max-width:400px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,.2);}
.modal h3{font-size:1.2rem;font-weight:900;margin-bottom:10px;text-align:center;}
.modal p{color:var(--muted);font-size:.9rem;text-align:center;margin-bottom:18px;}
/* utils */
.fb2{display:flex;justify-content:space-between;align-items:center;}
.gap8{display:flex;gap:8px;}
.tc{text-align:center;}.muted{color:var(--muted);font-size:.86rem;}
.mb8{margin-bottom:8px;}.mb13{margin-bottom:13px;}
/* memo screen */
.memo-tabs{display:flex;gap:4px;margin-bottom:13px;flex-wrap:wrap;}
.memo-tab{padding:5px 11px;border-radius:20px;border:2px solid var(--border);background:#fff;font-family:inherit;font-size:.78rem;font-weight:700;cursor:pointer;transition:all .12s;color:var(--muted);}
.memo-tab.on{border-color:var(--primary);background:var(--pl);color:var(--primary);}
.memo-tab.ion-t.on{border-color:var(--ion);background:var(--ion-l);color:var(--ion);}
.memo-tab.form-t.on{border-color:var(--form);background:var(--form-l);color:var(--form);}
.memo-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;}
.memo-card{background:#fff;border-radius:9px;padding:11px 10px;box-shadow:0 1px 6px rgba(0,0,0,.07);display:flex;flex-direction:column;gap:3px;}
.memo-sym{font-family:"Space Mono",monospace;font-size:1.3rem;font-weight:700;color:var(--primary);line-height:1.1;}
.memo-sym.ion{color:var(--ion);font-size:1rem;}
.memo-sym.form{color:var(--form);font-size:1rem;}
.memo-name{font-size:.8rem;color:var(--text);font-weight:700;}
.memo-sub{font-size:.7rem;color:var(--muted);}
.memo-num{font-size:.68rem;color:var(--muted);font-family:"Space Mono",monospace;}
.footer-copy{text-align:center;padding:18px 10px 10px;color:var(--muted);font-size:.72rem;line-height:1.6;}
/* how-to modal */
.howto-modal{background:#fff;border-radius:var(--r);padding:0;max-width:420px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,.25);max-height:85vh;overflow-y:auto;}
.howto-header{background:linear-gradient(135deg,#0f0c29,#1a1040,#0d2060);padding:20px;border-radius:var(--r) var(--r) 0 0;position:relative;}
.howto-header h2{color:#fff;font-size:1.15rem;font-weight:900;margin:0;}
.howto-header p{color:rgba(255,255,255,.7);font-size:.78rem;margin-top:3px;}
.howto-close{position:absolute;top:14px;right:14px;background:rgba(255,255,255,.2);border:none;color:#fff;border-radius:50%;width:28px;height:28px;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.howto-body{padding:16px;}
.howto-section{margin-bottom:16px;}
.howto-section h3{font-size:.88rem;font-weight:800;margin-bottom:8px;padding-bottom:4px;border-bottom:2px solid var(--border);}
.howto-section p{font-size:.83rem;color:var(--text);line-height:1.6;margin-bottom:3px;}
.howto-row{display:flex;gap:10px;margin-bottom:6px;align-items:flex-start;font-size:.83rem;}
.howto-icon{font-size:1.1rem;flex-shrink:0;width:22px;}
.howto-text{flex:1;color:var(--text);line-height:1.5;}
.howto-text b{color:var(--primary);}
.mode-desc{font-size:.75rem;color:var(--muted);background:var(--bg);border-radius:6px;padding:3px 8px;margin-top:2px;display:inline-block;}
/* ルール短文 */
.rule-tag{font-size:.72rem;color:var(--muted);background:var(--bg);border-radius:5px;padding:2px 7px;margin-top:3px;display:block;line-height:1.5;}
/* ranking card */
.rcard{background:#fff;border-radius:10px;padding:12px;box-shadow:var(--shadow);margin-bottom:8px;border-left:4px solid var(--primary);}
.rcard.me{border-left-color:var(--accent);background:#fffbeb;}
.rcard-top{display:flex;align-items:center;gap:8px;margin-bottom:5px;}
.rcard-rank{font-family:'Space Mono',monospace;font-weight:700;font-size:1.1rem;width:30px;}
.rcard-name{flex:1;font-weight:700;font-size:.95rem;}
.rcard-score{font-family:'Space Mono',monospace;font-weight:700;color:var(--primary);font-size:1.1rem;}
.rcard-meta{display:flex;gap:8px;flex-wrap:wrap;font-size:.72rem;color:var(--muted);}
.rcard-stat{background:var(--bg);padding:2px 7px;border-radius:10px;}
`;

// ── Countdown ──────────────────────────────────────────────────
function Countdown({ onDone }) {
  const [n, setN] = useState(3);
  const [go, setGo] = useState(false);
  useEffect(() => {
    bgm.se("count");
    const t1=setTimeout(()=>{setN(2);bgm.se("count");},1000);
    const t2=setTimeout(()=>{setN(1);bgm.se("count");},2000);
    const t3=setTimeout(()=>{setGo(true);bgm.se("go");},3000);
    const t4=setTimeout(()=>onDone(),3500);
    return ()=>[t1,t2,t3,t4].forEach(clearTimeout);
  },[]);
  return <div className="cdown">{go?<div className="cdgo">GO! 🚀</div>:<div className="cdn">{n}</div>}</div>;
}

// ── ランキング登録モーダル ─────────────────────────────────────
function RankingModal({ score, correct, total, nickname, quizMode, maxNum, subLevel="junior", difficulty="normal", onDone }) {
  const [saving, setSaving] = useState(false);
  const acc = total > 0 ? Math.round(correct/total*100) : 0;

  const doSave = async () => {
    setSaving(true);
    try {
      const key = quizMode==="ion" ? "ranking:ion"
        : quizMode==="formula" ? "ranking:formula"
        : quizMode==="mol" ? "ranking:mol"
        : "ranking:v2";
      const res = await sGet(key, true);
      let all = [];
      try { if(res) all=JSON.parse(res.value); } catch{}
      const filtered = all.filter(r => {
        if(r.name!==nickname) return true;
        if(quizMode==="ion"||quizMode==="formula") return r.subLevel!==subLevel;
        if(quizMode==="mol") return r.molMode!==subLevel;
        return r.maxNum!==maxNum;
      });
      const entry = { name:nickname, score, correct, total, acc, quizMode, subLevel, maxNum, difficulty, date:Date.now() };
      filtered.push(entry);
      filtered.sort((a,b)=>b.score-a.score);
      await sSet(key, JSON.stringify(filtered.slice(0,100)), true);
      setSaving(false);
      onDone(true);
    } catch(e) {
      console.error("doSave error:", e);
      setSaving(false);
      onDone(false);
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>🏆 スコアを登録しますか？</h3>
        <div style={{textAlign:"center",marginBottom:12}}>
          <div style={{fontSize:"2rem",fontWeight:900,color:"var(--primary)"}}>{score}点</div>
          <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:6,fontSize:".85rem"}}>
            <span style={{background:"var(--bg)",padding:"3px 10px",borderRadius:10}}>正解 <b>{correct}/{total}</b></span>
            <span style={{background:"var(--bg)",padding:"3px 10px",borderRadius:10}}>正答率 <b>{acc}%</b></span>
          </div>
        </div>
        <p>{nickname} さんのスコアをランキングに載せます</p>
        <div style={{display:"flex",gap:10,flexDirection:"column"}}>
          <button className="btn btn-g btn-blk" onClick={doSave} disabled={saving}>
            {saving?"保存中...":"✅ ランキングに登録する"}
          </button>
          <button className="btn btn-s btn-blk" onClick={()=>onDone(false)}>登録しない</button>
        </div>
      </div>
    </div>
  );
}

// ── 元素難易度自動判定バッジ ─────────────────────────────────
// A案：固定レンジ / B案：中央値ベース
// 両方表示して参考にできるようにする
// A案（固定レンジ）で難易度を自動判定して返す
function getElementAutodifficulty(maxNum) {
  if (maxNum <= 20) return "easy";
  if (maxNum <= 50) return "normal";
  return "hard";
}

function ElementDifficultyBadge({ maxNum=20 }) {
  const diff = getElementAutodifficulty(maxNum);
  const opt = DIFFICULTY_OPTIONS.find(o=>o.value===diff);
  if (!opt) return null;
  return (
    <div style={{marginTop:8,display:"flex",gap:6,alignItems:"center"}}>
      <span style={{fontSize:".75rem",color:"var(--muted)"}}>難易度：</span>
      <span style={{background:opt.light,color:opt.color,padding:"3px 12px",borderRadius:12,fontSize:".82rem",fontWeight:700}}>
        {opt.label}
      </span>
    </div>
  );
}

// ── RangeSelector（ダブルスライダー）──────────────────────────
const RANGE_PRESETS = [
  { label:"1〜20", min:1,  max:20  },
  { label:"1〜50", min:1,  max:50  },
  { label:"51〜103",min:51, max:103 },
  { label:"全範囲", min:1,  max:118 },
];

function RangeSelector({ minNum=1, maxNum=20, onChangeMin, onChangeMax, onChange }) {
  // onChangeがある場合はシングルスライダー互換（maxのみ）
  const isDouble = !!onChangeMin;
  const mn = isDouble ? minNum : 1;
  const mx = maxNum;
  const count = ALL_ELEMENTS.filter(e=>e.number>=mn&&e.number<=mx).length;

  const handlePreset = (p) => {
    if(isDouble){ onChangeMin(p.min); onChangeMax(p.max); }
    else onChange(p.max);
  };

  return (
    <div className="rwrap">
      <div className="fb2 mb8">
        <span style={{fontWeight:700,fontSize:".88rem"}}>
          出題範囲: {mn}〜{mx}番
        </span>
        <span className="muted">{count}元素</span>
      </div>
      {isDouble ? (
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <div style={{display:"flex",alignItems:"center",gap:8,fontSize:".8rem"}}>
            <span style={{width:28,textAlign:"right",color:"var(--muted)"}}>下限</span>
            <input type="range" min={1} max={118} value={mn}
              onChange={e=>{const v=Number(e.target.value);if(v<=mx-3)onChangeMin(v);}}
              style={{flex:1}}/>
            <span style={{width:32,fontWeight:700,color:"var(--primary)"}}>{mn}番</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,fontSize:".8rem"}}>
            <span style={{width:28,textAlign:"right",color:"var(--muted)"}}>上限</span>
            <input type="range" min={1} max={118} value={mx}
              onChange={e=>{const v=Number(e.target.value);if(v>=mn+3)onChangeMax(v);}}
              style={{flex:1}}/>
            <span style={{width:32,fontWeight:700,color:"var(--primary)"}}>{mx}番</span>
          </div>
        </div>
      ) : (
        <input type="range" min={4} max={118} value={mx} onChange={e=>onChange(Number(e.target.value))}/>
      )}
      <div className="rlbls" style={{marginTop:4}}><span>1</span><span>20</span><span>50</span><span>82</span><span>103</span><span>118</span></div>
      <div className="pbtns">
        {RANGE_PRESETS.map(p=>(
          <button key={p.label}
            className={`pbtn ${mn===p.min&&mx===p.max?"on":""}`}
            onClick={()=>handlePreset(p)}>{p.label}</button>
        ))}
      </div>
    </div>
  );
}


// ── 共通フッター ────────────────────────────────────────────
function AppFooter() {
  return (
    <div style={{textAlign:"center",padding:"14px 10px 8px",color:"var(--muted)",fontSize:".72rem",lineHeight:1.7,borderTop:"1px solid var(--border)",marginTop:8}}>
      © 2026 Narukawa All Rights Reserved.<br/>
      本アプリの無断転載・再配布を禁止します。
    </div>
  );
}

// ── 遊び方モーダル ──────────────────────────────────────────
function HowToModal({ onClose }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="howto-modal" onClick={e=>e.stopPropagation()}>
        <div className="howto-header">
          <button className="howto-close" onClick={onClose}>✕</button>
          <h2>📖 遊び方・点数ルール</h2>
          <p>CHEM BATTLE の全モードを解説</p>
        </div>
        <div className="howto-body">

          {/* 共通 */}
          <div className="howto-section">
            <h3>共通ルール</h3>
            <p>・ニックネームを登録してプレイ。スコアはランキングに登録できる。</p>
            <p>・4択から正しい答えをタップで選ぶ。</p>
            <p>・難易度：易（明らかに違う選択肢）→ 普通 → 難（非常に似たダミー）</p>
          </div>

          {/* 暗記クイズ */}
          <div className="howto-section">
            <h3 style={{color:"var(--primary)"}}>⚛️⚡🧬 暗記クイズ（60秒）</h3>
            <p>・60秒間ひたすら出題。何問正解できるか挑戦！</p>
            <p>・出題方向を選べる：記号→名前 / 名前→記号 / ランダム</p>
            <p>・対戦：ルームコードを共有して同時スタート、スコアを比較</p>
            <p style={{marginTop:6,padding:"8px 10px",background:"var(--bg)",borderRadius:7,fontSize:".78rem"}}>
              <b>スコア</b> ＝ 正解時の残り秒数の合計 ＋ 正答率²×200点
            </p>
          </div>

          {/* mol計算 */}
          <div className="howto-section">
            <h3 style={{color:"#6366f1"}}>🧮 mol計算ドリル（5分）</h3>
            <p>・自分で計算して4択から選ぶ。10問・5分制限。</p>
            <p>・ヒント：最大3段階（①変換の方向 ②使う値 ③計算手順）。答えは表示しない。</p>
            <p>・スキップ：次の問題へ。ミスとしてカウント。</p>
            <p>・モード：入門（g↔mol）/ 基礎（L↔mol・個数）/ 応用（2段変換）</p>
            <p>・対戦モードあり。同じ問題を解いて正解数を比較。</p>
            <p style={{marginTop:6,padding:"8px 10px",background:"var(--bg)",borderRadius:7,fontSize:".78rem"}}>
              <b>スコア</b> ＝ 正解数×100 ＋ 正答率²×100 ＋ 残り時間×0.5
            </p>
          </div>

          {/* 原子量 */}
          <div className="howto-section">
            <h3>原子量（mol計算用）</h3>
            <div style={{background:"#1e293b",color:"#94a3b8",borderRadius:7,padding:"9px 12px",fontFamily:"monospace",fontSize:".75rem",lineHeight:1.9}}>
              H=1.0　C=12　O=16　N=14<br/>
              Na=23　Cl=35.5　Cu=64　S=32<br/>
              アボガドロ数: 6.0×10²³ /mol
            </div>
          </div>

          <button className="btn btn-p btn-blk" onClick={onClose} style={{marginTop:4}}>閉じる</button>
        </div>
      </div>
    </div>
  );
}

// ── HomeScreen ─────────────────────────────────────────────────
function HomeScreen({ nickname, onSetNickname, onSolo, onBattle, onRanking, onMemo, onMol, bgmOn, onToggleBgm, todayCount=0 }) {
  const [edit,setEdit]=useState(false);
  const [ni,setNi]=useState(nickname||"");
  const [showHowTo,setShowHowTo]=useState(false);
  const save=()=>{if(ni.trim()){onSetNickname(ni.trim());setEdit(false);}};
  return (
    <div>
      {showHowTo&&<HowToModal onClose={()=>setShowHowTo(false)}/>}
      {/* ── Hero ── */}
      {/* ── Hero Banner ── */}
      <div style={{borderRadius:"14px",overflow:"hidden",marginBottom:12,boxShadow:"0 4px 20px rgba(0,0,0,.25)"}}>
        <img src="/hero.png" alt="CHEM BATTLE" style={{width:"100%",display:"block",objectFit:"cover"}}/>
      </div>

      {/* ── 今日のプレイヤー数 ── */}
      {todayCount>0&&(
        <div style={{textAlign:"center",marginBottom:8,fontSize:".78rem",color:"var(--muted)"}}>
          🎮 今日 <b style={{color:"var(--primary)",fontSize:"1rem"}}>{todayCount}</b> 人目のプレイヤー！
        </div>
      )}
      {/* ── ニックネーム入力 ── */}
      <div style={{marginBottom:12,background:"linear-gradient(135deg,#0f0c29,#1a1040)",borderRadius:12,padding:"14px 16px"}}>
        {!nickname||edit?(
          <div>
            <div style={{color:"rgba(255,255,255,.7)",fontSize:".8rem",marginBottom:8,textAlign:"center"}}>ニックネームを登録してスタート！</div>
            <div style={{display:"flex",gap:8}}>
              <input className="hero-input" style={{flex:1}} value={ni} onChange={e=>setNi(e.target.value)}
                placeholder="ニックネームを入力" maxLength={12}
                onKeyDown={e=>e.key==="Enter"&&save()} autoFocus={edit}/>
              <button className="hero-save-btn" style={{flex:"0 0 auto",padding:"0 14px"}} onClick={save}>✓ 保存</button>
              {edit&&<button className="hero-save-btn" style={{flex:"0 0 auto",padding:"0 10px",background:"rgba(255,255,255,.12)",color:"rgba(255,255,255,.7)"}} onClick={()=>setEdit(false)}>✕</button>}
            </div>
          </div>
        ):(
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
            <div className="hero-nick">👤 {nickname}</div>
            <button className="hero-nick-btn" onClick={()=>setEdit(true)}>変更</button>
          </div>
        )}
      </div>

      <div style={{marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:".78rem",color:"var(--primary)",marginBottom:7,paddingLeft:4,letterSpacing:"1px",textTransform:"uppercase"}}>⚛️ 元素クイズ</div>
        <div className="g2">
          <div className="sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onSolo("element")}>
            <div className="ic">🎮</div><div className="nm">ひとりで挑戦</div>
            <span className="rule-tag">60秒でたくさん解け！</span>
          </div>
          <div className="sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onBattle("element")}>
            <div className="ic">⚔️</div><div className="nm">対戦する</div>
            <span className="rule-tag">同時に解いてスコア比較</span>
          </div>
        </div>
      </div>

      <div style={{marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:".78rem",color:"var(--ion)",marginBottom:7,paddingLeft:4,letterSpacing:"1px",textTransform:"uppercase"}}>⚡ イオンクイズ</div>
        <div className="g2">
          <div className="sc ion-sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onSolo("ion")}>
            <div className="ic">🎮</div><div className="nm">ひとりで挑戦</div>
            <span className="rule-tag">60秒でたくさん解け！</span>
          </div>
          <div className="sc ion-sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onBattle("ion")}>
            <div className="ic">⚔️</div><div className="nm">対戦する</div>
            <span className="rule-tag">同時に解いてスコア比較</span>
          </div>
        </div>
      </div>

      <div style={{marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:".78rem",color:"var(--form)",marginBottom:7,paddingLeft:4,letterSpacing:"1px",textTransform:"uppercase"}}>🧬 化学式クイズ</div>
        <div className="g2">
          <div className="sc form-sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onSolo("formula")}>
            <div className="ic">🎮</div><div className="nm">ひとりで挑戦</div>
            <span className="rule-tag">60秒でたくさん解け！</span>
          </div>
          <div className="sc form-sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onBattle("formula")}>
            <div className="ic">⚔️</div><div className="nm">対戦する</div>
            <span className="rule-tag">同時に解いてスコア比較</span>
          </div>
        </div>
      </div>

      <div style={{marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:".78rem",color:"#6366f1",marginBottom:7,paddingLeft:4,letterSpacing:"1px",textTransform:"uppercase"}}>🧮 mol計算ドリル</div>
        <div className="g2">
          <div className="sc" style={!nickname?{opacity:.5,cursor:"not-allowed",borderColor:"#6366f1"}:{borderColor:"#6366f1"}} onClick={()=>nickname&&onMol("solo")}>
            <div className="ic">🎮</div>
            <div className="nm">ひとりで挑戦</div>
            <span className="rule-tag">5分以内に10問解け！</span>
          </div>
          <div className="sc" style={!nickname?{opacity:.5,cursor:"not-allowed",borderColor:"#6366f1"}:{borderColor:"#6366f1"}} onClick={()=>nickname&&onMol("battle")}>
            <div className="ic">⚔️</div>
            <div className="nm">対戦する</div>
            <span className="rule-tag">同時に解いて正解数比較</span>
          </div>
        </div>
      </div>

      {!nickname&&(
        <div className="tc" style={{marginBottom:10}}>
          <span className="hero-nologin">✋ ニックネームを登録してスタート！</span>
        </div>
      )}

      <div style={{display:"flex",gap:8,marginBottom:8}}>
        <button className="btn btn-s" style={{flex:1}} onClick={()=>setShowHowTo(true)}>📋 遊び方</button>
        <button className="btn btn-s" style={{flex:1}} onClick={onMemo}>📖 暗記リスト</button>
        <button className="btn btn-s" style={{flex:1}} onClick={onRanking}>🏆 ランキング</button>
        <button className="btn btn-s" style={{flex:"0 0 auto",padding:"10px 12px"}} onClick={onToggleBgm}>{bgmOn?"🔊":"🔇"}</button>
      </div>
      <AppFooter/>
    </div>
  );
}

// ── SetupScreen ────────────────────────────────────────────────
const DIRECTION_OPTIONS = {
  element: [
    { value:"s2n", desc:"記号 → 名前", detail:"元素記号を見て名前を答える" },
    { value:"n2s", desc:"名前 → 記号", detail:"元素名を見て記号を答える" },
    { value:"random", desc:"ランダム", detail:"どちらもランダムに出題" },
  ],
  ion: [
    { value:"f2n", desc:"式 → 名前", detail:"イオン式を見て名前を答える" },
    { value:"n2f", desc:"名前 → 式", detail:"イオン名を見てイオン式を答える" },
    { value:"random", desc:"ランダム", detail:"どちらもランダムに出題" },
  ],
  formula: [
    { value:"f2n", desc:"化学式 → 名前", detail:"化学式を見て物質名を答える" },
    { value:"n2f", desc:"名前 → 化学式", detail:"物質名を見て化学式を答える" },
    { value:"random", desc:"ランダム", detail:"どちらもランダムに出題" },
  ],
};

const LEVEL_LABELS = {
  ion:     { junior:"中学レベル（17種）", senior:"高校レベル（39種）" },
  formula: { junior:"中学レベル（27種）", senior:"高校レベル（58種）" },
};

const DIFFICULTY_OPTIONS = [
  { value:"easy",   label:"😊 易",   desc:"明らかに違う選択肢",     color:"#22c55e", light:"#dcfce7" },
  { value:"normal", label:"😐 普通", desc:"一部似ている選択肢",     color:"#f59e0b", light:"#fef3c7" },
  { value:"hard",   label:"😈 難",   desc:"非常に似たダミーのみ",   color:"#ef4444", light:"#fee2e2" },
];

function SetupScreen({ onStart, onBack, title, quizMode, isBattle=false }) {
  const [maxNum,setMaxNum]=useState(20);
  const [minNum,setMinNum]=useState(1);
  const [directionMode,setDirectionMode]=useState(quizMode==="ion"||quizMode==="formula"?"n2f":"s2n");
  const [subLevel,setSubLevel]=useState("junior");
  const [difficulty,setDifficulty]=useState("normal");
  const isIon = quizMode==="ion";
  const isFormula = quizMode==="formula";
  const isElement = quizMode==="element";
  const accentColor = isIon?"var(--ion)":isFormula?"var(--form)":"var(--primary)";
  const lightColor  = isIon?"var(--ion-l)":isFormula?"var(--form-l)":"var(--pl)";
  const btnClass    = isIon?"btn-ion":isFormula?"btn-form":"btn-a";
  const opts = DIRECTION_OPTIONS[quizMode] || DIRECTION_OPTIONS.element;

  return (
    <div className="card">
      <div className="fb2 mb13">
        <button className="btn btn-s btn-sm" onClick={onBack}>← 戻る</button>
        <span style={{fontWeight:700}}>{title}</span><span/>
      </div>

      {/* ion/formula: レベル選択 */}
      {(isIon||isFormula)&&(
        <div style={{marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>レベルを選択</div>
          <div className="g2" style={{margin:"0 0 4px"}}>
            {["junior","senior"].map(lv=>(
              <div key={lv}
                onClick={()=>setSubLevel(lv)}
                style={{
                  border:`2px solid ${subLevel===lv?accentColor:"var(--border)"}`,
                  borderRadius:10,padding:"12px 10px",cursor:"pointer",textAlign:"center",
                  background:subLevel===lv?lightColor:"#fff",transition:"all .13s"
                }}>
                <div style={{fontSize:"1.5rem",marginBottom:3}}>{lv==="junior"?"📗":"📕"}</div>
                <div style={{fontWeight:700,fontSize:".9rem",color:subLevel===lv?accentColor:"var(--text)"}}>
                  {lv==="junior"?"中学レベル":"高校レベル"}
                </div>
                <div style={{fontSize:".72rem",color:"var(--muted)",marginTop:2}}>
                  {LEVEL_LABELS[quizMode][lv]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* element: 範囲スライダー */}
      {isElement&&(
        <div style={{marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>出題範囲（原子番号）</div>
          <RangeSelector minNum={minNum} maxNum={maxNum} onChangeMin={setMinNum} onChangeMax={setMaxNum}/>
        </div>
      )}

      {/* 出題方向選択 */}
      <div style={{marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>出題方向</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {opts.map(opt=>{
            const active = directionMode===opt.value;
            return (
              <div key={opt.value} onClick={()=>setDirectionMode(opt.value)}
                style={{
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                  border:`2px solid ${active?accentColor:"var(--border)"}`,
                  borderRadius:9,padding:"10px 14px",cursor:"pointer",
                  background:active?lightColor:"#fff",transition:"all .12s"
                }}>
                <div>
                  <span style={{fontWeight:700,fontSize:"1rem",color:active?accentColor:"var(--text)"}}>{opt.desc}</span>
                  <span style={{fontSize:".75rem",color:"var(--muted)",marginLeft:8}}>{opt.detail}</span>
                </div>
                {active&&<span style={{color:accentColor,fontWeight:700,fontSize:"1rem"}}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 難易度：元素は自動、イオン/化学式は手動選択 */}
      {!isElement&&(
        <div style={{marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>難易度</div>
          <div style={{display:"flex",gap:6}}>
            {DIFFICULTY_OPTIONS.map(opt=>{
              const active = difficulty===opt.value;
              return (
                <div key={opt.value} onClick={()=>setDifficulty(opt.value)}
                  style={{
                    flex:1,textAlign:"center",
                    border:`2px solid ${active?opt.color:"var(--border)"}`,
                    borderRadius:10,padding:"10px 6px",cursor:"pointer",
                    background:active?opt.light:"#fff",transition:"all .13s"
                  }}>
                  <div style={{fontSize:"1.2rem",marginBottom:3}}>{opt.label.split(" ")[0]}</div>
                  <div style={{fontWeight:700,fontSize:".85rem",color:active?opt.color:"var(--text)"}}>{opt.label.split(" ")[1]}</div>
                  <div style={{fontSize:".68rem",color:"var(--muted)",marginTop:2,lineHeight:1.3}}>{opt.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isElement&&(
        <div style={{marginBottom:10,padding:"10px 14px",background:"var(--bg)",borderRadius:9,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:".82rem",color:"var(--muted)"}}>この設定の難易度：</span>
          <ElementDifficultyBadge maxNum={maxNum}/>
        </div>
      )}
      <button
        className={`btn ${btnClass} btn-blk`}
        onClick={()=>onStart(isElement?{min:minNum,max:maxNum}:null, directionMode, subLevel, isElement?getElementAutodifficulty(maxNum):difficulty)}
        disabled={isElement&&ALL_ELEMENTS.filter(e=>e.number>=minNum&&e.number<=maxNum).length<4}>
        {isBattle?"🚀 この設定でルーム作成":"🚀 スタート！"}
      </button>
      <AppFooter/>
    </div>
  );
}

// ── QuizScreen ─────────────────────────────────────────────────
function QuizScreen({ maxNum, minNum=1, quizMode, directionMode="random", subLevel="junior", difficulty="normal", onFinish, onExit=null, seed=null }) {
  const isIon = quizMode==="ion";
  const isFormula = quizMode==="formula";
  const elements = isFormula ? getFormulas(subLevel) : isIon ? getIons(subLevel) : ALL_ELEMENTS.filter(e=>e.number>=(minNum||1)&&e.number<=(maxNum||20));
  const genQ = isFormula ? generateFormulaQ : isIon ? generateIonQ : generateElementQ;
  const rngRef = useRef(seed!==null?seededRng(seed):null);
  const [q,setQ]=useState(()=>genQ(elements,rngRef.current,directionMode,difficulty));
  const [score,setScore]=useState(0);
  const [correct,setCorrect]=useState(0);
  const [answered,setAnswered]=useState(0);
  const [timeLeft,setTimeLeft]=useState(60);
  const [selected,setSelected]=useState(null);
  const [feedback,setFeedback]=useState("none");
  const [bgmOn,setBgmOn]=useState(true);
  const [molMode,setMolMode]=useState("intro");
  const sRef=useRef(0),cRef=useRef(0),aRef=useRef(0),mRef=useRef([]);

  useEffect(()=>{
    bgm.start("play");
    const t=setInterval(()=>{
      setTimeLeft(prev=>{
        if(prev<=1){
          clearInterval(t); bgm.stop(); bgm.se("finish");
          const finalScore = calcQuizScore(cRef.current, aRef.current, sRef.current);
          onFinish({score:finalScore,rawScore:sRef.current,correct:cRef.current,total:aRef.current,mistakes:mRef.current});
          return 0;
        }
        return prev-1;
      });
    },1000);
    return()=>{clearInterval(t);bgm.stop();};
  },[]);

  const handleChoice=(choice)=>{
    if(selected!==null) return;
    const isOk=choice===q.answer;
    setSelected(choice); setFeedback(isOk?"ok":"ng");
    const pts=isOk?Math.max(10,timeLeft):0;
    sRef.current+=pts; setScore(sRef.current);
    if(isOk){cRef.current+=1;setCorrect(cRef.current);bgm.se("correct");}
    else{
      bgm.se("wrong");
      mRef.current=[...mRef.current,{symbol:q.meta.symbol,name:q.meta.name,answer:q.answer,yours:choice}];
    }
    aRef.current+=1; setAnswered(aRef.current);
    setTimeout(()=>{setQ(genQ(elements,rngRef.current,directionMode,difficulty));setSelected(null);setFeedback("none");},370);
  };

  const toggleBgm=()=>{if(bgmOn){bgm.stop();setBgmOn(false);}else{bgm.start("play");setBgmOn(true);}};
  const modeLabel = isFormula?"formula":isIon?"ion":"element";

  return (
    <div>
      <div className="card">
        <div className="qhd">
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div className={`tmr ${timeLeft<=10?"urg":""}`}>⏱ {timeLeft}</div>
            {onExit&&<button onClick={()=>{bgm.stop();onExit();}} style={{background:"none",border:"1px solid var(--border)",borderRadius:7,padding:"2px 8px",fontSize:".72rem",color:"var(--muted)",cursor:"pointer"}}>退出</button>}
          </div>
          <div className="gap8" style={{alignItems:"center"}}>
            <span className="muted" style={{fontSize:".8rem"}}>#{answered+1}</span>
            {isIon&&<span style={{fontSize:".75rem",background:"var(--ion-l)",color:"var(--ion)",padding:"2px 7px",borderRadius:20,fontWeight:700}}>⚡イオン</span>}
            {isFormula&&<span style={{fontSize:".75rem",background:"var(--form-l)",color:"var(--form)",padding:"2px 7px",borderRadius:20,fontWeight:700}}>🧬化学式</span>}
            {(()=>{const d=DIFFICULTY_OPTIONS.find(o=>o.value===difficulty);return d?<span style={{fontSize:".75rem",background:d.light,color:d.color,padding:"2px 7px",borderRadius:20,fontWeight:700}}>{d.label}</span>:null;})()}
            <button onClick={toggleBgm} style={{background:"none",border:"none",cursor:"pointer",fontSize:"1.05rem"}}>{bgmOn?"🔊":"🔇"}</button>
          </div>
          <div className="scd">💯 {score}</div>
        </div>
        <div className={`fb fb-${feedback}`}/>
        <div className="qc">
          <div className="ql">{q.label}</div>
          <div className={`qe ${q.isSymbol?"":"sm"} ${isIon&&!q.isSymbol?"ion-q":""} ${isFormula&&!q.isSymbol?"":"" }`} style={isFormula&&q.isSymbol?{color:"var(--form)",fontFamily:"Space Mono,monospace"}:{}}>{q.display}</div>
        </div>
        <div className="chs">
          {q.choices.map((c,i)=>(
            <button key={i}
              className={`ch ${q.isSymbol?"cn":""} ${isIon?"ion-ch":""} ${selected!==null?"dis":""} ${selected!==null&&c===q.answer?"ok":""} ${selected===c&&c!==q.answer?"ng":""}`} style={isFormula&&!q.isSymbol?{fontFamily:"Space Mono,monospace",fontSize:".85rem"}:{}}
              onClick={()=>handleChoice(c)}>{c}</button>
          ))}
        </div>
      </div>
      <AppFooter/>
    </div>
  );
}

// ── ResultScreen ───────────────────────────────────────────────
function ResultScreen({ result, nickname, maxNum, quizMode, subLevel="junior", onHome, onRetry, battleResult=null }) {
  const [showMiss,setShowMiss]=useState(false);
  const [showRankModal,setShowRankModal]=useState(true);
  const [rankSaved,setRankSaved]=useState(false);
  const acc=result.total>0?Math.round(result.correct/result.total*100):0;
  const grade=result.score>=800?"🥇 素晴らしい！":result.score>=500?"🥈 よくできました！":result.score>=200?"🥉 もう少し！":"📚 練習しよう！";
  const isIon=quizMode==="ion";
  const isFormula=quizMode==="formula";

  return (
    <div>
      {/* ランキング登録モーダル（対戦モード以外） */}
      {showRankModal && !battleResult && (
        <RankingModal score={result.score} correct={result.correct||0} total={result.total||0} nickname={nickname} quizMode={quizMode} maxNum={maxNum} subLevel={result.subLevel||"junior"} difficulty={result.difficulty||"normal"}
          onDone={(saved)=>{setRankSaved(saved);setShowRankModal(false);}}/>
      )}

      <div className="card">
        <div className="tc" style={{padding:"14px 0"}}>
          <div style={{fontSize:"1.7rem",marginBottom:4}}>{grade}</div>
          <div className="rbig" style={isIon?{color:"var(--ion)"}:isFormula?{color:"var(--form)"}:{}}>{result.score}</div>
          <div className="muted" style={{marginTop:2}}>点</div>
          {rankSaved&&<div style={{marginTop:8,fontSize:".85rem",color:"var(--success)",fontWeight:700}}>✅ ランキングに登録しました！</div>}
        </div>
        <div className="s3">
          <div className="sb"><div className="sv" style={{color:"var(--success)"}}>{result.correct}</div><div className="sk">正解</div></div>
          <div className="sb"><div className="sv">{result.total}</div><div className="sk">解答数</div></div>
          <div className="sb"><div className="sv">{acc}%</div><div className="sk">正答率</div></div>
        </div>
        <div style={{fontSize:".75rem",color:"var(--muted)",textAlign:"center"}}>
          {isIon?"⚡イオンクイズ":isFormula?"🧬化学式クイズ":`出題範囲: 1〜${maxNum}番`}
        </div>
      </div>

      {result.mistakes&&result.mistakes.length>0&&(
        <div className="card">
          <div className="fb2 mb8">
            <span style={{fontWeight:700}}>❌ 間違えた問題 ({result.mistakes.length}問)</span>
            <button className="btn btn-s btn-sm" onClick={()=>setShowMiss(v=>!v)}>{showMiss?"閉じる":"見る"}</button>
          </div>
          {showMiss&&result.mistakes.map((m,i)=>(
            <div key={i} className="mi">
              <span className="msym" style={isIon?{color:"var(--ion)",fontSize:".85rem",width:50}:{}}>{m.symbol}</span>
              <div>
                <div style={{fontWeight:700}}>{m.name}</div>
                <div className="mans">✓ {m.answer}</div>
                <div className="myrs">✗ あなた: {m.yours}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {result.mistakes&&result.mistakes.length===0&&(
        <div className="card tc"><span style={{fontSize:"1.5rem"}}>🎉</span><p style={{fontWeight:700,marginTop:3}}>ミスなし！パーフェクト！</p></div>
      )}

      {battleResult&&(
        <div className="card">
          <h3 style={{fontWeight:700,marginBottom:10}}>⚔️ 対戦結果</h3>
          {battleResult.map((p,i)=>(
            <div key={i} className="btr" style={p.isMe?{background:"var(--pl)"}:{}}>
              <span style={{fontSize:"1.25rem"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}位`}</span>
              <span style={{flex:1,fontWeight:700}}>{p.name}{p.isMe&&<span className="bdg by" style={{marginLeft:5}}>あなた</span>}</span>
              <span style={{fontFamily:"Space Mono",fontWeight:700,color:"var(--primary)"}}>{p.score}点</span>
            </div>
          ))}
        </div>
      )}

      <div className="gap8">
        <button className="btn btn-p" style={{flex:1}} onClick={onRetry}>🔁 もう一度</button>
        <button className="btn btn-s" style={{flex:1}} onClick={onHome}>🏠 ホーム</button>
      </div>
    </div>
  );
}

// ── RankingScreen ──────────────────────────────────────────────
function RankingScreen({ onBack, myNickname }) {
  const [tab,setTab]=useState("element_all");
  const [diffFilter,setDiffFilter]=useState("all");
  const [molFilter,setMolFilter]=useState("all"); // mol専用モードフィルター
  const [allRanks,setAllRanks]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{load();},[tab]);

  const load=async()=>{
    setLoading(true);
    let key;
    if(tab==="ion") key="ranking:ion";
    else if(tab==="formula") key="ranking:formula";
    else if(tab==="mol") key="ranking:mol";
    else key="ranking:v2";
    const res=await sGet(key,true);
    let all=[];
    try{if(res)all=JSON.parse(res.value);}catch{}
    if(!["element_all","ion","formula","mol"].includes(tab))
      all=all.filter(r=>r.maxNum===Number(tab));
    setAllRanks(all);
    setDiffFilter("all");
    setMolFilter("all");
    setLoading(false);
  };

  // フィルター適用
  let ranks = allRanks;
  if(tab==="mol") {
    ranks = molFilter==="all" ? allRanks : allRanks.filter(r=>(r.subLevel||"random")===molFilter);
  } else {
    ranks = diffFilter==="all" ? allRanks : allRanks.filter(r=>(r.difficulty||"normal")===diffFilter);
  }

  const tabs=[
    ["element_all","⚛️元素"],["ion","⚡イオン"],["formula","🧬化学式"],
    ["mol","🧮mol"],
  ];

  const showDiffFilter = ["element_all","ion","formula"].includes(tab);
  const showMolFilter = tab==="mol";

  const modeLabel = (r) => {
    if(r.quizMode==="ion") return {text:`${r.subLevel==="junior"?"中":"高"}`, bg:"var(--ion-l)", color:"var(--ion)"};
    if(r.quizMode==="formula") return {text:`${r.subLevel==="junior"?"中":"高"}`, bg:"var(--form-l)", color:"var(--form)"};
    if(r.quizMode==="mol") return {text:({intro:"入門",basic:"基礎",adv:"応用",random:"乱"})[r.subLevel]||r.subLevel, bg:"#ede9fe", color:"#6366f1"};
    if(r.maxNum && r.maxNum!==20) return {text:`〜${r.maxNum}`, bg:"var(--pl)", color:"var(--primary)"};
    return null;
  };

  const medal = (i) => i===0?"🥇":i===1?"🥈":i===2?"🥉":null;

  return (
    <div>
      <div className="card">
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={onBack}>← 戻る</button>
          <span style={{fontWeight:700}}>🏆 ランキング</span><span/>
        </div>
        {/* クイズ種別タブ */}
        <div className="tabs" style={{marginBottom:showDiffFilter?8:13}}>
          {tabs.map(([v,l])=>(
            <button key={v} className={`tab ${tab===v?"on":""}`} onClick={()=>setTab(v)}>{l}</button>
          ))}
        </div>
        {/* molモードフィルター */}
        {showMolFilter&&(
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:13}}>
            {[
              {v:"all",    l:"すべて"},
              {v:"intro",  l:"入門"},
              {v:"basic",  l:"基礎"},
              {v:"adv",    l:"応用"},
              {v:"random", l:"ランダム"},
            ].map(d=>{
              const active = molFilter===d.v;
              return (
                <button key={d.v} onClick={()=>setMolFilter(d.v)}
                  style={{
                    padding:"4px 12px",borderRadius:20,
                    border:`2px solid ${active?"#6366f1":"var(--border)"}`,
                    background:active?"#ede9fe":"#fff",
                    color:active?"#6366f1":"var(--muted)",
                    fontWeight:active?700:400,fontSize:".78rem",
                    cursor:"pointer",fontFamily:"inherit",transition:"all .12s"
                  }}>
                  {d.l}
                </button>
              );
            })}
          </div>
        )}
        {/* 難易度フィルター */}
        {showDiffFilter&&(
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:13}}>
            {[
              {v:"all",  l:"全て",   bg:"var(--bg)", color:"var(--muted)",  activeBg:"var(--border)", activeColor:"var(--text)"},
              {v:"easy",  l:"😊 易",  bg:"#dcfce7",   color:"#166534"},
              {v:"normal",l:"😐 普通", bg:"#fef3c7",   color:"#92400e"},
              {v:"hard",  l:"😈 難",  bg:"#fee2e2",   color:"#991b1b"},
            ].map(d=>{
              const active = diffFilter===d.v;
              return (
                <button key={d.v} onClick={()=>setDiffFilter(d.v)}
                  style={{
                    padding:"4px 12px",borderRadius:20,border:`2px solid ${active?(d.color||"var(--text)"):"var(--border)"}`,
                    background:active?(d.bg||"var(--bg)"):"#fff",
                    color:active?(d.color||"var(--text)"):"var(--muted)",
                    fontWeight:active?700:400,fontSize:".78rem",cursor:"pointer",
                    fontFamily:"inherit",transition:"all .12s"
                  }}>
                  {d.l}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {loading?<p className="tc muted" style={{padding:16}}>読み込み中...</p>
        :ranks.length===0?<p className="tc muted" style={{padding:16}}>まだ記録がありません</p>
        :(
          <div>
            {ranks.slice(0,5).map((r,i)=>{
              const ml = modeLabel(r);
              const diff = DIFFICULTY_OPTIONS.find(o=>o.value===(r.difficulty||"normal"));
              const isMe = r.name===myNickname;
              return (
                <div key={i} className={`rcard ${isMe?"me":""}`}>
                  <div className="rcard-top">
                    <span className="rcard-rank">{medal(i)||<span style={{fontSize:".85rem",color:"var(--muted)"}}>{i+1}</span>}</span>
                    <span className="rcard-name">
                      {r.name}
                      {isMe&&<span className="bdg by" style={{marginLeft:5}}>あなた</span>}
                    </span>
                    {ml&&<span style={{fontSize:".7rem",padding:"2px 6px",borderRadius:10,background:ml.bg,color:ml.color,fontWeight:700}}>{ml.text}</span>}
                    {diff&&diffFilter==="all"&&<span style={{fontSize:".7rem",padding:"2px 6px",borderRadius:10,background:diff.light,color:diff.color,fontWeight:700}}>{diff.label.split(" ")[0]}</span>}
                    <span className="rcard-score">{r.score}点</span>
                  </div>
                  <div className="rcard-meta">
                    {r.correct!=null&&r.total!=null&&(
                      <span className="rcard-stat">正解 <b style={{color:"var(--success)"}}>{r.correct}/{r.total}</b></span>
                    )}
                    {r.acc!=null&&(
                      <span className="rcard-stat">正答率 <b style={{color:"var(--primary)"}}>{r.acc}%</b></span>
                    )}
                    {r.date&&<span className="rcard-stat">{fmtDate(r.date)}</span>}
                  </div>
                </div>
              );
            })}
            <p className="muted tc" style={{marginTop:7,fontSize:".71rem",paddingBottom:4}}>※ランキングは全ユーザーに公開されます</p>
            <AppFooter/>
          </div>
        )
      }
    </div>
  );
}

// ── MemoScreen（暗記一覧画面）──────────────────────────────────
function MemoScreen({ onBack }) {
  const [tab, setTab] = useState("element");
  const [elMin, setElMin] = useState(1);
  const [elMax, setElMax] = useState(20);
  const [ionLv, setIonLv] = useState("junior");
  const [frmLv, setFrmLv] = useState("junior");

  const tabs = [
    { id:"element", label:"⚛️ 元素", cls:"" },
    { id:"ion",     label:"⚡ イオン", cls:"ion-t" },
    { id:"formula", label:"🧬 化学式", cls:"form-t" },
  ];

  const elItems = ALL_ELEMENTS.filter(e=>e.number>=elMin&&e.number<=elMax);
  const ionItems = getIons(ionLv);
  const frmItems = getFormulas(frmLv);

  return (
    <div>
      <div className="card" style={{marginBottom:10}}>
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={onBack}>← 戻る</button>
          <span style={{fontWeight:700}}>📖 暗記リスト</span>
          <span/>
        </div>
        <div className="memo-tabs">
          {tabs.map(t=>(
            <button key={t.id} className={`memo-tab ${t.cls} ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        {/* 元素タブ */}
        {tab==="element"&&(
          <>
            <div style={{marginBottom:10}}>
              <RangeSelector minNum={elMin} maxNum={elMax} onChangeMin={setElMin} onChangeMax={setElMax}/>
              <ElementDifficultyBadge maxNum={elMax}/>
            </div>
            <div style={{fontSize:".78rem",color:"var(--muted)",marginBottom:8,textAlign:"center"}}>
              {elMin}〜{elMax}番の元素 <b style={{color:"var(--primary)"}}>{elItems.length}</b> 種
            </div>
            <div className="memo-grid">
              {elItems.map(el=>(
                <div key={el.symbol} className="memo-card">
                  <div className="memo-sym">{el.symbol}</div>
                  <div className="memo-name">{el.name}</div>
                  <div className="memo-num">原子番号 {el.number}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* イオンタブ */}
        {tab==="ion"&&(
          <>
            <div style={{display:"flex",gap:7,marginBottom:12}}>
              {[["junior","中学レベル（17種）"],["senior","高校レベル（39種）"]].map(([lv,lb])=>(
                <div key={lv} onClick={()=>setIonLv(lv)}
                  style={{flex:1,border:`2px solid ${ionLv===lv?"var(--ion)":"var(--border)"}`,borderRadius:9,padding:"9px 6px",cursor:"pointer",textAlign:"center",background:ionLv===lv?"var(--ion-l)":"#fff",transition:"all .12s"}}>
                  <div style={{fontWeight:700,fontSize:".82rem",color:ionLv===lv?"var(--ion)":"var(--muted)"}}>{lv==="junior"?"📗 中学":"📕 高校"}</div>
                  <div style={{fontSize:".7rem",color:"var(--muted)",marginTop:2}}>{lb}</div>
                </div>
              ))}
            </div>
            <div className="memo-grid">
              {ionItems.map(ion=>(
                <div key={ion.formula} className="memo-card">
                  <div className="memo-sym ion">{ion.formula}</div>
                  <div className="memo-name">{ion.name}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 化学式タブ */}
        {tab==="formula"&&(
          <>
            <div style={{display:"flex",gap:7,marginBottom:12}}>
              {[["junior","中学レベル（27種）"],["senior","高校レベル（58種）"]].map(([lv,lb])=>(
                <div key={lv} onClick={()=>setFrmLv(lv)}
                  style={{flex:1,border:`2px solid ${frmLv===lv?"var(--form)":"var(--border)"}`,borderRadius:9,padding:"9px 6px",cursor:"pointer",textAlign:"center",background:frmLv===lv?"var(--form-l)":"#fff",transition:"all .12s"}}>
                  <div style={{fontWeight:700,fontSize:".82rem",color:frmLv===lv?"var(--form)":"var(--muted)"}}>{lv==="junior"?"📗 中学":"📕 高校"}</div>
                  <div style={{fontSize:".7rem",color:"var(--muted)",marginTop:2}}>{lb}</div>
                </div>
              ))}
            </div>
            <div className="memo-grid">
              {frmItems.map(frm=>(
                <div key={frm.formula} className="memo-card">
                  <div className="memo-sym form">{frm.formula}</div>
                  <div className="memo-name">{frm.name}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// ============================================================
// mol計算ドリル
// ============================================================
const AVOGADRO = 6.0e23;
const MOL_CONST_TEXT = "H=1.0  C=12  O=16  N=14  Na=23  Cl=35.5  Cu=64  S=32　　アボガドロ数: 6.0×10²³/mol";

// 答えを見やすい文字列に
function fmtAns(v) {
  if (typeof v === "string") return v;
  if (v >= 1e23) return `${(v/1e23).toFixed(1).replace(/\.0$/,"")}×10²³`;
  if (v >= 1e22) return `${(v/1e22).toFixed(1).replace(/\.0$/,"")}×10²²`;
  if (Number.isInteger(v) || (v*10)%1===0) return String(v);
  return String(v);
}

// 典型ミスからダミー生成
function genMolDummies(correct, qtype) {
  const c = correct;
  let dummies = [];
  if (qtype === "g_to_mol" || qtype === "mol_to_g") {
    dummies = [c*2, c/2, c*3, c/3, c+1, c-1, c*4].filter(x=>x>0&&x!==c);
  } else if (qtype === "mol_to_L" || qtype === "L_to_mol") {
    dummies = [c*2, c/2, c+22.4, c-22.4, c*3, c/3].filter(x=>x>0&&x!==c);
  } else if (qtype === "mol_to_N" || qtype === "N_to_mol") {
    // アボガドロ数絡み
    dummies = [c*2, c/2, c*3, c/3, c*0.5].filter(x=>x>0&&x!==c);
  } else if (qtype === "g_to_L" || qtype === "L_to_g") {
    dummies = [c*2, c/2, c+11.2, c*3, c/3].filter(x=>x>0&&x!==c);
  } else if (qtype === "g_to_N" || qtype === "N_to_g") {
    dummies = [c*2, c/2, c*3, c/3].filter(x=>x>0&&x!==c);
  } else if (qtype === "L_to_N" || qtype === "N_to_L") {
    dummies = [c*2, c/2, c*3, c/3].filter(x=>x>0&&x!==c);
  } else {
    dummies = [c*2, c/2, c*3, c-c*0.5].filter(x=>x>0&&x!==c);
  }
  return shuffle([...new Set(dummies)]).slice(0,3);
}

// ヒント生成

// mol問題の計算式を生成（間違い一覧用）
function getMolFormula(q) {
  if (!q) return "";
  const t = q.qtype;
  const mm = q.molarMass;
  const gv = q.given;
  const nm = q.numer;
  const r = (v) => Math.round(v*10000)/10000;
  // ÷ を × 1/分母 の分数表記に変換するヘルパー
  // 例: ÷ 36.5g/mol → × (1mol/36.5g)
  const frac = (num, unit) => `× (${num}/${unit})`;

  if (t==="g_to_mol")
    return `${gv}g ${frac("1mol",mm+"g")} = ${q.ans}mol`;
  if (t==="mol_to_g")
    return `${gv}mol × (${mm}g/1mol) = ${q.ans}g`;
  if (t==="mol_to_L")
    return `${gv}mol × (22.4L/1mol) = ${q.ans}L`;
  if (t==="L_to_mol")
    return `${gv}L ${frac("1mol","22.4L")} = ${q.ans}mol`;
  if (t==="mol_to_N")
    return `${gv}mol × (6.0×10²³個/1mol) = ${q.ans}個`;
  if (t==="N_to_mol")
    return `${nm}×10²³個 ${frac("1mol","6.0×10²³個")} = ${q.ans}mol`;
  if (t==="g_to_L") {
    const mol = r(gv/mm);
    return `① ${gv}g ${frac("1mol",mm+"g")} = ${mol}mol
② ${mol}mol × (22.4L/1mol) = ${q.ans}L

式全体：${gv}g ${frac("1mol",mm+"g")} × (22.4L/1mol) = ${q.ans}L`;
  }
  if (t==="L_to_g") {
    const mol = r(gv/22.4);
    return `① ${gv}L ${frac("1mol","22.4L")} = ${mol}mol
② ${mol}mol × (${mm}g/1mol) = ${q.ans}g

式全体：${gv}L ${frac("1mol","22.4L")} × (${mm}g/1mol) = ${q.ans}g`;
  }
  if (t==="g_to_N") {
    const mol = r(gv/mm);
    return `① ${gv}g ${frac("1mol",mm+"g")} = ${mol}mol
② ${mol}mol × (6.0×10²³個/1mol) = ${q.ans}個

式全体：${gv}g ${frac("1mol",mm+"g")} × (6.0×10²³個/1mol) = ${q.ans}個`;
  }
  if (t==="N_to_g") {
    const mol = r(nm/6);
    return `① ${nm}×10²³個 ${frac("1mol","6.0×10²³個")} = ${mol}mol
② ${mol}mol × (${mm}g/1mol) = ${q.ans}g

式全体：${nm}×10²³個 ${frac("1mol","6.0×10²³個")} × (${mm}g/1mol) = ${q.ans}g`;
  }
  if (t==="L_to_N") {
    const mol = r(gv/22.4);
    return `① ${gv}L ${frac("1mol","22.4L")} = ${mol}mol
② ${mol}mol × (6.0×10²³個/1mol) = ${q.ans}個

式全体：${gv}L ${frac("1mol","22.4L")} × (6.0×10²³個/1mol) = ${q.ans}個`;
  }
  if (t==="N_to_L") {
    const mol = r(nm/6);
    return `① ${nm}×10²³個 ${frac("1mol","6.0×10²³個")} = ${mol}mol
② ${mol}mol × (22.4L/1mol) = ${q.ans}L

式全体：${nm}×10²³個 ${frac("1mol","6.0×10²³個")} × (22.4L/1mol) = ${q.ans}L`;
  }
  return "";
}

function getMolHints(q) {
  const hints = [];
  if (q.qtype==="g_to_mol")  { hints.push("g → mol の変換：mol = g ÷ モル質量"); hints.push(`${q.substance}のモル質量 = ${q.molarMass} g/mol`); hints.push(`mol = ${q.given} ÷ ${q.molarMass}`); }
  else if (q.qtype==="mol_to_g") { hints.push("mol → g の変換：g = mol × モル質量"); hints.push(`${q.substance}のモル質量 = ${q.molarMass} g/mol`); hints.push(`g = ${q.given} × ${q.molarMass}`); }
  else if (q.qtype==="mol_to_L") { hints.push("mol → L の変換（標準状態）：L = mol × 22.4"); hints.push(`22.4 L/mol を使う`); hints.push(`L = ${q.given} × 22.4`); }
  else if (q.qtype==="L_to_mol") { hints.push("L → mol の変換（標準状態）：mol = L ÷ 22.4"); hints.push(`22.4 L/mol を使う`); hints.push(`mol = ${q.given} ÷ 22.4`); }
  else if (q.qtype==="mol_to_N") { hints.push("mol → 個数の変換：個 = mol × 6.0×10²³"); hints.push(`アボガドロ数 6.0×10²³ を使う`); hints.push(`個 = ${q.given} × 6.0×10²³`); }
  else if (q.qtype==="N_to_mol") { hints.push("個数 → mol の変換：mol = 個数 ÷ 6.0×10²³"); hints.push(`アボガドロ数 6.0×10²³ で割る`); hints.push(`mol = ${q.numer}×10²³ ÷ 6.0×10²³`); }
  else if (q.qtype==="g_to_L")   { hints.push("g → mol → L の2段変換"); hints.push(`モル質量 ${q.molarMass} g/mol → mol、次に × 22.4`); hints.push(`mol = ${q.given} ÷ ${q.molarMass}、L = mol × 22.4`); }
  else if (q.qtype==="L_to_g")   { hints.push("L → mol → g の2段変換"); hints.push(`22.4で割って mol、次に × モル質量 ${q.molarMass}`); hints.push(`mol = ${q.given} ÷ 22.4、g = mol × ${q.molarMass}`); }
  else if (q.qtype==="g_to_N")   { hints.push("g → mol → 個数 の2段変換"); hints.push(`モル質量 ${q.molarMass} g/mol で割って mol、次に × 6.0×10²³`); hints.push(`mol = ${q.given} ÷ ${q.molarMass}、個 = mol × 6.0×10²³`); }
  else if (q.qtype==="N_to_g")   { hints.push("個数 → mol → g の2段変換"); hints.push(`6.0×10²³ で割って mol、次に × モル質量 ${q.molarMass}`); hints.push(`mol = ${q.numer}×10²³ ÷ 6.0×10²³、g = mol × ${q.molarMass}`); }
  else if (q.qtype==="L_to_N")   { hints.push("L → mol → 個数 の2段変換"); hints.push(`22.4で割って mol、次に × 6.0×10²³`); hints.push(`mol = ${q.given} ÷ 22.4、個 = mol × 6.0×10²³`); }
  else if (q.qtype==="N_to_L")   { hints.push("個数 → mol → L の2段変換"); hints.push(`6.0×10²³ で割って mol、次に × 22.4`); hints.push(`mol = ${q.numer}×10²³ ÷ 6.0×10²³、L = mol × 22.4`); }
  return hints;
}

const MOL_QUESTIONS_RAW = [
  // 1-10: g→mol
  {id:1,  q:"CO₂ 44gは何molか？",    ans:1,     qtype:"g_to_mol",  substance:"CO₂", molarMass:44, given:44},
  {id:2,  q:"CO 28gは何molか？",     ans:1,     qtype:"g_to_mol",  substance:"CO",  molarMass:28, given:28},
  {id:3,  q:"NH₃ 34gは何molか？",    ans:2,     qtype:"g_to_mol",  substance:"NH₃", molarMass:17, given:34},
  {id:4,  q:"HCl 73gは何molか？",    ans:2,     qtype:"g_to_mol",  substance:"HCl", molarMass:36.5, given:73},
  {id:5,  q:"CH₄ 8gは何molか？",     ans:0.5,   qtype:"g_to_mol",  substance:"CH₄", molarMass:16, given:8},
  {id:6,  q:"H₂SO₄ 49gは何molか？",  ans:0.5,   qtype:"g_to_mol",  substance:"H₂SO₄", molarMass:98, given:49},
  {id:7,  q:"HNO₃ 126gは何molか？",  ans:2,     qtype:"g_to_mol",  substance:"HNO₃", molarMass:63, given:126},
  {id:8,  q:"Cu 64gは何molか？",     ans:1,     qtype:"g_to_mol",  substance:"Cu",  molarMass:64, given:64},
  {id:9,  q:"NaOH 40gは何molか？",   ans:1,     qtype:"g_to_mol",  substance:"NaOH",molarMass:40, given:40},
  {id:10, q:"H₂O 54gは何molか？",    ans:3,     qtype:"g_to_mol",  substance:"H₂O", molarMass:18, given:54},
  // 11-20: mol→g
  {id:11, q:"CO₂ 2molは何gか？",     ans:88,    qtype:"mol_to_g",  substance:"CO₂", molarMass:44, given:2},
  {id:12, q:"CO 1molは何gか？",      ans:28,    qtype:"mol_to_g",  substance:"CO",  molarMass:28, given:1},
  {id:13, q:"NH₃ 3molは何gか？",     ans:51,    qtype:"mol_to_g",  substance:"NH₃", molarMass:17, given:3},
  {id:14, q:"HCl 1molは何gか？",     ans:36.5,  qtype:"mol_to_g",  substance:"HCl", molarMass:36.5, given:1},
  {id:15, q:"CH₄ 0.5molは何gか？",   ans:8,     qtype:"mol_to_g",  substance:"CH₄", molarMass:16, given:0.5},
  {id:16, q:"H₂SO₄ 0.5molは何gか？", ans:49,    qtype:"mol_to_g",  substance:"H₂SO₄", molarMass:98, given:0.5},
  {id:17, q:"HNO₃ 3molは何gか？",    ans:189,   qtype:"mol_to_g",  substance:"HNO₃", molarMass:63, given:3},
  {id:18, q:"Cu 2molは何gか？",      ans:128,   qtype:"mol_to_g",  substance:"Cu",  molarMass:64, given:2},
  {id:19, q:"NaOH 4molは何gか？",    ans:160,   qtype:"mol_to_g",  substance:"NaOH",molarMass:40, given:4},
  {id:20, q:"H₂O 5molは何gか？",     ans:90,    qtype:"mol_to_g",  substance:"H₂O", molarMass:18, given:5},
  // 21-30: mol→L
  {id:21, q:"CO₂ 1molは標準状態の気体で何Lか？",      ans:22.4,  qtype:"mol_to_L", substance:"CO₂", given:1},
  {id:22, q:"CO 2molは標準状態の気体で何Lか？",       ans:44.8,  qtype:"mol_to_L", substance:"CO",  given:2},
  {id:23, q:"NH₃ 0.875molは標準状態の気体で何Lか？",  ans:19.6,  qtype:"mol_to_L", substance:"NH₃", given:0.875},
  {id:24, q:"HCl 0.25molは標準状態の気体で何Lか？",   ans:5.6,   qtype:"mol_to_L", substance:"HCl", given:0.25},
  {id:25, q:"CH₄ 0.75molは標準状態の気体で何Lか？",   ans:16.8,  qtype:"mol_to_L", substance:"CH₄", given:0.75},
  {id:26, q:"H₂SO₄ 0.5molは標準状態の気体で何Lか？",  ans:11.2,  qtype:"mol_to_L", substance:"H₂SO₄", given:0.5},
  {id:27, q:"HNO₃ 0.125molは標準状態の気体で何Lか？", ans:2.8,   qtype:"mol_to_L", substance:"HNO₃", given:0.125},
  {id:28, q:"C₂H₆ 0.375molは何Lか？",               ans:8.4,   qtype:"mol_to_L", substance:"C₂H₆", given:0.375},
  {id:29, q:"Ar 0.25molは何Lか？",                   ans:5.6,   qtype:"mol_to_L", substance:"Ar",  given:0.25},
  {id:30, q:"H₂O 0.625molは標準状態の気体で何Lか？",  ans:14,    qtype:"mol_to_L", substance:"H₂O", given:0.625},
  // 31-40: L→mol
  {id:31, q:"CO₂ 標準状態で22.4Lの気体は何molか？",  ans:1,     qtype:"L_to_mol", substance:"CO₂", given:22.4},
  {id:32, q:"CO 標準状態で44.8Lの気体は何molか？",   ans:2,     qtype:"L_to_mol", substance:"CO",  given:44.8},
  {id:33, q:"NH₃ 標準状態で19.6Lの気体は何molか？",  ans:0.875, qtype:"L_to_mol", substance:"NH₃", given:19.6},
  {id:34, q:"HCl 標準状態で5.6Lの気体は何molか？",   ans:0.25,  qtype:"L_to_mol", substance:"HCl", given:5.6},
  {id:35, q:"CH₄ 標準状態で16.8Lの気体は何molか？",  ans:0.75,  qtype:"L_to_mol", substance:"CH₄", given:16.8},
  {id:36, q:"H₂SO₄ 標準状態で11.2Lの気体は何molか？",ans:0.5,   qtype:"L_to_mol", substance:"H₂SO₄", given:11.2},
  {id:37, q:"HNO₃ 標準状態で2.8Lの気体は何molか？",  ans:0.125, qtype:"L_to_mol", substance:"HNO₃", given:2.8},
  {id:38, q:"C₂H₆ 標準状態で8.4Lの気体は何molか？",  ans:0.375, qtype:"L_to_mol", substance:"C₂H₆", given:8.4},
  {id:39, q:"Ar 標準状態で5.6Lの気体は何molか？",     ans:0.25,  qtype:"L_to_mol", substance:"Ar",  given:5.6},
  {id:40, q:"H₂O 14Lは何molか？",                   ans:0.625, qtype:"L_to_mol", substance:"H₂O", given:14},
  // 41-50: mol→個数
  {id:41, q:"CO₂ 1molの分子数は何個か？",             ans:"6.0×10²³", qtype:"mol_to_N", substance:"CO₂", given:1, numer:6.0},
  {id:42, q:"CO 2molの分子数は何個か？",              ans:"1.2×10²⁴", qtype:"mol_to_N", substance:"CO",  given:2, numer:12.0},
  {id:43, q:"NH₄⁺ 3molのイオン数は何個か？",          ans:"1.8×10²⁴", qtype:"mol_to_N", substance:"NH₄⁺", given:3, numer:18.0},
  {id:44, q:"NaOH 0.25molのNa⁺のイオン数は何個か？",  ans:"1.5×10²³", qtype:"mol_to_N", substance:"NaOH", given:0.25, numer:1.5},
  {id:45, q:"CH₄ 0.5molの分子数は何個か？",           ans:"3.0×10²³", qtype:"mol_to_N", substance:"CH₄", given:0.5, numer:3.0},
  {id:46, q:"H₂SO₄ 0.5molのH⁺のイオン数は何個か？",  ans:"6.0×10²³", qtype:"mol_to_N", substance:"H₂SO₄", given:0.5, numer:6.0},
  {id:47, q:"HNO₃ 3molのイオンの総数は何個か？",      ans:"3.6×10²⁴", qtype:"mol_to_N", substance:"HNO₃", given:3, numer:36.0},
  {id:48, q:"Cu(OH)₂ 2molのOH⁻のイオン数は何個か？", ans:"2.4×10²⁴", qtype:"mol_to_N", substance:"Cu(OH)₂", given:2, numer:24.0},
  {id:49, q:"NaOH 0.25molのイオンの総数は何個か？",   ans:"3.0×10²³", qtype:"mol_to_N", substance:"NaOH", given:0.25, numer:3.0},
  {id:50, q:"H₂O 3molの分子数は何個か？",             ans:"1.8×10²⁴", qtype:"mol_to_N", substance:"H₂O", given:3, numer:18.0},
  // 51-60: 個数→mol
  {id:51, q:"CO₂の分子数が6.0×10²³個ある時何molか？", ans:1,    qtype:"N_to_mol", substance:"CO₂", numer:6.0},
  {id:52, q:"COの分子数が12.0×10²³個ある時何molか？", ans:2,    qtype:"N_to_mol", substance:"CO",  numer:12.0},
  {id:53, q:"NH₃の分子数が18.0×10²³個ある時何molか？",ans:3,    qtype:"N_to_mol", substance:"NH₃", numer:18.0},
  {id:54, q:"HClの分子数が3.0×10²³個ある時何molか？", ans:0.5,  qtype:"N_to_mol", substance:"HCl", numer:3.0},
  {id:55, q:"CH₄ 分子数が12.0×10²³個ある時何molか？",ans:2,    qtype:"N_to_mol", substance:"CH₄", numer:12.0},
  {id:56, q:"H₂SO₄の分子数が24.0×10²³個ある時何molか？",ans:4, qtype:"N_to_mol", substance:"H₂SO₄", numer:24.0},
  {id:57, q:"HNO₃の分子数が3.0×10²³個ある時何molか？",ans:0.5, qtype:"N_to_mol", substance:"HNO₃", numer:3.0},
  {id:58, q:"Cuの分子数が18.0×10²³個ある時何molか？", ans:3,    qtype:"N_to_mol", substance:"Cu",  numer:18.0},
  {id:59, q:"NaOHの分子数が12.0×10²³個ある時何molか？",ans:2,  qtype:"N_to_mol", substance:"NaOH", numer:12.0},
  {id:60, q:"H₂O 分子数が24.0×10²³個ある時何molか？",ans:4,    qtype:"N_to_mol", substance:"H₂O", numer:24.0},
  // 61-70: g→L（2段変換）
  {id:61, q:"CO₂ 44gは標準状態の気体で何Lか？",    ans:22.4,  qtype:"g_to_L", substance:"CO₂", molarMass:44, given:44},
  {id:62, q:"CO 28gは標準状態の気体で何Lか？",     ans:22.4,  qtype:"g_to_L", substance:"CO",  molarMass:28, given:28},
  {id:63, q:"NH₃ 34gは標準状態の気体で何Lか？",    ans:44.8,  qtype:"g_to_L", substance:"NH₃", molarMass:17, given:34},
  {id:64, q:"HCl 73gは標準状態の気体で何Lか？",    ans:44.8,  qtype:"g_to_L", substance:"HCl", molarMass:36.5, given:73},
  {id:65, q:"CH₄ 8gは標準状態の気体で何Lか？",     ans:11.2,  qtype:"g_to_L", substance:"CH₄", molarMass:16, given:8},
  {id:66, q:"H₂SO₄ 49gは標準状態の気体で何Lか？",  ans:11.2,  qtype:"g_to_L", substance:"H₂SO₄", molarMass:98, given:49},
  {id:67, q:"HNO₃ 126gは標準状態の気体で何Lか？",  ans:44.8,  qtype:"g_to_L", substance:"HNO₃", molarMass:63, given:126},
  {id:68, q:"C₂H₆ 60gは標準状態の気体で何Lか？",   ans:44.8,  qtype:"g_to_L", substance:"C₂H₆", molarMass:30, given:60},
  {id:69, q:"SO₂ 64gは標準状態の気体で何Lか？",    ans:22.4,  qtype:"g_to_L", substance:"SO₂", molarMass:64, given:64},
  {id:70, q:"H₂O 54gは標準状態の気体で何Lか？",    ans:67.2,  qtype:"g_to_L", substance:"H₂O", molarMass:18, given:54},
  // 71-80: g→個数
  {id:71, q:"CO₂ 44gの分子数はいくらか？",   ans:"6.0×10²³", qtype:"g_to_N", substance:"CO₂", molarMass:44, given:44, numer:6.0},
  {id:72, q:"CO 28gの分子数はいくらか？",    ans:"6.0×10²³", qtype:"g_to_N", substance:"CO",  molarMass:28, given:28, numer:6.0},
  {id:73, q:"NH₃ 34gの分子数はいくらか？",   ans:"1.2×10²⁴", qtype:"g_to_N", substance:"NH₃", molarMass:17, given:34, numer:12.0},
  {id:74, q:"HCl 73gの分子数はいくらか？",   ans:"1.2×10²⁴", qtype:"g_to_N", substance:"HCl", molarMass:36.5, given:73, numer:12.0},
  {id:75, q:"CH₄ 8gの分子数はいくらか？",    ans:"3.0×10²³", qtype:"g_to_N", substance:"CH₄", molarMass:16, given:8, numer:3.0},
  {id:76, q:"H₂SO₄ 49gの分子数はいくらか？", ans:"3.0×10²³", qtype:"g_to_N", substance:"H₂SO₄", molarMass:98, given:49, numer:3.0},
  {id:77, q:"HNO₃ 126gの分子数はいくらか？", ans:"1.2×10²⁴", qtype:"g_to_N", substance:"HNO₃", molarMass:63, given:126, numer:12.0},
  {id:78, q:"Cu 64gの分子数はいくらか？",    ans:"6.0×10²³", qtype:"g_to_N", substance:"Cu",  molarMass:64, given:64, numer:6.0},
  {id:79, q:"NaOH 40gの分子数はいくらか？",  ans:"6.0×10²³", qtype:"g_to_N", substance:"NaOH",molarMass:40, given:40, numer:6.0},
  {id:80, q:"H₂O 54gの分子数はいくらか？",   ans:"1.8×10²⁴", qtype:"g_to_N", substance:"H₂O", molarMass:18, given:54, numer:18.0},
  // 81-90: 個数→L
  {id:81, q:"CO₂の分子数が6.0×10²³個ある時、標準状態の気体で何Lか？",   ans:22.4, qtype:"N_to_L", substance:"CO₂", numer:6.0},
  {id:82, q:"COの分子数が12.0×10²³個ある時、標準状態の気体で何Lか？",   ans:44.8, qtype:"N_to_L", substance:"CO",  numer:12.0},
  {id:83, q:"NH₃の分子数が18.0×10²³個ある時、標準状態の気体で何Lか？",  ans:67.2, qtype:"N_to_L", substance:"NH₃", numer:18.0},
  {id:84, q:"HClの分子数が3.0×10²³個ある時、標準状態の気体で何Lか？",   ans:11.2, qtype:"N_to_L", substance:"HCl", numer:3.0},
  {id:85, q:"CH₄ 分子数が12.0×10²³個ある時、標準状態の気体で何Lか？",   ans:44.8, qtype:"N_to_L", substance:"CH₄", numer:12.0},
  {id:86, q:"H₂SO₄の分子数が24.0×10²³個ある時、標準状態の気体で何Lか？",ans:89.6, qtype:"N_to_L", substance:"H₂SO₄", numer:24.0},
  {id:87, q:"HNO₃の分子数が3.0×10²³個ある時、標準状態の気体で何Lか？",  ans:11.2, qtype:"N_to_L", substance:"HNO₃", numer:3.0},
  {id:88, q:"SO₂の分子数が18.0×10²³個ある時、標準状態の気体で何Lか？",  ans:67.2, qtype:"N_to_L", substance:"SO₂", numer:18.0},
  {id:89, q:"Heの分子数が12.0×10²³個ある時、標準状態の気体で何Lか？",   ans:44.8, qtype:"N_to_L", substance:"He",  numer:12.0},
  {id:90, q:"H₂O 分子数が24.0×10²³個ある時、標準状態の気体で何Lか？",   ans:89.6, qtype:"N_to_L", substance:"H₂O", numer:24.0},
  // 91-100: L→g
  {id:91,  q:"CO₂ 22.4Lの標準状態の気体は何gか？",   ans:44,   qtype:"L_to_g", substance:"CO₂", molarMass:44, given:22.4},
  {id:92,  q:"CO 67.2Lの標準状態の気体は何gか？",    ans:84,   qtype:"L_to_g", substance:"CO",  molarMass:28, given:67.2},
  {id:93,  q:"NH₃ 44.8Lの標準状態の気体は何gか？",   ans:34,   qtype:"L_to_g", substance:"NH₃", molarMass:17, given:44.8},
  {id:94,  q:"HCl 22.4Lの標準状態の気体は何gか？",   ans:36.5, qtype:"L_to_g", substance:"HCl", molarMass:36.5, given:22.4},
  {id:95,  q:"CH₄ 5.6Lの標準状態の気体は何gか？",    ans:4,    qtype:"L_to_g", substance:"CH₄", molarMass:16, given:5.6},
  {id:96,  q:"H₂SO₄ 44.8Lの標準状態の気体は何gか？", ans:196,  qtype:"L_to_g", substance:"H₂SO₄", molarMass:98, given:44.8},
  {id:97,  q:"HNO₃ 67.2Lの標準状態の気体は何gか？",  ans:189,  qtype:"L_to_g", substance:"HNO₃", molarMass:63, given:67.2},
  {id:98,  q:"C₂H₆ 5.6Lの標準状態の気体は何gか？",   ans:7.5,  qtype:"L_to_g", substance:"C₂H₆", molarMass:30, given:5.6},
  {id:99,  q:"SO₂ 11.2Lの標準状態の気体は何gか？",   ans:32,   qtype:"L_to_g", substance:"SO₂", molarMass:64, given:11.2},
  {id:100, q:"H₂O 44.8Lの標準状態の気体は何gか？",   ans:36,   qtype:"L_to_g", substance:"H₂O", molarMass:18, given:44.8},
  // 101-110: 個数→g
  {id:101, q:"CO₂の分子数が6.0×10²³個ある時何gか？",    ans:44,  qtype:"N_to_g", substance:"CO₂", molarMass:44, numer:6.0},
  {id:102, q:"COの分子数が12.0×10²³個ある時何gか？",    ans:56,  qtype:"N_to_g", substance:"CO",  molarMass:28, numer:12.0},
  {id:103, q:"NH₃の分子数が18.0×10²³個ある時何gか？",   ans:51,  qtype:"N_to_g", substance:"NH₃", molarMass:17, numer:18.0},
  {id:104, q:"HClの分子数が12.0×10²³個ある時何gか？",   ans:73,  qtype:"N_to_g", substance:"HCl", molarMass:36.5, numer:12.0},
  {id:105, q:"CH₄ 分子数が12.0×10²³個ある時何gか？",    ans:32,  qtype:"N_to_g", substance:"CH₄", molarMass:16, numer:12.0},
  {id:106, q:"H₂SO₄の分子数が24.0×10²³個ある時何gか？", ans:392, qtype:"N_to_g", substance:"H₂SO₄", molarMass:98, numer:24.0},
  {id:107, q:"HNO₃の分子数が3.0×10²³個ある時何gか？",   ans:31.5,qtype:"N_to_g", substance:"HNO₃", molarMass:63, numer:3.0},
  {id:108, q:"Cuの分子数が18.0×10²³個ある時何gか？",    ans:192, qtype:"N_to_g", substance:"Cu",  molarMass:64, numer:18.0},
  {id:109, q:"NaOHの分子数が12.0×10²³個ある時何gか？",  ans:80,  qtype:"N_to_g", substance:"NaOH",molarMass:40, numer:12.0},
  {id:110, q:"H₂O 分子数が24.0×10²³個ある時何gか？",    ans:72,  qtype:"N_to_g", substance:"H₂O", molarMass:18, numer:24.0},
  // 111-120: L→個数
  {id:111, q:"CO₂の標準状態で22.4Lの気体の分子数はいくらか？",    ans:"6.0×10²³", qtype:"L_to_N", substance:"CO₂", given:22.4, numer:6.0},
  {id:112, q:"COの標準状態で67.2Lの気体の分子数はいくらか？",     ans:"1.8×10²⁴", qtype:"L_to_N", substance:"CO",  given:67.2, numer:18.0},
  {id:113, q:"NH₃の標準状態で44.8Lの気体の分子数はいくらか？",    ans:"1.2×10²⁴", qtype:"L_to_N", substance:"NH₃", given:44.8, numer:12.0},
  {id:114, q:"HClの標準状態で11.2Lの気体の分子数はいくらか？",    ans:"3.0×10²³", qtype:"L_to_N", substance:"HCl", given:11.2, numer:3.0},
  {id:115, q:"CH₄の標準状態で5.6Lの気体の分子数はいくらか？",     ans:"1.5×10²³", qtype:"L_to_N", substance:"CH₄", given:5.6, numer:1.5},
  {id:116, q:"H₂SO₄の標準状態で44.8Lの気体の分子数はいくらか？",  ans:"1.2×10²⁴", qtype:"L_to_N", substance:"H₂SO₄", given:44.8, numer:12.0},
  {id:117, q:"HNO₃の標準状態で67.2Lの気体の分子数はいくらか？",   ans:"1.8×10²⁴", qtype:"L_to_N", substance:"HNO₃", given:67.2, numer:18.0},
  {id:118, q:"SO₂の標準状態で5.6Lの気体の分子数はいくらか？",     ans:"1.5×10²³", qtype:"L_to_N", substance:"SO₂", given:5.6, numer:1.5},
  {id:119, q:"Arの標準状態で11.2Lの気体の分子数はいくらか？",     ans:"3.0×10²³", qtype:"L_to_N", substance:"Ar",  given:11.2, numer:3.0},
  {id:120, q:"H₂Oの標準状態で44.8Lの気体の分子数はいくらか？",    ans:"1.2×10²⁴", qtype:"L_to_N", substance:"H₂O", given:44.8, numer:12.0},
];

function getMolQuestions(mode) {
  let pool;
  if (mode==="intro")  pool = MOL_QUESTIONS_RAW.filter(q=>q.id<=20);
  else if (mode==="basic") pool = MOL_QUESTIONS_RAW.filter(q=>q.id>=21&&q.id<=60);
  else if (mode==="adv")   pool = MOL_QUESTIONS_RAW.filter(q=>q.id>=61);
  else pool = MOL_QUESTIONS_RAW;
  return shuffle(pool).slice(0,10);
}


// 指数表記を見やすく表示するコンポーネント
function MolChoice({ val }) {
  if (typeof val !== "string" || !val.includes("×10")) return <span>{val}</span>;
  // "1.8×10²⁴" → "1.8×10" + sup("24")
  const match = val.match(/^(.+)×10(.+)$/);
  if (!match) return <span>{val}</span>;
  const [, coef, exp] = match;
  // ²³→23, ²⁴→24 などに変換
  const expNum = exp.replace(/²/g,"2").replace(/³/g,"3").replace(/⁴/g,"4").replace(/⁵/g,"5");
  return <span>{coef}×10<sup style={{fontSize:".7em"}}>{expNum}</sup></span>;
}

// ── MolSetupScreen ─────────────────────────────────────────
function MolSetupScreen({ onStart, onBack }) {
  const [mode, setMode] = useState("intro");
  const modes = [
    { value:"intro", label:"🌱 入門",   desc:"問題1〜20（g↔mol）",      color:"#22c55e", light:"#dcfce7" },
    { value:"basic", label:"📘 基礎",   desc:"問題21〜60（L↔mol・個数）", color:"#3b82f6", light:"#dbeafe" },
    { value:"adv",   label:"🔥 応用",   desc:"問題61〜120（2段変換）",    color:"#ef4444", light:"#fee2e2" },
    { value:"random",label:"🎲 ランダム",desc:"全120問からランダム10問",   color:"#8b5cf6", light:"#ede9fe" },
  ];
  return (
    <div className="card">
      <div className="fb2 mb13">
        <button className="btn btn-s btn-sm" onClick={onBack}>← 戻る</button>
        <span style={{fontWeight:700}}>🧮 mol計算ドリル</span><span/>
      </div>
      <div style={{background:"#f8fafc",borderRadius:9,padding:"10px 12px",marginBottom:14,fontSize:".75rem",color:"#475569",lineHeight:1.7}}>
        <div style={{fontWeight:700,marginBottom:3}}>📌 原子量・定数</div>
        <div style={{fontFamily:"monospace",fontSize:".72rem"}}>{MOL_CONST_TEXT}</div>
      </div>
      <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>モードを選択</div>
      <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:16}}>
        {modes.map(m=>{
          const active = mode===m.value;
          return (
            <div key={m.value} onClick={()=>setMode(m.value)}
              style={{border:`2px solid ${active?m.color:"var(--border)"}`,borderRadius:9,padding:"11px 14px",cursor:"pointer",background:active?m.light:"#fff",display:"flex",alignItems:"center",gap:12,transition:"all .12s"}}>
              <span style={{fontSize:"1.3rem"}}>{m.label.split(" ")[0]}</span>
              <div>
                <div style={{fontWeight:700,fontSize:".95rem",color:active?m.color:"var(--text)"}}>{m.label.split(" ").slice(1).join(" ")}</div>
                <div style={{fontSize:".75rem",color:"var(--muted)"}}>{m.desc}</div>
              </div>
              {active&&<span style={{marginLeft:"auto",color:m.color,fontWeight:700}}>✓</span>}
            </div>
          );
        })}
      </div>
      <button className="btn btn-blk" style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:700}} onClick={()=>onStart(mode,"solo")}>
        🚀 スタート！
      </button>
      <AppFooter/>
    </div>
  );
}


// ============================================================
// タイムアタックモード（元素/イオン/化学式を10問・最速で）
// ============================================================
function TimeAttackSetupScreen({ onStart, onBack }) {
  const [quizMode, setQMode] = useState("element");
  const [maxNum, setMaxNum] = useState(20);
  const [minNum, setMinNum] = useState(1);
  const [subLevel, setSubLevel] = useState("junior");

  const modes = [
    { value:"element", label:"⚛️ 元素記号", color:"var(--primary)", light:"var(--pl)" },
    { value:"ion",     label:"⚡ イオン",   color:"var(--ion)",     light:"var(--ion-l)" },
    { value:"formula", label:"🧬 化学式",   color:"var(--form)",    light:"var(--form-l)" },
  ];

  return (
    <div className="card">
      <div className="fb2 mb13">
        <button className="btn btn-s btn-sm" onClick={onBack}>← 戻る</button>
        <span style={{fontWeight:700}}>⏱ タイムアタック</span><span/>
      </div>
      <div style={{textAlign:"center",marginBottom:14}}>
        <span className="ta-badge">10問を最速クリア！</span>
        <p className="muted" style={{marginTop:6,fontSize:".82rem"}}>全問正解するまで終わらない。速さを競おう！</p>
      </div>
      <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>クイズの種類</div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
        {modes.map(m=>{
          const active=quizMode===m.value;
          return (
            <div key={m.value} onClick={()=>setQMode(m.value)}
              style={{border:`2px solid ${active?m.color:"var(--border)"}`,borderRadius:9,padding:"10px 14px",cursor:"pointer",background:active?m.light:"#fff",display:"flex",alignItems:"center",gap:10,transition:"all .12s"}}>
              <span style={{fontSize:"1.2rem"}}>{m.label.split(" ")[0]}</span>
              <span style={{fontWeight:700,color:active?m.color:"var(--text)"}}>{m.label.split(" ").slice(1).join(" ")}</span>
              {active&&<span style={{marginLeft:"auto",color:m.color,fontWeight:700}}>✓</span>}
            </div>
          );
        })}
      </div>
      {quizMode==="element"&&(
        <div style={{marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:".86rem",marginBottom:6}}>出題範囲</div>
          <RangeSelector minNum={minNum} maxNum={maxNum} onChangeMin={setMinNum} onChangeMax={setMaxNum}/>
        </div>
      )}
      {(quizMode==="ion"||quizMode==="formula")&&(
        <div style={{marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:".86rem",marginBottom:6}}>レベル</div>
          <div className="g2" style={{margin:0}}>
            {[["junior","📗 中学"],["senior","📕 高校"]].map(([v,l])=>(
              <div key={v} onClick={()=>setSubLevel(v)}
                style={{border:`2px solid ${subLevel===v?"var(--primary)":"var(--border)"}`,borderRadius:9,padding:"9px 10px",cursor:"pointer",textAlign:"center",background:subLevel===v?"var(--pl)":"#fff",fontWeight:700,fontSize:".88rem",transition:"all .12s"}}>
                {l}
              </div>
            ))}
          </div>
        </div>
      )}
      <button className="btn btn-blk" style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"#fff",fontWeight:700}}
        onClick={()=>onStart({quizMode,maxNum,subLevel})}>
        ⏱ スタート！
      </button>
    </div>
  );
}

function TimeAttackQuizScreen({ settings, onFinish }) {
  const { quizMode, maxNum, subLevel } = settings;
  const isIon = quizMode==="ion";
  const isFormula = quizMode==="formula";
  const elements = isFormula ? getFormulas(subLevel) : isIon ? getIons(subLevel) : ALL_ELEMENTS.filter(e=>e.number>=(minNum||1)&&e.number<=(maxNum||20));
  const genQ = isFormula ? generateFormulaQ : isIon ? generateIonQ : generateElementQ;
  const [q, setQ] = useState(()=>genQ(elements, null, "random", "normal"));
  const [elapsed, setElapsed] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("none");
  const correctRef = useRef(0), answeredRef = useRef(0);
  const startTime = useRef(Date.now());
  const timerRef = useRef();

  useEffect(()=>{
    bgm.start("play");
    timerRef.current = setInterval(()=>setElapsed(Math.floor((Date.now()-startTime.current)/1000)),100);
    return()=>{clearInterval(timerRef.current);bgm.stop();};
  },[]);

  const handleChoice = (choice) => {
    if(selected!==null) return;
    const isOk = choice===q.answer;
    setSelected(choice); setFeedback(isOk?"ok":"ng");
    answeredRef.current+=1; setAnswered(answeredRef.current);
    if(isOk){ correctRef.current+=1; setCorrect(correctRef.current); bgm.se("correct"); }
    else bgm.se("wrong");

    setTimeout(()=>{
      if(isOk && correctRef.current>=10){
        clearInterval(timerRef.current); bgm.stop(); bgm.se("finish");
        const t = Math.floor((Date.now()-startTime.current)/1000);
        const score = calcTimeAttackScore(10, 10, t);
        onFinish({score, correct:10, total:10, elapsed:t, totalAnswered:answeredRef.current});
      } else {
        setQ(genQ(elements, null, "random", "normal"));
        setSelected(null); setFeedback("none");
      }
    }, isOk ? 300 : 500);
  };

  const mins = Math.floor(elapsed/60);
  const secs = elapsed%60;

  return (
    <div>
      <div className="card">
        <div className="qhd">
          <div style={{fontFamily:"Space Mono,monospace",fontSize:"1.3rem",fontWeight:700,color:"#f59e0b"}}>
            ⏱ {mins}:{String(secs).padStart(2,"0")}
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <span className="ta-badge">{correct}/10</span>
            <span className="muted" style={{fontSize:".78rem"}}>#{answeredRef.current+1}</span>
          </div>
          <div className="scd">✓{correct}</div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={{height:8,background:"var(--border)",borderRadius:4,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${correct/10*100}%`,background:"linear-gradient(90deg,#f59e0b,#ef4444)",borderRadius:4,transition:"width .3s"}}/>
          </div>
        </div>
        <div className={`fb fb-${feedback}`}/>
        <div className="qc">
          <div className="ql">{q.label}</div>
          <div className={`qe ${q.isSymbol?"":"sm"}`}>{q.display}</div>
        </div>
        <div className="chs">
          {q.choices.map((c,i)=>(
            <button key={i}
              className={`ch ${q.isSymbol?"cn":""} ${selected!==null?"dis":""} ${selected!==null&&c===q.answer?"ok":""} ${selected===c&&c!==q.answer?"ng":""}`}
              onClick={()=>handleChoice(c)}>{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimeAttackResultScreen({ result, nickname, settings, onHome, onRetry }) {
  const [showRankModal, setShowRankModal] = useState(true);
  const [rankSaved, setRankSaved] = useState(false);
  const mins = Math.floor(result.elapsed/60);
  const secs = result.elapsed%60;
  const acc = Math.round(result.correct/result.totalAnswered*100);

  return (
    <div>
      {showRankModal&&(
        <RankingModal score={result.score} correct={result.correct} total={result.totalAnswered}
          nickname={nickname} quizMode="timeattack" maxNum={settings?.maxNum} subLevel={settings?.subLevel||"junior"} difficulty="normal"
          onDone={(saved)=>{setRankSaved(saved);setShowRankModal(false);}}/>
      )}
      <div className="card">
        <div style={{textAlign:"center",padding:"14px 0"}}>
          <div style={{fontSize:"1.7rem",marginBottom:4}}>🏁 クリア！</div>
          <div style={{fontSize:"3rem",fontWeight:900,color:"#f59e0b",fontFamily:"Space Mono,monospace"}}>{mins}:{String(secs).padStart(2,"0")}</div>
          <div style={{color:"var(--muted)",fontSize:".82rem"}}>クリアタイム</div>
          {rankSaved&&<div style={{marginTop:6,fontSize:".82rem",color:"var(--success)",fontWeight:700}}>✅ ランキングに登録しました！</div>}
        </div>
        <div className="s3">
          <div className="sb"><div className="sv" style={{color:"var(--primary)"}}>{result.score}</div><div className="sk">スコア</div></div>
          <div className="sb"><div className="sv">{result.totalAnswered}</div><div className="sk">解答数</div></div>
          <div className="sb"><div className="sv">{acc}%</div><div className="sk">正答率</div></div>
        </div>
        <p className="muted tc" style={{fontSize:".78rem"}}>10問正解するまでの総解答数 {result.totalAnswered}問</p>
      </div>
      <div className="gap8">
        <button className="btn" style={{flex:1,background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"#fff",fontWeight:700}} onClick={onRetry}>🔁 もう一度</button>
        <button className="btn btn-s" style={{flex:1}} onClick={onHome}>🏠 ホーム</button>
      </div>
    </div>
  );
}

// ── MolBattleLobby ──────────────────────────────────────────
function MolBattleLobby({ nickname, onBack }) {
  const [phase, setPhase] = useState("menu");
  const [molMode, setMolMode] = useState("intro");
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const pollRef = useRef();

  const genCode = () => Math.random().toString(36).slice(2,6).toUpperCase();

  const createRoom = async (mode) => {
    const code = genCode();
    const seed = Math.floor(Math.random()*100000);
    const room = { code, molMode:mode, host:nickname, seed,
      players:[{name:nickname, status:"waiting", score:0, miss:0}],
      status:"waiting", createdAt:Date.now() };
    await sSet(`molroom_${code}`, JSON.stringify(room), true);
    setRoomCode(code); setRoomData(room); setMolMode(mode); setIsHost(true); setPhase("waiting");
    startPoll(code);
  };

  const joinRoom = async () => {
    const code = joinCode.toUpperCase().trim();
    const res = await sGet(`molroom_${code}`, true);
    if (!res) { alert("ルームが見つかりません"); return; }
    try {
      const room = JSON.parse(res.value);
      if (room.status !== "waiting") { alert("すでに対戦が始まっています"); return; }
      if (!room.players.find(p=>p.name===nickname))
        room.players.push({name:nickname, status:"waiting", score:0, miss:0});
      await sSet(`molroom_${code}`, JSON.stringify(room), true);
      setRoomCode(code); setRoomData(room); setMolMode(room.molMode); setIsHost(false); setPhase("waiting");
      startPoll(code);
    } catch { alert("エラーが発生しました"); }
  };

  const startPoll = (code) => {
    clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      const res = await sGet(`molroom_${code}`, true);
      if (!res) return;
      try {
        const room = JSON.parse(res.value);
        setRoomData(room);
        if (room.status === "playing") { clearInterval(pollRef.current); setPhase("countdown"); }
      } catch {}
    }, 1500);
  };

  const startGame = async () => {
    const res = await sGet(`molroom_${roomCode}`, true);
    if (!res) return;
    const room = JSON.parse(res.value);
    room.status = "playing";
    await sSet(`molroom_${roomCode}`, JSON.stringify(room), true);
    clearInterval(pollRef.current); setPhase("countdown");
  };

  const handleQuizFinish = async (result) => {
    setQuizResult(result);
    const res = await sGet(`molroom_${roomCode}`, true);
    if (res) {
      const room = JSON.parse(res.value);
      const pl = room.players.find(p=>p.name===nickname);
      if (pl) { pl.score = result.total - result.miss; pl.miss = result.miss; pl.status = "done"; }
      if (room.players.every(p=>p.status==="done")) room.status = "done";
      await sSet(`molroom_${roomCode}`, JSON.stringify(room), true);
      setRoomData(room);
    }
    setPhase("result_wait");
    pollRef.current = setInterval(async () => {
      const r = await sGet(`molroom_${roomCode}`, true);
      if (r) {
        const rm = JSON.parse(r.value);
        setRoomData(rm);
        if (rm.status==="done" || rm.players.every(p=>p.status==="done")) {
          clearInterval(pollRef.current);
          const sorted = [...rm.players].sort((a,b)=>b.score-a.score);
          setBattleResult(sorted.map(p=>({name:p.name, score:p.score, miss:p.miss, isMe:p.name===nickname})));
          setPhase("result");
        }
      }
    }, 1500);
  };

  useEffect(()=>()=>clearInterval(pollRef.current),[]);

  const modeLabels = {intro:"入門",basic:"基礎",adv:"応用",random:"ランダム"};

  if (phase==="countdown") return <Countdown onDone={()=>setPhase("quiz")}/>;
  if (phase==="quiz") return <MolQuizScreen mode={molMode} onFinish={handleQuizFinish} onExit={()=>{clearInterval(pollRef.current);onBack();}}/>;

  if (phase==="result") return (
    <div>
      <div className="card">
        <div style={{fontWeight:700,marginBottom:10}}>⚔️ mol対戦結果</div>
        {battleResult.map((p,i)=>(
          <div key={i} className="btr" style={p.isMe?{background:"#ede9fe"}:{}}>
            <span style={{fontSize:"1.25rem"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}位`}</span>
            <span style={{flex:1,fontWeight:700}}>{p.name}{p.isMe&&<span className="bdg by" style={{marginLeft:5}}>あなた</span>}</span>
            <span style={{fontFamily:"Space Mono",fontWeight:700,color:"#6366f1"}}>{p.score}/10正解</span>
          </div>
        ))}
      </div>
      <MolResultScreen result={quizResult}
        onHome={()=>{clearInterval(pollRef.current);onBack();}}
        onRetry={()=>{clearInterval(pollRef.current);onBack();}}/>
    </div>
  );

  if (phase==="result_wait") {
    const w = roomData?.players.filter(p=>p.status!=="done").length||0;
    return <div className="card tc">
      <p style={{fontSize:"2rem",marginBottom:10}}>⏳</p>
      <h3 style={{fontWeight:700,marginBottom:6}}>正解数: {quizResult?.total - quizResult?.miss}問</h3>
      <p className="muted">他のプレイヤーを待っています... ({w}人)</p>
      <button className="btn btn-s" style={{marginTop:12}} onClick={()=>{clearInterval(pollRef.current);onBack();}}>🏠 退出</button>
    </div>;
  }

  if (phase==="waiting") return (
    <div>
      <div className="card">
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={()=>{clearInterval(pollRef.current);onBack();}}>🏠 退出</button>
          <span style={{fontWeight:700}}>{isHost?"ルーム作成":"参加中"}</span><span/>
        </div>
        <p className="muted tc mb8">ルームコードを共有しよう</p>
        <div className="rc">{roomCode}</div>
        <p className="muted tc" style={{fontSize:".75rem",marginBottom:13}}>
          mol計算({modeLabels[molMode]}) ｜ このコードを友達に伝えてね
        </p>
        <h4 style={{fontWeight:700,marginBottom:6}}>参加者 ({roomData?.players?.length||0}人)</h4>
        <ul className="rlist">
          {roomData?.players?.map((p,i)=>(
            <li key={i} className="pli">
              <span className="pldot"/>
              <span style={{flex:1,fontWeight:700}}>{p.name}</span>
              {p.name===roomData.host&&<span className="bdg bh">ホスト</span>}
              {p.name===nickname&&<span className="bdg by">あなた</span>}
            </li>
          ))}
        </ul>
        {!isHost&&<p className="muted tc" style={{marginTop:10}}>ホストがゲームを開始するまでお待ちください</p>}
      </div>
      {isHost&&<button className="btn btn-blk" style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"#fff",fontWeight:700}} onClick={startGame}>
        🚀 ゲーム開始！ ({roomData?.players?.length||0}人)
      </button>}
    </div>
  );

  if (phase==="create") return (
    <MolSetupScreen
      onBack={()=>setPhase("menu")}
      onStart={(mode,_)=>createRoom(mode)}/>
  );

  if (phase==="join") return (
    <div className="card">
      <div className="fb2 mb13">
        <button className="btn btn-s btn-sm" onClick={()=>setPhase("menu")}>← 戻る</button>
        <span style={{fontWeight:700}}>ルームに参加</span><span/>
      </div>
      <div className="ig">
        <label>ルームコードを入力</label>
        <input className="inp" value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())}
          placeholder="例: AB12" maxLength={4}
          style={{fontFamily:"Space Mono",fontSize:"1.4rem",letterSpacing:6,textAlign:"center"}}/>
      </div>
      <button className="btn btn-blk" style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:700}}
        onClick={joinRoom} disabled={joinCode.length<4}>参加する</button>
      <AppFooter/>
    </div>
  );

  // menu
  return (
    <div>
      <div className="card">
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={onBack}>← 戻る</button>
          <span style={{fontWeight:700}}>⚔️ mol対戦モード</span><span/>
        </div>
        <p className="muted tc mb13">友達とルームコードで同時対戦！<br/>同じ問題を解いて正解数を競おう</p>
        <div className="g2">
          <div className="sc" onClick={()=>setPhase("create")} style={{borderColor:"#6366f1"}}>
            <div className="ic">🏠</div><div className="nm">ルームを作る</div>
          </div>
          <div className="sc" onClick={()=>setPhase("join")} style={{borderColor:"#6366f1"}}>
            <div className="ic">🚪</div><div className="nm">ルームに入る</div>
          </div>
        </div>
      </div>
      <AppFooter/>
    </div>
  );
}

// ── MolQuizScreen ──────────────────────────────────────────
function MolQuizScreen({ mode, onFinish, onExit=null }) {
  const [questions] = useState(()=>getMolQuestions(mode));
  const [qIdx, setQIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("none");
  const [missCount, setMissCount] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [skipCount, setSkipCount] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [penaltyAnim, setPenaltyAnim] = useState(false);
  const [mistakes, setMistakes] = useState([]);
  const timerRef = useRef();
  const tlRef = useRef(300);
  const missRef = useRef(0), hintRef = useRef(0), skipRef = useRef(0), mistakesRef = useRef([]);

  const q = questions[qIdx];
  const hints = getMolHints(q);

  // 選択肢生成（科学的記数法で統一）
  // 指数表記文字列ansを実数に戻す（個数系のみ）
  const ansToNum = (qq) => {
    if (typeof qq.ans !== "string") return qq.ans;
    // "6.0×10²³" → 6.0e23 などに変換
    const s = qq.ans;
    const expMap = {"²²":22,"²³":23,"²⁴":24,"²⁵":25,"²⁶":26};
    for (const [k,v] of Object.entries(expMap)) {
      if (s.includes(k)) {
        const coef = parseFloat(s.split("×")[0]);
        return coef * Math.pow(10, v);
      }
    }
    return parseFloat(s);
  };
  const ansDisplay = (qq) => {
    if (typeof qq.ans === "string") {
      const num = ansToNum(qq);
      return toSciNotation(num, 2);
    }
    return fmtMolVal(qq.ans);
  };

  const [choices] = useState(()=>{
    return questions.map(qq=>{
      const isExp = typeof qq.ans === "string"; // すでに指数表記（個数系）
      const ansStr = fmtMolVal(qq.ans);

      if (isExp) {
        // 個数系：実際の個数値からtoSciNotationで正規化したダミーを生成
        const numer = qq.numer || 6.0;
        const base = numer * 1e23; // 実際の値
        const correctStr = toSciNotation(base, 2); // 正規化した正解
        const rawDummies = [
          base * 2, base / 2, base * 3, base * 0.5,
          base * 10, base / 10,
        ].filter(x => x > 0);
        const candidates = [...new Set(rawDummies.map(d => toSciNotation(d, 2)))]
          .filter(x => x !== correctStr);
        const dummies = shuffle(candidates).slice(0,3);
        return shuffle([correctStr, ...dummies]);
      } else {
        // 数値系：科学的記数法でフォーマット
        const dummies = genMolDummies(qq.ans, qq.qtype);
        const formatted = dummies
          .map(d => fmtMolVal(d))
          .filter(d => d !== ansStr);
        const unique = [...new Set(formatted)];
        // 3個に足りない場合は倍数で補完
        const multipliers = [2, 3, 4, 5, 0.25, 6, 0.1, 10];
        for (const m of multipliers) {
          if (unique.length >= 3) break;
          const extra = fmtMolVal(qq.ans * m);
          if (!unique.includes(extra) && extra !== ansStr && extra !== "0") {
            unique.push(extra);
          }
        }
        return shuffle([ansStr, ...unique.slice(0,3)]);
      }
    });
  });

  useEffect(()=>{
    bgm.start("play");
    timerRef.current = setInterval(()=>{
      setTimeLeft(t=>{
        const next = t - 1;
        if(next <= 0){clearInterval(timerRef.current);finishGame();return 0;}
        if(next >= 300){clearInterval(timerRef.current);finishGame();return 0;}
        tlRef.current = next;
        return next;
      });
    },1000);
    return()=>{clearInterval(timerRef.current);bgm.stop();};
  },[]);

  const finishGame = ()=>{
    clearInterval(timerRef.current);
    const correct = questions.length - missRef.current;
    const molScore = calcMolScore(correct, questions.length, tlRef.current);
    onFinish({score:molScore, timeLeft:tlRef.current, miss:missRef.current, hints:hintRef.current, skips:skipRef.current, total:questions.length, correct, mistakes:mistakesRef.current, questions});
  };

  const handleChoice = (choice)=>{
    if(selected!==null) return;
        const correctAns = typeof q.ans === "string"
      ? toSciNotation((q.numer||6)*1e23, 2)
      : fmtMolVal(q.ans);
    const isOk = String(choice) === correctAns; setSelected(choice); setFeedback(isOk?"ok":"ng");
    if(!isOk){ missRef.current+=1; setMissCount(missRef.current); mistakesRef.current=[...mistakesRef.current,{q,yours:choice}]; setMistakes(mistakesRef.current); bgm.se("wrong"); }
    else bgm.se("correct");
    setTimeout(()=>{
      setSelected(null); setFeedback("none"); setHintLevel(0); setShowHint(false);
      if(qIdx+1>=questions.length) finishGame();
      else setQIdx(i=>i+1);
    },500);
  };

  const handleSkip = ()=>{
    missRef.current+=1; skipRef.current+=1; setMissCount(missRef.current); setSkipCount(skipRef.current);
    mistakesRef.current=[...mistakesRef.current,{q,yours:"スキップ"}]; setMistakes(mistakesRef.current);
    setSelected(null); setFeedback("none"); setHintLevel(0); setShowHint(false);
    if(qIdx+1>=questions.length) finishGame();
    else setQIdx(i=>i+1);
  };

  const handleHint = ()=>{
    if(hintLevel<3){ const nl=hintLevel+1; setHintLevel(nl); setShowHint(true); if(nl===1){hintRef.current+=1;setHintCount(hintRef.current);} }
  };

  const mins = Math.floor(timeLeft/60);
  const secs = timeLeft%60;
  const lamps = 5;
  const litLamps = Math.ceil((timeLeft/300)*lamps);
  const urgent = timeLeft<=60;

  return (
    <div>
      {/* 原子量定数バー */}
      <div style={{background:"#1e293b",color:"#94a3b8",fontSize:".65rem",padding:"6px 12px",borderRadius:8,marginBottom:10,fontFamily:"monospace",lineHeight:1.6}}>
        {MOL_CONST_TEXT}
      </div>
      <div className="card">
        {/* ヘッダー */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={{fontFamily:"Space Mono,monospace",fontSize:"1.3rem",fontWeight:700,color:urgent?"var(--danger)":"var(--primary)",animation:urgent?"pulse .5s infinite alternate":"none"}}>
            ⏱ {mins}:{String(secs).padStart(2,"0")}
            <span style={{marginLeft:8,fontSize:".9rem"}}>
              {Array(lamps).fill(0).map((_,i)=>(
                <span key={i} style={{color:i<litLamps?(urgent?"#ef4444":"#3b82f6"):"#cbd5e1"}}>●</span>
              ))}
            </span>
            {penaltyAnim&&<span style={{color:"#f59e0b",marginLeft:6,fontSize:".85rem",fontWeight:700}}>+5秒</span>}
          </div>
          {onExit&&<button onClick={()=>{clearInterval(timerRef.current);bgm.stop();onExit();}} style={{background:"none",border:"1px solid var(--border)",borderRadius:7,padding:"2px 8px",fontSize:".72rem",color:"var(--muted)",cursor:"pointer"}}>退出</button>}
          </div>
          <div style={{fontSize:".8rem",display:"flex",gap:8}}>
            <span style={{color:"#ef4444",fontWeight:700}}>✗{missCount}</span>
            <span style={{color:"#3b82f6",fontWeight:700}}>💡{hintCount}</span>
            <span style={{color:"#f59e0b",fontWeight:700}}>⏭{skipCount}</span>
          </div>
          <div style={{fontFamily:"Space Mono,monospace",fontSize:".85rem",color:"var(--muted)"}}>{qIdx+1}/10</div>
        </div>

        <div className={`fb fb-${feedback}`}/>

        {/* 問題 */}
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:".8rem",color:"var(--muted)",marginBottom:6,fontWeight:700,letterSpacing:".5px"}}>🧮 mol計算問題</div>
          <div style={{fontSize:"1.2rem",fontWeight:700,color:"var(--text)",lineHeight:1.5}}>{q.q}</div>
        </div>

        {/* ヒント */}
        {showHint&&(
          <div style={{background:"#eff6ff",border:"1px solid #93c5fd",borderRadius:8,padding:"10px 12px",marginBottom:12,fontSize:".82rem",color:"#1e40af"}}>
            {hints.slice(0,hintLevel).map((h,i)=><div key={i} style={{marginBottom:i<hintLevel-1?4:0}}>💡 {h}</div>)}
          </div>
        )}

        {/* 選択肢 */}
        <div className="chs" style={{marginBottom:12}}>
          {(choices[qIdx]||[]).map((c,i)=>(
            <button key={i}
              className={`ch ${selected!==null?"dis":""} ${selected!==null&&String(c)===String(q.ans)?"ok":""} ${selected===c&&String(c)!==String(q.ans)?"ng":""}`}
              style={{fontFamily:"Space Mono,monospace",fontSize:"1rem"}}
              onClick={()=>handleChoice(c)}>
              <MolChoice val={c}/>
            </button>
          ))}
        </div>

        {/* ヒント・スキップ */}
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-s btn-sm" style={{flex:1,color:"#3b82f6",borderColor:"#3b82f6"}}
            onClick={handleHint} disabled={hintLevel>=hints.length||selected!==null}>
            💡 ヒント {hintLevel>0?`(${hintLevel}/3)`:""}</button>
          <button className="btn btn-s btn-sm" style={{flex:1,color:"#f59e0b",borderColor:"#f59e0b"}}
            onClick={handleSkip} disabled={selected!==null}>
            ⏭ スキップ</button>
        </div>
      </div>
      <AppFooter/>
    </div>
  );
}

// ── MolResultScreen ─────────────────────────────────────────
function MolResultScreen({ result, nickname="", onHome, onRetry }) {
  const [showMiss, setShowMiss] = useState(false);
  const [showRankModal, setShowRankModal] = useState(!!nickname);
  const [rankSaved, setRankSaved] = useState(false);
  const correct = result.correct ?? (result.total - result.miss);
  const acc = Math.round(correct/result.total*100);
  const mins = Math.floor((300-result.timeLeft)/60);
  const secs = (300-result.timeLeft)%60;

  return (
    <div>
      {showRankModal&&nickname&&(
        <RankingModal score={result.score||0} correct={correct} total={result.total}
          nickname={nickname} quizMode="mol" maxNum={null} subLevel={result.molMode||"random"} difficulty="normal"
          onDone={(saved)=>{setRankSaved(saved);setShowRankModal(false);}}/>
      )}
      <div className="card">
        <div style={{textAlign:"center",padding:"14px 0"}}>
          <div style={{fontSize:"1.7rem",marginBottom:4}}>
            {acc>=90?"🥇 完璧！":acc>=70?"🥈 よくできました！":acc>=50?"🥉 もう少し！":"📚 練習しよう！"}
          </div>
          <div style={{fontSize:"2.5rem",fontWeight:900,color:"#6366f1",fontFamily:"Space Mono,monospace"}}>{result.score||0}</div>
          <div style={{color:"var(--muted)",fontSize:".82rem"}}>点</div>
          {rankSaved&&<div style={{marginTop:6,fontSize:".82rem",color:"var(--success)",fontWeight:700}}>✅ ランキングに登録しました！</div>}
        </div>
        <div className="s3">
          <div className="sb"><div className="sv" style={{color:"var(--success)"}}>{correct}</div><div className="sk">正解</div></div>
          <div className="sb"><div className="sv">{acc}%</div><div className="sk">正答率</div></div>
          <div className="sb"><div className="sv">{mins}:{String(secs).padStart(2,"0")}</div><div className="sk">タイム</div></div>
        </div>
        <div style={{display:"flex",gap:12,justifyContent:"center",fontSize:".85rem",marginTop:4}}>
          <span style={{color:"#3b82f6",fontWeight:700}}>💡 ヒント {result.hints}回</span>
          <span style={{color:"#f59e0b",fontWeight:700}}>⏭ スキップ {result.skips}回</span>
        </div>
      </div>

      {result.mistakes&&result.mistakes.length>0&&(
        <div className="card">
          <div className="fb2 mb8">
            <span style={{fontWeight:700}}>❌ 間違えた問題 ({result.mistakes.length}問)</span>
            <button className="btn btn-s btn-sm" onClick={()=>setShowMiss(v=>!v)}>{showMiss?"閉じる":"見る"}</button>
          </div>
          {showMiss&&result.mistakes.map((m,i)=>{
            const formula = getMolFormula(m.q);
            return (
              <div key={i} style={{padding:"9px 0",borderBottom:"1px solid var(--border)",fontSize:".83rem"}}>
                <div style={{fontWeight:700,marginBottom:4}}>{m.q.q}</div>
                <div style={{color:"var(--success)"}}>✓ 正解: {typeof m.q.ans==="string" ? toSciNotation((m.q.numer||6)*1e23,2) : fmtMolVal(m.q.ans)}</div>
                <div style={{color:"var(--danger)"}}>✗ あなた: {m.yours==="スキップ"?"スキップ":m.yours}</div>
                {formula&&(
                  <div style={{marginTop:5,background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:6,padding:"7px 10px",fontFamily:"monospace",fontSize:".78rem",color:"#166534",lineHeight:2}}>
                    {formula.split("\n").map((line,i)=>(
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="gap8">
        <button className="btn btn-p" style={{flex:1,background:"linear-gradient(135deg,#6366f1,#8b5cf6)"}} onClick={onRetry}>🔁 もう一度</button>
        <button className="btn btn-s" style={{flex:1}} onClick={onHome}>🏠 ホーム</button>
      </div>
      <AppFooter/>
    </div>
  );
}

// ── BattleLobby ────────────────────────────────────────────────
function BattleLobby({ nickname, quizMode, directionMode="random", subLevel="junior", difficulty="normal", onBack }) {
  const isIon=quizMode==="ion";
  const isFormula=quizMode==="formula";
  const [phase,setPhase]=useState("menu");
  const [roomCode,setRoomCode]=useState("");
  const [joinCode,setJoinCode]=useState("");
  const [roomData,setRoomData]=useState(null);
  const [maxNum,setMaxNum]=useState(20);
  const [minNum,setMinNum]=useState(1);
  const [quizResult,setQuizResult]=useState(null);
  const [battleResult,setBattleResult]=useState(null);
  const [isHost,setIsHost]=useState(false);
  const pollRef=useRef();
  const myId=useRef(Math.random().toString(36).slice(2,8));

  const genCode=()=>Math.random().toString(36).slice(2,6).toUpperCase();

  const createRoom=async(mn,dm,sl,dif)=>{
    const code=genCode();
    // mn は {min,max} オブジェクトまたは数値
    const minN = (mn&&typeof mn==="object") ? (mn.min||1) : 1;
    const maxN = (mn&&typeof mn==="object") ? (mn.max||20) : (mn||20);
    const room={code,minNum:minN,maxNum:maxN,quizMode,directionMode:dm||directionMode,subLevel:sl||subLevel,difficulty:dif||difficulty,host:nickname,seed:Math.floor(Math.random()*100000),
      players:[{id:myId.current,name:nickname,status:"waiting",score:0}],status:"waiting",createdAt:Date.now()};
    await sSet(`chemroom_${code}`,JSON.stringify(room),true);
    setRoomCode(code);setRoomData(room);setMaxNum(maxN);setIsHost(true);setPhase("waiting");
    startPoll(code);
  };

  const joinRoom=async()=>{
    const code=joinCode.toUpperCase().trim();
    const res=await sGet(`chemroom_${code}`,true);
    if(!res){alert("ルームが見つかりません");return;}
    try{
      const room=JSON.parse(res.value);
      if(room.status!=="waiting"){alert("すでに対戦が始まっています");return;}
      if(!room.players.find(p=>p.name===nickname))
        room.players.push({id:myId.current,name:nickname,status:"waiting",score:0});
      await sSet(`chemroom_${code}`,JSON.stringify(room),true);
      setRoomCode(code);setRoomData(room);setMaxNum(room.maxNum||20);setMinNum&&setMinNum(room.minNum||1);setIsHost(false);setPhase("waiting");
      startPoll(code);
    }catch{alert("エラーが発生しました");}
  };

  const startPoll=(code)=>{
    clearInterval(pollRef.current);
    pollRef.current=setInterval(async()=>{
      const res=await sGet(`chemroom_${code}`,true);
      if(!res)return;
      try{const room=JSON.parse(res.value);setRoomData(room);
        if(room.status==="playing"){clearInterval(pollRef.current);setPhase("countdown");}
      }catch{}
    },1500);
  };

  const startGame=async()=>{
    const res=await sGet(`chemroom_${roomCode}`,true);
    if(!res)return;
    const room=JSON.parse(res.value);room.status="playing";
    await sSet(`chemroom_${roomCode}`,JSON.stringify(room),true);
    clearInterval(pollRef.current);setPhase("countdown");
  };

  const handleQuizFinish=async(result)=>{
    setQuizResult(result);
    const res=await sGet(`chemroom_${roomCode}`,true);
    if(res){
      const room=JSON.parse(res.value);
      const pl=room.players.find(p=>p.name===nickname);
      if(pl){pl.score=result.score;pl.status="done";}
      if(room.players.every(p=>p.status==="done"))room.status="done";
      await sSet(`chemroom_${roomCode}`,JSON.stringify(room),true);setRoomData(room);
    }
    setPhase("result_wait");
    pollRef.current=setInterval(async()=>{
      const r=await sGet(`chemroom_${roomCode}`,true);
      if(r){const rm=JSON.parse(r.value);setRoomData(rm);
        if(rm.status==="done"||rm.players.every(p=>p.status==="done")){
          clearInterval(pollRef.current);
          const sorted=[...rm.players].sort((a,b)=>b.score-a.score);
          setBattleResult(sorted.map(p=>({name:p.name,score:p.score,isMe:p.name===nickname})));
          setPhase("result");
        }
      }
    },1500);
  };

  useEffect(()=>()=>clearInterval(pollRef.current),[]);

  if(phase==="countdown") return <Countdown onDone={()=>setPhase("quiz")}/>;
  if(phase==="quiz") return <QuizScreen maxNum={roomData?.maxNum||maxNum} minNum={roomData?.minNum||minNum||1} quizMode={quizMode} directionMode={roomData?.directionMode||directionMode} subLevel={roomData?.subLevel||subLevel} difficulty={roomData?.difficulty||difficulty} onFinish={handleQuizFinish} onExit={()=>{clearInterval(pollRef.current);onBack();}} seed={roomData?.seed}/>;
  if(phase==="result") return <ResultScreen result={quizResult} nickname={nickname} maxNum={maxNum} quizMode={quizMode} subLevel={roomData?.subLevel||subLevel}
    battleResult={battleResult} onHome={()=>{clearInterval(pollRef.current);onBack();}} onRetry={()=>{clearInterval(pollRef.current);onBack();}}/>;
  if(phase==="result_wait"){
    const w=roomData?.players.filter(p=>p.status!=="done").length||0;
    return <div className="card tc">
      <p style={{fontSize:"2rem",marginBottom:10}}>⏳</p>
      <h3 style={{fontWeight:700,marginBottom:6}}>あなたの結果: {quizResult?.score}点</h3>
      <p className="muted">他のプレイヤーを待っています... ({w}人)</p>
      <button className="btn btn-s" style={{marginTop:12}} onClick={()=>{clearInterval(pollRef.current);onBack();}}>🏠 退出</button>
    </div>;
  }
  if(phase==="waiting") return (
    <div>
      <div className="card">
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={()=>{clearInterval(pollRef.current);onBack();}}>🏠 退出</button>
          <span style={{fontWeight:700}}>{isHost?"ルーム作成":"参加中"}</span><span/>
        </div>
        <p className="muted tc mb8">ルームコードを共有しよう</p>
        <div className="rc">{roomCode}</div>
        <p className="muted tc" style={{fontSize:".75rem",marginBottom:13}}>
          {isIon?`イオン(${roomData?.subLevel==="junior"?"中学":"高校"})`:isFormula?`化学式(${roomData?.subLevel==="junior"?"中学":"高校"})`:`範囲: 1〜${maxNum}番`} ｜ このコードを友達に伝えてね
        </p>
        <h4 style={{fontWeight:700,marginBottom:6}}>参加者 ({roomData?.players?.length||0}人)</h4>
        <ul className="rlist">
          {roomData?.players?.map((p,i)=>(
            <li key={i} className="pli">
              <span className="pldot"/>
              <span style={{flex:1,fontWeight:700}}>{p.name}</span>
              {p.name===roomData.host&&<span className="bdg bh">ホスト</span>}
              {p.name===nickname&&<span className="bdg by">あなた</span>}
            </li>
          ))}
        </ul>
        {!isHost&&<p className="muted tc" style={{marginTop:10}}>ホストがゲームを開始するまでお待ちください</p>}
      </div>
      {isHost&&<button className="btn btn-a btn-blk" onClick={startGame}>🚀 ゲーム開始！ ({roomData?.players?.length||0}人)</button>}
    </div>
  );
  if(phase==="create") return <SetupScreen title={isIon?"イオン対戦:ルーム作成":isFormula?"化学式対戦:ルーム作成":"元素対戦:ルーム作成"} quizMode={quizMode} isBattle onStart={(mn,dm,sl,dif)=>createRoom(mn,dm,sl,dif)} onBack={()=>setPhase("menu")}/>;
  if(phase==="join") return (
    <div className="card">
      <div className="fb2 mb13">
        <button className="btn btn-s btn-sm" onClick={()=>setPhase("menu")}>← 戻る</button>
        <span style={{fontWeight:700}}>ルームに参加</span><span/>
      </div>
      <div className="ig">
        <label>ルームコードを入力</label>
        <input className="inp" value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())}
          placeholder="例: AB12" maxLength={4}
          style={{fontFamily:"Space Mono",fontSize:"1.4rem",letterSpacing:6,textAlign:"center"}}/>
      </div>
      <button className={`btn ${isIon?"btn-ion":"btn-p"} btn-blk`} onClick={joinRoom} disabled={joinCode.length<4}>参加する</button>
      <AppFooter/>
    </div>
  );
  return (
    <div>
      <div className="card">
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={onBack}>← 戻る</button>
          <span style={{fontWeight:700}}>{isIon?"⚡ イオン対戦":isFormula?"🧬 化学式対戦":"⚔️ 元素対戦"}</span><span/>
        </div>
        <p className="muted tc mb13">友達とルームコードで同時対戦！<br/>同じ問題を解いて点数を競おう</p>
        <div className="g2">
          <div className={`sc ${isIon?"ion-sc":isFormula?"form-sc":""}`} onClick={()=>setPhase("create")}><div className="ic">🏠</div><div className="nm">ルームを作る</div></div>
          <div className={`sc ${isIon?"ion-sc":isFormula?"form-sc":""}`} onClick={()=>setPhase("join")}><div className="ic">🚪</div><div className="nm">ルームに入る</div></div>
        </div>
      </div>
      <AppFooter/>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  const [screen,setScreen]=useState("home");
  const [nickname,setNickname]=useState("");
  const [maxNum,setMaxNum]=useState(20);
  const [minNum,setMinNum]=useState(1);
  const [quizMode,setQuizMode]=useState("element"); // "element" | "ion"
  const [directionMode,setDirectionMode]=useState("s2n");
  const [subLevel,setSubLevel]=useState("junior");
  const [difficulty,setDifficulty]=useState("normal");
  const [quizResult,setQuizResult]=useState(null);
  const [bgmOn,setBgmOn]=useState(true);
  const [molMode,setMolMode]=useState("intro");

  useEffect(()=>{
    const start=()=>{bgm.start("home");document.removeEventListener("click",start);};
    document.addEventListener("click",start);
    return()=>document.removeEventListener("click",start);
  },[]);

  const [todayCount,setTodayCount]=useState(0);

  const saveNickname=async(nick)=>{
    setNickname(nick);
    // 今日のプレイヤー数をカウント
    try {
      const today = new Date().toISOString().slice(0,10).replace(/-/g,"");
      const key = `players_${today}`;
      const res = await sGet(key, true);
      let count = 1;
      if(res) { try { count = parseInt(res.value)||0; count+=1; } catch{} }
      await sSet(key, String(count), true);
      setTodayCount(count);
    } catch{}
  };

  useEffect(()=>{
    // 起動時に今日のカウントを取得
    (async()=>{
      try {
        const today = new Date().toISOString().slice(0,10).replace(/-/g,"");
        const res = await sGet(`players_${today}`, true);
        if(res) setTodayCount(parseInt(res.value)||0);
      } catch{}
    })();
  },[]);

  const handleSoloFinish=(result)=>{
    bgm.stop();
    setQuizResult({...result,subLevel,difficulty});
    setScreen("result");
  };

  const toggleBgm=()=>{
    if(bgmOn){bgm.stop();setBgmOn(false);}
    else{bgm.start("home");setBgmOn(true);}
  };

  const goSetup=(mode)=>{bgm.stop();setQuizMode(mode);setDirectionMode(mode==="ion"||mode==="formula"?"n2f":"s2n");setSubLevel("junior");setScreen("setup");};
  const goBattle=(mode)=>{bgm.stop();setQuizMode(mode);setDirectionMode(mode==="ion"||mode==="formula"?"n2f":"s2n");setSubLevel("junior");setScreen("battle");};
  const goHome=()=>{if(bgmOn)bgm.start("home");setScreen("home");};

  const isIon=quizMode==="ion";
  const isFormula=quizMode==="formula";

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className={`hdr ${screen!=="home"&&isIon?"ion-mode":""}`}>
          <div className="hdr-orb"/>
          <div className="hdr-inner">
            <span style={{fontSize:"1.2rem",filter:"drop-shadow(0 0 6px rgba(165,180,252,.8))"}}>⚛️</span>
            <div className="hdr-title-wrap">
              <div className="hdr-app-name">CHEM BATTLE</div>
              <div className="hdr-tagline">SCIENCE QUIZ APP</div>
            </div>
            <button onClick={toggleBgm} style={{background:"none",border:"none",color:"rgba(165,243,252,.8)",cursor:"pointer",fontSize:"1rem",padding:4}}>{bgmOn?"🔊":"🔇"}</button>
          </div>
        </div>
        <div className="main">
          {screen==="home"&&(
            <HomeScreen nickname={nickname} onSetNickname={saveNickname}
              onSolo={goSetup} onBattle={goBattle}
              onRanking={()=>setScreen("ranking")}
              onMemo={()=>setScreen("memo")}
              onMol={(t)=>{bgm.stop();if(t==="battle")setScreen("mol_battle");else setScreen("mol_setup");}}
              bgmOn={bgmOn} onToggleBgm={toggleBgm} todayCount={todayCount}/>
          )}
          {screen==="setup"&&(
            <SetupScreen title={isIon?"イオンクイズ設定":"出題範囲を選択"} quizMode={quizMode} onBack={goHome}
              onStart={(mn,dm,sl,dif)=>{if(mn&&typeof mn==="object"){setMinNum(mn.min||1);setMaxNum(mn.max||20);}else{setMinNum(1);setMaxNum(mn||20);}setDirectionMode(dm||"random");setSubLevel(sl||"junior");setDifficulty(dif||"normal");bgm.stop();setScreen("countdown");}}/>
          )}
          {screen==="countdown"&&<Countdown onDone={()=>setScreen("quiz")}/>}
          {screen==="quiz"&&<QuizScreen maxNum={maxNum} minNum={minNum} quizMode={quizMode} directionMode={directionMode} subLevel={subLevel} difficulty={difficulty} onFinish={handleSoloFinish} onExit={()=>{bgm.stop();if(bgmOn)bgm.start("home");setScreen("home");}}/>}
          {screen==="result"&&quizResult&&(
            <ResultScreen result={quizResult} nickname={nickname} maxNum={maxNum} quizMode={quizMode} subLevel={subLevel}
              onHome={()=>{if(bgmOn)bgm.start("home");setScreen("home");}}
              onRetry={()=>{bgm.stop();setScreen("countdown");}}/>
          )}
          {screen==="ranking"&&<RankingScreen myNickname={nickname} onBack={()=>setScreen("home")}/>}
          {screen==="memo"&&<MemoScreen onBack={()=>setScreen("home")}/>}
          {screen==="mol_setup"&&<MolSetupScreen onBack={()=>setScreen("home")} onStart={(m,t)=>{setMolMode(m);bgm.stop();setScreen("mol_countdown");}}/>}
          {screen==="mol_battle"&&<MolBattleLobby nickname={nickname} onBack={()=>{if(bgmOn)bgm.start("home");setScreen("home");}}/>}
          {screen==="mol_countdown"&&<Countdown onDone={()=>setScreen("mol_quiz")}/>}
          {screen==="mol_quiz"&&<MolQuizScreen mode={molMode} onFinish={r=>{bgm.stop();bgm.se("finish");setQuizResult({...r,_mol:true,molMode});setScreen("mol_result");}} onExit={()=>{if(bgmOn)bgm.start("home");setScreen("home");}}/>}
          {screen==="mol_result"&&quizResult?._mol&&<MolResultScreen result={quizResult} nickname={nickname} onHome={()=>{if(bgmOn)bgm.start("home");setScreen("home");}} onRetry={()=>{bgm.stop();setScreen("mol_quiz");}}/>}
          {screen==="battle"&&<BattleLobby nickname={nickname} quizMode={quizMode} directionMode={directionMode} subLevel={subLevel} difficulty={difficulty} onBack={goHome}/>}
        </div>
      </div>
    </>
  );
}
