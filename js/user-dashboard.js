const app = require("../server.js").app;
const User = require("../model/user");
const UserProfile = require("../model/user.profile");

app.get("/user-dashboard", (req, res) => {
///////// FOR DEBUGGING PURPSOES////////////

  req.isAuthenticated = true;   // Considering the req.isAuthenication variable for authentication check at this point of time.
  req.user = {};
  req.user.email = "abhinav@gmail.com"; 
//////////////////////////////////////////

  if (!req.isAuthenticated) {
    res.render("not_found.ejs");
  } else {
    // Now, we have user-email as the current unique identiifer. So, it will be used to fetch all the user data from  MONGO DB.
    User.findOne({ email: req.user.email }).then((doc) => {
    
      // Searching for the user information in the users table in the mongo DB
      if (doc === null || doc == undefined) {
        // On Error Handler
      } else {
        // DATA that we need to make null for the time being to send to the user
        doc.password = null;
        // If we retrieved the user data from database, we will retrieve data from userprofile.js. Now, considering, the user profile table has email as the unique identifier for each user.
        UserProfile.findOne({ email: req.user.email }).then((profileDoc) => {
          // Currently, using some data for profile doc..
          profileDoc = {};
          profileDoc.bio = "Hi, I am " + doc.username;

          if (profileDoc == null || profileDoc == undefined) {
            // On Error Handler
          } else {
            //If data retrieved from the profile.
           const finalData = Object.assign(doc, profileDoc);  // Merging both data in a single object
           console.log(finalData)
            res.render("userdashboard-view.ejs", {
              user: finalData,
            });
          }
        });
      }

    
    });
  }
});
