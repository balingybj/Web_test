var dataRq = {data:"", success:drawPaTempChart,};
var logElements = [
	{name: '', data: [], visible: true },
];


function getUnit(dataName){

	var regTemp = /temp/i ;
	var regVolt = /volt/i ;
	var regCurr = /curr/i ;

	if(regTemp.test(dataName))return {unit : '°C', preci : 100};
	else if(regVolt.test(dataName))return {unit : 'V', preci : 1000};
	else if(regCurr.test(dataName))return {unit : 'A', preci : 1000};
}

function checkForm(){

	var form_data = $("#meas_data").serializeArray();

	console.log(form_data[0].value);
	dataRq.data = form_data[0].value
	request.requestData(dataRq);
	logElements = [{name: form_data[0].value, data: [], visible: true }];

	return false;
}


function drawPaTempChart(data){

	var temp = JSON.parse(data);
	var dataUnit = getUnit(logElements[0].name);

	var	logChart = new Chart(logElements[0].name, dataUnit.unit, 'log-chart', 'spline', 'datetime', 'x');
	logChart.addXData(logElements);
	logChart.highChart  = new Highcharts.Chart(logChart);

	for(var time in temp)
	{
		var datetime = new Date(parseInt(time) * 1000);
		var tms = Date.UTC(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(), datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());
		//logChart.highChart.series[0].addPoint([Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',time), parseInt(temp[time])], false);
		logChart.highChart.series[0].addPoint([tms,  _float(parseInt(temp[time]), dataUnit.preci)], false);
	}
	logChart.highChart.redraw();
}



//self.setTimeout("doAddRequest(dataRq)", 1000);
self.setInterval("request.updateData()", 1000);