// setting up some data




// Simple die roller

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
  return roomtypes[d10()];
}
