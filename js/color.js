class Color {
	constructor(hex) {
		this.r = hex >> 24 & 0xff;
		this.g = hex >> 16 & 0xff;
		this.b = hex >>  8 & 0xff;
		this.a = (hex & 0xff) / 255;
	}

	toString() {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
	}
}

export { Color };
