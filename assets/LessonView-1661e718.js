import{_ as h,Q as r,S as u,T as t,c as e,al as v,ai as y,an as b,K as g,ak as w,L as k,M as x,ay as L,x as d,ar as S,aa as B,a8 as f,R as N,Z as R,W as T}from"./index-3cb9fed5.js";import{_ as A}from"./BackButton-f22c87b3.js";import{a as M}from"./aos-97de04ae.js";import{V as $}from"./VContainer-87b58e20.js";import{a as m,V as D}from"./VRow-b1417ece.js";import"./_commonjsHelpers-725317a4.js";const H=["innerHTML"],I={__name:"CourseContent",props:{content:{type:String,default:()=>""}},setup(_){const s=_,o=new Audio;o.src=new URL("/tts/"+s.content.split("<br>")[0],"https://bdhsfbjdhfehguhihtryhbd.onrender.com");const n=async()=>{o.play()};return(c,l)=>(r(),u(w,{class:"card"},{default:t(()=>[e(v,null,{default:t(()=>[y("div",{innerHTML:s.content,class:"title-card"},null,8,H)]),_:1}),e(b,null,{default:t(()=>[e(g,{icon:"mdi-volume-medium",color:"primary",onClick:n})]),_:1})]),_:1}))}},P=h(I,[["__scopeId","data-v-f625d4b3"]]);const U={class:"text-center"},j={__name:"LessonView",setup(_){M.init();const s=k(),o=x(),n=L(),c=d([]),l=d(""),i=d("");(async()=>{try{const a=await Promise.all([S.get("/courses/"+n.params.id),B.patch("/users/currentLesson",{_id:n.params.id})]);l.value=a[0].data.result.lessonNo,i.value=a[0].data.result.topic,c.value=[...a[0].data.result.content],o.profile=a[1].data.result}catch(a){console.log(a),s({text:a.response.data.message,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}})();const C=a=>a*50;return(a,E)=>(r(),u($,{class:"h-100"},{default:t(()=>[e(D,{class:"max-width-1080"},{default:t(()=>[e(m,{cols:"12"},{default:t(()=>[y("h1",U,"Lesson "+f(l.value)+": "+f(i.value),1)]),_:1}),(r(!0),N(T,null,R(c.value,(V,p)=>(r(),u(m,{cols:"12",sm:"4",lg:"3",key:p,"data-aos":"fade-down","data-aos-duration":"400","data-aos-delay":C(p),"data-aos-offset":"-100"},{default:t(()=>[e(P,{content:V},null,8,["content"])]),_:2},1032,["data-aos-delay"]))),128))]),_:1}),e(A)]),_:1}))}},z=h(j,[["__scopeId","data-v-469cfdef"]]);export{z as default};
