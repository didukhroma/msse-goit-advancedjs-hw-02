import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i}from"./assets/vendor-651d7991.js";i.settings({timeout:1e4,position:"topRight",onOpening:function(e,t){console.info("callback abriu!")}});const s=document.querySelector(".form");s.addEventListener("submit",a);function a(e){e.preventDefault();const t={firstDelay:e.currentTarget.elements.delay.value,step:e.currentTarget.elements.step.value,amount:e.currentTarget.elements.amount.value};let o=1,n=Number(t.firstDelay);for(;o<=t.amount;)m(o,n).then(r=>i.show({title:r,backgroundColor:"green"})).catch(r=>i.show({title:r,backgroundColor:"red"})),o+=1,n+=Number(t.step)}function m(e,t){const o=Math.random()>.3;return new Promise((n,r)=>{setTimeout(()=>{o?n(`✅ Fulfilled promise ${e} in ${t}ms`):r(`❌ Rejected promise ${e} in ${t}ms`)},t)})}
//# sourceMappingURL=commonHelpers3.js.map