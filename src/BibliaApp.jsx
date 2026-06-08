import { useState, useEffect, useRef } from 'react';
import { SearchIcon, BookOpen, Church, HeartHandshake, Share2, Star, Bookmark, Heart, Cross, Sparkles, Home as HomeIcon, ChevronRight, CalendarDays, Download } from 'lucide-react';
import { AdMob } from '@capacitor-community/admob';
import { fetchChapter, loadCache, saveToCache } from './data/bibleApi.js';

const BOOKS = [
  {id:"gn",name:"Gênesis",abbr:"Gn",testament:"AT",chapters:50},
  {id:"ex",name:"Êxodo",abbr:"Ex",testament:"AT",chapters:40},
  {id:"lv",name:"Levítico",abbr:"Lv",testament:"AT",chapters:27},
  {id:"nm",name:"Números",abbr:"Nm",testament:"AT",chapters:36},
  {id:"dt",name:"Deuteronômio",abbr:"Dt",testament:"AT",chapters:34},
  {id:"js",name:"Josué",abbr:"Js",testament:"AT",chapters:24},
  {id:"jz",name:"Juízes",abbr:"Jz",testament:"AT",chapters:21},
  {id:"rt",name:"Rute",abbr:"Rt",testament:"AT",chapters:4},
  {id:"1sm",name:"1 Samuel",abbr:"1Sm",testament:"AT",chapters:31},
  {id:"2sm",name:"2 Samuel",abbr:"2Sm",testament:"AT",chapters:24},
  {id:"1rs",name:"1 Reis",abbr:"1Rs",testament:"AT",chapters:22},
  {id:"2rs",name:"2 Reis",abbr:"2Rs",testament:"AT",chapters:25},
  {id:"1cr",name:"1 Crônicas",abbr:"1Cr",testament:"AT",chapters:29},
  {id:"2cr",name:"2 Crônicas",abbr:"2Cr",testament:"AT",chapters:36},
  {id:"esd",name:"Esdras",abbr:"Esd",testament:"AT",chapters:10},
  {id:"ne",name:"Neemias",abbr:"Ne",testament:"AT",chapters:13},
  {id:"et",name:"Ester",abbr:"Et",testament:"AT",chapters:10},
  {id:"job",name:"Jó",abbr:"Jó",testament:"AT",chapters:42},
  {id:"sl",name:"Salmos",abbr:"Sl",testament:"AT",chapters:150},
  {id:"pv",name:"Provérbios",abbr:"Pv",testament:"AT",chapters:31},
  {id:"ec",name:"Eclesiastes",abbr:"Ec",testament:"AT",chapters:12},
  {id:"ct",name:"Cântico dos Cânticos",abbr:"Ct",testament:"AT",chapters:8},
  {id:"is",name:"Isaías",abbr:"Is",testament:"AT",chapters:66},
  {id:"jr",name:"Jeremias",abbr:"Jr",testament:"AT",chapters:52},
  {id:"lm",name:"Lamentações",abbr:"Lm",testament:"AT",chapters:5},
  {id:"ez",name:"Ezequiel",abbr:"Ez",testament:"AT",chapters:48},
  {id:"dn",name:"Daniel",abbr:"Dn",testament:"AT",chapters:12},
  {id:"os",name:"Oseias",abbr:"Os",testament:"AT",chapters:14},
  {id:"jl",name:"Joel",abbr:"Jl",testament:"AT",chapters:3},
  {id:"am",name:"Amós",abbr:"Am",testament:"AT",chapters:9},
  {id:"ab",name:"Abdias",abbr:"Ab",testament:"AT",chapters:1},
  {id:"jn",name:"Jonas",abbr:"Jn",testament:"AT",chapters:4},
  {id:"mq",name:"Miqueias",abbr:"Mq",testament:"AT",chapters:7},
  {id:"na",name:"Naum",abbr:"Na",testament:"AT",chapters:3},
  {id:"hc",name:"Habacuque",abbr:"Hc",testament:"AT",chapters:3},
  {id:"sf",name:"Sofonias",abbr:"Sf",testament:"AT",chapters:3},
  {id:"ag",name:"Ageu",abbr:"Ag",testament:"AT",chapters:2},
  {id:"zc",name:"Zacarias",abbr:"Zc",testament:"AT",chapters:14},
  {id:"ml",name:"Malaquias",abbr:"Ml",testament:"AT",chapters:4},
  {id:"mt",name:"Mateus",abbr:"Mt",testament:"NT",chapters:28},
  {id:"mc",name:"Marcos",abbr:"Mc",testament:"NT",chapters:16},
  {id:"lc",name:"Lucas",abbr:"Lc",testament:"NT",chapters:24},
  {id:"jo",name:"João",abbr:"Jo",testament:"NT",chapters:21},
  {id:"at",name:"Atos dos Apóstolos",abbr:"At",testament:"NT",chapters:28},
  {id:"rm",name:"Romanos",abbr:"Rm",testament:"NT",chapters:16},
  {id:"1co",name:"1 Coríntios",abbr:"1Co",testament:"NT",chapters:16},
  {id:"2co",name:"2 Coríntios",abbr:"2Co",testament:"NT",chapters:13},
  {id:"gl",name:"Gálatas",abbr:"Gl",testament:"NT",chapters:6},
  {id:"ef",name:"Efésios",abbr:"Ef",testament:"NT",chapters:6},
  {id:"fl",name:"Filipenses",abbr:"Fl",testament:"NT",chapters:4},
  {id:"cl",name:"Colossenses",abbr:"Cl",testament:"NT",chapters:4},
  {id:"1ts",name:"1 Tessalonicenses",abbr:"1Ts",testament:"NT",chapters:5},
  {id:"2ts",name:"2 Tessalonicenses",abbr:"2Ts",testament:"NT",chapters:3},
  {id:"1tm",name:"1 Timóteo",abbr:"1Tm",testament:"NT",chapters:6},
  {id:"2tm",name:"2 Timóteo",abbr:"2Tm",testament:"NT",chapters:4},
  {id:"tt",name:"Tito",abbr:"Tt",testament:"NT",chapters:3},
  {id:"flm",name:"Filémon",abbr:"Flm",testament:"NT",chapters:1},
  {id:"hb",name:"Hebreus",abbr:"Hb",testament:"NT",chapters:13},
  {id:"tg",name:"Tiago",abbr:"Tg",testament:"NT",chapters:5},
  {id:"1pe",name:"1 Pedro",abbr:"1Pe",testament:"NT",chapters:5},
  {id:"2pe",name:"2 Pedro",abbr:"2Pe",testament:"NT",chapters:3},
  {id:"1jo",name:"1 João",abbr:"1Jo",testament:"NT",chapters:5},
  {id:"2jo",name:"2 João",abbr:"2Jo",testament:"NT",chapters:1},
  {id:"3jo",name:"3 João",abbr:"3Jo",testament:"NT",chapters:1},
  {id:"jd",name:"Judas",abbr:"Jd",testament:"NT",chapters:1},
  {id:"ap",name:"Apocalipse",abbr:"Ap",testament:"NT",chapters:22},
];

const FEATURED_VERSES = [
  {ref:"Jo 3,16",text:"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."},
  {ref:"Sl 23,1",text:"O Senhor é o meu pastor: nada me faltará."},
  {ref:"Rm 8,28",text:"Sabemos, aliás, que tudo coopera para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu desígnio."},
  {ref:"Fl 4,13",text:"Tudo posso naquele que me dá força."},
  {ref:"Is 40,31",text:"Mas os que esperam no Senhor renovam as suas forças: sobem com asas como águias; correm sem se cansar; caminham sem se fatigar."},
  {ref:"Jr 29,11",text:"Pois eu conheço os desígnios que tenho para vós — oráculo do Senhor — desígnios de paz e não de calamidade, para vos dar um futuro e uma esperança."},
  {ref:"Mt 5,3",text:"Bem-aventurados os pobres em espírito, porque deles é o Reino dos Céus."},
  {ref:"1Co 13,13",text:"Agora, portanto, permanecem a fé, a esperança e o amor, esses três; mas o maior deles é o amor."},
  {ref:"Hb 11,1",text:"Ora, a fé é a garantia dos bens que se esperam, a prova das realidades que não se veem."},
  {ref:"Sl 91,1",text:"Aquele que mora sob a proteção do Altíssimo e descansa à sombra do Todo-Poderoso"},
  {ref:"Jo 14,6",text:"Jesus disse-lhe: 'Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai a não ser por mim.'"},
  {ref:"Tg 1,17",text:"Todo dom excelente e todo presente perfeito vem do alto, descendo do Pai das luzes."},
];

// Banco de versículos para busca offline por tema

