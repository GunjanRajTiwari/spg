const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const container = document.getElementById("container");
var time = 59;
var score1 = 0;
var score2 = 0;

var keys = {};

function setControls(event) {
	keys[event.key] = event.type == "keydown";
	// Player 1 controls
	if (keys["ArrowLeft"] && player1.offsetLeft > 0) {
		player1.style.left = player1.offsetLeft - 10 + "px";
	}
	if (
		keys["ArrowRight"] &&
		player1.offsetLeft < window.innerWidth - player1.clientWidth - 1
	) {
		player1.style.left = player1.offsetLeft + 10 + "px";
	}
	if (keys["ArrowUp"] && player1.offsetTop > 0) {
		player1.style.top = player1.offsetTop - 10 + "px";
	}
	if (
		keys["ArrowDown"] &&
		player1.offsetTop < window.innerHeight - player1.clientHeight - 1
	) {
		player1.style.top = player1.offsetTop + 10 + "px";
	}

	// Player 2 controls
	if (keys["a"] && player2.offsetLeft > 0) {
		player2.style.left = player2.offsetLeft - 10 + "px";
	}
	if (
		keys["d"] &&
		player2.offsetLeft < window.innerWidth - player2.clientWidth - 1
	) {
		player2.style.left = player2.offsetLeft + 10 + "px";
	}
	if (keys["w"] && player2.offsetTop > 0) {
		player2.style.top = player2.offsetTop - 10 + "px";
	}
	if (
		keys["s"] &&
		player2.offsetTop < window.innerHeight - player2.clientHeight - 1
	) {
		player2.style.top = player2.offsetTop + 10 + "px";
	}
}
document.addEventListener("keydown", setControls);
document.addEventListener("keyup", setControls);

// Random generator
function random(type) {
	if (type === "width") {
		return Math.floor(Math.random() * (window.innerWidth - 60) + 4);
	} else if (type == "height") {
		return Math.floor(Math.random() * (window.innerHeight - 60) + 4);
	}
}

const timeCard = document.getElementById("time");
const scoreCard1 = document.getElementById("score1");
const scoreCard2 = document.getElementById("score2");
const tung = new Audio("../audios/tung.mp3");
const splash = document.getElementById("splash");
const popup = document.getElementById("popup");
const playBtn = document.getElementById("play-btn");

function play() {
	time = 59;
	score1 = 0;
	score2 = 0;
	scoreCard1.innerText = score1 > 9 ? score1 : "0" + score1;
	scoreCard2.innerText = score2 > 9 ? score2 : "0" + score2;
	var timer = setInterval(() => {
		timeCard.innerText = time > 9 ? time : "0" + time;
		if (time % 2 == 0) {
			var waste = document.createElement("img");
			waste.src = "../images/bag.png";
			waste.classList.add("waste");
			waste.style.left = `${random("width")}px`;
			waste.style.top = `${random("height")}px`;
			container.appendChild(waste);
			judge(waste);
		}
		time -= 1;
		if (time < 0) {
			clearInterval(timer);
			splash.style.display = "flex";
			popup.innerHTML = `
            <h1>Game Over</h1>
            <p>
            Player1 : ${score1} - ${score2} : Player2
            </p>
            <button id="play-btn" class="button">Play Again</button>
            `;
			document.getElementById("play-btn").onclick = playgame;
		}
	}, 1000);
}

function collisionDetection(player, object) {
	var objectX = object.offsetLeft + object.offsetWidth / 2;
	var objectY = object.offsetTop + object.offsetHeight / 2;
	if (
		objectX > player.offsetLeft &&
		objectX < player.offsetLeft + player.offsetWidth &&
		objectY > player.offsetTop &&
		objectY < player.offsetTop + player.offsetHeight
	) {
		return true;
	}
	return false;
}

function judge(waste) {
	const check = setInterval(() => {
		if (collisionDetection(player1, waste)) {
			tung.play();
			container.removeChild(waste);
			score1 += 5;
			scoreCard1.innerText = score1 > 9 ? score1 : "0" + score1;
			clearInterval(check);
			return;
		}
		if (collisionDetection(player2, waste)) {
			tung.play();
			container.removeChild(waste);
			score2 += 5;
			scoreCard2.innerText = score2 > 9 ? score2 : "0" + score2;
			clearInterval(check);
			return;
		}
	}, 5);
}

const playgame = () => {
	splash.style.display = "none";
	play();
};

playBtn.onclick = playgame;
