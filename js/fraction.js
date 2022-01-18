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

export { Fraction };
