class ShapeEntry {
	constructor(name, shape) {
		this.name = name;
		this.shape = shape;
	}
}

const smoothTransition = (frame, max_frames) => {
	return Math.pow(Math.sin(frame / max_frames * Math.PI / 2), 2);
}

class Step {
	constructor() {
		this.shapes = [];
		this.current_shape = 0;
		this.frames = 0;
	}

	render(window) {
		for (let i = 0; i < this.current_shape; ++i) {
			this.shapes[i].shape.render(window, 1.0);
		}
		if (this.current_shape >= this.shapes.length) {
			return;
		}
		let shape_frames = this.shapes[this.current_shape].shape.frames();
		if (this.frames > shape_frames) {
			this.shapes[this.current_shape].shape.render(window, 1.0);
			this.frames = 0;
			this.current_shape++;
			return;
		}
		this.shapes[this.current_shape].shape.render(window, smoothTransition(this.frames, shape_frames));
		this.frames++;
	}

	get(name) {
		for (let entry of this.shapes) {
			if (name === entry.name) {
				return entry.shape;
			}
		}
		return null;
	}

	add(name, shape) {
		this.shapes.push(new ShapeEntry(name, shape))
	}
}

class ShapeSystem {
	constructor() {
		this.steps = [new Step()];
		this.step = 0;
	}

	render(window) {
		for (let i = 0; i <= this.step; ++i) {
			if (i === 0 || this.steps[i - 1].current_shape >= this.steps[i - 1].shapes.length) {
				this.steps[i].render(window);
			}
		}
	}

	next() {
		this.step = Math.min(this.step + 1, this.steps.length - 1);
	}

	prev() {
		this.steps[this.step].current_shape = 0;
		this.steps[this.step].frames = 0;
		this.step = Math.max(this.step - 1, 0);
	}

	push() {
		this.steps.push(new Step());
		return this;
	}

	get(name) {
		for (let step of this.steps) {
			let shape = step.get(name);
			if (shape !== null) {
				return shape;
			}
		}
		return null;
	}

	add(name, shape) {
		this.steps.at(-1).add(name, shape);
		return this;
	}
}

export { ShapeSystem };
