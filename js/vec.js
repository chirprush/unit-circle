class Vec {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(other) {
		return new Vec(this.x + other.x, this.y + other.y);
	}

	sub(other) {
		return new Vec(this.x - other.x, this.y - other.y);
	}

	mult(n) {
		return new Vec(this.x * n, this.y * n);
	}

	dist(other) {
		return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
	}

	convert() {
		// Negate the y value for converting between "mathematical"
		// coordinates and the actual canvas drawing coordinates.
		return new Vec(this.x, -this.y);
	}

	toPolar() {
		// A calculator, or a computer in this case, can give a wrong
		// value for arc tangent, so we have to add the correct angle
		// measures based on the quadrants to account for this. See:
		// https://www.mathsisfun.com/polar-cartesian-coordinates.html
		// Also note that some operations maybe be slightly different
		// because, compared to mathematical graphs, the HTML canvas,
		// and most computer rendering objects, use a positive y to
		// indicate down and a negative y to indicate up. An example
		// of this is that, in math, angles that are positive move
		// counter-clockwise, whereas here, they move clockwise. If
		// you try to negate y, the resulting values match up, but the
		// actual math is not correct (angle.toPolar().toCartesian()
		// would not be equal to angle)
		let add = 0;
		if (this.x > 0 && this.y < 0) {
			add = 0;
		} else if (this.x < 0) {
			add = Math.PI;
		} else if (this.x > 0 && this.y > 0) {
			add = 2 * Math.PI;
		}
		let length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		return new Vec(
			length,
			(Math.atan(this.y / this.x) + add) % (2 * Math.PI)
		);
	}

	toCartesian() {
		return new Vec(
			this.x * Math.cos(this.y),
			this.x * Math.sin(this.y)
		);
	}
}

export { Vec };
