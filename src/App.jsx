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
];

// イオンデータ: question=イオン式, answer=名前 の両方向出題


const PRESETS = [
  { label:"1〜20番", max:20 },
  { label:"1〜36番", max:36 },
  { label:"1〜56番", max:56 },
  { label:"全範囲(〜82)", max:82 },
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
  "H⁺":    { normal:["Li⁺","Na⁺","K⁺"],        hard:["H²⁺","H⁻","H₂⁺"] },
  "Na⁺":   { normal:["K⁺","Li⁺","Mg²⁺"],        hard:["Na²⁺","Na⁻","Na₂⁺"] },
  "K⁺":    { normal:["Na⁺","Li⁺","Rb⁺"],        hard:["K²⁺","K⁻","K₂⁺"] },
  "Ca²⁺":  { normal:["Mg²⁺","Sr²⁺","Ca⁺"],      hard:["Ca⁺","Ca³⁺","Ca²⁻"] },
  "Mg²⁺":  { normal:["Ca²⁺","Zn²⁺","Mg⁺"],      hard:["Mg⁺","Mg³⁺","Mg²⁻"] },
  "Ba²⁺":  { normal:["Ca²⁺","Sr²⁺","Ba⁺"],      hard:["Ba⁺","Ba³⁺","Ba²⁻"] },
  "Cu²⁺":  { normal:["Zn²⁺","Fe²⁺","Cu⁺"],      hard:["Cu⁺","Cu³⁺","Cu²⁻"] },
  "Zn²⁺":  { normal:["Cu²⁺","Ni²⁺","Zn⁺"],      hard:["Zn⁺","Zn³⁺","Zn²⁻"] },
  "Fe²⁺":  { normal:["Fe³⁺","Cu²⁺","Mn²⁺"],     hard:["Fe³⁺","Fe⁺","Fe²⁻"] },
  "Fe³⁺":  { normal:["Fe²⁺","Al³⁺","Cr³⁺"],     hard:["Fe²⁺","Fe⁴⁺","Fe³⁻"] },
  "Al³⁺":  { normal:["Fe³⁺","Cr³⁺","Al²⁺"],     hard:["Al²⁺","Al⁴⁺","Al³⁻"] },
  "NH₄⁺":  { normal:["Na⁺","K⁺","H⁺"],          hard:["NH₃⁺","NH₅⁺","NH₄²⁺"] },
  "Ag⁺":   { normal:["Na⁺","K⁺","Cu⁺"],         hard:["Ag²⁺","Ag⁻","Ag₂⁺"] },
  "Cl⁻":   { normal:["Br⁻","I⁻","F⁻"],          hard:["Cl²⁻","Cl⁺","Cl₂⁻"] },
  "OH⁻":   { normal:["F⁻","Cl⁻","O²⁻"],         hard:["OH²⁻","OH⁺","O₂H⁻"] },
  "SO₄²⁻": { normal:["SO₃²⁻","CO₃²⁻","PO₄³⁻"],  hard:["SO₄³⁻","SO₄⁻","SO₃²⁻"] },
  "NO₃⁻":  { normal:["NO₂⁻","SO₄²⁻","Cl⁻"],     hard:["NO₂⁻","NO₃²⁻","NO₄⁻"] },
  "CO₃²⁻": { normal:["HCO₃⁻","SO₄²⁻","NO₃⁻"],   hard:["HCO₃⁻","CO₃⁻","CO₃³⁻"] },
  "HCO₃⁻": { normal:["CO₃²⁻","HSO₄⁻","OH⁻"],    hard:["CO₃²⁻","H₂CO₃","HCO₄⁻"] },
  "SO₃²⁻": { normal:["SO₄²⁻","CO₃²⁻","NO₂⁻"],   hard:["SO₄²⁻","SO₃⁻","SO₃³⁻"] },
  "NO₂⁻":  { normal:["NO₃⁻","SO₃²⁻","Cl⁻"],     hard:["NO₃⁻","NO₂²⁻","N₂O⁻"] },
  "PO₄³⁻": { normal:["SO₄²⁻","CO₃²⁻","NO₃⁻"],   hard:["PO₄²⁻","PO₄⁴⁻","HPO₄²⁻"] },
  "HSO₄⁻": { normal:["SO₄²⁻","HCO₃⁻","OH⁻"],    hard:["SO₄²⁻","HSO₃⁻","H₂SO₄"] },
  "MnO₄⁻": { normal:["Cr₂O₇²⁻","SO₄²⁻","NO₃⁻"], hard:["MnO₄²⁻","MnO₃⁻","Mn₂O₄⁻"] },
  "Cr₂O₇²⁻":{ normal:["MnO₄⁻","SO₄²⁻","CO₃²⁻"], hard:["CrO₄²⁻","Cr₂O₆²⁻","Cr₂O₇³⁻"] },
  "CH₃COO⁻":{ normal:["HCOO⁻","OH⁻","HCO₃⁻"],   hard:["CH₃CO⁻","CH₂COO⁻","CH₃COO²⁻"] },
  "F⁻":    { normal:["Cl⁻","Br⁻","OH⁻"],         hard:["F²⁻","F⁺","F₂⁻"] },
  "Br⁻":   { normal:["Cl⁻","I⁻","F⁻"],           hard:["Br²⁻","Br⁺","Br₂⁻"] },
  "I⁻":    { normal:["Br⁻","Cl⁻","F⁻"],          hard:["I²⁻","I⁺","I₃⁻"] },
  "S²⁻":   { normal:["O²⁻","Cl⁻","SO₄²⁻"],       hard:["S⁻","S³⁻","S²⁺"] },
  "O²⁻":   { normal:["S²⁻","OH⁻","F⁻"],          hard:["O⁻","O³⁻","O²⁺"] },
  "Li⁺":   { normal:["Na⁺","K⁺","H⁺"],           hard:["Li²⁺","Li⁻","Li₂⁺"] },
  "Mn²⁺":  { normal:["Fe²⁺","Cu²⁺","Zn²⁺"],      hard:["Mn³⁺","Mn⁺","Mn²⁻"] },
  "Pb²⁺":  { normal:["Sn²⁺","Cu²⁺","Zn²⁺"],      hard:["Pb⁺","Pb³⁺","Pb²⁻"] },
  "Ni²⁺":  { normal:["Cu²⁺","Co²⁺","Zn²⁺"],      hard:["Ni³⁺","Ni⁺","Ni²⁻"] },
  "Cr³⁺":  { normal:["Fe³⁺","Al³⁺","Mn³⁺"],      hard:["Cr²⁺","Cr⁴⁺","Cr³⁻"] },
  "H₃O⁺":  { normal:["NH₄⁺","H⁺","Na⁺"],         hard:["H₂O⁺","H₄O⁺","H₃O²⁺"] },
  "CN⁻":   { normal:["Cl⁻","OH⁻","NO₂⁻"],        hard:["CN²⁻","CN⁺","C₂N⁻"] },
  "SCN⁻":  { normal:["CN⁻","Cl⁻","NO₃⁻"],        hard:["SCN²⁻","SCN⁻","SC₂N⁻"] },
};

