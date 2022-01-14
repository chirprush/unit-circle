import { Canvas } from "./draw.js";
import { Vec } from "./vec.js";
import { Color } from "./color.js";
import { Circle, Line, Point, Text } from "./shapes.js";

const bg = new Color(0x03070fff);
const circle_canvas = new Canvas("circle-canvas", true);

const point = new Point(() => new Vec(
	Math.floor(circle_canvas.width / 2),
	Math.floor(circle_canvas.height / 2)
));

let angle = 0;
const radius = 100;

const line = new Line(point.pos, () =>
	new Vec(radius, angle / 180 * Math.PI).toCartesian().add(point.pos()),
	new Color(0xffffff7f)
);

const mouse_line = new Line(point.pos, () => {
	let angle = circle_canvas.mousePos.sub(point.pos()).toPolar().y;
	return new Vec(radius * Math.cos(angle), radius * Math.sin(angle)).add(point.pos());
});

const end_point = new Point(line.end);
const mouse_end_point = new Point(mouse_line.end);

const circle = new Circle(point.pos, () => radius);

const text = new Text(() => new Vec(point.pos().x + 10, point.pos().y - 10), () => "θ", '15px "Roboto Mono"');

const frame = () => {
	requestAnimationFrame(frame);
	circle_canvas.fill(bg);
	point.render(circle_canvas);
	line.render(circle_canvas);
	mouse_line.render(circle_canvas);
	mouse_end_point.render(circle_canvas);
	end_point.render(circle_canvas);
	circle.render(circle_canvas);
	text.render(circle_canvas);
	angle = (angle - 1) % 360;
}

window.onload = frame;
