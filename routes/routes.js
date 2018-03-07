
var db = require("../models");

module.exports = function(app) {
	app.get("/", function(req, res) {
		db.burger.findAll({})
		.then(function(dbBurgers) {
			var burgers = [];
			for (var i = 0; i < dbBurgers.length; i++) {
				burgers.push(dbBurgers[i].dataValues);
			}

			var hbsObject = {burgers: burgers};
			console.log("hbs" + hbsObject);
			res.render("index", hbsObject);
		})

	});

	app.post("/api/burgers", function(req, res) {
		db.burger.create({
			burger_name: req.body.name,
			devoured: req.body.devoured
		}).then(function(dbBurger) {
			console.log(dbBurger.id);
			console.log(dbBurger.dataValues);
			res.json(dbBurger.dataValues);
		});
	});

	app.get("/api/burgers", function(req, res) {
		db.burger.findAll({})
		.then(function(dbBurgers) {
			var burgers = [];
			for (var i = 0; i < dbBurgers.length; i++) {
				burgers.push(dbBurgers[i].dataValues);
			}
			res.json(burgers);
		})
	})

	app.get("/api/burgers/:id", function(req, res) {
		db.burger.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(dbBurger) {
			res.json(dbBurger.dataValues);
		})
	})

	app.put("/api/burgers/:id", function(req, res) {
		db.burger.update({
			devoured: req.body.devoured
		}, {
			where: {
				id: req.params.id
			}
		}).then(function(dbBurger) {
			console.log(dbBurger);
			if (!dbBurger){
				res.status(400).end();
			} else {
				res.status(200).end();
			}
		});
	});
};


