// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Place any jQuery/helper plugins in here.




$(document).ready(function(){
  setTimeout(function(){

     var options = {
         valueNames: ['name', 'conjugation', 'forma', 'ausiliare', 'definizione' ],
         // listObj.alphabet = 'GgAa',
         fuzzySearch: {
           location: 0,
           distance: 20,
           threshold: 0.2,
           multiSearch: true
         },
     };

     var verblist = new List('verb-list', options);

     // verblist.sort('name', {
     //   alphabet: "zahpoiuytnhe" 
     // });


     function updateListForma(){
       var verbform_value = $('#forma').val();
       
       //console.log(verbform_value);
       
       verblist.filter(function (item) {
         var verbform = false;
         
         //console.log(item);
         
         if(verbform_value == "")
         { 
           verbform = true;
         } else {
           verbform = item.values().forma == verbform_value;
         }
         return verbform
       });
       verblist.update();
       //console.log('Filtered: ' + verbform_value);
     }


     function updateListAusiliare(){
       var verbform_value = $('#ausiliare').val();
       
       //console.log(verbform_value);
       
       verblist.filter(function (item) {
         var verbform = false;
         
         //console.log(item);
         
         if(verbform_value == "")
         { 
           verbform = true;
         } else {
           verbform = item.values().ausiliare == verbform_value;
         }
         return verbform
       });
       verblist.update();
       //console.log('Filtered: ' + verbform_value);
     }
  

     $('#forma').change(updateListForma);
     $('#forma').trigger('change');

     $('#ausiliare').change(updateListAusiliare);
     $('#ausiliare').trigger('change');


     verblist.on('updated', function (list) {
       if (list.matchingItems.length > 0) {
         $('.no-result').hide()
       } else {
         $('.no-result').show()
       }
     });    
     
     console.log('pageready');

  },3000);
});
