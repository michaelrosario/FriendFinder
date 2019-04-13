// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  // asset folder
  app.get("/assets/:type/:file", function(req, res) {
    var type = req.params.type;
    var file = req.params.file;
    res.sendFile(path.join(__dirname, "../public/assets/"+type+"/"+file));
  });

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/survey.html"));
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home.html"));
  });
};
