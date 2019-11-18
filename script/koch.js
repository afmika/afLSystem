/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.translate(0, canvas.height);

let ls = new LSystem("F+-");
ls.addRule("F", "F+F-F-F+F");
ls.setState("F");

// better shape with pi/2 and pi/3
let angle = Math.PI / 2;
let size = 7;

ls.addProcedure("F", function() {

	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.lineWidth = 1;
	ctx.moveTo(0, 0);
	ctx.lineTo(size, 0);
	ctx.stroke();
	ctx.closePath();

	ctx.translate(size, 0);
});

ls.addProcedure("+", function() {
	ctx.rotate(-angle);
});
ls.addProcedure("-", function() {
	ctx.rotate(angle);
});


document.getElementById("text").innerHTML = "Rule :"+JSON.stringify(ls.getRule());
let gmax = 6, g = 0;
let interval = setInterval(() => {
	if(g == gmax) {
		clearInterval(interval);
	}

	ls.next(state => {
		document.getElementById("text").innerHTML += "<br/>Generation "+g+" : "+state;
		g++;
	});
}, 800);