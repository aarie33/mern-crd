const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const path = require('path');
const config = require('config');
const app = express();

//Body Parser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// connect to Mongo
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

// use routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
	// set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
