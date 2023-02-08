const svg = d3.select("svg");
const height = +svg.attr('height');
const width = +svg.attr('width');


function render(data){

  const margin = {top: 50, right: 20, bottom: 50, left: 50};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom

const xFunc = d => d.date;
const yFunc = d => d.temperature;


const xValue = d3.scaleTime()
.domain(d3.extent(data, d=>d.date))
.range([0, innerWidth])

const yValue = d3.scaleLinear()
.domain(d3.extent(data, d=>d.temperature))
.range([innerHeight, 0])

console.log(xValue.domain())

const g = svg.append('g')
.attr('transform', `translate(${margin.left}, ${margin.top})`)


const yAxis = d3.axisLeft(yValue)
.tickSize(-innerWidth);
g.append('g').call(yAxis)

const xAxis = d3.axisBottom(xValue)
.tickSize(-innerHeight)
g.append('g').call(xAxis)
.attr("transform", `translate(0, ${innerHeight})`)

const lineGenerator = d3.line()
.x(d => xValue(xFunc(d)))
.y(d => yValue(yFunc(d)))
.curve(d3.curveBasis)

g.append('path')
.attr('stroke', 'black')
.attr('d', lineGenerator(data))
.attr('class', 'line-path')


}









async function getData(){
const data = await d3.csv('https://raw.githubusercontent.com/purplepew/csvdata2/main/temperature%20csv');
data.map(d=>d.temperature = +d.temperature)
data.map(d=>d.date = new Date(d.date))
console.log(data.map(d=>d.temperature = +d.temperature))
render(data);
}


getData()
