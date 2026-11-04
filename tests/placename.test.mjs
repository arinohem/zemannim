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
  ['fr','Lyon','ליאון'],['fr','Blois','בלוא'],['fr','Poitiers','פואטיי'],['fr','Bayeux','באייו'],['fr','Lisieux','ליזייו'],['fr','Dijon','דישון'],
  ['fr','Limoges','לימוש'],['fr','Besançon','בזאנסון'],['fr','Genève','שניב'/* owner's example was שנב: asked */],['fr','Chamonix','שאמוני'],['fr','Nice','ניס'],['fr','Toulouse','טולוז'],
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
  ['es','Oviedo','אוביאידו'],['es','Mendoza','מינדוסא'],['es','Marchena','מארצינא'],['es','Logroño','לוגרונייו'],['es','La Coruña','לא קורונייא'],
  // English (from the IPA)
  ['en','Manchester','מאנציסטיר',{p:'ˈmæntʃɪstə'}],['en','Hull','הול',{p:'hʌl'}],['en','Birmingham','בירמינגאם',{p:'ˈbɜː.mɪŋ.əm'}],
  ['en','Wakefield','ווייקפילד',{p:'ˈweɪkfiːld'}],['en','Brighton','בראייטון',{p:'ˈbraɪtən'}],['en','Southampton','סאותאמפטון',{p:'saʊˈθæmptən'}],
  ['en','Jersey','גירזי',{p:'ˈdʒɜːzi'}],['en','Greenwich','גריניץ',{p:'ˈɡrɛnɪtʃ'}],['en','Plymouth','פלימות',{p:'ˈplɪməθ'}],['en','Thurso','תורסו',{p:'ˈθɜːsəʊ'}],
  ['en','London','לונדון',{p:'ˈlʌndən'}],['en','Coventry','קובינטרי',{p:'ˈkɒvəntri'}],['en','Bristol','בריסטול',{p:'ˈbrɪstəl'}],['en','Oxford','אוקספורד',{p:'ˈɒksfəd'}],
  ['en','Leicester','ליסטיר',{p:'ˈlɛstə'}],['en','Brighton','בראייטון',{p:'ˈbraɪtn̩'}],
  // Ashkenazi East (by sound)
  ['pl','Zamość','זאמאשטש'],['uk','Poltava','פאלטאווא'],['ro','Chișinău','קישינעו'],['pl','Piotrków','פיאטרקוב']
];
let bad=0;
for(const [rule,name,want,data] of cases){
  const got=P.hebrew(name,rule,data||null);
  if(got!==want){ bad++; console.log('MISMATCH',rule,name,'got',got,'want',want); }
}
console.log('place-name mismatches',bad,'of',cases.length);
if(bad) process.exitCode=1;
