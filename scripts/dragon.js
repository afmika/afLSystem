/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.translate(canvas.width/2, canvas.height/2);

let ls = new LSystem("XYF+-");
ls.addRule("X", "X+YF+");
ls.addRule("Y", "-FX-Y");

// XY is also cool
ls.setState("XF"); // Axiom

let size = 10;
let angle = Math.PI / 2;

ls.addProcedure("F", function() {

	ctx.beginPath();
	ctx.strokeStyle = "rgb(200, 55, 255, 0.2)";
	ctx.lineWidth = 1;
	ctx.moveTo(0, 0);
	ctx.lineTo(0, -size);
	ctx.stroke();
	ctx.closePath();

	ctx.translate(0, -size);
});

ls.addProcedure("-", function() {
	ctx.rotate(-angle);
});

ls.addProcedure("+", function() {
	ctx.rotate(angle);
});


document.getElementById("text").innerHTML = "Rule :"+JSON.stringify(ls.getRule());
let gmax = 13, g = 0;
let interval = setInterval(() => {
	if(g == gmax) {
		clearInterval(interval);
	}

	ls.next(state => {
		document.getElementById("text").innerHTML += "\nGeneration "+g+" : "+state;
		g++;
	});
}, 1000 / 16);