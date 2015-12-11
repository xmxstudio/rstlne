$(document).ready(function(){
//init values 
var isPlaying=false;
var currentWord;
var currentHints;
var invalidEntries = ['x','y','z'];


	//handle user input
	$(window).keypress(function(e){	
		console.log('isplaying: ' + this.isPlaying);

		if(!this.isPlaying){
			init();
			startGame();
			this.isPlaying = true;
		}else{
			if (e.which > 64 && e.which < 90 || e.which > 96 && e.which < 123){
				chooseLetter(String.fromCharCode(e.which), invalidEntries);
			}
		}
	});


	
});





function init(){
	// console.log('init');
	// this.isPlaying=false;
	// this.invalidEntries = 0;
	// $('#currentscore').html('Current Score: ' + $('#currentscore').attr('data-score'));
	// $('#highscore').html('High Score: ' + $('#highscore').attr('data-score'));

}

function startGame(){
	console.log('start game');
	$('#startgamemarquee').fadeOut(1000,function(){
		$('#info').html('starting game').fadeIn(1000,function(){
			startNextRound();		
		});
	})
}

function chooseLetter(e,ie){
	console.log('selected: ' + e);
	if(  $('#' + e.toUpperCase()).hasClass('used')  ){
		//do nothing
	}else{
		var found = false;
		$('.l').each(function(i,v){

			if($(v).attr('data-letter') == e){
				$(v).html(e).removeClass('blank');
				found= true;
			}
		});

		if($('.blank').length == 0 ){
			winGame();
		}

		if(found){
			$('#' + e.toUpperCase()).addClass('found');
		}else{
			 $selection  = $('#' + e.toUpperCase());
			 if($selection.hasClass('used')){
			 	//already selected
			 }else{
			 	$selection.addClass('used');
			 	//check to see if we have lost by counting the number of elements with a used class
			 	if($('#available div.used').length == 6){
			 		loseGame();
			 	}
			 	console.log('checking for win');
			 	
			 	//now check if we won by seeing if each .l item has html content
				// var won = true;
				// $('.l').each(function(i,v){
				// 	console.log('checking win: ' + $(v).attr('data-letter') + " = "  + $(v).html() );
				// 	if($(v).attr('data-letter') != $(v).html() ){
				// 		this.won = false;
				// 	}
				// });
				// if(won){
				// 	winGame();
				// }
			 }			
		}


	}


}
function resetAvailable(){$('#available').append($('<p/>').html('Available').addClass('header'));
for(var i=65; i< 91; i++ ){
	$('#available').append($('<div/>').html(String.fromCharCode(i)).addClass('available').attr('id',String.fromCharCode(i)));
}	}
function startNextRound(){
	


	$.get('http://xmxstudio.com/livecoding/rstlne/',function(data){
		var taco = JSON.parse(data);
		// this.word = taco.word;
		// this.hints = taco.hints;
		currentWord =taco.word.toLowerCase();
		currentHints = taco.hints;
		resetAvailable();
		clearDisplay();
		displayWord();
		
		$('#info').fadeOut();
		$('#hints').append($('<div/>').attr('id','gethint').html('get hint').on('click',function(){showHint();}));
	});
}


function clearDisplay(){
	$('.l').each(function(i,v){
		$(v).remove();
	});
}
function displayWord(){
	$('#display').empty();
	for(var i = 0; i < currentWord.length; i++){
		$('#display').append($('<div/>').addClass('l blank').html(' ').attr('data-letter',currentWord[i]));
	}
}
function showHint(){
	console.log(currentHints[0]);
	$('#hints').prepend($('<div/>').html(currentHints.pop()));

}

function loseGame(){
	$('#available').empty();
	$('#info').html('You suck, you lost.').show();
	$('#hints').empty();
	$('.l').each(function(i,v){
		$(v).html($(v).attr('data-letter')).addClass('lost');
	});	
	$('#startgamemarquee').show();
	isPlaying = false;
	currentHints = [];
	currentWord = null;
}
function winGame(){
	$('#available').empty();
	$('#info').html('You won.').show();
	$('#hints').empty();
	$('.l').each(function(i,v){
		$(v).html($(v).attr('data-letter')).addClass('won');
	});	
	$('#startgamemarquee').show();
	isPlaying = false;
	currentHints = [];
	currentWord = null;
}
