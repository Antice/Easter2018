//Character sheet:
var player = {
  	"pName": "",
  	"maxPHp": 0,
  	"pHp": 0,
  	"pAtk": 0,
  	"pDef": 0,
  	"pWpn": "",
  	"pArm": "",
  	"inv": ["", "", "", "", "", "", "", "", ""],
  	"Torchtime": 0,
  	"Status": false
}
// item table
var itemTable = {
    "index":["Potion","Torch","Mysterious note","Rusty Knife","Broken Sword","cracked club","Worn Rags"],
    "Potion":{
      "effect":["HPup",50],
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
		"Rusty Knife":{
			"effect": ["weapon",3],
			"fText": "It's rusty, they might die from tetanus."
		},
		"Broken Sword":{
			"effect": ["weapon",3],
			"fText": "It's broken, but better than nothing"
		},
		"cracked club":{
			"effect": ["weapon",5],
			"fText": "Cracked, but still effective"
		},
		"Worn Rags":{
			"effect" : ["armor",2],
			"fText" : "Disgusting to wear, but the alternative is being naked"
		}
}
// Loot table
var dropTable = {
  "DropTable1": ["potion","Broken Sword","cracked club"]
  }
// encounter table
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
  "maptile":{"0":{"0":["dark cave","Rat","Potion"]}},
  "x":0,
  "y":0,
  "logHistory":['Welcome']
}
var ground = game.maptile[game.x][game.y];    // let's make dealing with the map a bit easier on ourselves.
// add tiletyupes and more stuff later with some fancy map population function. encounters and loot are randomized elsewhere for now.
function refInv(){
  for (var i = 0; i < player.inv.length ; i++) {
    document.getElementById('Slot'+ i).innerHTML = player.inv[i];
  }
}
// preparing a new game. stats has to be reset to start values annyway.
function newGame(){
  player.pName = prompt('what should I call you?');
  player.maxPHp = 50 + d10() * 5;
  player.pHp = player.maxPHp;
  player.pWpn = 'Rusty Knife';
  player.pArm = 'Worn Rags';
  player.inv[0] = 'Torch'
  player.inv[1] = 'Potion'
  player.inv[2] = 'Mysterious note'
	player.inv[3] = 'Broken Sword'
  player.Status = true;
  // populating the inventory screen for the dirst time.
  for (var i = 0; i < player.inv.length ; i++) {
    document.getElementById('Slot'+ i).innerHTML = player.inv[i];
  }
  //resetting the map:
 for (var x = 0; x < game.maptile.length; x++) {
   for (var y = 0; y < game.maptile[x].length; y++) {
     game.maptile[x][y] = [];
   }
 }
 game.maptile[0][0] = ["dark cave","Rat","Potion"];
 game.x = 0;
 game.y = 0;
 game.encounter = true;
 game.enemy = "Rat";
 game.enemyHp = 10;
 game.logHistory = [];
 addToLog('You startle awake, just as a rat is about to bite down on you.');
 addToLog('Fumbling around, your hand lands on the handle of a knife.');
 addToLog('picking the knife up you prepare to defend yourself!');
}

