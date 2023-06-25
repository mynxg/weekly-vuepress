const ut="ENTRIES",W="KEYS",$="VALUES",p="";class O{constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=z(this._path);if(z(s)===p)return{done:!1,value:this.result()};const n=t.get(z(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=z(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>z(t)).filter(t=>t!==p).join("")}value(){return z(this._path).node.get(p)}result(){switch(this._type){case $:return this.value();case W:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const z=e=>e[e.length-1],it=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return R(e,t,s,n,i,1,o,""),n},R=(e,t,s,n,o,u,i,r)=>{const h=u*i;t:for(const c of e.keys())if(c===p){const a=o[h-1];a<=s&&n.set(r,[e.get(c),a])}else{let a=u;for(let l=0;l<c.length;++l,++a){const m=c[l],f=i*a,g=f-i;let d=o[f];const F=Math.max(0,a-s-1),y=Math.min(i-1,a+s);for(let _=F;_<y;++_){const I=m!==t[_],x=o[g+_]+ +I,A=o[g+_+1]+1,k=o[f+_]+1,T=o[f+_+1]=Math.min(x,A,k);T<d&&(d=T)}if(d>s)continue t}R(e.get(c),t,s,n,o,a,i,r+c)}};class C{constructor(t=new Map,s=""){this._size=void 0,this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=v(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=S(n);for(const i of o.keys())if(i!==p&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,rt(this._tree,t)}entries(){return new O(this,ut)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return it(this._tree,t,s)}get(t){const s=M(this._tree,t);return s!==void 0?s.get(p):void 0}has(t){const s=M(this._tree,t);return s!==void 0&&s.has(p)}keys(){return new O(this,W)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,B(this._tree,t).set(p,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=B(this._tree,t);return n.set(p,s(n.get(p))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=B(this._tree,t);let o=n.get(p);return o===void 0&&n.set(p,o=s()),o}values(){return new O(this,$)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const v=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==p&&t.startsWith(n))return s.push([e,n]),v(e.get(n),t.slice(n.length),s);return s.push([e,t]),v(void 0,"",s)},M=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==p&&t.startsWith(s))return M(e.get(s),t.slice(s.length))},B=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==p&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const h=e.get(u);if(r===u.length)e=h;else{const c=new Map;c.set(u.slice(r),h),e.set(t.slice(n,n+r),c),e.delete(u),e=c}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},rt=(e,t)=>{const[s,n]=v(e,t);if(s!==void 0){if(s.delete(p),s.size===0)q(n);else if(s.size===1){const[o,u]=s.entries().next().value;P(n,o,u)}}},q=e=>{if(e.length===0)return;const[t,s]=S(e);if(t.delete(s),t.size===0)q(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==p&&P(e.slice(0,-1),n,o)}},P=(e,t,s)=>{if(e.length===0)return;const[n,o]=S(e);n.set(o+t,s),n.delete(o)},S=e=>e[e.length-1],ct=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,j="or",N="and",lt="and_not",ht=(e,t)=>{e.includes(t)||e.push(t)},G=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},J=({score:e},{score:t})=>t-e,at=()=>new Map,b=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},U=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,dt={[j]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),G(n.terms,u)}}return e},[N]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);G(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[lt]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},ft=(e,t,s,n,o,u)=>{const{k:i,b:r,d:h}=u;return Math.log(1+(s-t+.5)/(t+.5))*(h+e*(i+1)/(e+i*(1-r+r*n/o)))},gt=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},Ft={k:1.2,b:.7,d:.5},mt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(ct),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof(console==null?void 0:console[e])=="function"&&console[e](t)},autoVacuum:!0},H={combineWith:j,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:Ft},pt={combineWith:N,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},K={minDirtFactor:.1,minDirtCount:20},yt={..._t,...K};class At{constructor(t){if((t==null?void 0:t.fields)==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...mt,...t,autoVacuum:s,searchOptions:{...H,...t.searchOptions||{}},autoSuggestOptions:{...pt,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=K,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const Ct=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},X=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},zt=(e,t,s,n)=>{if(!e._index.has(n)){X(e,s,t,n);return}const o=e._index.fetch(n,at),u=o.get(t);u==null||u.get(s)==null?X(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},Y=(e,t=j)=>{if(e.length===0)return new Map;const s=t.toLowerCase();return e.reduce(dt[s])||new Map},L=(e,t,s,n,o,u,i,r,h=new Map)=>{if(o==null)return h;for(const c of Object.keys(u)){const a=u[c],l=e._fieldIds[c],m=o.get(l);if(m==null)continue;let f=m.size;const g=e._avgFieldLength[l];for(const d of m.keys()){if(!e._documentIds.has(d)){zt(e,l,d,s),f-=1;continue}const F=i?i(e._documentIds.get(d),s,e._storedFields.get(d)):1;if(!F)continue;const y=m.get(d),_=e._fieldLength.get(d)[l],I=ft(y,f,e._documentCount,_,g,r),x=n*a*F*I,A=h.get(d);if(A){A.score+=x,ht(A.terms,t);const k=U(A.match,s);k?k.push(c):A.match[s]=[c]}else h.set(d,{score:x,terms:[t],match:{[s]:[c]}})}}return h},Et=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((d,F)=>({...d,[F]:U(n.boost,F)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:h}=n,{fuzzy:c,prefix:a}={...H.weights,...i},l=e._index.get(t.term),m=L(e,t.term,t.term,1,l,o,u,h);let f,g;if(t.prefix&&(f=e._index.atPrefix(t.term)),t.fuzzy){const d=t.fuzzy===!0?.2:t.fuzzy,F=d<1?Math.min(r,Math.round(t.term.length*d)):d;F&&(g=e._index.fuzzyGet(t.term,F))}if(f)for(const[d,F]of f){const y=d.length-t.term.length;if(!y)continue;g==null||g.delete(d);const _=a*d.length/(d.length+.3*y);L(e,t.term,d,_,F,o,u,h,m)}if(g)for(const d of g.keys()){const[F,y]=g.get(d);if(!y)continue;const _=c*d.length/(d.length+y);L(e,t.term,d,_,F,o,u,h,m)}return m},Q=(e,t,s={})=>{if(typeof t!="string"){const a={...s,...t,queries:void 0},l=t.queries.map(m=>Q(e,m,a));return Y(l,a.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:h}=i,c=r(t).flatMap(a=>h(a)).filter(a=>!!a).map(gt(i)).map(a=>Et(e,a,i));return Y(c,i.combineWith)},Z=(e,t,s={})=>{const n=Q(e,t,s),o=[];for(const[u,{score:i,terms:r,match:h}]of n){const c=r.length,a={id:e._documentIds.get(u),score:i*c,terms:Object.keys(h),match:h};Object.assign(a,e._storedFields.get(u)),(s.filter==null||s.filter(a))&&o.push(a)}return o.sort(J),o},wt=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of Z(e,t,s)){const r=i.join(" "),h=n.get(r);h!=null?(h.score+=u,h.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:h}]of n)o.push({suggestion:u,terms:r,score:i/h});return o.sort(J),o},xt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:h,serializationVersion:c},a)=>{if(c!==1&&c!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const l=new At(a);l._documentCount=t,l._nextId=s,l._documentIds=b(n),l._idToShortId=new Map,l._fieldIds=o,l._fieldLength=b(u),l._avgFieldLength=i,l._storedFields=b(r),l._dirtCount=h||0,l._index=new C;for(const[m,f]of l._documentIds)l._idToShortId.set(f,m);for(const[m,f]of e){const g=new Map;for(const d of Object.keys(f)){let F=f[d];c===1&&(F=F.ds),g.set(parseInt(d,10),b(F))}l._index.set(m,g)}return l},tt=Object.entries,kt=Object.fromEntries,E=100,w=20,V=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(c,a=!1)=>{let l="";i===0?l=c.length>w?`… ${c.slice(-w)}`:c:a?l=c.length+i>E?`${c.slice(0,E-i)}… `:c:l=c.length>w?`${c.slice(0,w)} … ${c.slice(-w)}`:c,l&&o.push(l),i+=l.length,a||(o.push(["mark",t]),i+=t.length,i>=E&&o.push(" …"))};let h=s.indexOf(n,u);if(h===-1)return null;for(;h>=0;){const c=h+n.length;if(r(e.slice(u,h)),u=c,i>E)break;h=s.indexOf(n,u)}return i<E&&r(e.slice(u),!0),o},et=/[\u4e00-\u9fa5]/g,st=(e={})=>({fuzzy:.2,prefix:!0,processTerm:t=>{const s=t.match(et)||[],n=t.replace(et,"").toLowerCase();return n?[n,...s]:[...s]},...e}),nt=(e,t,s={})=>{const n={};return Z(t,e,st({boost:{h:2,t:1,c:4},...s})).forEach(o=>{const{id:u,terms:i,score:r}=o,h=u.includes("@"),c=u.includes("#"),[a,l]=u.split(/[#@]/),{contents:m}=n[a]??={title:"",contents:[]};if(h)m.push([{type:"customField",key:a,index:l,display:i.map(f=>o.c.map(g=>V(g,f))).flat().filter(f=>f!==null)},r]);else{const f=i.map(g=>V(o.h,g)).filter(g=>g!==null);if(f.length&&m.push([{type:c?"heading":"title",key:a,...c&&{anchor:l},display:f},r]),"t"in o)for(const g of o.t){const d=i.map(F=>V(g,F)).filter(F=>F!==null);d.length&&m.push([{type:"text",key:a,...c&&{anchor:l},display:d},r])}}}),tt(n).sort(([,o],[,u])=>u.contents.reduce((i,[,r])=>i+r,0)-o.contents.reduce((i,[,r])=>i+r,0)).map(([o,{title:u,contents:i}])=>{if(!u){const r=Ct(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},ot=(e,t,s={})=>wt(t,e,st(s)).map(({suggestion:n})=>n),D=kt(tt(JSON.parse("{\"/\":{\"documentCount\":33,\"nextId\":33,\"documentIds\":{\"0\":\"v-119a2bb7\",\"1\":\"v-119a2bb7#_2023\",\"2\":\"v-7b761453\",\"3\":\"v-7b761453#ai\",\"4\":\"v-7b761453#pandora-vercel\",\"5\":\"v-7b761453#new-bing镜像\",\"6\":\"v-7b761453#chatall\",\"7\":\"v-7b761453#chatgpt-midjourney\",\"8\":\"v-7b761453#flowgpt\",\"9\":\"v-7b761453#局域网\",\"10\":\"v-7b761453#学习\",\"11\":\"v-7b761453#go-demo\",\"12\":\"v-7b761453#boxcoding\",\"13\":\"v-7b761453#正则表达式\",\"14\":\"v-7b761453#扩展\",\"15\":\"v-7b761453#docker-osx\",\"16\":\"v-7b761453#plextension-一个图床上传浏览器扩展\",\"17\":\"v-7b761453#progress-一个命令行工具\",\"18\":\"v-7b761453#黑苹果-折腾指南\",\"19\":\"v-7b761453#项目推荐\",\"20\":\"v-7b761453@0\",\"21\":\"v-13a04288\",\"22\":\"v-13a04288#看板\",\"23\":\"v-13a04288#serverstatus-rust\",\"24\":\"v-13a04288#扩展\",\"25\":\"v-13a04288@0\",\"26\":\"v-468e1d84\",\"27\":\"v-468e1d84#思维开拓\",\"28\":\"v-468e1d84#gpt-ai\",\"29\":\"v-468e1d84#个人主页\",\"30\":\"v-468e1d84#github-推荐\",\"31\":\"v-468e1d84@0\",\"32\":\"v-6405dfd2\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[2],\"1\":[1,3],\"2\":[3],\"3\":[1,7],\"4\":[2,18],\"5\":[3,26],\"6\":[1,29],\"7\":[1,12],\"8\":[1,6],\"9\":[1,24],\"10\":[1],\"11\":[2,14],\"12\":[1,16],\"13\":[1,5],\"14\":[1],\"15\":[2,12],\"16\":[2,18],\"17\":[2,19],\"18\":[2,46],\"19\":[1,11],\"20\":[null,null,7],\"21\":[3],\"22\":[1],\"23\":[2,31],\"24\":[1,34],\"25\":[null,null,2],\"26\":[3],\"27\":[1,26],\"28\":[2,26],\"29\":[1,29],\"30\":[2,6],\"31\":[null,null,5],\"32\":[1]},\"averageFieldLength\":[1.5984594330400783,16.79341589861751,0.5412660256410255],\"storedFields\":{\"0\":{\"h\":\"2023 周刊\"},\"1\":{\"h\":\"2023\",\"t\":[\"06-10-逸趣横生\"]},\"2\":{\"h\":\"06-17-一曲很少\"},\"3\":{\"h\":\"AI\",\"t\":[\"chatgpt 镜像：https://chat.wuguokai.cn/\"]},\"4\":{\"h\":\"Pandora-Vercel\",\"t\":[\"项目地址：https://github.com/AngelOver/pandora-vercel\",\"在线地址：pandora-vercel-mauve.vercel.app\",\"https://pandora-vercel-mauve.vercel.app/auth/login\",\"在线案例：\",\"照夜清的AI小宇宙 — ChatGPT 网站！\",\"共享ChatGPT账号-we端直接使用\"]},\"5\":{\"h\":\"new bing镜像：\",\"t\":[\"项目地址：用 Vue3 和 Go 搭建的微软 New Bing 演示站点，拥有一致的 UI 体验，支持 ChatGPT 提示词，国内可用\",\"在线地址：BingAI - 聊天 (vcanbb.top)\",\"使用教程：Docs (feishu.cn)\"]},\"6\":{\"h\":\"ChatAll\",\"t\":[\"项目地址：sunner/ChatAll\",\"支持：Concurrently chat with ChatGPT, Bing Chat, Bard, Alpaca, Vicuna, Claude, ChatGLM, MOSS, 讯飞星火, 文心一言 and more, discover the best answers\",\"多个大型语言模型（LLMs）的 AI 机器人\"]},\"7\":{\"h\":\"ChatGPT+Midjourney\",\"t\":[\"ChatGPT-Midjourney: ChatGPT+Midjourney 网页应用\",\"项目地址: https://github.com/Licoy/ChatGPT-Midjourney\",\"一键免费部署你的私人 ChatGPT+Midjourney 网页应用。集成了ChatGPT的网页聊天+Midjourney的图片生成服务。\"]},\"8\":{\"h\":\"FlowGPT\",\"t\":[\"项目地址：https://flowgpt.com/\",\"Prompt 集合社区\"]},\"9\":{\"h\":\"局域网\",\"t\":[\"局域网文件传输文件：\",\"在线地址：https://snapdrop.net/\",\"其他工具：\",\"localsend : https://localsend.org/\",\"传输速度比较慢\",\"飞秋：http://www.feiq18.com/\",\"HandBrake 视频格式处理工具\",\"在线地址：https://handbrake.fr/\",\"「免费开源的视频格式万能处理工具HandBrake」，可以几乎将视频从任何格式转换为主流平台的视频格式，并压缩到合适的大小，做得挺好的，很方便。\"]},\"10\":{\"h\":\"学习\"},\"11\":{\"h\":\"go-demo\",\"t\":[\"项目地址：https://github.com/pibigstar/go-demo\",\"Go语言实例教程从入门到进阶，包括基础库使用、设计模式、面试易错点、工具类、对接第三方等。\"]},\"12\":{\"h\":\"BoxCoding\",\"t\":[\"项目地址：https://avabucks.it/index\",\"前端初学者的工具网站「BoxCoding」，有不少使用原生HTML/CSS/JavaScript实现的常用效果，做得很精致，同时代码实现挺不错，也适合突然想找某个 Ui 的实现场景。\"]},\"13\":{\"h\":\"正则表达式\",\"t\":[\"项目地址：https://regex101.com\",\"写正则表达式\"]},\"14\":{\"h\":\"扩展\"},\"15\":{\"h\":\"Docker-OSX\",\"t\":[\"项目地址：https://github.com/sickcodes/Docker-OSX\",\"一个运行 macOS 虚拟机的 Docker 镜像。\"]},\"16\":{\"h\":\"PLExtension: 一个图床上传浏览器扩展\",\"t\":[\"项目地址：https://github.com/ZenEcho/PLExtension\",\"一款免费的上传扩展程序提供兰空图床,简单图床,chevereto,阿里云oss,AWS S3,GitHub等程序的文件上传。开源代码，支持粘贴、拖拽、右键上传。\"]},\"17\":{\"h\":\"Progress-一个命令行工具\",\"t\":[\"项目地址：https://github.com/Xfennec/progress\",\"Progress 可以显示当前一些耗时操作的进度，比如 大文件的 cp/mv/dd, 甚至还可以显示下载进度等等。它还提供了一个类似 top 的界面，可以全面监控各种进度。\"]},\"18\":{\"h\":\"黑苹果 折腾指南\",\"t\":[\"现在有 #OpenCore 保驾护航，即使 #macOS 大版本更新也无忧，如今技术不断进步， #Github 上有他人分享的EFI，购买硬件和组装变得更加简单。分享几个黑果技术网站，组装出自己的黑苹果电脑。\",\"OpenCore 中文安装指南：https://sumingyd.github.io/OpenCore-Install-Guide/\",\"黑果小兵：https://blog.daliansky.net/\",\"远景论坛：https://bbs.pcbeta.com/forum.php?gid=86\",\"国光OpenCore配置教程：https://apple.sqlsec.com/\",\"Github搜索EFI：https://github.com/search?q=EFI\",\"Github搜索Hackintosh：https://github.com/search?q=Hackintosh\",\"GeQ1an的EFI：https://github.com/GeQ1an/MSI-B360M-MORTAR-HACKINTOSH-OPENCORE-EFI\"]},\"19\":{\"h\":\"项目推荐\",\"t\":[\"开发设计资源\",\"https://github.com/bradtraversy/design-resources-for-developers\",\"五十个项目\",\"https://github.com/bradtraversy/50projects50days\"]},\"20\":{\"c\":[\"AI\",\"ChatGPT\",\"局域网\",\"学习\",\"扩展\",\"Github 推荐\"]},\"21\":{\"h\":\"06-17-一曲很少\"},\"22\":{\"h\":\"看板\"},\"23\":{\"h\":\"ServerStatus-Rust\",\"t\":[\"多服务器监控\",\"项目地址：zdz/ServerStatus-Rust: ✨ Rust 版 ServerStatus 探针、威力加强版 (github.com)\",\"在线地址：ServerStatus (ssr.rs)\",\"官方教程：快速部署 - Rust 版 ServerStatus 云探针 (ssr.rs)\",\"搭建教程：ServerStatus-Rust 服务器探针搭建使用全指南/保姆级教程 - 星笙月煜 (iocky.com)\",\"更多搭建教程：https://blog.laoda.de/archives/ward-serverstatus-install\"]},\"24\":{\"h\":\"扩展\",\"t\":[\"AI决定：https://eitherchoice.com/\",\"央企招聘平台：https://cujiuye.iguopin.com/\",\"心理测试：https://types.yuzeli.com/survey\",\"提供了各种类型的心理测试，比如心理健康测试、16型人格测试、趣味心理测试、职业规划测试……一个54个类别的心理测试\",\"chatgpt 1000次试用：GPTDOS - GPT Disk Operating System\",\"考试资源网：http://daxuesheng123.ysepan.com/\",\"各类资源共享：https://dwz.date/fxmN\",\"游戏资源：https://dwz.date/fxmP\"]},\"25\":{\"c\":[\"AI\",\"扩展\"]},\"26\":{\"h\":\"06-10-逸趣横生\"},\"27\":{\"h\":\"思维开拓\",\"t\":[\"在线地址：https://joeprevite.com/\",\"webdev, indie hacking and web3\",\"思考的价值：https://thinking.tomotoes.com/\",\"技能树：Jimmy’s working notes\",\"在线地址：https://jimmylv.noto.so/\",\"在线地址：https://blog.jimmylv.info/\",\"项目地址：https://github.com/JimmyLv/jekyll-blog\"]},\"28\":{\"h\":\"GPT - AI\",\"t\":[\"周报生成助手\",\"项目地址： https://github.com/guaguaguaxia/weekly_report\",\"可部署在vercel中，使用openAI API\",\"ChatGPT\",\"项目地址：https://github.com/GPTGenius/chatgpt-vercel\",\"在线地址：chatgpt-vercel\",\"UI 比较好看的chatGPT项目\",\"ChatGPT\",\"项目地址：https://github.com/Yidadaa/ChatGPT-Next-Web\",\"在线地址：chatgpt.nextweb.fun\",\"ChatGPT\",\"项目地址：https://github.com/ourongxing/chatgpt-vercel\",\"在线地址：vercel-chatgpt\",\"可同时配置多个API key\"]},\"29\":{\"h\":\"个人主页\",\"t\":[\"项目地址：https://github.com/Tomotoes/HomePage\",\"在线地址：https://tomotoes.com/\",\"项目地址：https://github.com/imsyy/home\",\"在线地址：www.imsyy.top\",\"项目地址：homepage\",\"项目地址：https://github.com/ademilter/homepage\",\"在线地址：https://ademilter.com/\",\"image-20230610202651424\",\"项目地址：craftzdog-homepage\",\"在线地址：https://www.craftz.dog\",\"项目地址：https://github.com/bastienwirtz/homer\",\"在线地址：https://homer-demo.netlify.app/\",\"项目地址： https://github.com/AyagawaSeirin/ThreebodySpace\",\"在线地址：https://threebody.space/\",\"image-20230610203210183\"]},\"30\":{\"h\":\"Github 推荐\",\"t\":[\"Github用户：https://github.com/surmon-china\"]},\"31\":{\"c\":[\"思维开拓\",\"ChatGPT\",\"个人主页\",\"Github 推荐\"]},\"32\":{\"h\":\"06\"}},\"dirtCount\":0,\"index\":[[\"个人主页\",{\"0\":{\"29\":1},\"2\":{\"31\":1}}],[\"key\",{\"1\":{\"28\":1}}],[\"比较好看的chatgpt项目\",{\"1\":{\"28\":1}}],[\"比如心理健康测试\",{\"1\":{\"24\":1}}],[\"比如\",{\"1\":{\"17\":1}}],[\"使用openai\",{\"1\":{\"28\":1}}],[\"使用教程\",{\"1\":{\"5\":1}}],[\"可同时配置多个api\",{\"1\":{\"28\":1}}],[\"可部署在vercel中\",{\"1\":{\"28\":1}}],[\"可以全面监控各种进度\",{\"1\":{\"17\":1}}],[\"可以显示当前一些耗时操作的进度\",{\"1\":{\"17\":1}}],[\"可以几乎将视频从任何格式转换为主流平台的视频格式\",{\"1\":{\"9\":1}}],[\"周报生成助手\",{\"1\":{\"28\":1}}],[\"周刊\",{\"0\":{\"0\":1}}],[\"noto\",{\"1\":{\"27\":1}}],[\"notes\",{\"1\":{\"27\":1}}],[\"nextweb\",{\"1\":{\"28\":1}}],[\"next\",{\"1\":{\"28\":1}}],[\"netlify\",{\"1\":{\"29\":1}}],[\"net\",{\"1\":{\"9\":1,\"18\":1}}],[\"new\",{\"0\":{\"5\":1},\"1\":{\"5\":1}}],[\"技能树\",{\"1\":{\"27\":1}}],[\"思考的价值\",{\"1\":{\"27\":1}}],[\"思维开拓\",{\"0\":{\"27\":1},\"2\":{\"31\":1}}],[\"jekyll\",{\"1\":{\"27\":1}}],[\"jimmylv\",{\"1\":{\"27\":3}}],[\"jimmy\",{\"1\":{\"27\":1}}],[\"joeprevite\",{\"1\":{\"27\":1}}],[\"javascript实现的常用效果\",{\"1\":{\"12\":1}}],[\"游戏资源\",{\"1\":{\"24\":1}}],[\"各类资源共享\",{\"1\":{\"24\":1}}],[\"yidadaa\",{\"1\":{\"28\":1}}],[\"ysepan\",{\"1\":{\"24\":1}}],[\"yuzeli\",{\"1\":{\"24\":1}}],[\"考试资源网\",{\"1\":{\"24\":1}}],[\"职业规划测试\",{\"1\":{\"24\":1}}],[\"趣味心理测试\",{\"1\":{\"24\":1}}],[\"提供了各种类型的心理测试\",{\"1\":{\"24\":1}}],[\"提示词\",{\"1\":{\"5\":1}}],[\"心理测试\",{\"1\":{\"24\":1}}],[\"央企招聘平台\",{\"1\":{\"24\":1}}],[\"eitherchoice\",{\"1\":{\"24\":1}}],[\"efi\",{\"1\":{\"18\":1}}],[\"更多搭建教程\",{\"1\":{\"23\":1}}],[\"星笙月煜\",{\"1\":{\"23\":1}}],[\"保姆级教程\",{\"1\":{\"23\":1}}],[\"保驾护航\",{\"1\":{\"18\":1}}],[\"服务器探针搭建使用全指南\",{\"1\":{\"23\":1}}],[\"搭建教程\",{\"1\":{\"23\":1}}],[\"搭建的微软\",{\"1\":{\"5\":1}}],[\"云探针\",{\"1\":{\"23\":1}}],[\"快速部署\",{\"1\":{\"23\":1}}],[\"官方教程\",{\"1\":{\"23\":1}}],[\"威力加强版\",{\"1\":{\"23\":1}}],[\"探针\",{\"1\":{\"23\":1}}],[\"版\",{\"1\":{\"23\":2}}],[\"✨\",{\"1\":{\"23\":1}}],[\"zdz\",{\"1\":{\"23\":1}}],[\"zenecho\",{\"1\":{\"16\":1}}],[\"多服务器监控\",{\"1\":{\"23\":1}}],[\"多个大型语言模型\",{\"1\":{\"6\":1}}],[\"rs\",{\"1\":{\"23\":2}}],[\"rust\",{\"0\":{\"23\":1},\"1\":{\"23\":4}}],[\"report\",{\"1\":{\"28\":1}}],[\"resources\",{\"1\":{\"19\":1}}],[\"regex101\",{\"1\":{\"13\":1}}],[\"看板\",{\"0\":{\"22\":1}}],[\"推荐\",{\"0\":{\"30\":1},\"2\":{\"20\":1,\"31\":1}}],[\"50projects50days\",{\"1\":{\"19\":1}}],[\"五十个项目\",{\"1\":{\"19\":1}}],[\"开发设计资源\",{\"1\":{\"19\":1}}],[\"开源代码\",{\"1\":{\"16\":1}}],[\"项目推荐\",{\"0\":{\"19\":1}}],[\"项目地址\",{\"1\":{\"4\":1,\"5\":1,\"6\":1,\"7\":1,\"8\":1,\"11\":1,\"12\":1,\"13\":1,\"15\":1,\"16\":1,\"17\":1,\"23\":1,\"27\":1,\"28\":4,\"29\":7}}],[\"q=hackintosh\",{\"1\":{\"18\":1}}],[\"q=efi\",{\"1\":{\"18\":1}}],[\"国光opencore配置教程\",{\"1\":{\"18\":1}}],[\"国内可用\",{\"1\":{\"5\":1}}],[\"远景论坛\",{\"1\":{\"18\":1}}],[\"黑果小兵\",{\"1\":{\"18\":1}}],[\"黑苹果\",{\"0\":{\"18\":1}}],[\"中文安装指南\",{\"1\":{\"18\":1}}],[\"组装出自己的黑苹果电脑\",{\"1\":{\"18\":1}}],[\"分享几个黑果技术网站\",{\"1\":{\"18\":1}}],[\"购买硬件和组装变得更加简单\",{\"1\":{\"18\":1}}],[\"上有他人分享的efi\",{\"1\":{\"18\":1}}],[\"如今技术不断进步\",{\"1\":{\"18\":1}}],[\"大版本更新也无忧\",{\"1\":{\"18\":1}}],[\"大文件的\",{\"1\":{\"17\":1}}],[\"即使\",{\"1\":{\"18\":1}}],[\"现在有\",{\"1\":{\"18\":1}}],[\"折腾指南\",{\"0\":{\"18\":1}}],[\"它还提供了一个类似\",{\"1\":{\"17\":1}}],[\"甚至还可以显示下载进度等等\",{\"1\":{\"17\":1}}],[\"xfennec\",{\"1\":{\"17\":1}}],[\"右键上传\",{\"1\":{\"16\":1}}],[\"拖拽\",{\"1\":{\"16\":1}}],[\"阿里云oss\",{\"1\":{\"16\":1}}],[\"简单图床\",{\"1\":{\"16\":1}}],[\"虚拟机的\",{\"1\":{\"15\":1}}],[\"ourongxing\",{\"1\":{\"28\":1}}],[\"operating\",{\"1\":{\"24\":1}}],[\"opencore\",{\"1\":{\"18\":4}}],[\"osx\",{\"0\":{\"15\":1},\"1\":{\"15\":1}}],[\"org\",{\"1\":{\"9\":1}}],[\"扩展\",{\"0\":{\"14\":1,\"24\":1},\"2\":{\"20\":1,\"25\":1}}],[\"写正则表达式\",{\"1\":{\"13\":1}}],[\"正则表达式\",{\"0\":{\"13\":1}}],[\"也适合突然想找某个\",{\"1\":{\"12\":1}}],[\"同时代码实现挺不错\",{\"1\":{\"12\":1}}],[\"做得很精致\",{\"1\":{\"12\":1}}],[\"做得挺好的\",{\"1\":{\"9\":1}}],[\"有不少使用原生html\",{\"1\":{\"12\":1}}],[\"前端初学者的工具网站\",{\"1\":{\"12\":1}}],[\"image\",{\"1\":{\"29\":2}}],[\"imsyy\",{\"1\":{\"29\":2}}],[\"iguopin\",{\"1\":{\"24\":1}}],[\"info\",{\"1\":{\"27\":1}}],[\"indie\",{\"1\":{\"27\":1}}],[\"index\",{\"1\":{\"12\":1}}],[\"install\",{\"1\":{\"18\":1,\"23\":1}}],[\"iocky\",{\"1\":{\"23\":1}}],[\"io\",{\"1\":{\"18\":1}}],[\"it\",{\"1\":{\"12\":1}}],[\"对接第三方等\",{\"1\":{\"11\":1}}],[\"工具类\",{\"1\":{\"11\":1}}],[\"面试易错点\",{\"1\":{\"11\":1}}],[\"设计模式\",{\"1\":{\"11\":1}}],[\"包括基础库使用\",{\"1\":{\"11\":1}}],[\"学习\",{\"0\":{\"10\":1},\"2\":{\"20\":1}}],[\"很方便\",{\"1\":{\"9\":1}}],[\"并压缩到合适的大小\",{\"1\":{\"9\":1}}],[\"免费开源的视频格式万能处理工具handbrake\",{\"1\":{\"9\":1}}],[\"视频格式处理工具\",{\"1\":{\"9\":1}}],[\"homer\",{\"1\":{\"29\":2}}],[\"home\",{\"1\":{\"29\":1}}],[\"homepage\",{\"1\":{\"29\":4}}],[\"hacking\",{\"1\":{\"27\":1}}],[\"hackintosh\",{\"1\":{\"18\":1}}],[\"handbrake\",{\"1\":{\"9\":2}}],[\"http\",{\"1\":{\"9\":1,\"24\":1}}],[\"https\",{\"1\":{\"3\":1,\"4\":2,\"7\":1,\"8\":1,\"9\":3,\"11\":1,\"12\":1,\"13\":1,\"15\":1,\"16\":1,\"17\":1,\"18\":7,\"19\":2,\"23\":1,\"24\":5,\"27\":5,\"28\":4,\"29\":10,\"30\":1}}],[\"飞秋\",{\"1\":{\"9\":1}}],[\"传输速度比较慢\",{\"1\":{\"9\":1}}],[\"其他工具\",{\"1\":{\"9\":1}}],[\"space\",{\"1\":{\"29\":1}}],[\"so\",{\"1\":{\"27\":1}}],[\"s\",{\"1\":{\"27\":1}}],[\"system\",{\"1\":{\"24\":1}}],[\"ssr\",{\"1\":{\"23\":2}}],[\"serverstatus\",{\"0\":{\"23\":1},\"1\":{\"23\":6}}],[\"search\",{\"1\":{\"18\":2}}],[\"sqlsec\",{\"1\":{\"18\":1}}],[\"surmon\",{\"1\":{\"30\":1}}],[\"survey\",{\"1\":{\"24\":1}}],[\"sumingyd\",{\"1\":{\"18\":1}}],[\"sunner\",{\"1\":{\"6\":1}}],[\"s3\",{\"1\":{\"16\":1}}],[\"sickcodes\",{\"1\":{\"15\":1}}],[\"snapdrop\",{\"1\":{\"9\":1}}],[\"局域网文件传输文件\",{\"1\":{\"9\":1}}],[\"局域网\",{\"0\":{\"9\":1},\"2\":{\"20\":1}}],[\"集合社区\",{\"1\":{\"8\":1}}],[\"集成了chatgpt的网页聊天+midjourney的图片生成服务\",{\"1\":{\"7\":1}}],[\"php\",{\"1\":{\"18\":1}}],[\"pcbeta\",{\"1\":{\"18\":1}}],[\"progress\",{\"0\":{\"17\":1},\"1\":{\"17\":2}}],[\"prompt\",{\"1\":{\"8\":1}}],[\"plextension\",{\"0\":{\"16\":1},\"1\":{\"16\":1}}],[\"pibigstar\",{\"1\":{\"11\":1}}],[\"pandora\",{\"0\":{\"4\":1},\"1\":{\"4\":3}}],[\"fun\",{\"1\":{\"28\":1}}],[\"fxmp\",{\"1\":{\"24\":1}}],[\"fxmn\",{\"1\":{\"24\":1}}],[\"for\",{\"1\":{\"19\":1}}],[\"forum\",{\"1\":{\"18\":1}}],[\"fr\",{\"1\":{\"9\":1}}],[\"feiq18\",{\"1\":{\"9\":1}}],[\"feishu\",{\"1\":{\"5\":1}}],[\"flowgpt\",{\"0\":{\"8\":1},\"1\":{\"8\":1}}],[\"一款免费的上传扩展程序提供兰空图床\",{\"1\":{\"16\":1}}],[\"一个54个类别的心理测试\",{\"1\":{\"24\":1}}],[\"一个命令行工具\",{\"0\":{\"17\":1}}],[\"一个图床上传浏览器扩展\",{\"0\":{\"16\":1}}],[\"一个运行\",{\"1\":{\"15\":1}}],[\"一键免费部署你的私人\",{\"1\":{\"7\":1}}],[\"一曲很少\",{\"0\":{\"2\":1,\"21\":1}}],[\"网页应用\",{\"1\":{\"7\":2}}],[\"网站\",{\"1\":{\"4\":1}}],[\"机器人\",{\"1\":{\"6\":1}}],[\"的界面\",{\"1\":{\"17\":1}}],[\"的实现场景\",{\"1\":{\"12\":1}}],[\"的\",{\"1\":{\"6\":1}}],[\"laoda\",{\"1\":{\"23\":1}}],[\"localsend\",{\"1\":{\"9\":2}}],[\"login\",{\"1\":{\"4\":1}}],[\"licoy\",{\"1\":{\"7\":1}}],[\"llms\",{\"1\":{\"6\":1}}],[\"tomotoes\",{\"1\":{\"27\":1,\"29\":2}}],[\"top\",{\"1\":{\"5\":1,\"17\":1,\"29\":1}}],[\"threebody\",{\"1\":{\"29\":1}}],[\"threebodyspace\",{\"1\":{\"29\":1}}],[\"thinking\",{\"1\":{\"27\":1}}],[\"the\",{\"1\":{\"6\":1}}],[\"types\",{\"1\":{\"24\":1}}],[\"dog\",{\"1\":{\"29\":1}}],[\"docker\",{\"0\":{\"15\":1},\"1\":{\"15\":2}}],[\"docs\",{\"1\":{\"5\":1}}],[\"dwz\",{\"1\":{\"24\":2}}],[\"date\",{\"1\":{\"24\":2}}],[\"daxuesheng123\",{\"1\":{\"24\":1}}],[\"daliansky\",{\"1\":{\"18\":1}}],[\"disk\",{\"1\":{\"24\":1}}],[\"discover\",{\"1\":{\"6\":1}}],[\"de\",{\"1\":{\"23\":1}}],[\"developers\",{\"1\":{\"19\":1}}],[\"design\",{\"1\":{\"19\":1}}],[\"demo\",{\"0\":{\"11\":1},\"1\":{\"11\":1,\"29\":1}}],[\"dd\",{\"1\":{\"17\":1}}],[\"文心一言\",{\"1\":{\"6\":1}}],[\"讯飞星火\",{\"1\":{\"6\":1}}],[\"msi\",{\"1\":{\"18\":1}}],[\"mv\",{\"1\":{\"17\":1}}],[\"macos\",{\"1\":{\"15\":1,\"18\":1}}],[\"mauve\",{\"1\":{\"4\":2}}],[\"midjourney\",{\"1\":{\"7\":2}}],[\"mortar\",{\"1\":{\"18\":1}}],[\"more\",{\"1\":{\"6\":1}}],[\"moss\",{\"1\":{\"6\":1}}],[\"bastienwirtz\",{\"1\":{\"29\":1}}],[\"bard\",{\"1\":{\"6\":1}}],[\"bradtraversy\",{\"1\":{\"19\":2}}],[\"b360m\",{\"1\":{\"18\":1}}],[\"bbs\",{\"1\":{\"18\":1}}],[\"blog\",{\"1\":{\"18\":1,\"23\":1,\"27\":2}}],[\"boxcoding\",{\"0\":{\"12\":1},\"1\":{\"12\":1}}],[\"best\",{\"1\":{\"6\":1}}],[\"bingai\",{\"1\":{\"5\":1}}],[\"bing\",{\"1\":{\"5\":1,\"6\":1}}],[\"bing镜像\",{\"0\":{\"5\":1}}],[\"聊天\",{\"1\":{\"5\":1}}],[\"支持粘贴\",{\"1\":{\"16\":1}}],[\"支持\",{\"1\":{\"5\":1,\"6\":1}}],[\"体验\",{\"1\":{\"5\":1}}],[\"ui\",{\"1\":{\"5\":1,\"12\":1,\"28\":1}}],[\"拥有一致的\",{\"1\":{\"5\":1}}],[\"演示站点\",{\"1\":{\"5\":1}}],[\"guaguaguaxia\",{\"1\":{\"28\":1}}],[\"guide\",{\"1\":{\"18\":1}}],[\"gptgenius\",{\"1\":{\"28\":1}}],[\"gpt\",{\"0\":{\"28\":1},\"1\":{\"24\":1}}],[\"gptdos\",{\"1\":{\"24\":1}}],[\"geq1an\",{\"1\":{\"18\":1}}],[\"geq1an的efi\",{\"1\":{\"18\":1}}],[\"gid=86\",{\"1\":{\"18\":1}}],[\"github用户\",{\"1\":{\"30\":1}}],[\"github搜索hackintosh\",{\"1\":{\"18\":1}}],[\"github搜索efi\",{\"1\":{\"18\":1}}],[\"github等程序的文件上传\",{\"1\":{\"16\":1}}],[\"github\",{\"0\":{\"30\":1},\"1\":{\"4\":1,\"7\":1,\"11\":1,\"15\":1,\"16\":1,\"17\":1,\"18\":5,\"19\":2,\"23\":1,\"27\":1,\"28\":4,\"29\":5,\"30\":1},\"2\":{\"20\":1,\"31\":1}}],[\"go语言实例教程从入门到进阶\",{\"1\":{\"11\":1}}],[\"go\",{\"0\":{\"11\":1},\"1\":{\"5\":1,\"11\":1}}],[\"和\",{\"1\":{\"5\":1}}],[\"vicuna\",{\"1\":{\"6\":1}}],[\"vcanbb\",{\"1\":{\"5\":1}}],[\"vue3\",{\"1\":{\"5\":1}}],[\"vercel\",{\"0\":{\"4\":1},\"1\":{\"4\":5,\"28\":4}}],[\"用\",{\"1\":{\"5\":1}}],[\"working\",{\"1\":{\"27\":1}}],[\"weekly\",{\"1\":{\"28\":1}}],[\"web\",{\"1\":{\"28\":1}}],[\"web3\",{\"1\":{\"27\":1}}],[\"webdev\",{\"1\":{\"27\":1}}],[\"we端直接使用\",{\"1\":{\"4\":1}}],[\"ward\",{\"1\":{\"23\":1}}],[\"www\",{\"1\":{\"9\":1,\"29\":2}}],[\"with\",{\"1\":{\"6\":1}}],[\"wuguokai\",{\"1\":{\"3\":1}}],[\"共享chatgpt账号\",{\"1\":{\"4\":1}}],[\"照夜清的ai小宇宙\",{\"1\":{\"4\":1}}],[\"在线案例\",{\"1\":{\"4\":1}}],[\"在线地址\",{\"1\":{\"4\":1,\"5\":1,\"9\":2,\"23\":1,\"27\":3,\"28\":3,\"29\":6}}],[\"ayagawaseirin\",{\"1\":{\"29\":1}}],[\"ademilter\",{\"1\":{\"29\":2}}],[\"api\",{\"1\":{\"28\":1}}],[\"apple\",{\"1\":{\"18\":1}}],[\"app\",{\"1\":{\"4\":2,\"29\":1}}],[\"archives\",{\"1\":{\"23\":1}}],[\"aws\",{\"1\":{\"16\":1}}],[\"avabucks\",{\"1\":{\"12\":1}}],[\"answers\",{\"1\":{\"6\":1}}],[\"and\",{\"1\":{\"6\":1,\"27\":1}}],[\"angelover\",{\"1\":{\"4\":1}}],[\"alpaca\",{\"1\":{\"6\":1}}],[\"auth\",{\"1\":{\"4\":1}}],[\"ai决定\",{\"1\":{\"24\":1}}],[\"ai\",{\"0\":{\"3\":1,\"28\":1},\"1\":{\"6\":1},\"2\":{\"20\":1,\"25\":1}}],[\"craftz\",{\"1\":{\"29\":1}}],[\"craftzdog\",{\"1\":{\"29\":1}}],[\"cujiuye\",{\"1\":{\"24\":1}}],[\"cp\",{\"1\":{\"17\":1}}],[\"china\",{\"1\":{\"30\":1}}],[\"chevereto\",{\"1\":{\"16\":1}}],[\"chatglm\",{\"1\":{\"6\":1}}],[\"chatgpt+midjourney\",{\"0\":{\"7\":1},\"1\":{\"7\":2}}],[\"chatgpt\",{\"1\":{\"3\":1,\"4\":1,\"5\":1,\"6\":1,\"7\":2,\"24\":1,\"28\":9},\"2\":{\"20\":1,\"31\":1}}],[\"chatall\",{\"0\":{\"6\":1},\"1\":{\"6\":1}}],[\"chat\",{\"1\":{\"3\":1,\"6\":2}}],[\"css\",{\"1\":{\"12\":1}}],[\"claude\",{\"1\":{\"6\":1}}],[\"concurrently\",{\"1\":{\"6\":1}}],[\"com\",{\"1\":{\"4\":1,\"7\":1,\"8\":1,\"9\":1,\"11\":1,\"13\":1,\"15\":1,\"16\":1,\"17\":1,\"18\":5,\"19\":2,\"23\":2,\"24\":4,\"27\":3,\"28\":4,\"29\":7,\"30\":1}}],[\"cn\",{\"1\":{\"3\":1,\"5\":1}}],[\"镜像\",{\"1\":{\"3\":1,\"15\":1}}],[\"16型人格测试\",{\"1\":{\"24\":1}}],[\"17\",{\"0\":{\"2\":1,\"21\":1}}],[\"1000次试用\",{\"1\":{\"24\":1}}],[\"10\",{\"0\":{\"26\":1},\"1\":{\"1\":1}}],[\"逸趣横生\",{\"0\":{\"26\":1},\"1\":{\"1\":1}}],[\"06\",{\"0\":{\"2\":1,\"21\":1,\"26\":1,\"32\":1},\"1\":{\"1\":1}}],[\"20230610203210183\",{\"1\":{\"29\":1}}],[\"20230610202651424\",{\"1\":{\"29\":1}}],[\"2023\",{\"0\":{\"0\":1,\"1\":1}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,xt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n}})=>{e==="suggest"?self.postMessage(ot(t,D[s],n)):e==="search"?self.postMessage(nt(t,D[s],n)):self.postMessage({suggestions:ot(t,D[s],n),results:nt(t,D[s],n)})};
//# sourceMappingURL=index.js.map