/*global define */
define(['d3'], function (d3) {
    'use strict';

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
	    padding = {top: 60, right: 60, bottom: 60, left: 60},
	    outerWidth = 1100,
	    outerHeight = 700,
	    innerWidth = outerWidth - margin.left - margin.right,
	    innerHeight = outerHeight - margin.top - margin.bottom,
	    width = innerWidth - padding.left - padding.right,
	    height = innerHeight - padding.top - padding.bottom;

	var svg = d3.select("#container")
	    .attr("width", outerWidth)
	    .attr("height", outerHeight)
	  	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	
	var eyeBorderColors = d3.scale.ordinal().domain([0,1]).range(colorbrewer.Accent[8]);
	var faceColors = d3.scale.ordinal().domain([0,1]).range(colorbrewer.Dark2[8]);



	// var eye = svg.append("g")
	// 	.attr("transform", "translate(-15,-5),rotate(30),scale(2,2),skewX(4)")

	// eye.append('ellipse')
	// 	.attr('cx', 0)
	// 	.attr('cy', 0)
	// 	.attr('rx', 30)
	// 	.attr('ry', 10)
	// 	.attr('stroke', "#000000")
	// 	.attr('fill', "#fff")


	var eye = svg.append("g")
		.attr("transform", "translate(30,50)")
	var eye2 = svg.append("g")
		.attr("transform", "translate(125,50),scale(-1,1)")
	var nose = svg.append("g")
		.attr("transform", "translate(75,100),scale(2,1)")
	var mouth = svg.append("g")
		.attr("transform", "translate(65,150),scale(5,5)")

	var eyes = [
		[ {"x":0, "y":5},
			{"x":20, "y":0},
			{"x":20, "y":10},
			{"x":0, "y":5}
		],
		[ {"x":0, "y":0},
			{"x":20, "y":0},
			{"x":20, "y":15},
			{"x":0, "y":10},
			{"x":0, "y":0}
		],
		[ {"x":0, "y":0},
			{"x":20, "y":0},
			{"x":20, "y":10},
			{"x":0, "y":10},
			{"x":0, "y":0}
		],
		[ {"x":5, "y":0},
			{"x":10, "y":10},
			{"x":0, "y":10},
			{"x":0, "y":5}
		]
		];
	var noses = [[ {"x":5, "y":0},
			{"x":10, "y":10},
			{"x":0, "y":10},
			{"x":0, "y":5}
		]];

	var mouths = [[{"x":0, "y":0},{"x":5, "y":0}]];

	var eyeSize;
	var noseSize;

	var json = d3.json("veg1.json", function(data) {
	  var avgs=d3.nest()
	      .key(function(d) {return d.postal_code;})
	      .sortKeys(d3.ascending)
	      .rollup(function(d) {
	        return {
	          rating:d3.mean(d,function(g) {return +g.weighted_rating;}),
	          rating_count:d3.mean(d,function(g) {return +g.rating_count})
	        };
	      })
	      .entries(data.entries);

	      eyeSize = d3.scale.linear()
	      	.domain( [1, 5])
	      	.range([1,3]);

	      noseSize = d3.scale.linear()
	      	.domain( [1, 5])
	      	.range([2,5]);


	      var xcor = -200;
	      var ycor = 0;
	    //avgs = avgs.splice(2, avgs.length)
	  
	    for(var i=0; i < avgs.length; i++){
	    	xcor += 200
	    	if(xcor > 900){
	    		xcor = 0;
	    		ycor += 300;
	    	}
	    	
	    	drawFace(avgs[i], xcor,ycor);
	    }

	});




	function drawFace(data, x, y){

		var g = svg.append("g")
			.attr("class", "face")
			.attr("transform", "translate(" + x + "," + y + " )");

		var face = g.append("use").attr("xlink:href","#face")
			.attr("fill", faceColors(Math.floor(Math.random() * 9)) )

		//var interpolation = d3.scale.linear().domain([min, max]).range(["cardinal-closed", "linear-closed", "basis-closed"]);
		var primaryColor = eyeBorderColors(Math.floor(Math.random() * 9));
  		var secondaryColor = eyeBorderColors(Math.floor(Math.random() * 9));

		//eyes
		var shapeFunction = d3.svg.line()
		    .x(function(d) { return d.x; })
		    .y(function(d) { return d.y; })
		    //.interpolate(interpolation(data.?));
		    .interpolate("basis-closed");

		    console.log((+data.values.rating>0) ? +data.values.rating : 1 )
		    var es = eyeSize((+data.values.rating>0) ? +data.values.rating : 1)
		    var ns = noseSize((+data.values.rating>0) ? +data.values.rating : 1)
		    console.log(es)

		    var stroke_width = Math.random() * 3;

		    var eyeType = Math.floor(Math.random() * 3);

		var eyeLeft = g.append("g").attr("transform", "translate(30,50),scale("+ es +","+ es +")")
			.append("path")
			.attr("d", shapeFunction(eyes[eyeType]))
		    .attr("stroke", primaryColor )
		    .attr("fill", secondaryColor )
		    .attr("stroke-width", stroke_width);

		var eyeRight = g.append("g").attr("transform", "translate(125,50),scale("+ es* -1 +","+ es +")")
			.append("path")
			.attr("d", shapeFunction(eyes[eyeType]))
		    .attr("stroke", primaryColor )
		    .attr("fill", secondaryColor )
		    .attr("stroke-width", stroke_width);

		var nose = g.append("g").attr("transform", "translate(100,100),scale("+ ns* -1 +","+ ns +")")
			.append("path")
			.attr("d", shapeFunction(noses[0]))
		    .attr("stroke", primaryColor )
		    .attr("fill", secondaryColor )
		    .attr("stroke-width", stroke_width);

		var mouth = g.append("g").attr("transform", "translate(55,150),scale(10,5)")
			.append("path")
			.attr("d", shapeFunction(mouths[0]))
		    .attr("stroke", primaryColor )
		    .attr("fill", secondaryColor )
		    .attr("stroke-width", stroke_width);

		var t = g.append("text")
			.text(data.key)

	}



//  //This is the accessor function we talked about above
//  var lineFunction = d3.svg.line()
// 	.x(function(d) { return d.x; })
// 	.y(function(d) { return d.y; })
// 	.interpolate("cardinal-closed");

// //The line SVG Path we draw
// var lineGraph = eye.append("path")
// 	.attr("d", lineFunction(mouth[0]))
// 	.attr("stroke", "blue")
// 	.attr("stroke-width", 2)
// 	.attr("fill", "none");
var sampleData = [
  [1,3,5,7], 
  [2,4,6,8]
];

// draw(nose, noses, sampleData, 0,3);
// draw(eye, eyes, sampleData, 1,2);
// draw(eye2, eyes, sampleData, 1,2);
// draw(mouth, mouthes, sampleData, 0,0);

function draw(svg, shapeData, dataPoints, pointIdx, aspectIdx) {
 

  var dataPoint = dataPoints[pointIdx][aspectIdx];
  var min = d3.min(dataPoints, function(d) { return d[aspectIdx]; });
  var max = d3.max(dataPoints, function(d) { return d[aspectIdx]; });
  console.log("min = " + min);
  console.log("max = " + max);
  console.log("dataPoint = " + dataPoint);
  var rotate = d3.scale.linear().domain([min,max]).range([0,10]);
  var scale = d3.scale.linear().domain([min, max]).range([1, 2, 3]);
  //var interpolation = d3.scale.linear().domain([min, max]).range(["cardinal-closed", "linear-closed", "basis-closed"]);
  var interpolation = d3.scale.linear().domain([min, max]).range(["basis-closed"]);
  var baseShape = d3.scale.linear().domain([min, max]).range([0,1,2]);

  console.log("rotate= "+ rotate(dataPoint));
  console.log("scale = " + scale(dataPoint));
  console.log("baseShapeScale = " + baseShape(dataPoint));

  var shape = svg.append("g").attr("transform", "rotate("+rotate(dataPoint)+"), scale("+scale(dataPoint)+")");

  var primaryColor = eyeBorderColors(Math.floor(Math.random() * 9));
  var secondaryColor = eyeBorderColors(Math.floor(Math.random() * 9));

  //The line SVG Path we draw
  var chosenShape = shapeData[baseShape(dataPoint)];
  var shapeFunction = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .interpolate("basis-closed");  
    var shapeGraph = 
      shape.append("path")
      .attr("d", shapeFunction(chosenShape))
      .attr("stroke", primaryColor )
      .attr("fill", secondaryColor )
      .attr("stroke-width", 2);
} 




});