import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i as m}from"./assets/vendor-651d7991.js";const c={timeout:5e4,position:"topRight",target:".js-wrapper",targetFirst:!1,maxWidth:400},u=document.querySelector(".form");m.settings(c);u.addEventListener("submit",f);function f(e){e.preventDefault();const[t,o,s]=e.currentTarget.elements,r={firstDelay:t.value,step:o.value,amount:s.value};u.reset();let i=1,l=Number(r.firstDelay);for(;i<=r.amount;)p(i,l).then(({position:n,delay:a})=>m.show({title:`✅ Fulfilled promise ${n} in ${a}ms`,backgroundColor:"green"})).catch(({position:n,delay:a})=>m.show({title:`❌ Rejected promise ${n} in ${a}ms`,backgroundColor:"red"})),i+=1,l+=Number(r.step)}function p(e,t){const o=Math.random()>.3;return new Promise((s,r)=>{setTimeout(()=>{o?s({position:e,delay:t}):r({position:e,delay:t})},t)})}
//# sourceMappingURL=commonHelpers3.js.map
