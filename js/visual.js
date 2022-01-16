import { Canvas } from "./draw.js";
import { Vec } from "./vec.js";
import { Color } from "./color.js";
import { Circle, Line, Point, RightTriangle, Text } from "./shapes.js";
import { ShapeSystem } from "./shape_system.js";

const bg = Color.fromHex(0x03070fff);
const canvas = new Canvas("circle-canvas", true);

const system = (() => new ShapeSystem()
	  .push()
	  .add("center", new Point(
		  () => new Vec(canvas.width / 2, canvas.height / 2)
	  ))
	  .add("circle", new Circle(() => system.get("center").pos, () => 250))
	  .push()
	  .add("triangle", new RightTriangle(
		  () => system.get("center").pos,
		  () => new Vec(system.get("circle").r, Math.PI / 4)
			  .toCartesian()
			  .convert()
	  ))
	  .add("point", new Point(
		  () => system.get("center").pos
			  .add(new Vec(system.get("circle").r, Math.PI / 4).toCartesian().convert())
	  ))
	  .add("x_text", new Text(
		  () => system.get("center").pos
			  .add(new Vec(system.get("triangle").length.x * 0.5, 0))
			  .add(new Vec(0, 30)),
		  () => "cos(θ)",
		  15,
		  true
	  ))
	  .add("y_text", new Text(
		  () => system.get("center").pos
			  .add(new Vec(system.get("triangle").length.x, system.get("triangle").length.y * 0.5))
			  .add(new Vec(30, 20)),
		  () => "sin(θ)",
		  15,
		  true
	  )))();

window.system = system;
window.Vec = Vec;

const frame = () => {
	requestAnimationFrame(frame);
	canvas.background(bg);
	system.render(canvas);
}

window.onload = frame;
