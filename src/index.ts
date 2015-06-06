/// <reference path="../typings/tsd.d.ts" />

import * as d3 from 'd3';
import IEconomicData from './IEconomicData';
import IDataComparison from './IDataComparison';
import DataComparisons from './DataComparisons';
import {VisualizationManager, IDataRange} from './VisualizationManager';
import * as _ from 'lodash';

var rawData: IEconomicData[];
var visualizationManager = new VisualizationManager('#visualisation');

d3.csv<IEconomicData>("EconomicData.csv", 
	(row) => {
		var returnObj: IEconomicData = {
			Year: new Date(row['Year']),
			Wages: +row['Wages'],
			PrivateWages: +row['PrivateWages'],
			GovernmentWages: +row['GovernmentWages'],
			PersonalTaxes: +row['PersonalTaxes'],
			ConsumptionExpenses: +row['ConsumptionExpenses'],
			InterestPayments: +row['InterestPayments'],
			PersonalSavings: +row['PersonalSavings'],
			Population: +row['Population']
		};
		
		return returnObj;
	},
	(error: any, data: IEconomicData[]) => {
		visualizationManager.initialize(
			[d3.min(data.map(d => d.Year)), d3.max(data.map(d => d.Year))],
			[0, 100]
		);
		
		for (var key in DataComparisons) {
			if (DataComparisons.hasOwnProperty(key)) {
				var comparison: IDataRange = DataComparisons[key];
				comparison.isVisible = false;
				comparison.data = comparison.converter(data);
				visualizationManager.addDataRange(key, comparison);
			}
		}
		
		var comparisons = d3.select('#comparisons');
		var comparisonSelection = comparisons.selectAll('input')
			.data(Object.keys(visualizationManager.dataRanges).map((key) => <any>{key: key, comparison: visualizationManager.dataRanges[key]}))
			.enter().append('div');
			
		var comparisonCheckbox = comparisonSelection.append('input')
			.attr('type', 'checkbox')
			.attr('value', (d, i) => d.key)
			.attr('id', (d, i) => d.key);
			
		comparisonSelection.append('label')
			.attr('for', (d, i) => d.key)
			.text((d,i) => d.comparison.name)
			.style('color', (d, i) => d.comparison.color);
			
		comparisonCheckbox.on('change', function() {
			visualizationManager.toggleDataRangeVisibility(this.value);
		})
				
		// comparisons.on('change', function() {
		// 	visualizationManager.setVisible(getSelectValues(document.getElementById('comparisons')));
		// });
	});
	
function getSelectValues(selectElement: any) {
	var result: any[] = [];
	var options = selectElement && selectElement.options;
	var opt: any;

	for (var i = 0, iLen = options.length; i < iLen; i++) {
		opt = options[i];

		if (opt.selected) {
			result.push(opt.value || opt.text);
		}
	}
	return result;
}