const API_BASE = 'https://api.getbible.net/v2/livretr';

const BOOK_NUMBERS = {
  gn:1,ex:2,lv:3,nm:4,dt:5,js:6,jz:7,rt:8,
  '1sm':9,'2sm':10,'1rs':11,'2rs':12,'1cr':13,'2cr':14,
  esd:15,ne:16,et:17,job:18,sl:19,pv:20,ec:21,ct:22,
  is:23,jr:24,lm:25,ez:26,dn:27,os:28,jl:29,am:30,
  ab:31,jn:32,mq:33,na:34,hc:35,sf:36,ag:37,zc:38,
  ml:39,mt:40,mc:41,lc:42,jo:43,at:44,rm:45,'1co':46,
  '2co':47,gl:48,ef:49,fl:50,cl:51,'1ts':52,'2ts':53,
  '1tm':54,'2tm':55,tt:56,flm:57,hb:58,tg:59,'1pe':60,
  '2pe':61,'1jo':62,'2jo':63,'3jo':64,jd:65,ap:66,
};

export async function fetchChapter(bookId, ch, signal) {
  const num = BOOK_NUMBERS[bookId];
  if (!num) throw new Error('Livro desconhecido: ' + bookId);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(API_BASE + '/' + num + '/' + ch + '.json', { signal: controller.signal });
    if (!res.ok) throw new Error('Erro HTTP ' + res.status);
    const data = await res.json();
    return data.verses.map(v => ({ n: v.verse, t: v.text }));
  } finally {
    clearTimeout(timer);
  }
}

// Cache helpers for localStorage
// Usar chave diferente da versão antiga pra evitar conflito
const CACHE_KEY = 'bib_livre_cache';

export function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function saveToCache(key, verses) {
  try {
    const cache = loadCache();
    cache[key] = verses;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {}
}
