const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");t.addEventListener("click",(function(){t.disabled=!0;setInterval((()=>{document.querySelector("body").style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(timerId)}));
//# sourceMappingURL=01-color-switcher.6805bfd4.js.map