// log output to screen:
//adding new log entries:
function addToLog(newLogEntry){
  var logString = '';
  game.logHistory.push( '<p>' + newLogEntry + '</p>');
  if(game.logHistory.length > 20){
  game.logHistory.shift();
  }
  for(i = 0; game.logHistory.length > i; i++){
  logString = logString + game.logHistory[i];
  }
  document.getElementById('log').innerHTML = logString;
}
// dead players can't act.
var pIsDead = function(){
addToLog('You are dead, Start a new game if you want to play.');
newGame();
}
// Setting up an encounter.
var encounterEvent = function(){
  game.enemy = encTable.index[Math.floor(Math.random() * encTable.index.length)];
  game.enemyHp = encTable[game.enemy].encHp;
  game.encounter = true;
  addToLog('A' + ' ' + game.enemy + ' ' + 'looks at you menacingly. You draw your' + ' ' + player.pWpn + ' ' + 'and prepare for combat');
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
  if (attack((player.pAtk + itemTable[player.pWpn].effect[1]), encTable[game.enemy].encDef)){
    addToLog('Your attack (hit)');
    game.enemyHp = game.enemyHp - (itemTable[player.pWpn].effect[1] + d10() - encTable[game.enemy].encDef);
    if (game.enemyHp < 0) {
      addToLog('The enemy has died');
      game.encounter = false;
      ground[1] = 'Dead' + ' ' + game.enemy;
    }
    else {
      addToLog('The enemy has' + ' ' + game.enemyHp + ' ' + 'HP left.');
    }
  }
  else {
    addToLog('You miss');
  }
// enemy turn:
  if (game.encounter == false) {
    return;
  }
  else if (attack(encTable[game.enemy].encAtk, (player.pDef + itemTable[player.pArm].effect[1]))){
    addToLog('Enemy attack (hit)');
    player.pHp = player.pHp - (encTable[game.enemy].encAtk + d10() - (player.pDef + itemTable[player.pArm].effect[1]));
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
// using an item from the quickslots, both in and out of combat.
var useItem = function(slot){
  if (player.inv[slot] == '') {
    console.log('it was empty');
    return;
    }
  else {
    var effect = itemTable[player.inv[slot]].effect[0];
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
      case 'weapon':
        var old = player.pWpn;
        player.pWpn = player.inv[slot];
        player.inv[slot] = old;
        break;
      default:
    }
    document.getElementById('Slot'+ slot).innerHTML = player.inv[slot];
  }
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
      addToLog('This should never happen!!!');
  }
  // maybe you get an encounter
  if (d10() > 9) {
    encounterEvent();
  }
}

var lookAround = function(){
  addToLog('You are in a' + ' ' + ground[0]);
  addToLog('You see a:');
  for (var i = 1; i < ground.length; i++) {
    addToLog(ground[i]);
  }
}

var dropItem = function(){
  var slot = (prompt('What slot? (1 to 9)') - 1)
  if (player.inv[slot] = '') {
    addToLog('Nothing to drop')
  }
  else {
    ground.push(player.inv[slot]);
    player.inv[slot] = '';
  }
  refInv()
}
var takeItem = function(){
  var item = prompt('What item?');
  if (ground.indexOf(item) == -1){
    addToLog('No such item found, check spelling and try again?');
  }
  else if (itemTable.index.indexOf(item) == -1) {
    addToLog("You don't want that");
  }
  else {
    var slot = (prompt('What slot do you want to put it in?') -1);
    if (player.inv[slot] == '') {
      player.inv[slot] = ground[ground.indexOf(item)];
      ground[ground.indexOf(item)] = '';
      ground = ground.filter(s => s.replace(/\s+/g, '').length !== 0);    // I ended up cheating. not my code. ask Tor Arne on tuesday about how this crap works.
    }
    else{addToLog('Slot is full, please choose an empty slot.')}
  }
  refInv();

}


var isactionopen = false;
var actions = function(option){
switch (option) {
  case 'open':
    if (!isactionopen) {
          document.getElementById('actionmenu').classList.add('showactions');
          isactionopen = true;
    }
    else {
        document.getElementById('actionmenu').classList.remove('showactions');
        isactionopen = false;
    }
    break;
  case 'drop':
    dropItem();
    document.getElementById('actionmenu').classList.remove('showactions');
    isactionopen = false;
    break;
  case 'take':
      takeItem();
      isactionopen = false;
      document.getElementById('actionmenu').classList.remove('showactions');
    break;
  default:
  console.log('Nuthing happened')
  }
}

// in case of a non combat situation
var noCombat = function(action,option){
  switch (action) {
    case 'move':
      navigate(option)
      break;
    case 'search':
      lookAround();
      break;
    case 'action':
      actions(option);
      break;
    case 'use':
      useItem(option);
      break;
    case 'attack':
      addToLog('You take a few practice swings with your' + ' ' + player.pWpn);
      break;
    default:
    console.log('Did you press a broken button?');
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