// ── 化学式用ダミー ───────────────────────────────────────────
const FORMULA_SIMILAR = {
  "H₂O":    { normal:["CO₂","H₂","HCl"],           hard:["H₂O₂","HO","H₃O"] },
  "CO₂":    { normal:["CO","SO₂","H₂O"],            hard:["CO","CO₃","C₂O₄"] },
  "CO":     { normal:["CO₂","NO","SO₂"],            hard:["CO₂","C₂O","CO₃"] },
  "HCl":    { normal:["NaCl","H₂","Cl₂"],           hard:["HCl₂","H₂Cl","HClO"] },
  "NaCl":   { normal:["KCl","MgCl₂","NaOH"],        hard:["NaCl₂","Na₂Cl","NaCl₃"] },
  "NaOH":   { normal:["KOH","NaCl","Na₂O"],         hard:["Na₂OH","NaO","NaOH₂"] },
  "H₂SO₄":  { normal:["H₂SO₃","HNO₃","H₃PO₄"],     hard:["H₂SO₃","HSO₄","H₃SO₄"] },
  "HNO₃":   { normal:["HNO₂","H₂SO₄","HCl"],        hard:["HNO₂","H₂NO₃","HN₂O₃"] },
  "NH₃":    { normal:["N₂","H₂","N₂H₄"],            hard:["NH₂","NH₄","N₂H₃"] },
  "H₂O₂":   { normal:["H₂O","HO","H₂"],             hard:["HO₂","H₂O","HO₂⁻"] },
  "CaCO₃":  { normal:["Na₂CO₃","CaO","Ca(OH)₂"],    hard:["CaCO","Ca₂CO₃","CaCO₄"] },
  "Ca(OH)₂":{ normal:["CaCO₃","CaO","Mg(OH)₂"],     hard:["Ca(OH)","CaOH","Ca₂(OH)₂"] },
  "CuO":    { normal:["Cu₂O","FeO","ZnO"],           hard:["Cu₂O","CuO₂","Cu₃O"] },
  "Fe₂O₃":  { normal:["FeO","Fe₃O₄","Al₂O₃"],       hard:["FeO","Fe₃O₄","Fe₂O₄"] },
  "MgO":    { normal:["CaO","ZnO","Al₂O₃"],         hard:["Mg₂O","MgO₂","Mg₃O"] },
  "Al₂O₃":  { normal:["Fe₂O₃","SiO₂","MgO"],        hard:["AlO","Al₃O₄","Al₂O"] },
  "Na₂O":   { normal:["K₂O","NaOH","Na₂CO₃"],       hard:["Na₂O₂","NaO","Na₃O"] },
  "H₂":     { normal:["O₂","N₂","Cl₂"],             hard:["H","H₃","H₂⁺"] },
  "O₂":     { normal:["O₃","N₂","H₂"],              hard:["O₃","O","O₂⁻"] },
  "N₂":     { normal:["O₂","NO","NH₃"],             hard:["NO","N","N₃"] },
  "Cl₂":    { normal:["HCl","Br₂","F₂"],            hard:["Cl","Cl₃","ClO"] },
  "CH₄":    { normal:["C₂H₆","C₂H₄","NH₃"],        hard:["CH₃","C₂H₄","CH₄O"] },
  "C₂H₅OH": { normal:["CH₃OH","C₂H₄","CH₄"],       hard:["C₂H₄OH","C₂H₆O","C₂H₅O"] },
  "SO₂":    { normal:["SO₃","NO₂","CO₂"],           hard:["SO₃","S₂O","SO"] },
  "SO₃":    { normal:["SO₂","NO₂","CO₂"],           hard:["SO₂","S₂O₃","SO₄"] },
  "NO":     { normal:["NO₂","N₂O","CO"],            hard:["NO₂","N₂O","NO₃"] },
  "NO₂":    { normal:["NO","N₂O₄","SO₂"],           hard:["NO","N₂O₄","NO₃"] },
  "KOH":    { normal:["NaOH","K₂O","KCl"],          hard:["K₂OH","KOH₂","KOOH"] },
  "Ba(OH)₂":{ normal:["Ca(OH)₂","BaO","BaCl₂"],     hard:["Ba(OH)","BaO+H₂O","Ba₂(OH)₂"] },
  "NH₄Cl":  { normal:["NaCl","NH₃","HCl"],          hard:["NH₄Cl₂","(NH₄)₂Cl","NH₃Cl"] },
  "CuSO₄":  { normal:["ZnSO₄","CuCl₂","CaCO₃"],    hard:["Cu₂SO₄","CuSO₃","Cu(SO₄)₂"] },
  "FeCl₂":  { normal:["FeCl₃","NaCl","MgCl₂"],      hard:["FeCl₃","Fe₂Cl","FeCl"] },
  "FeCl₃":  { normal:["FeCl₂","AlCl₃","NaCl"],      hard:["FeCl₂","FeCl₄","Fe₂Cl₃"] },
  "NaHCO₃": { normal:["Na₂CO₃","NaOH","CaCO₃"],     hard:["Na₂CO₃","NaCO₃","NaHCO₂"] },
  "Na₂CO₃": { normal:["NaHCO₃","Na₂O","NaOH"],      hard:["NaHCO₃","Na₃CO₃","Na₂CO₂"] },
  "SiO₂":   { normal:["CO₂","SO₂","Al₂O₃"],         hard:["SiO","Si₂O₃","SiO₃"] },
  "O₃":     { normal:["O₂","SO₃","NO₃"],            hard:["O₂","O₄","O₂⁻"] },
  "H₂S":    { normal:["HCl","SO₂","H₂O"],           hard:["HS","H₂S₂","H₃S"] },
  "H₃PO₄":  { normal:["H₂SO₄","HNO₃","H₂PO₄"],     hard:["H₂PO₄⁻","H₃PO₃","HPO₄²⁻"] },
};

