/*global define */
define(['d3'], function (d3) {
    'use strict';

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
	    padding = {top: 60, right: 60, bottom: 60, left: 60},
	    outerWidth = 960,
	    outerHeight = 500,
	    innerWidth = outerWidth - margin.left - margin.right,
	    innerHeight = outerHeight - margin.top - margin.bottom,
	    width = innerWidth - padding.left - padding.right,
	    height = innerHeight - padding.top - padding.bottom;

	var svg = d3.select("#container")
	    .attr("width", outerWidth)
	    .attr("height", outerHeight)
	  	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
		.attr("transform", "translate(100,100),scale(4,4)")

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

	var mouth = [[{"x":0, "y":0},{"x":5, "y":0}]];

	svg.append("use").attr("xlink:href","#face")

 //This is the accessor function we talked about above
 var lineFunction = d3.svg.line()
	.x(function(d) { return d.x; })
	.y(function(d) { return d.y; })
	.interpolate("cardinal-closed");

//The line SVG Path we draw
var lineGraph = eye.append("path")
	.attr("d", lineFunction(mouth[0]))
	.attr("stroke", "blue")
	.attr("stroke-width", 2)
	.attr("fill", "none");



});