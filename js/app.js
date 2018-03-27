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
    console.log( actor1 +'\'s strike barely scratches the' + ' ' + actor2 + ', ' + 'dealing' + ' ' + damage + ' ' + 'HP worth of damage');   // <-- This is such a silly way to do this.
    return damage;
  }
  else if (damage > 1 && damage <= 3) {
    console.log(actor1 + ' ' + 'hits the' + ' ' + actor2 + ' ' + 'causing a shallow cut, dealing' + ' ' + damage + ' ' + 'HP worth of damage');
    return damage;
  }
  else if (damage > 3 && damage <= 5) {
    console.log(actor1 + ' ' + 'hits the' + ' ' + actor2 + ' ' + 'causing a serious cut, dealing' + ' ' + damage + ' ' + 'HP worth of damage');
    return damage;
  }
  else{
    console.log(actor1 + ' ' + 'hits the' + ' ' + actor2 + ' ' + 'inflicting a deep wound, dealing' + ' ' + damage + ' ' + 'HP worth of damage');
    return damage;
  }
}


// player initiated gameturn;
// because I don't knwo a better way within js.

function PlayerInput(action,option){
  if (PlayerIsAlive == false){
    console.log('Dead people can\'t play ball <br> Why not start a new game?');
  }
  else if (action == 'attack'){
    if (isEncounter == true){
      encHp =- hit(charSheet.pAtk,encounterStats.encDef,charSheet.pName,encounterStats.encName);
      if (encounterStats.encHp <= 0){
        console.log('The enemy has died');
        isEncounter = false;
        return;
      }
      pHp =- hit(encounterStats.encAtk,charSheet.pDef,encounterStats.encName,charSheet.pName);
        if (charSheet.pHp <= 0){
          console.log('You have died');
          charSheet.PlayerIsAlive = false;
        }
      }
    else{
      console.log('Nothing there to kill');
    }
  }
  else if (action == 'use'){
    console.log(charSheet.inv[option]);
    // Let's use the item stored in inventory slot option
  }
  else if (action == 'move'){
    switch (option) {
      case 'N':
        console.log('You walked north');
      break;
      case 'S':
        console.log('You walked south');
      break;
      case 'E':
        console.log('You walked east');
      break;
      case 'W':
        console.log('You walked west');
      break;
      default:
      console.log('This should never happen!!!')
    }
  }
}
