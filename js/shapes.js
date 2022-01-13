import { Vec } from "./vec.js";

class Circle {
	constructor(pos, r, fill) {
		this.pos = pos;
		this.r = r;
		this.fill = fill || false;
	}

	render(window) {
		let pos = this.pos();
		let r = this.r();
		window.ctx.lineWidth = 3;
		window.ctx.strokeStyle = "white";
		window.ctx.beginPath();
		window.ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
		window.ctx.stroke();
	}
}

class Line {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}

	render(window) {
		let start = this.start();
		let end = this.end();
		window.ctx.strokeStyle = "white";
		window.ctx.lineWidth = 3;
		window.ctx.moveTo(start.x, start.y);
		window.ctx.lineTo(end.x, end.y);
		window.ctx.stroke();
	}
}

class Point {
	constructor(pos) {
		this.pos = pos;
	}

	render(window) {
		let pos = this.pos();
		window.ctx.fillStyle = "white";
		window.ctx.beginPath();
		window.ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
		window.ctx.fill();
	}
}

export { Circle, Line, Point };
