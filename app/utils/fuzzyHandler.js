//const fuzzy = require('es6-fuzz/lib/logic')
//const triangle = require('es6-fuzz/lib/curve/')
//const grade = require('es6-fuzz/lib/curve/grade')
//const trapezoid = require('es6-fuzz/lib/curve/trapezoid')
//const rgrade = require('es6-fuzz/lib/curve/reverse-grade')
//const fuzzyl = require('./fuzzy')

/*exports.doTheFuzzy = (frota) => {
    let buslogic = new fuzzy()
    let crwdlogic = new fuzzy()
    
    let busfuzzyfier = buslogic
                    .init('Microônibus', new rgrade(10, 35))
                    .or('Miniônibus', new trapezoid(30,35,40,45))
                    .or('Midiônibus', new trapezoid(40,45,70,75))
                    .or('Ônibus Básico', new trapezoid(70,75,80,80))
                    .or('Ônibus Padron', new trapezoid(80,85,100,105))
                    .or('Ônibus Articulado', new trapezoid(100,105,160,165))
                    .or('Ônibus BiArticulado', new grade(160,165))

    let crowdfuzzyfier = crwdlogic
                    .init('Nenhuma Pessoa', new rgrade(0, 32))
                    .or('Poucas pessoas', new trapezoid(32,37,64,69))
                    .or('Algumas pessoas', new trapezoid(64,69,96,101))
                    .or('Muitas pessoas', new trapezoid(96,101,128,133))
                    .or('Grande número de pessoas', new grade(128,165))

    
    let crwdres = crowdfuzzyfier.defuzzify(10)
    let busres = busfuzzyfier.defuzzify(68)
    //console.log(fuzzyfier.rules)
    console.log("--------------------------")
    console.log(crwdres.defuzzified);
    console.log(busres.defuzzified);
    
    let lotlogic = new fuzzy()

    let fuzzier = lotlogic
                .init('vazio', new rgrade(0, 2))
                .or('alguns assentos vazios', new trapezoid(1, 2, 3, 4))
                .or('sem assentos vazios', new trapezoid(3, 4, 5, 6))
                .or('algumas pesoas em pé', new trapezoid(5, 6, 7, 8))
                .or('lotado', new trapezoid(7, 8, 9, 10))

    
}*/

exports.doTheFuzzy2 = (frota) => {
    const obj = {
		crisp_input: [150, 10, 10],
		variables_input: [
			{
				name: "Distance to Target",
				setsName: ["Close", "Medium", "Far"],
				sets: [
					[0,0,25,150],
					[25,150,150,300],
					[150,300,400,400]
				]
			},
			{
				name: "Ammo Status",
				setsName: ["Low", "Okay", "Loads"],
				sets: [
					[0,0,0,10],
					[0,10,10,30],
					[10,30,40,40]
				]
			},
			{
				name: "Defense",
				setsName: ["Light", "Medium", "Heavy"],
				sets: [
					[0,0,0,10],
					[0,10,10,30],
					[10,30,40,40]
				]
			}
		],
		variable_output: {
			name: "Desirability",
			setsName: ["Undesirable", "Desirable", "Very Desirable"],
			sets: [
				[0,0,25,50],
				[25,50,50,75],
				[50,75,100,100]
			]
		},
		inferences: [
			[0,2,0],
			[0,1,2],
			[2,1,0]
		]
    }
    
    let fl = new FuzzyLogic()
    fl.getResult(obj)  
}

