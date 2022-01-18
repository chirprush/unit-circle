import { Vec } from "./vec.js";
import { Color } from "./color.js";

const pixelsPerFrame = 10;

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

	frames() {
		return Math.floor(this.r * 2 * Math.PI / pixelsPerFrame);
	}

	render(window, percent) {
		let pos = this.pos;
		let r = this.r;
		window.draw((ctx) => {
			ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI * percent);
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

	frames() {
		return Math.floor(this.start.dist(this.end) / pixelsPerFrame);
	}

	render(window, percent) {
		let start = this.start;
		let end = this.end;
		let endpoint = end.sub(start).mult(percent).add(start);
		window.draw((ctx) => {
			ctx.moveTo(start.x, start.y);
			ctx.lineTo(endpoint.x, endpoint.y);
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

	frames() {
		return pixelsPerFrame;
	}

	render(window, percent) {
		let pos = this.pos;
		window.draw((ctx) => {
			ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
		});
		window.fill(this.color.withAlpha(percent));
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

	frames() {
		let length = this.length;
		return 5 * Math.floor((Math.abs(length.x) + Math.abs(length.y) + Math.sqrt(Math.pow(length.x, 2) + Math.pow(length.y, 2))) / pixelsPerFrame);
	}

	render(window, percent) {
		let pos = this.pos;
		let length = this.length;
		let right_angle_square_length = 15; // Math.sqrt(Math.pow(length.x, 2) + Math.pow(length.y, 2)) / 5;
		window.draw((ctx) => {
			ctx.moveTo(pos.x, pos.y);
			ctx.lineTo(pos.x + length.x * Math.min(percent / 0.33, 1.0), pos.y);
			if (percent > 0.33) {
				let leg_percent = Math.min((percent - 0.33) / 0.33, 1.0)
				ctx.lineTo(pos.x + length.x, pos.y + length.y * leg_percent);
			}
			if (percent > 0.66) {
				let hypo_percent = 1 - Math.min((percent - 0.66) / 0.33, 1.0);
				ctx.lineTo(pos.x + length.x * hypo_percent, pos.y + length.y * hypo_percent);
			}
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
		window.stroke(this.color.withAlpha(Math.pow(percent, 2) * 0.7), 3);
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

	frames() {
		return 25;
	}

	render(window, percent) {
		let pos = this.pos();
		let text = this.text();
		window.ctx.fillStyle = this.color.withAlpha(percent).toString();
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
