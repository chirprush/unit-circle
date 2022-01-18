import { Fraction } from "./fraction.js";

class Radians {
	constructor(coefficient) {
		this.co = coefficient;
	}

	value() {
		return Math.PI * this.co.num / this.co.den;
	}

	toString() {
		if (this.co.num === 0) {
			return "0";
		}
		let numString = this.co.num === 1 ? "" : this.co.num.toString();
		let denString = this.co.den === 1 ? "" : "/" + this.co.den.toString();
		return numString + "π" + denString;
	}
}

export { Radians };
