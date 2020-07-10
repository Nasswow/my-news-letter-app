const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');
const https = require('https');
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

        app.get("/", function(req,res){
          res.sendFile(__dirname+"/signup.html");
        });

        app.post("/", function(req, res){
          const firstName = req.body.firstName;
          const lastName = req.body.lastName;
          const email = req.body.email;
          const data = {
            members: [
              {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName
                }
              }
            ]
          }
          const jsonData = JSON.stringify(data);
          const url = 'https://s10.api.mailchimp.com/3.0/lists/81f34142b2';
          const options = {
            method: "POST",
            auth: "nasser:c1809b811cd81a5b0e190ca404b8077c-us10"
          }
          const request = https.request(url, options, function(response){
            if (res.statusCode === 200){
              res.send("success");
            } else{
              res.send("try again");
            }
            response.on("data", function(data){
              console.log(JSON.parse(data));
            });
          });

          request.write(jsonData);
          request.end();
        });
        // app.post("/failure", function(req,res){
        //   res.redirect("/");
        // })
        app.listen(3000, function(){
          console.log("Server is running on port 3000");
        });

        // api key 
        // c1809b811cd81a5b0e190ca404b8077c-us10
        // list id
        // 81f34142b2