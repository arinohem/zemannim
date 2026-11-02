import {Zmanim,GeoLocation} from '@hebcal/core';
import {createRequire} from 'module'; const require=createRequire(import.meta.url);
const E=require('../engine.js');
const lat=44.835, lon=11.6198;
const f=d=>d.toLocaleTimeString('it-IT',{timeZone:'Europe/Rome',hour:'2-digit',minute:'2-digit',second:'2-digit'});
for(const [y,m,d] of [[2026,11,2],[2026,11,6],[2026,11,7]]){
  const r=E.computeDay(E.rdFromGreg(y,m,d),{lat,lon,israel:false,tzethMinutes:20,tequfaMethod:9});
  console.log(y,m,d, r.times.map(t=>t.key+' '+f(t.date)).join(' | '), '| hour', (r.hourMs/60000).toFixed(2));
}
// compare sunrise/sunset with hebcal NOAA over a year at 4 latitudes; fail above MAX_DIFF_S
const MAX_DIFF_S=5;
let maxd=0;
for(const [la,lo] of [[44.835,11.62],[31.778,35.235],[59.9,10.75],[-33.9,18.4]]){
  const gl=new GeoLocation(null,la,lo,0,'UTC');
  for(let i=0;i<365;i+=3){const dt=new Date(Date.UTC(2026,0,1+i)); const z=new Zmanim(gl,dt,false);
    const rd=E.rdFromGreg(2026,1,1)+i;
    for(const [a,b] of [[E.sunrise(rd,la,lo),z.seaLevelSunrise()],[E.sunset(rd,la,lo),z.seaLevelSunset()]]) maxd=Math.max(maxd,Math.abs(a-b)/1000);}
}
console.log('max diff vs hebcal NOAA (s):',maxd.toFixed(1),'(limit',MAX_DIFF_S+')');
if(!(maxd<=MAX_DIFF_S)) process.exitCode=1;
