import * as d3 from 'd3';
import IGraphData from './IGraphData';
import PercentageConverter from './PercentageConverter';
import IDataComparison from './IDataComparison';
import * as _ from 'lodash';

var WIDTH = 1000,
	HEIGHT = 500,
	MARGINS = {
		top: 30,
		right: 30,
		bottom: 30,
		left: 60
	};

export interface IDataRange extends IDataComparison {
	isVisible?: boolean;
	data?: IGraphData[];
}	

export class VisualizationManager {
	public visualizationElement: d3.Selection<any>;
	public xScale: d3.scale.Linear<number, number>;
	public yScale: d3.scale.Linear<number, number>;
	
	public dataRanges: {
		[key: string]: IDataRange;
	} = {};
	
	constructor(public selector: string) {
		this.visualizationElement = d3.select(this.selector);
	}
	
	initialize(xRange: [number, number], yRange: [number, number]) {
		this.xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain(xRange);
		this.yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain(yRange);
		
		this.visualizationElement.append("svg:g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
			.call(d3.svg.axis().scale(this.xScale));
		this.visualizationElement.append("svg:g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + (MARGINS.left) + ",0)")
			.call(d3.svg.axis().scale(this.yScale).orient("left"));
	}
	
	addDataRange(key: string, dataRange: IDataRange) {
		this.dataRanges[key] = dataRange;
		this.updateGraph(key);
	}
	
	setVisible(keys: string[]) {
		for (var key in this.dataRanges) {
			if (this.dataRanges.hasOwnProperty(key)) {
				var dataRange = this.dataRanges[key];
				var isVisible = _.contains(keys, key);
				if (dataRange.isVisible !== isVisible) {
					dataRange.isVisible = isVisible;
					this.updateGraph(key);
				}
			}
		}
	}
	
	toggleDataRangeVisibility(key: string) {
		if (this.dataRanges[key]) {
			this.dataRanges[key].isVisible = !this.dataRanges[key].isVisible;
			this.updateGraph(key);
		}
	}
	
	updateGraph(key: string) {
		var dataRange = this.dataRanges[key];
		
		if (dataRange.isVisible) {
			var lineGen = d3.svg.line<IGraphData>()
				.x((d) => this.xScale(d.year))
				.y((d) => this.yScale(d.value))
				.interpolate("basis");
			
			var path = this.visualizationElement.append('path')
				.attr('d', lineGen(PercentageConverter(dataRange.data)))
				.attr('stroke', dataRange.color)
				.attr('fill', 'none')
				.attr('stroke-width', 2)
				.attr('class', key)
				.style('opacity', 0)
				.transition()
					.style('opacity', 100)
					.duration(10000); //not sure why this scale is off...
		} else {
			this.visualizationElement.selectAll(`path.${key}`).transition().style('opacity', 0).duration(1000).remove();
		}
	}
}

export default VisualizationManager;