//Data section
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
    "index":["Potion","Torch","Mysterious note","Rusty Knife","Broken Sword","cracked club","Worn Rags","Worn leather","Sword","Gold Coin"],

    "Potion":{
      "effect":["HPup",50],
      "fText": "You drink the potion, You feel healthier"
    },
    "Torch":{
      "effect":["Light",100],
      "fText":"It's flickering light let's you see a bit into the darkness, or not"
    },
    "Mysterious note":{
      "effect": ["read",0],
      "fText": ["I'm sorry that I had to leave you here.","I took all the stuff except a health potion and the rusty knife,","Good luck on surviving","Regards, your x-friend Reg."]
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
		},
    "Worn leather":{
      "effect":["armor",4],
      "fText" : "It might be worn, but it's pretty decent protection"
    },
    "Sword":{
      "effect": ["weapon",8],
      "fText": "Slice'n Dice baby."
    },
    "Gold Coin":{
      "effect":["read",0],
      "fText": "Very pretty but useless right now"
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
//  "maptile":{0:{0:[]}},
  "x":0,
  "y":0,
  "logHistory":['Welcome']
}
var maptile = [];
maptile[0] = [];
maptile[0][0] = ['mea culpa']
//Data section end
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
  player.Status = true;
  // populating the inventory screen for the dirst time.
  for (var i = 0; i < player.inv.length ; i++) {
    document.getElementById('Slot'+ i).innerHTML = player.inv[i];
  }
  //resetting the map:
  maptile.length = 1;
  maptile[0].length = 1;
  maptile[0][0] = ["dark cave","Rat","Potion"];
  game.x = 0;
  game.y = 0;
  game.encounter = true;
  game.enemy = "Rat";
  game.enemyHp = 10;
  game.logHistory.lenght = 0;
  addToLog('You startle awake, just as a rat is about to bite down on you.');
  addToLog('Fumbling around, your hand lands on the handle of a knife.');
  addToLog('picking the knife up you prepare to defend yourself!');
}
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
    // log output to screen:
    document.getElementById('log').innerHTML = logString;
}
// dead players can't act.
var pIsDead = function(){
  alert('You are dead, Starting a new game')
  newGame();
}
// Setting up an encounter.
var encounterEvent = function(){
  game.enemy = encTable.index[Math.floor(Math.random() * encTable.index.length)];
  game.enemyHp = encTable[game.enemy].encHp;
  game.encounter = true;
  addToLog('A' + ' ' + game.enemy + ' ' + 'looks at you menacingly. You draw your' + ' ' + player.pWpn + ' ' + 'and prepare for combat');
}
// dropping some treasure Yo!
var treasureEvent = function(){
  var lootItem;
  if (d10() > 5) {
      maptile[game.x][game.y].push(itemTable.index[Math.floor(Math.random() * itemTable.index.length)]);
      console.log('Loot has dropped')
  }
  else {
    if (Math.floor(Math.random() * 2) == 2){lootItem = 'Potion';}
    else {lootItem = 'Torch';}
  }
}
// Making a maptile if needed:
function maketile(){
if (typeof(maptile[game.x]) === 'undefined'){
  maptile[game.x] = [game.x];
  maptile[game.x][game.y] = [game.y];
  maptile[game.x][game.y][0] = ["Dark Cave"];
  if (d10() > 9) {encounterEvent();}
  if (d10() > 9) {treasureEvent();}
 }
else if (typeof(maptile[game.x][game.y]) === 'undefined'){
  maptile[game.x][game.y] = [game.y];
  maptile[game.x][game.y][0] = ["Dark Cave"];
  if (d10() > 9) {encounterEvent();}
  if (d10() > 9) {treasureEvent();}
  }
}
// Combat section
//Roll the dice.
var d10 = function(){
  var d = Math.floor(Math.random()* 10 + 1);
  return d;

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
// resolving attacks:
var combatRound = function(){
//player attacks first:
  if (attack((player.pAtk + itemTable[player.pWpn].effect[1]), encTable[game.enemy].encDef)){
    addToLog('Your attack (hit)');
    game.enemyHp = game.enemyHp - (itemTable[player.pWpn].effect[1] + d10() - encTable[game.enemy].encDef);
    if (game.enemyHp < 0) {
      addToLog('The enemy has died');
      game.encounter = false;
      var ground = maptile[game.x][game.y];
      ground[ground.indexOf(game.enemy)] = '';
      ground.push('Dead' + ' ' + game.enemy);
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
// Combat section end
// Inventory section
// using an item from the quickslots, both in and out of combat.
var useItem = function(slot){
  if (player.inv[slot] == '') {
    addToLog('it was empty');
    return;
    }
  else {
    var effect = itemTable[player.inv[slot]].effect[0];
    switch (effect) {
      case 'HPup':
        addToLog(itemTable[player.inv[slot]].fText);
        player.pHp = player.pHp + itemTable[player.inv[slot]].effect[1];
        player.inv[slot] = '';
        break;
      case 'Light':
          addToLog(itemTable[player.inv[slot]].fText);
          player.Torchtime = itemTable[player.inv[0]].effect[1];
          player.inv[slot] = '';
          break;
      case 'read':
        addToLog('');
        var text = itemTable[player.inv[slot]].fText;
        for (var i = 0; i < text.length; i++) {
          addToLog(text[i]);
        }
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
// Inventory section end
//game engine section:
// running Away
var runAway = function(direction){
  switch (direction) {
    case 'N':
      addToLog('You ran to the north');
      game.x = game.x + 1;
    break;
    case 'S':
      addToLog('You ran to the south');
      game.x = game.x - 1;
    break;
    case 'E':
      addToLog('You ran to the east');
      game.y = game.y + 1;
    break;
    case 'W':
      addToLog('You ran to the west');
      game.y = game.y - 1;
    break;
    default:
      addToLog('This should never happen!!!');
  }
  game.encounter = false;
  maketile();
}
// moving about
var navigate = function(direction){
  switch (direction) {
    case 'N':
      addToLog('You walked north');
      game.x = game.x + 1;
    break;
    case 'S':
      addToLog('You walked south');
      game.x = game.x - 1;
    break;
    case 'E':
      addToLog('You walked east');
      game.y = game.y + 1;
    break;
    case 'W':
      addToLog('You walked west');
      game.y = game.y - 1;
    break;
    default:
      addToLog('This should never happen!!!');
  }
  maketile();
}
// Looking around
var lookAround = function(){
  var ground = maptile[game.x][game.y];
  if (player.Torchtime < 0) {
    addToLog('You fumble around in the darkness')
  }
  addToLog('You are in a' + ' ' + ground[0]);
  if (ground.length > 1){
    addToLog('You see a:');
    for (var i = 1; i < ground.length; i++) {
      addToLog(ground[i]);
    }
  }
}

// in case they don't want it:
var dropItem = function(){
  var ground = maptile[game.x][game.y];
  var slot = (prompt('What slot? (1 to 9)') - 1)
  console.log(slot);
  console.log(ground);
  if (document.getElementById('Slot'+ [slot]).innerHTML == "") {
    addToLog('Nothing to drop')
  }
  else {
    ground.push(document.getElementById('Slot'+ [slot]).innerHTML);
    player.inv[slot] = '';
    // player.inv[slot] = '';
  }
  refInv()
}
// when they do want it.
var takeItem = function(){
  var item = prompt('What item?');
  var ground = maptile[game.x][game.y];
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
    }
    else{addToLog('Slot is full, please choose an empty slot.')}
  }
  refInv();
}
//game engine section end:
// control section:
//opening the actionmenu
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
// in case we are in an encounter:
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
// in case of a no encounter
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
// control section end:
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
  player.Torchtime--;
  if (d10() == 1) {
    if (player.Torchtime < 0) {
      addToLog('You stumble in the darkness!');
    }
    else if(player.Torchtime > 0 && player.Torchtime < 30){
      addToLog('your torch is peetering out');
    }
    else {
      addToLog('Yout torch flutters brightly');
    }
  }
}
