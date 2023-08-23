import{p as ae,m as se,au as te,g as le,av as oe,u as re,c as e,_ as ne,M as ie,N as ue,x as c,L as de,O as ce,o as me,aa as z,P as pe,Q as F,R as D,T as a,aw as fe,W as ve,$ as I,X as t,K as _,as as M,a9 as we,a3 as ge,ag as E,ah as O,ax as W,a2 as r,at as y,V as _e,ak as P,al as x,am as C,ai as V,a8 as B,an as ye,ao as Ve,ap as he}from"./index-d4e0a8d8.js";import{c as be,a as $,b as Pe,u as xe,d as A,V as K}from"./index.esm-bf0e0f81.js";import{V as Ce,a as ke}from"./VNavigationDrawer-ef79a40f.js";import{V as Se}from"./VContainer-1afb9969.js";import{V as Q,a as m}from"./VRow-9dac4542.js";import"./_commonjsHelpers-725317a4.js";const Le=ae({...se(),...te()},"VLayout"),Ue=le()({name:"VLayout",props:Le(),setup(n,o){let{slots:p}=o;const{layoutClasses:h,layoutStyles:f,getLayoutItem:k,items:v,layoutRef:u}=oe(n);return re(()=>{var d;return e("div",{ref:u,class:[h.value,n.class],style:[f.value,n.style]},[(d=p.default)==null?void 0:d.call(p)])}),{getLayoutItem:k,items:v}}});const R=n=>(Ve("data-v-e775b62e"),n=n(),he(),n),Fe=R(()=>V("h2",{class:"profile-title"},"Profile",-1)),De=R(()=>V("h4",{class:"personal-info-title"},"Personal Information",-1)),Ie=R(()=>V("h4",{class:"personal-info-title"},"Reset Password",-1)),Me={class:"highlight-number"},Be={key:0,class:"highlight-number"},$e={key:1},Ae={class:"highlight-number"},Re={__name:"ProfileView",setup(n){const o=ie(),{avatar:p}=ue(o),h=c(!0),f=de(),{mobile:k}=ce(),v=me(()=>k.value),u=c(v.value),d=c("profile"),X=be({currentPassword:$().required("Password is required"),newPassword:$().required("Password is required").min(4,"Password should have at least 4 characters").max(20,"Password should not exceed 20 characters"),confirmPassword:$().required("Password is required").min(4,"Password should have at least 4 characters").max(20,"Password should not exceed 20 characters").oneOf([Pe("newPassword")],"Passwords do not match")}),{handleSubmit:G,isSubmitting:H,resetForm:T}=xe({validationSchema:X}),S=A("currentPassword"),L=A("newPassword"),U=A("confirmPassword"),J=G(async i=>{try{await z.patch("/users/reset",{currentPassword:i.currentPassword,newPassword:i.newPassword}),f({text:"Password updated successfully",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),T()}catch(s){f({text:s.response.data.message,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),b=c(!1),Y=()=>{b.value=!0},q=()=>{b.value=!1,T(),j.value.deleteFileRecord()},w=c([]),N=c([]),j=c(null),Z=async()=>{if(w.value.length!==0)try{const i=new FormData;w.value.length>0&&i.append("image",w.value[0].file);const{data:s}=await z.patch("/users/image",i);o.image=s.result.image,f({text:"Updated Successfully",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),q()}catch(i){f({text:i.response.data.message,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}};return(i,s)=>{const ee=pe("vue-file-agent");return F(),D(ve,null,[e(Ue,{class:"h-100"},{default:a(()=>[e(Ce,{modelValue:h.value,"onUpdate:modelValue":s[3]||(s[3]=l=>h.value=l),rail:u.value,permanent:"",onClick:s[4]||(s[4]=l=>v.value?u.value=!0:u.value=!1),clipped:v.value},{default:a(()=>[e(I,{"prepend-avatar":t(o).image===void 0?t(p):t(o).image,nav:"",title:"Welcome"},{append:a(()=>[e(_,{variant:"text",icon:"mdi-chevron-left",onClick:s[0]||(s[0]=M(l=>u.value=!u.value,["stop"]))})]),_:1},8,["prepend-avatar"]),e(we),e(ge,{density:"compact",nav:""},{default:a(()=>[e(I,{"prepend-icon":"mdi-account",title:"Profile",value:"profile",onClick:s[1]||(s[1]=l=>d.value="profile")}),e(I,{"prepend-icon":"mdi-history",title:"My Activity",value:"activity",onClick:s[2]||(s[2]=l=>d.value="activity")})]),_:1})]),_:1},8,["modelValue","rail","clipped"]),e(ke,{class:"h-100"},{default:a(()=>[e(Se,null,{default:a(()=>[E(e(Q,{class:"max-width-835"},{default:a(()=>[e(m,{cols:"12",sm:"6"},{default:a(()=>[Fe,De,e(W,{class:"info-label"},{default:a(()=>[r("Account")]),_:1}),e(y,{value:t(o).account,class:"info-input",density:"compact",variant:"outlined",disabled:""},null,8,["value"]),e(W,{class:"info-label"},{default:a(()=>[r("Email")]),_:1}),e(y,{value:t(o).email,class:"info-input",density:"compact",variant:"outlined",disabled:""},null,8,["value"])]),_:1}),e(m,{cols:"12",sm:"6"},{default:a(()=>[e(_e,{src:t(o).image===void 0?t(p):t(o).image,width:"176",height:"176",class:"image",cover:""},null,8,["src"]),e(_,{variant:"text",color:"primary",onClick:Y,class:"ms-10"},{default:a(()=>[r("Upload")]),_:1})]),_:1}),e(K,{disabled:t(H),onSubmit:M(t(J),["prevent"])},{default:a(()=>[e(m,{cols:"12"},{default:a(()=>[Ie]),_:1}),e(m,{cols:"12"},{default:a(()=>[e(y,{density:"compact",type:"password",modelValue:t(S).value.value,"onUpdate:modelValue":s[5]||(s[5]=l=>t(S).value.value=l),"error-messages":t(S).errorMessage.value,label:"Current password",variant:"outlined",class:"info-input",color:"primary"},null,8,["modelValue","error-messages"]),e(y,{density:"compact",type:"password",modelValue:t(L).value.value,"onUpdate:modelValue":s[6]||(s[6]=l=>t(L).value.value=l),"error-messages":t(L).errorMessage.value,label:"New password",variant:"outlined",class:"info-input",color:"primary"},null,8,["modelValue","error-messages"]),e(y,{density:"compact",type:"password",modelValue:t(U).value.value,"onUpdate:modelValue":s[7]||(s[7]=l=>t(U).value.value=l),"error-messages":t(U).errorMessage.value,label:"Confirm new password",variant:"outlined",class:"info-input",color:"primary"},null,8,["modelValue","error-messages"]),e(_,{color:"primary",type:"submit",rounded:"",width:"300",variant:"tonal"},{default:a(()=>[r("Update")]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1},512),[[O,d.value==="profile"]]),E(e(Q,{class:"max-width-835"},{default:a(()=>[e(m,{cols:"12",sm:"6",lg:"4"},{default:a(()=>[e(P,{class:"text-center",variant:"elevated"},{default:a(()=>[e(x,null,{default:a(()=>[r("Liked Articles")]),_:1}),e(C,null,{default:a(()=>{var l,g;return[V("span",Me,B(((g=(l=t(o).profile[0])==null?void 0:l.likedArticles)==null?void 0:g.length)||0),1)]}),_:1})]),_:1})]),_:1}),e(m,{cols:"12",sm:"6",lg:"4"},{default:a(()=>[e(P,{class:"text-center",variant:"elevated"},{default:a(()=>[e(x,null,{default:a(()=>[r("Current Lesson")]),_:1}),e(C,null,{default:a(()=>[t(o).profile[0]&&t(o).profile[0].currentLesson!==null?(F(),D("span",Be,B(t(o).profile[0].currentLesson),1)):(F(),D("p",$e,"Start your learning journey now! Choose a lesson to begin."))]),_:1})]),_:1})]),_:1}),e(m,{cols:"12",sm:"6",lg:"4"},{default:a(()=>[e(P,{class:"text-center",variant:"elevated"},{default:a(()=>[e(x,null,{default:a(()=>[r("Posted Posts")]),_:1}),e(C,null,{default:a(()=>{var l,g;return[V("span",Ae,B(((g=(l=t(o).profile[0])==null?void 0:l.postedPosts)==null?void 0:g.length)||0),1)]}),_:1})]),_:1})]),_:1})]),_:1},512),[[O,d.value==="activity"]])]),_:1})]),_:1})]),_:1}),e(fe,{persistent:"",modelValue:b.value,"onUpdate:modelValue":s[10]||(s[10]=l=>b.value=l),width:"200"},{default:a(()=>[e(K,{onSubmit:M(Z,["prevent"])},{default:a(()=>[e(P,null,{default:a(()=>[e(x,{class:"text-center"},{default:a(()=>[r("Upload Image")]),_:1}),e(C,null,{default:a(()=>[e(ee,{modelValue:w.value,"onUpdate:modelValue":s[8]||(s[8]=l=>w.value=l),"raw-model-value":N.value,"onUpdate:rawModelValue":s[9]||(s[9]=l=>N.value=l),"max-files":1,"max-size":"1MB",accept:"image/jpg,image/jpeg,image/png",multiple:!1,"error-text":{type:"Invalid file format",size:"File is too large"},deletable:"",ref_key:"fileAgent",ref:j},null,8,["modelValue","raw-model-value"])]),_:1}),e(ye,{class:"d-flex justify-center"},{default:a(()=>[e(_,{color:"error",onClick:q},{default:a(()=>[r("Cancel")]),_:1}),e(_,{color:"primary",type:"submit",variant:"elevated"},{default:a(()=>[r("Submit")]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1},8,["modelValue"])],64)}}},Oe=ne(Re,[["__scopeId","data-v-e775b62e"]]);export{Oe as default};
