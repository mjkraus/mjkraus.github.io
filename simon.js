"use strict";
$(document).ready(function(){

var beep = new Audio (); // found simple tutorial about audio on 
beep.src = "beep-08b.mp3";

//click function for start button runs findColor();
$( '#start-btn' ).mousedown(function(){
	findColor();
	$(this).css('background-color','#c59e9e');
});
$( "#start-btn" ).mouseup(function() {
  $(this).css('background-color','#e9baba');
});

// arrays of color choices, game piece tiles, and empty array for random sequence of tiles
var colorArray = ['purple','blue','green','red'];

var colorTiles = [$('.purple'),$('.blue'),$('.green'),$('.red')];

var newArray = [];

// chooses random color from the four tile choices
var findColor = function(){
	var color = colorArray[Math.floor(Math.random() * colorArray.length)];
	newArray.push(color);
	$( '#start-btn' ).off('mousedown'); //turns off start button
	loopThroughColors();
}

// function loop through array of random colors. Calls showColor
function loopThroughColors() {
	colorTiles.forEach(function(tile){ // turns off click function for tiles
		tile.off('click');
	})
	newArray.forEach(function(target, index, arr){
		showColor(target, (index+1), arr);
	});
}

//showColor changes the opacity of the color tiles. The timer delays the elements in the .forEach from 
//looping through too quickly. Outside timer is 500 milliseconds behind to allow delay between elements 
//displaying. Add one to index number and multiply by 1500 milliseconds, so specific element runs at correct
//timing. Ex: Index 1 runs at 1500 milliseconds. Index 2 runs at 3000 milliseconds.  


function showColor(target,index,arr){ 
	setTimeout(function(){
		$('.' + target).css('opacity', '0.5');
		// beep function
		beep.play();
		setTimeout(function(){
			$('.' + target).css('opacity','1');
			if (index === arr.length){
				colorTiles.forEach(function(tile,index){ //turn click function on add beep and display and hide tiles.
					tile.click(function(){			//delay on click as well in order to display and hide pieces.
						setTimeout(function(){
							tile.css('opacity','0.5');
							beep.play();
						setTimeout(function(){
							tile.css('opacity','1');
						},100)
						},100);
						compare(colorArray[index]); //each click calls compare function. Adds string of 
										//color value that corresponds to piece that was clicked
					})
				})
			}
		}, 1000)
	},index * 1500);
}

var x=0;

var rounds = 0
//compares click to randomly generated color array.
var compare = function(select){ 
	if(newArray[x] !== select){
		$('#gameOver').css('display', 'block'); //if not === then game over and reset button appear change color on click
		$('#restart-btn').css('display', 'block'); //refreshes page when reset is clicked
		$('#restart-btn').mousedown(function(){
			$(this).css('background-color','#c59e9e');
		})
		$( "#restart-btn" ).mouseup(function() {
  			$(this).css('background-color','#e9baba')
  			location.reload();
		})
		}else if(newArray[x] === select){ //if correct then compares next click and element in newArray
			x++;
				if(x>newArray.length-1){ //checks the length of the array to compare amount of elements to clicks. 
					findColor();		//if correct, then continues to next round, resets x and calls findColor to 
					x=0;		//push new randomly choosen color into array
					rounds++;
					$('div#score').text(rounds);

				}
    		}
    	}

})();