const SEARCH_DB = [
  {ref:"Jo 3,16",text:"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",tags:["amor","deus","fé","vida","eterna","filho","crê","salvação"]},
  {ref:"Sl 23,1",text:"O Senhor é o meu pastor: nada me faltará.",tags:["pastor","senhor","faltará","proteção","confiança","paz"]},
  {ref:"Rm 8,28",text:"Sabemos, aliás, que tudo coopera para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu desígnio.",tags:["bem","amor","deus","coopera","chamados","esperança","confiança"]},
  {ref:"Fl 4,13",text:"Tudo posso naquele que me dá força.",tags:["força","coragem","posso","fortalece","poder","confiança"]},
  {ref:"Is 40,31",text:"Mas os que esperam no Senhor renovam as suas forças: sobem com asas como águias; correm sem se cansar; caminham sem se fatigar.",tags:["esperam","força","renovam","senhor","esperança","coragem","cansaço"]},
  {ref:"Jr 29,11",text:"Pois eu conheço os desígnios que tenho para vós — oráculo do Senhor — desígnios de paz e não de calamidade, para vos dar um futuro e uma esperança.",tags:["planos","futuro","esperança","paz","senhor","desígnio","deus"]},
  {ref:"Mt 5,3",text:"Bem-aventurados os pobres em espírito, porque deles é o Reino dos Céus.",tags:["bem-aventurados","pobres","espírito","reino","céus","beatitudes"]},
  {ref:"1Co 13,4",text:"O amor é paciente; o amor é bondoso. O amor não é invejoso; o amor não se gaba, não se ensoberbece,",tags:["amor","paciente","bondoso","invejoso","caridade"]},
  {ref:"1Co 13,13",text:"Agora, portanto, permanecem a fé, a esperança e o amor, esses três; mas o maior deles é o amor.",tags:["fé","esperança","amor","maior","permanecem","caridade"]},
  {ref:"Hb 11,1",text:"Ora, a fé é a garantia dos bens que se esperam, a prova das realidades que não se veem.",tags:["fé","garantia","esperam","realidades","veem","certeza","crença"]},
  {ref:"Jo 14,6",text:"Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai a não ser por mim.",tags:["caminho","verdade","vida","pai","jesus","salvação"]},
  {ref:"Jo 14,27",text:"A paz vos deixo, a minha paz vos dou; não vos dou como o mundo a dá. Não se perturbe o vosso coração, nem se intimide.",tags:["paz","coração","perturbação","medo","ansiedade","tranquilidade"]},
  {ref:"Sl 51,10",text:"Cria em mim um coração puro, ó Deus, renova em mim um espírito firme.",tags:["coração","puro","deus","renova","espírito","pureza","penitência","perdão"]},
  {ref:"Mt 6,33",text:"Procurai primeiro o Reino de Deus e a sua justiça, e todas essas coisas vos serão acrescentadas.",tags:["reino","deus","justiça","procurai","primazia","prioridade"]},
  {ref:"Sl 121,2",text:"O meu socorro vem do Senhor, que fez o céu e a terra.",tags:["socorro","senhor","ajuda","proteção","criador","auxiliador"]},
  {ref:"Rm 8,37",text:"Mas, em tudo isso, somos mais que vencedores graças àquele que nos amou.",tags:["vencedores","amor","vitória","força","confiança"]},
  {ref:"Mt 5,9",text:"Bem-aventurados os que promovem a paz, porque serão chamados filhos de Deus.",tags:["paz","filhos","deus","bem-aventurados","beatitudes"]},
  {ref:"Jo 1,14",text:"E o Verbo se fez carne e habitou entre nós, e nós contemplamos a sua glória, glória que ele tem junto ao Pai como Filho único, cheio de graça e de verdade.",tags:["verbo","encarnação","glória","graça","verdade","natal","jesus"]},
  {ref:"Lc 1,28",text:"Alegra-te, cheia de graça! O Senhor está contigo!",tags:["maria","graça","ave maria","anunciação","senhor","alegria"]},
  {ref:"Tg 1,5",text:"Se algum de vós carece de sabedoria, peça-a a Deus, que a todos dá livremente e sem repreender, e ela lhe será concedida.",tags:["sabedoria","oração","pedir","deus","gratuito"]},
  {ref:"Tg 1,17",text:"Todo dom excelente e todo presente perfeito vem do alto, descendo do Pai das luzes.",tags:["dom","presente","perfeito","pai","graça","bênção"]},
  {ref:"Fl 4,6",text:"Não vos preocupeis com nada, mas em tudo, pela oração e pela súplica, com ação de graças, apresentai as vossas necessidades a Deus.",tags:["ansiedade","preocupação","oração","paz","confiança","súplica","gratidão"]},
  {ref:"Fl 4,7",text:"E a paz de Deus, que ultrapassa todo o entendimento, guardará vossos corações e vossas mentes em Cristo Jesus.",tags:["paz","deus","coração","mente","ansiedade","tranquilidade","proteção"]},
  {ref:"Sl 91,11",text:"Pois ele ordenou aos seus anjos que te guardem em todos os teus caminhos.",tags:["anjos","guardião","proteção","caminhos","senhor"]},
  {ref:"Is 40,8",text:"A erva seca, a flor murcha, mas a palavra do nosso Deus permanece eternamente.",tags:["palavra","deus","eterno","permanece","escritura","bíblia"]},
  {ref:"Rm 8,15",text:"Pois não recebestes um espírito de escravidão para voltardes ao temor, mas recebestes um espírito de adoção, pelo qual clamamos: Abbá! Pai!",tags:["espírito","filhos","adoção","pai","deus","liberdade","medo"]},
  {ref:"Mt 5,7",text:"Bem-aventurados os misericordiosos, porque alcançarão misericórdia.",tags:["misericórdia","bem-aventurados","beatitudes","perdão"]},
  {ref:"Lc 15,7",text:"Digo-vos que assim haverá mais alegria no céu por um pecador que se converte do que por noventa e nove justos que não precisam de conversão.",tags:["conversão","pecador","alegria","céu","perdão","arrependimento"]},
  {ref:"Ap 21,4",text:"Ele enxugará toda lágrima de seus olhos. A morte não existirá mais, nem luto, nem choro, nem dor existirão mais, pois o mundo anterior passou.",tags:["céu","esperança","dor","lágrima","morte","consolo","vida eterna"]},
  {ref:"Ef 6,11",text:"Revesti-vos das armas de Deus, para poderdes resistir às insídias do diabo.",tags:["armas","deus","diabo","resistir","proteção","batalha espiritual"]},
  {ref:"Sl 100,4",text:"Entrai por seus pórticos com ação de graças, em seus átrios com louvor! Rendei-lhe graças e bendizei o seu nome!",tags:["louvor","graças","adoração","nome","celebração","missa","liturgia"]},
  {ref:"Mt 5,44",text:"Mas eu vos digo: amai os vossos inimigos e rezai pelos que vos perseguem,",tags:["amor","inimigos","oração","perseguição","perdão"]},
  {ref:"Sl 22,1",text:"Meu Deus, meu Deus, por que me abandonaste? Por que te manténs tão longe de minha salvação?",tags:["sofrimento","abandono","deus","clamor","dor","cruz","jesus"]},
  {ref:"Rm 8,1",text:"Portanto, agora, nenhuma condenação pesa sobre os que estão em Cristo Jesus.",tags:["condenação","cristo","graça","liberdade","salvação","culpa"]},
  {ref:"1Co 13,7",text:"Desculpa tudo, crê tudo, espera tudo, suporta tudo.",tags:["amor","esperança","fé","paciência","caridade","suporta"]},
  {ref:"Sl 1,1",text:"Feliz o homem que não segue o conselho dos ímpios, não se detém no caminho dos pecadores.",tags:["feliz","justo","caminho","sabedoria","lei","senhor"]},
  {ref:"Gn 1,1",text:"No princípio, Deus criou o céu e a terra.",tags:["criação","princípio","deus","céu","terra","origem"]},
  {ref:"Gn 1,27",text:"Deus criou o ser humano à sua imagem, à imagem de Deus ele o criou; homem e mulher ele os criou.",tags:["imagem","deus","criação","homem","mulher","dignidade","pessoa"]},
];

const PRAYERS = [
  {title:"Pai Nosso",text:"Pai nosso que estais nos céus,\nSantificado seja o vosso nome,\nVenha a nós o vosso reino,\nSeja feita a vossa vontade,\nAssim na terra como no céu.\nO pão nosso de cada dia nos dai hoje,\nPerdoai-nos as nossas ofensas,\nAssim como nós perdoamos a quem nos tem ofendido,\nE não nos deixeis cair em tentação,\nMas livrai-nos do mal. Amém."},
  {title:"Ave Maria",text:"Ave Maria, cheia de graça,\nO Senhor é convosco,\nBendita sois vós entre as mulheres,\nE bendito é o fruto do vosso ventre, Jesus.\nSanta Maria, Mãe de Deus,\nRogai por nós, pecadores,\nAgora e na hora da nossa morte. Amém."},
  {title:"Glória ao Pai",text:"Glória ao Pai,\nAo Filho\nE ao Espírito Santo.\nComo era no princípio,\nAgora e sempre\nPor todos os séculos dos séculos. Amém."},
  {title:"Ato de Contrição",text:"Meu Deus, porque sois tão bom,\nPesam-me infinitamente os meus pecados\nE odeio o mal que cometi.\nProponho firmemente,\nCom a ajuda da vossa graça,\nMudar de vida e não mais pecar. Amém."},
  {title:"Creio em Deus (Credo)",text:"Creio em Deus Pai todo-poderoso,\nCriador do céu e da terra;\ne em Jesus Cristo, seu único Filho, Nosso Senhor,\nque foi concebido pelo poder do Espírito Santo;\nnasceu da Virgem Maria,\npadeceu sob Pôncio Pilatos,\nfoi crucificado, morto e sepultado;\ndesceu à mansão dos mortos;\nressuscitou ao terceiro dia;\nsubiu aos céus,\nestá sentado à direita de Deus Pai todo-poderoso,\nonde há de vir a julgar os vivos e os mortos.\nCreio no Espírito Santo,\nna Santa Igreja Católica,\nna comunhão dos santos,\nna remissão dos pecados,\nna ressurreição da carne,\nna vida eterna. Amém."},
  {title:"Salve Rainha",text:"Salve, Rainha, Mãe de misericórdia,\nVida, doçura e esperança nossa, salve!\nA vós bradamos, os degredados filhos de Eva;\na vós suspiramos, gemendo e chorando neste vale de lágrimas.\nEia, pois, advogada nossa,\nessas vossas misericordiosas vistas a nós voltai;\ne depois deste desterro, mostrai-nos Jesus,\nfruto bendito do vosso ventre.\nÓ clemente, ó piedosa, ó doce sempre Virgem Maria! Amém."},
];

