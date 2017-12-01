$(document).ready(function() {
  $('#search-bar').submit(function(event) {
    event.preventDefault();
    window.open('/search/' + $('#shadow').val());
  });
});

// var searchString = $('#shadow');
// console.log('term', searchString.val());
