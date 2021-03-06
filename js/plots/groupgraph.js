//Constants for the SVG
var width = 1000,
    height = 1000;

//Set up the colour scale
var color = d3.scale.category20();

//Set up the force layout
var force = d3.layout.force()
    .charge(-120)
    .linkDistance(80)
    .size([width, height]);

//Append a SVG to the body of the html page. Assign this SVG as an object to svg
var svg = d3.select(".js-distance").append("svg")
    .attr("width", width)
    .attr("height", height);

//Read the data from the mis element 

d3.json("https://raw.githubusercontent.com/thangout/thangout.github.io/master/data/groups.json", function(error, graph) {
	if (error) throw error;
	//Creates the graph data structure out of the json data
	force.nodes(graph.nodes)
	    .links(graph.links)
	    .start();

	//Create all the line svgs but without locations yet
	var link = svg.selectAll(".link")
	    .data(graph.links)
	    .enter().append("line")
	    .attr("class", "link")
	    .style("stroke-width", function (d) {
	    return Math.sqrt(d.value);
	});

	//Do the same with the circles for the nodes - no 
	//Changed
	var node = svg.selectAll(".node")
	    .data(graph.nodes)
	    .enter().append("g")
	    .attr("class", "node")
	    .call(force.drag);

	node.append("circle")
	    .attr("r", 8)
	    .style("fill", function (d) {
	    return color(d.group);
	})

	node.append("text")
	      .attr("dx", 10)
	      .attr("dy", ".35em")
		  .attr("stroke","black")
		  .attr("stroke-width", 0)
	      .text(function(d) { return d.id });
	//End changed


	//Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
	force.on("tick", function () {
	    link.attr("x1", function (d) {
	        return d.source.x;
	    })
	        .attr("y1", function (d) {
	        return d.source.y;
	    })
	        .attr("x2", function (d) {
	        return d.target.x;
	    })
	        .attr("y2", function (d) {
	        return d.target.y;
	    });

	    //Changed
	    
	    svg.selectAll("circle").attr("cx", function (d) {
	        return d.x;
	    })
	        .attr("cy", function (d) {
	        return d.y;
	    });

	    svg.selectAll("text").attr("x", function (d) {
	        return d.x;
	    })
	        .attr("y", function (d) {
	        return d.y;
	    });
	    
	    //End Changed

	});

});

