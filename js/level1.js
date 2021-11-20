const bin = document.getElementById("bin");
const container = document.getElementById("container");
var binPos = 2;
var time = 59;
var score = 0;

document.addEventListener("keydown", event => {
	if (event.key === "j" && binPos > 0) {
		binPos -= 10;
		bin.style.left = `${binPos}px`;
	}
	if (event.key === "k" && binPos < window.innerWidth - bin.clientWidth - 1) {
		binPos += 10;
		bin.style.left = `${binPos}px`;
	}
});

// Random generator
function random() {
	return Math.floor(Math.random() * (window.innerWidth - 60) + 4);
}

const timeCard = document.getElementById("time");
const scoreCard = document.getElementById("score");
const tung = new Audio("../audios/tung.mp3");

function play() {
	time = 59;
	score = 0;
	var timer = setInterval(() => {
		timeCard.innerText = time;
		if (time % 5 == 4) {
			var waste = document.createElement("img");
			waste.src = "../images/bag.png";
			waste.classList.add("waste");
			waste.style.left = `${random()}px`;
			container.appendChild(waste);
			rain(waste);
		}
		time -= 1;
		if (time < 0) {
			clearInterval(timer);
		}
	}, 1000);
}

function rain(waste) {
	const down = setInterval(() => {
		waste.style.top = (waste.offsetTop += 2) + "px";
		var currentHeight = waste.offsetTop + 50;
		console.log(currentHeight, window.innerHeight);
		if (
			currentHeight > window.innerHeight - 50 &&
			waste.offsetLeft > bin.offsetLeft &&
			waste.offsetLeft + 50 < bin.offsetLeft + 100
		) {
			clearInterval(down);
			container.removeChild(waste);
			score += 5;
			tung.play();
			scoreCard.innerText = score > 9 ? score : "0" + score;
		}
		if (waste.offsetTop > window.innerHeight - 50) {
			clearInterval(down);
		}
	}, 8);
}

play();
