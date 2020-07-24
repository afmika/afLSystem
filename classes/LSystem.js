/**
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */

class LSystem {
	
	constructor(alphabet) {
		this.setAlphabet(alphabet);
		this.rule = {}; // ex A -> AB
		this.procedure = {}; // ex A = 'walk 60 deg'
		this.state = "";
	}

	setState(state) {
		let tmp = state.split("");
		tmp.forEach(letter => {
			if(! this.alphabet.join("").includes(letter) ) {
				throw "Rule char <"+letter+"> is not a part of the alphabet";
			}
		});
		this.state = state;
	}
	setAlphabet(alphabet) {
		if(typeof alphabet == "string") {
			this.alphabet = alphabet.split("");
		} else {
			this.alphabet = alphabet || [];	
		}
	}

	addRule(axiom, rule) {
		if(typeof axiom != "string" || typeof rule != "string") {
			throw "axiom / rule must be a string";
		}
		if(axiom.length > 1) {
			throw "axiom must be a char";
		}
		let tmp = rule.split("");
		tmp.forEach(letter => {
			if(! this.alphabet.join("").includes(letter) ) {
				throw "Rule char <"+letter+"> is not a part of the alphabet";
			}
		});

		if(this.alphabet.join("").includes(axiom) ) {
			this.rule[axiom] = rule;
		} else {
			throw "Axiom <"+axiom+"> is not a part of the alphabet";			
		}
	}
	addProcedure(axiom, fun_proc) {
		if(this.alphabet.join("").includes(axiom) ) {
			this.procedure[axiom] = fun_proc;
		} else {
			throw "Axiom <"+axiom+"> is not a part of the alphabet";			
		}
	}
	execProcedureFor(axiom) {
		if(this.alphabet.join("").includes(axiom) ) {
			if(this.procedure[axiom]) {
				let fun = this.procedure[axiom];
				fun();
			}
		} else {
			throw "Axiom <"+axiom+"> is not a part of the alphabet";			
		}		
	}

	next(fun) {
		fun(this.getState());
		let state = this.getState().split("");
		let newstate = "";
		state.forEach(letter => {
			this.execProcedureFor(letter);
			newstate += this.getEvolution(letter);
		});

		this.setState(newstate);
	}
	exec(max_gen, fun) {
		for(let g = 0; g <= max_gen; g++) {
			fun(g, this.getState());
			this.next(state => {});
		}
	}

	getAlphabet() {
		return this.alphabet;
	}
	getState() {
		return this.state;
	}
	getEvolution(axiom) {
		if(this.rule[axiom]) {
			return this.rule[axiom];
		} else {
			return axiom
		}
	}
	getRule() {
		return this.rule;
	}
	getProcedure() {
		return this.procedure;
	}
}