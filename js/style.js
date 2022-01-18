let spaces = " ";
let numbers = "0123456789";
let symbols = "+-*/=<>()[]{}";

let Space = Symbol("Space");
let Number = Symbol("Number");
let Sym = Symbol("Sym");
let Func = Symbol("Func");
let Ident = Symbol("Ident");

const charToType = (char) => {
	if (spaces.indexOf(char) >= 0) {
		return Space;
	} else if (numbers.indexOf(char) >= 0) {
		return Number;
	} else if (symbols.indexOf(char) >= 0) {
		return Sym;
	}
	return Ident;
}

const typeToClass = (type) => {
	switch (type) {
	case Space: return "space";
	case Number: return "number";
	case Sym: return "symbol";
	case Func: return "func";
	case Ident: return "ident";
	}
	throw "Invalid type"
}

class Token {
	constructor(chunk, type) {
		this.chunk = chunk;
		this.type = type;
	}

	render() {
		let el = document.createElement("span");
		el.className = typeToClass(this.type);
		el.innerHTML = this.chunk;
		return el;
	}
}

const lexText = (text) => {
	if (text.length === 0) {
		return [];
	}
	let tokens = [];
	let chunk = "";
	let type = null;
	for (let i = 0; i < text.length; ++i) {
		let charType = charToType(text[i]);
		if (type !== null && charType !== type) {
			tokens.push(new Token(chunk, type));
			chunk = text[i];
			type = charType;
		} else {
			type = charType;
			chunk += text[i];
		}
	}
	tokens.push(new Token(chunk, type));
	return tokens;
}

const processTokens = (tokens) => {
	let processed = [];
	for (let i = 0; i < tokens.length; ++i) {
		if (tokens[i + 1] !== undefined && tokens[i].type == Ident && tokens[i + 1].type == Sym && tokens[i + 1].chunk[0] === "(") {
			processed.push(new Token(tokens[i].chunk, Func));
		} else {
			processed.push(tokens[i]);
		}
	}
	return processed;
}

const renderText = (text) => {
	let tokens = lexText(text);
	let processed = processTokens(tokens);
	let el = document.createElement("span");
	el.className = "math-text";
	for (let token of processed) {
		el.appendChild(token.render());
	}
	return el;
}

const renderMath = () => {
	// The HTMLCollection returned by getElementsByTagName() is "live"
	// meaning that it is updating as we change it. This requires the
	// slight wonkiness that we have here.
	let elements = document.getElementsByTagName("math");
	let length = elements.length;
	for (let i = 0; i < length; ++i) {
		let rendered = renderText(elements[0].innerHTML);
		elements[0].replaceWith(rendered);
	}
}

window.onload = renderMath;
