

// character sheet:
var pName = '';
var maxPHp
var pHp = 0;
var pAtk = 0;
var pDef = 0;
var pWpn = ['',0];
var pArm = ['',0];
var inv = ['','','','','','','','','',''];
var Torchtime = 0;


// setting up the character sheet at game start:
function newGame(){
  pName = Querry('what should I call you?');
  maxPHp = 50 + d10() * 5;
  pHp = naxPHp;
  pWpn = '';
  pArm = '';
  inv[0] = 'Torch'
  inv[1] = 'health potion'
  inv[2] = 'Mysterious note'
}

// Utility classes:

//d-10
var d10 = function(){
  return Math.floor(Math.random()* 10 + 1);
}

// Tile generation functions
var roomtype = function(){
  return roomTypes[d10()];
}

// battle:
var enemyHP = 100;
var enemyDefenceVal = 2;
var enemyWeaponStr = 2;
var playerHP = 100;
var playerDefenceVal = 4;
var playerWeaponStr = 4;

// Game engine

//Resolving Combat

// Enemy stats




var attack = function(attack,defence){
  if (attack + d10() > defence + d10()){
    return true;
  }
  else{
    return false;
  }

}
// resolving an attack
var hit = function(attack,defence,actor1,actor2){
  var damage = attack + d10() - defence;
  if (damage <= 1){
    console.log( actor1 +'\'s strike barely scratches the' + ' ' + actor2 + ', ' + 'dealing' + ' ' + damage + ' ' + 'HP worth of damage');
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

// player choice:

function buttonPress(action,option){
  if (action == 'attack'){
  // combat round
  }
  else if (action == 'use'){
    // Let's use the item stored in inventory slot option
  }
  else if (action == 'move') {

  }
}
