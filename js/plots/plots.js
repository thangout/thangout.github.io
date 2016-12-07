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
		 var years = unzipped[0];
		 var sentiment =_.values(unzipped[1])
		 var trace2 = [[1931, 5.5348221644171547], [1932, 5.5197409375887077], [1933, 5.5071017989745163], [1936, 5.533403656636751], [1937, 5.5313740178593509], [1938, 5.5269459030316073], [1939, 5.5315327484977628], [1940, 5.5118064327082887], [1941, 5.5178147613247681], [1944, 5.5150452760306496], [1946, 5.5399345073469553], [1947, 5.5357627484981524], [1948, 5.5513943044199312], [1949, 5.5434923050791802], [1950, 5.5653268364233632], [1951, 5.552327720125283], [1952, 5.5853221283265873], [1953, 5.5972174229214557], [1954, 5.5914782539838042], [1955, 5.6095012532264183], [1956, 5.6102780192732196], [1957, 5.6299276919365955], [1958, 5.6320431599579788], [1959, 5.6390095855940849], [1960, 5.6224950632439894], [1961, 5.6350250564517834], [1962, 5.6201107916796316], [1963, 5.6186802116435501], [1964, 5.6255035829674629], [1965, 5.6179198338377656], [1966, 5.6084641244251845], [1967, 5.5987019537737295], [1968, 5.5959801857421443], [1969, 5.5947872870493223], [1970, 5.6000121587358738], [1971, 5.5937688755710031], [1972, 5.5875863236127374], [1973, 5.5745856893284556], [1974, 5.5583264899203826], [1975, 5.5476683656507495], [1976, 5.5363996184929531], [1977, 5.5273742685205223], [1978, 5.5140373785263987], [1979, 5.5045576275920025], [1980, 5.490044495603879], [1981, 5.4786677624886559], [1982, 5.4757180338024778], [1983, 5.4759547108892361], [1984, 5.4716244475500275], [1985, 5.469131307104985], [1986, 5.4683407474851276], [1987, 5.4652694632059173], [1988, 5.4641201418115211], [1989, 5.4622928018563934], [1990, 5.458896085906459], [1991, 5.4551669644588436], [1992, 5.447545392325833], [1993, 5.4349765063095994], [1994, 5.4280434094819219], [1995, 5.4206272894214109], [1996, 5.4145647931538319], [1997, 5.4093213869995393], [1998, 5.4036365633091377], [1999, 5.3977584541398285], [2000, 5.3934866716009591], [2001, 5.3897596711084113], [2002, 5.3856885025026227], [2003, 5.3857751759711414], [2004, 5.3865246420143915], [2005, 5.3815163463641928]];
		 var unzippedTrace2 = _.unzip(trace2);
		 var years2 = unzippedTrace2[0];
		 var sentiment2 = unzippedTrace2[1];

		 drawDoubleScatterGraph(years,sentiment,years,sentiment2,'Year','Sentiment','js-yearSentiment');
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
	    name: "Sentiment"
	  };
	

	var data2 = {
		x: xVal2,
		y: yVal2,
	    type: 'scatter',
	    name: "Average sentiment"
	  };
	

	var layoutPark = {

	showlegend: true,
	xaxis: {
	  	autotick: false,
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
	  	//autotick: false,
	  	type: 'log',
	  	autorange: true,
		title: xTitle 
		},
	yaxis:{
		type: 'log',
		autorange: true,
		title: yTitle
		}
	};

	Plotly.newPlot(where, data,layoutPark, {displayModeBar: false});
}
