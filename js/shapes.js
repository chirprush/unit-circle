import { Vec } from "./vec.js";
import { Color } from "./color.js";

class Circle {
	constructor(pos, r, color) {
		this._pos = pos;
		this._r = r;
		this.color = color || Color.fromHex(0xffffffff);
	}

	get pos() {
		return this._pos();
	}

	get r() {
		return this._r();
	}

	render(window) {
		let pos = this.pos;
		let r = this.r;
		window.draw((ctx) => {
			ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
		});
		window.stroke(this.color, 3);
	}
}

class Line {
	constructor(start, end, color) {
		this._start = start;
		this._end = end;
		this.color = color || Color.fromHex(0xffffffff);
	}

	get start() {
		return this._start();
	}

	get end() {
		return this._end();
	}

	render(window) {
		let start = this.start;
		let end = this.end;
		window.draw((ctx) => {
			ctx.moveTo(start.x, start.y);
			ctx.lineTo(end.x, end.y);
		});
		window.stroke(this.color, 3);
	}
}

class Point {
	constructor(pos, color) {
		this._pos = pos;
		this.color = color || Color.fromHex(0xffffffff);
	}

	get pos() {
		return this._pos();
	}

	render(window) {
		let pos = this.pos;
		window.draw((ctx) => {
			ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
		});
		window.fill(this.color);
	}
}

class RightTriangle {
	constructor(pos, length, color) {
		this._pos = pos;
		this._length = length;
		this.color = color || Color.fromHex(0xffffffff);
	}

	get pos() {
		return this._pos();
	}

	get length() {
		return this._length();
	}

	render(window) {
		let pos = this.pos;
		let length = this.length;
		let right_angle_square_length = 15; // Math.sqrt(Math.pow(length.x, 2) + Math.pow(length.y, 2)) / 5;
		window.draw((ctx) => {
			ctx.moveTo(pos.x, pos.y);
			ctx.lineTo(pos.x + length.x, pos.y);
			ctx.lineTo(pos.x + length.x, pos.y + length.y);
			ctx.lineTo(pos.x, pos.y);
		});
		window.stroke(this.color, 3);
		let length_x_mult = 1;
		let length_y_mult = 0;
		if (length.x < 0) {
			length_x_mult = 0;
		}
		if (length.y < 0) {
			length_y_mult = 1;
		}
		window.draw((ctx) => {
			ctx.rect(pos.x + length.x + length_x_mult * -right_angle_square_length, pos.y + length_y_mult * -right_angle_square_length, right_angle_square_length, right_angle_square_length);
		});
		window.stroke(this.color.withAlpha(0.7), 3);
	}
}

class Text {
	constructor(pos, text, size, centered, color) {
		this.pos = pos;
		this.text = text;
		this.size = size;
		this.font = `${size}px "Roboto Mono"`;
		this.centered = centered || false;
		this.color = color || Color.fromHex(0xffffffff);
	}

	render(window) {
		let pos = this.pos();
		let text = this.text();
		window.ctx.fillStyle = this.color.toString();
		window.ctx.font = this.font;
		if (this.centered) {
			let measure = window.ctx.measureText(text);
			window.ctx.fillText(text, pos.x - measure.width / 2, pos.y - this.size / 2);
		} else {
			window.ctx.fillText(text, pos.x, pos.y);
		}
	}
}

export { Circle, Line, Point, RightTriangle, Text };
