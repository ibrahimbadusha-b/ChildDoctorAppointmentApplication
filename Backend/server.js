const express = require('express');
const app = express();

const path = require("path");
const dotenv = require("dotenv");
const databaseConnection = require('./config/Dbconnection');
const User = require("./routes/UserRoute");
const cors = require("cors");
const PORT = process.env.PORT || 2000;

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

databaseConnection();
app.use(express.json())
app.use(cors())

app.use('/demo',(req,res,next)=>{
      res.send(<h1>Hello Mapla</h1>)
})

app.use('/api/users', User);
app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server Created SuceessFully ${process.env.PORT}`);

})
