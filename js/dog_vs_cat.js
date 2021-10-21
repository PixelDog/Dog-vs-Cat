
jQuery(document).ready(function($) {

  let flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  /**
   * @param json data
   * @param string type
   */
  let getImage = (data, type) => {

    let items = data.items;

    // some flickr users have been taging really crude photos with "dog" or "cat". filter them!!!
    let filterBadTags = ["hot", "candid", "sex", "sexy", "woman", "women", "body", "boobs", "tits", "girl", "breasts", "party", "bikinis", "girls", "voyeur", "ass", "booty", "butt", "censored", "softcore", "middlecore", "hardcore", "nude", "fuck", "explicit", "kiss", "suck", "lick", "nudity", "intense", "erotic", "cleavage", "sensual", "horny", "transparent", "seethrough", "exposed", "nipslip", "orgasm", "exhibitionist", "foreplay", "pussy", "touch"];
    let animals = items.filter(function animal(item) {
      let filterIt = false;
      filterBadTags.forEach( function(tag){
        if(item.tags.includes(tag)){
          filterIt = true;
        }
      });
      return item.tags.includes(type) && !filterIt;
    });
    console.log(animals);

    let randomPicture = returnRandomFromArray(animals);

    $("<p>Tackle the age old question. Dogs vs Cats!</p>" ).appendTo( ".entry-content:first" );
    $("<p><img class = 'vote_image' src = '"+randomPicture.media.m+"'></p>").appendTo( ".entry-content:first" );
    $("<p><div id = 'button_div'><button class = 'vote_button' id='votedogs'>vote dogs</button><button class = 'vote_button' id='votecats'>vote cats</button></div></p>").appendTo( ".entry-content:first" );

    $("#votedogs").click(function(e) {
      e.preventDefault();
      $(this).attr("disabled", true);
      $("#button_div" ).html("Casting vote....");
      $.ajax({
        type: "POST",
        url: dogVsCatAjax.ajax_url,
        data: {
          action: "voteForDogOrCat",
          type: 'dog',
          nonce: dogVsCatAjax.nonce
        },
        success: function(result) {
          getPollResults(result);
        },
        error: function(result) {
          console.log('error casting vote');
        }
      });
    });
    $("#votecats").click(function(e) {
      e.preventDefault();
      $(this).attr("disabled", true);
      $("#button_div" ).html("Casting vote....");
      $.ajax({
        type: "POST",
        url: dogVsCatAjax.ajax_url,
        data: {
          action: "voteForDogOrCat",
          type: 'cat',
          nonce: dogVsCatAjax.nonce
        },
        success: function(result) {
          getPollResults(result);
        },
        error: function(result) {
          console.log('error casting vote');
        }
      });
    });
  };

  /**
   * @param string pollData
   */
  let getPollResults = (pollData) => {
    let pollObject = JSON.parse(pollData);
    let winner = pollObject[0];
    let loser;
    let tie = false;
    pollObject.forEach( function(item, index){
      if (item.count == winner.count){
        tie = true;
        return;
      }
      if(item.count < winner.count){
        tie = false;
        loser = item;
        return;
      }
      if(item.count > winner.count){
        tie = false;
        loser = winner;
        winner = item;
      }
    });
    if(tie){
      $("#button_div" ).html("It's a tie between dogs and cats! " + winner.count + " vote(s) each!");
    } else {
      $("#button_div" ).html( "The " + winner.animal_type + " is in the lead with " + winner.count +" vote(s)! The " +  loser.animal_type +" has "+ loser.count + " vote(s).");
    }
  }

  let type = null;
  let tags = null;
  // filter out nasty tags because some Flickr users are nasty
  switch(Math.round(Math.random())){
    case 0:
    tags = "dog, -cat";
    type = "dog";
    break;
    case 1:
    tags = "cat, -dog";
    type = "cat";
    break;
  }

  let jqxhr = $.getJSON(flickerAPI, {
    tags: tags,
    tagmode: "any",
    format: "json",
    per_page: 100
  })
  .done(function(data) {
    getImage(data, type);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log("error " + textStatus);
    console.log("incoming Text " + jqXHR.responseText);
  })
  .always(function(data) {
    console.log("json complete");
  });

  let returnRandomFromArray = (array) => {
    return array[Math.floor(Math.random()*array.length)];
  }

});
