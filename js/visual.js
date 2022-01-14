import { Canvas } from "./draw.js";
import { Vec } from "./vec.js";
import { Color } from "./color.js";
import { Circle, Line, Point, RightTriangle, Text } from "./shapes.js";

const bg = Color.fromHex(0x03070fff);
const canvas = new Canvas("circle-canvas", true);

const shapes = {
	center: new Point(() => new Vec(canvas.width / 2, canvas.height / 2)),
	circle: new Circle(() => shapes.center.pos(), () => 250),
	x_line: new Line(() => shapes.center.pos(), () => shapes.center.pos().add(new Vec(shapes.circle.r(), 0))),
	x_text: new Text(() => shapes.x_line.start().add(shapes.x_line.end().sub(shapes.x_line.start()).mult(0.5)).add(new Vec(0, 30)), () => "cos(θ)", 15, true),
	y_line: new Line(() => shapes.center.pos(), () => shapes.center.pos().add(new Vec(0, -shapes.circle.r()))),
	y_text: new Text(() => shapes.y_line.start().add(shapes.y_line.end().sub(shapes.x_line.start()).mult(0.5)).add(new Vec(-60, 0)), () => "sin(θ)", 15)
};

window.shapes = shapes;

const frame = () => {
	requestAnimationFrame(frame);
	canvas.background(bg);
	for (let [_, shape] of Object.entries(shapes)) {
		shape.render(canvas);
	}
}

window.onload = frame;
