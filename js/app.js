

// character sheet:
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

// setting up the character sheet at game start:
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



// Bladocument.getElementById('textChange').innerHTML = retVal;nk enemy encounter sheet
var encName = '';
var encAtk = 0;
var encDef = 0;
var encHp = 0;



// Some global variables needed to progress the game. (sorry. I know this is a bad way to do shit)
var isEncounter = true;


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



// The infamous lord of random
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

// player Inputs:

function PlayerInput(action,option){
  if (PlayerIsAlive == false){
    console.log('Dead people can\'t play ball <br> Why not start a new game?')
  }
  else if (action == 'attack'){
    if (isEncounter == true){
      console.log('You attack')
      encHp = encHp - hit(pAtk,encDef,pName,encName)
      if (encHp <= 0){
        console.log('The enemy has died');
        isEncounter = false;
        return;
      }
      pHp = pHp - hit(encAtk,pDef,encName,pName)
        if (pHp <= 0){
          console.log('You have died');
          PlayerIsAlive = false;
        }
      }
    else{
      console.log('Nothing there to kill')
    }
  }
  else if (action == 'use'){
    console.log(inv[option]);
    // Let's use the item stored in inventory slot option
  }
  else if (action == 'move'){
    if (option == 'N'){
      console.log('You walked north')
    }
    else if (option == 'E'){
      console.log('You walked east')
    }
    else if (option == 'S'){
      console.log('You walked south')
    }
    else if (option == 'W'){
      console.log('You walked west')
    }
    else {
      console.log('This should not happen')
    }

  }
}
