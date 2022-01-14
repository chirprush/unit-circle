import { Vec } from "./vec.js";
import { Color } from "./color.js";

class Circle {
	constructor(pos, r, color) {
		this.pos = pos;
		this.r = r;
		this.color = color || new Color(0xffffffff);
	}

	render(window) {
		let pos = this.pos();
		let r = this.r();
		window.ctx.lineWidth = 3;
		window.ctx.strokeStyle = this.color.toString();
		window.ctx.beginPath();
		window.ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
		window.ctx.stroke();
	}
}

class Line {
	constructor(start, end, color) {
		this.start = start;
		this.end = end;
		this.color = color || new Color(0xffffffff);
	}

	render(window) {
		let start = this.start();
		let end = this.end();
		window.ctx.strokeStyle = this.color.toString();
		window.ctx.lineWidth = 3;
		window.ctx.moveTo(start.x, start.y);
		window.ctx.lineTo(end.x, end.y);
		window.ctx.stroke();
	}
}

class Point {
	constructor(pos, color) {
		this.pos = pos;
		this.color = color || new Color(0xffffffff);
	}

	render(window) {
		let pos = this.pos();
		window.ctx.fillStyle = this.color.toString();
		window.ctx.beginPath();
		window.ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
		window.ctx.fill();
	}
}

class RightTriangle {
	constructor(pos, length, color) {
		this.pos = pos;
		this.length = length;
		this.color = color || new Color(0xffffffff);
	}

	render(window) {
		let pos = this.pos();
		let length = this.length();
		let right_angle_square_length = 10; // Math.sqrt(Math.pow(length.x, 2) + Math.pow(length.y, 2)) / 5;
		window.ctx.strokeStyle = this.color.toString();
		window.ctx.lineWidth = 3;
		window.ctx.moveTo(pos.x, pos.y);
		window.ctx.lineTo(pos.x + length.x, pos.y);
		window.ctx.lineTo(pos.x + length.x, pos.y - length.y);
		window.ctx.lineTo(pos.x, pos.y);
		window.ctx.lineWidth = 2;
		let length_x_mult = 1;
		let length_y_mult = 1;
		if (length.x < 0) {
			length_x_mult = 0;
		}
		if (length.y < 0) {
			length_y_mult = 0;
		}
		let a = this.color.a;
		this.color.a = 0.7;
		window.ctx.strokeStyle = this.color.toString();
		this.color.a = a;
		window.ctx.rect(pos.x + length.x + length_x_mult * -right_angle_square_length, pos.y + length_y_mult * -right_angle_square_length, right_angle_square_length, right_angle_square_length);
		window.ctx.stroke();
	}
}

class Text {
	constructor(pos, text, font, color) {
		this.pos = pos;
		this.text = text;
		this.font = font;
		this.color = color || new Color(0xffffffff);
	}

	render(window) {
		let pos = this.pos();
		let text = this.text();
		window.ctx.fillStyle = this.color.toString();
		window.ctx.font = this.font;
		window.ctx.fillText(text, pos.x, pos.y);
	}
}

export { Circle, Line, Point, RightTriangle, Text };
