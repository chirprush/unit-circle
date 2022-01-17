const CosQuestion = Symbol("CosQuestion");
const SinQuestion = Symbol("SinQuestion");

let questionValue = null;
let questionType = null;

const Wide = Symbol("Wide");
const Tall = Symbol("Tall");
const Isosceles = Symbol("Isosceles");
const VLine = Symbol("VLine");
const HLine = Symbol("HLine");

const cosAnswer = (sign, type) => {
	if (sign == 0 || type == VLine) {
		return "0";
	}
	let typeString = "";
	switch (type) {
	case Wide:
		typeString = "sqrt(3)/2";
		break;
	case Tall:
		typeString = "1/2";
		break;
	case Isosceles:
		typeString = "sqrt(2)/2";
		break;
	case HLine:
		typeString = "1";
		break;
	}
	let signString = sign === -1 ? "-" : "";
	return signString + typeString;
}

const sinAnswer = (sign, type) => {
	if (sign == 0 || type == HLine) {
		return "0";
	}
	let typeString = "";
	switch (type) {
	case Wide:
		typeString = "1/2";
		break;
	case Tall:
		typeString = "sqrt(3)/2";
		break;
	case Isosceles:
		typeString = "sqrt(2)/2";
		break;
	case VLine:
		typeString = "1";
		break;
	}
	let signString = sign === -1 ? "-" : "";
	return signString + typeString;
}

let wides = [30, 150, 210, 330];
let talls = [60, 120, 240, 300];
let isosceleses = [45, 135, 225, 315];
let vlines = [90, 270];
let hlines = [0, 180];

class Degrees {
	constructor(value) {
		this.value = value;
	}

	getType() {
		if (wides.indexOf(this.value) >= 0) {
			return Wide;
		} else if (talls.indexOf(this.value) >= 0) {
			return Tall;
		} else if (isosceleses.indexOf(this.value) >= 0) {
			return Isosceles;
		} else if (vlines.indexOf(this.value) >= 0) {
			return VLine;
		} else if (hlines.indexOf(this.value) >= 0) {
			return HLine;
		}
		throw "This shouldn't happen"
	}

	getCos() {
		let sign = Math.sign(Math.cos(this.value / 180 * Math.PI));
		let type = this.getType();
		return cosAnswer(sign, type);
	}

	getSin() {
		let sign = Math.sign(Math.sin(this.value / 180 * Math.PI));
		let type = this.getType();
		return sinAnswer(sign, type);
	}

	toString() {
		return `${this.value}&deg;`;
	}
}

class Fraction {
	constructor(num, den) {
		this.num = num;
		this.den = den;
	}
}

class Radians {
	constructor(coefficient) {
		this.coefficient = coefficient;
	}

	getType() {
		switch (this.coefficient.den) {
		case 1: return HLine;
		case 2: return VLine;
		case 3: return Tall;
		case 4: return Isosceles;
		case 6: return Wide;
		}
		throw "This shouldn't happen"
	}

	getCos() {
		let sign = Math.sign(Math.cos(Math.PI * this.coefficient.num / this.coefficient.den));
		let type = this.getType();
		return cosAnswer(sign, type);
	}

	getSin() {
		let sign = Math.sign(Math.sin(Math.PI * this.coefficient.num / this.coefficient.den));
		let type = this.getType();
		return sinAnswer(sign, type);
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

let degreeValues = [
	new Degrees(0),
	new Degrees(30),
	new Degrees(45),
	new Degrees(60),
	new Degrees(90),
	new Degrees(120),
	new Degrees(135),
	new Degrees(150),
	new Degrees(180),
	new Degrees(210),
	new Degrees(225),
	new Degrees(240),
	new Degrees(270),
	new Degrees(300),
	new Degrees(315),
	new Degrees(330),
];

let radianValues = [
	new Radians(new Fraction(0, 1)),
	new Radians(new Fraction(1, 6)),
	new Radians(new Fraction(1, 4)),
	new Radians(new Fraction(1, 3)),
	new Radians(new Fraction(1, 2)),
	new Radians(new Fraction(2, 3)),
	new Radians(new Fraction(3, 4)),
	new Radians(new Fraction(5, 6)),
	new Radians(new Fraction(1, 1)),
	new Radians(new Fraction(7, 6)),
	new Radians(new Fraction(5, 4)),
	new Radians(new Fraction(4, 3)),
	new Radians(new Fraction(3, 2)),
	new Radians(new Fraction(5, 3)),
	new Radians(new Fraction(7, 4)),
	new Radians(new Fraction(11, 6)),
];

const nextQuestion = () => {
	let question = document.getElementById("quiz-question");
	let isDegrees = Math.round(Math.random());
	if (isDegrees) {
		questionValue = degreeValues[Math.floor(Math.random() * degreeValues.length)];
	} else {
		questionValue = radianValues[Math.floor(Math.random() * radianValues.length)];
	}
	questionType = [CosQuestion, SinQuestion][Math.round(Math.random())];
	let typeString = questionType == CosQuestion ? "cos" : "sin";
	question.innerHTML = typeString + "(" + questionValue.toString() + ")";
}

function quizNext(el) {
	let input = document.getElementById("quiz-answer-field");
	if (input.disabled) {
		input.disabled = false;
		input.className = "quiz-field-neutral";
		input.value = "";
		nextQuestion();
	}
}

function keyPress(el, event) {
	// Enter key
	if (event.keyCode === 13) {
		let correctCount = document.getElementById("quiz-header-correct");
		let incorrectCount = document.getElementById("quiz-header-incorrect");
		let totalCount = document.getElementById("quiz-header-total");
		let value = el.value;
		el.disabled = true;
		let answer = questionType === CosQuestion ? questionValue.getCos() : questionValue.getSin();
		let isCorrect = value === answer;
		if (isCorrect) {
			el.className = "quiz-field-correct";
			correctCount.innerText++;
		} else {
			el.className = "quiz-field-incorrect";
			el.value += " -> " + answer;
			incorrectCount.innerText++;
		}
		totalCount.innerText++;
	}
}

window.onload = nextQuestion;
