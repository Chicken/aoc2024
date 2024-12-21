// deno-fmt-ignore-file
// deno-lint-ignore-file
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
// 4.1
[[[1,0],[2,0],[3,0]],[[0,1],[0,2],[0,3]],[[1,1],[2,2],[3,3]],[[1,-1],[2,-2],[3,-3]]].reduce((ta,d)=>ta+document.body.innerText.trim().split("\n").map(l=>l.trim().split("")).reduce((ra,r,ri,g)=>ra+r.reduce((ca,c,ci)=>ca+["XMAS","SAMX"].includes([[0,0],...d].map(([dr,dc])=>g[ri+dr]?.[ci+dc]??".").join("")),0),0),0)
// 4.2
document.body.innerText.trim().split("\n").map(l=>l.trim().split("")).reduce((ra,r,ri,g)=>ra+r.reduce((ca,c,ci)=>ca+(c!=="A"?0:[[[-1,-1],[1,1]],[[-1,1],[1,-1]]].map((ds)=>ds.map(([dr,dc])=>g[ri+dr]?.[ci+dc]??".").sort().join("")).join("")==="MSMS"),0),0) 
// 5.1
document.body.innerText.trim().split("\n\n").map((h,i)=>h.trim().split("\n").map(l => l.trim().split(i?",":"|"))).map((h,i,hs) =>!i?0:h.reduce((ha,ps)=>ha+(ps.every((p,pi)=>hs[0].filter(r=>r[1]==p).map(r=>r[0]).filter(d=>ps.includes(d)).every(d => ps.slice(0,pi).includes(d)))?parseInt(ps[Math.floor(ps.length/2)]):0),0))[1]
// 5.2
document.body.innerText.trim().split("\n\n").map((h,i)=>h.trim().split("\n").map(l=>l.trim().split(i?",":"|"))).map((h,i,hs)=>!i?0:h.filter(ps=>!ps.every((p,pi)=>hs[0].filter(r=>r[1]==p).map(r=>r[0]).filter(d=>ps.includes(d)).every(d => ps.slice(0,pi).includes(d)))).map(ps=>parseInt(ps.sort((a,b)=>hs[0].find(r=>r[0]==a&&r[1]==b)?-1:1)[Math.floor(ps.length/2)])).reduce((a,c)=>a+c,0))[1]
// 6.1
// while loop skill issue
// 6.2
// while loop skill issue
// 7.1
document.body.innerText.trim().split("\n").map(l=>l.trim().split(": ").map((v,i)=>!i?Number(v):v.split(" ").map(Number))).reduce((a,[t,ns])=>a+(Array(2**(ns.length-1)).fill().some((_,i)=>Array(ns.length-1).fill().map((_,j)=>Math.floor(i/(2**j))%2).reduce((ca,o,j)=>o?ca+ns[j+1]:ca*ns[j+1],ns[0])===t)&&t),0)
// 7.2
document.body.innerText.trim().split("\n").map(l=>l.trim().split(": ").map((v,i) =>!i?Number(v):v.split(" ").map(Number))).reduce((a,[t,ns])=>a+(Array(3**(ns.length-1)).fill().some((_,i)=>Array(ns.length-1).fill().map((_,j)=>Math.floor(i/(3**j))%3).reduce((ca,o,j)=>o===0?ca+ns[j+1]:(o===1?ca*ns[j+1]:ca*10**Math.ceil(Math.log10(ns[j+1]+1))+ns[j+1]),ns[0])===t)&&t),0)