var FuzzyLogic = (function() {

    "use strict";

    var C = function() {};

    C.prototype = {

        getResult: function(options) {
            var variables = this.construct(options.variables_input),
                fuzzy_input = this.fuzzification(options.crisp_input, variables),
                output_combination = this.output_combination(fuzzy_input, options.inferences, options.variable_output),
                fuzzy_output = this.takeMaxOfArraySet(output_combination),
                crisp_output = this.defuzzification(fuzzy_output, this.construct_variable(options.variable_output.sets));

            return crisp_output;
        },

        construct: function(variables) {
            var ob = [],
                i;

            for (i = variables.length - 1; i >= 0; i -= 1) {
                ob[i] = this.construct_variable(variables[i].sets);
            }

            return ob;
        },

        construct_variable: function(f) {
            var obv = [],
                i;

            for (i = f.length - 1; i >= 0; i -= 1) {
                obv[i] = {
                    a: f[i],
                    firstPoint: (f[i][0] === f[i][1]) ? 1 : 0,
                    lastPoint: (f[i][2] === f[i][3]) ? 1 : 0,
                    mUp: (1 / (f[i][1] - f[i][0])),
                    mDown: (1 / (f[i][3] - f[i][2]))
                };
            }
            return obv;
        },

        fuzzification: function(input, variables) {
            var value = [],
                i;

            for (i = variables.length - 1; i >= 0; i -= 1) {
                value[i] = this.fuzzification_variable(input[i], variables[i]);
            }

            return value;
        },

        fuzzification_variable: function(x, sets) {
            var valori = [],
                i;

            for (i = sets.length - 1; i >= 0; i -= 1) {
                valori[i] = this.fuzzification_function(x, sets[i]);
            }

            return valori;
        },

        fuzzification_function: function(x, set) {
            var f = 0;

            if (x <= set.a[0]) {
                f = set.firstPoint;
            } else {
                if (x < set.a[1]) {
                    f = set.mUp * (x - set.a[0]);
                } else {
                    if (x <= set.a[2]) {
                        f = 1;
                    } else {
                        if (x < set.a[3]) {
                            f = 1 - set.mDown * (x - set.a[2]);
                        } else {
                            if (x >= set.a[3]) {
                                f = set.lastPoint;
                            }
                        }
                    }
                }
            }

            return f;
        },

        output_combination: function(valori, inferences, variable_output) {
            var a = [],
                i,
                j;

            for (i = variable_output.sets.length - 1; i >= 0; i -= 1) {
                a[i] = [];
            }

            for (i = inferences.length - 1; i >= 0; i -= 1) {
                for (j = inferences[i].length - 1; j >= 0; j -= 1) {
                    if (inferences[i][j] >= 0) {
                        a[inferences[i][j]].push(valori[i][j]);
                    }
                }
            }

            return a;
        },

        defuzzification: function(outputSet, variable) {
            var num = 0,
                den = 0,
                i,
                v,
                point,
                h,
                b,
                a,
                a1,
                a2,
                area,
                y_baricentro,
                x_baricentro,
                amezzi,
                bmezzi,
                mmezzi;

            for (i = outputSet.length - 1; i >= 0; i -= 1) {
                v = variable[i];
                point = v.a;
                h = outputSet[i];
                b = point[3] - point[0];
                a1 = point[0];
                if (point[0] !== point[1]) {
                    a1 += h / v.mUp;
                }
                a2 = point[3];
                if (point[2] !== point[3]) {
                    a2 -= h / v.mDown;
                }
                area = 0;
                if (point[0] !== a1) {
                    area += (a1 - point[0]) * outputSet[i] / 2;
                }
                if (a1 !== a2) {
                    area += (a2 - a1) * outputSet[i];
                }
                if (a2 !== point[3]) {
                    area += (point[3] - a2) * outputSet[i] / 2;
                }
                a = a2 - a1;
                y_baricentro = (h / 3) * (b + 2 * a) / (a + b);
                amezzi = a1 + (a2 - a1) / 2;
                bmezzi = point[0] + (point[3] - point[0]) / 2;
                mmezzi = 0;
                if (amezzi - bmezzi !== 0) {
                    mmezzi = h / (amezzi - bmezzi);
                }
                x_baricentro = bmezzi;
                if (mmezzi !== 0) {
                    x_baricentro += y_baricentro / mmezzi;
                }
                num += area * x_baricentro;
                den += area;
            }

            return (den === 0 ? 0 : (num / den));
        },

        takeMaxOfArraySet: function(set) {
            var output = [],
                i;

            for (i = set.length - 1; i >= 0; i -= 1) {
                output[i] = this.takeMaxOfArray(set[i]);
            }

            return output;
        },

        takeMaxOfArray: function(arr) {
            var max = arr[0],
                j;

            for (j = 1; j < arr.length; j += 1) {
                max = arr[j] > max ? arr[j] : max;
            }

            return max;
        }

    };

    return C;

}());
