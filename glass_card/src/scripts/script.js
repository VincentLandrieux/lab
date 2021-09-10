//---IMPORT---//


//---VARIABLE---//
const card = document.querySelector(".card");
const cardReflect = card.querySelector(".card_reflect");

let cardPos;

//---FUNCTION---//
function init(){
    cardPos = card.getBoundingClientRect();
}

//---EVENT---//
window.addEventListener("resize", () => {
    init();
})

card.addEventListener("mousemove", function(e){
	// mouse position
    const x = e.clientX - cardPos.left;
    const y = e.clientY - cardPos.top;
    // card size
    const w = cardPos.right - cardPos.left;
    const h = cardPos.bottom - cardPos.top;
    // center position
    const cx = w / 2;
    const cy = h / 2;

    // mouse relative position
    const xR = ((x - cx) * 100) / cx;
    const yR = y - cy;

    // update card rotation
    card.setAttribute('style', 
    `transform: rotateY(${(xR * 10) / 100}deg) rotateX(${-(yR * 10) / 100}deg)`);

    // update reflect rotation
    cardReflect.setAttribute('style', 
    `left: ${(-(xR * 50) / 100) + 20}%;
    top: ${-(yR * 50) / 100}%`);

});

card.addEventListener("mouseout", function(e){
    card.setAttribute('style', 
    `transform: rotateY(${0}deg) rotateX(${0}deg)`);

    cardReflect.setAttribute('style', 
    `left: 20%;
    top: 0%`);
});

//---MAIN---//
console.log("Lab Project");
init();
