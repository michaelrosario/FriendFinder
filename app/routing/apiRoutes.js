// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsArray = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsArray);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware

      var scores = req.body.scores;
      var friendScore = [];
      var matchedFriend = {};
      var currentScore = 0;
      var winningScore = "";
      for(var i = 0; i < friendsArray.length; i++){
        console.log(`Matching ${req.body.name} with ${friendsArray[i].name}`);
        friendScore = friendsArray[i].scores;
        currentScore = 0;
        for(var j = 0; j < friendScore.length; j++){
            currentScore = parseInt(currentScore) + difference(friendScore[j],scores[j]);
        }
        
        if(winningScore == ""){
            winningScore = currentScore;
            matchedFriend = friendsArray[i];
        } else if(winningScore > currentScore){
            console.log(`${friendsArray[i].name} is now matched with ${req.body.name}`);
            winningScore = currentScore;
            matchedFriend = friendsArray[i];
        }
      }
      console.log('User matches with friend with a score of '+ winningScore);
      friendsArray.push(req.body);
      res.json(matchedFriend);

  });

  function difference(num1, num2){
    var numOne = parseInt(num1);
    var numTwo = parseInt(num2);
    if (numOne > numTwo){ 
      return numOne-numTwo
    } else {
      return numTwo-numOne
    }
  }

};