const ut="ENTRIES",W="KEYS",$="VALUES",p="";class O{constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=z(this._path);if(z(s)===p)return{done:!1,value:this.result()};const n=t.get(z(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=z(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>z(t)).filter(t=>t!==p).join("")}value(){return z(this._path).node.get(p)}result(){switch(this._type){case $:return this.value();case W:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const z=e=>e[e.length-1],it=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return R(e,t,s,n,i,1,o,""),n},R=(e,t,s,n,o,u,i,r)=>{const h=u*i;t:for(const c of e.keys())if(c===p){const a=o[h-1];a<=s&&n.set(r,[e.get(c),a])}else{let a=u;for(let l=0;l<c.length;++l,++a){const m=c[l],f=i*a,g=f-i;let d=o[f];const F=Math.max(0,a-s-1),y=Math.min(i-1,a+s);for(let _=F;_<y;++_){const I=m!==t[_],x=o[g+_]+ +I,A=o[g+_+1]+1,k=o[f+_]+1,T=o[f+_+1]=Math.min(x,A,k);T<d&&(d=T)}if(d>s)continue t}R(e.get(c),t,s,n,o,a,i,r+c)}};class C{constructor(t=new Map,s=""){this._size=void 0,this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=v(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=S(n);for(const i of o.keys())if(i!==p&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,rt(this._tree,t)}entries(){return new O(this,ut)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return it(this._tree,t,s)}get(t){const s=M(this._tree,t);return s!==void 0?s.get(p):void 0}has(t){const s=M(this._tree,t);return s!==void 0&&s.has(p)}keys(){return new O(this,W)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,B(this._tree,t).set(p,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=B(this._tree,t);return n.set(p,s(n.get(p))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=B(this._tree,t);let o=n.get(p);return o===void 0&&n.set(p,o=s()),o}values(){return new O(this,$)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const v=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==p&&t.startsWith(n))return s.push([e,n]),v(e.get(n),t.slice(n.length),s);return s.push([e,t]),v(void 0,"",s)},M=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==p&&t.startsWith(s))return M(e.get(s),t.slice(s.length))},B=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==p&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const h=e.get(u);if(r===u.length)e=h;else{const c=new Map;c.set(u.slice(r),h),e.set(t.slice(n,n+r),c),e.delete(u),e=c}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},rt=(e,t)=>{const[s,n]=v(e,t);if(s!==void 0){if(s.delete(p),s.size===0)q(n);else if(s.size===1){const[o,u]=s.entries().next().value;P(n,o,u)}}},q=e=>{if(e.length===0)return;const[t,s]=S(e);if(t.delete(s),t.size===0)q(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==p&&P(e.slice(0,-1),n,o)}},P=(e,t,s)=>{if(e.length===0)return;const[n,o]=S(e);n.set(o+t,s),n.delete(o)},S=e=>e[e.length-1],ct=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,j="or",N="and",lt="and_not",ht=(e,t)=>{e.includes(t)||e.push(t)},G=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},J=({score:e},{score:t})=>t-e,at=()=>new Map,b=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},U=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,dt={[j]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),G(n.terms,u)}}return e},[N]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);G(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[lt]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},ft=(e,t,s,n,o,u)=>{const{k:i,b:r,d:h}=u;return Math.log(1+(s-t+.5)/(t+.5))*(h+e*(i+1)/(e+i*(1-r+r*n/o)))},gt=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},Ft={k:1.2,b:.7,d:.5},mt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(ct),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof(console==null?void 0:console[e])=="function"&&console[e](t)},autoVacuum:!0},H={combineWith:j,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:Ft},pt={combineWith:N,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},K={minDirtFactor:.1,minDirtCount:20},yt={..._t,...K};class At{constructor(t){if((t==null?void 0:t.fields)==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...mt,...t,autoVacuum:s,searchOptions:{...H,...t.searchOptions||{}},autoSuggestOptions:{...pt,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=K,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const Ct=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},X=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},zt=(e,t,s,n)=>{if(!e._index.has(n)){X(e,s,t,n);return}const o=e._index.fetch(n,at),u=o.get(t);u==null||u.get(s)==null?X(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},Y=(e,t=j)=>{if(e.length===0)return new Map;const s=t.toLowerCase();return e.reduce(dt[s])||new Map},L=(e,t,s,n,o,u,i,r,h=new Map)=>{if(o==null)return h;for(const c of Object.keys(u)){const a=u[c],l=e._fieldIds[c],m=o.get(l);if(m==null)continue;let f=m.size;const g=e._avgFieldLength[l];for(const d of m.keys()){if(!e._documentIds.has(d)){zt(e,l,d,s),f-=1;continue}const F=i?i(e._documentIds.get(d),s,e._storedFields.get(d)):1;if(!F)continue;const y=m.get(d),_=e._fieldLength.get(d)[l],I=ft(y,f,e._documentCount,_,g,r),x=n*a*F*I,A=h.get(d);if(A){A.score+=x,ht(A.terms,t);const k=U(A.match,s);k?k.push(c):A.match[s]=[c]}else h.set(d,{score:x,terms:[t],match:{[s]:[c]}})}}return h},Et=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((d,F)=>({...d,[F]:U(n.boost,F)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:h}=n,{fuzzy:c,prefix:a}={...H.weights,...i},l=e._index.get(t.term),m=L(e,t.term,t.term,1,l,o,u,h);let f,g;if(t.prefix&&(f=e._index.atPrefix(t.term)),t.fuzzy){const d=t.fuzzy===!0?.2:t.fuzzy,F=d<1?Math.min(r,Math.round(t.term.length*d)):d;F&&(g=e._index.fuzzyGet(t.term,F))}if(f)for(const[d,F]of f){const y=d.length-t.term.length;if(!y)continue;g==null||g.delete(d);const _=a*d.length/(d.length+.3*y);L(e,t.term,d,_,F,o,u,h,m)}if(g)for(const d of g.keys()){const[F,y]=g.get(d);if(!y)continue;const _=c*d.length/(d.length+y);L(e,t.term,d,_,F,o,u,h,m)}return m},Q=(e,t,s={})=>{if(typeof t!="string"){const a={...s,...t,queries:void 0},l=t.queries.map(m=>Q(e,m,a));return Y(l,a.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:h}=i,c=r(t).flatMap(a=>h(a)).filter(a=>!!a).map(gt(i)).map(a=>Et(e,a,i));return Y(c,i.combineWith)},Z=(e,t,s={})=>{const n=Q(e,t,s),o=[];for(const[u,{score:i,terms:r,match:h}]of n){const c=r.length,a={id:e._documentIds.get(u),score:i*c,terms:Object.keys(h),match:h};Object.assign(a,e._storedFields.get(u)),(s.filter==null||s.filter(a))&&o.push(a)}return o.sort(J),o},wt=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of Z(e,t,s)){const r=i.join(" "),h=n.get(r);h!=null?(h.score+=u,h.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:h}]of n)o.push({suggestion:u,terms:r,score:i/h});return o.sort(J),o},xt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:h,serializationVersion:c},a)=>{if(c!==1&&c!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const l=new At(a);l._documentCount=t,l._nextId=s,l._documentIds=b(n),l._idToShortId=new Map,l._fieldIds=o,l._fieldLength=b(u),l._avgFieldLength=i,l._storedFields=b(r),l._dirtCount=h||0,l._index=new C;for(const[m,f]of l._documentIds)l._idToShortId.set(f,m);for(const[m,f]of e){const g=new Map;for(const d of Object.keys(f)){let F=f[d];c===1&&(F=F.ds),g.set(parseInt(d,10),b(F))}l._index.set(m,g)}return l},tt=Object.entries,kt=Object.fromEntries,E=100,w=20,V=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(c,a=!1)=>{let l="";i===0?l=c.length>w?`… ${c.slice(-w)}`:c:a?l=c.length+i>E?`${c.slice(0,E-i)}… `:c:l=c.length>w?`${c.slice(0,w)} … ${c.slice(-w)}`:c,l&&o.push(l),i+=l.length,a||(o.push(["mark",t]),i+=t.length,i>=E&&o.push(" …"))};let h=s.indexOf(n,u);if(h===-1)return null;for(;h>=0;){const c=h+n.length;if(r(e.slice(u,h)),u=c,i>E)break;h=s.indexOf(n,u)}return i<E&&r(e.slice(u),!0),o},et=/[\u4e00-\u9fa5]/g,st=(e={})=>({fuzzy:.2,prefix:!0,processTerm:t=>{const s=t.match(et)||[],n=t.replace(et,"").toLowerCase();return n?[n,...s]:[...s]},...e}),nt=(e,t,s={})=>{const n={};return Z(t,e,st({boost:{h:2,t:1,c:4},...s})).forEach(o=>{const{id:u,terms:i,score:r}=o,h=u.includes("@"),c=u.includes("#"),[a,l]=u.split(/[#@]/),{contents:m}=n[a]??={title:"",contents:[]};if(h)m.push([{type:"customField",key:a,index:l,display:i.map(f=>o.c.map(g=>V(g,f))).flat().filter(f=>f!==null)},r]);else{const f=i.map(g=>V(o.h,g)).filter(g=>g!==null);if(f.length&&m.push([{type:c?"heading":"title",key:a,...c&&{anchor:l},display:f},r]),"t"in o)for(const g of o.t){const d=i.map(F=>V(g,F)).filter(F=>F!==null);d.length&&m.push([{type:"text",key:a,...c&&{anchor:l},display:d},r])}}}),tt(n).sort(([,o],[,u])=>u.contents.reduce((i,[,r])=>i+r,0)-o.contents.reduce((i,[,r])=>i+r,0)).map(([o,{title:u,contents:i}])=>{if(!u){const r=Ct(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},ot=(e,t,s={})=>wt(t,e,st(s)).map(({suggestion:n})=>n),D=kt(tt(JSON.parse("{\"/\":{\"documentCount\":9,\"nextId\":9,\"documentIds\":{\"0\":\"v-119a2bb7\",\"1\":\"v-119a2bb7#_2023\",\"2\":\"v-468e1d84\",\"3\":\"v-468e1d84#思维开拓\",\"4\":\"v-468e1d84#gpt-ai\",\"5\":\"v-468e1d84#个人主页\",\"6\":\"v-468e1d84#github-推荐\",\"7\":\"v-468e1d84@0\",\"8\":\"v-6405dfd2\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[2],\"1\":[1,3],\"2\":[3],\"3\":[1,26],\"4\":[2,26],\"5\":[1,29],\"6\":[2,6],\"7\":[null,null,5],\"8\":[1]},\"averageFieldLength\":[1.6349206349206349,13.071428571428571,0.625],\"storedFields\":{\"0\":{\"h\":\"2023 周刊\"},\"1\":{\"h\":\"2023\",\"t\":[\"06-10-逸趣横生\"]},\"2\":{\"h\":\"06-10-逸趣横生\"},\"3\":{\"h\":\"思维开拓\",\"t\":[\"在线地址：https://joeprevite.com/\",\"webdev, indie hacking and web3\",\"思考的价值：https://thinking.tomotoes.com/\",\"技能树：Jimmy’s working notes\",\"在线地址：https://jimmylv.noto.so/\",\"在线地址：https://blog.jimmylv.info/\",\"项目地址：https://github.com/JimmyLv/jekyll-blog\"]},\"4\":{\"h\":\"GPT - AI\",\"t\":[\"周报生成助手\",\"项目地址： https://github.com/guaguaguaxia/weekly_report\",\"可部署在vercel中，使用openAI API\",\"ChatGPT\",\"项目地址：https://github.com/GPTGenius/chatgpt-vercel\",\"在线地址：chatgpt-vercel\",\"UI 比较好看的chatGPT项目\",\"ChatGPT\",\"项目地址：https://github.com/Yidadaa/ChatGPT-Next-Web\",\"在线地址：chatgpt.nextweb.fun\",\"ChatGPT\",\"项目地址：https://github.com/ourongxing/chatgpt-vercel\",\"在线地址：vercel-chatgpt\",\"可同时配置多个API key\"]},\"5\":{\"h\":\"个人主页\",\"t\":[\"项目地址：https://github.com/Tomotoes/HomePage\",\"在线地址：https://tomotoes.com/\",\"项目地址：https://github.com/imsyy/home\",\"在线地址：www.imsyy.top\",\"项目地址：homepage\",\"项目地址：https://github.com/ademilter/homepage\",\"在线地址：https://ademilter.com/\",\"image-20230610202651424\",\"项目地址：craftzdog-homepage\",\"在线地址：https://www.craftz.dog\",\"项目地址：https://github.com/bastienwirtz/homer\",\"在线地址：https://homer-demo.netlify.app/\",\"项目地址： https://github.com/AyagawaSeirin/ThreebodySpace\",\"在线地址：https://threebody.space/\",\"image-20230610203210183\"]},\"6\":{\"h\":\"Github 推荐\",\"t\":[\"Github用户：https://github.com/surmon-china\"]},\"7\":{\"c\":[\"思维开拓\",\"ChatGPT\",\"个人主页\",\"Github 推荐\"]},\"8\":{\"h\":\"06\"}},\"dirtCount\":0,\"index\":[[\"推荐\",{\"0\":{\"6\":1},\"2\":{\"7\":1}}],[\"demo\",{\"1\":{\"5\":1}}],[\"dog\",{\"1\":{\"5\":1}}],[\"bastienwirtz\",{\"1\":{\"5\":1}}],[\"blog\",{\"1\":{\"3\":2}}],[\"image\",{\"1\":{\"5\":2}}],[\"imsyy\",{\"1\":{\"5\":2}}],[\"info\",{\"1\":{\"3\":1}}],[\"indie\",{\"1\":{\"3\":1}}],[\"个人主页\",{\"0\":{\"5\":1},\"2\":{\"7\":1}}],[\"key\",{\"1\":{\"4\":1}}],[\"可同时配置多个api\",{\"1\":{\"4\":1}}],[\"可部署在vercel中\",{\"1\":{\"4\":1}}],[\"ourongxing\",{\"1\":{\"4\":1}}],[\"fun\",{\"1\":{\"4\":1}}],[\"netlify\",{\"1\":{\"5\":1}}],[\"nextweb\",{\"1\":{\"4\":1}}],[\"next\",{\"1\":{\"4\":1}}],[\"noto\",{\"1\":{\"3\":1}}],[\"notes\",{\"1\":{\"3\":1}}],[\"yidadaa\",{\"1\":{\"4\":1}}],[\"比较好看的chatgpt项目\",{\"1\":{\"4\":1}}],[\"ui\",{\"1\":{\"4\":1}}],[\"vercel\",{\"1\":{\"4\":4}}],[\"china\",{\"1\":{\"6\":1}}],[\"chatgpt\",{\"1\":{\"4\":9},\"2\":{\"7\":1}}],[\"craftz\",{\"1\":{\"5\":1}}],[\"craftzdog\",{\"1\":{\"5\":1}}],[\"com\",{\"1\":{\"3\":3,\"4\":4,\"5\":7,\"6\":1}}],[\"使用openai\",{\"1\":{\"4\":1}}],[\"report\",{\"1\":{\"4\":1}}],[\"周报生成助手\",{\"1\":{\"4\":1}}],[\"周刊\",{\"0\":{\"0\":1}}],[\"ayagawaseirin\",{\"1\":{\"5\":1}}],[\"app\",{\"1\":{\"5\":1}}],[\"api\",{\"1\":{\"4\":1}}],[\"ademilter\",{\"1\":{\"5\":2}}],[\"ai\",{\"0\":{\"4\":1}}],[\"and\",{\"1\":{\"3\":1}}],[\"guaguaguaxia\",{\"1\":{\"4\":1}}],[\"gptgenius\",{\"1\":{\"4\":1}}],[\"gpt\",{\"0\":{\"4\":1}}],[\"github用户\",{\"1\":{\"6\":1}}],[\"github\",{\"0\":{\"6\":1},\"1\":{\"3\":1,\"4\":4,\"5\":5,\"6\":1},\"2\":{\"7\":1}}],[\"项目地址\",{\"1\":{\"3\":1,\"4\":4,\"5\":7}}],[\"www\",{\"1\":{\"5\":2}}],[\"weekly\",{\"1\":{\"4\":1}}],[\"web\",{\"1\":{\"4\":1}}],[\"web3\",{\"1\":{\"3\":1}}],[\"webdev\",{\"1\":{\"3\":1}}],[\"working\",{\"1\":{\"3\":1}}],[\"surmon\",{\"1\":{\"6\":1}}],[\"space\",{\"1\":{\"5\":1}}],[\"so\",{\"1\":{\"3\":1}}],[\"s\",{\"1\":{\"3\":1}}],[\"jekyll\",{\"1\":{\"3\":1}}],[\"jimmylv\",{\"1\":{\"3\":3}}],[\"jimmy\",{\"1\":{\"3\":1}}],[\"joeprevite\",{\"1\":{\"3\":1}}],[\"技能树\",{\"1\":{\"3\":1}}],[\"threebody\",{\"1\":{\"5\":1}}],[\"threebodyspace\",{\"1\":{\"5\":1}}],[\"thinking\",{\"1\":{\"3\":1}}],[\"top\",{\"1\":{\"5\":1}}],[\"tomotoes\",{\"1\":{\"3\":1,\"5\":2}}],[\"思考的价值\",{\"1\":{\"3\":1}}],[\"思维开拓\",{\"0\":{\"3\":1},\"2\":{\"7\":1}}],[\"homer\",{\"1\":{\"5\":2}}],[\"home\",{\"1\":{\"5\":1}}],[\"homepage\",{\"1\":{\"5\":4}}],[\"hacking\",{\"1\":{\"3\":1}}],[\"https\",{\"1\":{\"3\":5,\"4\":4,\"5\":10,\"6\":1}}],[\"在线地址\",{\"1\":{\"3\":3,\"4\":3,\"5\":6}}],[\"逸趣横生\",{\"0\":{\"2\":1},\"1\":{\"1\":1}}],[\"10\",{\"0\":{\"2\":1},\"1\":{\"1\":1}}],[\"06\",{\"0\":{\"2\":1,\"8\":1},\"1\":{\"1\":1}}],[\"20230610203210183\",{\"1\":{\"5\":1}}],[\"20230610202651424\",{\"1\":{\"5\":1}}],[\"2023\",{\"0\":{\"0\":1,\"1\":1}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,xt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n}})=>{e==="suggest"?self.postMessage(ot(t,D[s],n)):e==="search"?self.postMessage(nt(t,D[s],n)):self.postMessage({suggestions:ot(t,D[s],n),results:nt(t,D[s],n)})};
//# sourceMappingURL=index.js.map
