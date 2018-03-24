// Data:


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
function attack(attack,defence){
  if (attack + d10() > defence + d10()){
    return true;
  }
  else{
    return false;
  }

}

function hit(attack,defence,actor1,actor2){
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




function choseAttack(){
  if (enemyHP == 0 || playerHP == 0){
    document.getElementById('log').innerHTML = 'Dead people can\'t fight back'
    }
  else{
    var current = 'You strike:' + '<br>';
    current = current + playerAttack() + '<br>';
    current = current + enemyAttack() + '<br>';
    current = current + 'Player HP:' + playerHP + '<br>';
    current = current + 'Enemy HP:' + enemyHP + '<br>';
    document.getElementById('log').innerHTML = current;
    }
  }
