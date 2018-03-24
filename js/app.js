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
    console.log('Miss!');
  }
  else{
    console.log('You hit him')
    // how much damage?
    var hit = d10() + playerWeaponStr - enemyDefenceVal;
    enemyHP = enemyHP - hit;
    }
  // is it dead yet?
  if (enemyHP < 1){
    console.log('The enemy has died.')
  }
}

var enemyAttack = function(){
  if (d10() <= playerDefenceVal - enemyWeaponStr){
    console.log('Miss!');
  }
  else{
    console.log('You got hit')
    // how much damage?
    var hit = d10() + enemyWeaponStr - playerDefenceVal;
    playerHP = playerHP - hit;
    }
  // dead yet?
  if (playerHP < 1){
    console.log('Oh noes! You died!!!')
  }
}
