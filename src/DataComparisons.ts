import IDataComparison from './IDataComparison';
import IEconomicData from './IEconomicData';

interface IDataComparisons {
	[name: string]: IDataComparison;
}

var DataComparisons: IDataComparisons = {
	PerCapitaWages: {
		name: 'Per Capita Wages',
		color: 'red',
		converter: (data: IEconomicData[]) => data.map((datum) => <any>{ year: datum.Year, value: datum.Wages / datum.Population })
	},
	
	PerCapitaPrivateWages:  {
		name: "Per Capita Private Wages",
		color: 'blue',
		converter: (data: IEconomicData[]) => data.map((datum) => <any>{ year: datum.Year, value: datum.PrivateWages / datum.Population })
	},
	
	PerCapitaGovernmentWages: {
		name: "Per Capita Government Wages",
		color: 'green',
		converter: (data: IEconomicData[]) => data.map((datum) => <any>{ year: datum.Year, value: datum.GovernmentWages / datum.Population })
	},
	
	PerCapitaPersonalTaxes: {
		name: "Per Capita Personal Taxes",
		color: 'orange',
		converter: (data: IEconomicData[]) => data.map((datum) => <any>{ year: datum.Year, value: datum.PersonalTaxes / datum.Population })
	},
	
	PerCapitaPersonalSavings: {
		name: "Per Capita Personal Savings",
		color: 'violet',
		converter: (data: IEconomicData[]) => data.map((datum) => <any>{ year: datum.Year, value: datum.PersonalSavings / datum.Population })
	},
	
	PerCapitaInterestPayments: {
		name: "Per Capita Interest Payments",
		color: 'brown',
		converter: (data: IEconomicData[]) => data.map((datum) => <any>{ year: datum.Year, value: datum.InterestPayments / datum.Population })
	},
	
	PerCapitaConsumptionExpenses: {
		name: "Per Capita Consumption Expenses",
		color: 'teal',
		converter: (data: IEconomicData[]) => data.map((datum) => <any>{ year: datum.Year, value: datum.ConsumptionExpenses / datum.Population })
	}
}

export default DataComparisons;