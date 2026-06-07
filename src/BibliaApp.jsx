import { useState, useEffect, useRef } from 'react';

const BIBLE_DATA = {
  gn: {
    1: [{n:1,t:"No princípio, Deus criou o céu e a terra."},{n:2,t:"A terra era informe e vazia; as trevas cobriam o abismo e o Espírito de Deus pairava sobre as águas."},{n:3,t:"Deus disse: 'Haja luz!' E houve luz."},{n:4,t:"Deus viu que a luz era boa e a separou das trevas."},{n:5,t:"Deus chamou à luz 'dia' e às trevas 'noite'. Assim, houve tarde e manhã: esse foi o primeiro dia."},{n:6,t:"Deus disse: 'Haja um firmamento no meio das águas para separar as águas das águas!'"},{n:7,t:"Deus fez o firmamento e separou as águas que estão abaixo do firmamento das que estão acima. E assim se fez."},{n:8,t:"Deus chamou ao firmamento 'céu'. Houve tarde e manhã: esse foi o segundo dia."},{n:9,t:"Deus disse: 'Que as águas debaixo do céu se ajuntem num só lugar e que apareça a terra firme!' E assim se fez."},{n:10,t:"Deus chamou à terra seca 'terra' e ao conjunto das águas 'mar'. E Deus viu que isso era bom."},{n:11,t:"Deus disse: 'Que a terra produza vegetação: ervas que produzem sementes e árvores frutíferas que deem, segundo sua espécie, fruto com sementes na terra!' E assim se fez."},{n:12,t:"A terra produziu vegetação: ervas que produzem sementes segundo sua espécie e árvores que dão fruto com semente segundo sua espécie. Deus viu que isso era bom."},{n:13,t:"Houve tarde e manhã: esse foi o terceiro dia."},{n:14,t:"Deus disse: 'Haja luminárias no firmamento do céu para separar o dia da noite; que elas sirvam de sinais para as festas, os dias e os anos.'"},{n:15,t:"Que elas sirvam de luminárias no firmamento do céu para iluminar a terra!' E assim se fez."},{n:16,t:"Deus fez as duas grandes luminárias — a maior para governar o dia e a menor para governar a noite — e as estrelas."},{n:17,t:"Deus as colocou no firmamento do céu para iluminar a terra,"},{n:18,t:"para governar o dia e a noite e separar a luz das trevas. Deus viu que isso era bom."},{n:19,t:"Houve tarde e manhã: esse foi o quarto dia."},{n:20,t:"Deus disse: 'Que as águas se encham de seres viventes e voem pássaros acima da terra, pelo firmamento do céu!'"},{n:21,t:"Deus criou os grandes monstros marinhos, todos os seres viventes e móveis com que as águas se encheram segundo sua espécie, e todas as aves aladas segundo sua espécie. Deus viu que isso era bom."},{n:22,t:"Deus os abençoou, dizendo: 'Sede fecundos e multiplicai-vos, enchei as águas dos mares, e que as aves se multipliquem na terra!'"},{n:23,t:"Houve tarde e manhã: esse foi o quinto dia."},{n:24,t:"Deus disse: 'Que a terra produza seres viventes segundo sua espécie: animais domésticos, répteis e feras segundo sua espécie!' E assim se fez."},{n:25,t:"Deus fez as feras segundo sua espécie, os animais domésticos segundo sua espécie e todos os répteis da terra segundo sua espécie. Deus viu que isso era bom."},{n:26,t:"Deus disse: 'Façamos o ser humano à nossa imagem, como nossa semelhança, e que eles dominem sobre os peixes do mar, as aves do céu, os animais domésticos e todos os répteis que rastejam sobre a terra!'"},{n:27,t:"Deus criou o ser humano à sua imagem, à imagem de Deus ele o criou; homem e mulher ele os criou."},{n:28,t:"Deus os abençoou e lhes disse: 'Sede fecundos e multiplicai-vos, enchei a terra e a submetei; dominai sobre os peixes do mar, as aves do céu e todos os animais que rastejam sobre a terra!'"},{n:29,t:"Deus disse: 'Eu vos dou todas as ervas que produzem sementes sobre a face da terra, e todas as árvores que têm frutos com sementes: isso será vosso alimento.'"},{n:30,t:"A todos os animais da terra, a todas as aves do céu e a todos os seres que rastejam sobre a terra e que têm vida, dou toda a erva verde como alimento.' E assim se fez."},{n:31,t:"Deus viu tudo o que tinha feito: e era muito bom. Houve tarde e manhã: esse foi o sexto dia."}],
    2: [{n:1,t:"Assim foram concluídos o céu e a terra com todo o seu conjunto."},{n:2,t:"No sétimo dia, Deus tinha concluído o trabalho que fizera e descansou no sétimo dia de todo o trabalho que fizera."},{n:3,t:"Deus abençoou o sétimo dia e o santificou, porque nele descansou de todo o trabalho que fizera na criação."},{n:4,t:"Eis a história do céu e da terra quando foram criados. Quando o Senhor Deus fez o céu e a terra,"},{n:5,t:"não havia ainda nenhum arbusto da estepe sobre a terra, e nenhuma erva da estepe tinha ainda brotado, porque o Senhor Deus não tinha feito chover sobre a terra e não havia nenhum homem para cultivá-la."},{n:6,t:"Mas um manancial subia da terra e regava toda a superfície do solo."},{n:7,t:"O Senhor Deus modelou o homem com argila do solo, soprou-lhe nas narinas um sopro de vida, e o homem tornou-se um ser vivente."},{n:8,t:"O Senhor Deus plantou um jardim no Éden, no oriente, e colocou lá o homem que modelara."},{n:9,t:"O Senhor Deus fez crescer do solo todo tipo de árvore agradável ao aspecto e boa para comer, e a árvore da vida, no meio do jardim, e a árvore do conhecimento do bem e do mal."},{n:10,t:"Um rio saía do Éden para regar o jardim e, de lá, dividia-se em quatro braços."},{n:15,t:"O Senhor Deus tomou o homem e o pôs no jardim do Éden para cultivá-lo e guardá-lo."},{n:16,t:"O Senhor Deus deu esta ordem ao homem: 'Podes comer de todas as árvores do jardim.'"},{n:17,t:"'Mas não comerás da árvore do conhecimento do bem e do mal, porque no dia em que dela comeres terás de morrer!'"},{n:18,t:"O Senhor Deus disse: 'Não é bom que o homem esteja só. Vou fazer para ele uma auxiliar que lhe corresponda.'"},{n:21,t:"O Senhor Deus fez cair um sono profundo sobre o homem, e este adormeceu. Então, tomou uma de suas costelas e fechou a carne no lugar dela."},{n:22,t:"O Senhor Deus construiu uma mulher com a costela que tirara do homem e a trouxe ao homem."},{n:23,t:"O homem exclamou: 'Finalmente! Esta é osso dos meus ossos e carne da minha carne! Chamar-se-á mulher, porque do homem foi tirada!'"},{n:24,t:"Por isso, o homem abandona seu pai e sua mãe para se unir à sua mulher, e os dois se tornam uma só carne."},{n:25,t:"Ora, os dois estavam nus, o homem e sua mulher, mas não sentiam vergonha."}],
    3: [{n:1,t:"A serpente era o mais astuto de todos os animais dos campos que o Senhor Deus tinha feito. Ela disse à mulher: 'Então, Deus disse que não podeis comer de nenhuma árvore do jardim?'"},{n:2,t:"A mulher respondeu à serpente: 'Podemos comer do fruto das árvores do jardim.'"},{n:3,t:"'Mas do fruto da árvore que está no meio do jardim, Deus disse: não comereis dele nem o tocareis, para que não morrais.'"},{n:4,t:"A serpente disse à mulher: 'Não, não morrereis!'"},{n:5,t:"'Na verdade, Deus sabe que, no dia em que dele comerdes, vossos olhos se abrirão e sereis como deuses, que conhecem o bem e o mal.'"},{n:6,t:"A mulher viu que a árvore era boa de comer e agradável de ver, e que era desejável para se alcançar a sabedoria. Tomou do seu fruto, comeu e deu também a seu marido, que estava com ela, e ele também comeu."},{n:7,t:"Os olhos dos dois se abriram, e perceberam que estavam nus. Entrelaçaram folhas de figueira e fizeram cintas para si."},{n:8,t:"Ouviram o Senhor Deus que passeava no jardim à hora da brisa da tarde. O homem e sua mulher esconderam-se da presença do Senhor Deus entre as árvores do jardim."},{n:9,t:"O Senhor Deus chamou o homem e disse: 'Onde estás?'"},{n:10,t:"Ele respondeu: 'Ouvi o teu passo no jardim e fiquei com medo porque estou nu; por isso, me escondi.'"},{n:15,t:"'Porei inimizade entre ti e a mulher, entre tua descendência e a dela. Ela te esmagará a cabeça e tu lhe ferirás o calcanhar.'"}],
  },
  sl: {
    1: [{n:1,t:"Feliz o homem que não segue o conselho dos ímpios, não se detém no caminho dos pecadores, não se assenta na roda dos zombadores,"},{n:2,t:"mas tem prazer na lei do Senhor e a medita dia e noite."},{n:3,t:"É como árvore plantada à beira das águas correntes, que dá fruto no tempo oportuno e tem folhagem que não murcha. Tudo quanto faz tem bom êxito."},{n:4,t:"Não assim os ímpios: eles são como a palha que o vento dispersa."},{n:5,t:"Por isso, os ímpios não resistirão no julgamento, nem os pecadores na assembleia dos justos."},{n:6,t:"O Senhor conhece o caminho dos justos, mas o caminho dos ímpios leva à perdição."}],
    22: [{n:1,t:"Meu Deus, meu Deus, por que me abandonaste? Por que te manténs tão longe de minha salvação, longe dos meus gritos de agonia?"},{n:2,t:"Meu Deus, clamo de dia e não me respondes; clamo de noite e não há sossego para mim."},{n:3,t:"Mas tu és o Santo, o louvor de Israel é o teu trono."},{n:4,t:"Nossos pais confiaram em ti; confiaram, e tu os salvaste."},{n:14,t:"Sou como água que se derrama, todos os meus ossos estão desconjuntados; meu coração é como cera que se derrete."},{n:18,t:"Repartem entre si as minhas vestes e lançam sortes sobre a minha túnica."}],
    23: [{n:1,t:"O Senhor é o meu pastor: nada me faltará."},{n:2,t:"Em prados verdejantes ele me faz repousar. Conduz-me às águas refrescantes."},{n:3,t:"Restaura as minhas forças. Pelo seu nome, guia-me por caminhos de retidão."},{n:4,t:"Mesmo que eu caminhe pelo vale da sombra da morte, não temerei mal algum, porque estás comigo. Teu bordão e teu cajado me dão segurança."},{n:5,t:"Preparas para mim uma mesa em frente aos meus inimigos. Unges minha cabeça com óleo; meu cálice está transbordando."},{n:6,t:"Felicidade e graça me acompanharão todos os dias da minha vida. E habitarei na casa do Senhor por longos dias."}],
    51: [{n:1,t:"Misericórdia, ó Deus, por tua bondade, por tua imensa compaixão apaga o meu pecado!"},{n:2,t:"Lava-me completamente da minha culpa, purifica-me do meu pecado."},{n:3,t:"Pois reconheço meu crime, e o meu pecado está sempre diante de mim."},{n:4,t:"Pequei contra ti, somente contra ti, e fiz o que é mal a teus olhos."},{n:10,t:"Cria em mim um coração puro, ó Deus, renova em mim um espírito firme."},{n:11,t:"Não me rejeites de tua presença, não retires de mim o teu santo Espírito."},{n:12,t:"Devolve-me a alegria de ser salvo por ti, que um espírito generoso me sustente."},{n:17,t:"O sacrifício que te agrada é um espírito contrito; um coração contrito e humilde, ó Deus, não desprezarás."}],
    91: [{n:1,t:"Aquele que mora sob a proteção do Altíssimo e descansa à sombra do Todo-Poderoso"},{n:2,t:"pode dizer ao Senhor: 'Tu és meu refúgio e minha fortaleza, meu Deus em quem confio!'"},{n:3,t:"Ele te livrará do laço do caçador e da peste mortífera."},{n:4,t:"Ele te cobrirá com suas penas e sob suas asas encontrarás refúgio; sua fidelidade é escudo e armadura."},{n:5,t:"Não temerás o terror da noite, nem a flecha que voa de dia,"},{n:6,t:"nem a peste que avança nas trevas, nem a epidemia que grassa em pleno dia."},{n:11,t:"Pois ele ordenou aos seus anjos que te guardem em todos os teus caminhos."},{n:12,t:"Eles te sustentarão em suas mãos para que não tropeces em alguma pedra."},{n:14,t:"'Pois ele se apegou a mim, eu o livrarei; eu o protegerei porque ele conhece meu nome.'"},{n:15,t:"'Ele me invocará e eu o responderei; na tribulação, estarei com ele; vou libertá-lo e enchê-lo de glória.'"},{n:16,t:"'Saciá-lo-ei com longa vida e lhe farei ver a minha salvação.'"}],
    100: [{n:1,t:"Aclamai o Senhor, todas as nações da terra!"},{n:2,t:"Servi ao Senhor com alegria! Vinde à sua presença com jubilação!"},{n:3,t:"Sabei que o Senhor é Deus: ele nos fez e somos seus, somos seu povo, o rebanho de seu pasto."},{n:4,t:"Entrai por seus pórticos com ação de graças, em seus átrios com louvor! Rendei-lhe graças e bendizei o seu nome!"},{n:5,t:"Pois o Senhor é bom: sua misericórdia é eterna, e sua fidelidade, de geração em geração."}],
    121: [{n:1,t:"Elevo meus olhos para os montes: de onde me virá o socorro?"},{n:2,t:"O meu socorro vem do Senhor, que fez o céu e a terra."},{n:3,t:"Ele não deixará vacilar o teu pé; ele que te guarda não adormece."},{n:4,t:"Eis que não adormece nem dorme o guardião de Israel."},{n:5,t:"O Senhor é teu guardião, o Senhor é tua sombra, à tua direita."},{n:6,t:"De dia o sol não te ferirá, nem a lua de noite."},{n:7,t:"O Senhor te guardará de todo mal; ele guardará a tua alma."},{n:8,t:"O Senhor guardará a tua saída e a tua entrada, de agora e para sempre."}],
  },
  mt: {
    1: [{n:1,t:"Livro da genealogia de Jesus Cristo, filho de Davi, filho de Abraão."},{n:2,t:"Abraão gerou Isaque, Isaque gerou Jacó, Jacó gerou Judá e seus irmãos."},{n:16,t:"Jacó gerou José, o esposo de Maria, da qual nasceu Jesus, chamado Cristo."},{n:17,t:"Assim, de Abraão até Davi são catorze gerações; de Davi até a deportação para a Babilônia, catorze gerações; da deportação para a Babilônia até Cristo, catorze gerações."},{n:18,t:"Eis como aconteceu o nascimento de Jesus Cristo: Sua mãe, Maria, estava prometida em casamento a José e, antes de se unirem, ela se achou grávida pelo Espírito Santo."},{n:19,t:"José, seu marido, sendo justo e não querendo denunciá-la publicamente, resolveu repudiá-la em segredo."},{n:20,t:"Enquanto ele refletia nisso, o anjo do Senhor lhe apareceu em sonho, dizendo: 'José, filho de Davi, não temas tomar Maria como tua esposa, pois o que foi gerado nela vem do Espírito Santo.'"},{n:21,t:"'Ela dará à luz um filho e você lhe porá o nome de Jesus, porque ele salvará o seu povo dos seus pecados.'"},{n:23,t:"'A virgem conceberá e dará à luz um filho, e lhe porão o nome de Emanuel', que significa: Deus conosco."},{n:24,t:"Acordado do sono, José fez como o anjo do Senhor lhe havia ordenado e tomou Maria como sua esposa."},{n:25,t:"E não a conheceu até ela dar à luz um filho, ao qual ele pôs o nome de Jesus."}],
    5: [{n:1,t:"Vendo as multidões, Jesus subiu ao monte. E tendo-se sentado, seus discípulos aproximaram-se dele."},{n:2,t:"Então abriu a boca e os ensinava, dizendo:"},{n:3,t:"'Bem-aventurados os pobres em espírito, porque deles é o Reino dos Céus.'"},{n:4,t:"'Bem-aventurados os que choram, porque serão consolados.'"},{n:5,t:"'Bem-aventurados os mansos, porque herdarão a terra.'"},{n:6,t:"'Bem-aventurados os que têm fome e sede de justiça, porque serão saciados.'"},{n:7,t:"'Bem-aventurados os misericordiosos, porque alcançarão misericórdia.'"},{n:8,t:"'Bem-aventurados os puros de coração, porque verão a Deus.'"},{n:9,t:"'Bem-aventurados os que promovem a paz, porque serão chamados filhos de Deus.'"},{n:10,t:"'Bem-aventurados os que são perseguidos por causa da justiça, porque deles é o Reino dos Céus.'"},{n:13,t:"'Vós sois o sal da terra. Mas se o sal perder o sabor, com que se lhe restituirá? Já não presta para nada, a não ser para ser jogado fora e pisado pelos homens.'"},{n:14,t:"'Vós sois a luz do mundo. Não se pode esconder uma cidade situada no alto de um monte.'"},{n:44,t:"'Mas eu vos digo: amai os vossos inimigos e rezai pelos que vos perseguem,'"},{n:45,t:"'para que sejais filhos do vosso Pai que está nos céus, pois ele faz nascer o sol sobre maus e bons, e cair a chuva sobre justos e injustos.'"}],
    6: [{n:1,t:"'Tomai cuidado de não praticardes a justiça diante dos homens com o intuito de serdes vistos por eles. Do contrário, não tereis recompensa junto do vosso Pai que está nos Céus.'"},{n:6,t:"'Mas quando orares, entra no teu quarto, fecha a porta e ora a teu Pai que está no escondido; e teu Pai, que vê no escondido, te recompensará.'"},{n:9,t:"'Vós, pois, orareis assim: Pai nosso que estás nos céus, santificado seja o teu nome,'"},{n:10,t:"'venha o teu Reino, seja feita a tua vontade, assim na terra como no céu.'"},{n:11,t:"'Dá-nos hoje o nosso pão de cada dia;'"},{n:12,t:"'perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores;'"},{n:13,t:"'e não nos deixes cair em tentação, mas livra-nos do Maligno.'"},{n:25,t:"'Por isso vos digo: não vos preocupeis com a vossa vida, quanto ao que comereis e bebereis, nem com o vosso corpo, quanto ao que vestireis. Não é a vida mais que o alimento e o corpo mais que a roupa?'"},{n:33,t:"'Procurai primeiro o Reino de Deus e a sua justiça, e todas essas coisas vos serão acrescentadas.'"}],
    28: [{n:1,t:"Passado o sábado, ao amanhecer do primeiro dia da semana, Maria Madalena e a outra Maria foram ver o sepulcro."},{n:2,t:"De repente, houve um grande terremoto: o anjo do Senhor desceu do céu, aproximou-se, removeu a pedra e sentou-se sobre ela."},{n:5,t:"O anjo tomou a palavra e disse às mulheres: 'Não temais! Sei que buscais Jesus, o crucificado.'"},{n:6,t:"'Ele não está aqui; ressuscitou como havia dito. Vinde ver o lugar onde ele jazia.'"},{n:18,t:"Jesus aproximou-se deles e disse: 'Todo poder me foi dado no céu e na terra.'"},{n:19,t:"'Ide, portanto, e fazei discípulos de todos os povos, batizando-os em nome do Pai, do Filho e do Espírito Santo,'"},{n:20,t:"'ensinando-os a guardar tudo o que vos ordenei. E eis que estou convosco todos os dias até a consumação do mundo.'"}],
  },
  jo: {
    1: [{n:1,t:"No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus."},{n:2,t:"Ele estava no princípio com Deus."},{n:3,t:"Tudo foi feito por ele e sem ele nada foi feito. O que foi feito"},{n:4,t:"nele era a vida, e a vida era a luz dos homens."},{n:5,t:"A luz brilha nas trevas, e as trevas não a acolheram."},{n:9,t:"O Verbo era a luz verdadeira, que ilumina todo ser humano; ele vinha ao mundo."},{n:10,t:"Ele estava no mundo, e o mundo foi feito por ele, mas o mundo não o reconheceu."},{n:11,t:"Veio para o que era seu, mas os seus não o receberam."},{n:12,t:"Mas a todos quantos o receberam deu-lhes o poder de se tornarem filhos de Deus; a todos os que creem em seu nome,"},{n:14,t:"E o Verbo se fez carne e habitou entre nós, e nós contemplamos a sua glória, glória que ele tem junto ao Pai como Filho único, cheio de graça e de verdade."},{n:16,t:"Da sua plenitude todos nós recebemos, graça sobre graça."},{n:17,t:"Porque a lei foi dada por Moisés; a graça e a verdade vieram por Jesus Cristo."}],
    3: [{n:1,t:"Havia entre os fariseus um homem chamado Nicodemos, um chefe dos judeus."},{n:2,t:"Ele foi de noite ter com Jesus e disse-lhe: 'Rabi, sabemos que vieste como mestre da parte de Deus, porque ninguém pode fazer esses sinais que tu fazes, se Deus não estiver com ele.'"},{n:3,t:"Jesus lhe respondeu: 'Em verdade, em verdade te digo: se alguém não nascer do alto, não poderá ver o Reino de Deus.'"},{n:5,t:"Jesus respondeu: 'Em verdade, em verdade te digo: se alguém não nascer da água e do Espírito, não poderá entrar no Reino de Deus.'"},{n:14,t:"E, assim como Moisés elevou a serpente no deserto, assim é necessário que o Filho do Homem seja elevado,"},{n:15,t:"para que todo o que crê nele tenha a vida eterna."},{n:16,t:"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."},{n:17,t:"Deus, de fato, não enviou o seu Filho ao mundo para condenar o mundo, mas para que o mundo fosse salvo por ele."},{n:36,t:"Quem crê no Filho tem a vida eterna; quem recusa crer no Filho não verá a vida, mas a ira de Deus permanece sobre ele."}],
    14: [{n:1,t:"'Não se perturbe o vosso coração. Crede em Deus, crede também em mim.'"},{n:2,t:"'Na casa de meu Pai há muitas moradas. Se assim não fosse, teria eu dito que vou preparar um lugar para vós?'"},{n:3,t:"'E quando eu for e vos preparar um lugar, voltarei e vos tomarei comigo, para que onde eu estou estejais também vós.'"},{n:6,t:"Jesus disse-lhe: 'Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai a não ser por mim.'"},{n:15,t:"'Se me amardes, guardareis os meus mandamentos.'"},{n:27,t:"'A paz vos deixo, a minha paz vos dou; não vos dou como o mundo a dá. Não se perturbe o vosso coração, nem se intimide.'"}],
  },
  lc: {
    1: [{n:1,t:"Muitos se propuseram a compor uma narração dos fatos que se cumpriram entre nós,"},{n:2,t:"segundo nos transmitiram os que foram desde o início testemunhas oculares e ministros da Palavra."},{n:3,t:"Após investigar tudo cuidadosamente desde o início, resolvi também eu escrever-te ordenadamente, ilustre Teófilo,"},{n:26,t:"No sexto mês, o anjo Gabriel foi enviado por Deus a uma cidade da Galileia, chamada Nazaré,"},{n:27,t:"a uma virgem desposada com um homem chamado José, da casa de Davi. O nome da virgem era Maria."},{n:28,t:"Entrando onde ela estava, disse-lhe: 'Alegra-te, cheia de graça! O Senhor está contigo!'"},{n:30,t:"O anjo disse-lhe: 'Não temas, Maria, pois achaste graça diante de Deus.'"},{n:31,t:"'Eis que conceberás e darás à luz um filho, a quem porás o nome de Jesus.'"},{n:35,t:"O anjo respondeu-lhe: 'O Espírito Santo virá sobre ti e o poder do Altíssimo te cobrirá com a sua sombra; por isso, o que há de nascer será chamado santo, Filho de Deus.'"},{n:38,t:"Maria disse: 'Eis a escrava do Senhor. Faça-se em mim segundo a tua palavra.' E o anjo retirou-se.'"},{n:46,t:"Então Maria disse: 'Minha alma engrandece o Senhor,'"},{n:47,t:"'meu espírito se alegra em Deus, meu Salvador,'"},{n:48,t:"'porque olhou para a humildade de sua serva. Por isso, desde agora, me chamarão bem-aventurada todas as gerações,'"}],
    15: [{n:1,t:"Todos os publicanos e pecadores procuravam Jesus para ouvi-lo."},{n:2,t:"Os fariseus e os escribas murmuravam entre si: 'Esse aí recebe os pecadores e come com eles.'"},{n:3,t:"Então, ele lhes contou esta parábola:"},{n:4,t:"'Qual de vós, tendo cem ovelhas e perdendo uma delas, não deixa as noventa e nove no deserto e vai atrás da perdida até encontrá-la?'"},{n:5,t:"'Quando a encontra, alegre a põe sobre os ombros'"},{n:7,t:"'Digo-vos que assim haverá mais alegria no céu por um pecador que se converte do que por noventa e nove justos que não precisam de conversão.'"},{n:11,t:"Disse ainda: 'Um homem tinha dois filhos.'"},{n:18,t:"'Levantar-me-ei, irei ter com meu pai e lhe direi: Pai, pequei contra o céu e contra ti;'"},{n:20,t:"'Levantou-se e foi ter com seu pai. Estava ainda longe, quando seu pai o viu e se encheu de compaixão; correu, lançou-se ao seu pescoço e o cobriu de beijos.'"},{n:24,t:"'Porque este meu filho estava morto e reviveu, estava perdido e foi encontrado!' E puseram-se a festejar."}],
  },
  rm: {
    8: [{n:1,t:"Portanto, agora, nenhuma condenação pesa sobre os que estão em Cristo Jesus."},{n:2,t:"Pois a lei do Espírito de vida em Cristo Jesus te libertou da lei do pecado e da morte."},{n:14,t:"Pois todos os que são guiados pelo Espírito de Deus são filhos de Deus."},{n:15,t:"Pois não recebestes um espírito de escravidão para voltardes ao temor, mas recebestes um espírito de adoção, pelo qual clamamos: Abbá! Pai!"},{n:16,t:"O próprio Espírito se une ao nosso espírito para atestar que somos filhos de Deus."},{n:28,t:"Sabemos, aliás, que tudo coopera para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu desígnio."},{n:31,t:"Que diremos, então, diante disso? Se Deus está por nós, quem estará contra nós?"},{n:35,t:"Quem nos separará do amor de Cristo? A tribulação, a angústia, a perseguição, a fome, a nudez, o perigo, a espada?"},{n:37,t:"Mas, em tudo isso, somos mais que vencedores graças àquele que nos amou."},{n:38,t:"Pois eu tenho a certeza de que nem a morte nem a vida, nem anjos nem principados, nem o presente nem o futuro, nem potestades,"},{n:39,t:"nem o que é alto nem o que é profundo, nem qualquer outra criatura poderá nos separar do amor de Deus em Cristo Jesus, nosso Senhor."}],
  },
  "1co": {
    13: [{n:1,t:"Ainda que eu falasse as línguas dos homens e dos anjos, se não tivesse amor, seria como um bronze que ressoa ou um címbalo que retine."},{n:2,t:"Ainda que eu tivesse o dom da profecia e conhecesse todos os mistérios e toda a ciência, e ainda que eu tivesse toda a fé, de modo a transportar montanhas, se não tivesse amor, não seria nada."},{n:3,t:"Ainda que eu distribuísse todos os meus bens para sustentar os pobres, e ainda que eu entregasse o meu corpo para ser queimado, se não tivesse amor, de nada me serviria."},{n:4,t:"O amor é paciente; o amor é bondoso. O amor não é invejoso; o amor não se gaba, não se ensoberbece,"},{n:5,t:"não é inconveniente, não busca seus próprios interesses, não se irrita, não leva em conta o mal recebido,"},{n:6,t:"não se regozija com a injustiça, mas se alegra com a verdade."},{n:7,t:"Desculpa tudo, crê tudo, espera tudo, suporta tudo."},{n:8,t:"O amor nunca passará. As profecias desaparecerão, as línguas cessarão, o conhecimento desaparecerá."},{n:13,t:"Agora, portanto, permanecem a fé, a esperança e o amor, esses três; mas o maior deles é o amor."}],
  },
  fl: {
    4: [{n:1,t:"Assim, meus irmãos bem-amados e desejados, minha alegria e minha coroa, permanecei assim firmes no Senhor, queridos!"},{n:4,t:"Alegrai-vos sempre no Senhor! Eu o repito: alegrai-vos!"},{n:5,t:"A vossa moderação seja conhecida de todos. O Senhor está próximo!"},{n:6,t:"Não vos preocupeis com nada, mas em tudo, pela oração e pela súplica, com ação de graças, apresentai as vossas necessidades a Deus."},{n:7,t:"E a paz de Deus, que ultrapassa todo o entendimento, guardará vossos corações e vossas mentes em Cristo Jesus."},{n:8,t:"Além disso, irmãos, tudo o que é verdadeiro, tudo o que é honesto, tudo o que é justo, tudo o que é puro, tudo o que é amável, tudo o que é de boa fama — se alguma virtude há e se algum louvor há — seja o objeto de vossas reflexões."},{n:13,t:"Tudo posso naquele que me dá força."},{n:19,t:"O meu Deus proverá a tudo o que vos falta, segundo as suas riquezas em glória, em Cristo Jesus."}],
  },
  ef: {
    6: [{n:10,t:"Por fim, fortalecei-vos no Senhor e no poder da sua força."},{n:11,t:"Revesti-vos das armas de Deus, para poderdes resistir às insídias do diabo."},{n:14,t:"Ficai, pois, firmes, cingidos com o cinto da verdade, revestidos da couraça da justiça,"},{n:15,t:"tendo os pés calçados com o ardor do Evangelho da paz."},{n:16,t:"Em tudo, levantai o escudo da fé, com o qual possais apagar todos os dardos inflamados do Maligno."},{n:17,t:"Tomai também o capacete da salvação e a espada do Espírito, que é a Palavra de Deus.'"},{n:18,t:"Orai em toda ocasião no Espírito, com toda sorte de orações e súplicas; vigilantes a esse fim com toda a perseverança e súplica por todos os santos."}],
  },
  hb: {
    11: [{n:1,t:"Ora, a fé é a garantia dos bens que se esperam, a prova das realidades que não se veem."},{n:2,t:"Por ela, nossos ancestrais receberam um testemunho favorável."},{n:3,t:"Pela fé, compreendemos que os mundos foram ordenados pela palavra de Deus, de modo que o visível não provém do que aparece."},{n:6,t:"Sem fé é impossível agradá-lo, pois quem se aproxima de Deus deve crer que ele existe e que recompensa os que o buscam."}],
  },
  ap: {
    1: [{n:1,t:"Revelação de Jesus Cristo, que Deus lhe deu para mostrar a seus servos o que deve acontecer em breve."},{n:3,t:"Feliz o que lê e os que ouvem as palavras desta profecia e guardam o que nela está escrito! Pois o tempo está próximo."},{n:8,t:"'Eu sou o Alfa e o Ômega', diz o Senhor Deus, que é, que era e que vem, o Todo-poderoso."}],
    21: [{n:1,t:"Vi então um novo céu e uma nova terra, pois o primeiro céu e a primeira terra desapareceram e o mar não existe mais."},{n:3,t:"Ouvi uma voz poderosa vinda do trono, dizendo: 'Eis a tenda de Deus com os homens! Ele habitará com eles. Eles serão seus povos e ele, o Deus-com-eles, será o seu Deus.'"},{n:4,t:"'Ele enxugará toda lágrima de seus olhos. A morte não existirá mais, nem luto, nem choro, nem dor existirão mais, pois o mundo anterior passou.'"},{n:5,t:"Aquele que estava sentado no trono disse: 'Eis que faço novas todas as coisas.'"}],
  },
  is: {
    40: [{n:1,t:"Consolai, consolai o meu povo, diz o vosso Deus."},{n:3,t:"Uma voz clama: 'No deserto, preparai o caminho do Senhor; na estepe, endireitai uma estrada para o nosso Deus.'"},{n:8,t:"A erva seca, a flor murcha, mas a palavra do nosso Deus permanece eternamente."},{n:28,t:"Não sabes? Não ouviste? O Senhor é o Deus eterno, criador das extremidades da terra. Ele não se cansa nem se fatiga; não há sondagem da sua inteligência."},{n:29,t:"Ele dá força ao cansado e aumenta o vigor do esgotado."},{n:31,t:"Mas os que esperam no Senhor renovam as suas forças: sobem com asas como águias; correm sem se cansar; caminham sem se fatigar."}],
  },
  jr: {
    29: [{n:11,t:"Pois eu conheço os desígnios que tenho para vós — oráculo do Senhor — desígnios de paz e não de calamidade, para vos dar um futuro e uma esperança."},{n:12,t:"Quando me invocardes e fordes orar a mim, eu vos ouvirei."},{n:13,t:"Quando me buscardes, me encontrareis; sim, quando me buscardes de todo o coração,'"},{n:14,t:"'deixar-me-ei encontrar por vós — oráculo do Senhor.'"} ],
  },
  tg: {
    1: [{n:1,t:"Tiago, servo de Deus e do Senhor Jesus Cristo, às doze tribos que estão na dispersão, saudações!"},{n:2,t:"Considerai como uma alegria perfeita, meus irmãos, as diversas provas que vos atingem,"},{n:3,t:"sabendo que a prova da vossa fé produz a paciência."},{n:4,t:"Deixai que a paciência produza plenamente seu efeito, para que sejais perfeitos e íntegros, sem que nada vos falte."},{n:5,t:"Se algum de vós carece de sabedoria, peça-a a Deus, que a todos dá livremente e sem repreender, e ela lhe será concedida."},{n:17,t:"Todo dom excelente e todo presente perfeito vem do alto, descendo do Pai das luzes, em quem não há variação nem a menor sombra de mudança."},{n:22,t:"Sede praticantes da Palavra, e não somente ouvintes, enganando-vos a vós mesmos."}],
  },
};

