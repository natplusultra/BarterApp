$(document).ready(function() {
  $('#search-bar').submit(function(event) {
    event.preventDefault();
    var term = $('#shadow').val();
    doSearch(term);
  });
});

function doSearch(term) {
	$.get("/api/services/search/" + term)
       .done(function(data){
        var markup = '';

        if (data.length == 0) { // if no search results found
        	markup = '<span>No results found.  Sorry about that!</span>';
        } else {
        	// results found
	        // callback when search results returned
	        markup = `${data.map(result => `
			    <div class="col-sm-3">
			      <div class="card">
			        <a href='/product/${result.id}'>
			          <img class="card-img-top" src="${result.image}" alt="Card image cap" width=90%>
			        </a>
			        <div class="card-block">
			          <p class="card-text card-title text-center">
			            <strong>${result.title}</strong>
			          </p>
			          <p class="card-text card-desc">${result.description}</p>
			        </div>
			      </div>
			    </div>
			`)}`;
		}
        // inject markup into the search results container HTML element
		$('#search-results-container').html(markup);
		$('#label-search-term').text(term);
		$('#search-container').show();
		$('#explore-container').hide();
    });	
}


