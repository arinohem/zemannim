import {HDate,Sedra} from '@hebcal/core';
import {createRequire} from 'module'; const require=createRequire(import.meta.url);
const E=require('../engine.js');
// 1. Hebrew date conversion
let bad=0;
for(let rd=E.rdFromGreg(1900,1,1); rd<E.rdFromGreg(2100,1,1); rd+=1){
  const h=E.hebFromRd(rd); const hd=new HDate(rd);
  if(h.y!==hd.getFullYear()||h.m!==hd.getMonth()||h.d!==hd.getDate()){ if(bad++<5) console.log('date mismatch',rd,h,hd.toString()); }
  if(E.rdFromHeb(h.y,h.m,h.d)!==rd){ if(bad++<5) console.log('roundtrip',rd);}
}
console.log('date mismatches',bad);
// 2. parasha
for(const il of [false,true]){
  let mism=0,tot=0;
  for(let hy=5600; hy<6200; hy++){
    const s=new Sedra(hy,il);
    const start=E.rdFromHeb(hy,7,1), end=E.rdFromHeb(hy+1,7,1);
    for(let rd=start+((6-E.weekday(start)+7)%7); rd<end; rd+=7){
      const r=s.lookup(new HDate(rd)); const ours=E.parashaFor(rd,il);
      const theirs=r.chag?null:r.num; // num may be array for combined? check
      let t=null; if(!r.chag){ t=Array.isArray(r.num)?r.num.map(n=>n-1):[r.num-1]; }
      tot++;
      if(JSON.stringify(t)!==JSON.stringify(ours)){ if(mism++<8) console.log(il?'IL':'D',hy,E.gregFromRd(rd),'hebcal',r.parsha,t,'ours',ours);}
    }
  }
  console.log(il?'Israel':'Diaspora','parasha mismatches',mism,'of',tot);
}
