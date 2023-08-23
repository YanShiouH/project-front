import{_ as P,L as y,aq as C,ar as k,P as q,Q as A,S as B,T as o,c as a,a9 as I,X as e,as as M,at as u,ai as g,K as R,a2 as v,ao as U,ap as E}from"./index-d4e0a8d8.js";import{v as F}from"./index-574964dc.js";import{c as T,a as n,b as N,u as $,d as c,V as L}from"./index.esm-bf0e0f81.js";import{V as D}from"./VContainer-1afb9969.js";import{a as _,V as K}from"./VRow-9dac4542.js";import"./_commonjsHelpers-725317a4.js";const O=l=>(U("data-v-0568058c"),l=l(),E(),l),Q=O(()=>g("h1",{class:"text-center"},"Sign-up",-1)),X={class:"text-center"},j={__name:"RegisterView",setup(l){const w=y(),h=C(),f=T({account:n().required("Account is required").min(4,"Account should have at least 4 characters").max(20,"Account should not exceed 20 characters"),email:n().required("Email is required").test("isEmail","Invalid email format",t=>F.isEmail(t)),password:n().required("Password is required").min(4,"Password should have at least 4 characters").max(20,"Password should not exceed 20 characters"),passwordConfirm:n().required("Password is required").min(4,"Password should have at least 4 characters").max(20,"Password should not exceed 20 characters").oneOf([N("password")],"Passwords do not match")}),{handleSubmit:V,isSubmitting:x}=$({validationSchema:f}),d=c("account"),i=c("email"),m=c("password"),p=c("passwordConfirm"),b=V(async t=>{try{await k.post("/users",{account:t.account,email:t.email,password:t.password}),w({text:"Registration successful",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),h.push("/login")}catch(s){w({text:s.response.data.message,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}});return(t,s)=>{const S=q("router-link");return A(),B(D,null,{default:o(()=>[a(K,{class:"max-width-512"},{default:o(()=>[a(_,{cols:"12"},{default:o(()=>[Q]),_:1}),a(I),a(_,{cols:"12"},{default:o(()=>[a(L,{disabled:e(x),onSubmit:M(e(b),["prevent"])},{default:o(()=>[a(u,{modelValue:e(d).value.value,"onUpdate:modelValue":s[0]||(s[0]=r=>e(d).value.value=r),"error-messages":e(d).errorMessage.value,label:"Account",counter:"","max-length":"20"},null,8,["modelValue","error-messages"]),a(u,{modelValue:e(i).value.value,"onUpdate:modelValue":s[1]||(s[1]=r=>e(i).value.value=r),"error-messages":e(i).errorMessage.value,label:"Email",type:"email"},null,8,["modelValue","error-messages"]),a(u,{modelValue:e(m).value.value,"onUpdate:modelValue":s[2]||(s[2]=r=>e(m).value.value=r),"error-messages":e(m).errorMessage.value,label:"Password",counter:"","max-length":"20",type:"password"},null,8,["modelValue","error-messages"]),a(u,{modelValue:e(p).value.value,"onUpdate:modelValue":s[3]||(s[3]=r=>e(p).value.value=r),"error-messages":e(p).errorMessage.value,label:"Confirm Password",counter:"","max-length":"20",type:"password"},null,8,["modelValue","error-messages"]),g("div",X,[a(R,{type:"submit",color:"primary","text-center":""},{default:o(()=>[v("Sign Up")]),_:1})])]),_:1},8,["disabled","onSubmit"])]),_:1}),a(_,{cols:"12",class:"text-center"},{default:o(()=>[v(" Already have a Taealam Account?"),a(S,{to:"/login",class:"login-link"},{default:o(()=>[v(" Log In")]),_:1})]),_:1})]),_:1})]),_:1})}}},Z=P(j,[["__scopeId","data-v-0568058c"]]);export{Z as default};
