import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i as c,f as h}from"./assets/vendor-651d7991.js";const o={inputDateRef:document.querySelector("#datetime-picker"),btnStartRef:document.querySelector("[data-start]"),timerRef:document.querySelector(".timer")};let r=null;c.settings({iconUrl:"../images/warning-icon.webp",message:"Please choose a date in the future",timeout:2e3,position:"topCenter",backgroundColor:"red"});const p={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){let e=t[0]-this.now;e<=0?c.show():(r=e,S())}};l();h(o.inputDateRef,p);o.btnStartRef.addEventListener("click",b);function b(t){l(),s(i(r));let e=setInterval(()=>{r-=1e3,r<=0&&clearInterval(e),s(i(r))},1e3)}function i(t){const u=Math.floor(t/864e5),d=Math.floor(t%864e5/36e5),f=Math.floor(t%864e5%36e5/6e4),m=Math.floor(t%864e5%36e5%6e4/1e3);return{days:u,hours:d,minutes:f,seconds:m}}function y(t){let e=String(t);return e.length>1?e:e.padStart(2,"0")}function l(){o.btnStartRef.disabled=!0}function S(){o.btnStartRef.disabled=!1}function s(t){const e=Array.from(o.timerRef.children).flatMap(n=>[...n.children]).filter(n=>n.classList.contains("value"));Object.keys(t).forEach(n=>{e.find(a=>Object.keys(a.dataset).includes(n)).textContent=y(t[n])})}
//# sourceMappingURL=commonHelpers2.js.map
