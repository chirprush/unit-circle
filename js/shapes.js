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

export { Circle, Line, Point };
