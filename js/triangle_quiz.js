let questionValue = null;

const Wide = Symbol("Wide");
const Tall = Symbol("Tall");
const Isosceles = Symbol("Isosceles");
const None = Symbol("None");

const typeToElement = (type) => {
	let answers = document.getElementById("quiz-answers-view");
	switch (type) {
	case Wide: return answers.children[0];
	case Tall: return answers.children[1];
	case Isosceles: return answers.children[2];
	case None: return answers.children[3];
	}
	throw "Invalid value";
}

const gcd = (a, b) => {
	return b == 0 ? a : gcd(b, a % b);
}

class Fraction {
	constructor(num, den) {
		this.num = num;
		this.den = den;
	}

	simplify() {
		let divisor = gcd(this.num, this.den);
		return new Fraction(Math.floor(this.num / divisor), Math.floor(this.den / divisor));
	}
}

let wides = [30, 150, 210, 330];
let talls = [60, 120, 240, 300];
let isosceleses = [45, 135, 225, 315];

class Degrees {
	constructor(value) {
		this.value = value;
	}

	getAnswer() {
		if (wides.indexOf(this.value) >= 0) {
			return Wide;
		} else if (talls.indexOf(this.value) >= 0) {
			return Tall;
		} else if (isosceleses.indexOf(this.value) >= 0) {
			return Isosceles;
		}
		return None;
	}

	toString() {
		return `${this.value}&deg;`;
	}
}

class Radians {
	constructor(coefficient) {
		this.coefficient = coefficient;
	}

	getAnswer() {
		switch (this.coefficient.den) {
		case 6: return Wide;
		case 3: return Tall;
		case 4: return Isosceles;
		default: return None;
		}
	}

	toString() {
		if (this.coefficient.num === 0) {
			return "0";
		}
		let numeratorString = this.coefficient.num === 1 ? "" : this.coefficient.num.toString();
		let denominatorString = this.coefficient.den === 1 ? "" : `/${this.coefficient.den}`;
		return numeratorString + "&pi;" + denominatorString;
	}
}

const nextQuestion = () => {
	let question = document.getElementById("quiz-question");
	let isDegrees = Math.round(Math.random());
	if (isDegrees) {
		let value = Math.floor(Math.random() * 72) * 5;
		questionValue = new Degrees(value);
		question.innerHTML = questionValue.toString();
	} else {
		let value = Math.floor(Math.random() * 12);
		let frac = new Fraction(value, 12).simplify();
		questionValue = new Radians(frac);
		question.innerHTML = questionValue.toString();
	}
}

function quizNext(el) {
	if (el.canClick) {
		let answers = document.getElementById("quiz-answers-view");
		for (let answer of answers.children) {
			answer.className = "quiz-answer-neutral";
		}
		nextQuestion();
		el.canClick = false;
	}
}

function quizClick(el) {
	let nextButton = document.getElementById("quiz-header-next");
	if (nextButton.canClick) {
		return;
	}
	let correctElement = typeToElement(questionValue.getAnswer());
	let correct = el == correctElement;
	if (correct) {
		el.className = "quiz-answer-correct";
		let correctCount = document.getElementById("quiz-header-correct");
		correctCount.innerText++;
	} else {
		el.className = "quiz-answer-incorrect";
		correctElement.className = "quiz-answer-correct";
		let incorrectCount = document.getElementById("quiz-header-incorrect");
		incorrectCount.innerText++;
	}
	let totalCount = document.getElementById("quiz-header-total");
	totalCount.innerText++;
	nextButton.canClick = true;
}

window.onload = nextQuestion;
