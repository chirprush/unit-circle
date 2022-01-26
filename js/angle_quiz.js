let questionValue = null;
let funcType = null;

let answerTable = {
	"sin" : {
		"Wide" : "1/2",
		"Tall" : "sqrt(3)/2",
		"Isosceles" : "sqrt(2)/2",
		"Top" : "1",
		"Bottom" : "1",
		"Right" : "0",
		"Left" : "0"
	},
	"cos" : {
		"Wide" : "sqrt(3)/2",
		"Tall" : "1/2",
		"Isosceles" : "sqrt(2)/2",
		"Top" : "0",
		"Bottom" : "0",
		"Right" : "1",
		"Left" : "1"
	},
	"tan" : {
		"Wide" : "sqrt(3)/3",
		"Tall" : "sqrt(3)",
		"Isosceles" : "1",
		"Top" : "undefined",
		"Bottom" : "undefined",
		"Right" : "0",
		"Left" : "0"
	},
	"csc" : {
		"Wide" : "2",
		"Tall" : "2*sqrt(3)/3",
		"Isosceles" : "sqrt(2)",
		"Top" : "1",
		"Bottom" : "1",
		"Right" : "undefined",
		"Left" : "undefined"
	},
	"sec" : {
		"Wide" : "2*sqrt(3)/3",
		"Tall" : "2",
		"Isosceles" : "sqrt(2)",
		"Top" : "undefined",
		"Bottom" : "undefined",
		"Right" : "1",
		"Left" : "1"
	},
	"cot" : {
		"Wide" : "sqrt(3)",
		"Tall" : "sqrt(3)/3",
		"Isosceles" : "1",
		"Top" : "0",
		"Bottom" : "0",
		"Right" : "undefined",
		"Left" : "undefined"
	}
}

class FuncType {
	static Sin = new FuncType("sin");
	static Cos = new FuncType("cos");
	static Tan = new FuncType("tan");
	static Csc = new FuncType("csc");
	static Sec = new FuncType("sec");
	static Cot = new FuncType("cot");
	static values = [
		FuncType.Sin,
		FuncType.Cos,
		FuncType.Tan,
		FuncType.Csc,
		FuncType.Sec,
		FuncType.Cot,
	];

	constructor(type) {
		this.type = type;
	}

	equals(other) {
		return this.type === other.type;
	}

	getFunc() {
		switch (this.type) {
		case "sin": return Math.sin;
		case "cos": return Math.cos;
		case "tan": return Math.tan;
		case "csc": return (n) => 1 / Math.sin(n);
		case "sec": return (n) => 1 / Math.cos(n);
		case "cot": return (n) => 1 / Math.tan(n);
		}
		throw "This shouldn't happen"
	}
}

class AngleType {
	static Wide = new AngleType("Wide");
	static Tall = new AngleType("Tall");
	static Isosceles = new AngleType("Isosceles");
	static Top = new AngleType("Top");
	static Bottom = new AngleType("Bottom");
	static Right = new AngleType("Right");
	static Left = new AngleType("Left");

	constructor(type) {
		this.type = type;
	}
}

let wides = [30, 150, 210, 330];
let talls = [60, 120, 240, 300];
let isosceleses = [45, 135, 225, 315];

class Degrees {
	constructor(value) {
		this.value = value;
	}

	equals(other) {
		return this.value === other.value;
	}

	getValue() {
		return this.value / 180 * Math.PI;
	}

	getType() {
		let value = Math.abs(this.value) % 360;
		if (wides.indexOf(value) >= 0) {
			return AngleType.Wide;
		} else if (talls.indexOf(value) >= 0) {
			return AngleType.Tall;
		} else if (isosceleses.indexOf(value) >= 0) {
			return AngleType.Isosceles;
		} else if (value == 0) {
			return AngleType.Right;
		} else if (value == 90) {
			return AngleType.Top;
		} else if (value == 180) {
			return AngleType.Left;
		} else if (value == 270) {
			return AngleType.Bottom;
		}
		throw "This shouldn't happen"
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
	constructor(co) {
		this.co = co;
	}

	equals(other) {
		return this.co.num === other.co.num && this.co.den === other.co.den;
	}

	getValue() {
		return this.co.num / this.co.den * Math.PI;
	}

	getType() {
		let num = Math.abs(this.co.num) % this.co.den;
		switch (this.co.den) {
		case 1:
			switch (num) {
			case 0: return AngleType.Right;
			case 1: return AngleType.Left;
			}
			break;
		case 2:
			switch (num) {
			case 1: return AngleType.Top;
			case 3: return AngleType.Bottom;
			}
			break;
		case 3: return AngleType.Tall;
		case 4: return AngleType.Isosceles;
		case 6: return AngleType.Wide;
		}
		throw "This shouldn't happen"
	}

	toString() {
		if (this.co.num === 0) {
			return "0";
		}
		let numeratorString = this.co.num === 1 ? "" : this.co.num === -1 ? "-" : this.co.num.toString();
		let denominatorString = this.co.den === 1 ? "" : `/${this.co.den}`;
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

const getSign = (funcType, questionValue) => {
	return Math.sign(funcType.getFunc()(questionValue.getValue()));
}

const getAnswer = (funcType, questionValue) => {
	let answer = answerTable[funcType.type][questionValue.getType().type];
	let sign = getSign(funcType, questionValue);
	if (answer !== "0" && answer !== "undefined" && sign == -1) {
		answer = "-" + answer;
	}
	return answer;
}

const nextQuestion = () => {
	let question = document.getElementById("quiz-question");
	let isDegrees = Math.round(Math.random());
	let seed = Math.random();
	let sign = seed < 0.3 ? -1 : 1;
	let coterminal = seed >= 0.3 && seed < 0.5;
	let newQuestionValue = null;
	if (isDegrees) {
		newQuestionValue = degreeValues[Math.floor(Math.random() * degreeValues.length)];
		newQuestionValue.value *= sign;
		if (coterminal) {
			newQuestionValue.value += 360;
		}
	} else {
		newQuestionValue = radianValues[Math.floor(Math.random() * radianValues.length)];
		newQuestionValue.co.num *= sign;
		if (coterminal) {
			newQuestionValue.co.num += newQuestionValue.co.den * 2;
		}
	}
	let newFuncType = FuncType.values[Math.floor(Math.random() * FuncType.values.length)];
	if (funcType !== null && newFuncType.equals(funcType) && questionValue !== null && Object.is(questionValue.constructor.prototype, newQuestionValue.constructor.prototype) && newQuestionValue.equals(questionValue)) {
		nextQuestion();
		return
	}
	questionValue = newQuestionValue;
	funcType = newFuncType;
	question.innerHTML = funcType.type + "(" + questionValue.toString() + ")";
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
		let value = el.value.replaceAll(" ", "");
		el.disabled = true;
		let answer = getAnswer(funcType, questionValue);
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
