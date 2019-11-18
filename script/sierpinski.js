/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.translate(canvas.width/2, canvas.height/2);

let ls = new LSystem("FG+-");
//  (F → F−G+F+G−F), (G → GG)
ls.addRule("F", "F-G+F+G-F");
ls.addRule("G", "GG");

ls.setState("F-G-G");

let size = 7;
let angle = 2 * Math.PI / 3;

function forward() {
	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.lineWidth = 1;
	ctx.moveTo(0, 0);
	ctx.lineTo(0, size);
	ctx.stroke();
	ctx.closePath();

	ctx.translate(0, size);	
}

ls.addProcedure("F", forward);
ls.addProcedure("G", forward);

ls.addProcedure("+", function() {
	ctx.rotate(angle);
});

ls.addProcedure("-", function() {
	ctx.rotate(-angle);
});

document.getElementById("text").innerHTML = "Rule :"+JSON.stringify(ls.getRule());
let gmax = 8, g = 0;
let interval = setInterval(() => {
	if(g == gmax) {
		clearInterval(interval);
	}

	ls.next(state => {
		document.getElementById("text").innerHTML += "<br/>Generation "+g+" : "+state;
		g++;
	});
}, 500);