const MISSA_LINKS = [
  {title:"TV Canção Nova — Ao Vivo 24h",url:"https://www.youtube.com/@tvcanconova/live",icon:"📺",desc:"Missas e evangelização"},
  {title:"TV Aparecida — Ao Vivo",url:"https://www.youtube.com/@TVAparecida/live",icon:"⛪",desc:"Basílica de Aparecida"},
  {title:"TV Século XXI — Ao Vivo",url:"https://www.youtube.com/@tvseculoxxi/live",icon:"🕊️",desc:"Evangelização diária"},
  {title:"Liturgia Diária — CNBB",url:"https://www.cnbb.org.br/liturgia/",icon:"📋",desc:"Leituras oficiais do dia"},
];

const REFLECTIONS = [
  "Deixa que Deus escreva a história da tua vida. Seus planos superam qualquer sonho nosso.",
  "A fé não remove as pedras do caminho, mas dá forças para caminhar sobre elas.",
  "Quando não podemos ver o caminho à frente, podemos confiar Naquele que conhece o fim desde o início.",
  "O amor de Deus não é algo que precisamos ganhar. É um dom gratuito, derramado sobre nós a cada amanhecer.",
  "Na oração, não mudamos Deus — somos nós que somos transformados pela presença Dele.",
  "Cada dia é um presente de Deus. Abra-o com gratidão e viva-o com propósito.",
  "Deus não chama os capacitados; Ele capacita os chamados.",
];

// Busca offline inteligente
function searchVerses(query) {
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  const scored = SEARCH_DB.map(v => {
    let score = 0;
    const text = v.text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    const ref = v.ref.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    const tags = v.tags.join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    if (ref.includes(q)) score += 10;
    if (text.includes(q)) score += 5;
    q.split(" ").forEach(word => {
      if (word.length < 2) return;
      if (tags.includes(word)) score += 3;
      if (text.includes(word)) score += 2;
    });
    return {...v, score};
  }).filter(v => v.score > 0).sort((a,b) => b.score - a.score);
  return scored.slice(0, 6);
}

