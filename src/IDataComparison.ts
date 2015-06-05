import IEconomicData from './IEconomicData';
import IGraphData from './IGraphData';

interface IDataComparison {
	name: string;
	color: string;
	converter(data: IEconomicData[]): IGraphData[];
}

export default IDataComparison;