
//Character sheet:
var player = {
  	"pName": "",
  	"maxPHp": 0,
  	"pHp": 0,
  	"pAtk": 0,
  	"pDef": 0,
  	"pWpn": ["", 0],
  	"pArm": ["", 0],
  	"inv": ["", "", "", "", "", "", "", "", ""],
  	"Torchtime": 0,
  	"Status": false
}

// item tables: todo
var itemTable = {
    "Potion":{
      "effect":['HPup',50],
      "fText": "You drink the potion, You feel healthier"
    },
    "Torch":{
      "effect": ["Light",100],
      "fText": "It's flickering light let's you see a bit into the darkness"
    },
    "Mysterious note":{
      "effect": ["read",0],
      "fText": "It's a mysterious note. You know, for setting the mood and stuff."
    },
		"Broken Sword":{
			"effect": ["atkup",3],
			"fText": "It's broken, but better than nothing"
		},
		"cracked club":{
			"effect": ["atkup",5],
			"fText": "Cracked, but still effective"
		}
}

// Loot tables:    todo
var dropTable = {
  "DropTable1": ["potion","Broken Sword","cracked club"]
  }

// enemy tables: todo
var encTable = {
		"index":["Rat","Giant Rat","Giant Spider"],
    "Rat":{
    			"encAtk": 0,
    			"encDef": 0,
    			"encHp": 20,
    			"Loot": "DropTable1"
  	       },
  	"Giant Rat":{
    			"encAtk" : 2,
    			"encDef" : 1,
    			"encHp"  : 40,
          "Loot": "DropTable1"
        },
    "Giant Spider":{
        "encAtk" : 1,
        "encDef" : 2,
        "encHp"  : 40,
        "Loot": "DropTable1"
        }
}


// game status
var game = {
  "encounter": false,
  "enemy":"",
  "enemyHp":0,
  "items":[""]
// add tiles and stuff later
}
// preparing a new game. stats has to be reset to start values annyway.
function newGame(){
  player.pName = prompt('what should I call you?');
  player.maxPHp = 50 + d10() * 5;
  player.pHp = player.maxPHp;
  player.pWpn = ['rusty knife',1];
  player.pArm = ['worn rags',0];
  player.inv[0] = 'Torch'
  player.inv[1] = 'Potion'
  player.inv[2] = 'Mysterious note'
  player.Status = true;
  // populating the inventory screen for the dirst time.
  for (var i = 0; i < player.inv.length ; i++) {
    document.getElementById('Slot'+ i).innerHTML = player.inv[i];
  }
}

// Setting up an encounter.
var encounterEvent = function(){
  game.enemy = encTable.index[Math.floor(Math.random() * encTable.index.length)];
  game.enemyHp = encTable[game.enemy].encHp;
  game.encounter = true;
  addToLog('A' + ' ' + game.enemy + ' ' + 'looks at you menacingly. You draw your' + ' ' + player.pWpn[0] + ' ' + 'and prepare for combat');
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
addToLog('You are dead, Start a new game if you want to play.');
newGame();
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
  if (attack((player.pAtk + player.pWpn[1]), encTable[game.enemy].encDef)){
    addToLog('Your attack (hit)');
    game.enemyHp = game.enemyHp - (player.pWpn[1] + d10() - encTable[game.enemy].encDef);
    if (game.enemyHp < 0) {
      addToLog('The enemy has died');
      game.encounter = false;
    }
    else {
      addToLog('The enemy has' + ' ' + game.enemyHp + ' ' + 'HP left.');
    }
  }
  else {
    addToLog('You miss');
  }

  // enemy turn:
  if (attack(encTable[game.enemy].encAtk, (player.pDef + player.pArm[1]))){
    addToLog('Enemy attack (hit)');
    player.pHp = player.pHp - (encTable[game.enemy].encAtk + d10() - (player.pDef + player.pArm[1]));
    addToLog('you have' + ' ' + player.pHp + ' ' + 'HP left.');
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
      addToLog('You ran to the north');
    break;
    case 'S':
      addToLog('You ran to the south');
    break;
    case 'E':
      addToLog('You ran to the east');
    break;
    case 'W':
      addToLog('You ran to the west');
    break;
    default:
      addToLog('This should never happen!!!');
  }
  game.encounter = false;
}




// using an item from the quickslots
var useItem = function(slot){
  var effect = itemTable[player.inv[slot]].effect[0];
  console.log(effect);
  addToLog(itemTable[player.inv[slot]].fText);
  switch (effect) {
    case 'HPup':
      player.pHp = player.pHp + itemTable[player.inv[slot]].effect[1];
      player.inv[slot] = '';
      break;
    case 'Light':
        player.inv[slot] = '';
        break;
    case 'read':
        addToLog()
        break;
    default:

  }
  document.getElementById('Slot'+ slot).innerHTML = player.inv[slot];
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
      useItem(option);
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
      addToLog('You take a few practice swings with your' + ' ' + player.pWpn[0]);
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
  // maybe you get an encounter
  if (d10() > 9) {
    encounterEvent()
  }
}


// this is the "main" loop of the script.
function PlayerInput(action,option){
  if (!player.Status) {
    pIsDead()
  }
else if (game.encounter) {
  combat(action,option);
  }
else{
  noCombat(action,option);
  }
}
