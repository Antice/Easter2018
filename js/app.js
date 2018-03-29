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
var itemTable = {
    "potion":{
      "effect":['HPup',50],
      "fText": "You drink the potion, You feel healthier"
    },
    "Torch":{
      "effect": "Light",
      "fText": "It's flickering light let's you see a bit into the darkness"
    },
    "Mysterious note":{
      "effect": "none",
      "fText": "It's a mysterious note. You know, for setting the mood and stuff."
    }
}

// Loot tables:    todo
var lootTable = {
  "lTable1": ['potion']
  }

// enemy tables: todo
var encTable = {
    "Rat":{
    			"encAtk": 0,
    			"encDef": 0,
    			"encHp": 20,
    			"Loot": "lTable1"
  	       },
  	"Giant Rat":{
    			"encAtk" : 2,
    			"encDef" : 1,
    			"encHp"  : 40,
          "Loot": "lTable1"
        },
    "Giant spider":{
        "encAtk" : 1,
        "encDef" : 2,
        "encHp"  : 40,
        "Loot": "lTable1"
        }
}
// current encounter if any:
var CurrentEnc = {
	"encName": "Rat",
	"encAtk": 0,
	"encDef": 0,
	"encHp": 20,
	"Loot": "lTable1"
}



// preparing a new game. stats has to be reset to start values annyway.
function newGame(){
  charSheet.pName = prompt('what should I call you?');
  charSheet.maxPHp = 50 + d10() * 5;
  charSheet.pHp = charSheet.maxPHp;
  charSheet.pWpn = ['rusty knife',1];
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
  logHistory.push( '<p>' + newLogEntry + '</p>');
  if(logHistory.length > 20){
  logHistory.shift();
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







// resolving Combat

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
// fighting

var combatRound = function(){
  //player attacks first:
  if (attack(charSheet.pAtk + charSheet.pWpn[1], CurrentEnc.encDef)){
    addToLog('You attack (hit)');
    CurrentEnc.encHp =- charSheet.pWpn[1] + d10() - CurrentEnc.encDef;
    addToLog('The enemy has' + ' ' + CurrentEnc.encHp + ' ' + 'HP left.');
  }
  else {
    addToLog('You miss');
  }


  // enemy turn:
  if (attack(CurrentEnc.encAtk, charSheet.pDef + charSheet.pArm)){
    addToLog('Enemy attacks (hit)');
    charSheet.pHp =- CurrentEnc.encAtk + d10() - (charSheet.pDef + charSheet.pArm[1]);
    addToLog('you have' + ' ' + charSheet.pHp + ' ' + 'HP left.');
  }
  else {
    addToLog('Enemy misses');
  }
}
// running runAway
var runAway = function(direction){
  // a bit temporary, to be replaced with something better later.
  switch (direction) {
    case 'N':
      addToLog('You ran north');
    break;
    case 'S':
      addToLog('You ran south');
    break;
    case 'E':
      addToLog('You ran east');
    break;
    case 'W':
      addToLog('You ran west');
    break;
    default:
      addToLog('This should never happen!!!')
  }
  charSheet.playerStatus = 'alive'
}


// in case of combat
var combat = function(action,option){
  switch (action) {
    case 'attack':
      combatRound();
      break;
    case 'move':
      runAway(option);
      break;
    case 'search':
    addToLog('No time for that now');
    break;
    case 'use':
      addToLog('Nothing here yet');
      break;
    default:

  }
}

// in case of a non combat situation
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
      useItem(option);
      break;
    case 'attack':
      addToLog('You take a few practice swings with your' + ' ' + charSheet.pWpn[0]);
      break;
    default:
    console.log('Did you press a broken button?');
  }
}

// moving about
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
