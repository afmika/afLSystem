/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.translate(canvas.width/2, canvas.height);

let ls = new LSystem("AB");
ls.addRule("A", "AB");
ls.addRule("B", "A");
ls.setState("AB");

let size = 15;

ls.addProcedure("A", function() {

	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.lineWidth = 1;
	ctx.moveTo(0, 0);
	ctx.lineTo(0, -size);
	ctx.stroke();
	ctx.closePath();

	ctx.translate(0, -size);
});

ls.addProcedure("B", function() {
	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.lineWidth = 1;
	
	ctx.moveTo(0, 0);
	ctx.lineTo(-size, -size);
	
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.lineWidth = 1;
	
	ctx.moveTo(0, 0);
	ctx.lineTo(size, -size);
	
	ctx.stroke();
	ctx.closePath();

	// which side ?
	let sign = Math.random() > 0.5 ? -1 : 1;
	ctx.translate(sign * size, -size);
});


document.getElementById("text").innerHTML = "Rule :"+JSON.stringify(ls.getRule());
let gmax = 6, g = 0;
let interval = setInterval(() => {
	if(g == gmax) {
		clearInterval(interval);
	}

	ls.next(state => {
		document.getElementById("text").innerHTML += "\nGeneration "+g+" : "+state;
		g++;
	});
}, 500);