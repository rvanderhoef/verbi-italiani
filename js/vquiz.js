$(document).ready(function(){

    // var correct = 0;
    // var total = 0;
 
    function nextItem() {
      var rand =  Math.ceil(Math.random() *( jQuery('.list li').length + 1));
      var next = $('.list li').get(rand);
      $( ".overlay-inner" ).html(next);
    };

    $('.rand').on("click", function(){
        $( ".test-overlay" ).toggleClass( "active" );
        nextItem();
    });

    $('.quiz').on("click", function(){
        $( ".test-overlay" ).toggleClass( "active" );
        $( ".test-overlay" ).toggleClass( "quiz" );
        nextItem();
        activateTest();
    });

    // function activateTest() {
    //   var theDefinizione = $('.overlay-inner .definizione').html();
    //   console.log(theDefinizione);   
    // };



    $( "form.test" ).submit(function( e ) {
      if ( $( "input.testin" ).val() === "correct" ) {
        $( "span.testin" ).text( "Validated..." ).show();
        e.preventDefault();
      } else {
     
      $( "span.testin" ).text( "Not valid!" ).show().fadeOut( 1000 );
        e.preventDefault();
        };
    }); 

      var q = 1,
      qMax = 0;

    function resetConjCount() {
      var q = 1,
      qMax = 0;
      console.log('reset count');
    };
    resetConjCount();


    function activateTest() {

      // resetConjCount();

      var theDefinizione = $('.overlay-inner .definizione').html();
      console.log(theDefinizione); 

      $('.overlay-inner .def').select();
      $( '.overlay-inner .quiztest' ).submit(function( e ) {
        
        $('#total').html(function(i, val) { return +val+1 });

        if ( $( '.overlay-inner .def' ).val() === theDefinizione ) {
          //correct 
          $( '.overlay-inner' ).addClass( 'correct' );
            setTimeout(function(){
              $('.overlay-inner').removeClass( 'correct' );
              $('.definition.quiztest').addClass('hide');
              $('#correct').html(function(i, val) { return +val+1 });
              // start the next item

              startPresetTenseQuiz();
              //nextItem();
              //activateTest();
            },1000);

          } else {
          $( '.overlay-inner .def' ).addClass( 'wrong-answer' );
        };
        e.preventDefault();
      });
    };


    // begin present tense quiz 

    function startPresetTenseQuiz() {

        $('.test-overlay.quiz .conjugations').addClass('show');
        qMax = $('#aOver #present .conj').length;
        console.log(q);
        console.log(qMax);
        $('#aOver #present .conj').hide();
        $('#aOver #present .conj:nth-child(1)').show();

        var answer = $('#aOver #present .conj:nth-child(' + q + ')').data("answer");
        console.log(answer);

        var subject = $('#aOver #present .conj:nth-child(' + q + ')').data("subject");
        console.log(subject);

        $('#aOver #present .conj span').html(subject);
        $('#aOver #present .conj:nth-child(' + q + ') .verbquiz input').select();

        $('#aOver #present .conj:nth-child(' + q + ') .verbquiz').submit(function( e ) {

            $('#total').html(function(i, val) { return +val+1 });

            if ($(this).find('input').val() === answer) {
                $('#correct').html(function(i, val) { return +val+1 });
                handleClick();
            } else {
                $(this).addClass( "wrong-answer" );
            }
            e.preventDefault();
        });
    };
    function handleClick() {
        if (q < qMax) {
            $('#aOver #present .conj:nth-child(' + q + ')').hide();
            $('#aOver #present .conj:nth-child(' + (q + 1) + ')').show();
            
            var answer = $('#aOver #present .conj:nth-child(' + (q + 1) +')').data("answer");
            console.log(answer);

            var subject = $('#aOver #present .conj:nth-child(' + (q + 1) +')').data("subject");
            console.log(subject);

            $('#aOver #present .conj span').html(subject);
            $('#aOver #present .conj:nth-child(' + (q + 1) +') .verbquiz input').select();

            $('#aOver #present .conj:nth-child(' + (q + 1) + ') .verbquiz').submit(function( e ) {

                $('#total').html(function(i, val) { return +val+1 });

                if ($(this).find('input').val() === answer) {              
                    $('#correct').html(function(i, val) { return +val+1 });                  
                    handleClick();
                    return false
                } else {
                    $(this).addClass( "wrong-answer" );
                }
                e.preventDefault();
            });

            if (q == (qMax - 1)) {
              console.log('finished');
            }
            q++;
            console.log(q);
            console.log(qMax);
        } else {            
          $( '.overlay-inner' ).addClass( 'correct' );
              console.log('conj correct');
              // var q = 1,
              // qMax = 0;
              // console.log(q);
              // console.log(qMax);
            setTimeout(function(){
              $('.overlay-inner').removeClass( 'correct' );
              $('.definition.quiztest').removeClass('hide');
              // start the next item
              nextItem();
              activateTest();
            },1000);
               // Add code to submit your form
        }
    };






    $('.close').on("click", function(){
        $('.definition.quiztest').removeClass('hide');
        $( ".test-overlay" ).removeClass( "active" );
        setTimeout(function(){
          $( ".test-overlay" ).removeClass( "quiz" );
        },600);
    });

    $('.next').on("click", function(){
      $('.definition.quiztest').removeClass('hide');
      $( ".overlay-inner" ).removeClass( "correct" );        
      nextItem();
    });


});