function Chart(title, yUnit, elementId, chartType){

	var xType = arguments[4]? arguments[4] : 'linear' ;
	var zoom = arguments[5]? arguments[5] : 'None' ;

	this.chart = {
			renderTo: elementId,
			type: chartType,
			zoomType: zoom,
			animation: Highcharts.svg,
			marginRight: 10,
			events:{
				load: undefined
			}
		};		
	this.title = {text : title},
	this.xAxis = {type : xType};
	this.yAxis = [{

				title: {
					text: yUnit,
					rotation: 0,
					offset: 0,
					align: 'high',
					y : -10
				},
				plotLines: [{value: 0, width: 1, color: "#808080"}]

			}

		];

	this.tooltip = {
			formatter: function(){
				if(zoom != 'None'){
					return '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',this.x) + '</b><br/>'
							+ this.series.name + ':' + Highcharts.numberFormat(this.y, 2);

				}
				return '<b>' + this.series.name + '</b> :' + Highcharts.numberFormat(this.y, 2);
			}
		};

	this.plotOptions = {
			line: {
				dataLabels:{
					enabled: true
				}
			},
			column : {
				dataLabels:{
					enabled: true
				}
			},

			series : {
				point: {
					events: {
						remove: function(){
							return true;
						}
					}
				}
			} 

		};

	this.legend = {
			labelFormatter : function(){
				return this.name;
			}
		};

	this.exporting = {
			enabled: false
		};

	this.credits = {
			enabled: false
		};
	this.series = [];
	this.highChart = null;

	if(typeof this.addXData != 'function'){
		Chart.prototype.addXData = function(data){
			
			for(var i = 0; i < data.length; i++)
			{
				this.series.push(data[i]);
			}
			
		};

		Chart.prototype.drawPoint = function(index, data){

			if(this.highChart != null)
			{
				var serie = this.highChart.series[index];
				if(serie.data.length <= 10 && !serie.visible) // when serie.visible == false, serie.data.length can't update;bug?
				{
					serie.data.length++;
				}
				serie.addPoint(data , false, serie.data.length > 10);
			}

		};

		Chart.prototype.setXAxis = function(axis){

			this.xAxis = axis;
		};
	}

}