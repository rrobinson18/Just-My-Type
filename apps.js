$(document).ready(function() {



 $('#keyboard-upper-container').hide();


    $(document).keydown(function(event) {
      if  (event.which === 16) {
            $('#keyboard-lower-container').hide();
            $('#keyboard-upper-container').show();
        };
    });
    $(document).keyup(function(event) {
       if (event.which === 16) {
            $('#keyboard-lower-container').show();
            $('#keyboard-upper-container').hide();
        };
    });

    $(document).keypress(function(event) {
       let keypress = event.which;
       $('#' + keypress).addClass('highlight');
       $('#yellow-block').animate({left: '+=17.5px'}, {duration: 1, easing: 'linear'});
    });

    
    let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate', 
    'Too ato too nOt enot one totA not anot tOO aNot', 
    'oat itain oat tain nate eate tea anne inant nean', 
    'itant eate anot eat nato inate eat anot tain eat', 
    'nee ene ate ite tent tiet ent ine ene ete ene ate'
];

let i = 0;
let l = 0;
let words = 0
let wordsPerMin = 0;
let moveBlock = 10;
let numberOfMistakes = 0;
let startTime = new Date();
let startMin = startTime.getMinutes();


$('#sentence').text(sentences[i]);
$('#target-letter').text(`${sentences[i][l]}`);

function calAccuracy() {
    let endTime = new Date();
    let endMin = endTime.getMinutes();
    let minutes = startMin - endMin;
    words = 54 / minutes -2 * numberOfMistakes;
    wordsPerMin = Math.abs(words);
};

$(document).keypress(function(event) {
    calAccuracy();

    if (i === 4 && l === 48) {
        $('#feedback').text('');
        $('target-letter').text('Game Over!');
        let aboutWords = `Your words per minute ${wordsPerMin}!`

        if (wordsPerMin <= 50) {

            $('#target-letter').append(`<div class="endResult">${aboutWords}<br>Darn. What happened?</div>`);

        } else if (wordsPerMin > 50 && wordsPerMin <= 75) {
            
            $('#target-letter').append(`<div class="endResult">${aboutWords}<br>So close. Keep up the good word!</div>`);
            
        } else if (wordsPerMin < 99 ) {

            $('#target-letter').append(`<div class="endResult">${aboutWords}<br>Look At That! You Are A Beast At This!!!!`);
        };

        $('.endResult').css({'font-size': '20px'});

        
      $('#32').after('<div class="playAgain">Play Again?</div>');
      $('.playAgain').css('font-size', "30px");
      $('.playAgain').after('<button class="round2">Sure, Why Not!</button>');
      $('.round2').after('<button class="loser">Nope, I\'m good.</button>');
      $('button').css({
        'margin': '10px',
        'padding': '10px'
      });

      $('.round2').on('click', function () {

        alert("Get ready!!");
        location.reload()
      });
      $('.loser').on('click', function () {

        alert('Byyyyeeeeee');

      });

      $(document).off();

    } else {

      $('#feedback').css({
        'display': 'flex',
        'flex-wrap': 'wrap'
      });

      if (event.which === sentences[i][l].charCodeAt()) {

        $('#yellow-block').css('margin-left', `${moveBlock}px`);
        moveBlock += 17;
        l++;
        $('#feedback').append('<div class="correct">✓</div>');
        $('.correct').css('color', 'green');

        if (l === (sentences[i].length - 1)) {
            moveBlock = 0;
        };

        if (l === sentences[i].length) {

            $('#feedback').text('');
            i++
            $('#sentence').text(sentences[i]);
            l = 0
        };

        if (sentences[i][l].charCodeAt() === 32) {

            $('#target-letter').text('[space]');
    
        } else {

            $('#target-letter').text(`${sentences[i][l]}`);
        };

      } else {
          $('#feedback').append('<div class="incorrect">X</div>');
          $('.incorrect').css('color', 'red');
          numberOfMistakes++;
      };

    };
});

});