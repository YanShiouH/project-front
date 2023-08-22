import{ai as G,P as H,Q as m,S as D,T as o,c as t,au as A,av as R,a1 as r,a7 as v,aw as h,ah as k,ak as J,al as Y,M as ee,N as te,L as ae,x as u,an as oe,a9 as le,o as b,R as F,as as se,W as L,X as s,K as c,U as ne,ap as $,aB as re,aC as ue,Z as de,ao as ie,ax as ce,a3 as me,a5 as fe,a6 as pe}from"./index-17e07460.js";import{c as ve,a as M,u as ge,d as q,V as _e}from"./index.esm-691acfc8.js";import{a as Ve}from"./aos-97de04ae.js";import{V as ye}from"./VContainer-2dfb725e.js";import{a as we,V as d}from"./VRow-7bd63c14.js";import{V as Se}from"./VPagination-716bd612.js";import{V as xe}from"./VTextarea-9abf753a.js";import"./_commonjsHelpers-725317a4.js";const Ce=n=>(J("data-v-8d1e1d1e"),n=n(),Y(),n),be=Ce(()=>k("br",null,null,-1)),De={__name:"PostCard",props:{_id:{type:String,default:()=>""},account:{type:String,default:()=>""},date:{type:Date,default:()=>""},title:{type:String,default:()=>""},content:{type:String,default:()=>""}},setup(n){return(P,B)=>{const i=H("router-link");return m(),D(i,{to:"/discussion/"+n._id,class:"text-decoration-none"},{default:o(()=>[t(A,{class:"discussion-card"},{default:o(()=>[t(R,{class:"text-primary"},{default:o(()=>[r(v(n.title),1)]),_:1}),t(h,null,{default:o(()=>[r(v(n.content),1)]),_:1}),t(h,null,{default:o(()=>[r(" Poster: "),k("b",null,v(n.account),1),be,r(" "+v(new Date(n.date).toLocaleString("en-US")),1)]),_:1})]),_:1})]),_:1},8,["to"])}}},he=G(De,[["__scopeId","data-v-8d1e1d1e"]]);const ke=k("h1",{class:"text-center"},"Discussion Board",-1),$e={__name:"DiscussionBoard",setup(n){Ve.init();const P=ee(),{isLogin:B}=te(P),i=ae(),I=u([]),g=u(0);(async()=>{try{const{data:l}=await oe.get("/discussion"),e=l.result.sort((a,C)=>new Date(C.date)-new Date(a.date));I.value.push(...e)}catch(l){i({text:l.response.data.message,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}})();const f=u(!1),z=u(""),K=()=>{z.value="",f.value=!0},T=()=>{f.value=!1,E()},Q=ve({title:M().required("Title is required"),content:M().required("Content is required")}),{handleSubmit:j,isSubmitting:_,resetForm:E}=ge({validationSchema:Q,initialValues:{title:"",content:""}}),V=q("title"),y=q("content"),O=j(async l=>{try{const e=new FormData;e.append("title",l.title),e.append("content",l.content),e.append("date",new Date().toISOString()),await le.post("/discussion",e),i({text:"Submitted successfully",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),T()}catch(e){i({text:e.response.data.message,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),W=l=>l*200,p=u(""),w=u(""),U=l=>{w.value=l},N=b(()=>{let l=I.value;return w.value.length>0&&(l=l.filter(e=>{const a=w.value.trim().toLowerCase();return e.title.toLowerCase().includes(a)||e.content.toLowerCase().includes(a)})),g.value===0?l=l.sort((e,a)=>new Date(a.date)-new Date(e.date)):l=l.sort((e,a)=>a.comments.length-e.comments.length),l}),S=u(5),x=u(1),X=b(()=>Math.ceil(N.value.length/S.value)),Z=b(()=>{const l=(x.value-1)*S.value,e=l+S.value;return N.value.slice(l,e)});return(l,e)=>(m(),F(L,null,[t(ye,null,{default:o(()=>[t(we,{class:"max-width-1080"},{default:o(()=>[t(d,{cols:"12"},{default:o(()=>[ke]),_:1}),s(B)?(m(),D(d,{key:0,cols:"12",class:"d-flex justify-end"},{default:o(()=>[t(c,{color:"secondary",onClick:K},{default:o(()=>[r("Add New Post")]),_:1})]),_:1})):ne("",!0),t(d,{cols:"5",sm:"8",lg:"9"},{default:o(()=>[t($,{modelValue:p.value,"onUpdate:modelValue":e[0]||(e[0]=a=>p.value=a),placeholder:"Search...","append-inner-icon":"mdi-magnify",variant:"filled",density:"compact","onClick:appendInner":e[1]||(e[1]=a=>U(p.value)),onKeydown:e[2]||(e[2]=re(a=>U(p.value),["enter"]))},null,8,["modelValue"])]),_:1}),t(d,{cols:"7",sm:"4",lg:"3",class:"d-flex justify-end"},{default:o(()=>[t(ue,{modelValue:g.value,"onUpdate:modelValue":e[3]||(e[3]=a=>g.value=a),divided:"",variant:"outlined"},{default:o(()=>[t(c,{variant:"outlined"},{default:o(()=>[r("Newest")]),_:1}),t(c,{variant:"outlined"},{default:o(()=>[r("Popular")]),_:1})]),_:1},8,["modelValue"])]),_:1}),(m(!0),F(L,null,de(Z.value,(a,C)=>(m(),D(d,{cols:"12",key:a._id,"data-aos":"fade-down","data-aos-duration":"1200","data-aos-delay":W(C),"data-aos-offset":"-100"},{default:o(()=>[t(he,fe(pe(a)),null,16)]),_:2},1032,["data-aos-delay"]))),128)),t(d,{cols:"12"},{default:o(()=>[t(Se,{modelValue:x.value,"onUpdate:modelValue":e[4]||(e[4]=a=>x.value=a),length:X.value,size:"20"},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1}),t(se,{persistent:"",modelValue:f.value,"onUpdate:modelValue":e[7]||(e[7]=a=>f.value=a),width:"500px"},{default:o(()=>[t(_e,{disabled:s(_),onSubmit:ie(s(O),["prevent"])},{default:o(()=>[t(A,null,{default:o(()=>[t(R,null,{default:o(()=>[r("Add New Post")]),_:1}),t(h,null,{default:o(()=>[t($,{label:"Title",modelValue:s(V).value.value,"onUpdate:modelValue":e[5]||(e[5]=a=>s(V).value.value=a),"error-messages":s(V).errorMessage.value},null,8,["modelValue","error-messages"]),t(xe,{label:"Content",modelValue:s(y).value.value,"onUpdate:modelValue":e[6]||(e[6]=a=>s(y).value.value=a),"error-messages":s(y).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),t(ce,null,{default:o(()=>[t(me),t(c,{color:"error",onClick:T,loading:s(_)},{default:o(()=>[r("Cancel")]),_:1},8,["loading"]),t(c,{color:"primary",type:"submit",loading:s(_),variant:"elevated"},{default:o(()=>[r("Submit")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1},8,["modelValue"])],64))}};export{$e as default};
