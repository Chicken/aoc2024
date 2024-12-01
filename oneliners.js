// deno-fmt-ignore-file
// 1.1
document.body.innerText.trim().split("\n").map(l=>l.trim().split(" ").map(Number).filter(Boolean)).reduce(([l,r],c)=>[l.concat(c[0]),r.concat(c[1])],[[],[]]).map(s=>s.sort((a,b)=>a-b)).reduce((a,s)=>s.map((v,i)=>[...(a[i]??[]),v]),[]).reduce((a,c)=>a+Math.abs(c[0]-c[1]),0)
// 1.2
document.body.innerText.trim().split("\n").map(l=>l.trim().split(" ").map(Number).filter(Boolean)).reduce(([l,r],c)=>[l.concat(c[0]),r.concat(c[1])],[[],[]]).map(s=>s.sort((a,b)=>a-b)).map((s,_,a)=>s.map((le=>le*a[1].filter(re=>re===le).length)))[0].reduce((a,c)=>c+a,0)
