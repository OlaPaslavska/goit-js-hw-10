import{f as l,i as m}from"./vendor-9dd4053f.js";const r=document.getElementById("datetime-picker"),s=document.getElementById("start-timer"),o={days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]")};let d;function a(e){return String(e).padStart(2,"0")}function b(e){const h=Math.floor(e/864e5),f=Math.floor(e%864e5/36e5),y=Math.floor(e%36e5/6e4),p=Math.floor(e%6e4/1e3);return{days:h,hours:f,minutes:y,seconds:p}}function u(e){const{days:t,hours:n,minutes:c,seconds:i}=b(e);o.days.textContent=a(t),o.hours.textContent=a(n),o.minutes.textContent=a(c),o.seconds.textContent=a(i)}function g(e){clearInterval(d),d=setInterval(()=>{const t=new Date().getTime(),n=e-t;n<=0?(clearInterval(d),u(0),m.success({title:"Timer Finished!",message:"The countdown has ended."}),r.disabled=!1,s.disabled=!1):u(n)},1e3)}l(r,{enableTime:!0,time_24hr:!0,minDate:"today",onClose(e){e[0]<new Date?(m.error({title:"Error!",message:"Please choose a future date.",position:"topCenter"}),s.disabled=!0):s.disabled=!1}});s.addEventListener("click",()=>{const e=l.parseDate(r.value);r.disabled=!0,s.disabled=!0,g(e)});
//# sourceMappingURL=1-timer-3562046c.js.map
