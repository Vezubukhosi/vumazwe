let express = require("express");
let app = express();

//global variables

let wattage = 0;
let client_command = 0;
let state = 0;

app.get("/station/command",(req,res)=>{
   res.status(200);
   //set command depending on value from client
   state = req.query["state"];
   if(state!=client_command){
    let code = 200+client_command;
   // console.log(code);
   res.status(code).json({"command":client_command});
   }
   else{
       res.status(401).send("No need to reset");
   }
  // console.log("Station Command:"+state);
   
});
app.get("/station/data",(req,res)=>{
    state = req.query["state"];
    wattage =(state!=0)?parseFloat(req.query["wattage"]):0.00;
    res.status(200).send("Wattage Set");
   // console.log("The Wattage from station is :"+wattage);
});

app.get("/",(req,res)=>{
    res.send("Hello");
   // console.log("Home hit\n");
});

/*Set Client(Mobile App routes) */

app.get("/client/wattage",(req,res)=>{
    res.status(200).json({"wattage":wattage,"state":state});
    //console.log("wattage: "+wattage);
});

app.get("/client/command",(req,res)=>{

    client_command=parseInt(req.query["command"]);
    
    res.status(200).json({"state":state});
    //console.log("Command is sent"+client_command);
});

app.listen(process.env.PORT);
//app.listen(80,"");