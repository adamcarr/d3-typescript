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
	public xScale: d3.time.Scale<number, number>;
	public yScale: d3.scale.Linear<number, number>;
	
	public dataRanges: {
		[key: string]: IDataRange;
	} = {};
	
	constructor(public selector: string) {
		this.visualizationElement = d3.select(this.selector);
	}
	
	initialize(xRange: [Date, Date], yRange: [number, number]) {
		this.xScale = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]).domain(xRange);
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
		var lineGen = d3.svg.line<IGraphData>()
			.x((d) => this.xScale(d.year))
			.y((d) => this.yScale(d.value))
			
		var dataSet = _.filter(this.dataRanges, 'isVisible');
		
		var pathContainers = this.visualizationElement.selectAll('g.line')
			.data(dataSet);
			
		pathContainers.enter().append('g')
			.attr('class', 'line')
			.attr('stroke-width', 1);
			
		pathContainers
			.attr('stroke', (d, i) => d.color)
			.attr('fill', (d, i) => d.color);
		
		pathContainers.exit().remove();
		
		var paths = pathContainers.selectAll('path')
			.data(d => [PercentageConverter(d.data)]);
			
		paths.enter()
			.append('path')
			.attr('fill', 'none');
		
		paths.attr('d', lineGen);
		
		var circles = pathContainers.selectAll('circle')
			.data(d => PercentageConverter(d.data));
			
		circles.enter()
			.append('circle')
			.attr('r', 3);
					
		circles.attr('cx', d => this.xScale(d.year) )
			.attr('cy', d => this.yScale(d.value))
		
		pathContainers.selectAll('circle').on('click', (d, i) => {
			alert(JSON.stringify(this.getVisibleValuesAtIndex(i), null, '  '));
		});
	}
	
	getVisibleValuesAtIndex(index: number): {name: string, data: IGraphData}[] {
		return _.filter(this.dataRanges, 'isVisible').map((dataRange) => {
			return {
				name: dataRange.name,
				data: dataRange.data[index]
			}
		});
	}
}

export default VisualizationManager;