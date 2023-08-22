import{ai as S,L as k,am as y,M as P,an as B,P as C,Q as I,S as L,T as s,c as a,a8 as q,X as o,ao as A,ap as i,ah as _,K as F,a1 as u,ak as M,al as N}from"./index-17e07460.js";import{c as T,a as m,u as U,d as p,V as R}from"./index.esm-691acfc8.js";import{V as $}from"./VContainer-2dfb725e.js";import{V as d,a as D}from"./VRow-7bd63c14.js";import"./_commonjsHelpers-725317a4.js";const K=t=>(M("data-v-157df891"),t=t(),N(),t),Q=K(()=>_("h1",{class:"text-center"},"Login",-1)),X={class:"text-center"},j={__name:"LoginView",setup(t){const f=k(),h=y(),g=P(),V=T({account:m().required("Account is required").min(4,"Account should have at least 4 characters").max(20,"Account should not exceed 20 characters"),password:m().required("Password is required").min(4,"Password should have at least 4 characters").max(20,"Password should not exceed 20 characters")}),{handleSubmit:v,isSubmitting:w}=U({validationSchema:V}),r=p("account"),l=p("password"),x=v(async c=>{try{const{data:e}=await B.post("/users/login",{account:c.account,password:c.password});g.login({token:e.result.token,account:e.result.account,email:e.result.email,profile:e.result.profile,role:e.result.role}),h.push("/")}catch(e){f({text:e.response.data.message,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}});return(c,e)=>{const b=C("router-link");return I(),L($,null,{default:s(()=>[a(D,{class:"max-width-512"},{default:s(()=>[a(d,{cols:"12"},{default:s(()=>[Q]),_:1}),a(q),a(d,{cols:"12"},{default:s(()=>[a(R,{disabled:o(w),onSubmit:A(o(x),["prevent"])},{default:s(()=>[a(i,{modelValue:o(r).value.value,"onUpdate:modelValue":e[0]||(e[0]=n=>o(r).value.value=n),"error-messages":o(r).errorMessage.value,label:"Account",counter:"",maxlength:"20"},null,8,["modelValue","error-messages"]),a(i,{modelValue:o(l).value.value,"onUpdate:modelValue":e[1]||(e[1]=n=>o(l).value.value=n),"error-messages":o(l).errorMessage.value,label:"Password",counter:"",maxlength:"20",type:"password"},null,8,["modelValue","error-messages"]),_("div",X,[a(F,{type:"submit",color:"primary"},{default:s(()=>[u("Log In")]),_:1})])]),_:1},8,["disabled","onSubmit"])]),_:1}),a(d,{cols:"12",class:"text-center"},{default:s(()=>[u(" Need a Taealam account? "),a(b,{to:"/register",class:"register-link"},{default:s(()=>[u(" Sign Up")]),_:1})]),_:1})]),_:1})]),_:1})}}},O=S(j,[["__scopeId","data-v-157df891"]]);export{O as default};
