// Data:


// Utility classes:

//d-10
var d10 = function(){
  return Math.floor(Math.random()* 10 + 1);
}
// testing the roller
var do10 = function(num){
  for (var x = 0; x < num; x++){
    console.log(d10());
  }
}

// Tile generation functions
var roomtype = function(){
  return roomTypes[d10()];
}





// game engine

// battle:
var enemyHP = 100;
var enemyDefenceVal = 2;
var enemyWeaponStr = 2;
var playerHP = 100;
var playerDefenceVal = 4;
var playerWeaponStr = 4;


// attacking
var playerAttack = function(){
  //roll to hit
  if (d10() <= enemyDefenceVal - playerWeaponStr){
    return('Miss!');
  }
  else{
    // how much damage?
    var hit = d10() + playerWeaponStr - enemyDefenceVal;
    if(hit >= enemyHP){
      enemyHP = 0;
      return 'He is dead'
    }
    else{
      enemyHP = enemyHP - hit;
      return('You hit him for:' + hit);
      }
    }
  }

var enemyAttack = function(){
  if (d10() <= playerDefenceVal - enemyWeaponStr){
    return('Miss!');
    }
  else{
    // how much damage?
    var hit = d10() + enemyWeaponStr - playerDefenceVal;
    if(hit > playerHP){
      playerHP = 0;
      return 'you died'
      }
    else{
      playerHP = playerHP - hit;
      return('You got hit for' + hit);
      }
    }
  }

//some onclick functionality to get the battle started:

function choseAttack(){
  if (enemyHP == 0 || playerHP == 0){
    document.getElementById('log').innerHTML = 'Dead people can\'t fight'
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
