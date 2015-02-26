//iterate through all latin squares (possible solutions)
var iterate = function(i,j,cages,operations,values,num,sol,rows,colums,solutions) {
    if (j < cages[i].length ) {
        for (var n = 1; n <= num; n++) {
            if (!rows[i][n] && !colums[j][n]){
                sol[i][j] = n;
                rows[i][n] = true;
                colums[j][n] = true;
                iterate(i,j+1,cages,operations,values,num,sol,rows,colums,solutions);
                rows[i][n] = false;
                colums[j][n] = false;
            }
        }
    } else if (i < cages.length - 1) {
        iterate(i+1,0,cages,operations,values,num,sol,rows,colums,solutions);
    } else {
        if (verify(cages,operations,values,sol)) {
            solutions.push(JSON.parse(JSON.stringify(sol)));
        }
    }
}

//test a solution for a a puzzle
var verify = function(cages, operations, values, solution) {
    var results = [];
    for (var i = 0; i < values.length; i++) {
        if (operations[i] == 1) {
            results[i] = 0;
        } else if (operations[i] == 2) {
            results[i] = 1;
        }
    }
    for (var i = 0; i < cages.length; i++) {
        for (var j = 0; j < cages[i].length; j++){
            if (operations[cages[i][j]] == 0) {
                results[cages[i][j]] = solution[i][j];
            } else if (operations[cages[i][j]] == 1) {
                results[cages[i][j]] += solution[i][j];
            } else if (operations[cages[i][j]] == 2) {
                results[cages[i][j]] *= solution[i][j];
            }
        }
    }
    for (var i = 0; i < results.length; i++){
        if (results[i] !== values[i]) {
            return false;
        }
    }
    return true;
} 

//solve a puzzle
//returns an array of all possible solution
//empty array if the puzzle has no solution
var solve = function(cages, operations, values) {
    //initiate arrays
    //assumes squares and needs to be re-written
    var arar = function(amount) {
        ar = []
            for (var n = 0; n < amount; n++) {
                ar[n] = new Array();
            }
        return ar;
    }
    var num = cages.length
        if (num < cages[1].length) {
            num = cages[1].length;
        }
    var sol = arar(num);
    var rows = arar(num);
    var colums = arar(num);
    var solutions = [];

    iterate(0,0,cages,operations,values,num,sol,rows,colums,solutions);

    return solutions;
}

//test values

var test_solution = [[1,2,3,4],
                     [4,1,2,3],
                     [3,4,1,2],
                     [2,3,4,1]];

var test_cages = [[0,0,1,1],
                  [0,2,1,1],
                  [0,3,4,4],
                  [3,3,4,5]];

//0:none ; 1:+ ; 2:*
//position indicates cage-number

var test_operations = [1,1,0,2,1,0]

var test_values = [10,12,1,24,7,1]

//console.log(verify(test_cages, test_operations, test_values, test_solution));

//console.log(solve(test_cages, test_operations, test_values));
