import { Vec } from "./vec.js"

class Canvas {
	constructor(id, useMouse) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		if (useMouse) {
			this.mousePos = new Vec(0, 0);
			this.isMouseDown = false;
			this.mouseDown = null;
			this.mouseUp = null;
			this.mouseMove = null;
			// This (event) => this.f(event) is needed because
			// otherwise the object isn't passed correctly
			this.canvas.addEventListener("mousedown", (event) => this.onMouseDown(event));
			this.canvas.addEventListener("mouseup", (event) => this.onMouseUp(event));
			this.canvas.addEventListener("mousemove", (event) => this.onMouseMove(event));
		}
	}

	background(color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	draw(f) {
		this.ctx.beginPath();
		f(this.ctx);
		// this.ctx.closePath();
	}

	stroke(color, lineWidth) {
		this.ctx.lineWidth = lineWidth;
		this.ctx.strokeStyle = color.toString();
		this.ctx.stroke();
	}

	fill(color) {
		this.ctx.fillStyle = color.toString();
		this.ctx.fill();
	}

	onMouseDown(event) {
		this.isMouseDown = true;
		if (this.mouseDown) {
			this.mouseDown(event);
		}
	}

	onMouseUp(event) {
		this.isMouseDown = false;
		if (this.mouseUp) {
			this.mouseUp(event);
		}
	}

	onMouseMove(event) {
		this.mousePos.x = event.offsetX;
		this.mousePos.y = event.offsetY;
		if (this.mouseMove) {
			this.mouseMove(event);
		}
	}
}

export { Canvas };
