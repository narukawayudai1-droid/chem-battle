import { useState, useEffect, useRef } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// 笏笏 Firebase蛻晄悄蛹・笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
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
// 繝・・繧ｿ
// ============================================================
const ALL_ELEMENTS = [
  { number:1,  symbol:"H",  name:"豌ｴ邏" },
  { number:2,  symbol:"He", name:"繝倥Μ繧ｦ繝" },
  { number:3,  symbol:"Li", name:"繝ｪ繝√え繝" },
  { number:4,  symbol:"Be", name:"繝吶Μ繝ｪ繧ｦ繝" },
  { number:5,  symbol:"B",  name:"繝帙え邏" },
  { number:6,  symbol:"C",  name:"轤ｭ邏" },
  { number:7,  symbol:"N",  name:"遯堤ｴ" },
  { number:8,  symbol:"O",  name:"驟ｸ邏" },
  { number:9,  symbol:"F",  name:"繝輔ャ邏" },
  { number:10, symbol:"Ne", name:"繝阪が繝ｳ" },
  { number:11, symbol:"Na", name:"繝翫ヨ繝ｪ繧ｦ繝" },
  { number:12, symbol:"Mg", name:"繝槭げ繝阪す繧ｦ繝" },
  { number:13, symbol:"Al", name:"繧｢繝ｫ繝溘ル繧ｦ繝" },
  { number:14, symbol:"Si", name:"繧ｱ繧､邏" },
  { number:15, symbol:"P",  name:"繝ｪ繝ｳ" },
  { number:16, symbol:"S",  name:"遑ｫ鮟・ },
  { number:17, symbol:"Cl", name:"蝪ｩ邏" },
  { number:18, symbol:"Ar", name:"繧｢繝ｫ繧ｴ繝ｳ" },
  { number:19, symbol:"K",  name:"繧ｫ繝ｪ繧ｦ繝" },
  { number:20, symbol:"Ca", name:"繧ｫ繝ｫ繧ｷ繧ｦ繝" },
  { number:21, symbol:"Sc", name:"繧ｹ繧ｫ繝ｳ繧ｸ繧ｦ繝" },
  { number:22, symbol:"Ti", name:"繝√ち繝ｳ" },
  { number:23, symbol:"V",  name:"繝舌リ繧ｸ繧ｦ繝" },
  { number:24, symbol:"Cr", name:"繧ｯ繝ｭ繝" },
  { number:25, symbol:"Mn", name:"繝槭Φ繧ｬ繝ｳ" },
  { number:26, symbol:"Fe", name:"驩・ },
  { number:27, symbol:"Co", name:"繧ｳ繝舌Ν繝・ },
  { number:28, symbol:"Ni", name:"繝九ャ繧ｱ繝ｫ" },
  { number:29, symbol:"Cu", name:"驫・ },
  { number:30, symbol:"Zn", name:"莠憺央" },
  { number:31, symbol:"Ga", name:"繧ｬ繝ｪ繧ｦ繝" },
  { number:32, symbol:"Ge", name:"繧ｲ繝ｫ繝槭ル繧ｦ繝" },
  { number:33, symbol:"As", name:"繝堤ｴ" },
  { number:34, symbol:"Se", name:"繧ｻ繝ｬ繝ｳ" },
  { number:35, symbol:"Br", name:"閾ｭ邏" },
  { number:36, symbol:"Kr", name:"繧ｯ繝ｪ繝励ヨ繝ｳ" },
  { number:37, symbol:"Rb", name:"繝ｫ繝薙ず繧ｦ繝" },
  { number:38, symbol:"Sr", name:"繧ｹ繝医Ο繝ｳ繝√え繝" },
  { number:39, symbol:"Y",  name:"繧､繝・ヨ繝ｪ繧ｦ繝" },
  { number:40, symbol:"Zr", name:"繧ｸ繝ｫ繧ｳ繝九え繝" },
  { number:41, symbol:"Nb", name:"繝九が繝・ },
  { number:42, symbol:"Mo", name:"繝｢繝ｪ繝悶ョ繝ｳ" },
  { number:43, symbol:"Tc", name:"繝・け繝阪メ繧ｦ繝" },
  { number:44, symbol:"Ru", name:"繝ｫ繝・ル繧ｦ繝" },
  { number:45, symbol:"Rh", name:"繝ｭ繧ｸ繧ｦ繝" },
  { number:46, symbol:"Pd", name:"繝代Λ繧ｸ繧ｦ繝" },
  { number:47, symbol:"Ag", name:"驫" },
  { number:48, symbol:"Cd", name:"繧ｫ繝峨Α繧ｦ繝" },
  { number:49, symbol:"In", name:"繧､繝ｳ繧ｸ繧ｦ繝" },
  { number:50, symbol:"Sn", name:"繧ｹ繧ｺ" },
  { number:51, symbol:"Sb", name:"繧｢繝ｳ繝√Δ繝ｳ" },
  { number:52, symbol:"Te", name:"繝・Ν繝ｫ" },
  { number:53, symbol:"I",  name:"繝ｨ繧ｦ邏" },
  { number:54, symbol:"Xe", name:"繧ｭ繧ｻ繝弱Φ" },
  { number:55, symbol:"Cs", name:"繧ｻ繧ｷ繧ｦ繝" },
  { number:56, symbol:"Ba", name:"繝舌Μ繧ｦ繝" },
  { number:57, symbol:"La", name:"繝ｩ繝ｳ繧ｿ繝ｳ" },
  { number:58, symbol:"Ce", name:"繧ｻ繝ｪ繧ｦ繝" },
  { number:72, symbol:"Hf", name:"繝上ヵ繝九え繝" },
  { number:73, symbol:"Ta", name:"繧ｿ繝ｳ繧ｿ繝ｫ" },
  { number:74, symbol:"W",  name:"繧ｿ繝ｳ繧ｰ繧ｹ繝・Φ" },
  { number:75, symbol:"Re", name:"繝ｬ繝九え繝" },
  { number:76, symbol:"Os", name:"繧ｪ繧ｹ繝溘え繝" },
  { number:77, symbol:"Ir", name:"繧､繝ｪ繧ｸ繧ｦ繝" },
  { number:78, symbol:"Pt", name:"逋ｽ驥・ },
  { number:79, symbol:"Au", name:"驥・ },
  { number:80, symbol:"Hg", name:"豌ｴ驫" },
  { number:81, symbol:"Tl", name:"繧ｿ繝ｪ繧ｦ繝" },
  { number:82, symbol:"Pb", name:"驩・ },
  { number:83, symbol:"Bi", name:"繝薙せ繝槭せ" },
  { number:84, symbol:"Po", name:"繝昴Ο繝九え繝" },
  { number:85, symbol:"At", name:"繧｢繧ｹ繧ｿ繝√Φ" },
  { number:86, symbol:"Rn", name:"繝ｩ繝峨Φ" },
  { number:87, symbol:"Fr", name:"繝輔Λ繝ｳ繧ｷ繧ｦ繝" },
  { number:88, symbol:"Ra", name:"繝ｩ繧ｸ繧ｦ繝" },
  { number:89, symbol:"Ac", name:"繧｢繧ｯ繝√ル繧ｦ繝" },
  { number:90, symbol:"Th", name:"繝医Μ繧ｦ繝" },
  { number:91, symbol:"Pa", name:"繝励Ο繝医い繧ｯ繝√ル繧ｦ繝" },
  { number:92, symbol:"U",  name:"繧ｦ繝ｩ繝ｳ" },
  { number:93, symbol:"Np", name:"繝阪・繝・ル繧ｦ繝" },
  { number:94, symbol:"Pu", name:"繝励Ν繝医ル繧ｦ繝" },
  { number:95, symbol:"Am", name:"繧｢繝｡繝ｪ繧ｷ繧ｦ繝" },
  { number:96, symbol:"Cm", name:"繧ｭ繝･繝ｪ繧ｦ繝" },
  { number:97, symbol:"Bk", name:"繝舌・繧ｯ繝ｪ繧ｦ繝" },
  { number:98, symbol:"Cf", name:"繧ｫ繝ｪ繝帙Ν繝九え繝" },
  { number:99, symbol:"Es", name:"繧｢繧､繝ｳ繧ｹ繧ｿ繧､繝九え繝" },
  { number:100,symbol:"Fm", name:"繝輔ぉ繝ｫ繝溘え繝" },
  { number:101,symbol:"Md", name:"繝｡繝ｳ繝・Ξ繝薙え繝" },
  { number:102,symbol:"No", name:"繝弱・繝吶Μ繧ｦ繝" },
  { number:103,symbol:"Lr", name:"繝ｭ繝ｼ繝ｬ繝ｳ繧ｷ繧ｦ繝" },
];

// 繧､繧ｪ繝ｳ繝・・繧ｿ: question=繧､繧ｪ繝ｳ蠑・ answer=蜷榊燕 縺ｮ荳｡譁ｹ蜷大・鬘・

const PRESETS = [
  { label:"1縲・0逡ｪ", max:20 },
  { label:"1縲・6逡ｪ", max:36 },
  { label:"1縲・6逡ｪ", max:56 },
  { label:"蜈ｨ遽・峇(縲・03逡ｪ)", max:103 },
];

function getElements(maxNum) { return ALL_ELEMENTS.filter(e => e.number <= maxNum); }


// ============================================================
// 繧､繧ｪ繝ｳ繝・・繧ｿ・井ｸｭ蟄ｦ繝ｻ鬮俶｡繝ｬ繝吶Ν蛻・￠・・// ============================================================
const IONS_JUNIOR = [
  // 荳ｭ蟄ｦ逅・ｧ代〒蠢・医・髯ｽ繧､繧ｪ繝ｳ
  { formula:"H竅ｺ",    name:"豌ｴ邏繧､繧ｪ繝ｳ" },
  { formula:"Na竅ｺ",   name:"繝翫ヨ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ" },
  { formula:"K竅ｺ",    name:"繧ｫ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ" },
  { formula:"Caﾂｲ竅ｺ",  name:"繧ｫ繝ｫ繧ｷ繧ｦ繝繧､繧ｪ繝ｳ" },
  { formula:"Mgﾂｲ竅ｺ",  name:"繝槭げ繝阪す繧ｦ繝繧､繧ｪ繝ｳ" },
  { formula:"Cuﾂｲ竅ｺ",  name:"驫・う繧ｪ繝ｳ" },
  { formula:"Znﾂｲ竅ｺ",  name:"莠憺央繧､繧ｪ繝ｳ" },
  { formula:"Feﾂｲ竅ｺ",  name:"驩・II)繧､繧ｪ繝ｳ" },
  { formula:"Alﾂｳ竅ｺ",  name:"繧｢繝ｫ繝溘ル繧ｦ繝繧､繧ｪ繝ｳ" },
  { formula:"Baﾂｲ竅ｺ",  name:"繝舌Μ繧ｦ繝繧､繧ｪ繝ｳ" },
  { formula:"NH竄・⊆",  name:"繧｢繝ｳ繝｢繝九え繝繧､繧ｪ繝ｳ" },
  // 荳ｭ蟄ｦ逅・ｧ代〒蠢・医・髯ｰ繧､繧ｪ繝ｳ
  { formula:"Cl竅ｻ",   name:"蝪ｩ蛹也黄繧､繧ｪ繝ｳ" },
  { formula:"OH竅ｻ",   name:"豌ｴ驟ｸ蛹也黄繧､繧ｪ繝ｳ" },
  { formula:"SO竄・ｲ竅ｻ", name:"遑ｫ驟ｸ繧､繧ｪ繝ｳ" },
  { formula:"NO竄・⊇",  name:"遑晞・繧､繧ｪ繝ｳ" },
  { formula:"CO竄δｲ竅ｻ", name:"轤ｭ驟ｸ繧､繧ｪ繝ｳ" },
  { formula:"HCO竄・⊇", name:"轤ｭ驟ｸ豌ｴ邏繧､繧ｪ繝ｳ" },
];

const IONS_SENIOR_EXTRA = [
  // 鬮俶｡蛹門ｭｦ縺ｧ霑ｽ蜉縺輔ｌ繧九う繧ｪ繝ｳ
  { formula:"Li竅ｺ",      name:"繝ｪ繝√え繝繧､繧ｪ繝ｳ" },
  { formula:"Ag竅ｺ",      name:"驫繧､繧ｪ繝ｳ" },
  { formula:"Feﾂｳ竅ｺ",     name:"驩・III)繧､繧ｪ繝ｳ" },
  { formula:"Mnﾂｲ竅ｺ",     name:"繝槭Φ繧ｬ繝ｳ(II)繧､繧ｪ繝ｳ" },
  { formula:"Pbﾂｲ竅ｺ",     name:"驩・II)繧､繧ｪ繝ｳ" },
  { formula:"Niﾂｲ竅ｺ",     name:"繝九ャ繧ｱ繝ｫ繧､繧ｪ繝ｳ" },
  { formula:"Crﾂｳ竅ｺ",     name:"繧ｯ繝ｭ繝(III)繧､繧ｪ繝ｳ" },
  { formula:"H竄グ竅ｺ",     name:"繧ｪ繧ｭ繧ｽ繝九え繝繧､繧ｪ繝ｳ" },
  { formula:"F竅ｻ",       name:"繝輔ャ蛹也黄繧､繧ｪ繝ｳ" },
  { formula:"Br竅ｻ",      name:"閾ｭ蛹也黄繧､繧ｪ繝ｳ" },
  { formula:"I竅ｻ",       name:"繝ｨ繧ｦ蛹也黄繧､繧ｪ繝ｳ" },
  { formula:"Sﾂｲ竅ｻ",      name:"遑ｫ蛹也黄繧､繧ｪ繝ｳ" },
  { formula:"Oﾂｲ竅ｻ",      name:"驟ｸ蛹也黄繧､繧ｪ繝ｳ" },
  { formula:"SO竄δｲ竅ｻ",    name:"莠懃｡ｫ驟ｸ繧､繧ｪ繝ｳ" },
  { formula:"NO竄や⊇",     name:"莠懃｡晞・繧､繧ｪ繝ｳ" },
  { formula:"HSO竄・⊇",    name:"遑ｫ驟ｸ豌ｴ邏繧､繧ｪ繝ｳ" },
  { formula:"PO竄・ｳ竅ｻ",    name:"繝ｪ繝ｳ驟ｸ繧､繧ｪ繝ｳ" },
  { formula:"CH竄イOO竅ｻ",  name:"驟｢驟ｸ繧､繧ｪ繝ｳ" },
  { formula:"MnO竄・⊇",    name:"驕弱・繝ｳ繧ｬ繝ｳ驟ｸ繧､繧ｪ繝ｳ" },
  { formula:"Cr竄０竄・ｲ竅ｻ",  name:"莠後け繝ｭ繝驟ｸ繧､繧ｪ繝ｳ" },
  { formula:"CN竅ｻ",      name:"繧ｷ繧｢繝ｳ蛹也黄繧､繧ｪ繝ｳ" },
  { formula:"SCN竅ｻ",     name:"繝√が繧ｷ繧｢繝ｳ驟ｸ繧､繧ｪ繝ｳ" },
];

const IONS_SENIOR = [...IONS_JUNIOR, ...IONS_SENIOR_EXTRA];

function getIons(level) {
  return level === "junior" ? IONS_JUNIOR : IONS_SENIOR;
}

// ============================================================
// 蛹門ｭｦ蠑上ョ繝ｼ繧ｿ・井ｸｭ蟄ｦ繝ｻ鬮俶｡繝ｬ繝吶Ν蛻・￠・・// ============================================================
const FORMULAS_JUNIOR = [
  // 蜊倅ｽ・  { formula:"H竄・,    name:"豌ｴ邏" },
  { formula:"O竄・,    name:"驟ｸ邏" },
  { formula:"N竄・,    name:"遯堤ｴ" },
  { formula:"Cl竄・,   name:"蝪ｩ邏" },
  { formula:"C",     name:"轤ｭ邏" },
  { formula:"S",     name:"遑ｫ鮟・ },
  { formula:"Cu",    name:"驫・ },
  { formula:"Fe",    name:"驩・ },
  { formula:"Ag",    name:"驫" },
  // 蛹門粋迚ｩ・井ｸｭ蟄ｦ蠢・茨ｼ・  { formula:"H竄０",   name:"豌ｴ" },
  { formula:"CO竄・,   name:"莠碁・蛹也く邏" },
  { formula:"CO",    name:"荳驟ｸ蛹也く邏" },
  { formula:"HCl",   name:"蝪ｩ蛹匁ｰｴ邏・亥｡ｩ驟ｸ・・ },
  { formula:"NaCl",  name:"蝪ｩ蛹悶リ繝医Μ繧ｦ繝・磯｣溷｡ｩ・・ },
  { formula:"NaOH",  name:"豌ｴ驟ｸ蛹悶リ繝医Μ繧ｦ繝" },
  { formula:"H竄４O竄・, name:"遑ｫ驟ｸ" },
  { formula:"HNO竄・,  name:"遑晞・" },
  { formula:"NH竄・,   name:"繧｢繝ｳ繝｢繝九い" },
  { formula:"H竄０竄・,  name:"驕朱・蛹匁ｰｴ邏" },
  { formula:"CaCO竄・, name:"轤ｭ驟ｸ繧ｫ繝ｫ繧ｷ繧ｦ繝" },
  { formula:"Ca(OH)竄・,name:"豌ｴ驟ｸ蛹悶き繝ｫ繧ｷ繧ｦ繝" },
  { formula:"CuO",   name:"驟ｸ蛹夜喝(II)" },
  { formula:"Fe竄０竄・, name:"驟ｸ蛹夜延(III)" },
  { formula:"MgO",   name:"驟ｸ蛹悶・繧ｰ繝阪す繧ｦ繝" },
  { formula:"Al竄０竄・, name:"驟ｸ蛹悶い繝ｫ繝溘ル繧ｦ繝" },
  { formula:"Na竄０",  name:"驟ｸ蛹悶リ繝医Μ繧ｦ繝" },
];

const FORMULAS_SENIOR_EXTRA = [
  // 鬮俶｡蛹門ｭｦ縺ｧ霑ｽ蜉縺輔ｌ繧句喧蜷育黄
  { formula:"CH竄・,      name:"繝｡繧ｿ繝ｳ" },
  { formula:"C竄・竄・H",   name:"繧ｨ繧ｿ繝弱・繝ｫ" },
  { formula:"C竄・竄≫ｂO竄・,  name:"繧ｰ繝ｫ繧ｳ繝ｼ繧ｹ" },
  { formula:"C竄≫ｂH竄やｂO竄≫ａ",name:"繧ｹ繧ｯ繝ｭ繝ｼ繧ｹ・医す繝ｧ邉厄ｼ・ },
  { formula:"SO竄・,      name:"莠碁・蛹也｡ｫ鮟・ },
  { formula:"SO竄・,      name:"荳蛾・蛹也｡ｫ鮟・ },
  { formula:"NO",       name:"荳驟ｸ蛹也ｪ堤ｴ" },
  { formula:"NO竄・,      name:"莠碁・蛹也ｪ堤ｴ" },
  { formula:"HF",       name:"繝輔ャ蛹匁ｰｴ邏" },
  { formula:"HBr",      name:"閾ｭ蛹匁ｰｴ邏" },
  { formula:"HI",       name:"繝ｨ繧ｦ蛹匁ｰｴ邏" },
  { formula:"H竄４",      name:"遑ｫ蛹匁ｰｴ邏" },
  { formula:"H竄ケO竄・,    name:"繝ｪ繝ｳ驟ｸ" },
  { formula:"H竄・O竄・,    name:"轤ｭ驟ｸ" },
  { formula:"KOH",      name:"豌ｴ驟ｸ蛹悶き繝ｪ繧ｦ繝" },
  { formula:"Ba(OH)竄・,  name:"豌ｴ驟ｸ蛹悶ヰ繝ｪ繧ｦ繝" },
  { formula:"Mg(OH)竄・,  name:"豌ｴ驟ｸ蛹悶・繧ｰ繝阪す繧ｦ繝" },
  { formula:"Al(OH)竄・,  name:"豌ｴ驟ｸ蛹悶い繝ｫ繝溘ル繧ｦ繝" },
  { formula:"Cu(OH)竄・,  name:"豌ｴ驟ｸ蛹夜喝(II)" },
  { formula:"Fe(OH)竄・,  name:"豌ｴ驟ｸ蛹夜延(III)" },
  { formula:"NH竄Гl",    name:"蝪ｩ蛹悶い繝ｳ繝｢繝九え繝" },
  { formula:"CaSO竄・,    name:"遑ｫ驟ｸ繧ｫ繝ｫ繧ｷ繧ｦ繝" },
  { formula:"CuSO竄・,    name:"遑ｫ驟ｸ驫・II)" },
  { formula:"FeCl竄・,    name:"蝪ｩ蛹夜延(II)" },
  { formula:"FeCl竄・,    name:"蝪ｩ蛹夜延(III)" },
  { formula:"NaHCO竄・,   name:"轤ｭ驟ｸ豌ｴ邏繝翫ヨ繝ｪ繧ｦ繝" },
  { formula:"Na竄・O竄・,   name:"轤ｭ驟ｸ繝翫ヨ繝ｪ繧ｦ繝" },
  { formula:"CH竄イOOH",  name:"驟｢驟ｸ" },
  { formula:"HCOOH",    name:"繧ｮ驟ｸ" },
  { formula:"SiO竄・,     name:"莠碁・蛹悶こ繧､邏" },
  { formula:"O竄・,       name:"繧ｪ繧ｾ繝ｳ" },
  { formula:"P竄О竄≫・",    name:"蜊・・蛹門屁繝ｪ繝ｳ" },
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

// 笏笏 繧ｹ繧ｳ繧｢險育ｮ・笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
// 蜈・ｴ/繧､繧ｪ繝ｳ/蛹門ｭｦ蠑上け繧､繧ｺ・壽凾髢鍋せ + 豁｣隗｣邇・・繝ｼ繝翫せ
function calcQuizScore(correct, total, rawScore) {
  if (total === 0) return 0;
  const acc = correct / total;
  const accBonus = Math.round(acc * acc * 200); // 豁｣隗｣邇・ｲﾃ・00轤ｹ
  return rawScore + accBonus;
}

// mol險育ｮ暦ｼ壽ｭ｣隗｣謨ｰﾃ・00 + 豁｣隗｣邇・・繝ｼ繝翫せ + 谿九ｊ譎る俣繝懊・繝翫せ
function calcMolScore(correct, total, timeLeft) {
  if (total === 0) return 0;
  const acc = correct / total;
  const base = correct * 100;
  const accBonus = Math.round(acc * acc * 100);
  const timeBonus = Math.round(timeLeft * 0.5);
  return base + accBonus + timeBonus;
}

// 繧ｿ繧､繝繧｢繧ｿ繝・け・壽ｭ｣隗｣謨ｰﾃ・00 + 繧ｿ繧､繝繝懊・繝翫せ・域掠縺・⊇縺ｩ鬮伜ｾ礼せ・・function calcTimeAttackScore(correct, total, elapsedSec) {
  if (total === 0) return 0;
  const acc = correct / total;
  const base = correct * 100;
  const accBonus = Math.round(acc * acc * 100);
  const timeBonus = Math.max(0, Math.round((600 - elapsedSec) * 1));
  return base + accBonus + timeBonus;
}

// 譌･莉倥ヵ繧ｩ繝ｼ繝槭ャ繝・function fmtDate(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
}

function seededRng(seed) {
  let s = seed;
  return () => { s=(s*1664525+1013904223)&0xffffffff; return (s>>>0)/0x100000000; };
}


// ============================================================
// 髮｣譏灘ｺｦ蛻･繝繝溘・驕ｸ謚櫁い逕滓・
// ============================================================

// 笏笏 繧､繧ｪ繝ｳ逕ｨ繝繝溘・ 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
// 蜷・う繧ｪ繝ｳ縺ｫ縲御ｼｼ縺ｦ縺・ｋ繧､繧ｪ繝ｳ縲阪ｒ莠句燕螳夂ｾｩ
const ION_SIMILAR = {
  // 髯ｽ繧､繧ｪ繝ｳ
  "H竅ｺ":    { normal:["繝翫ヨ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ","繧ｫ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ","繝ｪ繝√え繝繧､繧ｪ繝ｳ"],           hard:["豌ｴ驟ｸ蛹也黄繧､繧ｪ繝ｳ","繝輔ャ蛹也黄繧､繧ｪ繝ｳ","繧｢繝ｳ繝｢繝九え繝繧､繧ｪ繝ｳ"] },
  "Na竅ｺ":   { normal:["繧ｫ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ","繝ｪ繝√え繝繧､繧ｪ繝ｳ","繝槭げ繝阪す繧ｦ繝繧､繧ｪ繝ｳ"],          hard:["繝翫ヨ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ(2萓｡)","Naﾂｲ竅ｺ","繝翫ヨ繝ｪ繧ｦ繝繧｢繝九が繝ｳ"] },
  "K竅ｺ":    { normal:["繝翫ヨ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ","繝ｪ繝√え繝繧､繧ｪ繝ｳ","繝ｫ繝薙ず繧ｦ繝繧､繧ｪ繝ｳ"],           hard:["繧ｫ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ(2萓｡)","Kﾂｲ竅ｺ","繧ｫ繝ｪ繧ｦ繝繧｢繝九が繝ｳ"] },
  "Caﾂｲ竅ｺ":  { normal:["繝槭げ繝阪す繧ｦ繝繧､繧ｪ繝ｳ","繝舌Μ繧ｦ繝繧､繧ｪ繝ｳ","驫・う繧ｪ繝ｳ"],               hard:["繧ｫ繝ｫ繧ｷ繧ｦ繝繧､繧ｪ繝ｳ(1萓｡)","繧ｫ繝ｫ繧ｷ繧ｦ繝繧､繧ｪ繝ｳ(3萓｡)","繧ｫ繝ｫ繧ｷ繧ｦ繝繧｢繝九が繝ｳ"] },
  "Mgﾂｲ竅ｺ":  { normal:["繧ｫ繝ｫ繧ｷ繧ｦ繝繧､繧ｪ繝ｳ","莠憺央繧､繧ｪ繝ｳ","繝舌Μ繧ｦ繝繧､繧ｪ繝ｳ"],               hard:["繝槭げ繝阪す繧ｦ繝繧､繧ｪ繝ｳ(1萓｡)","繝槭げ繝阪す繧ｦ繝繧､繧ｪ繝ｳ(3萓｡)","繝槭げ繝阪す繧ｦ繝繧｢繝九が繝ｳ"] },
  "Baﾂｲ竅ｺ":  { normal:["繧ｫ繝ｫ繧ｷ繧ｦ繝繧､繧ｪ繝ｳ","繝槭げ繝阪す繧ｦ繝繧､繧ｪ繝ｳ","繧ｹ繝医Ο繝ｳ繝√え繝繧､繧ｪ繝ｳ"],   hard:["繝舌Μ繧ｦ繝繧､繧ｪ繝ｳ(1萓｡)","繝舌Μ繧ｦ繝繧､繧ｪ繝ｳ(3萓｡)","繝舌Μ繧ｦ繝繧｢繝九が繝ｳ"] },
  "Cuﾂｲ竅ｺ":  { normal:["莠憺央繧､繧ｪ繝ｳ","驩・II)繧､繧ｪ繝ｳ","繝九ャ繧ｱ繝ｫ繧､繧ｪ繝ｳ"],                  hard:["驫・う繧ｪ繝ｳ(1萓｡)","驫・う繧ｪ繝ｳ(3萓｡)","驫・い繝九が繝ｳ"] },
  "Znﾂｲ竅ｺ":  { normal:["驫・う繧ｪ繝ｳ","繝九ャ繧ｱ繝ｫ繧､繧ｪ繝ｳ","驩・II)繧､繧ｪ繝ｳ"],                    hard:["莠憺央繧､繧ｪ繝ｳ(1萓｡)","莠憺央繧､繧ｪ繝ｳ(3萓｡)","莠憺央繧｢繝九が繝ｳ"] },
  "Feﾂｲ竅ｺ":  { normal:["驩・III)繧､繧ｪ繝ｳ","驫・う繧ｪ繝ｳ","繝槭Φ繧ｬ繝ｳ(II)繧､繧ｪ繝ｳ"],               hard:["驩・III)繧､繧ｪ繝ｳ","驩・I)繧､繧ｪ繝ｳ","驩・い繝九が繝ｳ"] },
  "Feﾂｳ竅ｺ":  { normal:["驩・II)繧､繧ｪ繝ｳ","繧｢繝ｫ繝溘ル繧ｦ繝繧､繧ｪ繝ｳ","繧ｯ繝ｭ繝(III)繧､繧ｪ繝ｳ"],        hard:["驩・II)繧､繧ｪ繝ｳ","驩・IV)繧､繧ｪ繝ｳ","驩・い繝九が繝ｳ"] },
  "Alﾂｳ竅ｺ":  { normal:["驩・III)繧､繧ｪ繝ｳ","繧ｯ繝ｭ繝(III)繧､繧ｪ繝ｳ","繧｢繝ｫ繝溘ル繧ｦ繝繧､繧ｪ繝ｳ(2萓｡)"],  hard:["繧｢繝ｫ繝溘ル繧ｦ繝繧､繧ｪ繝ｳ(2萓｡)","繧｢繝ｫ繝溘ル繧ｦ繝繧､繧ｪ繝ｳ(4萓｡)","繧｢繝ｫ繝溘ル繧ｦ繝繧｢繝九が繝ｳ"] },
  "NH竄・⊆":  { normal:["繝翫ヨ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ","繧ｫ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ","豌ｴ邏繧､繧ｪ繝ｳ"],               hard:["繧｢繝ｳ繝｢繝九え繝繧､繧ｪ繝ｳ(2萓｡)","繧｢繝ｳ繝｢繝九い繧､繧ｪ繝ｳ","繧｢繝ｳ繝｢繝九え繝繧｢繝九が繝ｳ"] },
  "Ag竅ｺ":   { normal:["繝翫ヨ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ","繧ｫ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ","驫・う繧ｪ繝ｳ"],                 hard:["驫繧､繧ｪ繝ｳ(2萓｡)","驫繧｢繝九が繝ｳ","驫繧､繧ｪ繝ｳ(0萓｡)"] },
  "Li竅ｺ":   { normal:["繝翫ヨ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ","繧ｫ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ","豌ｴ邏繧､繧ｪ繝ｳ"],               hard:["繝ｪ繝√え繝繧､繧ｪ繝ｳ(2萓｡)","繝ｪ繝√え繝繧｢繝九が繝ｳ","Liﾂｲ竅ｺ"] },
  "Mnﾂｲ竅ｺ":  { normal:["驩・II)繧､繧ｪ繝ｳ","驫・う繧ｪ繝ｳ","莠憺央繧､繧ｪ繝ｳ"],                        hard:["繝槭Φ繧ｬ繝ｳ(III)繧､繧ｪ繝ｳ","繝槭Φ繧ｬ繝ｳ(I)繧､繧ｪ繝ｳ","繝槭Φ繧ｬ繝ｳ繧｢繝九が繝ｳ"] },
  "Pbﾂｲ竅ｺ":  { normal:["驫・う繧ｪ繝ｳ","莠憺央繧､繧ｪ繝ｳ","驩・II)繧､繧ｪ繝ｳ"],                        hard:["驩帙う繧ｪ繝ｳ(1萓｡)","驩帙う繧ｪ繝ｳ(4萓｡)","驩帙い繝九が繝ｳ"] },
  "Niﾂｲ竅ｺ":  { normal:["驫・う繧ｪ繝ｳ","莠憺央繧､繧ｪ繝ｳ","繧ｳ繝舌Ν繝医う繧ｪ繝ｳ"],                       hard:["繝九ャ繧ｱ繝ｫ繧､繧ｪ繝ｳ(3萓｡)","繝九ャ繧ｱ繝ｫ繧､繧ｪ繝ｳ(1萓｡)","繝九ャ繧ｱ繝ｫ繧｢繝九が繝ｳ"] },
  "Crﾂｳ竅ｺ":  { normal:["驩・III)繧､繧ｪ繝ｳ","繧｢繝ｫ繝溘ル繧ｦ繝繧､繧ｪ繝ｳ","繝槭Φ繧ｬ繝ｳ(III)繧､繧ｪ繝ｳ"],     hard:["繧ｯ繝ｭ繝(II)繧､繧ｪ繝ｳ","繧ｯ繝ｭ繝(IV)繧､繧ｪ繝ｳ","繧ｯ繝ｭ繝繧｢繝九が繝ｳ"] },
  "H竄グ竅ｺ":  { normal:["繧｢繝ｳ繝｢繝九え繝繧､繧ｪ繝ｳ","豌ｴ邏繧､繧ｪ繝ｳ","繝翫ヨ繝ｪ繧ｦ繝繧､繧ｪ繝ｳ"],            hard:["繧ｪ繧ｭ繧ｽ繝九え繝繧､繧ｪ繝ｳ(2萓｡)","豌ｴ蛻・ｭ舌う繧ｪ繝ｳ","H竄０竅ｺ"] },
  // 髯ｰ繧､繧ｪ繝ｳ
  "Cl竅ｻ":   { normal:["閾ｭ蛹也黄繧､繧ｪ繝ｳ","繝ｨ繧ｦ蛹也黄繧､繧ｪ繝ｳ","繝輔ャ蛹也黄繧､繧ｪ繝ｳ"],               hard:["蝪ｩ蛹也黄繧､繧ｪ繝ｳ(2萓｡)","蝪ｩ蛹也黄繧｢繝九が繝ｳ(2萓｡)","Clﾂｲ竅ｻ"] },
  "OH竅ｻ":   { normal:["繝輔ャ蛹也黄繧､繧ｪ繝ｳ","蝪ｩ蛹也黄繧､繧ｪ繝ｳ","驟ｸ蛹也黄繧､繧ｪ繝ｳ"],                 hard:["豌ｴ驟ｸ蛹也黄繧､繧ｪ繝ｳ(2萓｡)","驟ｸ邏繧､繧ｪ繝ｳ","Oﾂｲ竅ｻ"] },
  "SO竄・ｲ竅ｻ": { normal:["莠懃｡ｫ驟ｸ繧､繧ｪ繝ｳ","轤ｭ驟ｸ繧､繧ｪ繝ｳ","繝ｪ繝ｳ驟ｸ繧､繧ｪ繝ｳ"],                    hard:["莠懃｡ｫ驟ｸ繧､繧ｪ繝ｳ","遑ｫ驟ｸ豌ｴ邏繧､繧ｪ繝ｳ","遑ｫ驟ｸ繧､繧ｪ繝ｳ(1萓｡)"] },
  "NO竄・⊇":  { normal:["莠懃｡晞・繧､繧ｪ繝ｳ","遑ｫ驟ｸ繧､繧ｪ繝ｳ","蝪ｩ蛹也黄繧､繧ｪ繝ｳ"],                    hard:["莠懃｡晞・繧､繧ｪ繝ｳ","遑晞・繧､繧ｪ繝ｳ(2萓｡)","NO竄・⊇"] },
  "CO竄δｲ竅ｻ": { normal:["轤ｭ驟ｸ豌ｴ邏繧､繧ｪ繝ｳ","遑ｫ驟ｸ繧､繧ｪ繝ｳ","莠懃｡ｫ驟ｸ繧､繧ｪ繝ｳ"],                  hard:["轤ｭ驟ｸ豌ｴ邏繧､繧ｪ繝ｳ","轤ｭ驟ｸ繧､繧ｪ繝ｳ(1萓｡)","轤ｭ驟ｸ繧､繧ｪ繝ｳ(3萓｡)"] },
  "HCO竄・⊇": { normal:["轤ｭ驟ｸ繧､繧ｪ繝ｳ","遑ｫ驟ｸ豌ｴ邏繧､繧ｪ繝ｳ","豌ｴ驟ｸ蛹也黄繧､繧ｪ繝ｳ"],                hard:["轤ｭ驟ｸ繧､繧ｪ繝ｳ","轤ｭ驟ｸ豌ｴ邏繧､繧ｪ繝ｳ(2萓｡)","HCO竄・⊇"] },
  "SO竄δｲ竅ｻ": { normal:["遑ｫ驟ｸ繧､繧ｪ繝ｳ","轤ｭ驟ｸ繧､繧ｪ繝ｳ","莠懃｡晞・繧､繧ｪ繝ｳ"],                      hard:["遑ｫ驟ｸ繧､繧ｪ繝ｳ","莠懃｡ｫ驟ｸ繧､繧ｪ繝ｳ(1萓｡)","莠懃｡ｫ驟ｸ繧､繧ｪ繝ｳ(3萓｡)"] },
  "NO竄や⊇":  { normal:["遑晞・繧､繧ｪ繝ｳ","莠懃｡ｫ驟ｸ繧､繧ｪ繝ｳ","蝪ｩ蛹也黄繧､繧ｪ繝ｳ"],                    hard:["遑晞・繧､繧ｪ繝ｳ","莠懃｡晞・繧､繧ｪ繝ｳ(2萓｡)","N竄０竅ｻ"] },
  "PO竄・ｳ竅ｻ": { normal:["遑ｫ驟ｸ繧､繧ｪ繝ｳ","轤ｭ驟ｸ繧､繧ｪ繝ｳ","遑晞・繧､繧ｪ繝ｳ"],                        hard:["繝ｪ繝ｳ驟ｸ繧､繧ｪ繝ｳ(2萓｡)","繝ｪ繝ｳ驟ｸ繧､繧ｪ繝ｳ(4萓｡)","HPO竄・ｲ竅ｻ"] },
  "HSO竄・⊇": { normal:["遑ｫ驟ｸ繧､繧ｪ繝ｳ","轤ｭ驟ｸ豌ｴ邏繧､繧ｪ繝ｳ","豌ｴ驟ｸ蛹也黄繧､繧ｪ繝ｳ"],                hard:["遑ｫ驟ｸ繧､繧ｪ繝ｳ","莠懃｡ｫ驟ｸ豌ｴ邏繧､繧ｪ繝ｳ","H竄４O竄・] },
  "MnO竄・⊇": { normal:["莠後け繝ｭ繝驟ｸ繧､繧ｪ繝ｳ","遑ｫ驟ｸ繧､繧ｪ繝ｳ","遑晞・繧､繧ｪ繝ｳ"],                  hard:["驕弱・繝ｳ繧ｬ繝ｳ驟ｸ繧､繧ｪ繝ｳ(2萓｡)","繝槭Φ繧ｬ繝ｳ驟ｸ繧､繧ｪ繝ｳ","MnO竄・⊇"] },
  "Cr竄０竄・ｲ竅ｻ":{ normal:["驕弱・繝ｳ繧ｬ繝ｳ驟ｸ繧､繧ｪ繝ｳ","遑ｫ驟ｸ繧､繧ｪ繝ｳ","轤ｭ驟ｸ繧､繧ｪ繝ｳ"],              hard:["繧ｯ繝ｭ繝驟ｸ繧､繧ｪ繝ｳ","莠後け繝ｭ繝驟ｸ繧､繧ｪ繝ｳ(3萓｡)","Cr竄０竄・ｲ竅ｻ"] },
  "CH竄イOO竅ｻ":{ normal:["繧ｮ驟ｸ繧､繧ｪ繝ｳ","豌ｴ驟ｸ蛹也黄繧､繧ｪ繝ｳ","轤ｭ驟ｸ豌ｴ邏繧､繧ｪ繝ｳ"],              hard:["驟｢驟ｸ繧､繧ｪ繝ｳ(2萓｡)","繝励Ο繝斐が繝ｳ驟ｸ繧､繧ｪ繝ｳ","CH竄・OO竅ｻ"] },
  "F竅ｻ":    { normal:["蝪ｩ蛹也黄繧､繧ｪ繝ｳ","閾ｭ蛹也黄繧､繧ｪ繝ｳ","豌ｴ驟ｸ蛹也黄繧､繧ｪ繝ｳ"],                hard:["繝輔ャ蛹也黄繧､繧ｪ繝ｳ(2萓｡)","Fﾂｲ竅ｻ","繝輔ャ蛹也黄繧｢繝九が繝ｳ(2萓｡)"] },
  "Br竅ｻ":   { normal:["蝪ｩ蛹也黄繧､繧ｪ繝ｳ","繝ｨ繧ｦ蛹也黄繧､繧ｪ繝ｳ","繝輔ャ蛹也黄繧､繧ｪ繝ｳ"],              hard:["閾ｭ蛹也黄繧､繧ｪ繝ｳ(2萓｡)","Brﾂｲ竅ｻ","閾ｭ蛹也黄繧｢繝九が繝ｳ(2萓｡)"] },
  "I竅ｻ":    { normal:["閾ｭ蛹也黄繧､繧ｪ繝ｳ","蝪ｩ蛹也黄繧､繧ｪ繝ｳ","繝輔ャ蛹也黄繧､繧ｪ繝ｳ"],               hard:["繝ｨ繧ｦ蛹也黄繧､繧ｪ繝ｳ(2萓｡)","I竄・⊇","繝ｨ繧ｦ蛹也黄繧｢繝九が繝ｳ(2萓｡)"] },
  "Sﾂｲ竅ｻ":   { normal:["驟ｸ蛹也黄繧､繧ｪ繝ｳ","蝪ｩ蛹也黄繧､繧ｪ繝ｳ","遑ｫ驟ｸ繧､繧ｪ繝ｳ"],                   hard:["遑ｫ蛹也黄繧､繧ｪ繝ｳ(1萓｡)","遑ｫ蛹也黄繧､繧ｪ繝ｳ(3萓｡)","Sﾂｲ竅ｺ"] },
  "Oﾂｲ竅ｻ":   { normal:["遑ｫ蛹也黄繧､繧ｪ繝ｳ","豌ｴ驟ｸ蛹也黄繧､繧ｪ繝ｳ","繝輔ャ蛹也黄繧､繧ｪ繝ｳ"],              hard:["驟ｸ蛹也黄繧､繧ｪ繝ｳ(1萓｡)","驟ｸ蛹也黄繧､繧ｪ繝ｳ(3萓｡)","Oﾂｲ竅ｺ"] },
  "CN竅ｻ":   { normal:["蝪ｩ蛹也黄繧､繧ｪ繝ｳ","豌ｴ驟ｸ蛹也黄繧､繧ｪ繝ｳ","莠懃｡晞・繧､繧ｪ繝ｳ"],               hard:["繧ｷ繧｢繝ｳ蛹也黄繧､繧ｪ繝ｳ(2萓｡)","C竄・竅ｻ","繝√が繧ｷ繧｢繝ｳ驟ｸ繧､繧ｪ繝ｳ"] },
  "SCN竅ｻ":  { normal:["繧ｷ繧｢繝ｳ蛹也黄繧､繧ｪ繝ｳ","蝪ｩ蛹也黄繧､繧ｪ繝ｳ","遑晞・繧､繧ｪ繝ｳ"],               hard:["繝√が繧ｷ繧｢繝ｳ驟ｸ繧､繧ｪ繝ｳ(2萓｡)","SC竄・竅ｻ","繧ｷ繧｢繝ｳ蛹也黄繧､繧ｪ繝ｳ"] },
};


// 笏笏 繧､繧ｪ繝ｳ逕ｨ繝繝溘・ 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
// 蜷・う繧ｪ繝ｳ縺ｫ縲御ｼｼ縺ｦ縺・ｋ繧､繧ｪ繝ｳ縲阪ｒ莠句燕螳夂ｾｩ
const FORMULA_SIMILAR = {
  "H竄０":    { normal:["CO竄・,"H竄・,"HCl"],           hard:["H竄０竄・,"HO","H竄グ"] },
  "CO竄・:    { normal:["CO","SO竄・,"H竄０"],            hard:["CO","CO竄・,"C竄０竄・] },
  "CO":     { normal:["CO竄・,"NO","SO竄・],            hard:["CO竄・,"C竄０","CO竄・] },
  "HCl":    { normal:["NaCl","H竄・,"Cl竄・],           hard:["HCl竄・,"H竄・l","HClO"] },
  "NaCl":   { normal:["KCl","MgCl竄・,"NaOH"],        hard:["NaCl竄・,"Na竄・l","NaCl竄・] },
  "NaOH":   { normal:["KOH","NaCl","Na竄０"],         hard:["Na竄０H","NaO","NaOH竄・] },
  "H竄４O竄・:  { normal:["H竄４O竄・,"HNO竄・,"H竄ケO竄・],     hard:["H竄４O竄・,"HSO竄・,"H竄ゴO竄・] },
  "HNO竄・:   { normal:["HNO竄・,"H竄４O竄・,"HCl"],        hard:["HNO竄・,"H竄・O竄・,"HN竄０竄・] },
  "NH竄・:    { normal:["N竄・,"H竄・,"N竄・竄・],            hard:["NH竄・,"NH竄・,"N竄・竄・] },
  "H竄０竄・:   { normal:["H竄０","HO","H竄・],             hard:["HO竄・,"H竄０","HO竄や⊇"] },
  "CaCO竄・:  { normal:["Na竄・O竄・,"CaO","Ca(OH)竄・],    hard:["CaCO","Ca竄・O竄・,"CaCO竄・] },
  "Ca(OH)竄・:{ normal:["CaCO竄・,"CaO","Mg(OH)竄・],     hard:["Ca(OH)","CaOH","Ca竄・OH)竄・] },
  "CuO":    { normal:["Cu竄０","FeO","ZnO"],           hard:["Cu竄０","CuO竄・,"Cu竄グ"] },
  "Fe竄０竄・:  { normal:["FeO","Fe竄グ竄・,"Al竄０竄・],       hard:["FeO","Fe竄グ竄・,"Fe竄０竄・] },
  "MgO":    { normal:["CaO","ZnO","Al竄０竄・],         hard:["Mg竄０","MgO竄・,"Mg竄グ"] },
  "Al竄０竄・:  { normal:["Fe竄０竄・,"SiO竄・,"MgO"],        hard:["AlO","Al竄グ竄・,"Al竄０"] },
  "Na竄０":   { normal:["K竄０","NaOH","Na竄・O竄・],       hard:["Na竄０竄・,"NaO","Na竄グ"] },
  "H竄・:     { normal:["O竄・,"N竄・,"Cl竄・],             hard:["H","H竄・,"H竄や⊆"] },
  "O竄・:     { normal:["O竄・,"N竄・,"H竄・],              hard:["O竄・,"O","O竄や⊇"] },
  "N竄・:     { normal:["O竄・,"NO","NH竄・],             hard:["NO","N","N竄・] },
  "Cl竄・:    { normal:["HCl","Br竄・,"F竄・],            hard:["Cl","Cl竄・,"ClO"] },
  "CH竄・:    { normal:["C竄・竄・,"C竄・竄・,"NH竄・],        hard:["CH竄・,"C竄・竄・,"CH竄О"] },
  "C竄・竄・H": { normal:["CH竄グH","C竄・竄・,"CH竄・],       hard:["C竄・竄ОH","C竄・竄・","C竄・竄・"] },
  "SO竄・:    { normal:["SO竄・,"NO竄・,"CO竄・],           hard:["SO竄・,"S竄０","SO"] },
  "SO竄・:    { normal:["SO竄・,"NO竄・,"CO竄・],           hard:["SO竄・,"S竄０竄・,"SO竄・] },
  "NO":     { normal:["NO竄・,"N竄０","CO"],            hard:["NO竄・,"N竄０","NO竄・] },
  "NO竄・:    { normal:["NO","N竄０竄・,"SO竄・],           hard:["NO","N竄０竄・,"NO竄・] },
  "KOH":    { normal:["NaOH","K竄０","KCl"],          hard:["K竄０H","KOH竄・,"KOOH"] },
  "Ba(OH)竄・:{ normal:["Ca(OH)竄・,"BaO","BaCl竄・],     hard:["Ba(OH)","BaO+H竄０","Ba竄・OH)竄・] },
  "NH竄Гl":  { normal:["NaCl","NH竄・,"HCl"],          hard:["NH竄Гl竄・,"(NH竄・竄・l","NH竄イl"] },
  "CuSO竄・:  { normal:["ZnSO竄・,"CuCl竄・,"CaCO竄・],    hard:["Cu竄４O竄・,"CuSO竄・,"Cu(SO竄・竄・] },
  "FeCl竄・:  { normal:["FeCl竄・,"NaCl","MgCl竄・],      hard:["FeCl竄・,"Fe竄・l","FeCl"] },
  "FeCl竄・:  { normal:["FeCl竄・,"AlCl竄・,"NaCl"],      hard:["FeCl竄・,"FeCl竄・,"Fe竄・l竄・] },
  "NaHCO竄・: { normal:["Na竄・O竄・,"NaOH","CaCO竄・],     hard:["Na竄・O竄・,"NaCO竄・,"NaHCO竄・] },
  "Na竄・O竄・: { normal:["NaHCO竄・,"Na竄０","NaOH"],      hard:["NaHCO竄・,"Na竄イO竄・,"Na竄・O竄・] },
  "SiO竄・:   { normal:["CO竄・,"SO竄・,"Al竄０竄・],         hard:["SiO","Si竄０竄・,"SiO竄・] },
  "O竄・:     { normal:["O竄・,"SO竄・,"NO竄・],            hard:["O竄・,"O竄・,"O竄や⊇"] },
  "H竄４":    { normal:["HCl","SO竄・,"H竄０"],           hard:["HS","H竄４竄・,"H竄ゴ"] },
  "H竄ケO竄・:  { normal:["H竄４O竄・,"HNO竄・,"H竄１O竄・],     hard:["H竄１O竄・⊇","H竄ケO竄・,"HPO竄・ｲ竅ｻ"] },
};

// 髮｣譏灘ｺｦ縺ｫ蠢懊§縺溘ム繝溘・驕ｸ謚櫁い繧堤函謌・// ION_SIMILAR / FORMULA_SIMILAR 縺ｮ蛟､縺ｯ縲悟錐蜑阪・譁・ｭ怜・繝ｪ繧ｹ繝医・// 竊・蠑鞘・蜷榊燕 縺ｧ繧・蜷榊燕竊貞ｼ・縺ｧ繧よｭ｣縺励￥菴ｿ縺医ｋ
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

  // nameList縺ｯ縲悟錐蜑阪・譁・ｭ怜・縲坂・ allItems縺九ｉ蜷榊燕縺ｧ讀懃ｴ｢縲√↑縺代ｌ縺ｰ繝繝溘・繧ｪ繝悶ず繧ｧ繧ｯ繝育函謌・  const results = nameList.slice(0, 3).map(dummyName => {
    const found = allItems.find(x => x.name === dummyName);
    if (found) return found;
    // 螳溷惠縺励↑縺・錐蜑阪・繝繝溘・
    // formula・亥ｼ上→縺励※菴ｿ縺・､・峨・遨ｺ譁・ｭ励↓縺励※縲∬｡ｨ遉ｺ蛛ｴ縺ｧname・亥錐蜑搾ｼ峨ｒ菴ｿ縺・    return { formula: "???", name: dummyName, _dummy: true };
  });

  // 3蛟区悴貅縺ｪ繧芽｣懷ｮ・  if (results.length < 3) {
    const usedKeys = results.map(r => r._dummy ? r.name : (mode==="ion"?r.formula:r.formula));
    const extras = shuffle(allItems.filter(x => {
      const k = mode==="ion"?x.formula:x.formula;
      return k !== key && !usedKeys.includes(k);
    })).slice(0, 3 - results.length);
    return [...results, ...extras];
  }
  return results;
}

// 蜈・ｴ逕ｨ繝繝溘・・磯屮譏灘ｺｦ蛻･・・// easy: 蜈ｨ縺城＆縺・・邏 / normal: 蜷悟捉譛溘ｄ莨ｼ縺溯ｨ伜捷 / hard: 險伜捷縺御ｼｼ縺ｦ縺・ｋ
function getElementDummies(el, elements, difficulty) {
  if (difficulty === "easy") {
    return shuffle(elements.filter(e=>e.symbol!==el.symbol)).slice(0,3);
  }
  if (difficulty === "normal") {
    // 蜷悟捉譛・or 髫｣謗･蜴溷ｭ千分蜿ｷ
    const sameRow = elements.filter(e =>
      e.symbol!==el.symbol &&
      Math.abs(e.number - el.number) <= 8
    );
    const pool = sameRow.length >= 3 ? sameRow : elements.filter(e=>e.symbol!==el.symbol);
    return shuffle(pool).slice(0,3);
  }
  if (difficulty === "hard") {
    // 險伜捷縺御ｼｼ縺ｦ縺・ｋ・磯ｭ譁・ｭ嶺ｸ閾ｴ or 1譁・ｭ鈴＆縺・ｼ・    const similar = elements.filter(e => {
      if (e.symbol === el.symbol) return false;
      if (e.symbol[0] === el.symbol[0]) return true; // 鬆ｭ譁・ｭ怜酔縺・      if (Math.abs(e.number - el.number) <= 2) return true; // 髫｣縺ｮ蜈・ｴ
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
  // 蜷榊燕竊定ｨ伜捷 縺ｮ蝣ｴ蜷・ choices縺ｯ險伜捷, 豁｣隗｣縺ｯel.symbol
  // 險伜捷竊貞錐蜑・縺ｮ蝣ｴ蜷・ choices縺ｯ蜷榊燕, 豁｣隗｣縺ｯel.name
  const choiceItems = shuffle([el, ...wrongItems]);
  return {
    id: el.symbol+isS2N,
    display: isS2N ? el.symbol : el.name,
    label: isS2N ? "縺薙・險伜捷縺ｮ蜈・ｴ蜷阪・・・ : "縺薙・蜈・ｴ縺ｮ險伜捷縺ｯ・・,
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
  const choiceItems = shuffle([ion, ...wrongCandidates]);
  // 蠑鞘・蜷榊燕: 驕ｸ謚櫁い縺ｯ蜷榊燕縲ょ錐蜑阪′縺ｪ縺・_dummy)蝣ｴ蜷医・蠑上ｒ縺昴・縺ｾ縺ｾ陦ｨ遉ｺ
  // 蜷榊燕竊貞ｼ・ 驕ｸ謚櫁い縺ｯ蠑・  const finalChoices = choiceItems.map(c => {
    if (isF2N) {
      // 蠑鞘・蜷榊燕: 驕ｸ謚櫁い縺ｯ蜷榊燕
      return c.name;
    } else {
      // 蜷榊燕竊貞ｼ・ 驕ｸ謚櫁い縺ｯ蠑上・dummy縺ｮ蝣ｴ蜷・ame繧偵◎縺ｮ縺ｾ縺ｾ驕ｸ謚櫁い縺ｫ・医ム繝溘・蠑上→縺励※・・      return c._dummy ? c.name : c.formula;
    }
  });
  return {
    id: ion.formula+isF2N,
    display: isF2N ? ion.formula : ion.name,
    label: isF2N ? "縺薙・繧､繧ｪ繝ｳ蠑上・蜷榊燕縺ｯ・・ : "縺薙・繧､繧ｪ繝ｳ縺ｮ蠑上・・・,
    choices: finalChoices,
    answer: isF2N ? ion.name : ion.formula,
    isSymbol: isF2N,
    meta: { symbol:ion.formula, name:ion.name },
  };
}

// 蛹門ｭｦ蠑上け繧､繧ｺ逕ｨ蝠城｡檎函謌・directionMode: "f2n"=蠑鞘・蜷榊燕, "n2f"=蜷榊燕竊貞ｼ・ "random"
function generateFormulaQ(formulas, rng, directionMode="random", difficulty="normal") {
  const rand = rng || Math.random.bind(Math);
  const item = formulas[Math.floor(rand()*formulas.length)];
  const isF2N = directionMode==="f2n" ? true : directionMode==="n2f" ? false : rand() > 0.5;
  const wrongCandidates = getDifficultyCandidates(item, formulas, difficulty, "formula");
  const choiceItems = shuffle([item, ...wrongCandidates]);
  const finalChoices = choiceItems.map(c => {
    if (isF2N) {
      // 蠑鞘・蜷榊燕: 驕ｸ謚櫁い縺ｯ蜷榊燕
      return c.name;
    } else {
      // 蜷榊燕竊貞ｼ・ 驕ｸ謚櫁い縺ｯ蠑上・dummy縺ｮ蝣ｴ蜷・ame繧偵◎縺ｮ縺ｾ縺ｾ・医ム繝溘・蠑上→縺励※・・      return c._dummy ? c.name : c.formula;
    }
  });
  return {
    id: item.formula+isF2N,
    display: isF2N ? item.formula : item.name,
    label: isF2N ? "縺薙・蛹門ｭｦ蠑上・迚ｩ雉ｪ蜷阪・・・ : "縺薙・迚ｩ雉ｪ縺ｮ蛹門ｭｦ蠑上・・・,
    choices: finalChoices,
    answer: isF2N ? item.name : item.formula,
    isSymbol: !isF2N,
    meta: { symbol:item.formula, name:item.name },
  };
}


// ============================================================
// BGM ENGINE  笏 繝帙・繝逕ｨ(關ｽ縺｡逹縺・◆) 縺ｨ 繝励Ξ繧､逕ｨ(繧｢繝・・繝・Φ繝・ 繧貞・髮｢
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
  // 繝帙・繝逕ｨ: 繧・▲縺溘ｊ縺励◆繧｢繝ｳ繝薙お繝ｳ繝磯｢ｨ繝｡繝ｭ繝・ぅ
  _loopHome() {
    if(!this.playing||this.mode!=="home") return;
    const ctx=this._ctx(), now=ctx.currentTime, bpm=90, beat=60/bpm;
    // 繧・▲縺溘ｊ繝｡繝ｭ繝・ぅ (C繝｡繧ｸ繝｣繝ｼ繝壹Φ繧ｿ)
    const mel=[523,659,784,659,523,440,523,659, 784,880,784,659,523,440,392,440];
    mel.forEach((f,i)=>this._note(f,now+i*beat*0.75,beat*0.65,"sine",0.055));
    // 菴朱浹繝代ャ繝・    [130,130,146,146,130,130,174,174].forEach((f,i)=>this._note(f,now+i*beat,beat*0.85,"sine",0.04));
    // 繧・ｏ繧峨°縺・さ繝ｼ繝・    [[523,659],[523,659],[440,554],[440,554],[392,494],[392,494],[349,440],[349,440]].forEach(([f1,f2],b)=>{
      this._note(f1,now+b*beat,beat*0.9,"sine",0.025);
      this._note(f2,now+b*beat,beat*0.9,"sine",0.025);
    });
    this.loopTO=setTimeout(()=>this._loopHome(), beat*12*1000-80);
  }
  // 繝励Ξ繧､逕ｨ: 繧｢繝・・繝・Φ繝・bit繧ｲ繝ｼ繝鬚ｨ
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
// 笏笏 Firebase Storage・・indow.storage縺ｮ莉｣譖ｿ・俄楳笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
function _fbKey(key) {
  // Firestore縺ｮ繝峨く繝･繝｡繝ｳ繝医く繝ｼ縺ｫ菴ｿ縺医↑縺・枚蟄励ｒ鄂ｮ謠・  return key.replace(/[:/\.#$[\]]/g, "_");
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
/* 繝ｫ繝ｼ繝ｫ遏ｭ譁・*/
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

// 笏笏 Countdown 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
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
  return <div className="cdown">{go?<div className="cdgo">GO! 噫</div>:<div className="cdn">{n}</div>}</div>;
}

// 笏笏 繝ｩ繝ｳ繧ｭ繝ｳ繧ｰ逋ｻ骭ｲ繝｢繝ｼ繝繝ｫ 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
function RankingModal({ score, correct, total, nickname, quizMode, maxNum, subLevel="junior", difficulty="normal", onDone }) {
  const [saving, setSaving] = useState(false);
  const acc = total > 0 ? Math.round(correct/total*100) : 0;

  const doSave = async () => {
    setSaving(true);
    const key = quizMode==="ion" ? "ranking:ion"
      : quizMode==="formula" ? "ranking:formula"
      : quizMode==="mol" ? "ranking:mol"
      : "ranking:v2";
    const res = await sGet(key, true);
    let all = [];
    try { if(res) all=JSON.parse(res.value); } catch{}
    // 蜷後§繝九ャ繧ｯ繝阪・繝・区擅莉ｶ縺ｮ蜿､縺・ｨ倬鹸繧貞炎髯､
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
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>醇 繧ｹ繧ｳ繧｢繧堤匳骭ｲ縺励∪縺吶°・・/h3>
        <div style={{textAlign:"center",marginBottom:12}}>
          <div style={{fontSize:"2rem",fontWeight:900,color:"var(--primary)"}}>{score}轤ｹ</div>
          <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:6,fontSize:".85rem"}}>
            <span style={{background:"var(--bg)",padding:"3px 10px",borderRadius:10}}>豁｣隗｣ <b>{correct}/{total}</b></span>
            <span style={{background:"var(--bg)",padding:"3px 10px",borderRadius:10}}>豁｣遲皮紫 <b>{acc}%</b></span>
          </div>
        </div>
        <p>{nickname} 縺輔ｓ縺ｮ繧ｹ繧ｳ繧｢繧偵Λ繝ｳ繧ｭ繝ｳ繧ｰ縺ｫ霈峨○縺ｾ縺・/p>
        <div style={{display:"flex",gap:10,flexDirection:"column"}}>
          <button className="btn btn-g btn-blk" onClick={doSave} disabled={saving}>
            {saving?"菫晏ｭ倅ｸｭ...":"笨・繝ｩ繝ｳ繧ｭ繝ｳ繧ｰ縺ｫ逋ｻ骭ｲ縺吶ｋ"}
          </button>
          <button className="btn btn-s btn-blk" onClick={()=>onDone(false)}>逋ｻ骭ｲ縺励↑縺・/button>
        </div>
      </div>
    </div>
  );
}

// 笏笏 RangeSelector 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
function RangeSelector({ maxNum, onChange }) {
  return (
    <div className="rwrap">
      <div className="fb2 mb8">
        <span style={{fontWeight:700,fontSize:".88rem"}}>蜃ｺ鬘檎ｯ・峇: 1縲悳maxNum}逡ｪ</span>
        <span className="muted">{getElements(maxNum).length}蜈・ｴ</span>
      </div>
      <input type="range" min={4} max={103} value={maxNum} onChange={e=>onChange(Number(e.target.value))}/>
      <div className="rlbls"><span>4</span><span>20</span><span>36</span><span>56</span><span>82</span><span>103</span></div>
      <div className="pbtns">
        {PRESETS.map(p=>(
          <button key={p.max} className={`pbtn ${maxNum===p.max?"on":""}`} onClick={()=>onChange(p.max)}>{p.label}</button>
        ))}
      </div>
    </div>
  );
}


// 笏笏 驕翫・譁ｹ繝｢繝ｼ繝繝ｫ 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
function HowToModal({ onClose }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="howto-modal" onClick={e=>e.stopPropagation()}>
        <div className="howto-header">
          <button className="howto-close" onClick={onClose}>笨・/button>
          <h2>当 驕翫・譁ｹ繝ｻ轤ｹ謨ｰ繝ｫ繝ｼ繝ｫ</h2>
          <p>CHEM BATTLE 縺ｮ蜈ｨ繝｢繝ｼ繝峨ｒ隗｣隱ｬ</p>
        </div>
        <div className="howto-body">

          {/* 蜈ｱ騾・*/}
          <div className="howto-section">
            <h3>蜈ｱ騾壹Ν繝ｼ繝ｫ</h3>
            <p>繝ｻ繝九ャ繧ｯ繝阪・繝繧堤匳骭ｲ縺励※繝励Ξ繧､縲ゅせ繧ｳ繧｢縺ｯ繝ｩ繝ｳ繧ｭ繝ｳ繧ｰ縺ｫ逋ｻ骭ｲ縺ｧ縺阪ｋ縲・/p>
            <p>繝ｻ4謚槭°繧画ｭ｣縺励＞遲斐∴繧偵ち繝・・縺ｧ驕ｸ縺ｶ縲・/p>
            <p>繝ｻ髮｣譏灘ｺｦ・壽・・域・繧峨°縺ｫ驕輔≧驕ｸ謚櫁い・俄・ 譎ｮ騾・竊・髮｣・磯撼蟶ｸ縺ｫ莨ｼ縺溘ム繝溘・・・/p>
          </div>

          {/* 證苓ｨ倥け繧､繧ｺ */}
          <div className="howto-section">
            <h3 style={{color:"var(--primary)"}}>笞幢ｸ鞘圍ｧｬ 證苓ｨ倥け繧､繧ｺ・・0遘抵ｼ・/h3>
            <p>繝ｻ60遘帝俣縺ｲ縺溘☆繧牙・鬘後ゆｽ募撫豁｣隗｣縺ｧ縺阪ｋ縺区倦謌ｦ・・/p>
            <p>繝ｻ蜃ｺ鬘梧婿蜷代ｒ驕ｸ縺ｹ繧具ｼ夊ｨ伜捷竊貞錐蜑・/ 蜷榊燕竊定ｨ伜捷 / 繝ｩ繝ｳ繝繝</p>
            <p>繝ｻ蟇ｾ謌ｦ・壹Ν繝ｼ繝繧ｳ繝ｼ繝峨ｒ蜈ｱ譛峨＠縺ｦ蜷梧凾繧ｹ繧ｿ繝ｼ繝医√せ繧ｳ繧｢繧呈ｯ碑ｼ・/p>
            <p style={{marginTop:6,padding:"8px 10px",background:"var(--bg)",borderRadius:7,fontSize:".78rem"}}>
              <b>繧ｹ繧ｳ繧｢</b> ・・豁｣隗｣譎ゅ・谿九ｊ遘呈焚縺ｮ蜷郁ｨ・・・豁｣遲皮紫ﾂｲﾃ・00轤ｹ
            </p>
          </div>

          {/* mol險育ｮ・*/}
          <div className="howto-section">
            <h3 style={{color:"#6366f1"}}>ｧｮ mol險育ｮ励ラ繝ｪ繝ｫ・・蛻・ｼ・/h3>
            <p>繝ｻ閾ｪ蛻・〒險育ｮ励＠縺ｦ4謚槭°繧蛾∈縺ｶ縲・0蝠上・5蛻・宛髯舌・/p>
            <p>繝ｻ繝偵Φ繝茨ｼ壽怙螟ｧ3谿ｵ髫趣ｼ遺蔵螟画鋤縺ｮ譁ｹ蜷・竭｡菴ｿ縺・､ 竭｢險育ｮ玲焔鬆・ｼ峨らｭ斐∴縺ｯ陦ｨ遉ｺ縺励↑縺・・/p>
            <p>繝ｻ繧ｹ繧ｭ繝・・・・5遘偵・繝翫Ν繝・ぅ縲√Α繧ｹ縺ｨ縺励※繧ｫ繧ｦ繝ｳ繝医・/p>
            <p>繝ｻ繝｢繝ｼ繝会ｼ壼・髢・・竊芭ol・・ 蝓ｺ遉趣ｼ・竊芭ol繝ｻ蛟区焚・・ 蠢懃畑・・谿ｵ螟画鋤・・/p>
            <p>繝ｻ蟇ｾ謌ｦ繝｢繝ｼ繝峨≠繧翫ょ酔縺伜撫鬘後ｒ隗｣縺・※豁｣隗｣謨ｰ繧呈ｯ碑ｼ・・/p>
            <p style={{marginTop:6,padding:"8px 10px",background:"var(--bg)",borderRadius:7,fontSize:".78rem"}}>
              <b>繧ｹ繧ｳ繧｢</b> ・・豁｣隗｣謨ｰﾃ・00 ・・豁｣遲皮紫ﾂｲﾃ・00 ・・谿九ｊ譎る俣ﾃ・.5
            </p>
          </div>

          {/* 蜴溷ｭ宣㍼ */}
          <div className="howto-section">
            <h3>蜴溷ｭ宣㍼・・ol險育ｮ礼畑・・/h3>
            <div style={{background:"#1e293b",color:"#94a3b8",borderRadius:7,padding:"9px 12px",fontFamily:"monospace",fontSize:".75rem",lineHeight:1.9}}>
              H=1.0縲C=12縲O=16縲N=14<br/>
              Na=23縲Cl=35.5縲Cu=64縲S=32<br/>
              繧｢繝懊ぎ繝峨Ο謨ｰ: 6.0ﾃ・0ﾂｲﾂｳ /mol
            </div>
          </div>

          <button className="btn btn-p btn-blk" onClick={onClose} style={{marginTop:4}}>髢峨§繧・/button>
        </div>
      </div>
    </div>
  );
}

// 笏笏 HomeScreen 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
function HomeScreen({ nickname, onSetNickname, onSolo, onBattle, onRanking, onMemo, onMol, bgmOn, onToggleBgm }) {
  const [edit,setEdit]=useState(false);
  const [ni,setNi]=useState(nickname||"");
  const [showHowTo,setShowHowTo]=useState(false);
  const save=()=>{if(ni.trim()){onSetNickname(ni.trim());setEdit(false);}};
  return (
    <div>
      {showHowTo&&<HowToModal onClose={()=>setShowHowTo(false)}/>}
      {/* 笏笏 Hero 笏笏 */}
      <div className="hero">
        <div className="hero-glow1"/><div className="hero-glow2"/><div className="hero-glow3"/>
        <div className="hero-ring"/><div className="hero-ring2"/>
        <div className="hero-dots"/>
        <div className="hero-icons-deco"><span>笞幢ｸ・/span><span>溌</span><span>笞｡</span></div>
        <div className="hero-icons-deco2"><span>ｧｪ</span><span>ｧｬ</span><span>庁</span></div>
        <div className="hero-content">
          <div className="hero-badge">SCIENCE QUIZ</div>
          <span className="hero-main-icon">笞暦ｸ・/span>
          <div className="hero-app-title">CHEM BATTLE</div>
          <div className="hero-sub-title">蛹門ｭｦ繧偵√ヰ繝医Ν縺ｫ縺励ｈ縺・/div>
          {!nickname||edit?(
            <div className="hero-input-wrap">
              <input className="hero-input" value={ni} onChange={e=>setNi(e.target.value)}
                placeholder="繝九ャ繧ｯ繝阪・繝繧貞・蜉帙＠縺ｦ縺ｭ" maxLength={12}
                onKeyDown={e=>e.key==="Enter"&&save()} autoFocus={edit}/>
              <div style={{display:"flex",gap:8,marginTop:10}}>
                <button className="hero-save-btn" style={{flex:1}} onClick={save}>笨・菫晏ｭ倥＠縺ｦ繧ｹ繧ｿ繝ｼ繝・/button>
                {edit&&<button className="hero-save-btn" style={{flex:"0 0 auto",background:"rgba(255,255,255,.12)",color:"rgba(255,255,255,.7)"}} onClick={()=>setEdit(false)}>笨・/button>}
              </div>
            </div>
          ):(
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <div className="hero-nick">側 {nickname}</div>
              <button className="hero-nick-btn" onClick={()=>setEdit(true)}>螟画峩</button>
            </div>
          )}
        </div>
      </div>

      <div style={{marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:".78rem",color:"var(--primary)",marginBottom:7,paddingLeft:4,letterSpacing:"1px",textTransform:"uppercase"}}>笞幢ｸ・蜈・ｴ繧ｯ繧､繧ｺ</div>
        <div className="g2">
          <div className="sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onSolo("element")}>
            <div className="ic">式</div><div className="nm">縺ｲ縺ｨ繧翫〒謖第姶</div>
            <span className="rule-tag">60遘偵〒縺溘￥縺輔ｓ隗｣縺托ｼ・/span>
          </div>
          <div className="sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onBattle("element")}>
            <div className="ic">笞費ｸ・/div><div className="nm">蟇ｾ謌ｦ縺吶ｋ</div>
            <span className="rule-tag">蜷梧凾縺ｫ隗｣縺・※繧ｹ繧ｳ繧｢豈碑ｼ・/span>
          </div>
        </div>
      </div>

      <div style={{marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:".78rem",color:"var(--ion)",marginBottom:7,paddingLeft:4,letterSpacing:"1px",textTransform:"uppercase"}}>笞｡ 繧､繧ｪ繝ｳ繧ｯ繧､繧ｺ</div>
        <div className="g2">
          <div className="sc ion-sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onSolo("ion")}>
            <div className="ic">式</div><div className="nm">縺ｲ縺ｨ繧翫〒謖第姶</div>
            <span className="rule-tag">60遘偵〒縺溘￥縺輔ｓ隗｣縺托ｼ・/span>
          </div>
          <div className="sc ion-sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onBattle("ion")}>
            <div className="ic">笞費ｸ・/div><div className="nm">蟇ｾ謌ｦ縺吶ｋ</div>
            <span className="rule-tag">蜷梧凾縺ｫ隗｣縺・※繧ｹ繧ｳ繧｢豈碑ｼ・/span>
          </div>
        </div>
      </div>

      <div style={{marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:".78rem",color:"var(--form)",marginBottom:7,paddingLeft:4,letterSpacing:"1px",textTransform:"uppercase"}}>ｧｬ 蛹門ｭｦ蠑上け繧､繧ｺ</div>
        <div className="g2">
          <div className="sc form-sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onSolo("formula")}>
            <div className="ic">式</div><div className="nm">縺ｲ縺ｨ繧翫〒謖第姶</div>
            <span className="rule-tag">60遘偵〒縺溘￥縺輔ｓ隗｣縺托ｼ・/span>
          </div>
          <div className="sc form-sc" style={!nickname?{opacity:.5,cursor:"not-allowed"}:{}} onClick={()=>nickname&&onBattle("formula")}>
            <div className="ic">笞費ｸ・/div><div className="nm">蟇ｾ謌ｦ縺吶ｋ</div>
            <span className="rule-tag">蜷梧凾縺ｫ隗｣縺・※繧ｹ繧ｳ繧｢豈碑ｼ・/span>
          </div>
        </div>
      </div>

      <div style={{marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:".78rem",color:"#6366f1",marginBottom:7,paddingLeft:4,letterSpacing:"1px",textTransform:"uppercase"}}>ｧｮ mol險育ｮ励ラ繝ｪ繝ｫ</div>
        <div className="g2">
          <div className="sc" style={!nickname?{opacity:.5,cursor:"not-allowed",borderColor:"#6366f1"}:{borderColor:"#6366f1"}} onClick={()=>nickname&&onMol("solo")}>
            <div className="ic">式</div>
            <div className="nm">縺ｲ縺ｨ繧翫〒謖第姶</div>
            <span className="rule-tag">險育ｮ励＠縺ｦ豁｣縺励＞遲斐∴繧帝∈縺ｹ・・/span>
          </div>
          <div className="sc" style={!nickname?{opacity:.5,cursor:"not-allowed",borderColor:"#6366f1"}:{borderColor:"#6366f1"}} onClick={()=>nickname&&onMol("battle")}>
            <div className="ic">笞費ｸ・/div>
            <div className="nm">蟇ｾ謌ｦ縺吶ｋ</div>
            <span className="rule-tag">蜷梧凾縺ｫ隗｣縺・※豁｣隗｣謨ｰ豈碑ｼ・/span>
          </div>
        </div>
      </div>

      {!nickname&&(
        <div className="tc" style={{marginBottom:10}}>
          <span className="hero-nologin">笨・繝九ャ繧ｯ繝阪・繝繧堤匳骭ｲ縺励※繧ｹ繧ｿ繝ｼ繝茨ｼ・/span>
        </div>
      )}

      <div style={{display:"flex",gap:8,marginBottom:8}}>
        <button className="btn btn-s" style={{flex:1}} onClick={()=>setShowHowTo(true)}>搭 驕翫・譁ｹ</button>
        <button className="btn btn-s" style={{flex:1}} onClick={onMemo}>当 證苓ｨ倥Μ繧ｹ繝・/button>
        <button className="btn btn-s" style={{flex:1}} onClick={onRanking}>醇 繝ｩ繝ｳ繧ｭ繝ｳ繧ｰ</button>
        <button className="btn btn-s" style={{flex:"0 0 auto",padding:"10px 12px"}} onClick={onToggleBgm}>{bgmOn?"矧":"這"}</button>
      </div>
      <div className="footer-copy">
        ﾂｩ 2026 Narukawa All Rights Reserved.<br/>
        譛ｬ繧｢繝励Μ縺ｮ辟｡譁ｭ霆｢霈峨・蜀埼・蟶・ｒ遖∵ｭ｢縺励∪縺吶・      </div>
    </div>
  );
}

// 笏笏 SetupScreen 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
const DIRECTION_OPTIONS = {
  element: [
    { value:"s2n", desc:"險伜捷 竊・蜷榊燕", detail:"蜈・ｴ險伜捷繧定ｦ九※蜷榊燕繧堤ｭ斐∴繧・ },
    { value:"n2s", desc:"蜷榊燕 竊・險伜捷", detail:"蜈・ｴ蜷阪ｒ隕九※險伜捷繧堤ｭ斐∴繧・ },
    { value:"random", desc:"繝ｩ繝ｳ繝繝", detail:"縺ｩ縺｡繧峨ｂ繝ｩ繝ｳ繝繝縺ｫ蜃ｺ鬘・ },
  ],
  ion: [
    { value:"f2n", desc:"蠑・竊・蜷榊燕", detail:"繧､繧ｪ繝ｳ蠑上ｒ隕九※蜷榊燕繧堤ｭ斐∴繧・ },
    { value:"n2f", desc:"蜷榊燕 竊・蠑・, detail:"繧､繧ｪ繝ｳ蜷阪ｒ隕九※繧､繧ｪ繝ｳ蠑上ｒ遲斐∴繧・ },
    { value:"random", desc:"繝ｩ繝ｳ繝繝", detail:"縺ｩ縺｡繧峨ｂ繝ｩ繝ｳ繝繝縺ｫ蜃ｺ鬘・ },
  ],
  formula: [
    { value:"f2n", desc:"蛹門ｭｦ蠑・竊・蜷榊燕", detail:"蛹門ｭｦ蠑上ｒ隕九※迚ｩ雉ｪ蜷阪ｒ遲斐∴繧・ },
    { value:"n2f", desc:"蜷榊燕 竊・蛹門ｭｦ蠑・, detail:"迚ｩ雉ｪ蜷阪ｒ隕九※蛹門ｭｦ蠑上ｒ遲斐∴繧・ },
    { value:"random", desc:"繝ｩ繝ｳ繝繝", detail:"縺ｩ縺｡繧峨ｂ繝ｩ繝ｳ繝繝縺ｫ蜃ｺ鬘・ },
  ],
};

const LEVEL_LABELS = {
  ion:     { junior:"荳ｭ蟄ｦ繝ｬ繝吶Ν・・7遞ｮ・・, senior:"鬮俶｡繝ｬ繝吶Ν・・9遞ｮ・・ },
  formula: { junior:"荳ｭ蟄ｦ繝ｬ繝吶Ν・・7遞ｮ・・, senior:"鬮俶｡繝ｬ繝吶Ν・・8遞ｮ・・ },
};

const DIFFICULTY_OPTIONS = [
  { value:"easy",   label:"・ 譏・,   desc:"譏弱ｉ縺九↓驕輔≧驕ｸ謚櫁い",     color:"#22c55e", light:"#dcfce7" },
  { value:"normal", label:"・ 譎ｮ騾・, desc:"荳驛ｨ莨ｼ縺ｦ縺・ｋ驕ｸ謚櫁い",     color:"#f59e0b", light:"#fef3c7" },
  { value:"hard",   label:"・ 髮｣",   desc:"髱槫ｸｸ縺ｫ莨ｼ縺溘ム繝溘・縺ｮ縺ｿ",   color:"#ef4444", light:"#fee2e2" },
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
        <button className="btn btn-s btn-sm" onClick={onBack}>竊・謌ｻ繧・/button>
        <span style={{fontWeight:700}}>{title}</span><span/>
      </div>

      {/* ion/formula: 繝ｬ繝吶Ν驕ｸ謚・*/}
      {(isIon||isFormula)&&(
        <div style={{marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>繝ｬ繝吶Ν繧帝∈謚・/div>
          <div className="g2" style={{margin:"0 0 4px"}}>
            {["junior","senior"].map(lv=>(
              <div key={lv}
                onClick={()=>setSubLevel(lv)}
                style={{
                  border:`2px solid ${subLevel===lv?accentColor:"var(--border)"}`,
                  borderRadius:10,padding:"12px 10px",cursor:"pointer",textAlign:"center",
                  background:subLevel===lv?lightColor:"#fff",transition:"all .13s"
                }}>
                <div style={{fontSize:"1.5rem",marginBottom:3}}>{lv==="junior"?"痘":"燈"}</div>
                <div style={{fontWeight:700,fontSize:".9rem",color:subLevel===lv?accentColor:"var(--text)"}}>
                  {lv==="junior"?"荳ｭ蟄ｦ繝ｬ繝吶Ν":"鬮俶｡繝ｬ繝吶Ν"}
                </div>
                <div style={{fontSize:".72rem",color:"var(--muted)",marginTop:2}}>
                  {LEVEL_LABELS[quizMode][lv]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* element: 遽・峇繧ｹ繝ｩ繧､繝繝ｼ */}
      {isElement&&(
        <div style={{marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>蜃ｺ鬘檎ｯ・峇・亥次蟄千分蜿ｷ・・/div>
          <RangeSelector maxNum={maxNum} onChange={setMaxNum}/>
        </div>
      )}

      {/* 蜃ｺ鬘梧婿蜷鷹∈謚・*/}
      <div style={{marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>蜃ｺ鬘梧婿蜷・/div>
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
                {active&&<span style={{color:accentColor,fontWeight:700,fontSize:"1rem"}}>笨・/span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 髮｣譏灘ｺｦ驕ｸ謚・*/}
      <div style={{marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>髮｣譏灘ｺｦ</div>
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
        {isBattle?"噫 縺薙・險ｭ螳壹〒繝ｫ繝ｼ繝菴懈・":"噫 繧ｹ繧ｿ繝ｼ繝茨ｼ・}
      </button>
    </div>
  );
}

// 笏笏 QuizScreen 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
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
          <div className={`tmr ${timeLeft<=10?"urg":""}`}>竢ｱ {timeLeft}</div>
          <div className="gap8" style={{alignItems:"center"}}>
            <span className="muted" style={{fontSize:".8rem"}}>#{answered+1}</span>
            {isIon&&<span style={{fontSize:".75rem",background:"var(--ion-l)",color:"var(--ion)",padding:"2px 7px",borderRadius:20,fontWeight:700}}>笞｡繧､繧ｪ繝ｳ</span>}
            {isFormula&&<span style={{fontSize:".75rem",background:"var(--form-l)",color:"var(--form)",padding:"2px 7px",borderRadius:20,fontWeight:700}}>ｧｬ蛹門ｭｦ蠑・/span>}
            {(()=>{const d=DIFFICULTY_OPTIONS.find(o=>o.value===difficulty);return d?<span style={{fontSize:".75rem",background:d.light,color:d.color,padding:"2px 7px",borderRadius:20,fontWeight:700}}>{d.label}</span>:null;})()}
            <button onClick={toggleBgm} style={{background:"none",border:"none",cursor:"pointer",fontSize:"1.05rem"}}>{bgmOn?"矧":"這"}</button>
          </div>
          <div className="scd">脹 {score}</div>
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

// 笏笏 ResultScreen 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
function ResultScreen({ result, nickname, maxNum, quizMode, subLevel="junior", onHome, onRetry, battleResult=null }) {
  const [showMiss,setShowMiss]=useState(false);
  const [showRankModal,setShowRankModal]=useState(true);
  const [rankSaved,setRankSaved]=useState(false);
  const acc=result.total>0?Math.round(result.correct/result.total*100):0;
  const grade=result.score>=800?"･・邏譎ｴ繧峨＠縺・ｼ・:result.score>=500?"･・繧医￥縺ｧ縺阪∪縺励◆・・:result.score>=200?"･・繧ゅ≧蟆代＠・・:"答 邱ｴ鄙偵＠繧医≧・・;
  const isIon=quizMode==="ion";
  const isFormula=quizMode==="formula";

  return (
    <div>
      {/* 繝ｩ繝ｳ繧ｭ繝ｳ繧ｰ逋ｻ骭ｲ繝｢繝ｼ繝繝ｫ・亥ｯｾ謌ｦ繝｢繝ｼ繝我ｻ･螟厄ｼ・*/}
      {showRankModal && !battleResult && (
        <RankingModal score={result.score} correct={result.correct||0} total={result.total||0} nickname={nickname} quizMode={quizMode} maxNum={maxNum} subLevel={result.subLevel||"junior"} difficulty={result.difficulty||"normal"}
          onDone={(saved)=>{setRankSaved(saved);setShowRankModal(false);}}/>
      )}

      <div className="card">
        <div className="tc" style={{padding:"14px 0"}}>
          <div style={{fontSize:"1.7rem",marginBottom:4}}>{grade}</div>
          <div className="rbig" style={isIon?{color:"var(--ion)"}:isFormula?{color:"var(--form)"}:{}}>{result.score}</div>
          <div className="muted" style={{marginTop:2}}>轤ｹ</div>
          {rankSaved&&<div style={{marginTop:8,fontSize:".85rem",color:"var(--success)",fontWeight:700}}>笨・繝ｩ繝ｳ繧ｭ繝ｳ繧ｰ縺ｫ逋ｻ骭ｲ縺励∪縺励◆・・/div>}
        </div>
        <div className="s3">
          <div className="sb"><div className="sv" style={{color:"var(--success)"}}>{result.correct}</div><div className="sk">豁｣隗｣</div></div>
          <div className="sb"><div className="sv">{result.total}</div><div className="sk">隗｣遲疲焚</div></div>
          <div className="sb"><div className="sv">{acc}%</div><div className="sk">豁｣遲皮紫</div></div>
        </div>
        <div style={{fontSize:".75rem",color:"var(--muted)",textAlign:"center"}}>
          {isIon?"笞｡繧､繧ｪ繝ｳ繧ｯ繧､繧ｺ":isFormula?"ｧｬ蛹門ｭｦ蠑上け繧､繧ｺ":`蜃ｺ鬘檎ｯ・峇: 1縲・{maxNum}逡ｪ`}
        </div>
      </div>

      {result.mistakes&&result.mistakes.length>0&&(
        <div className="card">
          <div className="fb2 mb8">
            <span style={{fontWeight:700}}>笶・髢馴＆縺医◆蝠城｡・({result.mistakes.length}蝠・</span>
            <button className="btn btn-s btn-sm" onClick={()=>setShowMiss(v=>!v)}>{showMiss?"髢峨§繧・:"隕九ｋ"}</button>
          </div>
          {showMiss&&result.mistakes.map((m,i)=>(
            <div key={i} className="mi">
              <span className="msym" style={isIon?{color:"var(--ion)",fontSize:".85rem",width:50}:{}}>{m.symbol}</span>
              <div>
                <div style={{fontWeight:700}}>{m.name}</div>
                <div className="mans">笨・{m.answer}</div>
                <div className="myrs">笨・縺ゅ↑縺・ {m.yours}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {result.mistakes&&result.mistakes.length===0&&(
        <div className="card tc"><span style={{fontSize:"1.5rem"}}>脂</span><p style={{fontWeight:700,marginTop:3}}>繝溘せ縺ｪ縺暦ｼ√ヱ繝ｼ繝輔ぉ繧ｯ繝茨ｼ・/p></div>
      )}

      {battleResult&&(
        <div className="card">
          <h3 style={{fontWeight:700,marginBottom:10}}>笞費ｸ・蟇ｾ謌ｦ邨先棡</h3>
          {battleResult.map((p,i)=>(
            <div key={i} className="btr" style={p.isMe?{background:"var(--pl)"}:{}}>
              <span style={{fontSize:"1.25rem"}}>{i===0?"･・:i===1?"･・:i===2?"･・:`${i+1}菴港}</span>
              <span style={{flex:1,fontWeight:700}}>{p.name}{p.isMe&&<span className="bdg by" style={{marginLeft:5}}>縺ゅ↑縺・/span>}</span>
              <span style={{fontFamily:"Space Mono",fontWeight:700,color:"var(--primary)"}}>{p.score}轤ｹ</span>
            </div>
          ))}
        </div>
      )}

      <div className="gap8">
        <button className="btn btn-p" style={{flex:1}} onClick={onRetry}>煤 繧ゅ≧荳蠎ｦ</button>
        <button className="btn btn-s" style={{flex:1}} onClick={onHome}>匠 繝帙・繝</button>
      </div>
    </div>
  );
}

// 笏笏 RankingScreen 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
function RankingScreen({ onBack, myNickname }) {
  const [tab,setTab]=useState("element_all");
  const [diffFilter,setDiffFilter]=useState("all"); // "all"|"easy"|"normal"|"hard"
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
    setLoading(false);
  };

  // 髮｣譏灘ｺｦ繝輔ぅ繝ｫ繧ｿ繝ｼ驕ｩ逕ｨ蠕後↓鬆・ｽ阪ｒ蜀崎ｨ育ｮ・  const ranks = diffFilter==="all"
    ? allRanks
    : allRanks.filter(r=>(r.difficulty||"normal")===diffFilter);

  const tabs=[
    ["element_all","笞幢ｸ丞・邏"],["ion","笞｡繧､繧ｪ繝ｳ"],["formula","ｧｬ蛹門ｭｦ蠑・],
    ["mol","ｧｮmol"],
  ];

  // 髮｣譏灘ｺｦ繝輔ぅ繝ｫ繧ｿ繝ｼ繝懊ち繝ｳ・亥・邏繝ｻ繧､繧ｪ繝ｳ繝ｻ蛹門ｭｦ蠑上・縺ｿ陦ｨ遉ｺ・・  const showDiffFilter = ["element_all","ion","formula"].includes(tab);

  const modeLabel = (r) => {
    if(r.quizMode==="ion") return {text:`${r.subLevel==="junior"?"荳ｭ":"鬮・}`, bg:"var(--ion-l)", color:"var(--ion)"};
    if(r.quizMode==="formula") return {text:`${r.subLevel==="junior"?"荳ｭ":"鬮・}`, bg:"var(--form-l)", color:"var(--form)"};
    if(r.quizMode==="mol") return {text:({intro:"蜈･髢",basic:"蝓ｺ遉・,adv:"蠢懃畑",random:"荵ｱ"})[r.subLevel]||r.subLevel, bg:"#ede9fe", color:"#6366f1"};
    if(r.maxNum) return {text:`縲・{r.maxNum}`, bg:"var(--pl)", color:"var(--primary)"};
    return null;
  };

  const medal = (i) => i===0?"･・:i===1?"･・:i===2?"･・:null;

  return (
    <div>
      <div className="card">
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={onBack}>竊・謌ｻ繧・/button>
          <span style={{fontWeight:700}}>醇 繝ｩ繝ｳ繧ｭ繝ｳ繧ｰ</span><span/>
        </div>
        {/* 繧ｯ繧､繧ｺ遞ｮ蛻･繧ｿ繝・*/}
        <div className="tabs" style={{marginBottom:showDiffFilter?8:13}}>
          {tabs.map(([v,l])=>(
            <button key={v} className={`tab ${tab===v?"on":""}`} onClick={()=>setTab(v)}>{l}</button>
          ))}
        </div>
        {/* 髮｣譏灘ｺｦ繝輔ぅ繝ｫ繧ｿ繝ｼ */}
        {showDiffFilter&&(
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:13}}>
            {[
              {v:"all",  l:"蜈ｨ縺ｦ",   bg:"var(--bg)", color:"var(--muted)",  activeBg:"var(--border)", activeColor:"var(--text)"},
              {v:"easy",  l:"・ 譏・,  bg:"#dcfce7",   color:"#166534"},
              {v:"normal",l:"・ 譎ｮ騾・, bg:"#fef3c7",   color:"#92400e"},
              {v:"hard",  l:"・ 髮｣",  bg:"#fee2e2",   color:"#991b1b"},
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
                  {d.v!=="all"&&(
                    <span style={{marginLeft:4,fontSize:".68rem",opacity:.8}}>
                      ({allRanks.filter(r=>(r.difficulty||"normal")===d.v).length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {loading?<p className="tc muted" style={{padding:16}}>隱ｭ縺ｿ霎ｼ縺ｿ荳ｭ...</p>
        :ranks.length===0?<p className="tc muted" style={{padding:16}}>縺ｾ縺險倬鹸縺後≠繧翫∪縺帙ｓ</p>
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
                      {isMe&&<span className="bdg by" style={{marginLeft:5}}>縺ゅ↑縺・/span>}
                    </span>
                    {ml&&<span style={{fontSize:".7rem",padding:"2px 6px",borderRadius:10,background:ml.bg,color:ml.color,fontWeight:700}}>{ml.text}</span>}
                    {diff&&diffFilter==="all"&&<span style={{fontSize:".7rem",padding:"2px 6px",borderRadius:10,background:diff.light,color:diff.color,fontWeight:700}}>{diff.label.split(" ")[0]}</span>}
                    <span className="rcard-score">{r.score}轤ｹ</span>
                  </div>
                  <div className="rcard-meta">
                    {r.correct!=null&&r.total!=null&&(
                      <span className="rcard-stat">豁｣隗｣ <b style={{color:"var(--success)"}}>{r.correct}/{r.total}</b></span>
                    )}
                    {r.acc!=null&&(
                      <span className="rcard-stat">豁｣遲皮紫 <b style={{color:"var(--primary)"}}>{r.acc}%</b></span>
                    )}
                    {r.date&&<span className="rcard-stat">{fmtDate(r.date)}</span>}
                  </div>
                </div>
              );
            })}
            <p className="muted tc" style={{marginTop:7,fontSize:".71rem",paddingBottom:8}}>窶ｻ繝ｩ繝ｳ繧ｭ繝ｳ繧ｰ縺ｯ蜈ｨ繝ｦ繝ｼ繧ｶ繝ｼ縺ｫ蜈ｬ髢九＆繧後∪縺・/p>
          </div>
        )
      }
    </div>
  );
}

// 笏笏 MemoScreen・域囓險倅ｸ隕ｧ逕ｻ髱｢・俄楳笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
function MemoScreen({ onBack }) {
  const [tab, setTab] = useState("element");
  const [elMax, setElMax] = useState(20);
  const [ionLv, setIonLv] = useState("junior");
  const [frmLv, setFrmLv] = useState("junior");

  const tabs = [
    { id:"element", label:"笞幢ｸ・蜈・ｴ", cls:"" },
    { id:"ion",     label:"笞｡ 繧､繧ｪ繝ｳ", cls:"ion-t" },
    { id:"formula", label:"ｧｬ 蛹門ｭｦ蠑・, cls:"form-t" },
  ];

  const elItems = getElements(elMax);
  const ionItems = getIons(ionLv);
  const frmItems = getFormulas(frmLv);

  return (
    <div>
      <div className="card" style={{marginBottom:10}}>
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={onBack}>竊・謌ｻ繧・/button>
          <span style={{fontWeight:700}}>当 證苓ｨ倥Μ繧ｹ繝・/span>
          <span/>
        </div>
        <div className="memo-tabs">
          {tabs.map(t=>(
            <button key={t.id} className={`memo-tab ${t.cls} ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        {/* 蜈・ｴ繧ｿ繝・*/}
        {tab==="element"&&(
          <>
            <div style={{marginBottom:10}}>
              <div style={{fontWeight:700,fontSize:".82rem",marginBottom:6}}>蜃ｺ鬘檎ｯ・峇: 1縲悳elMax}逡ｪ・・elItems.length}蜈・ｴ・・/div>
              <input type="range" min={4} max={103} value={elMax} onChange={e=>setElMax(Number(e.target.value))}/>
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
                  <div className="memo-num">蜴溷ｭ千分蜿ｷ {el.number}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 繧､繧ｪ繝ｳ繧ｿ繝・*/}
        {tab==="ion"&&(
          <>
            <div style={{display:"flex",gap:7,marginBottom:12}}>
              {[["junior","荳ｭ蟄ｦ繝ｬ繝吶Ν・・7遞ｮ・・],["senior","鬮俶｡繝ｬ繝吶Ν・・9遞ｮ・・]].map(([lv,lb])=>(
                <div key={lv} onClick={()=>setIonLv(lv)}
                  style={{flex:1,border:`2px solid ${ionLv===lv?"var(--ion)":"var(--border)"}`,borderRadius:9,padding:"9px 6px",cursor:"pointer",textAlign:"center",background:ionLv===lv?"var(--ion-l)":"#fff",transition:"all .12s"}}>
                  <div style={{fontWeight:700,fontSize:".82rem",color:ionLv===lv?"var(--ion)":"var(--muted)"}}>{lv==="junior"?"痘 荳ｭ蟄ｦ":"燈 鬮俶｡"}</div>
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

        {/* 蛹門ｭｦ蠑上ち繝・*/}
        {tab==="formula"&&(
          <>
            <div style={{display:"flex",gap:7,marginBottom:12}}>
              {[["junior","荳ｭ蟄ｦ繝ｬ繝吶Ν・・7遞ｮ・・],["senior","鬮俶｡繝ｬ繝吶Ν・・8遞ｮ・・]].map(([lv,lb])=>(
                <div key={lv} onClick={()=>setFrmLv(lv)}
                  style={{flex:1,border:`2px solid ${frmLv===lv?"var(--form)":"var(--border)"}`,borderRadius:9,padding:"9px 6px",cursor:"pointer",textAlign:"center",background:frmLv===lv?"var(--form-l)":"#fff",transition:"all .12s"}}>
                  <div style={{fontWeight:700,fontSize:".82rem",color:frmLv===lv?"var(--form)":"var(--muted)"}}>{lv==="junior"?"痘 荳ｭ蟄ｦ":"燈 鬮俶｡"}</div>
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
// mol險育ｮ励ラ繝ｪ繝ｫ
// ============================================================
const AVOGADRO = 6.0e23;
const MOL_CONST_TEXT = "H=1.0  C=12  O=16  N=14  Na=23  Cl=35.5  Cu=64  S=32縲縲繧｢繝懊ぎ繝峨Ο謨ｰ: 6.0ﾃ・0ﾂｲﾂｳ/mol";

// 遲斐∴繧定ｦ九ｄ縺吶＞譁・ｭ怜・縺ｫ
function fmtAns(v) {
  if (typeof v === "string") return v;
  if (v >= 1e23) return `${(v/1e23).toFixed(1).replace(/\.0$/,"")}ﾃ・0ﾂｲﾂｳ`;
  if (v >= 1e22) return `${(v/1e22).toFixed(1).replace(/\.0$/,"")}ﾃ・0ﾂｲﾂｲ`;
  if (Number.isInteger(v) || (v*10)%1===0) return String(v);
  return String(v);
}

// 蜈ｸ蝙九Α繧ｹ縺九ｉ繝繝溘・逕滓・
function genMolDummies(correct, qtype) {
  const c = correct;
  let dummies = [];
  if (qtype === "g_to_mol" || qtype === "mol_to_g") {
    dummies = [c*2, c/2, c*3, c/3, c+1, c-1, c*4].filter(x=>x>0&&x!==c);
  } else if (qtype === "mol_to_L" || qtype === "L_to_mol") {
    dummies = [c*2, c/2, c+22.4, c-22.4, c*3, c/3].filter(x=>x>0&&x!==c);
  } else if (qtype === "mol_to_N" || qtype === "N_to_mol") {
    // 繧｢繝懊ぎ繝峨Ο謨ｰ邨｡縺ｿ
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

// 繝偵Φ繝育函謌・
// mol蝠城｡後・險育ｮ怜ｼ上ｒ逕滓・・磯俣驕輔＞荳隕ｧ逕ｨ・・function getMolFormula(q) {
  if (!q) return "";
  const t = q.qtype;
  const mm = q.molarMass;
  const gv = q.given;
  const nm = q.numer;
  const r = (v) => Math.round(v*10000)/10000;

  if (t==="g_to_mol")
    return `${gv}g ﾃｷ ${mm}g/mol = ${q.ans}mol`;
  if (t==="mol_to_g")
    return `${gv}mol ﾃ・${mm}g/mol = ${q.ans}g`;
  if (t==="mol_to_L")
    return `${gv}mol ﾃ・22.4L/mol = ${q.ans}L`;
  if (t==="L_to_mol")
    return `${gv}L ﾃｷ 22.4L/mol = ${q.ans}mol`;
  if (t==="mol_to_N")
    return `${gv}mol ﾃ・6.0ﾃ・0ﾂｲﾂｳ蛟・mol = ${q.ans}蛟義;
  if (t==="N_to_mol")
    return `${nm}ﾃ・0ﾂｲﾂｳ蛟・ﾃｷ 6.0ﾃ・0ﾂｲﾂｳ蛟・mol = ${q.ans}mol`;
  if (t==="g_to_L") {
    const mol = r(gv/mm);
    return `竭 ${gv}g ﾃｷ ${mm}g/mol = ${mol}mol\n竭｡ ${mol}mol ﾃ・22.4L/mol = ${q.ans}L\n\n蠑丞・菴難ｼ・{gv}g ﾃｷ ${mm}g/mol ﾃ・22.4L/mol = ${q.ans}L`;
  }
  if (t==="L_to_g") {
    const mol = r(gv/22.4);
    return `竭 ${gv}L ﾃｷ 22.4L/mol = ${mol}mol\n竭｡ ${mol}mol ﾃ・${mm}g/mol = ${q.ans}g\n\n蠑丞・菴難ｼ・{gv}L ﾃｷ 22.4L/mol ﾃ・${mm}g/mol = ${q.ans}g`;
  }
  if (t==="g_to_N") {
    const mol = r(gv/mm);
    return `竭 ${gv}g ﾃｷ ${mm}g/mol = ${mol}mol\n竭｡ ${mol}mol ﾃ・6.0ﾃ・0ﾂｲﾂｳ蛟・mol = ${q.ans}蛟欺n\n蠑丞・菴難ｼ・{gv}g ﾃｷ ${mm}g/mol ﾃ・6.0ﾃ・0ﾂｲﾂｳ蛟・mol = ${q.ans}蛟義;
  }
  if (t==="N_to_g") {
    const mol = r(nm/6);
    return `竭 ${nm}ﾃ・0ﾂｲﾂｳ蛟・ﾃｷ 6.0ﾃ・0ﾂｲﾂｳ蛟・mol = ${mol}mol\n竭｡ ${mol}mol ﾃ・${mm}g/mol = ${q.ans}g\n\n蠑丞・菴難ｼ・{nm}ﾃ・0ﾂｲﾂｳ蛟・ﾃｷ 6.0ﾃ・0ﾂｲﾂｳ蛟・mol ﾃ・${mm}g/mol = ${q.ans}g`;
  }
  if (t==="L_to_N") {
    const mol = r(gv/22.4);
    return `竭 ${gv}L ﾃｷ 22.4L/mol = ${mol}mol\n竭｡ ${mol}mol ﾃ・6.0ﾃ・0ﾂｲﾂｳ蛟・mol = ${q.ans}蛟欺n\n蠑丞・菴難ｼ・{gv}L ﾃｷ 22.4L/mol ﾃ・6.0ﾃ・0ﾂｲﾂｳ蛟・mol = ${q.ans}蛟義;
  }
  if (t==="N_to_L") {
    const mol = r(nm/6);
    return `竭 ${nm}ﾃ・0ﾂｲﾂｳ蛟・ﾃｷ 6.0ﾃ・0ﾂｲﾂｳ蛟・mol = ${mol}mol\n竭｡ ${mol}mol ﾃ・22.4L/mol = ${q.ans}L\n\n蠑丞・菴難ｼ・{nm}ﾃ・0ﾂｲﾂｳ蛟・ﾃｷ 6.0ﾃ・0ﾂｲﾂｳ蛟・mol ﾃ・22.4L/mol = ${q.ans}L`;
  }
  return "";
}

function getMolHints(q) {
  const hints = [];
  if (q.qtype==="g_to_mol")  { hints.push("g 竊・mol 縺ｮ螟画鋤・嗄ol = g ﾃｷ 繝｢繝ｫ雉ｪ驥・); hints.push(`${q.substance}縺ｮ繝｢繝ｫ雉ｪ驥・= ${q.molarMass} g/mol`); hints.push(`mol = ${q.given} ﾃｷ ${q.molarMass}`); }
  else if (q.qtype==="mol_to_g") { hints.push("mol 竊・g 縺ｮ螟画鋤・喩 = mol ﾃ・繝｢繝ｫ雉ｪ驥・); hints.push(`${q.substance}縺ｮ繝｢繝ｫ雉ｪ驥・= ${q.molarMass} g/mol`); hints.push(`g = ${q.given} ﾃ・${q.molarMass}`); }
  else if (q.qtype==="mol_to_L") { hints.push("mol 竊・L 縺ｮ螟画鋤・域ｨ呎ｺ也憾諷具ｼ会ｼ哭 = mol ﾃ・22.4"); hints.push(`22.4 L/mol 繧剃ｽｿ縺・); hints.push(`L = ${q.given} ﾃ・22.4`); }
  else if (q.qtype==="L_to_mol") { hints.push("L 竊・mol 縺ｮ螟画鋤・域ｨ呎ｺ也憾諷具ｼ会ｼ嗄ol = L ﾃｷ 22.4"); hints.push(`22.4 L/mol 繧剃ｽｿ縺・); hints.push(`mol = ${q.given} ﾃｷ 22.4`); }
  else if (q.qtype==="mol_to_N") { hints.push("mol 竊・蛟区焚縺ｮ螟画鋤・壼・= mol ﾃ・6.0ﾃ・0ﾂｲﾂｳ"); hints.push(`繧｢繝懊ぎ繝峨Ο謨ｰ 6.0ﾃ・0ﾂｲﾂｳ 繧剃ｽｿ縺・); hints.push(`蛟・= ${q.given} ﾃ・6.0ﾃ・0ﾂｲﾂｳ`); }
  else if (q.qtype==="N_to_mol") { hints.push("蛟区焚 竊・mol 縺ｮ螟画鋤・嗄ol = 蛟区焚 ﾃｷ 6.0ﾃ・0ﾂｲﾂｳ"); hints.push(`繧｢繝懊ぎ繝峨Ο謨ｰ 6.0ﾃ・0ﾂｲﾂｳ 縺ｧ蜑ｲ繧義); hints.push(`mol = ${q.numer}ﾃ・0ﾂｲﾂｳ ﾃｷ 6.0ﾃ・0ﾂｲﾂｳ`); }
  else if (q.qtype==="g_to_L")   { hints.push("g 竊・mol 竊・L 縺ｮ2谿ｵ螟画鋤"); hints.push(`繝｢繝ｫ雉ｪ驥・${q.molarMass} g/mol 竊・mol縲∵ｬ｡縺ｫ ﾃ・22.4`); hints.push(`mol = ${q.given} ﾃｷ ${q.molarMass}縲´ = mol ﾃ・22.4`); }
  else if (q.qtype==="L_to_g")   { hints.push("L 竊・mol 竊・g 縺ｮ2谿ｵ螟画鋤"); hints.push(`22.4縺ｧ蜑ｲ縺｣縺ｦ mol縲∵ｬ｡縺ｫ ﾃ・繝｢繝ｫ雉ｪ驥・${q.molarMass}`); hints.push(`mol = ${q.given} ﾃｷ 22.4縲“ = mol ﾃ・${q.molarMass}`); }
  else if (q.qtype==="g_to_N")   { hints.push("g 竊・mol 竊・蛟区焚 縺ｮ2谿ｵ螟画鋤"); hints.push(`繝｢繝ｫ雉ｪ驥・${q.molarMass} g/mol 縺ｧ蜑ｲ縺｣縺ｦ mol縲∵ｬ｡縺ｫ ﾃ・6.0ﾃ・0ﾂｲﾂｳ`); hints.push(`mol = ${q.given} ﾃｷ ${q.molarMass}縲∝・= mol ﾃ・6.0ﾃ・0ﾂｲﾂｳ`); }
  else if (q.qtype==="N_to_g")   { hints.push("蛟区焚 竊・mol 竊・g 縺ｮ2谿ｵ螟画鋤"); hints.push(`6.0ﾃ・0ﾂｲﾂｳ 縺ｧ蜑ｲ縺｣縺ｦ mol縲∵ｬ｡縺ｫ ﾃ・繝｢繝ｫ雉ｪ驥・${q.molarMass}`); hints.push(`mol = ${q.numer}ﾃ・0ﾂｲﾂｳ ﾃｷ 6.0ﾃ・0ﾂｲﾂｳ縲“ = mol ﾃ・${q.molarMass}`); }
  else if (q.qtype==="L_to_N")   { hints.push("L 竊・mol 竊・蛟区焚 縺ｮ2谿ｵ螟画鋤"); hints.push(`22.4縺ｧ蜑ｲ縺｣縺ｦ mol縲∵ｬ｡縺ｫ ﾃ・6.0ﾃ・0ﾂｲﾂｳ`); hints.push(`mol = ${q.given} ﾃｷ 22.4縲∝・= mol ﾃ・6.0ﾃ・0ﾂｲﾂｳ`); }
  else if (q.qtype==="N_to_L")   { hints.push("蛟区焚 竊・mol 竊・L 縺ｮ2谿ｵ螟画鋤"); hints.push(`6.0ﾃ・0ﾂｲﾂｳ 縺ｧ蜑ｲ縺｣縺ｦ mol縲∵ｬ｡縺ｫ ﾃ・22.4`); hints.push(`mol = ${q.numer}ﾃ・0ﾂｲﾂｳ ﾃｷ 6.0ﾃ・0ﾂｲﾂｳ縲´ = mol ﾃ・22.4`); }
  return hints;
}

const MOL_QUESTIONS_RAW = [
  // 1-10: g竊知ol
  {id:1,  q:"CO竄・44g縺ｯ菴瀕ol縺具ｼ・,    ans:1,     qtype:"g_to_mol",  substance:"CO竄・, molarMass:44, given:44},
  {id:2,  q:"CO 28g縺ｯ菴瀕ol縺具ｼ・,     ans:1,     qtype:"g_to_mol",  substance:"CO",  molarMass:28, given:28},
  {id:3,  q:"NH竄・34g縺ｯ菴瀕ol縺具ｼ・,    ans:2,     qtype:"g_to_mol",  substance:"NH竄・, molarMass:17, given:34},
  {id:4,  q:"HCl 73g縺ｯ菴瀕ol縺具ｼ・,    ans:2,     qtype:"g_to_mol",  substance:"HCl", molarMass:36.5, given:73},
  {id:5,  q:"CH竄・8g縺ｯ菴瀕ol縺具ｼ・,     ans:0.5,   qtype:"g_to_mol",  substance:"CH竄・, molarMass:16, given:8},
  {id:6,  q:"H竄４O竄・49g縺ｯ菴瀕ol縺具ｼ・,  ans:0.5,   qtype:"g_to_mol",  substance:"H竄４O竄・, molarMass:98, given:49},
  {id:7,  q:"HNO竄・126g縺ｯ菴瀕ol縺具ｼ・,  ans:2,     qtype:"g_to_mol",  substance:"HNO竄・, molarMass:63, given:126},
  {id:8,  q:"Cu 64g縺ｯ菴瀕ol縺具ｼ・,     ans:1,     qtype:"g_to_mol",  substance:"Cu",  molarMass:64, given:64},
  {id:9,  q:"NaOH 40g縺ｯ菴瀕ol縺具ｼ・,   ans:1,     qtype:"g_to_mol",  substance:"NaOH",molarMass:40, given:40},
  {id:10, q:"H竄０ 54g縺ｯ菴瀕ol縺具ｼ・,    ans:3,     qtype:"g_to_mol",  substance:"H竄０", molarMass:18, given:54},
  // 11-20: mol竊暖
  {id:11, q:"CO竄・2mol縺ｯ菴蛭縺具ｼ・,     ans:88,    qtype:"mol_to_g",  substance:"CO竄・, molarMass:44, given:2},
  {id:12, q:"CO 1mol縺ｯ菴蛭縺具ｼ・,      ans:28,    qtype:"mol_to_g",  substance:"CO",  molarMass:28, given:1},
  {id:13, q:"NH竄・3mol縺ｯ菴蛭縺具ｼ・,     ans:51,    qtype:"mol_to_g",  substance:"NH竄・, molarMass:17, given:3},
  {id:14, q:"HCl 1mol縺ｯ菴蛭縺具ｼ・,     ans:36.5,  qtype:"mol_to_g",  substance:"HCl", molarMass:36.5, given:1},
  {id:15, q:"CH竄・0.5mol縺ｯ菴蛭縺具ｼ・,   ans:8,     qtype:"mol_to_g",  substance:"CH竄・, molarMass:16, given:0.5},
  {id:16, q:"H竄４O竄・0.5mol縺ｯ菴蛭縺具ｼ・, ans:49,    qtype:"mol_to_g",  substance:"H竄４O竄・, molarMass:98, given:0.5},
  {id:17, q:"HNO竄・3mol縺ｯ菴蛭縺具ｼ・,    ans:189,   qtype:"mol_to_g",  substance:"HNO竄・, molarMass:63, given:3},
  {id:18, q:"Cu 2mol縺ｯ菴蛭縺具ｼ・,      ans:128,   qtype:"mol_to_g",  substance:"Cu",  molarMass:64, given:2},
  {id:19, q:"NaOH 4mol縺ｯ菴蛭縺具ｼ・,    ans:160,   qtype:"mol_to_g",  substance:"NaOH",molarMass:40, given:4},
  {id:20, q:"H竄０ 5mol縺ｯ菴蛭縺具ｼ・,     ans:90,    qtype:"mol_to_g",  substance:"H竄０", molarMass:18, given:5},
  // 21-30: mol竊鱈
  {id:21, q:"CO竄・1mol縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,      ans:22.4,  qtype:"mol_to_L", substance:"CO竄・, given:1},
  {id:22, q:"CO 2mol縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,       ans:44.8,  qtype:"mol_to_L", substance:"CO",  given:2},
  {id:23, q:"NH竄・0.875mol縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,  ans:19.6,  qtype:"mol_to_L", substance:"NH竄・, given:0.875},
  {id:24, q:"HCl 0.25mol縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,   ans:5.6,   qtype:"mol_to_L", substance:"HCl", given:0.25},
  {id:25, q:"CH竄・0.75mol縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,   ans:16.8,  qtype:"mol_to_L", substance:"CH竄・, given:0.75},
  {id:26, q:"H竄４O竄・0.5mol縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,  ans:11.2,  qtype:"mol_to_L", substance:"H竄４O竄・, given:0.5},
  {id:27, q:"HNO竄・0.125mol縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・, ans:2.8,   qtype:"mol_to_L", substance:"HNO竄・, given:0.125},
  {id:28, q:"C竄・竄・0.375mol縺ｯ菴畢縺具ｼ・,               ans:8.4,   qtype:"mol_to_L", substance:"C竄・竄・, given:0.375},
  {id:29, q:"Ar 0.25mol縺ｯ菴畢縺具ｼ・,                   ans:5.6,   qtype:"mol_to_L", substance:"Ar",  given:0.25},
  {id:30, q:"H竄０ 0.625mol縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,  ans:14,    qtype:"mol_to_L", substance:"H竄０", given:0.625},
  // 31-40: L竊知ol
  {id:31, q:"CO竄・讓呎ｺ也憾諷九〒22.4L縺ｮ豌嶺ｽ薙・菴瀕ol縺具ｼ・,  ans:1,     qtype:"L_to_mol", substance:"CO竄・, given:22.4},
  {id:32, q:"CO 讓呎ｺ也憾諷九〒44.8L縺ｮ豌嶺ｽ薙・菴瀕ol縺具ｼ・,   ans:2,     qtype:"L_to_mol", substance:"CO",  given:44.8},
  {id:33, q:"NH竄・讓呎ｺ也憾諷九〒19.6L縺ｮ豌嶺ｽ薙・菴瀕ol縺具ｼ・,  ans:0.875, qtype:"L_to_mol", substance:"NH竄・, given:19.6},
  {id:34, q:"HCl 讓呎ｺ也憾諷九〒5.6L縺ｮ豌嶺ｽ薙・菴瀕ol縺具ｼ・,   ans:0.25,  qtype:"L_to_mol", substance:"HCl", given:5.6},
  {id:35, q:"CH竄・讓呎ｺ也憾諷九〒16.8L縺ｮ豌嶺ｽ薙・菴瀕ol縺具ｼ・,  ans:0.75,  qtype:"L_to_mol", substance:"CH竄・, given:16.8},
  {id:36, q:"H竄４O竄・讓呎ｺ也憾諷九〒11.2L縺ｮ豌嶺ｽ薙・菴瀕ol縺具ｼ・,ans:0.5,   qtype:"L_to_mol", substance:"H竄４O竄・, given:11.2},
  {id:37, q:"HNO竄・讓呎ｺ也憾諷九〒2.8L縺ｮ豌嶺ｽ薙・菴瀕ol縺具ｼ・,  ans:0.125, qtype:"L_to_mol", substance:"HNO竄・, given:2.8},
  {id:38, q:"C竄・竄・讓呎ｺ也憾諷九〒8.4L縺ｮ豌嶺ｽ薙・菴瀕ol縺具ｼ・,  ans:0.375, qtype:"L_to_mol", substance:"C竄・竄・, given:8.4},
  {id:39, q:"Ar 讓呎ｺ也憾諷九〒5.6L縺ｮ豌嶺ｽ薙・菴瀕ol縺具ｼ・,     ans:0.25,  qtype:"L_to_mol", substance:"Ar",  given:5.6},
  {id:40, q:"H竄０ 14L縺ｯ菴瀕ol縺具ｼ・,                   ans:0.625, qtype:"L_to_mol", substance:"H竄０", given:14},
  // 41-50: mol竊貞区焚
  {id:41, q:"CO竄・1mol縺ｮ蛻・ｭ先焚縺ｯ菴募九°・・,             ans:"6.0ﾃ・0ﾂｲﾂｳ", qtype:"mol_to_N", substance:"CO竄・, given:1, numer:6.0},
  {id:42, q:"CO 2mol縺ｮ蛻・ｭ先焚縺ｯ菴募九°・・,              ans:"1.2ﾃ・0ﾂｲ竅ｴ", qtype:"mol_to_N", substance:"CO",  given:2, numer:12.0},
  {id:43, q:"NH竄・⊆ 3mol縺ｮ繧､繧ｪ繝ｳ謨ｰ縺ｯ菴募九°・・,          ans:"1.8ﾃ・0ﾂｲ竅ｴ", qtype:"mol_to_N", substance:"NH竄・⊆", given:3, numer:18.0},
  {id:44, q:"NaOH 0.25mol縺ｮNa竅ｺ縺ｮ繧､繧ｪ繝ｳ謨ｰ縺ｯ菴募九°・・,  ans:"1.5ﾃ・0ﾂｲﾂｳ", qtype:"mol_to_N", substance:"NaOH", given:0.25, numer:1.5},
  {id:45, q:"CH竄・0.5mol縺ｮ蛻・ｭ先焚縺ｯ菴募九°・・,           ans:"3.0ﾃ・0ﾂｲﾂｳ", qtype:"mol_to_N", substance:"CH竄・, given:0.5, numer:3.0},
  {id:46, q:"H竄４O竄・0.5mol縺ｮH竅ｺ縺ｮ繧､繧ｪ繝ｳ謨ｰ縺ｯ菴募九°・・,  ans:"6.0ﾃ・0ﾂｲﾂｳ", qtype:"mol_to_N", substance:"H竄４O竄・, given:0.5, numer:6.0},
  {id:47, q:"HNO竄・3mol縺ｮ繧､繧ｪ繝ｳ縺ｮ邱乗焚縺ｯ菴募九°・・,      ans:"3.6ﾃ・0ﾂｲ竅ｴ", qtype:"mol_to_N", substance:"HNO竄・, given:3, numer:36.0},
  {id:48, q:"Cu(OH)竄・2mol縺ｮOH竅ｻ縺ｮ繧､繧ｪ繝ｳ謨ｰ縺ｯ菴募九°・・, ans:"2.4ﾃ・0ﾂｲ竅ｴ", qtype:"mol_to_N", substance:"Cu(OH)竄・, given:2, numer:24.0},
  {id:49, q:"NaOH 0.25mol縺ｮ繧､繧ｪ繝ｳ縺ｮ邱乗焚縺ｯ菴募九°・・,   ans:"3.0ﾃ・0ﾂｲﾂｳ", qtype:"mol_to_N", substance:"NaOH", given:0.25, numer:3.0},
  {id:50, q:"H竄０ 3mol縺ｮ蛻・ｭ先焚縺ｯ菴募九°・・,             ans:"1.8ﾃ・0ﾂｲ竅ｴ", qtype:"mol_to_N", substance:"H竄０", given:3, numer:18.0},
  // 51-60: 蛟区焚竊知ol
  {id:51, q:"CO竄ゅ・蛻・ｭ先焚縺・.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴瀕ol縺具ｼ・, ans:1,    qtype:"N_to_mol", substance:"CO竄・, numer:6.0},
  {id:52, q:"CO縺ｮ蛻・ｭ先焚縺・2.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴瀕ol縺具ｼ・, ans:2,    qtype:"N_to_mol", substance:"CO",  numer:12.0},
  {id:53, q:"NH竄・・蛻・ｭ先焚縺・8.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴瀕ol縺具ｼ・,ans:3,    qtype:"N_to_mol", substance:"NH竄・, numer:18.0},
  {id:54, q:"HCl縺ｮ蛻・ｭ先焚縺・.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴瀕ol縺具ｼ・, ans:0.5,  qtype:"N_to_mol", substance:"HCl", numer:3.0},
  {id:55, q:"CH竄・蛻・ｭ先焚縺・2.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴瀕ol縺具ｼ・,ans:2,    qtype:"N_to_mol", substance:"CH竄・, numer:12.0},
  {id:56, q:"H竄４O竄・・蛻・ｭ先焚縺・4.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴瀕ol縺具ｼ・,ans:4, qtype:"N_to_mol", substance:"H竄４O竄・, numer:24.0},
  {id:57, q:"HNO竄・・蛻・ｭ先焚縺・.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴瀕ol縺具ｼ・,ans:0.5, qtype:"N_to_mol", substance:"HNO竄・, numer:3.0},
  {id:58, q:"Cu縺ｮ蛻・ｭ先焚縺・8.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴瀕ol縺具ｼ・, ans:3,    qtype:"N_to_mol", substance:"Cu",  numer:18.0},
  {id:59, q:"NaOH縺ｮ蛻・ｭ先焚縺・2.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴瀕ol縺具ｼ・,ans:2,  qtype:"N_to_mol", substance:"NaOH", numer:12.0},
  {id:60, q:"H竄０ 蛻・ｭ先焚縺・4.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴瀕ol縺具ｼ・,ans:4,    qtype:"N_to_mol", substance:"H竄０", numer:24.0},
  // 61-70: g竊鱈・・谿ｵ螟画鋤・・  {id:61, q:"CO竄・44g縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,    ans:22.4,  qtype:"g_to_L", substance:"CO竄・, molarMass:44, given:44},
  {id:62, q:"CO 28g縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,     ans:22.4,  qtype:"g_to_L", substance:"CO",  molarMass:28, given:28},
  {id:63, q:"NH竄・34g縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,    ans:44.8,  qtype:"g_to_L", substance:"NH竄・, molarMass:17, given:34},
  {id:64, q:"HCl 73g縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,    ans:44.8,  qtype:"g_to_L", substance:"HCl", molarMass:36.5, given:73},
  {id:65, q:"CH竄・8g縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,     ans:11.2,  qtype:"g_to_L", substance:"CH竄・, molarMass:16, given:8},
  {id:66, q:"H竄４O竄・49g縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,  ans:11.2,  qtype:"g_to_L", substance:"H竄４O竄・, molarMass:98, given:49},
  {id:67, q:"HNO竄・126g縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,  ans:44.8,  qtype:"g_to_L", substance:"HNO竄・, molarMass:63, given:126},
  {id:68, q:"C竄・竄・60g縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,   ans:44.8,  qtype:"g_to_L", substance:"C竄・竄・, molarMass:30, given:60},
  {id:69, q:"SO竄・64g縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,    ans:22.4,  qtype:"g_to_L", substance:"SO竄・, molarMass:64, given:64},
  {id:70, q:"H竄０ 54g縺ｯ讓呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,    ans:67.2,  qtype:"g_to_L", substance:"H竄０", molarMass:18, given:54},
  // 71-80: g竊貞区焚
  {id:71, q:"CO竄・44g縺ｮ蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,   ans:"6.0ﾃ・0ﾂｲﾂｳ", qtype:"g_to_N", substance:"CO竄・, molarMass:44, given:44, numer:6.0},
  {id:72, q:"CO 28g縺ｮ蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,    ans:"6.0ﾃ・0ﾂｲﾂｳ", qtype:"g_to_N", substance:"CO",  molarMass:28, given:28, numer:6.0},
  {id:73, q:"NH竄・34g縺ｮ蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,   ans:"1.2ﾃ・0ﾂｲ竅ｴ", qtype:"g_to_N", substance:"NH竄・, molarMass:17, given:34, numer:12.0},
  {id:74, q:"HCl 73g縺ｮ蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,   ans:"1.2ﾃ・0ﾂｲ竅ｴ", qtype:"g_to_N", substance:"HCl", molarMass:36.5, given:73, numer:12.0},
  {id:75, q:"CH竄・8g縺ｮ蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,    ans:"3.0ﾃ・0ﾂｲﾂｳ", qtype:"g_to_N", substance:"CH竄・, molarMass:16, given:8, numer:3.0},
  {id:76, q:"H竄４O竄・49g縺ｮ蛻・ｭ先焚縺ｯ縺・￥繧峨°・・, ans:"3.0ﾃ・0ﾂｲﾂｳ", qtype:"g_to_N", substance:"H竄４O竄・, molarMass:98, given:49, numer:3.0},
  {id:77, q:"HNO竄・126g縺ｮ蛻・ｭ先焚縺ｯ縺・￥繧峨°・・, ans:"1.2ﾃ・0ﾂｲ竅ｴ", qtype:"g_to_N", substance:"HNO竄・, molarMass:63, given:126, numer:12.0},
  {id:78, q:"Cu 64g縺ｮ蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,    ans:"6.0ﾃ・0ﾂｲﾂｳ", qtype:"g_to_N", substance:"Cu",  molarMass:64, given:64, numer:6.0},
  {id:79, q:"NaOH 40g縺ｮ蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,  ans:"6.0ﾃ・0ﾂｲﾂｳ", qtype:"g_to_N", substance:"NaOH",molarMass:40, given:40, numer:6.0},
  {id:80, q:"H竄０ 54g縺ｮ蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,   ans:"1.8ﾃ・0ﾂｲ竅ｴ", qtype:"g_to_N", substance:"H竄０", molarMass:18, given:54, numer:18.0},
  // 81-90: 蛟区焚竊鱈
  {id:81, q:"CO竄ゅ・蛻・ｭ先焚縺・.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾縲∵ｨ呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,   ans:22.4, qtype:"N_to_L", substance:"CO竄・, numer:6.0},
  {id:82, q:"CO縺ｮ蛻・ｭ先焚縺・2.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾縲∵ｨ呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,   ans:44.8, qtype:"N_to_L", substance:"CO",  numer:12.0},
  {id:83, q:"NH竄・・蛻・ｭ先焚縺・8.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾縲∵ｨ呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,  ans:67.2, qtype:"N_to_L", substance:"NH竄・, numer:18.0},
  {id:84, q:"HCl縺ｮ蛻・ｭ先焚縺・.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾縲∵ｨ呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,   ans:11.2, qtype:"N_to_L", substance:"HCl", numer:3.0},
  {id:85, q:"CH竄・蛻・ｭ先焚縺・2.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾縲∵ｨ呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,   ans:44.8, qtype:"N_to_L", substance:"CH竄・, numer:12.0},
  {id:86, q:"H竄４O竄・・蛻・ｭ先焚縺・4.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾縲∵ｨ呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,ans:89.6, qtype:"N_to_L", substance:"H竄４O竄・, numer:24.0},
  {id:87, q:"HNO竄・・蛻・ｭ先焚縺・.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾縲∵ｨ呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,  ans:11.2, qtype:"N_to_L", substance:"HNO竄・, numer:3.0},
  {id:88, q:"SO竄ゅ・蛻・ｭ先焚縺・8.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾縲∵ｨ呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,  ans:67.2, qtype:"N_to_L", substance:"SO竄・, numer:18.0},
  {id:89, q:"He縺ｮ蛻・ｭ先焚縺・2.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾縲∵ｨ呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,   ans:44.8, qtype:"N_to_L", substance:"He",  numer:12.0},
  {id:90, q:"H竄０ 蛻・ｭ先焚縺・4.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾縲∵ｨ呎ｺ也憾諷九・豌嶺ｽ薙〒菴畢縺具ｼ・,   ans:89.6, qtype:"N_to_L", substance:"H竄０", numer:24.0},
  // 91-100: L竊暖
  {id:91,  q:"CO竄・22.4L縺ｮ讓呎ｺ也憾諷九・豌嶺ｽ薙・菴蛭縺具ｼ・,   ans:44,   qtype:"L_to_g", substance:"CO竄・, molarMass:44, given:22.4},
  {id:92,  q:"CO 67.2L縺ｮ讓呎ｺ也憾諷九・豌嶺ｽ薙・菴蛭縺具ｼ・,    ans:84,   qtype:"L_to_g", substance:"CO",  molarMass:28, given:67.2},
  {id:93,  q:"NH竄・44.8L縺ｮ讓呎ｺ也憾諷九・豌嶺ｽ薙・菴蛭縺具ｼ・,   ans:34,   qtype:"L_to_g", substance:"NH竄・, molarMass:17, given:44.8},
  {id:94,  q:"HCl 22.4L縺ｮ讓呎ｺ也憾諷九・豌嶺ｽ薙・菴蛭縺具ｼ・,   ans:36.5, qtype:"L_to_g", substance:"HCl", molarMass:36.5, given:22.4},
  {id:95,  q:"CH竄・5.6L縺ｮ讓呎ｺ也憾諷九・豌嶺ｽ薙・菴蛭縺具ｼ・,    ans:4,    qtype:"L_to_g", substance:"CH竄・, molarMass:16, given:5.6},
  {id:96,  q:"H竄４O竄・44.8L縺ｮ讓呎ｺ也憾諷九・豌嶺ｽ薙・菴蛭縺具ｼ・, ans:196,  qtype:"L_to_g", substance:"H竄４O竄・, molarMass:98, given:44.8},
  {id:97,  q:"HNO竄・67.2L縺ｮ讓呎ｺ也憾諷九・豌嶺ｽ薙・菴蛭縺具ｼ・,  ans:189,  qtype:"L_to_g", substance:"HNO竄・, molarMass:63, given:67.2},
  {id:98,  q:"C竄・竄・5.6L縺ｮ讓呎ｺ也憾諷九・豌嶺ｽ薙・菴蛭縺具ｼ・,   ans:7.5,  qtype:"L_to_g", substance:"C竄・竄・, molarMass:30, given:5.6},
  {id:99,  q:"SO竄・11.2L縺ｮ讓呎ｺ也憾諷九・豌嶺ｽ薙・菴蛭縺具ｼ・,   ans:32,   qtype:"L_to_g", substance:"SO竄・, molarMass:64, given:11.2},
  {id:100, q:"H竄０ 44.8L縺ｮ讓呎ｺ也憾諷九・豌嶺ｽ薙・菴蛭縺具ｼ・,   ans:36,   qtype:"L_to_g", substance:"H竄０", molarMass:18, given:44.8},
  // 101-110: 蛟区焚竊暖
  {id:101, q:"CO竄ゅ・蛻・ｭ先焚縺・.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴蛭縺具ｼ・,    ans:44,  qtype:"N_to_g", substance:"CO竄・, molarMass:44, numer:6.0},
  {id:102, q:"CO縺ｮ蛻・ｭ先焚縺・2.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴蛭縺具ｼ・,    ans:56,  qtype:"N_to_g", substance:"CO",  molarMass:28, numer:12.0},
  {id:103, q:"NH竄・・蛻・ｭ先焚縺・8.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴蛭縺具ｼ・,   ans:51,  qtype:"N_to_g", substance:"NH竄・, molarMass:17, numer:18.0},
  {id:104, q:"HCl縺ｮ蛻・ｭ先焚縺・2.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴蛭縺具ｼ・,   ans:73,  qtype:"N_to_g", substance:"HCl", molarMass:36.5, numer:12.0},
  {id:105, q:"CH竄・蛻・ｭ先焚縺・2.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴蛭縺具ｼ・,    ans:32,  qtype:"N_to_g", substance:"CH竄・, molarMass:16, numer:12.0},
  {id:106, q:"H竄４O竄・・蛻・ｭ先焚縺・4.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴蛭縺具ｼ・, ans:392, qtype:"N_to_g", substance:"H竄４O竄・, molarMass:98, numer:24.0},
  {id:107, q:"HNO竄・・蛻・ｭ先焚縺・.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴蛭縺具ｼ・,   ans:31.5,qtype:"N_to_g", substance:"HNO竄・, molarMass:63, numer:3.0},
  {id:108, q:"Cu縺ｮ蛻・ｭ先焚縺・8.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴蛭縺具ｼ・,    ans:192, qtype:"N_to_g", substance:"Cu",  molarMass:64, numer:18.0},
  {id:109, q:"NaOH縺ｮ蛻・ｭ先焚縺・2.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴蛭縺具ｼ・,  ans:80,  qtype:"N_to_g", substance:"NaOH",molarMass:40, numer:12.0},
  {id:110, q:"H竄０ 蛻・ｭ先焚縺・4.0ﾃ・0ﾂｲﾂｳ蛟九≠繧区凾菴蛭縺具ｼ・,    ans:72,  qtype:"N_to_g", substance:"H竄０", molarMass:18, numer:24.0},
  // 111-120: L竊貞区焚
  {id:111, q:"CO竄ゅ・讓呎ｺ也憾諷九〒22.4L縺ｮ豌嶺ｽ薙・蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,    ans:"6.0ﾃ・0ﾂｲﾂｳ", qtype:"L_to_N", substance:"CO竄・, given:22.4, numer:6.0},
  {id:112, q:"CO縺ｮ讓呎ｺ也憾諷九〒67.2L縺ｮ豌嶺ｽ薙・蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,     ans:"1.8ﾃ・0ﾂｲ竅ｴ", qtype:"L_to_N", substance:"CO",  given:67.2, numer:18.0},
  {id:113, q:"NH竄・・讓呎ｺ也憾諷九〒44.8L縺ｮ豌嶺ｽ薙・蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,    ans:"1.2ﾃ・0ﾂｲ竅ｴ", qtype:"L_to_N", substance:"NH竄・, given:44.8, numer:12.0},
  {id:114, q:"HCl縺ｮ讓呎ｺ也憾諷九〒11.2L縺ｮ豌嶺ｽ薙・蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,    ans:"3.0ﾃ・0ﾂｲﾂｳ", qtype:"L_to_N", substance:"HCl", given:11.2, numer:3.0},
  {id:115, q:"CH竄・・讓呎ｺ也憾諷九〒5.6L縺ｮ豌嶺ｽ薙・蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,     ans:"1.5ﾃ・0ﾂｲﾂｳ", qtype:"L_to_N", substance:"CH竄・, given:5.6, numer:1.5},
  {id:116, q:"H竄４O竄・・讓呎ｺ也憾諷九〒44.8L縺ｮ豌嶺ｽ薙・蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,  ans:"1.2ﾃ・0ﾂｲ竅ｴ", qtype:"L_to_N", substance:"H竄４O竄・, given:44.8, numer:12.0},
  {id:117, q:"HNO竄・・讓呎ｺ也憾諷九〒67.2L縺ｮ豌嶺ｽ薙・蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,   ans:"1.8ﾃ・0ﾂｲ竅ｴ", qtype:"L_to_N", substance:"HNO竄・, given:67.2, numer:18.0},
  {id:118, q:"SO竄ゅ・讓呎ｺ也憾諷九〒5.6L縺ｮ豌嶺ｽ薙・蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,     ans:"1.5ﾃ・0ﾂｲﾂｳ", qtype:"L_to_N", substance:"SO竄・, given:5.6, numer:1.5},
  {id:119, q:"Ar縺ｮ讓呎ｺ也憾諷九〒11.2L縺ｮ豌嶺ｽ薙・蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,     ans:"3.0ﾃ・0ﾂｲﾂｳ", qtype:"L_to_N", substance:"Ar",  given:11.2, numer:3.0},
  {id:120, q:"H竄０縺ｮ讓呎ｺ也憾諷九〒44.8L縺ｮ豌嶺ｽ薙・蛻・ｭ先焚縺ｯ縺・￥繧峨°・・,    ans:"1.2ﾃ・0ﾂｲ竅ｴ", qtype:"L_to_N", substance:"H竄０", given:44.8, numer:12.0},
];

function getMolQuestions(mode) {
  let pool;
  if (mode==="intro")  pool = MOL_QUESTIONS_RAW.filter(q=>q.id<=20);
  else if (mode==="basic") pool = MOL_QUESTIONS_RAW.filter(q=>q.id>=21&&q.id<=60);
  else if (mode==="adv")   pool = MOL_QUESTIONS_RAW.filter(q=>q.id>=61);
  else pool = MOL_QUESTIONS_RAW;
  return shuffle(pool).slice(0,10);
}


// 謖・焚陦ｨ險倥ｒ隕九ｄ縺吶￥陦ｨ遉ｺ縺吶ｋ繧ｳ繝ｳ繝昴・繝阪Φ繝・function MolChoice({ val }) {
  if (typeof val !== "string" || !val.includes("ﾃ・0")) return <span>{val}</span>;
  // "1.8ﾃ・0ﾂｲ竅ｴ" 竊・"1.8ﾃ・0" + sup("24")
  const match = val.match(/^(.+)ﾃ・0(.+)$/);
  if (!match) return <span>{val}</span>;
  const [, coef, exp] = match;
  // ﾂｲﾂｳ竊・3, ﾂｲ竅ｴ竊・4 縺ｪ縺ｩ縺ｫ螟画鋤
  const expNum = exp.replace(/ﾂｲ/g,"2").replace(/ﾂｳ/g,"3").replace(/竅ｴ/g,"4").replace(/竅ｵ/g,"5");
  return <span>{coef}ﾃ・0<sup style={{fontSize:".7em"}}>{expNum}</sup></span>;
}

// 笏笏 MolSetupScreen 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
function MolSetupScreen({ onStart, onBack }) {
  const [mode, setMode] = useState("intro");
  const modes = [
    { value:"intro", label:"験 蜈･髢",   desc:"蝠城｡・縲・0・・竊芭ol・・,      color:"#22c55e", light:"#dcfce7" },
    { value:"basic", label:"祷 蝓ｺ遉・,   desc:"蝠城｡・1縲・0・・竊芭ol繝ｻ蛟区焚・・, color:"#3b82f6", light:"#dbeafe" },
    { value:"adv",   label:"櫨 蠢懃畑",   desc:"蝠城｡・1縲・20・・谿ｵ螟画鋤・・,    color:"#ef4444", light:"#fee2e2" },
    { value:"random",label:"軸 繝ｩ繝ｳ繝繝",desc:"蜈ｨ120蝠上°繧峨Λ繝ｳ繝繝10蝠・,   color:"#8b5cf6", light:"#ede9fe" },
  ];
  return (
    <div className="card">
      <div className="fb2 mb13">
        <button className="btn btn-s btn-sm" onClick={onBack}>竊・謌ｻ繧・/button>
        <span style={{fontWeight:700}}>ｧｮ mol險育ｮ励ラ繝ｪ繝ｫ</span><span/>
      </div>
      <div style={{background:"#f8fafc",borderRadius:9,padding:"10px 12px",marginBottom:14,fontSize:".75rem",color:"#475569",lineHeight:1.7}}>
        <div style={{fontWeight:700,marginBottom:3}}>東 蜴溷ｭ宣㍼繝ｻ螳壽焚</div>
        <div style={{fontFamily:"monospace",fontSize:".72rem"}}>{MOL_CONST_TEXT}</div>
      </div>
      <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>繝｢繝ｼ繝峨ｒ驕ｸ謚・/div>
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
              {active&&<span style={{marginLeft:"auto",color:m.color,fontWeight:700}}>笨・/span>}
            </div>
          );
        })}
      </div>
      <button className="btn btn-blk" style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:700}} onClick={()=>onStart(mode,"solo")}>
        噫 繧ｹ繧ｿ繝ｼ繝茨ｼ・      </button>
    </div>
  );
}


// ============================================================
// 繧ｿ繧､繝繧｢繧ｿ繝・け繝｢繝ｼ繝会ｼ亥・邏/繧､繧ｪ繝ｳ/蛹門ｭｦ蠑上ｒ10蝠上・譛騾溘〒・・// ============================================================
function TimeAttackSetupScreen({ onStart, onBack }) {
  const [quizMode, setQMode] = useState("element");
  const [maxNum, setMaxNum] = useState(20);
  const [subLevel, setSubLevel] = useState("junior");

  const modes = [
    { value:"element", label:"笞幢ｸ・蜈・ｴ險伜捷", color:"var(--primary)", light:"var(--pl)" },
    { value:"ion",     label:"笞｡ 繧､繧ｪ繝ｳ",   color:"var(--ion)",     light:"var(--ion-l)" },
    { value:"formula", label:"ｧｬ 蛹門ｭｦ蠑・,   color:"var(--form)",    light:"var(--form-l)" },
  ];

  return (
    <div className="card">
      <div className="fb2 mb13">
        <button className="btn btn-s btn-sm" onClick={onBack}>竊・謌ｻ繧・/button>
        <span style={{fontWeight:700}}>竢ｱ 繧ｿ繧､繝繧｢繧ｿ繝・け</span><span/>
      </div>
      <div style={{textAlign:"center",marginBottom:14}}>
        <span className="ta-badge">10蝠上ｒ譛騾溘け繝ｪ繧｢・・/span>
        <p className="muted" style={{marginTop:6,fontSize:".82rem"}}>蜈ｨ蝠乗ｭ｣隗｣縺吶ｋ縺ｾ縺ｧ邨ゅｏ繧峨↑縺・る溘＆繧堤ｫｶ縺翫≧・・/p>
      </div>
      <div style={{fontWeight:700,fontSize:".86rem",marginBottom:8}}>繧ｯ繧､繧ｺ縺ｮ遞ｮ鬘・/div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
        {modes.map(m=>{
          const active=quizMode===m.value;
          return (
            <div key={m.value} onClick={()=>setQMode(m.value)}
              style={{border:`2px solid ${active?m.color:"var(--border)"}`,borderRadius:9,padding:"10px 14px",cursor:"pointer",background:active?m.light:"#fff",display:"flex",alignItems:"center",gap:10,transition:"all .12s"}}>
              <span style={{fontSize:"1.2rem"}}>{m.label.split(" ")[0]}</span>
              <span style={{fontWeight:700,color:active?m.color:"var(--text)"}}>{m.label.split(" ").slice(1).join(" ")}</span>
              {active&&<span style={{marginLeft:"auto",color:m.color,fontWeight:700}}>笨・/span>}
            </div>
          );
        })}
      </div>
      {quizMode==="element"&&(
        <div style={{marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:".86rem",marginBottom:6}}>蜃ｺ鬘檎ｯ・峇</div>
          <RangeSelector maxNum={maxNum} onChange={setMaxNum}/>
        </div>
      )}
      {(quizMode==="ion"||quizMode==="formula")&&(
        <div style={{marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:".86rem",marginBottom:6}}>繝ｬ繝吶Ν</div>
          <div className="g2" style={{margin:0}}>
            {[["junior","痘 荳ｭ蟄ｦ"],["senior","燈 鬮俶｡"]].map(([v,l])=>(
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
        竢ｱ 繧ｹ繧ｿ繝ｼ繝茨ｼ・      </button>
    </div>
  );
}

function TimeAttackQuizScreen({ settings, onFinish }) {
  const { quizMode, maxNum, subLevel } = settings;
  const isIon = quizMode==="ion";
  const isFormula = quizMode==="formula";
  const elements = isFormula ? getFormulas(subLevel) : isIon ? getIons(subLevel) : getElements(maxNum);
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
            竢ｱ {mins}:{String(secs).padStart(2,"0")}
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <span className="ta-badge">{correct}/10</span>
            <span className="muted" style={{fontSize:".78rem"}}>#{answeredRef.current+1}</span>
          </div>
          <div className="scd">笨怒correct}</div>
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
          <div style={{fontSize:"1.7rem",marginBottom:4}}>潤 繧ｯ繝ｪ繧｢・・/div>
          <div style={{fontSize:"3rem",fontWeight:900,color:"#f59e0b",fontFamily:"Space Mono,monospace"}}>{mins}:{String(secs).padStart(2,"0")}</div>
          <div style={{color:"var(--muted)",fontSize:".82rem"}}>繧ｯ繝ｪ繧｢繧ｿ繧､繝</div>
          {rankSaved&&<div style={{marginTop:6,fontSize:".82rem",color:"var(--success)",fontWeight:700}}>笨・繝ｩ繝ｳ繧ｭ繝ｳ繧ｰ縺ｫ逋ｻ骭ｲ縺励∪縺励◆・・/div>}
        </div>
        <div className="s3">
          <div className="sb"><div className="sv" style={{color:"var(--primary)"}}>{result.score}</div><div className="sk">繧ｹ繧ｳ繧｢</div></div>
          <div className="sb"><div className="sv">{result.totalAnswered}</div><div className="sk">隗｣遲疲焚</div></div>
          <div className="sb"><div className="sv">{acc}%</div><div className="sk">豁｣遲皮紫</div></div>
        </div>
        <p className="muted tc" style={{fontSize:".78rem"}}>10蝠乗ｭ｣隗｣縺吶ｋ縺ｾ縺ｧ縺ｮ邱剰ｧ｣遲疲焚 {result.totalAnswered}蝠・/p>
      </div>
      <div className="gap8">
        <button className="btn" style={{flex:1,background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"#fff",fontWeight:700}} onClick={onRetry}>煤 繧ゅ≧荳蠎ｦ</button>
        <button className="btn btn-s" style={{flex:1}} onClick={onHome}>匠 繝帙・繝</button>
      </div>
    </div>
  );
}

// 笏笏 MolBattleLobby 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
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
    await sSet(`mol_room:${code}`, JSON.stringify(room), true);
    setRoomCode(code); setRoomData(room); setMolMode(mode); setIsHost(true); setPhase("waiting");
    startPoll(code);
  };

  const joinRoom = async () => {
    const code = joinCode.toUpperCase().trim();
    const res = await sGet(`mol_room:${code}`, true);
    if (!res) { alert("繝ｫ繝ｼ繝縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ"); return; }
    try {
      const room = JSON.parse(res.value);
      if (room.status !== "waiting") { alert("縺吶〒縺ｫ蟇ｾ謌ｦ縺悟ｧ九∪縺｣縺ｦ縺・∪縺・); return; }
      if (!room.players.find(p=>p.name===nickname))
        room.players.push({name:nickname, status:"waiting", score:0, miss:0});
      await sSet(`mol_room:${code}`, JSON.stringify(room), true);
      setRoomCode(code); setRoomData(room); setMolMode(room.molMode); setIsHost(false); setPhase("waiting");
      startPoll(code);
    } catch { alert("繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺ｾ縺励◆"); }
  };

  const startPoll = (code) => {
    clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      const res = await sGet(`mol_room:${code}`, true);
      if (!res) return;
      try {
        const room = JSON.parse(res.value);
        setRoomData(room);
        if (room.status === "playing") { clearInterval(pollRef.current); setPhase("quiz"); }
      } catch {}
    }, 1500);
  };

  const startGame = async () => {
    const res = await sGet(`mol_room:${roomCode}`, true);
    if (!res) return;
    const room = JSON.parse(res.value);
    room.status = "playing";
    await sSet(`mol_room:${roomCode}`, JSON.stringify(room), true);
    clearInterval(pollRef.current); setPhase("quiz");
  };

  const handleQuizFinish = async (result) => {
    setQuizResult(result);
    const res = await sGet(`mol_room:${roomCode}`, true);
    if (res) {
      const room = JSON.parse(res.value);
      const pl = room.players.find(p=>p.name===nickname);
      if (pl) { pl.score = result.total - result.miss; pl.miss = result.miss; pl.status = "done"; }
      if (room.players.every(p=>p.status==="done")) room.status = "done";
      await sSet(`mol_room:${roomCode}`, JSON.stringify(room), true);
      setRoomData(room);
    }
    setPhase("result_wait");
    pollRef.current = setInterval(async () => {
      const r = await sGet(`mol_room:${roomCode}`, true);
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

  const modeLabels = {intro:"蜈･髢",basic:"蝓ｺ遉・,adv:"蠢懃畑",random:"繝ｩ繝ｳ繝繝"};

  if (phase==="quiz") return <MolQuizScreen mode={molMode} onFinish={handleQuizFinish}/>;

  if (phase==="result") return (
    <div>
      <div className="card">
        <div style={{fontWeight:700,marginBottom:10}}>笞費ｸ・mol蟇ｾ謌ｦ邨先棡</div>
        {battleResult.map((p,i)=>(
          <div key={i} className="btr" style={p.isMe?{background:"#ede9fe"}:{}}>
            <span style={{fontSize:"1.25rem"}}>{i===0?"･・:i===1?"･・:i===2?"･・:`${i+1}菴港}</span>
            <span style={{flex:1,fontWeight:700}}>{p.name}{p.isMe&&<span className="bdg by" style={{marginLeft:5}}>縺ゅ↑縺・/span>}</span>
            <span style={{fontFamily:"Space Mono",fontWeight:700,color:"#6366f1"}}>{p.score}/10豁｣隗｣</span>
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
    return <div className="card tc"><p style={{fontSize:"2rem",marginBottom:10}}>竢ｳ</p>
      <h3 style={{fontWeight:700,marginBottom:6}}>豁｣隗｣謨ｰ: {quizResult?.total - quizResult?.miss}蝠・/h3>
      <p className="muted">莉悶・繝励Ξ繧､繝､繝ｼ繧貞ｾ・▲縺ｦ縺・∪縺・.. ({w}莠ｺ)</p></div>;
  }

  if (phase==="waiting") return (
    <div>
      <div className="card">
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={()=>{clearInterval(pollRef.current);setPhase("menu");}}>竊・謌ｻ繧・/button>
          <span style={{fontWeight:700}}>{isHost?"繝ｫ繝ｼ繝菴懈・":"蜿ょ刈荳ｭ"}</span><span/>
        </div>
        <p className="muted tc mb8">繝ｫ繝ｼ繝繧ｳ繝ｼ繝峨ｒ蜈ｱ譛峨＠繧医≧</p>
        <div className="rc">{roomCode}</div>
        <p className="muted tc" style={{fontSize:".75rem",marginBottom:13}}>
          mol險育ｮ・{modeLabels[molMode]}) ・・縺薙・繧ｳ繝ｼ繝峨ｒ蜿矩＃縺ｫ莨昴∴縺ｦ縺ｭ
        </p>
        <h4 style={{fontWeight:700,marginBottom:6}}>蜿ょ刈閠・({roomData?.players?.length||0}莠ｺ)</h4>
        <ul className="rlist">
          {roomData?.players?.map((p,i)=>(
            <li key={i} className="pli">
              <span className="pldot"/>
              <span style={{flex:1,fontWeight:700}}>{p.name}</span>
              {p.name===roomData.host&&<span className="bdg bh">繝帙せ繝・/span>}
              {p.name===nickname&&<span className="bdg by">縺ゅ↑縺・/span>}
            </li>
          ))}
        </ul>
        {!isHost&&<p className="muted tc" style={{marginTop:10}}>繝帙せ繝医′繧ｲ繝ｼ繝繧帝幕蟋九☆繧九∪縺ｧ縺雁ｾ・■縺上□縺輔＞</p>}
      </div>
      {isHost&&<button className="btn btn-blk" style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"#fff",fontWeight:700}} onClick={startGame}>
        噫 繧ｲ繝ｼ繝髢句ｧ具ｼ・({roomData?.players?.length||0}莠ｺ)
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
        <button className="btn btn-s btn-sm" onClick={()=>setPhase("menu")}>竊・謌ｻ繧・/button>
        <span style={{fontWeight:700}}>繝ｫ繝ｼ繝縺ｫ蜿ょ刈</span><span/>
      </div>
      <div className="ig">
        <label>繝ｫ繝ｼ繝繧ｳ繝ｼ繝峨ｒ蜈･蜉・/label>
        <input className="inp" value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())}
          placeholder="萓・ AB12" maxLength={4}
          style={{fontFamily:"Space Mono",fontSize:"1.4rem",letterSpacing:6,textAlign:"center"}}/>
      </div>
      <button className="btn btn-blk" style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:700}}
        onClick={joinRoom} disabled={joinCode.length<4}>蜿ょ刈縺吶ｋ</button>
    </div>
  );

  // menu
  return (
    <div>
      <div className="card">
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={onBack}>竊・謌ｻ繧・/button>
          <span style={{fontWeight:700}}>笞費ｸ・mol蟇ｾ謌ｦ繝｢繝ｼ繝・/span><span/>
        </div>
        <p className="muted tc mb13">蜿矩＃縺ｨ繝ｫ繝ｼ繝繧ｳ繝ｼ繝峨〒蜷梧凾蟇ｾ謌ｦ・・br/>蜷後§蝠城｡後ｒ隗｣縺・※豁｣隗｣謨ｰ繧堤ｫｶ縺翫≧</p>
        <div className="g2">
          <div className="sc" onClick={()=>setPhase("create")} style={{borderColor:"#6366f1"}}>
            <div className="ic">匠</div><div className="nm">繝ｫ繝ｼ繝繧剃ｽ懊ｋ</div>
          </div>
          <div className="sc" onClick={()=>setPhase("join")} style={{borderColor:"#6366f1"}}>
            <div className="ic">坎</div><div className="nm">繝ｫ繝ｼ繝縺ｫ蜈･繧・/div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 笏笏 MolQuizScreen 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
function MolQuizScreen({ mode, onFinish }) {
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

  // 驕ｸ謚櫁い逕滓・
  const [choices] = useState(()=>{
    // 豁｣隗｣縺ｮ譛牙柑謨ｰ蟄玲｡∵焚繧定ｪｿ縺ｹ縺ｦ縲√ム繝溘・繧ょ酔縺俶｡∵焚縺ｫ繝輔か繝ｼ繝槭ャ繝医☆繧・    const fmtNum = (val, ansStr) => {
      const s = String(ansStr);
      // 蟆乗焚轤ｹ莉･荳九・譯∵焚繧呈ｭ｣隗｣縺九ｉ蜿門ｾ・      const dotIdx = s.indexOf(".");
      const decimals = dotIdx >= 0 ? s.length - dotIdx - 1 : 0;
      const rounded = Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals);
      return decimals > 0 ? rounded.toFixed(decimals) : String(rounded);
    };

    return questions.map(qq=>{
      const isExp = typeof qq.ans === "string"; // 謖・焚陦ｨ險倥・遲斐∴
      if (isExp) {
        const numer = qq.numer || 6.0;
        const candidates = [];
        const c23 = [numer*2, numer/2, numer*3, numer*0.5].filter(x=>x>0&&x!==numer);
        c23.forEach(n=>{
          if(n>=10) candidates.push(`${(n/10).toFixed(1).replace(/\.0$/,"")}ﾃ・0ﾂｲ竅ｴ`);
          else candidates.push(`${n.toFixed(1).replace(/\.0$/,"")}ﾃ・0ﾂｲﾂｳ`);
        });
        candidates.push(`${numer.toFixed(1).replace(/\.0$/,"")}ﾃ・0ﾂｲﾂｲ`);
        candidates.push(`${numer.toFixed(1).replace(/\.0$/,"")}ﾃ・0ﾂｲ竅ｵ`);
        const dummies = shuffle(candidates.filter(x=>x!==qq.ans)).slice(0,3);
        return shuffle([qq.ans, ...dummies]);
      } else {
        // 謨ｰ蛟､・壽ｭ｣隗｣縺ｨ蜷後§譛牙柑謨ｰ蟄励〒繝繝溘・繧偵ヵ繧ｩ繝ｼ繝槭ャ繝・        const dummies = genMolDummies(qq.ans, qq.qtype);
        const formatted = dummies
          .map(d => fmtNum(d, qq.ans))
          .filter(d => d !== String(qq.ans));
        // 驥崎､・勁蜴ｻ
        const unique = [...new Set(formatted)];
        // 3蛟九↓雜ｳ繧翫↑縺・ｴ蜷医・蛟肴焚繝ｻ蛻・焚縺ｧ陬懷ｮ・        const multipliers = [2, 3, 4, 5, 0.25, 6, 0.1, 10];
        for (const m of multipliers) {
          if (unique.length >= 3) break;
          const extra = fmtNum(qq.ans * m, qq.ans);
          if (!unique.includes(extra) && extra !== String(qq.ans) && extra !== "0") {
            unique.push(extra);
          }
        }
        return shuffle([String(qq.ans), ...unique.slice(0,3)]);
      }
    });
  });

  useEffect(()=>{
    timerRef.current = setInterval(()=>{
      setTimeLeft(t=>{
        if(t<=1){clearInterval(timerRef.current);finishGame();return 0;}
        tlRef.current = t-1;
        return t-1;
      });
    },1000);
    return()=>clearInterval(timerRef.current);
  },[]);

  const finishGame = ()=>{
    clearInterval(timerRef.current);
    const correct = questions.length - missRef.current;
    const molScore = calcMolScore(correct, questions.length, tlRef.current);
    onFinish({score:molScore, timeLeft:tlRef.current, miss:missRef.current, hints:hintRef.current, skips:skipRef.current, total:questions.length, correct, mistakes:mistakesRef.current, questions});
  };

  const handleChoice = (choice)=>{
    if(selected!==null) return;
    const isOk = String(choice) === String(q.ans);
    setSelected(choice); setFeedback(isOk?"ok":"ng");
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
    setTimeLeft(t=>{ const nt=t+5; tlRef.current=nt; return nt; });
    setPenaltyAnim(true); setTimeout(()=>setPenaltyAnim(false),1500);
    mistakesRef.current=[...mistakesRef.current,{q,yours:"繧ｹ繧ｭ繝・・"}]; setMistakes(mistakesRef.current);
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
      {/* 蜴溷ｭ宣㍼螳壽焚繝舌・ */}
      <div style={{background:"#1e293b",color:"#94a3b8",fontSize:".65rem",padding:"6px 12px",borderRadius:8,marginBottom:10,fontFamily:"monospace",lineHeight:1.6}}>
        {MOL_CONST_TEXT}
      </div>
      <div className="card">
        {/* 繝倥ャ繝繝ｼ */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontFamily:"Space Mono,monospace",fontSize:"1.3rem",fontWeight:700,color:urgent?"var(--danger)":"var(--primary)",animation:urgent?"pulse .5s infinite alternate":"none"}}>
            竢ｱ {mins}:{String(secs).padStart(2,"0")}
            <span style={{marginLeft:8,fontSize:".9rem"}}>
              {Array(lamps).fill(0).map((_,i)=>(
                <span key={i} style={{color:i<litLamps?(urgent?"#ef4444":"#3b82f6"):"#cbd5e1"}}>笳・/span>
              ))}
            </span>
            {penaltyAnim&&<span style={{color:"#f59e0b",marginLeft:6,fontSize:".85rem",fontWeight:700}}>+5遘・/span>}
          </div>
          <div style={{fontSize:".8rem",display:"flex",gap:8}}>
            <span style={{color:"#ef4444",fontWeight:700}}>笨養missCount}</span>
            <span style={{color:"#3b82f6",fontWeight:700}}>庁{hintCount}</span>
            <span style={{color:"#f59e0b",fontWeight:700}}>竢ｭ{skipCount}</span>
          </div>
          <div style={{fontFamily:"Space Mono,monospace",fontSize:".85rem",color:"var(--muted)"}}>{qIdx+1}/10</div>
        </div>

        <div className={`fb fb-${feedback}`}/>

        {/* 蝠城｡・*/}
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:".8rem",color:"var(--muted)",marginBottom:6,fontWeight:700,letterSpacing:".5px"}}>ｧｮ mol險育ｮ怜撫鬘・/div>
          <div style={{fontSize:"1.2rem",fontWeight:700,color:"var(--text)",lineHeight:1.5}}>{q.q}</div>
        </div>

        {/* 繝偵Φ繝・*/}
        {showHint&&(
          <div style={{background:"#eff6ff",border:"1px solid #93c5fd",borderRadius:8,padding:"10px 12px",marginBottom:12,fontSize:".82rem",color:"#1e40af"}}>
            {hints.slice(0,hintLevel).map((h,i)=><div key={i} style={{marginBottom:i<hintLevel-1?4:0}}>庁 {h}</div>)}
          </div>
        )}

        {/* 驕ｸ謚櫁い */}
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

        {/* 繝偵Φ繝医・繧ｹ繧ｭ繝・・ */}
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-s btn-sm" style={{flex:1,color:"#3b82f6",borderColor:"#3b82f6"}}
            onClick={handleHint} disabled={hintLevel>=hints.length||selected!==null}>
            庁 繝偵Φ繝・{hintLevel>0?`(${hintLevel}/3)`:""}</button>
          <button className="btn btn-s btn-sm" style={{flex:1,color:"#f59e0b",borderColor:"#f59e0b"}}
            onClick={handleSkip} disabled={selected!==null}>
            竢ｭ 繧ｹ繧ｭ繝・・ (+5遘・</button>
        </div>
      </div>
    </div>
  );
}

// 笏笏 MolResultScreen 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
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
            {acc>=90?"･・螳檎挑・・:acc>=70?"･・繧医￥縺ｧ縺阪∪縺励◆・・:acc>=50?"･・繧ゅ≧蟆代＠・・:"答 邱ｴ鄙偵＠繧医≧・・}
          </div>
          <div style={{fontSize:"2.5rem",fontWeight:900,color:"#6366f1",fontFamily:"Space Mono,monospace"}}>{result.score||0}</div>
          <div style={{color:"var(--muted)",fontSize:".82rem"}}>轤ｹ</div>
          {rankSaved&&<div style={{marginTop:6,fontSize:".82rem",color:"var(--success)",fontWeight:700}}>笨・繝ｩ繝ｳ繧ｭ繝ｳ繧ｰ縺ｫ逋ｻ骭ｲ縺励∪縺励◆・・/div>}
        </div>
        <div className="s3">
          <div className="sb"><div className="sv" style={{color:"var(--success)"}}>{correct}</div><div className="sk">豁｣隗｣</div></div>
          <div className="sb"><div className="sv">{acc}%</div><div className="sk">豁｣遲皮紫</div></div>
          <div className="sb"><div className="sv">{mins}:{String(secs).padStart(2,"0")}</div><div className="sk">繧ｿ繧､繝</div></div>
        </div>
        <div style={{display:"flex",gap:12,justifyContent:"center",fontSize:".85rem",marginTop:4}}>
          <span style={{color:"#3b82f6",fontWeight:700}}>庁 繝偵Φ繝・{result.hints}蝗・/span>
          <span style={{color:"#f59e0b",fontWeight:700}}>竢ｭ 繧ｹ繧ｭ繝・・ {result.skips}蝗・/span>
        </div>
      </div>

      {result.mistakes&&result.mistakes.length>0&&(
        <div className="card">
          <div className="fb2 mb8">
            <span style={{fontWeight:700}}>笶・髢馴＆縺医◆蝠城｡・({result.mistakes.length}蝠・</span>
            <button className="btn btn-s btn-sm" onClick={()=>setShowMiss(v=>!v)}>{showMiss?"髢峨§繧・:"隕九ｋ"}</button>
          </div>
          {showMiss&&result.mistakes.map((m,i)=>{
            const formula = getMolFormula(m.q);
            return (
              <div key={i} style={{padding:"9px 0",borderBottom:"1px solid var(--border)",fontSize:".83rem"}}>
                <div style={{fontWeight:700,marginBottom:4}}>{m.q.q}</div>
                <div style={{color:"var(--success)"}}>笨・豁｣隗｣: {m.q.ans}</div>
                <div style={{color:"var(--danger)"}}>笨・縺ゅ↑縺・ {m.yours==="繧ｹ繧ｭ繝・・"?"繧ｹ繧ｭ繝・・":m.yours}</div>
                {formula&&(
                  <div style={{marginTop:5,background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:6,padding:"7px 10px",fontFamily:"monospace",fontSize:".78rem",color:"#166534",lineHeight:2}}>
                    {formula.split("\n").map((line,i)=>(
                      <div key={i}>{i===0?"盗 ":""}{line}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="gap8">
        <button className="btn btn-p" style={{flex:1,background:"linear-gradient(135deg,#6366f1,#8b5cf6)"}} onClick={onRetry}>煤 繧ゅ≧荳蠎ｦ</button>
        <button className="btn btn-s" style={{flex:1}} onClick={onHome}>匠 繝帙・繝</button>
      </div>
    </div>
  );
}

// 笏笏 BattleLobby 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
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
    if(!res){alert("繝ｫ繝ｼ繝縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ");return;}
    try{
      const room=JSON.parse(res.value);
      if(room.status!=="waiting"){alert("縺吶〒縺ｫ蟇ｾ謌ｦ縺悟ｧ九∪縺｣縺ｦ縺・∪縺・);return;}
      if(!room.players.find(p=>p.name===nickname))
        room.players.push({id:myId.current,name:nickname,status:"waiting",score:0});
      await sSet(`room:${code}`,JSON.stringify(room),true);
      setRoomCode(code);setRoomData(room);setMaxNum(room.maxNum||20);setIsHost(false);setPhase("waiting");
      startPoll(code);
    }catch{alert("繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺ｾ縺励◆");}
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
    return <div className="card tc"><p style={{fontSize:"2rem",marginBottom:10}}>竢ｳ</p>
      <h3 style={{fontWeight:700,marginBottom:6}}>縺ゅ↑縺溘・邨先棡: {quizResult?.score}轤ｹ</h3>
      <p className="muted">莉悶・繝励Ξ繧､繝､繝ｼ繧貞ｾ・▲縺ｦ縺・∪縺・.. ({w}莠ｺ)</p></div>;
  }
  if(phase==="waiting") return (
    <div>
      <div className="card">
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={()=>{clearInterval(pollRef.current);setPhase("menu");}}>竊・謌ｻ繧・/button>
          <span style={{fontWeight:700}}>{isHost?"繝ｫ繝ｼ繝菴懈・":"蜿ょ刈荳ｭ"}</span><span/>
        </div>
        <p className="muted tc mb8">繝ｫ繝ｼ繝繧ｳ繝ｼ繝峨ｒ蜈ｱ譛峨＠繧医≧</p>
        <div className="rc">{roomCode}</div>
        <p className="muted tc" style={{fontSize:".75rem",marginBottom:13}}>
          {isIon?`繧､繧ｪ繝ｳ(${roomData?.subLevel==="junior"?"荳ｭ蟄ｦ":"鬮俶｡"})`:isFormula?`蛹門ｭｦ蠑・${roomData?.subLevel==="junior"?"荳ｭ蟄ｦ":"鬮俶｡"})`:`遽・峇: 1縲・{maxNum}逡ｪ`} ・・縺薙・繧ｳ繝ｼ繝峨ｒ蜿矩＃縺ｫ莨昴∴縺ｦ縺ｭ
        </p>
        <h4 style={{fontWeight:700,marginBottom:6}}>蜿ょ刈閠・({roomData?.players?.length||0}莠ｺ)</h4>
        <ul className="rlist">
          {roomData?.players?.map((p,i)=>(
            <li key={i} className="pli">
              <span className="pldot"/>
              <span style={{flex:1,fontWeight:700}}>{p.name}</span>
              {p.name===roomData.host&&<span className="bdg bh">繝帙せ繝・/span>}
              {p.name===nickname&&<span className="bdg by">縺ゅ↑縺・/span>}
            </li>
          ))}
        </ul>
        {!isHost&&<p className="muted tc" style={{marginTop:10}}>繝帙せ繝医′繧ｲ繝ｼ繝繧帝幕蟋九☆繧九∪縺ｧ縺雁ｾ・■縺上□縺輔＞</p>}
      </div>
      {isHost&&<button className="btn btn-a btn-blk" onClick={startGame}>噫 繧ｲ繝ｼ繝髢句ｧ具ｼ・({roomData?.players?.length||0}莠ｺ)</button>}
    </div>
  );
  if(phase==="create") return <SetupScreen title={isIon?"繧､繧ｪ繝ｳ蟇ｾ謌ｦ:繝ｫ繝ｼ繝菴懈・":isFormula?"蛹門ｭｦ蠑丞ｯｾ謌ｦ:繝ｫ繝ｼ繝菴懈・":"蜈・ｴ蟇ｾ謌ｦ:繝ｫ繝ｼ繝菴懈・"} quizMode={quizMode} isBattle onStart={(mn,dm,sl,dif)=>createRoom(mn,dm,sl,dif)} onBack={()=>setPhase("menu")}/>;
  if(phase==="join") return (
    <div className="card">
      <div className="fb2 mb13">
        <button className="btn btn-s btn-sm" onClick={()=>setPhase("menu")}>竊・謌ｻ繧・/button>
        <span style={{fontWeight:700}}>繝ｫ繝ｼ繝縺ｫ蜿ょ刈</span><span/>
      </div>
      <div className="ig">
        <label>繝ｫ繝ｼ繝繧ｳ繝ｼ繝峨ｒ蜈･蜉・/label>
        <input className="inp" value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())}
          placeholder="萓・ AB12" maxLength={4}
          style={{fontFamily:"Space Mono",fontSize:"1.4rem",letterSpacing:6,textAlign:"center"}}/>
      </div>
      <button className={`btn ${isIon?"btn-ion":"btn-p"} btn-blk`} onClick={joinRoom} disabled={joinCode.length<4}>蜿ょ刈縺吶ｋ</button>
    </div>
  );
  return (
    <div>
      <div className="card">
        <div className="fb2 mb13">
          <button className="btn btn-s btn-sm" onClick={onBack}>竊・謌ｻ繧・/button>
          <span style={{fontWeight:700}}>{isIon?"笞｡ 繧､繧ｪ繝ｳ蟇ｾ謌ｦ":isFormula?"ｧｬ 蛹門ｭｦ蠑丞ｯｾ謌ｦ":"笞費ｸ・蜈・ｴ蟇ｾ謌ｦ"}</span><span/>
        </div>
        <p className="muted tc mb13">蜿矩＃縺ｨ繝ｫ繝ｼ繝繧ｳ繝ｼ繝峨〒蜷梧凾蟇ｾ謌ｦ・・br/>蜷後§蝠城｡後ｒ隗｣縺・※轤ｹ謨ｰ繧堤ｫｶ縺翫≧</p>
        <div className="g2">
          <div className={`sc ${isIon?"ion-sc":isFormula?"form-sc":""}`} onClick={()=>setPhase("create")}><div className="ic">匠</div><div className="nm">繝ｫ繝ｼ繝繧剃ｽ懊ｋ</div></div>
          <div className={`sc ${isIon?"ion-sc":isFormula?"form-sc":""}`} onClick={()=>setPhase("join")}><div className="ic">坎</div><div className="nm">繝ｫ繝ｼ繝縺ｫ蜈･繧・/div></div>
        </div>
      </div>
    </div>
  );
}

// 笏笏 App 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
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
  const [molMode,setMolMode]=useState("intro");

  useEffect(()=>{
    const start=()=>{bgm.start("home");document.removeEventListener("click",start);};
    document.addEventListener("click",start);
    return()=>document.removeEventListener("click",start);
  },[]);

  const saveNickname=async(nick)=>{setNickname(nick);};

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
            <span style={{fontSize:"1.2rem",filter:"drop-shadow(0 0 6px rgba(165,180,252,.8))"}}>笞幢ｸ・/span>
            <div className="hdr-title-wrap">
              <div className="hdr-app-name">CHEM BATTLE</div>
              <div className="hdr-tagline">SCIENCE QUIZ APP</div>
            </div>
            <button onClick={toggleBgm} style={{background:"none",border:"none",color:"rgba(165,243,252,.8)",cursor:"pointer",fontSize:"1rem",padding:4}}>{bgmOn?"矧":"這"}</button>
          </div>
        </div>
        <div className="main">
          {screen==="home"&&(
            <HomeScreen nickname={nickname} onSetNickname={saveNickname}
              onSolo={goSetup} onBattle={goBattle}
              onRanking={()=>setScreen("ranking")}
              onMemo={()=>setScreen("memo")}
              onMol={(t)=>{bgm.stop();if(t==="battle")setScreen("mol_battle");else setScreen("mol_setup");}}
              bgmOn={bgmOn} onToggleBgm={toggleBgm}/>
          )}
          {screen==="setup"&&(
            <SetupScreen title={isIon?"繧､繧ｪ繝ｳ繧ｯ繧､繧ｺ險ｭ螳・:"蜃ｺ鬘檎ｯ・峇繧帝∈謚・} quizMode={quizMode} onBack={goHome}
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
          {screen==="mol_setup"&&<MolSetupScreen onBack={()=>setScreen("home")} onStart={(m,t)=>{setMolMode(m);bgm.stop();setScreen("mol_countdown");}}/>}
          {screen==="mol_battle"&&<MolBattleLobby nickname={nickname} onBack={()=>{if(bgmOn)bgm.start("home");setScreen("home");}}/>}
          {screen==="mol_countdown"&&<Countdown onDone={()=>setScreen("mol_quiz")}/>}
          {screen==="mol_quiz"&&<MolQuizScreen mode={molMode} onFinish={r=>{bgm.stop();bgm.se("finish");setQuizResult({...r,_mol:true,molMode});setScreen("mol_result");}}/>}
          {screen==="mol_result"&&quizResult?._mol&&<MolResultScreen result={quizResult} nickname={nickname} onHome={()=>{if(bgmOn)bgm.start("home");setScreen("home");}} onRetry={()=>{bgm.stop();setScreen("mol_quiz");}}/>}
          {screen==="battle"&&<BattleLobby nickname={nickname} quizMode={quizMode} directionMode={directionMode} subLevel={subLevel} difficulty={difficulty} onBack={goHome}/>}
        </div>
      </div>
    </>
  );
}
