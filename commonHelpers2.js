import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as m}from"./assets/vendor-63bcb84f.js";const s=document.querySelector("button[data-start]"),c=document.querySelector("#datetime-picker"),y=document.querySelector("span[data-days]"),h=document.querySelector("span[data-hours]"),p=document.querySelector("span[data-minutes]"),S=document.querySelector("span[data-seconds]"),i={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){i.defaultDate>=t[0]?Notiflix.Notify.failure("Please choose a date in the future"):(Notiflix.Notify.success('You can press "Start"'),s.disabled=!1)}};m("#datetime-picker",i);s.addEventListener("click",b);function D(t){const e=Math.floor(t/864e5),o=Math.floor(t%864e5/36e5),n=Math.floor(t%864e5%36e5/6e4),f=Math.floor(t%864e5%36e5%6e4/1e3);return{days:e,hours:o,minutes:n,seconds:f}}const a=t=>t.toString().padStart(2,"0");function b(){s.disabled=!0,c.disabled=!0;const t=setInterval(()=>{const d=new Date,u=new Date(c.value)-d,{days:r,hours:e,minutes:o,seconds:n}=D(u);y.textContent=a(r),h.textContent=a(e),p.textContent=a(o),S.textContent=a(n),r===0&&e===0&&o===0&&n===0&&(clearInterval(t),s.disabled=!1,c.disabled=!1)},1e3)}
//# sourceMappingURL=commonHelpers2.js.map
