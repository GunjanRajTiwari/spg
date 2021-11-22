const itemContainer = document.getElementById("item-container");
const trash = new Audio("../audios/trash.mp3");
const wrong = new Audio("../audios/fail.mp3");

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
const wasteClass = {
	1: "Organic",
	2: "Recyclable",
	3: "Non Recyclable",
};

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
			if (checkPos(bin1)) correct(type);
			if (checkPos(bin2) || checkPos(bin3)) incorrect(type);
		} else if (type == 2) {
			if (checkPos(bin2)) correct(type);
			if (checkPos(bin1) || checkPos(bin3)) incorrect(type);
		} else if (type == 3) {
			if (checkPos(bin3)) correct(type);
			if (checkPos(bin2) || checkPos(bin1)) incorrect(type);
		}
	}

	function correct(type) {
		trash.play();
		changeDesc(1, elmnt.innerText, type);
		score += 5;
		scoreCard.innerText = score > 9 ? score : "0" + score;
		elmnt.remove();
		if (itemContainer.children.length === 0) {
			gameOver(score);
		}
	}

	function incorrect(type) {
		wrong.play();
		changeDesc(0, elmnt.innerText, type);
		elmnt.remove();
		if (itemContainer.children.length === 0) {
			gameOver(score);
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
			return true;
		}
		return false;
	}

	function gameOver(score) {
		document.getElementById("body").innerHTML = `

				<div class="splash">
				<div style="width: 10%;"></div>
				<div>
				<img src="../images/loading.gif" alt="Loading ..." style="height: 150px; width: 240px;" />
				<h1>Game Over</h1>
				<p>
				Final Score : ${score}
				</p>
				<button onclick="window.location.href=''" id="play-btn" class="button">Play Again</button>
				</div>
				</div>
				
				`;
	}

	function changeDesc(win, name, type) {
		var msg = "Wrong!";
		if (win) msg = "Correct!";
		var desc = document.getElementById("description");
		desc.innerHTML = `<p class = "notice">${msg} ${name} are ${wasteClass[type]} waste.</p>`;
		desc.children[0].style.color = win ? "green" : "red";
	}
}
