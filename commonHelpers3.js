import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i as a}from"./assets/vendor-651d7991.js";const c={timeout:3e3,position:"topRight"},l=document.querySelector(".form");a.settings(c);l.addEventListener("submit",f);function f(e){e.preventDefault();const[t,r,s]=e.currentTarget.elements,o={firstDelay:t.value,step:r.value,amount:s.value};let i=1,u=Number(o.firstDelay);for(;i<=o.amount;)d(i,u).then(({position:n,delay:m})=>a.show({title:`✅ Fulfilled promise ${n} in ${m}ms`,backgroundColor:"green"})).catch(({position:n,delay:m})=>a.show({title:`❌ Rejected promise ${n} in ${m}ms`,backgroundColor:"red"})),i+=1,u+=Number(o.step);l.reset()}function d(e,t){const r=Math.random()>.3;return new Promise((s,o)=>{setTimeout(()=>{r?s({position:e,delay:t}):o({position:e,delay:t})},t)})}
//# sourceMappingURL=commonHelpers3.js.map