export default function BibliaApp() {
  // ── STATE ──────────────────────────────────────────────────────
  const [tab, setTab]               = useState("home");
  const [query, setQuery]           = useState("");
  const [results, setResults]       = useState([]);
  const [searched, setSearched]     = useState(false);
  const [selBook, setSelBook]       = useState(null);
  const [verses, setVerses]         = useState(null);
  const [favs, setFavs]             = useState([]);
  const [bfilt, setBfilt]           = useState("ALL");
  const [openPrayer, setOpenPrayer] = useState(null);
  const [rdrBook, setRdrBook]       = useState(null);
  const [rdrCh, setRdrCh]           = useState(null);
  const [pageIdx, setPageIdx]       = useState(0);
  const [flipping, setFlipping]     = useState(false);
  const [flipDir, setFlipDir]       = useState(0);
  // savedChapters: { "gn_1": [...verses], "gn_2": [...], ... }
  const [savedChapters, setSavedChapters] = useState({});
  const [savingBook, setSavingBook]       = useState(false);
  const [saveProgress, setSaveProgress]  = useState(0);
  const touchX = useRef(0);
  const touchY = useRef(0);
  const [toast, setToast] = useState(null);
  const [shareModal, setShareModal] = useState(null); // {text, ref}
  const [adPageCount, setAdPageCount] = useState(0);
  const [loadingError, setLoadingError] = useState(null);
  const adUnitId = "ca-app-pub-9088121551421320/6514782938";

  const vod  = FEATURED_VERSES[new Date().getDate() % FEATURED_VERSES.length];
  const refl = REFLECTIONS[new Date().getDate() % REFLECTIONS.length];

  useEffect(() => {
    // Carregar tudo via async IIFE
    (async () => {
      // Inicializar AdMob
      try { await AdMob.initialize(); } catch(e) {}

      // Favoritos
      try {
        const favRes = { value: localStorage.getItem('bib_favs') };
        if (favRes && favRes.value) setFavs(JSON.parse(favRes.value));
        else {
          const local = localStorage.getItem("bib_favs");
          if (local) setFavs(JSON.parse(local));
        }
      } catch(e) {
        try { setFavs(JSON.parse(localStorage.getItem("bib_favs") || "[]")); } catch(e2) {}
      }
      // Limpar cache velho de versões anteriores (Matos Soares)
      try { localStorage.removeItem('bib_visited'); } catch(e) {}
      // Capítulos em cache (Bíblia Livre)
      try {
        const cached = loadCache();
        setSavedChapters(cached);
      } catch(e) {}
    })();
  }, []);

  // ── HELPERS ────────────────────────────────────────────────────
  const toggleFav = async (v) => {
    const upd = favs.some(f => f.ref === v.ref)
      ? favs.filter(f => f.ref !== v.ref)
      : [...favs, v];
    setFavs(upd);
    try {
      localStorage.setItem('bib_favs', JSON.stringify(upd));
    } catch(e) {
      try { localStorage.setItem("bib_favs", JSON.stringify(upd)); } catch(e2) {}
    }
  };
  const isFav = (ref) => favs.some(f => f.ref === ref);

  const showToast = (msg, icon="✓") => {
    setToast({ msg, icon });
    setTimeout(() => setToast(null), 2800);
  };

  const shareVerse = (v) => {
    setShareModal(v);
  };

  const doShare = (v) => {
    const txt = '\u201c' + v.text + '\u201d\n\n\u2014 ' + v.ref + '\n\n\u2020 B\u00edblia Cat\u00f3lica';
    try {
      if (navigator.share) {
        navigator.share({ text: txt }).catch(() => {});
        setShareModal(null);
        return;
      }
    } catch(e) {}
    // Fallback: copia texto
    try {
      const el = document.createElement("textarea");
      el.value = txt;
      el.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0;font-size:16px";
      document.body.appendChild(el);
      el.focus(); el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    } catch(e) {}
    showToast("Texto copiado! Cole no WhatsApp ou Instagram");
    setShareModal(null);
  };

  const openWhatsApp = (v) => {
    const txt = encodeURIComponent('\u201c' + v.text + '\u201d\n\n\u2014 ' + v.ref + '\n\n\u2020 B\u00edblia Cat\u00f3lica');
    window.open('https://wa.me/?text=' + txt, '_blank');
    setShareModal(null);
  };

  const openTelegram = (v) => {
    const txt = encodeURIComponent('\u201c' + v.text + '\u201d\n\n\u2014 ' + v.ref + '\n\n\u2020 B\u00edblia Cat\u00f3lica');
    window.open('https://t.me/share/url?text=' + txt, '_blank');
    setShareModal(null);
  };

  const doSearch = () => {
    if (!query.trim()) return;
    setResults(searchVerses(query));
    setSearched(true);
  };

  const showInterstitialAd = async () => {
    try {
      await AdMob.prepareInterstitial({ adId: adUnitId });
      await AdMob.showInterstitial();
    } catch(e) {}
  };

  const hasData = (bookId, ch) => {
    return !!savedChapters[bookId + "_" + ch];
  };

  const openChapter = async (book, ch, opts = {}) => {
    if (!book) return;
    const { targetPage, highlight } = opts;
    setRdrBook(book);
    setRdrCh(ch);
    setHighlightVerse(highlight || null);
    setTab("reader");

    const key = book.id + "_" + ch;
    let chapterVerses = savedChapters[key];

    if (!chapterVerses) {
      setVerses(null);
      setPageIdx(0);
      setLoadingError(null);
      try {
        chapterVerses = await fetchChapter(book.id, ch);
        setVerses(chapterVerses);
        const updated = { ...savedChapters, [key]: chapterVerses };
        setSavedChapters(updated);
        saveToCache(key, chapterVerses);
      } catch(e) {
        setLoadingError(book.id + "_" + ch);
        return;
      }
    } else {
      setVerses(chapterVerses);
      setLoadingError(null);
    }

    setPageIdx(targetPage !== undefined ? targetPage : 0);
  };

  // Navega para o livro+capítulo do versículo e destaca o versículo
  const [highlightVerse, setHighlightVerse] = useState(null);

  const navigateToVerse = async (ref) => {
    const clean = ref.trim();
    const match = clean.match(/^(.+?)\s+(\d+)[,.](\d+)$/);
    if (!match) return;
    const [, abbr, chStr, verseStr] = match;
    const ch = parseInt(chStr);
    const verseNum = parseInt(verseStr);
    const book = BOOKS.find(b =>
      b.abbr.toLowerCase() === abbr.trim().toLowerCase()
    );
    if (!book) return;

    // Ensure chapter data is loaded to calculate target page
    const key = book.id + "_" + ch;
    let vs = savedChapters[key];
    if (!vs) {
      try {
        vs = await fetchChapter(book.id, ch);
        const updated = { ...savedChapters, [key]: vs };
        setSavedChapters(updated);
        saveToCache(key, vs);
      } catch(e) { return; }
    }

    const PER = 8;
    const verseIdx = vs.findIndex(v => v.n === verseNum);
    const targetPage = verseIdx >= 0 ? Math.floor(verseIdx / PER) : 0;

    openChapter(book, ch, { targetPage, highlight: { bookId: book.id, ch, verseNum } });
  };

  // Navigate to next/prev chapter continuously
  const goChapter = async (dir) => {
    if (!rdrBook) return;
    const newCh = rdrCh + dir;
    if (newCh < 1 || newCh > rdrBook.chapters) return;
    await openChapter(rdrBook, newCh);
  };

  // Save entire book into savedChapters (localStorage)
  const saveBookOffline = async (book) => {
    if (savingBook) return;
    setSavingBook(true);
    setSaveProgress(0);
    const cache = { ...savedChapters };
    for (let ch = 1; ch <= book.chapters; ch++) {
      const key = book.id + "_" + ch;
      if (!cache[key]) {
        try {
          cache[key] = await fetchChapter(book.id, ch);
          saveToCache(key, cache[key]);
        } catch(e) {}
      }
      setSaveProgress(Math.round((ch / book.chapters) * 100));
      if (ch % 3 === 0) await new Promise(r => setTimeout(r, 0));
    }
    setSavedChapters(cache);
    setSavingBook(false);
    setSaveProgress(0);
  };

  const isBookSaved = (book) => {
    for (let ch = 1; ch <= book.chapters; ch++) {
      if (!savedChapters[book.id + "_" + ch]) return false;
    }
    return true;
  };

  // ── PAGINAÇÃO ──────────────────────────────────────────────────
  const PER_PAGE = 8;
  const pages = (() => {
    if (!verses) return [];
    const out = [];
    for (let i = 0; i < verses.length; i += PER_PAGE) out.push(verses.slice(i, i + PER_PAGE));
    return out;
  })();
  const totalPg = pages.length;

  const goPage = (dir) => {
    if (flipping) return;
    const next = pageIdx + dir;

    // Interstitial a cada 8 páginas
    if (dir !== 0) {
      const newCount = adPageCount + 1;
      setAdPageCount(newCount);
      if (newCount % 8 === 0) showInterstitialAd();
    }

    // Se passou da última página → vai para próximo capítulo
    if (next >= totalPg && rdrBook && rdrCh < rdrBook.chapters) {
      setFlipDir(1);
      setFlipping(true);
      setTimeout(() => {
        openChapter(rdrBook, rdrCh + 1);
        setFlipping(false); setFlipDir(0);
      }, 300);
      return;
    }
    // Se voltou antes da primeira página → vai para capítulo anterior
    if (next < 0 && rdrBook && rdrCh > 1) {
      setFlipDir(-1);
      setFlipping(true);
      setTimeout(() => {
        openChapter(rdrBook, rdrCh - 1);
        setFlipping(false); setFlipDir(0);
      }, 300);
      return;
    }
    if (next < 0 || next >= totalPg) return;
    setFlipDir(dir);
    setFlipping(true);
    setTimeout(() => { setPageIdx(next); setFlipping(false); setFlipDir(0); }, 300);
  };

  const onTS = (e) => { touchX.current = e.touches[0].clientX; touchY.current = e.touches[0].clientY; };
  const onTE = (e) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = e.changedTouches[0].clientY - touchY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) goPage(dx < 0 ? 1 : -1);
  };

  // ── DOWNLOAD ───────────────────────────────────────────────────
  const downloadChapter = async () => {
    if (!verses || !rdrBook) return;

    await showInterstitialAd();

    const COLS = 60;
    const wrapText = (text, indent) => {
      const words = text.split(" ");
      const wrapped = [];
      let cur = indent;
      words.forEach(w => {
        if (cur.length + w.length > COLS && cur.trim().length > 0) {
          wrapped.push(cur.trimEnd());
          cur = " ".repeat(indent.length) + w + " ";
        } else cur += w + " ";
      });
      if (cur.trim()) wrapped.push(cur.trimEnd());
      return wrapped;
    };

    const VPER = 8; // versículos por página
    const totalPgs = Math.ceil(verses.length / VPER);
    const border  = "╔" + "═".repeat(COLS + 2) + "╗";
    const borderB = "╚" + "═".repeat(COLS + 2) + "╝";
    const sep     = "─".repeat(COLS + 4);
    const padLine = (txt) => "║ " + txt + " ".repeat(Math.max(0, COLS - txt.length)) + " ║";

    const out = [];

    // Capa
    out.push(border);
    out.push(padLine(""));
    out.push(padLine("  ✝  BÍBLIA ONLINE"));
    out.push(padLine("     Bíblia Livre"));
    out.push(padLine(""));
    const titulo = rdrBook.name + "  —  Capítulo " + rdrCh;
    out.push(padLine("  " + titulo));
    out.push(padLine(""));
    out.push(borderB);
    out.push("");
    out.push("");

    // Páginas em sequência contínua
    for (let pg = 0; pg < totalPgs; pg++) {
      const slice = verses.slice(pg * VPER, (pg + 1) * VPER);

      // Cabeçalho da página
      out.push(sep);
      const pgLabel = rdrBook.name.toUpperCase() + "  ·  Cap. " + rdrCh + "  ·  Página " + (pg + 1) + " de " + totalPgs;
      out.push("  " + pgLabel);
      out.push(sep);
      out.push("");

      // Versículos
      slice.forEach(v => {
        const numStr = String(v.n).padStart(3, " ");
        const indent = numStr + "  ";
        const wrapped = wrapText(v.t, indent);
        wrapped.forEach(l => out.push(l));
        out.push("");
      });

      // Rodapé da página
      out.push("");
      if (pg < totalPgs - 1) {
        out.push("  · · ·  continua na próxima página  · · ·");
        out.push("");
        out.push("");
      }
    }

    // Rodapé final
    out.push(sep);
    out.push("  Fim de " + rdrBook.name + " — Capítulo " + rdrCh);
    out.push("  Gerado pelo App Bíblia Online");
    out.push(sep);

    const text = out.join("\n");
    // data URI funciona melhor no Android
    const encoded = encodeURIComponent(text);
    const a = document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encoded;
    a.download = rdrBook.abbr + "_cap" + rdrCh + ".txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 200);
  };



  // ── MINI COMPONENTS ────────────────────────────────────────────
  const ShareBtn = ({ v }) => (
    <button onClick={e=>{e.stopPropagation();shareVerse(v);}} title="Compartilhar"
      style={{background:"rgba(200,150,62,.08)",border:"1px solid rgba(200,150,62,.2)",borderRadius:"7px",padding:"5px 7px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <Share2 size={14} color="#c8963e" strokeWidth={2.5} />
    </button>
  );

  const SmallCard = ({ v }) => (
    <div style={{margin:"0 14px 8px",padding:"12px 13px",background:"rgba(255,255,255,.025)",border:"1px solid rgba(200,150,62,.1)",borderRadius:"8px",cursor:"pointer"}}
      onClick={()=>navigateToVerse(v.ref)}>
      <div style={{display:"flex",gap:"8px",alignItems:"flex-start"}}>
        <div style={{fontStyle:"italic",fontSize:".88rem",lineHeight:1.65,flex:1,color:"rgba(232,223,200,.83)"}}>{v.text}</div>
        <div style={{display:"flex",flexDirection:"column",gap:"4px",flexShrink:0}}>
          <button onClick={e=>{e.stopPropagation();toggleFav(v);}} style={{background:"none",border:"none",cursor:"pointer",display:"flex",padding:"3px"}}><Bookmark size={15} fill={isFav(v.ref)?"#c8963e":"none"} stroke={isFav(v.ref)?"#c8963e":"rgba(232,223,200,.36)"} /></button>
          <ShareBtn v={v}/>
        </div>
      </div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:".67rem",color:"rgba(200,150,62,.65)",marginTop:"5px"}}>{v.ref}</div>
    </div>
  );

  const Hdr = ({ title, sub, extra }) => (
    <div style={{padding:"17px 14px 12px",borderBottom:"1px solid rgba(200,150,62,.18)",background:"linear-gradient(180deg,rgba(200,150,62,.06),transparent)"}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:"1.22rem",fontWeight:700,color:"#c8963e"}}>✝ {title}</div>
      <div style={{fontSize:".7rem",color:"rgba(232,223,200,.4)",letterSpacing:".09em",marginTop:"2px"}}>{sub}{extra}</div>
    </div>
  );

  const Stit = ({ children }) => (
    <div style={{fontFamily:"'Cinzel',serif",fontSize:".67rem",color:"rgba(200,150,62,.6)",letterSpacing:".15em",padding:"12px 14px 7px"}}>{children}</div>
  );

  // ── SCREENS ────────────────────────────────────────────────────

  const Home = () => (
    <div>
      <Hdr title="Bíblia Online" sub="BÍBLIA LIVRE" />
      <div style={{margin:"16px 14px 12px",background:"linear-gradient(135deg,rgba(200,150,62,.11),rgba(180,120,40,.05))",border:"1px solid rgba(200,150,62,.23)",borderRadius:"12px",padding:"18px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-8px",left:"12px",fontSize:"4rem",color:"rgba(200,150,62,.07)",fontFamily:"serif",pointerEvents:"none"}}>❝</div>
        <div style={{display:"flex",alignItems:"center",gap:"6px",fontFamily:"'Cinzel',serif",fontSize:".6rem",color:"#c8963e",letterSpacing:".15em",marginBottom:"10px"}}><Sparkles size={14} /> VERSÍCULO DO DIA</div>
        <div style={{fontStyle:"italic",fontSize:".96rem",lineHeight:1.73,color:"#e8dfc8"}}>{vod.text}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:".7rem",color:"rgba(200,150,62,.78)",marginTop:"10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span>{vod.ref}</span>
          <button onClick={()=>toggleFav(vod)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",padding:"2px 4px"}}><Bookmark size={15} fill={isFav(vod.ref)?"#c8963e":"none"} stroke={isFav(vod.ref)?"#c8963e":"rgba(232,223,200,.36)"} /></button>
        </div>
      </div>
      <Stit>✦ ACESSO RÁPIDO</Stit>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",padding:"0 14px 6px"}}>
        {[{icon:SearchIcon,n:"Buscar",t:"busca"},{icon:BookOpen,n:"Ler a Bíblia",t:"biblia"},{icon:Church,n:"Missa Online",t:"missa"},{icon:HeartHandshake,n:"Orações",t:"oracoes"}].map(c=>(
          <div key={c.t} onClick={()=>setTab(c.t)} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(200,150,62,.14)",borderRadius:"10px",padding:"13px 12px",cursor:"pointer"}}>
            <div style={{marginBottom:"5px"}}><c.icon size={22} /></div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:".66rem",color:"#e8dfc8"}}>{c.n}</div>
          </div>
        ))}
      </div>
      <Stit>✦ LEITURAS RÁPIDAS</Stit>
      {[{b:BOOKS.find(b=>b.id==="sl"),c:23},{b:BOOKS.find(b=>b.id==="mt"),c:5},{b:BOOKS.find(b=>b.id==="jo"),c:3},{b:BOOKS.find(b=>b.id==="gn"),c:1}].map((r,i)=>(
        <div key={i} onClick={()=>openChapter(r.b,r.c)} style={{margin:"0 14px 8px",padding:"12px 13px",background:"rgba(255,255,255,.025)",border:"1px solid rgba(200,150,62,.1)",borderRadius:"8px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"6px",fontSize:".88rem",color:"rgba(232,223,200,.83)"}}><BookOpen size={16} /> {r.b.name} {r.c}</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:".63rem",color:"rgba(200,150,62,.55)",marginTop:"3px"}}>Disponível offline</div>
          </div>
          <ChevronRight size={18} color="rgba(200,150,62,.5)" />
        </div>
      ))}
      <Stit>✦ VERSÍCULOS POPULARES</Stit>
      {FEATURED_VERSES.slice(0,6).map((v,i)=><SmallCard key={i} v={v}/>)}
    </div>
  );

  const Search = () => (
    <div>
      <div style={{padding:"17px 14px 12px",borderBottom:"1px solid rgba(200,150,62,.18)",background:"linear-gradient(180deg,rgba(200,150,62,.06),transparent)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <SearchIcon size={22} />
          <div style={{fontFamily:"'Cinzel',serif",fontSize:"1.22rem",fontWeight:700,color:"#c8963e"}}>Buscar Versículos</div>
        </div>
        <div style={{fontSize:".7rem",color:"rgba(232,223,200,.4)",letterSpacing:".09em",marginTop:"2px"}}>PESQUISA INTELIGENTE · MAIS DE 37 VERSÍCULOS</div>
      </div>
      <div style={{padding:"13px 14px"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:"4px",background:"rgba(76,60,120,.2)",border:"1px solid rgba(140,110,220,.25)",borderRadius:"20px",padding:"3px 10px",fontSize:".6rem",color:"rgba(200,180,255,.65)",fontFamily:"'Cinzel',serif",letterSpacing:".05em",marginBottom:"9px"}}><BookOpen size={12} /> Busca inteligente offline</div>
        <div style={{display:"flex",gap:"8px"}}>
          <input style={{flex:1,background:"rgba(255,255,255,.05)",border:"1px solid rgba(200,150,62,.25)",borderRadius:"8px",padding:"11px 13px",color:"#e8dfc8",fontSize:"1rem",fontFamily:"'EB Garamond',serif",outline:"none"}}
            placeholder="fé, amor, paz, Jo 3,16..." value={query}
            onChange={e=>{setQuery(e.target.value);setSearched(false);}}
            onKeyDown={e=>e.key==="Enter"&&doSearch()} />
          <button onClick={doSearch} style={{background:"linear-gradient(135deg,#c8963e,#a07030)",border:"none",borderRadius:"8px",padding:"11px 15px",color:"#0d0b08",fontWeight:700,fontSize:"1rem",cursor:"pointer",display:"flex",alignItems:"center"}}><SearchIcon size={18} /></button>
        </div>
        <div style={{fontSize:".7rem",color:"rgba(232,223,200,.3)",marginTop:"6px"}}>Busque por tema, palavra ou referência (ex: Sl 23)</div>
      </div>
      {searched && results.length===0 && (
        <div style={{textAlign:"center",padding:"28px 18px",color:"rgba(232,223,200,.36)",fontSize:".87rem"}}>
          <div style={{marginBottom:"7px",display:"flex",justifyContent:"center"}}><Heart size={32} stroke="rgba(232,223,200,.36)" /></div>
          Nenhum resultado. Tente outro tema.
        </div>
      )}
      {results.length>0 && (
        <>
          <Stit>✦ RESULTADOS ({results.length})</Stit>
          <div style={{padding:"0 14px"}}>
            {results.map((v,i)=>(
              <div key={i} style={{marginBottom:"9px",background:"rgba(200,150,62,.06)",border:"1px solid rgba(200,150,62,.17)",borderRadius:"10px",padding:"15px",cursor:"pointer"}}
                onClick={()=>navigateToVerse(v.ref)}>
                <div style={{fontFamily:"'Cinzel',serif",color:"#c8963e",fontSize:".75rem",marginBottom:"7px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                    <span>{v.ref}</span>
                    <span style={{fontSize:".6rem",background:"rgba(200,150,62,.15)",border:"1px solid rgba(200,150,62,.3)",borderRadius:"10px",padding:"1px 7px",color:"rgba(200,150,62,.9)",letterSpacing:".05em"}}>→ IR</span>
                  </div>
          <button onClick={e=>{e.stopPropagation();toggleFav(v);}} style={{background:"none",border:"none",cursor:"pointer",display:"flex",padding:"3px"}}><Bookmark size={15} fill={isFav(v.ref)?"#c8963e":"none"} stroke={isFav(v.ref)?"#c8963e":"rgba(232,223,200,.36)"} /></button>
                </div>
                <div style={{fontStyle:"italic",fontSize:".92rem",lineHeight:1.7,color:"rgba(232,223,200,.88)"}}>{v.text}</div>
                <div style={{marginTop:"10px",display:"flex",justifyContent:"flex-end"}}>
                  <button onClick={e=>{e.stopPropagation();shareVerse(v);}}
                    style={{background:"rgba(200,150,62,.1)",border:"1px solid rgba(200,150,62,.25)",borderRadius:"8px",padding:"6px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",color:"#c8963e",fontFamily:"'Cinzel',serif",fontSize:".62rem",letterSpacing:".05em"}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8963e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    COMPARTILHAR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {!searched && (
        <>
          <Stit>✦ TEMAS POPULARES</Stit>
          <div style={{padding:"0 14px",display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"6px"}}>
            {["Amor","Fé","Esperança","Paz","Perdão","Força","Ansiedade","Confiança","Oração","Criação","Salvação","Misericórdia"].map(s=>(
              <button key={s} onClick={()=>{setQuery(s);setResults(searchVerses(s));setSearched(true);}}
                style={{background:"rgba(200,150,62,.09)",border:"1px solid rgba(200,150,62,.18)",borderRadius:"20px",padding:"5px 12px",color:"rgba(232,223,200,.65)",fontSize:".78rem",cursor:"pointer",fontFamily:"'EB Garamond',serif"}}>{s}</button>
            ))}
          </div>
          <Stit>✦ VERSÍCULOS POPULARES</Stit>
          {FEATURED_VERSES.map((v,i)=><SmallCard key={i} v={v}/>)}
        </>
      )}
    </div>
  );

  const Bible = () => {
    const atBooks = BOOKS.filter(b=>b.testament==="AT"&&(bfilt==="ALL"||bfilt==="AT"));
    const ntBooks = BOOKS.filter(b=>b.testament==="NT"&&(bfilt==="ALL"||bfilt==="NT"));
    const BookRow = ({b}) => (
      <div onClick={()=>setSelBook(b)} style={{display:"flex",alignItems:"center",padding:"11px 0",borderBottom:"1px solid rgba(200,150,62,.07)",cursor:"pointer"}}>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:".7rem",color:"#c8963e",width:"42px",flexShrink:0}}>{b.abbr}</span>
        <span style={{fontSize:".92rem",color:"#e8dfc8",flex:1}}>{b.name}</span>
        <span style={{fontSize:".68rem",color:"rgba(232,223,200,.3)"}}>{b.chapters} cap.</span>
        <span style={{color:"rgba(200,150,62,.38)",marginLeft:"7px",fontSize:".88rem"}}>›</span>
      </div>
    );
    return (
      <div>
        <Hdr title="Bíblia Sagrada" sub="BÍBLIA ONLINE · 66 LIVROS · " extra={<span style={{color:"rgba(140,220,140,.75)"}}>● SALVO</span>} />
        <div style={{display:"flex",gap:"6px",padding:"9px 14px",flexWrap:"wrap"}}>
          {[["ALL","Todos"],["AT","Antigo Testamento"],["NT","Novo Testamento"]].map(([f,l])=>(
            <button key={f} onClick={()=>setBfilt(f)}
              style={{background:bfilt===f?"rgba(200,150,62,.14)":"none",border:"1px solid rgba(200,150,62,"+(bfilt===f?".5":".18")+")",borderRadius:"20px",padding:"5px 12px",color:bfilt===f?"#c8963e":"rgba(232,223,200,.45)",fontSize:".68rem",cursor:"pointer",fontFamily:"'Cinzel',serif",letterSpacing:".03em"}}>{l}</button>
          ))}
        </div>
        <div style={{padding:"0 14px"}}>
          {atBooks.length>0&&<div style={{fontFamily:"'Cinzel',serif",fontSize:".6rem",color:"rgba(200,150,62,.45)",letterSpacing:".2em",padding:"9px 0 3px"}}>ANTIGO TESTAMENTO</div>}
          {atBooks.map(b=><BookRow key={b.id} b={b}/>)}
          {ntBooks.length>0&&<div style={{fontFamily:"'Cinzel',serif",fontSize:".6rem",color:"rgba(200,150,62,.45)",letterSpacing:".2em",padding:"13px 0 3px"}}>NOVO TESTAMENTO</div>}
          {ntBooks.map(b=><BookRow key={b.id} b={b}/>)}
        </div>
        {selBook && (
          <div onClick={()=>setSelBook(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.74)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
            <div onClick={e=>e.stopPropagation()} style={{background:"#141008",border:"1px solid rgba(200,150,62,.24)",borderRadius:"16px 16px 0 0",padding:"18px",width:"100%",maxWidth:"420px",maxHeight:"62vh",overflowY:"auto"}}>
              <div style={{display:"flex",alignItems:"center",gap:"6px",fontFamily:"'Cinzel',serif",color:"#c8963e",fontSize:".9rem",marginBottom:"13px"}}><BookOpen size={18} /> {selBook.name} — Escolha o capítulo</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"6px"}}>
                {Array.from({length:selBook.chapters},(_,i)=>i+1).map(ch=>(
                  <button key={ch} onClick={()=>openChapter(selBook,ch)}
                    style={{background:hasData(selBook.id,ch)?"rgba(200,150,62,.1)":"rgba(255,255,255,.04)",border:"1px solid rgba(200,150,62,"+(hasData(selBook.id,ch)?".45":".14")+")",borderRadius:"6px",padding:"10px 4px",color:hasData(selBook.id,ch)?"#c8963e":"#e8dfc8",fontSize:".87rem",cursor:"pointer",fontFamily:"'Cinzel',serif"}}>{ch}</button>
                ))}
              </div>
              <div style={{fontSize:".6rem",color:"rgba(140,220,140,.65)",marginTop:"10px",textAlign:"center",fontFamily:"'Cinzel',serif",letterSpacing:".08em"}}>● DOURADO = capítulo já salvo no seu dispositivo</div>
              <button onClick={()=>setSelBook(null)} style={{display:"block",width:"100%",marginTop:"12px",padding:"10px",background:"none",border:"1px solid rgba(200,150,62,.18)",borderRadius:"8px",color:"rgba(232,223,200,.43)",cursor:"pointer",fontFamily:"'EB Garamond',serif",fontSize:".88rem"}}>Fechar</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const Reader = () => {
    const pg = pages[pageIdx] || [];
    const offline = hasData(rdrBook ? rdrBook.id : "", rdrCh);
    const gold = "#c8963e";

    return (
      <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#0d0b08",overflow:"hidden"}}>

        {/* ── Cabeçalho ── */}
        <div style={{padding:"11px 14px 10px",borderBottom:"1px solid rgba(200,150,62,.18)",background:"linear-gradient(180deg,rgba(200,150,62,.07),transparent)",display:"flex",alignItems:"center",gap:"9px",flexShrink:0}}>
          <button onClick={()=>{setTab("biblia");setPageIdx(0);}}
            style={{background:"none",border:"none",color:"rgba(200,150,62,.75)",cursor:"pointer",fontSize:"1.4rem",padding:"3px 5px",lineHeight:1}}>‹</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:".93rem",color:gold,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>
              {rdrBook ? rdrBook.name : ""} {rdrCh}
            </div>
            <div style={{fontSize:".6rem",color:"rgba(232,223,200,.3)"}}>Bíblia Online · Bíblia Livre</div>
          </div>
          {offline && (
            <span style={{background:"rgba(60,120,60,.2)",border:"1px solid rgba(80,180,80,.24)",borderRadius:"20px",padding:"2px 7px",fontSize:".54rem",color:"rgba(140,220,140,.8)",fontFamily:"'Cinzel',serif",flexShrink:0}}>● SALVO</span>
          )}
          {/* Botão baixar capítulo */}
          <button onClick={downloadChapter} title="Baixar capítulo como .txt"
            style={{background:"rgba(200,150,62,.12)",border:"1px solid rgba(200,150,62,.3)",borderRadius:"8px",padding:"7px 12px",color:gold,cursor:"pointer",display:"flex",alignItems:"center",gap:"5px",fontFamily:"'Cinzel',serif",flexShrink:0}}>
            <span style={{fontSize:"1rem"}}><Download size={18} /></span>
            <span style={{fontSize:".6rem",letterSpacing:".05em"}}>TXT</span>
          </button>
        </div>

        {/* ── Área da página ── */}
        <div style={{flex:1,position:"relative",overflow:"hidden",display:"flex",flexDirection:"column"}}
          onTouchStart={onTS} onTouchEnd={onTE}>

          {/* Sombras laterais (efeito livro) */}
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:"20px",background:"linear-gradient(to right,rgba(0,0,0,.5),transparent)",zIndex:3,pointerEvents:"none"}}/>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:"20px",background:"linear-gradient(to left,rgba(0,0,0,.4),transparent)",zIndex:3,pointerEvents:"none"}}/>
          {/* Vinco central */}
          <div style={{position:"absolute",left:"50%",top:"5%",bottom:"5%",width:"1px",background:"rgba(200,150,62,.07)",zIndex:2,pointerEvents:"none"}}/>

          {/* Conteúdo da página */}
          {verses ? (
            <div style={{
              flex:1,overflowY:"auto",padding:"18px 22px 12px",
              transform:flipping?(flipDir>0?"translateX(-8px) scale(.985)":"translateX(8px) scale(.985)"):"translateX(0) scale(1)",
              opacity:flipping?0.45:1,
              transition:flipping?"transform .28s ease-out,opacity .28s":"transform .18s ease-in,opacity .18s",
            }}>
              {/* Título no topo da página */}
              <div style={{textAlign:"center",fontFamily:"'Cinzel',serif",fontSize:".58rem",color:"rgba(200,150,62,.42)",letterSpacing:".18em",marginBottom:"16px",borderBottom:"1px solid rgba(200,150,62,.09)",paddingBottom:"9px"}}>
                {rdrBook ? rdrBook.name.toUpperCase() : ""} &nbsp;·&nbsp; CAP. {rdrCh}
              </div>

              {pg.map(v => {
                const isHL = highlightVerse &&
                  highlightVerse.bookId === (rdrBook ? rdrBook.id : null) &&
                  highlightVerse.ch === rdrCh &&
                  highlightVerse.verseNum === v.n;
                return (
                  <div key={v.n} style={{display:"flex",gap:"10px",marginBottom:"14px",borderRadius:"6px",padding:isHL?"8px 7px":"2px 0",background:isHL?"rgba(200,150,62,.13)":"transparent",border:isHL?"1px solid rgba(200,150,62,.38)":"1px solid transparent",transition:"all .4s"}}>
                    <span style={{fontFamily:"'Cinzel',serif",fontSize:".63rem",color:isHL?"#c8963e":"rgba(200,150,62,.52)",minWidth:"15px",paddingTop:"4px",flexShrink:0,lineHeight:1,fontWeight:isHL?"700":"400"}}>{v.n}</span>
                    <span style={{fontSize:"1rem",lineHeight:1.85,color:isHL?"#f5ead0":"#e8dfc8",flex:1,textAlign:"justify"}}>{v.t}</span>
                  </div>
                );
              })}

              <div style={{textAlign:"center",color:"rgba(200,150,62,.18)",fontSize:".75rem",marginTop:"10px",letterSpacing:".35em"}}>✦ ✦ ✦</div>
            </div>
          ) : loadingError === (rdrBook ? rdrBook.id + "_" + rdrCh : null) ? (
            <div style={{textAlign:"center",padding:"36px 20px",color:"rgba(200,150,62,.55)",fontFamily:"'Cinzel',serif",fontSize:".78rem",letterSpacing:".1em"}}>
              <div style={{fontSize:"2rem",marginBottom:"9px"}}>✕</div>
              <div style={{color:"rgba(232,223,200,.5)",marginBottom:"14px",fontSize:".85rem"}}>Erro ao carregar capítulo</div>
              <button onClick={()=>openChapter(rdrBook, rdrCh)}
                style={{background:"rgba(200,150,62,.15)",border:"1px solid rgba(200,150,62,.35)",borderRadius:"8px",padding:"10px 20px",color:gold,cursor:"pointer",fontFamily:"'Cinzel',serif",fontSize:".7rem",letterSpacing:".05em"}}>
                TENTAR NOVAMENTE
              </button>
            </div>
          ) : (
            <div style={{textAlign:"center",padding:"36px",color:"rgba(200,150,62,.55)",fontFamily:"'Cinzel',serif",fontSize:".78rem",letterSpacing:".1em"}}>
              <div style={{display:"inline-block",width:"21px",height:"21px",border:"2px solid rgba(200,150,62,.2)",borderTopColor:gold,borderRadius:"50%",animation:"spin .8s linear infinite",marginBottom:"9px"}}/>
              <br/>Carregando...
            </div>
          )}
        </div>

        {/* ── Rodapé de navegação ── */}
        {verses && totalPg > 0 && (
          <div style={{flexShrink:0,background:"rgba(7,5,2,.95)",borderTop:"1px solid rgba(200,150,62,.1)",padding:"9px 14px 14px"}}>
            {/* Barra de progresso do capítulo no livro */}
            <div style={{height:"2px",background:"rgba(200,150,62,.1)",borderRadius:"2px",marginBottom:"9px",overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:"2px",background:"linear-gradient(to right,rgba(200,150,62,.4),rgba(200,150,62,.8))",width:(rdrBook?(rdrCh/rdrBook.chapters*100):0)+"%",transition:"width .3s"}}/>
            </div>

            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"8px"}}>
              {/* Botão anterior */}
              <button onClick={()=>goPage(-1)}
                disabled={pageIdx===0 && (!rdrBook || rdrCh<=1)}
                style={{background:(pageIdx===0&&rdrCh<=1)?"rgba(255,255,255,.02)":"rgba(200,150,62,.1)",border:"1px solid rgba(200,150,62,"+((pageIdx===0&&rdrCh<=1)?".1":".28")+")",borderRadius:"8px",padding:"9px 0",color:(pageIdx===0&&rdrCh<=1)?"rgba(232,223,200,.18)":gold,cursor:(pageIdx===0&&rdrCh<=1)?"default":"pointer",fontFamily:"'Cinzel',serif",fontSize:".72rem",width:"68px",transition:"all .2s",flexShrink:0}}>
                {pageIdx===0 && rdrCh>1 ? "‹ Cap."+(rdrCh-1) : "‹ Ant."}
              </button>

              {/* Centro: cap X de total + bolinhas de página */}
              <div style={{textAlign:"center",flex:1,minWidth:0}}>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:".6rem",color:"rgba(200,150,62,.7)",letterSpacing:".08em",marginBottom:"2px"}}>
                  Cap. {rdrCh} {rdrBook ? "de "+rdrBook.chapters : ""}
                </div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:".55rem",color:"rgba(200,150,62,.4)",letterSpacing:".06em",marginBottom:"5px"}}>
                  pág. {pageIdx+1}/{totalPg}
                </div>
                <div style={{display:"flex",gap:"4px",justifyContent:"center"}}>
                  {Array.from({length:Math.min(totalPg,9)}).map((_,i)=>{
                    const target = totalPg<=9 ? i : Math.round(i*(totalPg-1)/8);
                    const active = totalPg<=9 ? i===pageIdx : target===pageIdx;
                    return (
                      <div key={i}
                        onClick={()=>{if(!flipping&&totalPg<=9)goPage(i-pageIdx);}}
                        style={{width:active?"16px":"5px",height:"5px",borderRadius:"3px",background:active?gold:"rgba(200,150,62,.22)",transition:"all .3s",cursor:"pointer"}}/>
                    );
                  })}
                </div>
              </div>

              {/* Botão próximo */}
              <button onClick={()=>goPage(1)}
                disabled={pageIdx===totalPg-1 && rdrBook && rdrCh>=rdrBook.chapters}
                style={{background:(pageIdx===totalPg-1&&rdrBook&&rdrCh>=rdrBook.chapters)?"rgba(255,255,255,.02)":"rgba(200,150,62,.1)",border:"1px solid rgba(200,150,62,"+((pageIdx===totalPg-1&&rdrBook&&rdrCh>=rdrBook.chapters)?".1":".28")+")",borderRadius:"8px",padding:"9px 0",color:(pageIdx===totalPg-1&&rdrBook&&rdrCh>=rdrBook.chapters)?"rgba(232,223,200,.18)":gold,cursor:(pageIdx===totalPg-1&&rdrBook&&rdrCh>=rdrBook.chapters)?"default":"pointer",fontFamily:"'Cinzel',serif",fontSize:".72rem",width:"68px",transition:"all .2s",flexShrink:0}}>
                {pageIdx===totalPg-1 && rdrBook && rdrCh<rdrBook.chapters ? "Cap."+(rdrCh+1)+" ›" : "Próx. ›"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const Missa = () => (
    <div>
      <Hdr title="Missa Online" sub="TRANSMISSÕES AO VIVO · LITURGIA DIÁRIA" />
      <div style={{margin:"13px",padding:"13px",background:"rgba(200,150,62,.07)",border:"1px solid rgba(200,150,62,.17)",borderRadius:"10px",fontSize:".83rem",lineHeight:1.65,color:"rgba(232,223,200,.65)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"6px"}}><Heart size={18} /> Toque num canal para assistir à Missa ao vivo. Requer conexão com internet.</div>
      </div>
      <Stit>✦ CANAIS CATÓLICOS AO VIVO</Stit>
      {MISSA_LINKS.map((m,i)=>(
        <a key={i} href={m.url} target="_blank" rel="noopener noreferrer"
          style={{margin:"0 14px 9px",background:"rgba(255,255,255,.03)",border:"1px solid rgba(200,150,62,.14)",borderRadius:"11px",padding:"15px",display:"flex",alignItems:"center",gap:"12px",cursor:"pointer",textDecoration:"none"}}>
          <span style={{fontSize:"1.8rem"}}>{m.icon}</span>
          <div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:".8rem",color:"#e8dfc8",marginBottom:"3px"}}>{m.title}</div>
            <div style={{fontSize:".71rem",color:"rgba(232,223,200,.4)"}}>{m.desc}</div>
          </div>
          <ChevronRight size={18} color="rgba(200,150,62,.44)" />
        </a>
      ))}
      <Stit>✦ EVANGELHO DO DIA</Stit>
      <div style={{margin:"0 14px 14px",background:"linear-gradient(135deg,rgba(200,150,62,.1),rgba(180,120,40,.04))",border:"1px solid rgba(200,150,62,.22)",borderRadius:"11px",padding:"17px"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:".6rem",color:"#c8963e",marginBottom:"9px"}}>LEITURA DO DIA</div>
        <div style={{fontStyle:"italic",fontSize:".93rem",lineHeight:1.73,color:"rgba(232,223,200,.85)"}}>{vod.text}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:".7rem",color:"rgba(200,150,62,.7)",marginTop:"9px",textAlign:"right"}}>{vod.ref}</div>
      </div>
    </div>
  );

  const Oracoes = () => (
    <div>
      <Hdr title="Orações" sub="TRADIÇÃO CATÓLICA · " extra={<span style={{color:"rgba(140,220,140,.75)"}}>● SALVO</span>} />
      <div style={{padding:"0 14px"}}>
        {PRAYERS.map((p,i)=>(
          <div key={i}>
            <div onClick={()=>setOpenPrayer(openPrayer===i?null:i)}
              style={{padding:"13px 0",borderBottom:"1px solid rgba(200,150,62,.09)",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:"6px"}}><HeartHandshake size={18} /> <span style={{fontFamily:"'Cinzel',serif",fontSize:".87rem",color:"#e8dfc8"}}>{p.title}</span></div>
              <span style={{color:"rgba(200,150,62,.48)",fontSize:".87rem"}}>{openPrayer===i?"▲":"▼"}</span>
            </div>
            {openPrayer===i && (
              <div style={{background:"rgba(200,150,62,.06)",borderLeft:"3px solid rgba(200,150,62,.38)",borderRadius:"0 8px 8px 0",padding:"13px",margin:"5px 0 13px",whiteSpace:"pre-line",fontSize:".91rem",lineHeight:1.83,color:"rgba(232,223,200,.83)",fontStyle:"italic"}}>
                {p.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const Evang = () => (
    <div>
      <Hdr title="Evangelização" sub="CRESCER NA FÉ CADA DIA" />
      <Stit>✦ REFLEXÃO DO DIA</Stit>
      <div style={{margin:"0 14px 4px",background:"linear-gradient(135deg,rgba(123,111,160,.13),rgba(100,80,140,.06))",border:"1px solid rgba(123,111,160,.2)",borderRadius:"11px",padding:"17px"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:".6rem",color:"rgba(180,160,220,.65)",letterSpacing:".15em",marginBottom:"9px"}}>✦ MEDITAÇÃO ✦</div>
        <div style={{fontStyle:"italic",fontSize:".98rem",lineHeight:1.76,color:"#e8dfc8"}}>"{refl}"</div>
      </div>
      <Stit>✦ RECURSOS</Stit>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",padding:"0 14px 13px"}}>
        {[{icon:Sparkles,n:"Reflexão Diária",c:"#c8963e",t:"home"},{icon:BookOpen,n:"Versículo Diário",c:"#7b6fa0",t:"busca"},{icon:Heart,n:"Orações",c:"#4a9b8e",t:"oracoes"},{icon:Church,n:"Missa Online",c:"#c06060",t:"missa"}].map((e,i)=>{
          const [r,g,b2] = [parseInt(e.c.slice(1,3),16),parseInt(e.c.slice(3,5),16),parseInt(e.c.slice(5,7),16)];
          return (
            <div key={i} onClick={()=>setTab(e.t)}
              style={{borderRadius:"10px",padding:"15px 12px",cursor:"pointer",border:`1px solid rgba(${r},${g},${b2},.24)`,background:`rgba(${r},${g},${b2},.11)`}}>
              <div style={{marginBottom:"6px"}}><e.icon size={26} /></div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:".67rem",color:"rgba(232,223,200,.87)"}}>{e.n}</div>
            </div>
          );
        })}
      </div>
      <Stit>✦ COMPARTILHAR A FÉ</Stit>
      {FEATURED_VERSES.map((v,i)=>(
        <div key={i} style={{margin:"0 14px 8px",padding:"12px 13px",background:"rgba(255,255,255,.025)",border:"1px solid rgba(200,150,62,.1)",borderRadius:"8px"}}>
          <div style={{display:"flex",gap:"8px",alignItems:"flex-start"}}>
            <div style={{fontStyle:"italic",fontSize:".88rem",lineHeight:1.65,flex:1,color:"rgba(232,223,200,.83)"}}>{v.text}</div>
            <button onClick={()=>shareVerse(v)}
              title="Compartilhar versículo"
              style={{background:"rgba(200,150,62,.1)",border:"1px solid rgba(200,150,62,.25)",borderRadius:"8px",cursor:"pointer",padding:"7px 9px",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",transition:"all .2s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(200,150,62,.22)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(200,150,62,.1)"}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8963e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              <span style={{fontSize:".5rem",color:"#c8963e",fontFamily:"'Cinzel',serif",letterSpacing:".03em"}}>COMPARTILHAR</span>
            </button>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"5px"}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:".67rem",color:"rgba(200,150,62,.65)"}}>{v.ref}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const Favs = () => (
    <div>
      <Hdr title="Favoritos" sub="SEUS VERSÍCULOS SALVOS · " extra={<span style={{color:"rgba(140,220,140,.75)"}}>● SALVO</span>} />
      {favs.length===0 ? (
        <div style={{textAlign:"center",padding:"50px 26px",color:"rgba(232,223,200,.26)"}}>
          <div style={{marginBottom:"10px",display:"flex",justifyContent:"center"}}><Bookmark size={40} stroke="rgba(232,223,200,.26)" /></div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:".76rem",letterSpacing:".1em"}}>Nenhum versículo salvo ainda</div>
          <div style={{fontSize:".75rem",marginTop:"7px"}}>Toque no ícone para salvar</div>
        </div>
      ) : (
        <div style={{padding:"0 14px"}}>
          {favs.map((v,i)=>(
            <div key={i} style={{padding:"12px 0",borderBottom:"1px solid rgba(200,150,62,.09)"}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:".7rem",color:"#c8963e",marginBottom:"5px",display:"flex",justifyContent:"space-between"}}>
                <span>{v.ref}</span>
                <button onClick={()=>toggleFav(v)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",padding:"3px"}}><Bookmark size={15} fill="#c8963e" stroke="#c8963e" /></button>
              </div>
              <div style={{fontStyle:"italic",fontSize:".89rem",lineHeight:1.65,color:"rgba(232,223,200,.82)"}}>{v.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ── TABS ───────────────────────────────────────────────────────
  const TABS = [
    {id:"home",label:"Início",icon:HomeIcon},
    {id:"busca",label:"Buscar",icon:SearchIcon},
    {id:"biblia",label:"Bíblia",icon:BookOpen},
    {id:"missa",label:"Missa",icon:Church},
    {id:"evang",label:"Missão",icon:Cross},
    {id:"favs",label:"Salvos",icon:Bookmark},
  ];

  const isReaderTab = tab==="reader";

  // ── TOAST ──────────────────────────────────────────────────────
  const ShareModal = () => shareModal ? (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}
      onClick={()=>setShareModal(null)}>
      <div style={{background:"#141008",border:"1px solid rgba(200,150,62,.3)",borderRadius:"20px 20px 0 0",padding:"20px 16px 32px",width:"100%",maxWidth:"420px"}}
        onClick={e=>e.stopPropagation()}>
        {/* Handle bar */}
        <div style={{width:"40px",height:"4px",background:"rgba(200,150,62,.3)",borderRadius:"2px",margin:"0 auto 18px"}}/>
        {/* Versículo preview */}
        <div style={{background:"rgba(200,150,62,.07)",border:"1px solid rgba(200,150,62,.18)",borderRadius:"10px",padding:"14px",marginBottom:"18px"}}>
          <div style={{fontStyle:"italic",fontSize:".88rem",lineHeight:1.65,color:"rgba(232,223,200,.85)",marginBottom:"8px"}}>"{shareModal.text}"</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:".68rem",color:"#c8963e"}}>— {shareModal.ref} · ✝ Bíblia Online</div>
        </div>
        {/* Botões de app */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"10px"}}>
          {/* WhatsApp */}
          <button onClick={()=>openWhatsApp(shareModal)}
            style={{background:"#25D366",border:"none",borderRadius:"12px",padding:"14px 10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",color:"#fff",fontWeight:"700",fontSize:".85rem"}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.857L.057 23.428a.75.75 0 00.916.914l5.671-1.471A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.953-1.355l-.355-.211-3.683.955.983-3.596-.232-.371A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
            WhatsApp
          </button>
          {/* Telegram */}
          <button onClick={()=>openTelegram(shareModal)}
            style={{background:"#0088cc",border:"none",borderRadius:"12px",padding:"14px 10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",color:"#fff",fontWeight:"700",fontSize:".85rem"}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.483c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.248 14.51l-2.938-.918c-.638-.2-.651-.638.136-.943l11.47-4.42c.532-.194.998.13.646.019z"/></svg>
            Telegram
          </button>
          {/* Copiar texto */}
          <button onClick={()=>doShare(shareModal)}
            style={{background:"rgba(200,150,62,.15)",border:"1px solid rgba(200,150,62,.35)",borderRadius:"12px",padding:"14px 10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",color:"#c8963e",fontFamily:"'Cinzel',serif",fontSize:".78rem",letterSpacing:".05em"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8963e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            COPIAR
          </button>
          {/* Mais apps */}
          <button onClick={()=>doShare(shareModal)}
            style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.12)",borderRadius:"12px",padding:"14px 10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",color:"rgba(232,223,200,.7)",fontFamily:"'Cinzel',serif",fontSize:".78rem",letterSpacing:".05em"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(232,223,200,.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            MAIS APPS
          </button>
        </div>
        <button onClick={()=>setShareModal(null)}
          style={{width:"100%",padding:"12px",background:"none",border:"1px solid rgba(200,150,62,.15)",borderRadius:"10px",color:"rgba(232,223,200,.45)",cursor:"pointer",fontFamily:"'Cinzel',serif",fontSize:".75rem",letterSpacing:".08em",marginTop:"4px"}}>
          CANCELAR
        </button>
      </div>
    </div>
  ) : null;

  const Toast = () => toast ? (
    <div style={{
      position:"fixed",bottom:"90px",left:"50%",transform:"translateX(-50%)",
      background:"rgba(20,15,8,.97)",border:"1px solid rgba(200,150,62,.4)",
      borderRadius:"12px",padding:"12px 20px",zIndex:999,
      display:"flex",alignItems:"center",gap:"10px",
      boxShadow:"0 4px 24px rgba(0,0,0,.6)",
      animation:"fadeInUp .3s ease",maxWidth:"340px",width:"90%",
    }}>
      <span style={{fontSize:"1.2rem"}}>{toast.icon}</span>
      <span style={{fontFamily:"'Cinzel',serif",fontSize:".72rem",color:"#e8dfc8",letterSpacing:".04em",lineHeight:1.4}}>{toast.msg}</span>
    </div>
  ) : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'EB Garamond',serif;background:#0d0b08;color:#e8dfc8}
        @keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeInUp{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:rgba(0,0,0,.2)}
        ::-webkit-scrollbar-thumb{background:rgba(200,150,62,.3);border-radius:3px}
      `}</style>
      <div style={{maxWidth:"420px",margin:"0 auto",minHeight:"100vh",background:"#0d0b08",position:"relative",overflow:"hidden"}}>
        <div style={{position:"fixed",inset:0,maxWidth:"420px",background:"radial-gradient(ellipse at 20% 0%,rgba(180,140,60,.12),transparent 60%),radial-gradient(ellipse at 80% 100%,rgba(100,60,160,.10),transparent 60%)",pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"relative",zIndex:1,paddingBottom:isReaderTab?0:"76px"}}>
          {tab==="home"    && <Home/>}
          {tab==="busca"   && <Search/>}
          {tab==="biblia"  && <Bible/>}
          {tab==="reader"  && <Reader/>}
          {tab==="missa"   && <Missa/>}
          {tab==="oracoes" && <Oracoes/>}
          {tab==="evang"   && <Evang/>}
          {tab==="favs"    && <Favs/>}
        </div>
        <ShareModal/>
        <Toast/>
        {!isReaderTab && (
          <div style={{display:"flex",background:"rgba(10,8,4,.97)",borderTop:"1px solid rgba(200,150,62,.14)",position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"420px",zIndex:100}}>
            {TABS.map(t=>(
              <button key={t.id}
                onClick={()=>setTab(t.id)}
                style={{flex:1,padding:"8px 2px 6px",background:"none",border:"none",color:tab===t.id?"#c8963e":"rgba(232,223,200,.36)",fontSize:".57rem",letterSpacing:".03em",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"3px",fontFamily:"'EB Garamond',serif",transition:"color .2s"}}>
                <t.icon size={18} strokeWidth={1.5}/>{t.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
