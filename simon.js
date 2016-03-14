"use strict";

(function(){
var beep = new Audio (); // found simple tutorial about audio on 
beep.src = "beep-08b.mp3";

$( '#start-btn' ).mousedown(function(){ //mouse down, mouse up function to change and run findColor();
	findColor();
	$(this).css('background-color','#c59e9e');
});
$( "#start-btn" ).mouseup(function() {
  $(this).css('background-color','#e9baba');
});


// var startButton = $( '#start-btn' ); //use this click function twice on two different buttons. I wrote a function so I could repeat the click
// var resetButton = $( "#restart-btn" ); //need to pass different start and reset functions, at different times, so not sure how to call these	

// var clickButton = function(button){
// 	(button).mousedown(function(){
// 	$(this).css('background-color','#c59e9e');
// 	});
// 	$(button).mouseup(function() {
//    	$(this).css('background-color','#e9baba');
//  });
// }
// clickButton(startButton);

var colorArray = ['purple','blue','green','red'];

var colorTiles = [$('.purple'),$('.blue'),$('.green'),$('.red')];

var newArray = [];

var findColor = function(){
	var color = colorArray[Math.floor(Math.random() * colorArray.length)];
	newArray.push(color);
	$( '#start-btn' ).off('mousedown'); //turn off my start button when function begins, so it cannot be pushed
	loopThroughColors();				//again and reactivated. 
}

function loopThroughColors() {
	colorTiles.forEach(function(tile){ // turns off click button for simon game pieces
		tile.off('click');
	})
	newArray.forEach(function(target, index, arr){ //function loops through the array of random colors. It calls 
		showColor(target, (index+1), arr);			//showColor to run. 
	});
}

//showColor displays and hides game pieces. On timer to delay the elements in the .forEach from 
//looping through too quickly. Outside timer is 500 milliseconds behind to allow delay between elements 
//displaying. Add one to index number and multiply by 1500 milliseconds, so specific element runs at correct
//timing. Ex: Index 1 runs at 1500 milliseconds. Index 2 runs at 3000 milliseconds.  


function showColor(target,index,arr){ 
	setTimeout(function(){				
		$('#' + target).css('display','none');
		beep.play();				//added beep function
		setTimeout(function(){
			$('#' + target).css('display','block');
			if (index === arr.length){
				colorTiles.forEach(function(tile,index){ //turn click function on add beep and display and hide game pieces.
					tile.click(function(){			//delay on click as well in order to display and hide pieces.
						setTimeout(function(){
							tile.css('display','none');
							beep.play();	//added beep function
						setTimeout(function(){
								tile.css('display','block');
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
var compare = function(select){	//compares click to randomly generated color array. 
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
					$('div#score p').text(rounds);

				}
    		}
    	}



$(document).ready(function(){


})

})();