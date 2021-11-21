const itemContainer = document.getElementById("item-container");
fetch("../items.json")
    .then(res => res.json())
    .then(items => {
        items.map(item => {
            var waste = document.createElement("div");
            waste.classList.add("item");
            waste.innerText = item.name;
            itemContainer.appendChild(waste);
            dragElement(waste, item.type);
        });
    });

const bin1 = document.getElementById("bin1");
const bin2 = document.getElementById("bin2");
const bin3 = document.getElementById("bin3");

score = 0;
const scoreCard = document.getElementById("score");

function dragElement(elmnt, type) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = () => closeDragElement(e);
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
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement(e) {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        if (type == 1) {
            checkPos(bin1);
        } else if (type == 2) {
            checkPos(bin2);
        } else if (type == 3) {
            checkPos(bin3);
        }

    }

    function checkPos(correctBin) {
        var top = elmnt.offsetTop;
        var left = elmnt.offsetLeft;

        if (
            top >= correctBin.offsetTop - elmnt.offsetHeight / 2 &&
            left >= correctBin.offsetLeft - elmnt.offsetWidth / 2 &&
            top <=
            correctBin.offsetTop +
            correctBin.offsetHeight -
            elmnt.offsetHeight / 2 &&
            left <=
            correctBin.offsetLeft + correctBin.offsetWidth - elmnt.offsetWidth / 2
        ) {
            changeDesc(type);
            score += 5;
            scoreCard.innerText = score > 9 ? score : "0" + score;
            elmnt.remove();
        }
    }

    function changeDesc(type) {
        // alert(`This is type ${type} waste.`);
        document.getElementById("description").innerHTML = `<p style='color:yellow;'>This is type ${type} waste.</p>`;
        setTimeout(() => {
            document.getElementById("description").innerHTML = "Put the waste in the correct bin";
        }, 2000);

    }
}