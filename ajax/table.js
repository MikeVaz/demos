function renderString(container, records) {
	container.innerHTML = JSON.stringify(records);
}

// Transform data from [{userId: 1, albumId:1}] to [{name: 1, y: 10}] to aggregate number of albums per user
function mapData(data) {
	var users = [];
	var albums = {};
	data.forEach(function(record, value) {
		albums[record.userId] = albums[~~record.userId] || 0;
		albums[record.userId]++;
	});

	for (key in albums) {
		users.push({name: key, y: albums[key]});
	}
	return users;
}

function renderRows(data) {
	return data.reduce(function(html, record) {
		html = html || '';
		html += `<tr>`
		return html;
	})
}

function renderTable(el, data) {
	el.innerHTML = `<table border="1"><th>User</th><th>Albums</th></tr>
		${data.reduce(function(html, record) {
			html = html || '';
			html += `<tr><td>${record.name}</td><td>${record.y}</td></tr>`;
			return html;
		}, {})}
	</table>`;
}

function renderChart(container, data) {
	Highcharts.chart(container, {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'Albums by user'
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Albums',
			colorByPoint: true,
			data: mapData(data),
		}]
	});
}