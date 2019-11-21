const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require('html-pdf');
inquirer
   .prompt([
       {
        message: "what is your favorite color?",
        name: "color"
       },
       {
        message: "Enter your GitHub username?",
        name: "username"
       },
   ]).then(function ({ username, color }) {
       const queryUrl = `https://api.github.com/users/${username}`;
       axios.get(queryUrl).then(function (res) {
           const name = res.data.name;
           const profImage = res.data.avatar_url;
           const login = res.data.login;
           const gitHub = res.data.html_url;
           const linkedIn = res.data.blog;
           const location = res.data.location;
           const bio = res.data.bio;
           const repos = res.data.public_repos;
           const followers = res.data.followers;
           const following = res.data.following;
           const queryUrl2 = `https://api.github.com/users/${username}/starred`;
           axios.get(queryUrl2).then(function (res) {
               const starredRepos = res.data.length
function generateHTML() {
                   return `
           <!DOCTYPE html>
           <html lang="en">
           <head>
               <meta charset="UTF-8">
               <meta http-equiv="X-UA-Compatible" content="ie=edge">
               <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
               <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
       integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
               <title>Document</title>
           </head>
           <body>
               <div class="jumbotron jumbotron-fluid" style="background-color:${color};margin:0;height:100%">
               <div class="container">
               <img src="${profImage}" alt="GitHub Profile Picture" height="250" width="250" style="border-radius:50%" display="block";>
               <h4 class="display-4" style="margin-top:20px;">Hi! My name is ${name}</h4>
               <button type="button" class="btn btn-secondary btn-lg">@${login}</button>
               <h6 class="lead" style="margin-top:40px">${bio}</h6>
               <i class="fas fa-map-marker-alt"></i> ${location} 
               <a href=${gitHub} style="margin:10px" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true"><i class="fab fa-github fa-2x"></i></a>
               <a href=https://${linkedIn} class="btn btn-secondary btn-lg active" role="button" aria-pressed="true"><i class="fas fa-blog fa-2x"></i></a>
               <div class="public-repos">
                   <h6 class="public-repos">Public Repositories</h6>
                    <p class="text" style="font-size: 24px"> ${repos}</p>
               </div>
               <div class="followers">
                    <h6 class="followers">Followers</h6>
                    <p class="text" style="font-size: 24px">${followers}</p>
               </div>
               <div class="following">
                    <h6 class="following">Following</h6>
                    <p class="text" style="font-size: 24px">${following}</p>
               </div>
               <div class="starred-repos">
                    <h6 class="github-stars">GitHub Stars</h6>
                    <p class="text" style="font-size: 24px">${starredRepos}</p>
               </div>
           </body>
           </html>`;
               }
               const html = generateHTML();
               fs.writeFile("index.html", html, function (err) {
                   if (err) {
                       throw err;
                   }
               });
               const options = { width: "24in", height: "16.65in", orientation: "landscape" };
               pdf.create(html, options).toFile("index.pdf", function (err, res) {
                   if (err) return console.log(err);
                   console.log(res);
               });
           });
       });
   });
