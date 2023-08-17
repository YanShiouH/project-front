import{x as L,at as te,p as le,au as $,b as ne,m as se,av as ie,d as oe,e as re,aw as ue,a as de,f as ce,ax as ve,g as fe,D as ge,ay as me,n as be,l as pe,O as ye,s as _e,q as j,az as Ve,o as V,aA as N,t as P,u as xe,c as t,K as x,H as B,aB as G,aC as H,_ as he,P as Pe,Q as A,S as O,T as i,an as ee,ao as ae,a2 as h,a8 as M,ap as W,ab as X,ag as Se,ah as ke,M as Le,N as Ce,L as we,ad as Ie,aa as De,R as Q,aD as Be,W as Z,X as b,U as Ae,Z as Re,ae as Fe,af as $e,as as Ne,a4 as Me,a6 as Te,a7 as ze}from"./index-3919ad30.js";import{u as Ue,a as J}from"./vee-validate.esm-07a8a422.js";import{c as qe,a as Y,V as Ee}from"./index.esm-4b3af0e7.js";import{V as Ke}from"./VContainer-b90d38bd.js";import{a as Oe,V as T}from"./VRow-33110aff.js";import{V as We}from"./VTextarea-a3d5144d.js";import"./_commonjsHelpers-39b5b250.js";function Xe(){const e=L([]);te(()=>e.value=[]);function S(u,y){e.value[y]=u}return{refs:e,updateRef:S}}const je=le({activeColor:String,start:{type:[Number,String],default:1},modelValue:{type:Number,default:e=>e.start},disabled:Boolean,length:{type:[Number,String],default:1,validator:e=>e%1===0},totalVisible:[Number,String],firstIcon:{type:$,default:"$first"},prevIcon:{type:$,default:"$prev"},nextIcon:{type:$,default:"$next"},lastIcon:{type:$,default:"$last"},ariaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.root"},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},firstAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.first"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},lastAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.last"},ellipsis:{type:String,default:"..."},showFirstLastPage:Boolean,...ne(),...se(),...ie(),...oe(),...re(),...ue(),...de({tag:"nav"}),...ce(),...ve({variant:"text"})},"VPagination"),Ge=fe()({name:"VPagination",props:je(),emits:{"update:modelValue":e=>!0,first:e=>!0,prev:e=>!0,next:e=>!0,last:e=>!0},setup(e,S){let{slots:u,emit:y}=S;const s=ge(e,"modelValue"),{t:m,n:z}=me(),{isRtl:k}=be(),{themeClasses:R}=pe(e),{width:U}=ye(),C=_e(-1);j(void 0,{scoped:!0});const{resizeRef:w}=Ve(a=>{if(!a.length)return;const{target:n,contentRect:o}=a[0],g=n.querySelector(".v-pagination__list > *");if(!g)return;const p=o.width,D=g.offsetWidth+parseFloat(getComputedStyle(g).marginRight)*2;C.value=F(p,D)}),c=V(()=>parseInt(e.length,10)),r=V(()=>parseInt(e.start,10)),v=V(()=>e.totalVisible?parseInt(e.totalVisible,10):C.value>=0?C.value:F(U.value,58));function F(a,n){const o=e.showFirstLastPage?5:3;return Math.max(0,Math.floor(+((a-n*o)/n).toFixed(2)))}const I=V(()=>{if(c.value<=0||isNaN(c.value)||c.value>Number.MAX_SAFE_INTEGER)return[];if(v.value<=1)return[s.value];if(c.value<=v.value)return N(c.value,r.value);const a=v.value%2===0,n=a?v.value/2:Math.floor(v.value/2),o=a?n:n+1,g=c.value-n;if(o-s.value>=0)return[...N(Math.max(1,v.value-1),r.value),e.ellipsis,c.value];if(s.value-g>=(a?1:0)){const p=v.value-1,D=c.value-p+r.value;return[r.value,e.ellipsis,...N(p,D)]}else{const p=Math.max(1,v.value-3),D=p===1?s.value:s.value-Math.ceil(p/2)+r.value;return[r.value,e.ellipsis,...N(p,D),e.ellipsis,c.value]}});function _(a,n,o){a.preventDefault(),s.value=n,o&&y(o,n)}const{refs:q,updateRef:E}=Xe();j({VPaginationBtn:{color:P(e,"color"),border:P(e,"border"),density:P(e,"density"),size:P(e,"size"),variant:P(e,"variant"),rounded:P(e,"rounded"),elevation:P(e,"elevation")}});const f=V(()=>I.value.map((a,n)=>{const o=g=>E(g,n);if(typeof a=="string")return{isActive:!1,key:`ellipsis-${n}`,page:a,props:{ref:o,ellipsis:!0,icon:!0,disabled:!0}};{const g=a===s.value;return{isActive:g,key:a,page:z(a),props:{ref:o,ellipsis:!1,icon:!0,disabled:!!e.disabled||+e.length<2,color:g?e.activeColor:e.color,ariaCurrent:g,ariaLabel:m(g?e.currentPageAriaLabel:e.pageAriaLabel,a),onClick:p=>_(p,a)}}}})),l=V(()=>{const a=!!e.disabled||s.value<=r.value,n=!!e.disabled||s.value>=r.value+c.value-1;return{first:e.showFirstLastPage?{icon:k.value?e.lastIcon:e.firstIcon,onClick:o=>_(o,r.value,"first"),disabled:a,ariaLabel:m(e.firstAriaLabel),ariaDisabled:a}:void 0,prev:{icon:k.value?e.nextIcon:e.prevIcon,onClick:o=>_(o,s.value-1,"prev"),disabled:a,ariaLabel:m(e.previousAriaLabel),ariaDisabled:a},next:{icon:k.value?e.prevIcon:e.nextIcon,onClick:o=>_(o,s.value+1,"next"),disabled:n,ariaLabel:m(e.nextAriaLabel),ariaDisabled:n},last:e.showFirstLastPage?{icon:k.value?e.firstIcon:e.lastIcon,onClick:o=>_(o,r.value+c.value-1,"last"),disabled:n,ariaLabel:m(e.lastAriaLabel),ariaDisabled:n}:void 0}});function d(){var n;const a=s.value-r.value;(n=q.value[a])==null||n.$el.focus()}function K(a){a.key===G.left&&!e.disabled&&s.value>+e.start?(s.value=s.value-1,H(d)):a.key===G.right&&!e.disabled&&s.value<r.value+c.value-1&&(s.value=s.value+1,H(d))}return xe(()=>t(e.tag,{ref:w,class:["v-pagination",R.value,e.class],style:e.style,role:"navigation","aria-label":m(e.ariaLabel),onKeydown:K,"data-test":"v-pagination-root"},{default:()=>[t("ul",{class:"v-pagination__list"},[e.showFirstLastPage&&t("li",{key:"first",class:"v-pagination__first","data-test":"v-pagination-first"},[u.first?u.first(l.value.first):t(x,B({_as:"VPaginationBtn"},l.value.first),null)]),t("li",{key:"prev",class:"v-pagination__prev","data-test":"v-pagination-prev"},[u.prev?u.prev(l.value.prev):t(x,B({_as:"VPaginationBtn"},l.value.prev),null)]),f.value.map((a,n)=>t("li",{key:a.key,class:["v-pagination__item",{"v-pagination__item--is-active":a.isActive}],"data-test":"v-pagination-item"},[u.item?u.item(a):t(x,B({_as:"VPaginationBtn"},a.props),{default:()=>[a.page]})])),t("li",{key:"next",class:"v-pagination__next","data-test":"v-pagination-next"},[u.next?u.next(l.value.next):t(x,B({_as:"VPaginationBtn"},l.value.next),null)]),e.showFirstLastPage&&t("li",{key:"last",class:"v-pagination__last","data-test":"v-pagination-last"},[u.last?u.last(l.value.last):t(x,B({_as:"VPaginationBtn"},l.value.last),null)])])]})),{}}});const He=e=>(Se("data-v-8d1e1d1e"),e=e(),ke(),e),Qe=He(()=>X("br",null,null,-1)),Ze={__name:"PostCard",props:{_id:{type:String,default:()=>""},account:{type:String,default:()=>""},date:{type:Date,default:()=>""},title:{type:String,default:()=>""},content:{type:String,default:()=>""}},setup(e){return(S,u)=>{const y=Pe("router-link");return A(),O(y,{to:"/discussion/"+e._id,class:"text-decoration-none"},{default:i(()=>[t(ee,{class:"discussion-card"},{default:i(()=>[t(ae,{class:"text-primary"},{default:i(()=>[h(M(e.title),1)]),_:1}),t(W,null,{default:i(()=>[h(M(e.content),1)]),_:1}),t(W,null,{default:i(()=>[h(" Poster: "),X("b",null,M(e.account),1),Qe,h(" "+M(new Date(e.date).toLocaleString("en-US")),1)]),_:1})]),_:1})]),_:1},8,["to"])}}},Je=he(Ze,[["__scopeId","data-v-8d1e1d1e"]]),Ye=X("h1",{class:"text-center"},"Discussion Board",-1),oa={__name:"DiscussionBoard",setup(e){const S=Le(),{isLogin:u}=Ce(S),y=we(),s=L([]);(async()=>{try{const{data:f}=await Ie.get("/discussion"),l=f.result.sort((d,K)=>new Date(K.date)-new Date(d.date));s.value.push(...l)}catch(f){y({text:f.response.data.message,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}})();const m=L(!1),z=L(""),k=()=>{z.value="",m.value=!0},R=()=>{m.value=!1,c()},U=qe({title:Y().required("Title is required"),content:Y().required("Content is required")}),{handleSubmit:C,isSubmitting:w,resetForm:c}=Ue({validationSchema:U,initialValues:{title:"",content:""}}),r=J("title"),v=J("content"),F=C(async f=>{try{const l=new FormData;l.append("title",f.title),l.append("content",f.content),l.append("date",new Date().toISOString()),await De.post("/discussion",l),y({text:"Submitted successfully",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),R()}catch(l){y({text:l.response.data.message,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),I=L(5),_=L(1),q=V(()=>{const f=(_.value-1)*I.value,l=f+I.value;return s.value.slice(f,l)}),E=V(()=>Math.ceil(s.value.length/I.value));return(f,l)=>(A(),Q(Z,null,[t(Ke,null,{default:i(()=>[t(Oe,{class:"max-width-1080"},{default:i(()=>[t(T,{cols:"12"},{default:i(()=>[Ye]),_:1}),t(T,{cols:"12"},{default:i(()=>[t(Ge,{modelValue:_.value,"onUpdate:modelValue":l[0]||(l[0]=d=>_.value=d),length:E.value},null,8,["modelValue","length"])]),_:1}),b(u)?(A(),O(T,{key:0,cols:"12",class:"d-flex justify-end"},{default:i(()=>[t(x,{color:"secondary",onClick:k},{default:i(()=>[h("Add New Post")]),_:1})]),_:1})):Ae("",!0),(A(!0),Q(Z,null,Re(q.value,d=>(A(),O(T,{cols:"12",key:d._id},{default:i(()=>[t(Je,Te(ze(d)),null,16)]),_:2},1024))),128))]),_:1})]),_:1}),t(Be,{persistent:"",modelValue:m.value,"onUpdate:modelValue":l[3]||(l[3]=d=>m.value=d),width:"500px"},{default:i(()=>[t(Ee,{disabled:b(w),onSubmit:Fe(b(F),["prevent"])},{default:i(()=>[t(ee,null,{default:i(()=>[t(ae,null,{default:i(()=>[h("Add New Post")]),_:1}),t(W,null,{default:i(()=>[t($e,{label:"Title",modelValue:b(r).value.value,"onUpdate:modelValue":l[1]||(l[1]=d=>b(r).value.value=d),"error-messages":b(r).errorMessage.value},null,8,["modelValue","error-messages"]),t(We,{label:"Content",modelValue:b(v).value.value,"onUpdate:modelValue":l[2]||(l[2]=d=>b(v).value.value=d),"error-messages":b(v).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),t(Ne,null,{default:i(()=>[t(Me),t(x,{color:"error",onClick:R,loading:b(w)},{default:i(()=>[h("Cancel")]),_:1},8,["loading"]),t(x,{color:"primary",type:"submit",loading:b(w)},{default:i(()=>[h("Submit")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1},8,["modelValue"])],64))}};export{oa as default};
