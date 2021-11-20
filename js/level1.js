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
	console.log(binPos, window.innerWidth);
});

// Random generator
function random() {
	return Math.floor(Math.random() * (window.innerWidth - 60) + 4);
}

const timeCard = document.getElementById("time");
const scoreCard = document.getElementById("score");

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
		if (waste.offsetTop > window.innerHeight - 50) {
			clearInterval(down);
		}
	}, 10);
}

// play();
