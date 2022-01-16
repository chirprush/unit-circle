class Step {
	constructor() {
		this.frame = 0;
		this.shapes = {};
	}

	render(window) {
		for (let [_, shape] of Object.entries(this.shapes)) {
			shape.render(window);
		}
	}

	getShape(name) {
		return this.shapes[name] || null;
	}

	addShape(name, shape) {
		this.shapes[name] = shape;
	}
}

class ShapeSystem {
	constructor() {
		this.steps = [new Step()];
		this.step = 0;
	}

	render(window) {
		for (let i = 0; i <= this.step; ++i) {
			this.steps[i].render(window);
		}
	}

	next() {
		this.step = Math.min(this.step + 1, this.steps.length - 1);
	}

	push() {
		this.steps.push(new Step());
		return this;
	}

	get(name) {
		for (let step of this.steps) {
			let shape = step.getShape(name);
			if (shape !== null) {
				return shape;
			}
		}
		return null;
	}

	add(name, shape) {
		this.steps.at(-1).addShape(name, shape);
		return this;
	}
}

export { ShapeSystem };
