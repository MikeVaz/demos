const themes = {
	'react': {
		borderColor: "rgb(0, 0, 192)",
		backgroundColor: "rgba(0, 0, 192, 0.5)"
	},
	'@angular/core': {
		borderColor: "rgb(192, 0, 0)",
		backgroundColor: "rgba(192, 0, 0, 0.5)"
	},
	'jquery': {
		borderColor: "rgb(0, 192, 0)",
		backgroundColor: "rgba(0, 192, 0, 0.5)"
	}
};


function mapData(data) {
	var theme = themes[data.package] || {
		borderColor: "rgb(192, 192, 192)",
		backgroundColor: "rgba(192, 192, 192, 0.5)"
	};

	return {
		label: data.package,
		borderColor: theme.borderColor,
		backgroundColor: theme.backgroundColor,
		data: data.downloads.map((record) => {
			return {x: record.day, y: record.downloads}
		})
	};
}
function chart(container, data) {

	var ctx = container.getContext('2d');
	var chart = new window.Chart(ctx, {
		type: 'line',

		// The data for our dataset
		data: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			datasets: data
		}
	});	
	
}

export {chart, mapData}