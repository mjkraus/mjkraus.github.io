"use strict";

(function(){
var beep = new Audio ();
beep.src = "beep-08b.mp3";

$( '#start-btn' ).mousedown(function(){
	findColor();
	$(this).css('background-color','#c59e9e');
});
$( "#start-btn" ).mouseup(function() {
  $(this).css('background-color','#e9baba');
});

var colorArray = ['purple','blue','green','red'];

var colorTiles = [$('img#purple'),$('img#blue'),$('img#green'),$('img#red')];

var newArray = [];

var findColor = function(){
	var color = colorArray[Math.floor(Math.random() * colorArray.length)];
	newArray.push(color);
	console.log(newArray);
	$( '#start-btn' ).off('mousedown');
	loopThroughColors();
}

function loopThroughColors() {
	colorTiles.forEach(function(tile){
		tile.off('click');
	})
	newArray.forEach(function(target, index, arr){
		showColor(target, (index+1), arr);
	});
}

function showColor(target,index,arr){
	setTimeout(function(){
		$('#' + target).css('display','none');
		beep.play();
		setTimeout(function(){
			$('#' + target).css('display','block');
			if (index === arr.length){
				colorTiles.forEach(function(tile,index){
					tile.click(function(){
						setTimeout(function(){
							tile.css('display','none');
							beep.play();
						setTimeout(function(){
								tile.css('display','block');
						},100)
						},100);
						compare(colorArray[index]);
					})
				})
			}
		}, 1000)
	},index * 1500);
}


var x=0;

var rounds = 0
var compare = function(select){
	if(newArray[x] !== select){
		console.log('game over');
		$('#gameOver').css('display', 'block');
		$('#restart-btn').css('display', 'block');
		$('#restart-btn').mousedown(function(){
			$(this).css('background-color','#c59e9e');
		})
		$( "#restart-btn" ).mouseup(function() {
  			$(this).css('background-color','#e9baba')
  			location.reload();
		})
		}else if(newArray[x] === select){
			x++;
			console.log('yay')
				if(x>newArray.length-1){
					findColor();
					x=0;
					rounds++;
					$('div#score p').text(rounds);

				}
    		}
    	}



$(document).ready(function(){


})

})();