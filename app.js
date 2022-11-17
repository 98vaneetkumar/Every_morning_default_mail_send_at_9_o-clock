require("dotenv").config();
const app=require("express")()
const cron = require("node-cron");
const bodyParser = require("body-parser");


// cron.schedule("*/5 * * * * *", function() {
//     console.log("running a task every 10 second");
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./config/connectionDB").connect();
require("./config/connectionDB").syn();
//Due to this table is create at database but not use it not table create
require("./Models/index");
app.get("/",(req,res)=>{
     res.send("Home page")
})

const user= require("./routes/userRouter")

app.use("/user",user)

app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
})