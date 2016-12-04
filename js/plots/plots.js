$(function () {
	loadData();
})


function loadData(){
	$.getJSON("https://raw.githubusercontent.com/thangout/thangout.github.io/master/data/yearDistribution.json", function(json) {
		var years =_.values(json.year)
		var count =_.values(json.count)
		drawYearDist(years,count);
	});

	$.getJSON("https://raw.githubusercontent.com/thangout/thangout.github.io/master/data/popularTags.json", function(json) {
		var tags =_.values(json.tag)
		var count =_.values(json.count)
		drawPopularTags(tags,count);
	});

}

//draw bar plot of turbines production
function drawPopularTags(xVal,yVal){
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

	Plotly.newPlot('js-popularTags', data,layout, {displayModeBar: false});
}

//draw scatter plot of park Production
function drawYearDist(xVal,yVal){
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
		title: 'Year'
		},
	yaxis:{
		title: 'Count'
		}
	};

	Plotly.newPlot('js-yearDistribution', data,layoutPark, {displayModeBar: false});
}
