class ShapeEntry {
	constructor(name, shape) {
		this.name = name;
		this.shape = shape;
	}
}

const smoothTransition = (frame, max_frames) => {
	// Surprisingly this use of sin() doesn't have anything to do with
	// circles or trigonometry at all. sin() just makes for a good
	// smooth, discrete transition function that falls within the range
	// of [0, 1].
	return Math.pow(Math.sin(frame / max_frames * Math.PI / 2), 2);
}

class Step {
	constructor() {
		this.shapes = [];
		this.hide = [];
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

	getPreviousStep(current, hide) {
		let previousStep;
		for (previousStep = current - 1; previousStep > 0; --previousStep) {
			if (hide.indexOf(previousStep) < 0) {
				break;
			}
		}
		return previousStep;
	}

	render(window) {
		let hide = this.steps[this.step].hide;
		for (let i = 0; i <= this.step; ++i) {
			if (hide.indexOf(i) >= 0) {
				continue;
			}
			let previousStep = this.getPreviousStep(i, hide);
			if (i === 0 || (this.steps[previousStep] && this.steps[previousStep].current_shape >= this.steps[previousStep].shapes.length)) {
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

	hide(i) {
		this.steps.at(-1).hide.push(i);
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
