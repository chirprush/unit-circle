import { Canvas } from "./draw.js";
import { Fraction } from "./fraction.js";
import { Radians } from "./radians.js";
import { Vec } from "./vec.js";
import { Color } from "./color.js";
import { Circle, Line, Point, RightTriangle, Text } from "./shapes.js";
import { ShapeSystem } from "./shape_system.js";

const bg = Color.fromHex(0x03070fff);
const canvas = new Canvas("circle-canvas", true);

const typeToColor = (den) => {
	switch (den) {
	case 3: return Color.fromHex(0x467ebfaf);
	case 4: return Color.fromHex(0x68a542af);
	case 6: return Color.fromHex(0x57547faf);
	}
	throw "This shouldn't happen"
}

const system = (() => {
	let sys = new ShapeSystem()
		.push()
		.add("center", new Point(
			() => new Vec(canvas.width / 2, canvas.height / 2)
		))
		.add("circle", new Circle(() => system.get("center").pos, () => 200))
		.push();
	for (let i = 0; i < 24; ++i) {
		let angle = new Radians(new Fraction(i, 12).simplify());
		if (angle.co.den === 12) {
			continue;
		}
		sys = sys.add("angle" + i.toString(), new Text(
			() => system.get("center").pos
				.add(new Vec(system.get("circle").r + 30, -angle.value()).toCartesian())
				.add(new Vec(0, 10)),
			() => angle.toString(),
			16,
			true
		));
	}
	sys = sys.push();
	sys = sys
		.add("wide-triangle1", new RightTriangle(
			() => system.get("center").pos,
			() => new Vec(system.get("circle").r, Math.PI / 6)
				.toCartesian()
				.convert()
		))
		.add("point", new Point(
			() => system.get("center").pos.add(
				new Vec(system.get("circle").r, Math.PI / 6)
					.toCartesian()
					.convert()
			)
		))
		.add("radius-text", new Text(
			() => system.get("center").pos
				.add(
					new Vec(system.get("circle").r, Math.PI / 6)
						.toCartesian()
						.convert()
						.mult(0.5)
				)
				.add(new Vec(0, -10)),
			() => "1",
			16,
			true
		))
		.add("theta", new Text(
			() => system.get("center").pos
				.add(new Vec(50, -3)),
			() => "θ",
			15,
			true
		));
	sys = sys.push().hide(3);
	for (let mx = -1; mx <= 1; mx += 2) {
		for (let my = -1; my <= 1; my += 2) {
			sys = sys
				.add("wide-triangles", new RightTriangle(
					() => system.get("center").pos,
					() => new Vec(-mx * system.get("circle").r * Math.cos(Math.PI / 6), my * system.get("circle").r * Math.sin(Math.PI / 6))
				));
		}
	}
	sys = sys.push().hide(3).hide(4);
	sys = sys
		.add("iso-triangle1", new RightTriangle(
			() => system.get("center").pos,
			() => new Vec(system.get("circle").r, Math.PI / 4)
				.toCartesian()
				.convert()
		))
		.add("point", new Point(
			() => system.get("center").pos.add(
				new Vec(system.get("circle").r, Math.PI / 4)
					.toCartesian()
					.convert()
			)
		))
		.add("radius-text", new Text(
			() => system.get("center").pos
				.add(
					new Vec(system.get("circle").r, Math.PI / 4)
						.toCartesian()
						.convert()
						.mult(0.5)
				)
				.add(new Vec(0, -10)),
			() => "1",
			16,
			true
		))
		.add("theta", new Text(
			() => system.get("center").pos
				.add(new Vec(30, -3)),
			() => "θ",
			15,
			true
		));
	sys = sys.push().hide(3).hide(4).hide(5);
	sys = sys
		.add("tall-triangle1", new RightTriangle(
			() => system.get("center").pos,
			() => new Vec(system.get("circle").r, Math.PI / 3)
				.toCartesian()
				.convert()
		))
		.add("point", new Point(
			() => system.get("center").pos.add(
				new Vec(system.get("circle").r, Math.PI / 3)
					.toCartesian()
					.convert()
			)
		))
		.add("radius-text", new Text(
			() => system.get("center").pos
				.add(
					new Vec(system.get("circle").r, Math.PI / 3)
						.toCartesian()
						.convert()
						.mult(0.5)
				)
				.add(new Vec(0, -10)),
			() => "1",
			16,
			true
		))
		.add("theta", new Text(
			() => system.get("center").pos
				.add(new Vec(30, -3)),
			() => "θ",
			15,
			true
		));
	sys = sys.push().hide(3).hide(4).hide(5).hide(6);
	for (let i = 0; i < 24; ++i) {
		let radians = new Radians(new Fraction(i, 12).simplify());
		if (radians.co.den === 3 || radians.co.den === 4 || radians.co.den === 6) {
			sys = sys
				.add("all-triangles", new RightTriangle(
					() => system.get("center").pos,
					() => new Vec(system.get("circle").r, radians.value())
						.toCartesian()
						.convert(),
					typeToColor(radians.co.den)
				));
		}
	}
	return sys;
})();

const onStepChange = () => {
	let view = document.getElementById("explanation-view");
	for (let child of view.children) {
		child.hidden = true;
	}
	view.children[system.step].hidden = false;
}

window.prevStep = () => {
	system.prev();
	onStepChange();
}

window.nextStep = () => {
	system.next();
	onStepChange();
}

const frame = () => {
	requestAnimationFrame(frame);
	canvas.background(bg);
	system.render(canvas);
}

let onloadSave = window.onload;
window.onload = () => {
	if (onloadSave) {
		onloadSave();
	}
	frame();
};
