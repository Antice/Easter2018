//trying it with Json




//testing the stuff.
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
	"PlayerIsAlive": false
}
var encounterStats = {
  "encName":"",
  "encAtk":0,
  "encDef":0,
  "encHp":0,
  "Lootdrop":["loot"]
}




// item tables: todo


// Loot tables:    todo

// enemy tables: todo


// preparing a new game. stats has to be reset to start values annyway.
function newGame(){
  charSheet.pName = prompt('what should I call you?');
  charSheet.maxPHp = 50 + d10() * 5;
  charSheet.pHp = charSheet.maxPHp;
  charSheet.pWpn = ['',0];
  charSheet.pArm = ['',0];
  charSheet.inv[0] = 'Torch'
  charSheet.inv[1] = 'health potion'
  charSheet.inv[2] = 'Mysterious note'
  charSheet.PlayerIsAlive = true;
  // populating the inventory screen for the dirst time.
  for (var i = 0; i < charSheet.inv.length ; i++) {
    document.getElementById('Slot'+ i).innerHTML = charSheet.inv[i];
  }
}

// some other global stuff we need. should try to avoid doing this as much as possible tho.

var isEncounter = true;


// information about the current tile, might need to do something about visual range too.

//format: ground,north,east,south,west,enemy,Items[],Special[].
// var tiledata = ['','','','','','',itemId[''],featurId['']]
/* some temporary/under testing stuff */
// Tile generation functions that I may or may not have time to implement.
var roomtype = function(){
  return roomTypes[d10()];
}

// Game engine stuff

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
var hit = function(attack,defence,actor1,actor2){
  var damage = attack + d10() - defence;
  if (damage <= 1){
    addToLog( actor1 +'\'s strike barely scratches the' + ' ' + actor2 + ', ' + 'dealing' + ' ' + damage + ' ' + 'HP worth of damage');   // <-- This is such a silly way to do this.
    return damage;
  }
  else if (damage > 1 && damage <= 3) {
    addToLog(actor1 + ' ' + 'hits the' + ' ' + actor2 + ' ' + 'causing a shallow cut, dealing' + ' ' + damage + ' ' + 'HP worth of damage');
    return damage;
  }
  else if (damage > 3 && damage <= 5) {
    addToLog(actor1 + ' ' + 'hits the' + ' ' + actor2 + ' ' + 'causing a serious cut, dealing' + ' ' + damage + ' ' + 'HP worth of damage');
    return damage;
  }
  else{
    addToLog(actor1 + ' ' + 'hits the' + ' ' + actor2 + ' ' + 'inflicting a deep wound, dealing' + ' ' + damage + ' ' + 'HP worth of damage');
    return damage;
  }
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


// player initiated gameturn;
// because I don't know a better way within js.

function PlayerInput(action,option){
  if (charSheet.PlayerIsAlive == false && option == !'Action'){
    addToLog('Dead people can\'t play ball.');
    addToLog('Why not start a new game?');
  }
  else if (action == 'attack'){
    if (isEncounter == true){
      encHp =- hit(charSheet.pAtk,encounterStats.encDef,charSheet.pName,encounterStats.encName);
      if (encounterStats.encHp <= 0){
        addToLog('The enemy has died');
        isEncounter = false;
        return;
      }
      pHp =- hit(encounterStats.encAtk,charSheet.pDef,encounterStats.encName,charSheet.pName);
        if (charSheet.pHp <= 0){
          addToLog('You have died');
          charSheet.PlayerIsAlive = false;
        }
      }
    else{
      addToLog('Nothing there to kill');
    }
  }
  else if (action == 'use'){
    addToLog(charSheet.inv[option]);
    // Let's use the item stored in inventory slot option
  }
  else if (action == 'move'){
    switch (option) {
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
  else if (option == 'action') {
    newGame()
  }
}
