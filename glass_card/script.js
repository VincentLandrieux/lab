(()=>{var e=document.querySelector(".card"),s=e.querySelector(".card_reflect"),t;function i(){t=e.getBoundingClientRect()}window.addEventListener("resize",()=>{i()});e.addEventListener("mousemove",function(o){let d=o.clientX-t.left,l=o.clientY-t.top,a=t.right-t.left,u=t.bottom-t.top,n=a/2,f=u/2,c=(d-n)*100/n,r=l-f;e.setAttribute("style",`transform: rotateY(${c*10/100}deg) rotateX(${-(r*10)/100}deg)`),s.setAttribute("style",`left: ${-(c*50)/100+20}%;
    top: ${-(r*50)/100}%`)});e.addEventListener("mouseout",function(o){e.setAttribute("style",`transform: rotateY(${0}deg) rotateX(${0}deg)`),s.setAttribute("style",`left: 20%;
    top: 0%`)});console.log("Lab Project");i();})();
//# sourceMappingURL=script.js.map
