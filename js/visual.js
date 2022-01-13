import { Canvas } from "./draw.js";
import { Vec } from "./vec.js";
import { Circle, Line, Point } from "./shapes.js";

const circle_canvas = new Canvas("circle-canvas");
const point = new Point(() => new Vec(
	Math.floor(circle_canvas.width / 2),
	Math.floor(circle_canvas.height / 2)
));

let angle = 0;
const radius = 100;

const line = new Line(point.pos, () => new Vec(
	radius * Math.cos(angle / 180 * Math.PI) + point.pos().x,
	radius * Math.sin(angle / 180 * Math.PI) + point.pos().y
));

const end_point = new Point(line.end);

const circle = new Circle(point.pos, () => radius);

const frame = () => {
	requestAnimationFrame(frame);
	circle_canvas.fill("#03070f");
	point.render(circle_canvas);
	line.render(circle_canvas);
	end_point.render(circle_canvas);
	circle.render(circle_canvas);
	angle = (angle + 1) % 360;
}

window.onload = frame;
