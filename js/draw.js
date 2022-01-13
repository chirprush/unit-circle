class Canvas {
	constructor(id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;
	}

	fill(color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
}

export { Canvas };
