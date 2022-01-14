import { Canvas } from "./draw.js";
import { Vec } from "./vec.js";
import { Color } from "./color.js";
import { Circle, Line, Point, RightTriangle, Text } from "./shapes.js";

const bg = new Color(0x03070fff);
const circle_canvas = new Canvas("circle-canvas", true);

const right_triangle = new RightTriangle(() => new Vec(300, 300), () => new Vec(-100, -100));

const frame = () => {
	requestAnimationFrame(frame);
	circle_canvas.fill(bg);
	right_triangle.render(circle_canvas);
}

window.onload = frame;
