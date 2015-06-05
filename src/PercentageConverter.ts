import IGraphData from './IGraphData';
import * as d3 from 'd3';

function PercentageConverter(data: IGraphData[]) {
	var max = d3.max(data.map((d) => d.value));
	return data.map(d => <IGraphData>{ year: d.year, value: d.value / max * 100 });
}

export default PercentageConverter;