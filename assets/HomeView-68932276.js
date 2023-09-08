import{x as B,o as x,I as F,ac as M,A as j,Q as T,R as I,ad as N,a6 as W,a7 as D,X as d,ae as y,af as b,a8 as R,U as H,ag as J,ah as P,ai as t,_ as G,M as O,N as K,c as e,T as a,K as h,aj as Q,a2 as r,ak as w,al as A,a0 as V,am as k,an as C,V as S,ao as X,ap as q}from"./index-3cb9fed5.js";import{a as Y}from"./aos-97de04ae.js";import{F as Z}from"./footeR-a84ec2de.js";import{V as _}from"./VContainer-87b58e20.js";import{V as v,a as n}from"./VRow-b1417ece.js";import"./_commonjsHelpers-725317a4.js";const ee=""+new URL("home-bbf8d576.mp4",import.meta.url).href,ae=""+new URL("explore-88e840f9.png",import.meta.url).href,te=""+new URL("language-887d93c7.png",import.meta.url).href,oe=""+new URL("harmony-c4e6e559.png",import.meta.url).href,se="fade-left",le="fade-right",re="fade-up",ne="fade-down",L={[se]:{transform:"translate(-100%, 0)"},[le]:{transform:"translate(100%, 0)"},[re]:{transform:"translate(0, -100%)"},[ne]:{transform:"translate(0, 100%)"},default:{transform:"transform(-100%, 0)"}},de={backgroundColor:{type:String,default:"#091a28"},color:{type:String,default:"#ffffff"},loadingSpeed:{type:Number,default:15},overflowActive:{type:Boolean,default:!0},transitionSpeed:{type:Number,default:1400},transitionType:{type:String,default:"fade-left"}},ie="_preloader_1auhy_3",ce="_percentBar_1auhy_29",ue="_loadingWrapper_1auhy_37",fe="_loadingBar_1auhy_47",_e={preloader:ie,percentBar:ce,loadingWrapper:ue,loadingBar:fe},me=(i,f)=>{const l=i.__vccOpts||i;for(const[c,o]of f)l[c]=o;return l},pe={__name:"VuePreloader",props:de,emits:["loading-is-over","transition-is-over"],setup(i,{emit:f}){const l=i,c=B(null);var o=B(0);const p=x(()=>({backgroundColor:l.backgroundColor})),g=x(()=>({transition:`all ${l.transitionSpeed}ms ease-in-out`})),m=x(()=>{if(o.value>=100)return L[l.transitionType]||L.default});F(()=>{o.value<100?setTimeout(()=>{o.value+=1,c.value&&(c.value.style.width=`${o.value}%`)},l.loadingSpeed):(U(),E())}),M(()=>{l.overflowActive&&z()}),j(()=>{o.value=o.value+=1});function U(){f("loading-is-over")}function $(){document.body.style.overflow="auto"}function z(){document.body.style.overflow="hidden"}function E(){setTimeout(()=>{f("transition-is-over"),l.overflowActive&&$()},l.transitionSpeed)}return(u,Ee)=>(T(),I("div",{class:y(u.$style.preloader),style:b([d(p),d(g),d(m)])},[N(u.$slots,"default",W(D({color:u.color,percent:d(o)})),()=>[d(o)<100?(T(),I("div",{key:0,class:y(u.$style.percentBar),style:b({color:u.color})},R(d(o))+" % ",7)):H("",!0),J(t("div",{class:y(u.$style.loadingWrapper)},[t("div",{ref_key:"loadingbar",ref:c,class:y(u.$style.loadingBar),style:b({backgroundColor:u.color})},null,6)],2),[[P,d(o)<100]])])],6))}},ge={$style:_e},ye=me(pe,[["__cssModules",ge]]);const s=i=>(X("data-v-01758b55"),i=i(),q(),i),he={style:{overflow:"hidden"}},ve={style:{width:"30%"}},be={class:"text-center text-secondary"},xe={class:"video-section"},we=s(()=>t("video",{class:"responsive-video",src:ee,muted:"",autoplay:"",loop:"",type:"video/mp4"},null,-1)),Ae={class:"welcome","data-aos":"fade-right","data-aos-duration":"600","data-aos-delay":"1500"},Ve=s(()=>t("h1",null,"Welcome to Taealam!",-1)),ke=s(()=>t("p",{class:"my-2"},"Start your journey to learn Arabic with us",-1)),Ce=s(()=>t("h1",null,"Journey into Arabic",-1)),Se=s(()=>t("h2",{class:"title"},"Interactive Lessons",-1)),Be=s(()=>t("h2",{class:"title"},"Discussion Forum",-1)),Te=s(()=>t("h2",{class:"title"},"Cultural Insights",-1)),Ie=s(()=>t("h1",{class:"text-center my-6"},"Embrace the Beauty of Arabic",-1)),Le=s(()=>t("p",null,"With 420 million speakers globally, Arabic connects cultures through language and heritage. Beyond words, it reveals the art, stories, and traditions of the Arab world. Dive into the elegance of Arabic culture, enhancing global understanding and unlocking a vibrant language.",-1)),je=s(()=>t("h1",{class:"text-center my-6"},"Explore Arabic's Language Magic",-1)),Re=s(()=>t("p",null,"Arabic learning offers more than words. Mastering Arabic simplifies understanding dialects like Farsi, Turkish, Urdu, and Hebrew due to shared vocabularies. Dive into linguistic connections and access different languages with ease, adding a touch of language magic to your journey.",-1)),Ue=s(()=>t("h1",{class:"text-center my-6"},"Connect Cultures: Learn Arabic",-1)),$e=s(()=>t("p",null,"Arabic learning promotes cultural harmony. While abroad, you embody a cross-cultural ambassador, dispelling stereotypes and fostering understanding. Embrace Arabic to bridge cultures and deepen connections in a diverse world, endorsed by Warwick University's Language Center.",-1)),ze={__name:"HomeView",setup(i){const f=B(!0);j(()=>{setTimeout(()=>{f.value=!1},3e3)}),Y.init();const l=O(),{isLogin:c}=K(l);return(o,p)=>(T(),I("section",he,[e(d(ye),{onLoadingIsOver:p[0]||(p[0]=g=>f.value=!1),overflowActive:!1,"transition-type":"fade-up","background-color":"#fff",color:"#FF6F61"},{default:a(({color:g,percent:m})=>[e(Q,{name:"loading-animation",mode:"in-out"},{default:a(()=>[t("div",ve,[t("h4",be,R(m>100?100:m)+"%",1),t("div",{style:b({backgroundColor:g,height:"3px",width:m+"%"})},null,4)])]),_:2},1024)]),_:1}),t("section",xe,[we,t("div",Ae,[Ve,ke,e(h,{color:"secondary",size:"large",to:d(c)?"/courses":"/login"},{default:a(()=>[r("Get Started")]),_:1},8,["to"])])]),e(_,{class:"py-16 my-16"},{default:a(()=>[e(v,{class:"max-width-1080"},{default:a(()=>[e(n,{cols:"12",class:"text-center"},{default:a(()=>[Ce]),_:1}),e(n,{cols:"12",sm:"4"},{default:a(()=>[e(w,{class:"h-100 pa-6 d-flex flex-column","data-aos":"fade-down","data-aos-duration":"600","data-aos-delay":"200","data-aos-offset":"-50"},{default:a(()=>[e(A,{class:"text-center"},{default:a(()=>[e(V,{color:"secondary",size:"60"},{default:a(()=>[r("mdi-school")]),_:1}),Se]),_:1}),e(k,null,{default:a(()=>[r(" Engaging and interactive lessons to help you learn Arabic effectively. ")]),_:1}),e(C,{class:"justify-center d-flex"},{default:a(()=>[e(h,{variant:"elevated",color:"secondary",to:d(c)?"/courses":"/login"},{default:a(()=>[r("Learn More")]),_:1},8,["to"])]),_:1})]),_:1})]),_:1}),e(n,{cols:"12",sm:"4"},{default:a(()=>[e(w,{class:"h-100 pa-6 d-flex flex-column","data-aos":"fade-down","data-aos-duration":"600","data-aos-delay":"400","data-aos-offset":"-50"},{default:a(()=>[e(A,{class:"text-center"},{default:a(()=>[e(V,{color:"secondary",size:"60"},{default:a(()=>[r("mdi-forum")]),_:1}),Be]),_:1}),e(k,null,{default:a(()=>[r(" Join discussions and engage with other learners to enhance your Arabic skills. ")]),_:1}),e(C,{class:"justify-center d-flex"},{default:a(()=>[e(h,{variant:"elevated",color:"secondary",to:"/discussion"},{default:a(()=>[r("Join Now")]),_:1})]),_:1})]),_:1})]),_:1}),e(n,{cols:"12",sm:"4"},{default:a(()=>[e(w,{class:"h-100 pa-6 d-flex flex-column","data-aos":"fade-down","data-aos-duration":"600","data-aos-delay":"600","data-aos-offset":"-50"},{default:a(()=>[e(A,{class:"text-center"},{default:a(()=>[e(V,{color:"secondary",size:"60"},{default:a(()=>[r("mdi-earth")]),_:1}),Te]),_:1}),e(k,null,{default:a(()=>[r(" Explore the rich culture behind the Arabic language and traditions. ")]),_:1}),e(C,{class:"justify-center d-flex"},{default:a(()=>[e(h,{variant:"elevated",color:"secondary",to:"/culture"},{default:a(()=>[r("Explore")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(_,{fluid:"",style:{"background-color":"rgba(0,150,136,0.2)"}},{default:a(()=>[e(v,null,{default:a(()=>[e(n,{cols:"12",md:"6",class:"d-flex justify-center align-center flex-column order-md-0 order-1 pa-md-16 pa-6"},{default:a(()=>[Ie,Le]),_:1}),e(n,{cols:"12",md:"6",class:"order-0 order-md-1","data-aos":"fade-left","data-aos-duration":"600","data-aos-delay":"800","data-aos-offset":"-50"},{default:a(()=>[e(S,{src:ae,class:"copyImage"})]),_:1})]),_:1})]),_:1}),e(_,{fluid:"",class:"parallax"}),e(_,{fluid:"",style:{"background-color":"rgba(0,150,136,0.2)"}},{default:a(()=>[e(v,null,{default:a(()=>[e(n,{cols:"12",md:"6","data-aos":"fade-right","data-aos-duration":"600","data-aos-delay":"800","data-aos-offset":"-50"},{default:a(()=>[e(S,{src:te,class:"copyImage"})]),_:1}),e(n,{cols:"12",md:"6",class:"d-flex justify-center align-center flex-column pa-md-16 pa-6"},{default:a(()=>[je,Re]),_:1})]),_:1})]),_:1}),e(_,{fluid:"",class:"parallax"}),e(_,{fluid:"",style:{"background-color":"rgba(0,150,136,0.2)"},class:"pb-16"},{default:a(()=>[e(v,null,{default:a(()=>[e(n,{cols:"12",md:"6",class:"d-flex justify-center align-center flex-column order-md-0 order-1 pa-md-16 pa-6"},{default:a(()=>[Ue,$e]),_:1}),e(n,{cols:"12",md:"6",class:"order-0 order-md-1","data-aos":"fade-left","data-aos-duration":"600","data-aos-delay":"800","data-aos-offset":"-50"},{default:a(()=>[e(S,{src:oe,class:"copyImage"})]),_:1})]),_:1})]),_:1}),e(Z)]))}},Je=G(ze,[["__scopeId","data-v-01758b55"]]);export{Je as default};