// 難易度に応じたダミー選択肢を生成
function getDifficultyCandidates(item, allItems, difficulty, mode) {
  // mode: "ion" | "formula" | "element"
  const similarMap = mode==="ion" ? ION_SIMILAR : mode==="formula" ? FORMULA_SIMILAR : null;
  const key = mode==="ion" ? item.formula : mode==="formula" ? item.formula : item.symbol;

  if (difficulty === "easy" || !similarMap || !similarMap[key]) {
    // 易：完全にランダムから選ぶ（デフォルト動作）
    return shuffle(allItems.filter(x => (mode==="element"?x.symbol:x.formula) !== key)).slice(0,3);
  }

  const similar = similarMap[key];
  if (difficulty === "normal") {
    // 普通：similarMap.normalを使う（足りなければランダム補完）
    const pool = similar.normal || [];
    const needed = 3;
    const result = pool.slice(0, needed).map(f => ({formula:f, name:"?", _dummy:true}));
    if (result.length < needed) {
      const extras = shuffle(allItems.filter(x => (mode==="element"?x.symbol:x.formula) !== key))
        .slice(0, needed - result.length);
      return [...result, ...extras];
    }
    return result;
  }

  if (difficulty === "hard") {
    // 難：similarMap.hardを使う
    const pool = similar.hard || similar.normal || [];
    const needed = 3;
    const result = pool.slice(0, needed).map(f => ({formula:f, name:"?", _dummy:true}));
    if (result.length < needed) {
      const extras = shuffle(allItems.filter(x => (mode==="element"?x.symbol:x.formula) !== key))
        .slice(0, needed - result.length);
      return [...result, ...extras];
    }
    return result;
  }

  return shuffle(allItems.filter(x => (mode==="element"?x.symbol:x.formula) !== key)).slice(0,3);
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
  const wrongCandidates = getDifficultyCandidates(ion, ions, difficulty, "ion");
  // normal/hard のダミーは _dummy:true フラグ付き（名前なし）
  // 式→名前: choices=name, 正解=ion.name
  // 名前→式: choices=formula, 正解=ion.formula
  const choiceItems = shuffle([ion, ...wrongCandidates]);
  const choices = choiceItems.map(c => {
    if (c._dummy) return isF2N ? `(${c.formula})` : c.formula;
    return isF2N ? c.name : c.formula;
  });
  // ダミーを使う場合: 式→名前ならダミーの式も「式」として出す
  // 名前→式ならダミーの式をそのまま選択肢に
  const finalChoices = choiceItems.map(c => {
    if (!c._dummy) return isF2N ? c.name : c.formula;
    return c.formula; // ダミーは式だけ持っている
  });
  return {
    id: ion.formula+isF2N,
    display: isF2N ? ion.formula : ion.name,
    label: isF2N ? "このイオン式の名前は？" : "このイオンの式は？",
    choices: finalChoices,
    answer: isF2N ? ion.name : ion.formula,
    isSymbol: isF2N,
    meta: { symbol:ion.formula, name:ion.name },
  };
}

