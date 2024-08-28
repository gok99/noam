var fs = require('fs');

require('./noam.util.js')
require('./noam.fsm.js');
require('./noam.re.js')

function convertToDfa(automaton) {
  if (automaton !== null) {
    automaton = noam.fsm.minimize(automaton);
    var r = noam.fsm.toRegex(automaton);
    r = noam.re.tree.simplify(r, {"useFsmPatterns": false});
    return noam.re.tree.toString(r);
  }
  return null;
}

function validateFsm(fsm) {
  try {
      fsm = noam.fsm.parseFsmFromString(fsm);
      return fsm;
  } catch (e) {
      console.log("Error: "+ e.message);
      return null;
  }
}

// 1. read file from stdin file name
var fileName = process.argv[2];
var fileContent = fs.readFileSync(fileName, 'utf8');

// 2. call validateFsm 
var fsm = validateFsm(fileContent);

// 3. call convertToDfa
var dfa = convertToDfa(fsm);

console.log(dfa);
