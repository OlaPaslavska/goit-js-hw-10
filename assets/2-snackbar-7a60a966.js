import{i as n}from"./vendor-9dd4053f.js";const m=document.querySelector(".form");m.addEventListener("submit",function(r){r.preventDefault();const i=document.querySelector('input[name="delay"]'),t=parseInt(i.value),s=document.querySelector('input[name="state"]:checked'),o=s?s.value:null;new Promise((e,u)=>{if(o==="fulfilled")setTimeout(()=>e(t),t);else if(o==="rejected")setTimeout(()=>u(t),t);else return}).then(e=>{n.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,timeout:5e3})},e=>{n.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,timeout:5e3})})});
//# sourceMappingURL=2-snackbar-7a60a966.js.map
