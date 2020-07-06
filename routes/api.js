const express = require('express');
const router = express.Router();
const Todo = require('../db/model');
console.log("Test");
//Todo: make controllers to separate routes and its methods
router.get('/todos', (req, res, next) => {
	//Return all data; shows id and action field to the client
	Todo.find({}, 'action')
	  .then(data => res.json(data))
	  .catch(next)
});

router.post('/todos', (req, res, next) => {
	if(req.body.action){
		Todo.create(req.body)
		  .then(data => res.json(data))
		  .catch(next)
	}else{
		res.json({
			error: "The input field is empty"
		})
	}
});

router.delete('/todos/:id', (req, res, next) => {
	Todo.findOneAndDelete({"_id": req.params.id})
	  .then(data => res.json(data))
	  .catch(next)
});
module.exports = router;
