const colors = [
	"#87CEEB",
	"#4682B4",
	"#1E90FF",
	"#00BFFF",
	"#5F9EA0",
	"#6495ED"
];

const letters = "I LOVE YOU PEDCUUU";
const images = [
	"./img/image1.jpg",
	"./img/image2.jpg",
	"./img/image3.jpg",
	"./img/image4.jpg",
	"./img/image5.jpg"
];

let letterIndex = 0;

function getRandomLetter() {
	const letter = letters.charAt(letterIndex);
	letterIndex = (letterIndex + 1) % letters.length;
	return letter;
}

function createFirework(x, y) {
	const launchHeight =
		Math.random() * (window.innerHeight / 4) + window.innerHeight / 4;
	const projectile = document.createElement("div");
	projectile.classList.add("projectile");
	document.body.appendChild(projectile);
	projectile.style.left = `${x}px`;
	projectile.style.top = `${y}px`;

	anime({
		targets: projectile,
		translateY: -launchHeight,
		duration: 1200,
		easing: "easeOutQuad",
		complete: () => {
			projectile.remove();
			createBurst(x, y - launchHeight);
		}
	});
}

function createBurst(x, y) {
	const numLetters = 15;
	const numSparkles = 50;

	// Letters
	for (let i = 0; i < numLetters; i++) {
		createParticle(x, y, false);
	}

	// Sparkles
	for (let i = 0; i < numSparkles; i++) {
		createParticle(x, y, true);
	}

	// Show gift box after fireworks burst
	setTimeout(() => createGiftBox(x, y), 1000);
}

function createParticle(x, y, isSparkle) {
	const el = document.createElement("div");
	el.classList.add(isSparkle ? "sparkle" : "particule");
	document.querySelector('.instructions').style.display = 'none';

	if (!isSparkle) {
		el.textContent = getRandomLetter();
		el.style.color = colors[Math.floor(Math.random() * colors.length)];
	} else {
		el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
	}

	el.style.left = `${x}px`;
	el.style.top = `${y}px`;
	document.body.appendChild(el);

	animateParticle(el, isSparkle);
}

function animateParticle(el, isSparkle) {
	const angle = Math.random() * Math.PI * 2;
	const distance = anime.random(100, 200);
	const duration = anime.random(1200, 2000);
	const fallDistance = anime.random(20, 80);
	const scale = isSparkle ? Math.random() * 0.5 + 0.5 : Math.random() * 1 + 0.5;

	anime
		.timeline({
			targets: el,
			easing: "easeOutCubic",
			duration: duration,
			complete: () => el.remove()
		})
		.add({
			translateX: Math.cos(angle) * distance,
			translateY: Math.sin(angle) * distance,
			scale: [0, scale],
			opacity: [1, 0.9]
		})
		.add({
			translateY: `+=${fallDistance}px`,
			opacity: [0.9, 0],
			easing: "easeInCubic",
			duration: duration / 2
		});
}

function createGiftBox(x, y) {
	const box = document.createElement("div");
	box.classList.add("gift-box");
	box.style.left = `${x}px`;
	box.style.top = `${y}px`;
	document.body.appendChild(box);

	box.addEventListener("click", () => {
		const img = document.createElement("img");
		img.src = images[Math.floor(Math.random() * images.length)];
		img.classList.add("gift-image");
		document.body.appendChild(img);
		img.style.left = `${x}px`;
		img.style.top = `${y}px`;

		// Remove the box after clicking
		box.remove();
	});
}

document.addEventListener("click", (e) => {
	createFirework(e.clientX, e.clientY);
});

window.onload = function () {
	const centerX = window.innerWidth / 2;
	const centerY = window.innerHeight / 2;
	createFirework(centerX, centerY);
};
