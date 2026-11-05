// Hebrew spelling of town names: the examples approved by the owner (DECISIONS.md, 2026-11-04).
import {createRequire} from 'module'; const require=createRequire(import.meta.url);
const P=require('../placename.js');
const cases=[
  // Italian
  ['it','Imola','אימולא'],['it','Trieste','טריאיסטי'],['it','Reggio','ריגיו'],['it','Genova','גינובא'],['it','Foggia','פוגיא'],
  ['it','Ciampino','צאמפינו'],['it','Bologna','בולונייא'],['it','Cagliari','קאליארי'],['it','Brescia','ברישא'],['it','Silvano','סילוואנו'],
  ['it','Corvara','קורווארא'],['it','San','סאן'],['it','Firenze','פירינצי'],['it','Napoli','נאפולי'],['it','Milano','מילאנו'],['it','Torino','טורינו'],
  ['it','Udine','אודיני'],['it','Este','איסטי'],['it','Cagnano','קאנייאנו'],['it','Conegliano','קוניליאנו'],['it','Scicli','שיקלי'],['it','Pescia','פישא'],
  ['it','Altavilla Vicentina','אלטאבילא ויצינטינא'],['it','Assisi','אסיזי'],['it','Siracusa','סיראקוזא'],['it','Roma','רומא'],['it','Ancona','אנקונא'],
  ['it','Modena','מודינא'],['it','Gorizia','גוריציא'],['it','Senigallia','סיניגאליא'],['it','Fano','פאנו'],['it','Verona','וירונא'],['it','Lucca','לוקא'],
  ['it','Bari','בארי'],['it','Trani','טראני'],['it','Cento','צינטו'],['it','Parma','פארמא'],['it','Udine','אודיני'],
  ['it','Monza','מונזא',{z:{Monza:'v'}}],['it','Lazise','לאזיזי',{z:{Lazise:'v'}}],['it','Gonzaga','גונזאגא',{z:{Gonzaga:'v'}}],
  ['it','Marzabotto','מארזאבוטו',{z:{Marzabotto:'v'}}],['it','Camposanto','קאמפוסאנטו',{s:{Camposanto:'u'}}],['it','Bionaz','ביאונא',{z:{Bionaz:'silent'}}],
  ['it','Pisa','פיזא'],['it','Ferrara','פירארה',{he:'פירארה'}],
  // French
  ['fr','Lyon','ליאון'],['fr','Blois','בלוא'],['fr','Poitiers','פואטיי'],['fr','Bayeux','באייו'],['fr','Lisieux','ליזייו'],['fr','Dijon','דיז׳ון'],
  ['fr','Limoges','לימוז׳'],['fr','Besançon','בזאנסון'],['fr','Genève','ז׳ניב'/* in the app: exceptions list, ז׳נב */],['fr','Chamonix','שאמוני'],['fr','Nice','ניס'],['fr','Toulouse','טולוז'],
  ['fr','Nancy','נאנסי'],['fr','Marseille','מארסיי'],['fr','Bordeaux','בורדו'],['fr','Le Havre','לאבר'],['fr','Le Mans','למאן'],['fr','Verdun','וירדיון'],
  ['fr','Saint-Étienne','סין איטיין'],['fr','Lunel','לוניל'],
  // German
  ['de','Bremen','ברעמען'],['de','Essen','עסען'],['de','Celle','צעלע'],['de','Köln','קעלן'],['de','München','מינכען'],['de','Lübeck','ליבעק'],
  ['de','Mainz','מיינץ'],['de','Passau','פאסוי'],['de','Neustadt','ניישטאט'],['de','Ulm','אולם'],['de','Hamburg','האמבורק'],['de','Nürnberg','נירנבערק'],
  ['de','Darmstadt','דארמשטאט'],['de','Speyer','שפייער'],['de','Stuttgart','שטוטגארט'],['de','Sulzbach','זולצבאך'],['de','Frankfurt am Main','פראנקפורט אם מיין'],
  ['de','Pforzheim','פפורצהיים'],['de','Berlin','בערלין'],['de','Altona','אלטונא'],
  // Spanish
  ['es','Granada','גראנאדא'],['es','Málaga','מאלאגא'],['es','Zaragoza','סאראגוסא'],['es','Cádiz','קאדיס'],['es','Valencia','באלינסיא'],['es','Jerez','חיריס'],
  ['es','Jaén','חאאין'],['es','Gijón','חיחון'],['es','Sevilla','סיביליא'],['es','Valladolid','באליאדוליד'],['es','Medellín','מידילין'],['es','León','ליאון'],
  ['es','Oviedo','אוביאידו'],['es','Mendoza','מינדוסא'],['es','Marchena','מארצ׳ינא'],['es','Logroño','לוגרונייו'],['es','La Coruña','לא קורונייא'],
  // English (from the IPA)
  ['en','Manchester','מאנצ׳יסטיר',{p:'ˈmæntʃɪstə'}],['en','Hull','הול',{p:'hʌl'}],['en','Birmingham','בירמינגאם',{p:'ˈbɜː.mɪŋ.əm'}],
  ['en','Wakefield','ווייקפילד',{p:'ˈweɪkfiːld'}],['en','Brighton','בראייטון',{p:'ˈbraɪtən'}],['en','Southampton','סאותאמפטון',{p:'saʊˈθæmptən'}],
  ['en','Jersey','ג׳ירזי',{p:'ˈdʒɜːzi'}],['en','Greenwich','גריניץ׳',{p:'ˈɡrɛnɪtʃ'}],['en','Plymouth','פלימות',{p:'ˈplɪməθ'}],['en','Thurso','תורסו',{p:'ˈθɜːsəʊ'}],
  ['en','London','לונדון',{p:'ˈlʌndən'}],['en','Coventry','קובינטרי',{p:'ˈkɒvəntri'}],['en','Bristol','בריסטול',{p:'ˈbrɪstəl'}],['en','Oxford','אוקספורד',{p:'ˈɒksfəd'}],
  ['en','Leicester','ליסטיר',{p:'ˈlɛstə'}],['en','Brighton','בראייטון',{p:'ˈbraɪtn̩'}],
  // Ashkenazi East (by sound)
  ['pl','Zamość','זאמאשץ׳'],['pl','Częstochowa','צ׳ענסטאחאווא'],['pl','Będzin','בענדזין'],['pl','Łomża','לאמז׳א'],['ro','Giurgiu','ג׳ורג׳ו'],['hu','Cegléd','צעגלעד'],['ru','Cherepovets','צ׳ערעפאוועץ'],['uk','Poltava','פאלטאווא'],['ro','Chișinău','קישינעו'],['pl','Piotrków','פיאטרקוב']
];
// Geresh (owner, 2026-11-05): ג׳ ז׳ צ׳ where there is no traditional form
cases.push(['fr','Jura','ז׳ורא'],['de','Deutsch','דייץ׳']);
// Hebrew Wikipedia form adapted to the Judeo-Italian spelling (owner, 2026-11-05)
cases.push(
  ['','Marrakesh','מאראקיש',{w:'מרקש',c:'MA'}],['','Kagoshima','קאגושימא',{w:'קגושימה',c:'JP'}],['','Breda','ברדא',{w:'ברדה',c:'NL'}],
  ['','Middelburg','מידלבורך',{w:'מידלבורך',c:'NL'}],['','Leiden','ליידן',{w:'ליידן',c:'NL'}],['','Gaziantep','גאזיאנטיף',{w:'גזיאנטפ',c:'TR'}],
  ['','Antalya','אנטאליא',{w:'אנטליה',c:'TR'}],['','Belo Horizonte','בילו הוריזונטי',{w:'בלו הוריזונטה',c:'BR'}],
  ['','Rio de Janeiro','ריו די ז׳אניירו',{w:"ריו דה ז'ניירו",c:'BR'}],['','Coimbra','קוימברא',{w:'קוימברה',c:'PT'}],
  ['','Zhanjiang','ג׳אנג׳יאנג',{w:"ג'אנג'יאנג",c:'CN'}],['','Funchal','פונשאל',{w:'פונשל',c:'PT'}],['','Sousse','סוסא',{w:'סוסה',c:'TN'}],
  ['','Ouarzazate','ורזאזאת',{w:'ורזאזאת',c:'MA'}],['','Jeddah','גידא',{w:"ג'דה",c:'SA'}],['','Khartoum','כׄארטום',{w:"ח'רטום",c:'SD'}],
  ['',"'s-Hertogenbosch",'דן בוס',{w:'דן בוס',c:'NL'}],['','Thiruvananthapuram','טריוונדרום',{w:'טריוונדרום',c:'IN'}],
  ['en','Toronto','טורונטו',{w:'טורונטו',c:'CA',p:'təˈɹɑ.noʊ'}],['en','Edinburgh','אדינבורו',{w:'אדינבורו',c:'GB'}],
  ['en','Chicago','שיקאגו',{w:'שיקגו',c:'US'}],['en','Leicester','ליסטיר',{w:'לסטר',c:'GB',p:'ˈlɛstə'}],
  ['it','Firenze','פירינצי',{w:'פירנצה',c:'IT'}]
);
let bad=0;
for(const [rule,name,want,data] of cases){
  const got=P.hebrew(name,rule,data||null);
  if(got!==want){ bad++; console.log('MISMATCH',rule,name,'got',got,'want',want); }
}
console.log('place-name mismatches',bad,'of',cases.length);
if(bad) process.exitCode=1;
