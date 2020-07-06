/*Import project dependencies*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/api');

/*Initialize Express server*/
const app = express();

/*Call body-parser and cors middleware*/
var corsOptions = {
	origin: 'http://localhost:4000'
};
app.use(cors(corsOptions));
app.use(bodyParser.json()); //Parse request of content type - application/json
app.use(bodyParser.urlencoded({extended: true})); 

/*Initialize database*/
const db = require('./db/server.js');
db.mongoose
  .connect(db.url, {
	  useNewUrlParser: true,
	  useUnifiedTopology: true
  })
  .then(() => {
	  console.log("Connected to the database!");
  })
  .catch(err => {
	  console.log("Cannot connect to the database!", err);
	  process.exit();
  });

/*Initialize routes for API*/
app.use('/api', routes);

/*Create default route*/
app.get('/', (req, res) => {
	res.json({message: "Welcome to REST API"});
});

/*Set PORT and listen for request*/
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});


