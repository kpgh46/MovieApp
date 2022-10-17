module.exports.capitalizeFirstLetter = function (string) {
	let text = string
		.toLowerCase()
		.split(" ")
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(" ");

	return text;
};
