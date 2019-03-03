const express = require ("express");
const hbs = require ("hbs");
const fs =require('fs');
const app =express();

app.use (express.static(__dirname+ "/public"));
hbs.registerPartials(__dirname+ "/views/partials");
hbs.registerHelper("getCurrentYear", ()=> {
  
    return new Date().getFullYear();
})

app.use((req, res, next)=> {
 var now = new Date().toString();
 var log =`${now} ${req.method} ${req.url}`;
 console.log( log);
 fs.appendFile('server.log', log + '\n', (err) =>{
     if (err){
         console.log("Can not append this file");
     }
 })
 next();
})
// app.get ("/", (req, res) =>{
//   // res.send ('<h1>"Hello Server!!!!</h1>');
//   res.send ({
//       name: "Basant", 
//       age: 22, 
//       title: "web developer"
//   })
//})
app.get ("/about", (req, res) =>{
res.render ("about.hbs", {
    pageTitle: "About Page",
 
})
})

app.get ("/", (req, res) =>{
    res.render ("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage:"Hello in homepage",
       
    })
    })
    app.use ((req, res, next) =>{
        res.render ("maintainence.hbs")
        })
    
app.get ("/bad", (req, res) =>{
    res.send ({
        ErrorMessage: "Can not find the requested page"
    })
})
    
app.listen(3000, ()=> {
    console.log("Server is working!!!")
});