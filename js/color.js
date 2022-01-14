class Color {
	constructor(r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	static fromHex(hex) {
		let r = hex >>> 24 & 0xff;
		let g = hex >>> 16 & 0xff;
		let b = hex >>>  8 & 0xff;
		let a = (hex & 0xff) / 255;
		return new Color(r, g, b, a);
	}

	withAlpha(a) {
		// The `>>> 0` is needed because Javascript will interpret it
		// as signed otherwise.
		return new Color(this.r, this.g, this.b, a);
	}

	toString() {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
	}
}

export { Color };
