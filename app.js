var width = 800;
var height = 500;
var padding = 40;

var newRegionData= regionData.filter(mustHaveKeys);

var xScale = d3.scaleLinear()
                .domain(d3.extent(newRegionData, (d)=>d.adultLiteracyRate))
                .range([padding ,width-padding]);
var yScale = d3.scaleLinear()
                .domain(d3.extent(newRegionData, (d)=>d.subscribersPer100))
                .range([height - padding, padding]);
var rScale = d3.scaleLinear()
                .domain(d3.extent(newRegionData, d=>d.medianAge))
                .range(d3.extent(newRegionData, d=>d.medianAge).map(val=>val/1.75))

var colorScale = d3.scaleLinear()
                .domain(d3.extent(newRegionData, d=>d.urbanPopulationRate))
                .range(["#f5c542","#5e0202"])

var xAxis = d3.axisBottom(xScale)
                .tickSize(-height + 2*padding)
                .tickSizeOuter(0);
                
var yAxis = d3.axisLeft(yScale)
                .tickSize(-width)
                .tickSizeOuter(0);


d3.select("svg")
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0, ${height - padding})`);
d3.select("svg")
    .append("g")
    .call(yAxis)
    .attr("transform", `translate(${padding})`);

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
        .selectAll("circle")
        .data(newRegionData)
        .enter()
        .append("circle")
    .attr("cx",d=> xScale(d.adultLiteracyRate))
    .attr("cy",d=> yScale(d.subscribersPer100))
    .attr("r", d=> rScale(d.medianAge))
    .attr("fill", d=> colorScale(d.urbanPopulationRate))

d3.select("svg")
    .append("text")
        .classed("bold", true)
        .attr("x", width/2)
        .attr("y",  padding/2)
        .attr("dy", "1.5em")
        .attr("text-anchor", "middle")
        .text("Region Data By Country in 2012");


d3.select("svg")
    .append("text")
        .attr("x", width/2)
        .attr("y", height - padding)
        .attr("dy", "1.5em")
        .attr("text-anchor", "middle")
        .text("Adult Literacy Rate");


d3.select("svg")
    .append("text")
        .attr("x", -height /2)
        .attr("y", -5)
        .attr("transform", `rotate(-90)`)
        .attr("dy", "1.5em")
        .attr("text-anchor", "middle")
        .text("Subscribers Per 100 Capita");



function mustHaveKeys(obj){
    var keys = [
        "subscribersPer100",
        "adultLiteracyRate",
        "medianAge",
        "urbanPopulationRate"
    ]
    for(var i=0; i<keys.length; i++){
        if(obj[keys[i]]==null){return false};
        return true;
    }
}