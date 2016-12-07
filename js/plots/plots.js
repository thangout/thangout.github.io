$(function () {
	loadData();
})


function loadData(){
	$.getJSON("https://raw.githubusercontent.com/thangout/thangout.github.io/master/data/yearDistribution.json", function(json) {
		var years =_.values(json.year)
		var count =_.values(json.count)
		drawScatterGraph(years,count,'Year','Count','js-yearDistribution');
	});

	$.getJSON("https://raw.githubusercontent.com/thangout/thangout.github.io/master/data/popularTags.json", function(json) {
		var tags =_.values(json.tag)
		var count =_.values(json.count)
		drawBarGraph(tags,count,'Tag','Count','js-popularTags');
	});

	$.getJSON("https://raw.githubusercontent.com/thangout/thangout.github.io/master/data/avgSent.json", function(json) {
		var unzipped = _.unzip(json); 
		 var years =_.values(unzipped[0])
		 var sentiment =_.values(unzipped[1])
		 drawScatterGraph(years,sentiment,'Year','Sentiment','js-yearSentiment');
	});
}

//draw bar plot of turbines production
function drawBarGraph(xVal,yVal,xTitle,yTitle,where){
	//Turbine production
	d3 = Plotly.d3;
	var data = [
	  {
	    x: xVal, 
	    y: yVal, 
	    type: 'bar'
	  }
	];

	var layout = {
	showlegend: false,
	xaxis:{
		autotick: false,
		type: 'category',
		title: 'Tag',
		},
	yaxis:{
		title: 'Count'
		}
	};

	Plotly.newPlot(where, data,layout, {displayModeBar: false});
}

//draw scatter plot of park Production
function drawScatterGraph(xVal,yVal,xTitle,yTitle,where){
	var data = [{
		x: xVal,
		y: yVal,
	    type: 'scatter'
	  }
	]

	var layoutPark = {
	showlegend: false,
	xaxis: {
	  	//autotick: false,
		title: xTitle 
		},
	yaxis:{
		title: yTitle
		}
	};

	Plotly.newPlot(where, data,layoutPark, {displayModeBar: false});
}
