// deno-fmt-ignore-file
// 1.1
document.body.innerText.trim().split("\n").map(l=>l.trim().split(" ").map(Number).filter(Boolean)).reduce(([l,r],c)=>[l.concat(c[0]),r.concat(c[1])],[[],[]]).map(s=>s.sort((a,b)=>a-b)).reduce((a,s)=>s.map((v,i)=>[...(a[i]??[]),v]),[]).reduce((a,c)=>a+Math.abs(c[0]-c[1]),0)
// 1.2
document.body.innerText.trim().split("\n").map(l=>l.trim().split(" ").map(Number).filter(Boolean)).reduce(([l,r],c)=>[l.concat(c[0]),r.concat(c[1])],[[],[]]).map((s,_,a)=>s.map((le=>le*a[1].filter(re=>re===le).length)))[0].reduce((a,c)=>c+a,0)
// 2.1
document.body.innerText.trim().split("\n").map(l=>l.trim().split(" ").map(Number)).map(r=>r.map((e,i,a)=>(a[i+1]??0)-e).slice(0,-1)).reduce((a,ds)=>a+(ds.every(d=>d>0&&d<=3)||ds.every(d=>d<0&&d>=-3)),0)
// 2.2
document.body.innerText.trim().split("\n").map(l=>l.trim().split(" ").map(Number)).map(r=>r.map((_,i)=>r.filter((_,j)=>j!==i).map((e,j,a)=>(a[j+1]??0)-e).slice(0,-1))).reduce((a,dss)=>a+dss.some(ds=>(ds.every(d=>d>0&&d<=3)||ds.every(d=>d<0&&d>=-3))),0)
// 3.1
document.body.innerText.trim().match(/mul\(\d+,\d+\)/g).reduce((a,c)=>a+c.match(/\d+/g).map(Number).reduce((a2,c2)=>a2*c2,1),0)
// 3.2
document.body.innerText.trim().match(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g).reduce((a,c)=>[a[1]?a[0]+(c.startsWith("mul")?c.match(/\d+/g).map(Number).reduce((a2,c2)=>a2*c2,1):0):a[0],c.startsWith("do")?!c.includes("n"):a[1]],[0,true])[0]
