$(function() {
	$(".create-form").on("submit", function(event) {
		event.preventDefault();
		var newBurger = {
			name: $("#burger").val().trim(),
			devoured: 0
		};

		$.ajax("/api/burgers", {
			type: "POST",
			data: newBurger
		}).then(function() {
			console.log("added new burger");
			location.reload();
		});
	});

	$(".devoured").on("click", function(event) {
		var id = $(this).data("id");
		var devour = $(this).data("devour");

		var newDevour = {
			devoured: 1
		};

		// console.log("hello");

		$.ajax("/api/burgers/" + id, {
			type: "PUT",
			data: newDevour
		}).then(function() {
			console.log("devoured");
			location.reload();
		});

		console.log('after');
	});
})