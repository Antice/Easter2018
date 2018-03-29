// Data sheets

//Character sheet:
var charSheet = {
	"pName": "",
	"maxPHp": 0,
	"pHp": 0,
	"pAtk": 0,
	"pDef": 0,
	"pWpn": ["", 0],
	"pArm": ["", 0],
	"inv": ["", "", "", "", "", "", "", "", ""],
	"Torchtime": 0,
	"playerStatus": 'dead'
}

// item tables: todo


// Loot tables:    todo


// enemy tables: todo
var encTable = {
  "Rat":{
			"encAtk": 0,
			"encDef": 0,
			"encHp": 20,
			"Loot": "lTable1"
	},
	"Giant Rat":{
			"encAtk" : 1,
			"encDef" : 2,
			"encHp"  : 40,
	}
}
// current encounter if any:
var CurrentEnc = {
	"encName": "",
	"encHp":0
}



// preparing a new game. stats has to be reset to start values annyway.
function newGame(){
  charSheet.pName = prompt('what should I call you?');
  charSheet.maxPHp = 50 + d10() * 5;
  charSheet.pHp = charSheet.maxPHp;
  charSheet.pWpn = ['rusty knife',0];
  charSheet.pArm = ['worn rags',0];
  charSheet.inv[0] = 'Torch'
  charSheet.inv[1] = 'health potion'
  charSheet.inv[2] = 'Mysterious note'
  charSheet.playerStatus = 'alive';
  // populating the inventory screen for the dirst time.
  for (var i = 0; i < charSheet.inv.length ; i++) {
    document.getElementById('Slot'+ i).innerHTML = charSheet.inv[i];
  }
}

// some other global stuff we need. should try to avoid doing this as much as possible tho.

// information about the current tile, might need to do something about visual range too.

//format: ground,north,east,south,west,enemy,Items[],Special[].
// var tiledata = ['','','','','','',itemId[''],featurId['']]
/* some temporary/under testing stuff */
// Tile generation functions that I may or may not have time to implement.
var roomtype = function(){
  return roomTypes[d10()];
}

// log output to screen:
// got to keep tabs on the old stuff:
var logHistory = ['Welcome'];
//adding new log entries:
function addToLog(newLogEntry){
  var logString = '';
  logHistory.unshift( '<p>' + newLogEntry + '</p>');
  if(logHistory.length > 20){
  logHistory.pop();
  }
  for(i = 0; logHistory.length > i; i++){
  logString = logString + logHistory[i];
  }
  document.getElementById('log').innerHTML = logString;
}
// done











// Game engine stuff
// dead players can't act.
var pIsDead = function(){
addToLog('You are dead, Start a new game if you want to play.')
}




//Roll the dice.
var d10 = function(){
  return Math.floor(Math.random()* 10 + 1);
}

// Does it hit?
var attack = function(attack,defence){
  if (attack + d10() > defence + d10()){
    return true;
  }
  else{
    return false;
  }
}


// resolving Combat


// player initiated gameturn;
// because I don't know a better way within js.
var combat = function(action,option){
  switch (action) {
    case 'attack':
      combatround()
      break;
    case 'move':
      runAway();
      break;
    case 'search':
    addToLog('No time for that now')
    break;
    case 'use':
      addToLog('Nothing here yet');
      break;
    default:

  }
}


var navigate = function(direction){
  switch (direction) {
    case 'N':
      addToLog('You walked north');
    break;
    case 'S':
      addToLog('You walked south');
    break;
    case 'E':
      addToLog('You walked east');
    break;
    case 'W':
      addToLog('You walked west');
    break;
    default:
      addToLog('This should never happen!!!')
  }
}

var noCombat = function(action,option){
  switch (action) {
    case 'move':
      navigate(option)
      break;
    case 'search':
      console.log(action + ' ' + 'Nothing yet');
      break;
    case 'action':
      console.log(action + ' ' + 'Nothing here yet')
      break;
    case 'use':
      useItem();
      break;
    case 'attack':
      addToLog('You take a few practice swings with your' + ' ' + charSheet.pWpn[0]);
      break;
    default:
    console.log('Did you press a broken button?');
  }
}


// this is the "main" loop of the script.
function PlayerInput(action,option){
  if (charSheet.playerStatus =='dead') {
    pIsDead()
  }
else if (charSheet.playerStatus == 'combat') {
  combat(action,option);
  }
else{
  noCombat(action,option);
  }
}
