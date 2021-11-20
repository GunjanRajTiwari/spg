dragElement(document.getElementById("item"));
bin1 = document.getElementById("bin1");
bin2 = document.getElementById("bin2");
bin3 = document.getElementById("bin3");
bin1.style.top = "350px";
bin1.style.left = "200px";

score = 0;
const scoreCard = document.getElementById("score");
function dragElement(elmnt){
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        checkPos();
    }

    function checkPos(){
        var top = parseInt(elmnt.style.top.substring(0,elmnt.style.top.length-2));
        var left = parseInt(elmnt.style.left.substring(0,elmnt.style.left.length-2));
        if ((top >= 350 && left >= 200) && 
            (top <= 550 && left <= 400)){
            score++;
            scoreCard.innerText = score > 9 ? score : "0" + score;
            elmnt.remove();
        }
    }
}