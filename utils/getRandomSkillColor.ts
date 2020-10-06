const colors = [
	"#007bff",
	"#6c757d",
	"#28a745",
	"#dc3545",
	"#ffc107",
	"#17a2b8",
	"#343a40",
];

let lastColor = null;

export const getSkillColor = () => {
	if (lastColor && colors.indexOf(lastColor) + 1 !== colors.length) {
		const color = colors[colors.indexOf(lastColor) + 1];
		lastColor = color;
		return color;
	} else {
		const color = colors[0];
		lastColor = color;
		return color;
	}
};