// 化学式クイズ用問題生成 directionMode: "f2n"=式→名前, "n2f"=名前→式, "random"
function generateFormulaQ(formulas, rng, directionMode="random", difficulty="normal") {
  const rand = rng || Math.random.bind(Math);
  const item = formulas[Math.floor(rand()*formulas.length)];
  const isF2N = directionMode==="f2n" ? true : directionMode==="n2f" ? false : rand() > 0.5;
  const wrongCandidates = getDifficultyCandidates(item, formulas, difficulty, "formula");
  const choiceItems = shuffle([item, ...wrongCandidates]);
  const finalChoices = choiceItems.map(c => {
    if (!c._dummy) return isF2N ? c.name : c.formula;
    return c.formula; // ダミーは式だけ
  });
  return {
    id: item.formula+isF2N,
    display: isF2N ? item.formula : item.name,
    label: isF2N ? "この化学式の物質名は？" : "この物質の化学式は？",
    choices: finalChoices,
    answer: isF2N ? item.name : item.formula,
    isSymbol: !isF2N,
    meta: { symbol:item.formula, name:item.name },
  };
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
    await setDoc(ref, { value: val, updatedAt: Date.now() }, { merge: true });
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
function RankingModal({ score, nickname, quizMode, maxNum, subLevel="junior", onDone }) {
  const [saving, setSaving] = useState(false);

  const doSave = async () => {
    setSaving(true);
    const key = quizMode==="ion" ? "ranking:ion" : quizMode==="formula" ? "ranking:formula" : "ranking:v2";
    const res = await sGet(key, true);
    let all = [];
    try { if(res) all=JSON.parse(res.value); } catch{}
    const field = quizMode==="ion" ? "ion" : null;
    // 同じニックネーム＋条件の古い記録を削除
    const filtered = all.filter(r => {
      if(r.name!==nickname) return true;
      if(quizMode==="ion"||quizMode==="formula") return r.subLevel!==subLevel;
      return r.maxNum!==maxNum;
    });
    const entry = (quizMode==="ion"||quizMode==="formula")
      ? { name:nickname, score, quizMode, subLevel, difficulty, date:Date.now() }
      : { name:nickname, score, maxNum, quizMode:"element", directionMode, difficulty, date:Date.now() };
    filtered.push(entry);
    filtered.sort((a,b)=>b.score-a.score);
    await sSet(key, JSON.stringify(filtered.slice(0,50)), true);
    setSaving(false);
    onDone(true);
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>🏆 スコアを登録しますか？</h3>
        <p style={{fontSize:"1.5rem",fontWeight:900,color:"var(--primary)",marginBottom:4}}>{score}点</p>
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

// ── RangeSelector ──────────────────────────────────────────────
function RangeSelector({ maxNum, onChange }) {
  return (
    <div className="rwrap">
      <div className="fb2 mb8">
        <span style={{fontWeight:700,fontSize:".88rem"}}>出題範囲: 1〜{maxNum}番</span>
        <span className="muted">{getElements(maxNum).length}元素</span>
      </div>
      <input type="range" min={4} max={82} value={maxNum} onChange={e=>onChange(Number(e.target.value))}/>
      <div className="rlbls"><span>4</span><span>20</span><span>36</span><span>56</span><span>82</span></div>
      <div className="pbtns">
        {PRESETS.map(p=>(
          <button key={p.max} className={`pbtn ${maxNum===p.max?"on":""}`} onClick={()=>onChange(p.max)}>{p.label}</button>
        ))}
      </div>
    </div>
  );
}

// ── HomeScreen ─────────────────────────────────────────────────
function HomeScreen({ nickname, onSetNickname, onSolo, onBattle, onRanking, onMemo, bgmOn, onToggleBgm }) {
  const [edit,setEdit]=useState(false);
  const [ni,setNi]=useState(nickname||"");
  const save=()=>{if(ni.trim()){onSetNickname(ni.trim());setEdit(false);}};
  return (
    <div>
      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-glow1"/><div className="hero-glow2"/><div className="hero-glow3"/>
        <div className="hero-ring"/><div className="hero-ring2"/>
        <div className="hero-dots"/>
        <div className="hero-icons-deco"><span>⚛️</span><span>🔬</span><span>⚡</span></div>
        <div className="hero-icons-deco2"><span>🧪</span><span>🧬</span><span>💡</span></div>
        <div className="hero-content">
          <div className="hero-badge">SCIENCE QUIZ</div>
          <span className="hero-main-icon">⚗️</span>
          <div className="hero-app-title">CHEM BATTLE</div>
          <div className="hero-sub-title">化学を、バトルにしよう</div>
          {!nickname||edit?(
            <div className="hero-input-wrap">
              <input className="hero-input" value={ni} onChange={e=>setNi(e.target.value)}
                placeholder="ニックネームを入力してね" maxLength={12}
                onKeyDown={e=>e.key==="Enter"&&save()} autoFocus={edit}/>
              <div style={{display:"flex",gap:8,marginTop:10}}>
                <button className="hero-save-btn" style={{flex:1}} onClick={save}>✓ 保存してスタート</button>
                {edit&&<button className="hero-save-btn" style={{flex:"0 0 auto",background:"rgba(255,255,255,.12)",color:"rgba(255,255,255,.7)"}} onClick={()=>setEdit(false)}>✕</button>}
              </div>
            </div>
          ):(
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <div className="hero-nick">👤 {nickname}</div>
              <button className="hero-nick-btn" onClick={()=>setEdit(true)}>変更</button>
            </div>
          )}
        </div>
      </div>

      <div style={{marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:".78rem",color:"var(--primary)",marginBottom:7,paddingLeft:4,letterSpacing:"1px",textTransform:"uppercase"}}>⚛️ 元素クイズ</div>
        <div className="g2">
          <div className="sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onSolo("element")}>
            <div className="ic">🎮</div><div className="nm">ひとりで挑戦</div><div className="ds">元素記号</div>
          </div>
          <div className="sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onBattle("element")}>
            <div className="ic">⚔️</div><div className="nm">対戦する</div><div className="ds">元素記号</div>
          </div>
        </div>
      </div>

      <div style={{marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:".78rem",color:"var(--ion)",marginBottom:7,paddingLeft:4,letterSpacing:"1px",textTransform:"uppercase"}}>⚡ イオンクイズ</div>
        <div className="g2">
          <div className="sc ion-sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onSolo("ion")}>
            <div className="ic">🎮</div><div className="nm">ひとりで挑戦</div><div className="ds">イオン式・名称</div>
          </div>
          <div className="sc ion-sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onBattle("ion")}>
            <div className="ic">⚔️</div><div className="nm">対戦する</div><div className="ds">イオン式・名称</div>
          </div>
        </div>
      </div>

      <div style={{marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:".78rem",color:"var(--form)",marginBottom:7,paddingLeft:4,letterSpacing:"1px",textTransform:"uppercase"}}>🧬 化学式クイズ</div>
        <div className="g2">
          <div className="sc form-sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onSolo("formula")}>
            <div className="ic">🎮</div><div className="nm">ひとりで挑戦</div><div className="ds">化学式・物質名</div>
          </div>
          <div className="sc form-sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onBattle("formula")}>
            <div className="ic">⚔️</div><div className="nm">対戦する</div><div className="ds">化学式・物質名</div>
          </div>
        </div>
      </div>

      {!nickname&&(
        <div className="tc" style={{marginTop:3,marginBottom:8}}>
          <span className="hero-nologin">✋ ニックネームを登録してスタート！</span>
        </div>
      )}
      <div style={{display:"flex",gap:8,marginBottom:8}}>
        <button className="btn btn-s" style={{flex:1}} onClick={onMemo}>📖 暗記リスト</button>
        <button className="btn btn-s" style={{flex:1}} onClick={onRanking}>🏆 ランキング</button>
        <button className="btn btn-s" style={{flex:"0 0 auto",padding:"10px 12px"}} onClick={onToggleBgm}>{bgmOn?"🔊":"🔇"}</button>
      </div>
      <div className="footer-copy">
        © 2026 Narukawa<br/>
        本アプリの無断転載・再配布を禁止します。
      </div>
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
          <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>出題範囲（元素番号）</div>
          <RangeSelector maxNum={maxNum} onChange={setMaxNum}/>
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

      {/* 難易度選択 */}
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

      <button
        className={`btn ${btnClass} btn-blk`}
        onClick={()=>onStart(isElement?maxNum:null, directionMode, subLevel, difficulty)}
        disabled={isElement&&getElements(maxNum).length<4}>
        {isBattle?"🚀 この設定でルーム作成":"🚀 スタート！"}
      </button>
    </div>
  );
}

// ── QuizScreen ─────────────────────────────────────────────────
function QuizScreen({ maxNum, quizMode, directionMode="random", subLevel="junior", difficulty="normal", onFinish, seed=null }) {
  const isIon = quizMode==="ion";
  const isFormula = quizMode==="formula";
  const elements = isFormula ? getFormulas(subLevel) : isIon ? getIons(subLevel) : getElements(maxNum);
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
  const sRef=useRef(0),cRef=useRef(0),aRef=useRef(0),mRef=useRef([]);

  useEffect(()=>{
    bgm.start("play");
    const t=setInterval(()=>{
      setTimeLeft(prev=>{
        if(prev<=1){
          clearInterval(t); bgm.stop(); bgm.se("finish");
          onFinish({score:sRef.current,correct:cRef.current,total:aRef.current,mistakes:mRef.current});
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
          <div className={`tmr ${timeLeft<=10?"urg":""}`}>⏱ {timeLeft}</div>
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
        <RankingModal score={result.score} nickname={nickname} quizMode={quizMode} maxNum={maxNum} subLevel={result.subLevel||"junior"}
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
  const [ranks,setRanks]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{load();},[tab]);

  const load=async()=>{
    setLoading(true);
    const isIon=tab==="ion";
    const isFormula=tab==="formula";
    const key=isIon?"ranking:ion":isFormula?"ranking:formula":"ranking:v2";
    const res=await sGet(key,true);
    let all=[];
    try{if(res)all=JSON.parse(res.value);}catch{}
    if(tab==="element_all"||isIon||isFormula) setRanks(all);
    else setRanks(all.filter(r=>r.maxNum===Number(tab)));
    setLoading(false);
  };

  const tabs=[["element_all","元素:総合"],["20","元素:〜20"],["56","元素:〜56"],["82","元素:全"],["ion","⚡イオン"],["formula","🧬化学式"]];

  return (
    <div>
      <div className="card">
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={onBack}>← 戻る</button>
          <span style={{fontWeight:700}}>🏆 ランキング</span><span/>
        </div>
        <div className="tabs">
          {tabs.map(([v,l])=>(
            <button key={v} className={`tab ${tab===v?"on":""}`} onClick={()=>setTab(v)}>{l}</button>
          ))}
        </div>
        {loading?<p className="tc muted">読み込み中...</p>
          :ranks.length===0?<p className="tc muted">まだ記録がありません</p>
          :(
            <ul className="rlist">
              {ranks.map((r,i)=>(
                <li key={i} className={`ri ${r.name===myNickname?"rhl":""}`}>
                  <span className={`rn ${i===0?"rn1":i===1?"rn2":i===2?"rn3":""}`}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}</span>
                  <span className="rname">{r.name}{r.name===myNickname&&<span className="bdg by" style={{marginLeft:5}}>あなた</span>}</span>
                  {r.quizMode==="ion"&&<span className="bdg bion" style={{marginRight:4}}>⚡</span>}
                  {r.quizMode==="formula"&&<span className="bdg bform" style={{marginRight:4}}>🧬</span>}
                  {r.difficulty&&(()=>{const d=DIFFICULTY_OPTIONS.find(o=>o.value===r.difficulty);return d?<span style={{fontSize:".68rem",padding:"1px 5px",borderRadius:10,background:d.light,color:d.color,fontWeight:700,marginRight:3}}>{d.label}</span>:null;})()}
                  {r.maxNum&&<span className="muted" style={{fontSize:".73rem",marginRight:5}}>〜{r.maxNum}番</span>}
                  <span className="rsc">{r.score}点</span>
                </li>
              ))}
            </ul>
          )
        }
        <p className="muted tc" style={{marginTop:7,fontSize:".71rem"}}>※ランキングは全ユーザーに公開されます</p>
      </div>
    </div>
  );
}

// ── MemoScreen（暗記一覧画面）──────────────────────────────────
function MemoScreen({ onBack }) {
  const [tab, setTab] = useState("element");
  const [elMax, setElMax] = useState(20);
  const [ionLv, setIonLv] = useState("junior");
  const [frmLv, setFrmLv] = useState("junior");

  const tabs = [
    { id:"element", label:"⚛️ 元素", cls:"" },
    { id:"ion",     label:"⚡ イオン", cls:"ion-t" },
    { id:"formula", label:"🧬 化学式", cls:"form-t" },
  ];

  const elItems = getElements(elMax);
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
              <div style={{fontWeight:700,fontSize:".82rem",marginBottom:6}}>出題範囲: 1〜{elMax}番（{elItems.length}元素）</div>
              <input type="range" min={4} max={82} value={elMax} onChange={e=>setElMax(Number(e.target.value))}/>
              <div className="pbtns">
                {PRESETS.map(p=>(
                  <button key={p.max} className={`pbtn ${elMax===p.max?"on":""}`} onClick={()=>setElMax(p.max)}>{p.label}</button>
                ))}
              </div>
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

// ── BattleLobby ────────────────────────────────────────────────
function BattleLobby({ nickname, quizMode, directionMode="random", subLevel="junior", difficulty="normal", onBack }) {
  const isIon=quizMode==="ion";
  const isFormula=quizMode==="formula";
  const [phase,setPhase]=useState("menu");
  const [roomCode,setRoomCode]=useState("");
  const [joinCode,setJoinCode]=useState("");
  const [roomData,setRoomData]=useState(null);
  const [maxNum,setMaxNum]=useState(20);
  const [quizResult,setQuizResult]=useState(null);
  const [battleResult,setBattleResult]=useState(null);
  const [isHost,setIsHost]=useState(false);
  const pollRef=useRef();
  const myId=useRef(Math.random().toString(36).slice(2,8));

  const genCode=()=>Math.random().toString(36).slice(2,6).toUpperCase();

  const createRoom=async(mn,dm,sl,dif)=>{
    const code=genCode();
    const room={code,maxNum:mn,quizMode,directionMode:dm||directionMode,subLevel:sl||subLevel,difficulty:dif||difficulty,host:nickname,seed:Math.floor(Math.random()*100000),
      players:[{id:myId.current,name:nickname,status:"waiting",score:0}],status:"waiting",createdAt:Date.now()};
    await sSet(`room:${code}`,JSON.stringify(room),true);
    setRoomCode(code);setRoomData(room);setMaxNum(mn||20);setIsHost(true);setPhase("waiting");
    startPoll(code);
  };

  const joinRoom=async()=>{
    const code=joinCode.toUpperCase().trim();
    const res=await sGet(`room:${code}`,true);
    if(!res){alert("ルームが見つかりません");return;}
    try{
      const room=JSON.parse(res.value);
      if(room.status!=="waiting"){alert("すでに対戦が始まっています");return;}
      if(!room.players.find(p=>p.name===nickname))
        room.players.push({id:myId.current,name:nickname,status:"waiting",score:0});
      await sSet(`room:${code}`,JSON.stringify(room),true);
      setRoomCode(code);setRoomData(room);setMaxNum(room.maxNum||20);setIsHost(false);setPhase("waiting");
      startPoll(code);
    }catch{alert("エラーが発生しました");}
  };

  const startPoll=(code)=>{
    clearInterval(pollRef.current);
    pollRef.current=setInterval(async()=>{
      const res=await sGet(`room:${code}`,true);
      if(!res)return;
      try{const room=JSON.parse(res.value);setRoomData(room);
        if(room.status==="playing"){clearInterval(pollRef.current);setPhase("countdown");}
      }catch{}
    },1500);
  };

  const startGame=async()=>{
    const res=await sGet(`room:${roomCode}`,true);
    if(!res)return;
    const room=JSON.parse(res.value);room.status="playing";
    await sSet(`room:${roomCode}`,JSON.stringify(room),true);
    clearInterval(pollRef.current);setPhase("countdown");
  };

  const handleQuizFinish=async(result)=>{
    setQuizResult(result);
    const res=await sGet(`room:${roomCode}`,true);
    if(res){
      const room=JSON.parse(res.value);
      const pl=room.players.find(p=>p.name===nickname);
      if(pl){pl.score=result.score;pl.status="done";}
      if(room.players.every(p=>p.status==="done"))room.status="done";
      await sSet(`room:${roomCode}`,JSON.stringify(room),true);setRoomData(room);
    }
    setPhase("result_wait");
    pollRef.current=setInterval(async()=>{
      const r=await sGet(`room:${roomCode}`,true);
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
  if(phase==="quiz") return <QuizScreen maxNum={maxNum} quizMode={quizMode} directionMode={roomData?.directionMode||directionMode} subLevel={roomData?.subLevel||subLevel} difficulty={roomData?.difficulty||difficulty} onFinish={handleQuizFinish} seed={roomData?.seed}/>;
  if(phase==="result") return <ResultScreen result={quizResult} nickname={nickname} maxNum={maxNum} quizMode={quizMode} subLevel={roomData?.subLevel||subLevel}
    battleResult={battleResult} onHome={()=>{clearInterval(pollRef.current);onBack();}} onRetry={()=>{clearInterval(pollRef.current);onBack();}}/>;
  if(phase==="result_wait"){
    const w=roomData?.players.filter(p=>p.status!=="done").length||0;
    return <div className="card tc"><p style={{fontSize:"2rem",marginBottom:10}}>⏳</p>
      <h3 style={{fontWeight:700,marginBottom:6}}>あなたの結果: {quizResult?.score}点</h3>
      <p className="muted">他のプレイヤーを待っています... ({w}人)</p></div>;
  }
  if(phase==="waiting") return (
    <div>
      <div className="card">
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={()=>{clearInterval(pollRef.current);setPhase("menu");}}>← 戻る</button>
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
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  const [screen,setScreen]=useState("home");
  const [nickname,setNickname]=useState("");
  const [maxNum,setMaxNum]=useState(20);
  const [quizMode,setQuizMode]=useState("element"); // "element" | "ion"
  const [directionMode,setDirectionMode]=useState("s2n");
  const [subLevel,setSubLevel]=useState("junior");
  const [difficulty,setDifficulty]=useState("normal");
  const [quizResult,setQuizResult]=useState(null);
  const [bgmOn,setBgmOn]=useState(true);

  useEffect(()=>{
    (async()=>{const res=await sGet("nickname");if(res)setNickname(res.value);})();
    const start=()=>{bgm.start("home");document.removeEventListener("click",start);};
    document.addEventListener("click",start);
    return()=>document.removeEventListener("click",start);
  },[]);

  const saveNickname=async(nick)=>{setNickname(nick);await sSet("nickname",nick);};

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
              bgmOn={bgmOn} onToggleBgm={toggleBgm}/>
          )}
          {screen==="setup"&&(
            <SetupScreen title={isIon?"イオンクイズ設定":"出題範囲を選択"} quizMode={quizMode} onBack={goHome}
              onStart={(mn,dm,sl,dif)=>{setMaxNum(mn||20);setDirectionMode(dm||"random");setSubLevel(sl||"junior");setDifficulty(dif||"normal");bgm.stop();setScreen("countdown");}}/>
          )}
          {screen==="countdown"&&<Countdown onDone={()=>setScreen("quiz")}/>}
          {screen==="quiz"&&<QuizScreen maxNum={maxNum} quizMode={quizMode} directionMode={directionMode} subLevel={subLevel} difficulty={difficulty} onFinish={handleSoloFinish}/>}
          {screen==="result"&&quizResult&&(
            <ResultScreen result={quizResult} nickname={nickname} maxNum={maxNum} quizMode={quizMode} subLevel={subLevel}
              onHome={()=>{if(bgmOn)bgm.start("home");setScreen("home");}}
              onRetry={()=>{bgm.stop();setScreen("countdown");}}/>
          )}
          {screen==="ranking"&&<RankingScreen myNickname={nickname} onBack={()=>setScreen("home")}/>}
          {screen==="memo"&&<MemoScreen onBack={()=>setScreen("home")}/>}
          {screen==="battle"&&<BattleLobby nickname={nickname} quizMode={quizMode} directionMode={directionMode} subLevel={subLevel} difficulty={difficulty} onBack={goHome}/>}
        </div>
      </div>
    </>
  );
}
