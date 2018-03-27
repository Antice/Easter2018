//trying it with Json

var charSheet = {
	"pName": "Antice",
	"maxPHp": 100,
	"pHp": 50,
	"pAtk": 1,
	"pDef": 2,
	"pWpn": ["Sword", 3],
	"pArm": ["worn clothes", 0],
	"inv": ["", "", "", "", "", "", "", "", ""],
	"Torchtime": 0,
	"PlayerIsAlive": false
}




// Some global variables needed to progress the game. (sorry. I know this is a bad way to do shit)
// this stuff will be replaced by data imported from a Json file. It's all temporary now.
// character sheet:
/*
var pName = '';
var maxPHp = 0;
var pHp = 0;
var pAtk = 0;
var pDef = 0;
var pWpn = ['',0];
var pArm = ['',0];
var inv = ['-','-','-','-','-','-','-','-','-'];
var Torchtime = 0;
var PlayerIsAlive = false;

// Monster sheet:
var encName = '';
var encAtk = 0;     //  not always a weapon....
var encDef = 0;     // not always armour either
var encHp = 0;
*/

/* item tables:      use a 2d array?  [itemname,type,value]
--- doing this should remove the need to have item name anywhere else, just refer to the item with item[x],
 and fetch the corresponding value from the referenced array dimension. */


/* Loot tables:     another 2d array? [itemname,type,value].
same thing here, the loot should be based on the enemy, so one enemy should drop x type of loot only.
*/

/* encounter tables. format: encounter[x] where x is a second array containing the enemy's stats in the format: encName,encAtk,encDef and encHp.
We can mess with randomizing the enemy stats a bit later on, by adding a weight variable rather than a direct value */



// setting up the character sheet at game start:
/*
function newGame(){
  pName = prompt('what should I call you?');
  maxPHp = 50 + d10() * 5;
  pHp = maxPHp;
  pWpn = '';
  pArm = '';
  inv[0] = 'Torch'
  inv[1] = 'health potion'
  inv[2] = 'Mysterious note'
  PlayerIsAlive = true;
  // populating the inventory screen
  for (var i = 0; i < inv.length ; i++) {
    document.getElementById('Slot'+ i).innerHTML = inv[i];
  }
}

*/



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
      encHp =- hit(pAtk,encDef,pName,encName);
      if (encHp <= 0){
        console.log('The enemy has died');
        isEncounter = false;
        return;
      }
      pHp =- hit(encAtk,pDef,encName,pName);
        if (pHp <= 0){
          console.log('You have died');
          PlayerIsAlive = false;
        }
      }
    else{
      console.log('Nothing there to kill');
    }
  }
  else if (action == 'use'){
    console.log(inv[option]);
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