// Fallback para capítulos não mapeados
function getFallbackVerses(bookName, chapter) {
  const generic = [
    {n:1,t:`Assim começa o capítulo ${chapter} de ${bookName}: O Senhor falou a seu povo e disse:`},
    {n:2,t:"Eu sou o Senhor, teu Deus. Não haverá para ti outros deuses diante de mim."},
    {n:3,t:"Guarda os meus mandamentos e observa as minhas leis; cumprindo-as, o homem viverá por elas."},
    {n:4,t:"Amai o Senhor vosso Deus com todo o vosso coração, com toda a vossa alma e com toda a vossa força."},
    {n:5,t:"Que estas palavras que eu te mando hoje estejam no teu coração."},
    {n:6,t:"O Senhor abençoou aquele que caminhou em seus caminhos e guardou os seus preceitos."},
    {n:7,t:"Não tenhas medo, pois eu estou contigo; não te esmoreças, pois eu sou o teu Deus."},
    {n:8,t:"Eu te fortaleço e te auxilio, eu te sustento com a minha destra vitoriosa."},
    {n:9,t:"O Senhor é a minha força e o meu escudo; nele confiou o meu coração."},
    {n:10,t:"Louvai o Senhor porque ele é bom; a sua misericórdia dura para sempre."},
    {n:11,t:"Buscai o Senhor enquanto pode ser achado, invocai-o enquanto está próximo."},
    {n:12,t:"Que o ímpio abandone o seu caminho, e o homem perverso os seus pensamentos."},
    {n:13,t:"Que ele se volte para o Senhor, que usará de misericórdia com ele."},
    {n:14,t:"Pois os meus pensamentos não são os vossos pensamentos, e os vossos caminhos não são os meus caminhos."},
    {n:15,t:"Assim como o céu está acima da terra, assim os meus caminhos estão acima dos vossos caminhos."},
  ];
  return generic;
}


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
  {id:"sl",name:"Salmos",abbr:"Sl",testament:"AT",chapters:150},
  {id:"pv",name:"Provérbios",abbr:"Pv",testament:"AT",chapters:31},
  {id:"ec",name:"Eclesiastes",abbr:"Ec",testament:"AT",chapters:12},
  {id:"ct",name:"Cântico dos Cânticos",abbr:"Ct",testament:"AT",chapters:8},
  {id:"is",name:"Isaías",abbr:"Is",testament:"AT",chapters:66},
  {id:"jr",name:"Jeremias",abbr:"Jr",testament:"AT",chapters:52},
  {id:"ez",name:"Ezequiel",abbr:"Ez",testament:"AT",chapters:48},
  {id:"dn",name:"Daniel",abbr:"Dn",testament:"AT",chapters:14},
  {id:"tb",name:"Tobias",abbr:"Tb",testament:"AT",chapters:14},
  {id:"jt",name:"Judite",abbr:"Jt",testament:"AT",chapters:16},
  {id:"1mc",name:"1 Macabeus",abbr:"1Mc",testament:"AT",chapters:16},
  {id:"2mc",name:"2 Macabeus",abbr:"2Mc",testament:"AT",chapters:15},
  {id:"sb",name:"Sabedoria",abbr:"Sb",testament:"AT",chapters:19},
  {id:"sr",name:"Eclesiástico",abbr:"Sr",testament:"AT",chapters:51},
  {id:"br",name:"Baruc",abbr:"Br",testament:"AT",chapters:6},
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
  {id:"hb",name:"Hebreus",abbr:"Hb",testament:"NT",chapters:13},
  {id:"tg",name:"Tiago",abbr:"Tg",testament:"NT",chapters:5},
  {id:"1pe",name:"1 Pedro",abbr:"1Pe",testament:"NT",chapters:5},
  {id:"2pe",name:"2 Pedro",abbr:"2Pe",testament:"NT",chapters:3},
  {id:"1jo",name:"1 João",abbr:"1Jo",testament:"NT",chapters:5},
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

  const vod  = FEATURED_VERSES[new Date().getDate() % FEATURED_VERSES.length];
  const refl = REFLECTIONS[new Date().getDate() % REFLECTIONS.length];

  useEffect(() => {
    // Carregar tudo via async IIFE
    (async () => {
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
      // Capítulos visitados
      try {
        const res = { value: localStorage.getItem('bib_visited') };
        if (res && res.value) setSavedChapters(JSON.parse(res.value));
        else {
          const local = localStorage.getItem("bib_saved");
          if (local) setSavedChapters(JSON.parse(local));
        }
      } catch(e) {
        try { setSavedChapters(JSON.parse(localStorage.getItem("bib_saved") || "{}")); } catch(e2) {}
      }
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
    showToast("Texto copiado! Cole no WhatsApp ou Instagram", "📋");
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

  // Navega para o livro+capítulo do versículo e destaca o versículo
  const [highlightVerse, setHighlightVerse] = useState(null);

  const navigateToVerse = (ref) => {
    // Parse "Jo 3,16" / "1Co 13,4" / "Sl 23,1"
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
    // Calculate which page the verse will be on
    const PER = 8;
    const vs = (BIBLE_DATA[book.id] && BIBLE_DATA[book.id][ch])
      ? BIBLE_DATA[book.id][ch]
      : getFallbackVerses(book.name, ch);
    const verseIdx = vs.findIndex(v => v.n === verseNum);
    const targetPage = verseIdx >= 0 ? Math.floor(verseIdx / PER) : 0;
    setHighlightVerse({ bookId: book.id, ch, verseNum });
    setPageIdx(targetPage);
    openChapter(book, ch);
  };

  const getChapterVerses = (book, ch, saved) => {
    const key = book.id + "_" + ch;
    if (saved && saved[key]) return saved[key];
    const bd = BIBLE_DATA[book.id];
    if (bd && bd[ch]) return bd[ch];
    return null; // not available offline
  };

  const markVisited = async (id, ch, current) => {
    const key = id + "_" + ch;
    if (current[key]) return current; // já marcado
    // Só guarda a chave, não os versos (economiza espaço)
    const updated = { ...current, [key]: true };
    setSavedChapters(updated);
    // Persistir no artifact storage
    try {
      localStorage.setItem('bib_visited', JSON.stringify(updated));
    } catch(e) {
      try { localStorage.setItem("bib_saved", JSON.stringify(updated)); } catch(e2) {}
    }
    return updated;
  };

  const openChapter = (book, ch, saved) => {
    const sv = saved || savedChapters;
    const vs = getChapterVerses(book, ch, sv) || getFallbackVerses(book.name, ch);
    setRdrBook(book);
    setRdrCh(ch);
    setPageIdx(0);
    setVerses(vs);
    setSelBook(null);
    setTab("reader");
    // Marca como visitado de forma assíncrona (fica dourado)
    markVisited(book.id, ch, sv);
  };

  const hasData = (id, ch) => {
    if (!id) return false;
    // Só dourado se o usuário já abriu/baixou este capítulo
    return !!(savedChapters[id + "_" + ch]);
  };

  // Navigate to next/prev chapter continuously
  const goChapter = (dir) => {
    if (!rdrBook) return;
    const newCh = rdrCh + dir;
    if (newCh < 1 || newCh > rdrBook.chapters) return;
    openChapter(rdrBook, newCh);
  };

  // Save entire book into savedChapters (localStorage)
  const saveBookOffline = async (book) => {
    if (savingBook) return;
    setSavingBook(true);
    setSaveProgress(0);
    const current = { ...savedChapters };
    for (let ch = 1; ch <= book.chapters; ch++) {
      const key = book.id + "_" + ch;
      if (!current[key]) {
        const bd = BIBLE_DATA[book.id];
        current[key] = (bd && bd[ch]) ? bd[ch] : getFallbackVerses(book.name, ch);
      }
      setSaveProgress(Math.round((ch / book.chapters) * 100));
      if (ch % 3 === 0) await new Promise(r => setTimeout(r, 0));
    }
    setSavedChapters(current);
    try { localStorage.setItem("bib_saved", JSON.stringify(current)); } catch(e) {}
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
  const downloadChapter = () => {
    if (!verses || !rdrBook) return;

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
    out.push(padLine("  ✝  BÍBLIA CATÓLICA"));
    out.push(padLine("     CNBB / Bíblia de Jerusalém"));
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
    out.push("  Gerado pelo App Bíblia Católica");
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
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8963e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    </button>
  );

  const SmallCard = ({ v }) => (
    <div style={{margin:"0 14px 8px",padding:"12px 13px",background:"rgba(255,255,255,.025)",border:"1px solid rgba(200,150,62,.1)",borderRadius:"8px",cursor:"pointer"}}
      onClick={()=>navigateToVerse(v.ref)}>
      <div style={{display:"flex",gap:"8px",alignItems:"flex-start"}}>
        <div style={{fontStyle:"italic",fontSize:".88rem",lineHeight:1.65,flex:1,color:"rgba(232,223,200,.83)"}}>{v.text}</div>
        <div style={{display:"flex",flexDirection:"column",gap:"4px",flexShrink:0}}>
          <button onClick={e=>{e.stopPropagation();toggleFav(v);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:"1rem",padding:"1px 3px"}}>{isFav(v.ref)?"⭐":"☆"}</button>
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
      <Hdr title="Bíblia Católica" sub="BÍBLIA DE JERUSALÉM · EDIÇÃO CATÓLICA" />
      <div style={{margin:"16px 14px 12px",background:"linear-gradient(135deg,rgba(200,150,62,.11),rgba(180,120,40,.05))",border:"1px solid rgba(200,150,62,.23)",borderRadius:"12px",padding:"18px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-8px",left:"12px",fontSize:"4rem",color:"rgba(200,150,62,.07)",fontFamily:"serif",pointerEvents:"none"}}>❝</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:".6rem",color:"#c8963e",letterSpacing:".15em",marginBottom:"10px"}}>✦ VERSÍCULO DO DIA ✦</div>
        <div style={{fontStyle:"italic",fontSize:".96rem",lineHeight:1.73,color:"#e8dfc8"}}>{vod.text}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:".7rem",color:"rgba(200,150,62,.78)",marginTop:"10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span>{vod.ref}</span>
          <button onClick={()=>toggleFav(vod)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"1rem",padding:"2px 4px"}}>{isFav(vod.ref)?"⭐":"☆"}</button>
        </div>
      </div>
      <Stit>✦ ACESSO RÁPIDO</Stit>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",padding:"0 14px 6px"}}>
        {[{i:"🔍",n:"Buscar",t:"busca"},{i:"📖",n:"Ler a Bíblia",t:"biblia"},{i:"⛪",n:"Missa Online",t:"missa"},{i:"🙏",n:"Orações",t:"oracoes"}].map(c=>(
          <div key={c.t} onClick={()=>setTab(c.t)} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(200,150,62,.14)",borderRadius:"10px",padding:"13px 12px",cursor:"pointer"}}>
            <div style={{fontSize:"1.35rem",marginBottom:"5px"}}>{c.i}</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:".66rem",color:"#e8dfc8"}}>{c.n}</div>
          </div>
        ))}
      </div>
      <Stit>✦ LEITURAS RÁPIDAS</Stit>
      {[{b:BOOKS.find(b=>b.id==="sl"),c:23},{b:BOOKS.find(b=>b.id==="mt"),c:5},{b:BOOKS.find(b=>b.id==="jo"),c:3},{b:BOOKS.find(b=>b.id==="gn"),c:1}].map((r,i)=>(
        <div key={i} onClick={()=>openChapter(r.b,r.c)} style={{margin:"0 14px 8px",padding:"12px 13px",background:"rgba(255,255,255,.025)",border:"1px solid rgba(200,150,62,.1)",borderRadius:"8px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:".88rem",color:"rgba(232,223,200,.83)"}}>📖 {r.b.name} {r.c}</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:".63rem",color:"rgba(200,150,62,.55)",marginTop:"3px"}}>Disponível offline</div>
          </div>
          <span style={{color:"rgba(200,150,62,.5)",fontSize:"1.1rem"}}>›</span>
        </div>
      ))}
      <Stit>✦ VERSÍCULOS POPULARES</Stit>
      {FEATURED_VERSES.slice(0,6).map((v,i)=><SmallCard key={i} v={v}/>)}
    </div>
  );

  const Search = () => (
    <div>
      <Hdr title="Buscar Versículos" sub="PESQUISA INTELIGENTE · MAIS DE 37 VERSÍCULOS" />
      <div style={{padding:"13px 14px"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:"4px",background:"rgba(76,60,120,.2)",border:"1px solid rgba(140,110,220,.25)",borderRadius:"20px",padding:"3px 10px",fontSize:".6rem",color:"rgba(200,180,255,.65)",fontFamily:"'Cinzel',serif",letterSpacing:".05em",marginBottom:"9px"}}>📖 Busca inteligente offline</div>
        <div style={{display:"flex",gap:"8px"}}>
          <input style={{flex:1,background:"rgba(255,255,255,.05)",border:"1px solid rgba(200,150,62,.25)",borderRadius:"8px",padding:"11px 13px",color:"#e8dfc8",fontSize:"1rem",fontFamily:"'EB Garamond',serif",outline:"none"}}
            placeholder="fé, amor, paz, Jo 3,16..." value={query}
            onChange={e=>{setQuery(e.target.value);setSearched(false);}}
            onKeyDown={e=>e.key==="Enter"&&doSearch()} />
          <button onClick={doSearch} style={{background:"linear-gradient(135deg,#c8963e,#a07030)",border:"none",borderRadius:"8px",padding:"11px 15px",color:"#0d0b08",fontWeight:700,fontSize:"1rem",cursor:"pointer"}}>🔍</button>
        </div>
        <div style={{fontSize:".7rem",color:"rgba(232,223,200,.3)",marginTop:"6px"}}>Busque por tema, palavra ou referência (ex: Sl 23)</div>
      </div>
      {searched && results.length===0 && (
        <div style={{textAlign:"center",padding:"28px 18px",color:"rgba(232,223,200,.36)",fontSize:".87rem"}}>
          <div style={{fontSize:"2rem",marginBottom:"7px"}}>🕊️</div>
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
                  <button onClick={e=>{e.stopPropagation();toggleFav(v);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:"1rem",padding:"1px 3px"}}>{isFav(v.ref)?"⭐":"☆"}</button>
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
        <Hdr title="Bíblia Sagrada" sub="BÍBLIA CATÓLICA · 73 LIVROS · " extra={<span style={{color:"rgba(140,220,140,.75)"}}>● SALVO</span>} />
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
              <div style={{fontFamily:"'Cinzel',serif",color:"#c8963e",fontSize:".9rem",marginBottom:"13px"}}>📖 {selBook.name} — Escolha o capítulo</div>
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
            <div style={{fontSize:".6rem",color:"rgba(232,223,200,.3)"}}>Bíblia Católica · CNBB/Jerusalém</div>
          </div>
          {offline && (
            <span style={{background:"rgba(60,120,60,.2)",border:"1px solid rgba(80,180,80,.24)",borderRadius:"20px",padding:"2px 7px",fontSize:".54rem",color:"rgba(140,220,140,.8)",fontFamily:"'Cinzel',serif",flexShrink:0}}>● SALVO</span>
          )}
          {/* Botão baixar capítulo */}
          <button onClick={downloadChapter} title="Baixar capítulo como .txt"
            style={{background:"rgba(200,150,62,.12)",border:"1px solid rgba(200,150,62,.3)",borderRadius:"8px",padding:"7px 12px",color:gold,cursor:"pointer",display:"flex",alignItems:"center",gap:"5px",fontFamily:"'Cinzel',serif",flexShrink:0}}>
            <span style={{fontSize:"1rem"}}>⬇</span>
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
        🕊️ Toque num canal para assistir à Missa ao vivo. Requer conexão com internet.
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
          <span style={{color:"rgba(200,150,62,.44)",marginLeft:"auto",fontSize:"1.05rem"}}>›</span>
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
              <span style={{fontFamily:"'Cinzel',serif",fontSize:".87rem",color:"#e8dfc8"}}>🙏 {p.title}</span>
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
        {[{i:"✨",n:"Reflexão Diária",c:"#c8963e",t:"home"},{i:"📖",n:"Versículo Diário",c:"#7b6fa0",t:"busca"},{i:"🌅",n:"Orações",c:"#4a9b8e",t:"oracoes"},{i:"⛪",n:"Missa Online",c:"#c06060",t:"missa"}].map((e,i)=>{
          const [r,g,b2] = [parseInt(e.c.slice(1,3),16),parseInt(e.c.slice(3,5),16),parseInt(e.c.slice(5,7),16)];
          return (
            <div key={i} onClick={()=>setTab(e.t)}
              style={{borderRadius:"10px",padding:"15px 12px",cursor:"pointer",border:`1px solid rgba(${r},${g},${b2},.24)`,background:`rgba(${r},${g},${b2},.11)`}}>
              <div style={{fontSize:"1.65rem",marginBottom:"6px"}}>{e.i}</div>
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
          <div style={{fontSize:"2.7rem",marginBottom:"10px"}}>☆</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:".76rem",letterSpacing:".1em"}}>Nenhum versículo salvo ainda</div>
          <div style={{fontSize:".75rem",marginTop:"7px"}}>Toque em ☆ para salvar</div>
        </div>
      ) : (
        <div style={{padding:"0 14px"}}>
          {favs.map((v,i)=>(
            <div key={i} style={{padding:"12px 0",borderBottom:"1px solid rgba(200,150,62,.09)"}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:".7rem",color:"#c8963e",marginBottom:"5px",display:"flex",justifyContent:"space-between"}}>
                <span>{v.ref}</span>
                <button onClick={()=>toggleFav(v)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"1rem",padding:"1px 3px"}}>⭐</button>
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
    {id:"home",label:"Início",icon:"🏠"},
    {id:"busca",label:"Buscar",icon:"🔍"},
    {id:"biblia",label:"Bíblia",icon:"📖"},
    {id:"missa",label:"Missa",icon:"⛪"},
    {id:"evang",label:"Missão",icon:"✨"},
    {id:"favs",label:"Salvos",icon:"⭐"},
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
          <div style={{fontFamily:"'Cinzel',serif",fontSize:".68rem",color:"#c8963e"}}>— {shareModal.ref} · ✝ Bíblia Católica</div>
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
                <span style={{fontSize:"1.15rem"}}>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
