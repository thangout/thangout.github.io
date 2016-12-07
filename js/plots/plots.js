$(function () {
	$(document).ready(function() {
		loadData();
	});
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

	var artists = {	
		"Frank Sinatra":     62,
		"Bruce Springsteen" :    60,
        "The Cure"   :  58,
        "Joan Baez"  :   54,
        "Johnny Cash"  :   54,
		"Neil Diamond"   :  53,
        "Bob Dylan"  :   50,
		"Billie Holiday"  :   50,
		"Willie Nelson"  :  50,
		"Dolly Parton"  :   50
	}
	
	drawBarGraph(_.keys(artists),_.values(artists),'Artist','Count','js-popularArtists');
	
	$.getJSON("https://raw.githubusercontent.com/thangout/thangout.github.io/master/data/avgSent.json", function(json) {
		 var sentiment = _.values(json.y);
		 var years = _.values(json.x);
		 var sentiment2 = _.values(json.mov_y);
		 var years2 = _.values(json.mov_x);
		 drawDoubleScatterGraph(years,sentiment,years2,sentiment2,'Year','Sentiment','js-yearSentiment');
	});

	$.getJSON("https://raw.githubusercontent.com/thangout/thangout.github.io/master/data/degreeDist.json", function(json) {
		 var edges =json[0]
		 var degrees =json[1]
		 drawLogGraph(edges,degrees,'k','Count','js-degreeDistribution');
	});

	$.getJSON("https://raw.githubusercontent.com/thangout/thangout.github.io/master/data/degreeDistTag.json", function(json) {
		 var edges =json[0]
		 var degrees =json[1]
		 drawLogGraph(edges,degrees,'k_in','Count','js-degreeTag');
	});

	
	
	
	
	
}


//draw bar plot 
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
		title: xTitle,
		},
	yaxis:{
		title: yTitle
		}
	};

	Plotly.newPlot(where, data,layout, {displayModeBar: false});
}


//draw scatter plot 
function drawDoubleScatterGraph(xVal,yVal,xVal2,yVal2,xTitle,yTitle,where){
	var data1 = {
		x: xVal,
		y: yVal,
	    type: 'scatter',
	    name: "Per year average sentiment"
	  };
	

	var data2 = {
		x: xVal2,
		y: yVal2,
	    type: 'scatter',
	    name: "10 Year moving average"
	  };
	

	var layoutPark = {
	showlegend: true,
	hovermode:false,
	xaxis: {
	  	autotick: true,
		title: xTitle
		},
	yaxis:{
		title: yTitle
		}
	};

	var data = [data1,data2];

	Plotly.newPlot(where, data,layoutPark, {displayModeBar: false});
}

//draw scatter plot 
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

//draw scatter plot of park Production
function drawLogGraph(xVal,yVal,xTitle,yTitle,where){
	var data = [{
		x: xVal,
		y: yVal,
	    type: 'scatter'
	  }
	]
	var layoutPark = {
	showlegend: false,
	xaxis: {
	  	autotick: false,
	  	type: 'log',
	  	autorange: true,
		title: xTitle,
		titlefont: {
		  family: 'Courier New, monospace',
		  size: 18,
		  color: '#7f7f7f'
		}
		},
	yaxis:{
		type: 'log',
		autorange: true,
		title: yTitle,
		titlefont: {
		  family: 'Courier New, monospace',
		  size: 18,
		  color: '#7f7f7f'
		}
		}
	};

	Plotly.newPlot(where, data,layoutPark, {displayModeBar: false});
}
