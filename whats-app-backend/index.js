const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Pusher = require("pusher");
const cors = require("cors");
const { stringify } = require("querystring");

//app config
const app = express();

//pusher configy

const pusher = new Pusher({
  appId: process.env.APPID,
  key: process.env.KEY,
  secret: process.env.SECERET,
  cluster: "ap2",
  useTLS: true,
});

//middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); //check on google
app.use(cors()); //cors help to connect to front end

//mongo config //create new cluster then go to database access then network access then then in cluster add new application copy url and paste here
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const whatsappSchema = {
  Message: String,
  Name: String,
  time: String,
  recieved: Boolean,
};

const WhatsApp = mongoose.model("whatsapps", whatsappSchema);

const db = mongoose.connection;
// in pusher.com gp and sign in then make a channel
//to get app real time work we used here pusher which will give forntend about the change occured
//first npmi then require here then config through pusher.com guidliness  then here first telling make db as mongoose connection
//db once connected to mongoose then open and run function
db.once("open", () => {
  console.log("db connected");
  const msgCollection = db.collection("whatsapps"); //note here whatsapps purarl form
  const changeStream = msgCollection.watch(); //watch wether change in collection

  changeStream.on("change", (change) => {
    //log(change)             //whenever change occur we will save that to change variable
    if (change.operationType === "insert") {
      //if u will log  chnage u will find it from where operationtype fulldocument and Name message came from
      const messageDetail = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        //pusher.triger(my-channelName, event)   //it came from pusher.com
        Name: messageDetail.Name, //these will show in pusher.com on debug console
        Message: messageDetail.Message,
        time: messageDetail.time,
        recieved: messageDetail.recieved,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

app.get("/", function (req, res) {
  res.send("hello network is satrted");
});

app.get("/message/sync", function (req, res) {
  WhatsApp.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/message/new", function (req, res) {
  const dbmessage = req.body;

  WhatsApp.create(dbmessage, (err, data) => {
    //we have direct created here unlike we use to do req body parser
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
