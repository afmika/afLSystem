/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
let ls = new LSystem("AB");
ls.addRule("A", "ABA");
ls.addRule("B", "BBB");

ls.setState("A");

ls.addProcedure("A", function() {
	console.log("PROC A");
});
ls.addProcedure("B", function() {
	console.log("PROC B");
});

document.getElementById("text").innerHTML = "Rule :"+JSON.stringify(ls.getRule());
ls.exec(3, function(g, state) {
	document.getElementById("text").innerHTML += "</br>Generation "+g+" : "+ state;
});