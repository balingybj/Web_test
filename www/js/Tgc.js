var dataRq = 
[
	{data:"carriercfg",  bindid:"cellcfg", cur:0, refresh:1, success:deal_carrier_tgc, error:undefined, extdata:undefined},
	{data:"pwrinfo",  bindid:"", cur:0, refresh:1, success:deal_pwr_tgc, error:undefined, extdata:undefined},
	{data: "att_tgc",  bindid:"", cur:0, refresh:1, success:deal_att_tgc, error:undefined, extdata:undefined},
	{data: "temp_tgc",  bindid:"", cur:10, refresh:10, success:deal_temp_tgc, error:undefined, extdata:undefined},
	{data: "painfo",  bindid:"", cur:0, refresh:1, success:deal_pa_info, error:undefined, extdata:undefined},
];

var paVolElements = [

	{name: 'ANT0_Sub0', data: [], visible: true},
	{name: 'ANT0_Sub1', data: [], visible: false },
	{name: 'ANT0_Sub2', data: [], visible: false },
	{name: 'ANT0_Sub3', data: [], visible: false },
	{name: 'ANT0_Drain', data: [], visible: false },
	{name: 'ANT1_Sub0', data: [], visible: false },
	{name: 'ANT1_Sub1', data: [], visible: false },
	{name: 'ANT1_Sub2', data: [], visible: false },
	{name: 'ANT1_Sub3', data: [], visible: false },
	{name: 'ANT1_Drain', data: [], visible: false },
];

var paCurrElements = [

	{name: 'ANT0_Sub0', data: [], visible: true },
	{name: 'ANT0_Sub1', data: [], visible: false },
	{name: 'ANT0_Sub2', data: [], visible: false },
	{name: 'ANT0_Sub3', data: [], visible: false},
	{name: 'ANT0_Path', data: [], visible: false},
	{name: 'ANT1_Sub0', data: [], visible: false },
	{name: 'ANT1_Sub1', data: [], visible: false },
	{name: 'ANT1_Sub2', data: [], visible: false },
	{name: 'ANT1_Sub3', data: [], visible: false },
	{name: 'ANT1_Path', data: [], visible: false },
];


var tempElements = [

	{name: 'ANT0', data: [] },
	{name: 'ANT1', data: [] },
];

var powElements = [

	{name: 'ANT0', data: [] },
	{name: 'ANT1', data: [] },

];

var	tempChart = new Chart('Temperature', '°C', 'temp-chart', 'column');
tempChart.addXData(tempElements);
tempChart.setXAxis({categories: ['tx', 'if', 'rf','pa']});
tempChart.highChart  = new Highcharts.Chart(tempChart);

var powChart = new Chart('Power', 'dbfs', 'pow-chart','column');
powChart.addXData(powElements);
powChart.setXAxis({categories: ['BbTssi0', 'BbTssi1', 'BbTssi2','BbTssi3', 'PreCfr', 'PostCfr', 'PreDpd', 'PostDpd', 'PreDac', 'FbRssi']});
powChart.highChart = new Highcharts.Chart(powChart);

var	paVolChart = new Chart('Voltage', 'V', 'pa-vol', 'spline');
paVolChart.addXData(paVolElements);
paVolChart.highChart  = new Highcharts.Chart(paVolChart);

var	paCurrChart = new Chart('Current', 'A', 'pa-curr', 'spline');
paCurrChart.addXData(paCurrElements);
paCurrChart.highChart  = new Highcharts.Chart(paCurrChart);


function deal_att_tgc(data){
	
	var atts = JSON.parse(data);
	
	for(var index = 0; index < TX_PATH; index++)
	{
		var att = atts["tx" + index];

		$("#att_info tr:eq(" + index + ") td:eq(1)").html(_float(att["PreDpd"],100));
		$("#att_info tr:eq(" + index + ") td:eq(2)").html(_float(att["PostDpd"],100));
		$("#att_info tr:eq(" + index + ") td:eq(3)").html(_float(att["att"],100));
		$("#att_info tr:eq(" + index + ") td:eq(4)").html(_float(att["FbAtt"],100));
	}


}


function deal_pa_info(data){

	var paInfo = JSON.parse(data);

	console.log(data);
	paVolChart.drawPoint(0, _float(paInfo['tx0']['volBia0'], 1000));
	paVolChart.drawPoint(1, _float(paInfo['tx0']['volBia1'], 1000));
	paVolChart.drawPoint(2, _float(paInfo['tx0']['volBia2'], 1000));
	paVolChart.drawPoint(3, _float(paInfo['tx0']['volBia3'], 1000));
	paVolChart.drawPoint(4, _float(paInfo['tx0']['volDrain'], 1000));
	paVolChart.drawPoint(5, _float(paInfo['tx1']['volBia0'], 1000));
	paVolChart.drawPoint(6, _float(paInfo['tx1']['volBia1'], 1000));
	paVolChart.drawPoint(7, _float(paInfo['tx1']['volBia2'], 1000));
	paVolChart.drawPoint(8, _float(paInfo['tx1']['volBia3'], 1000));
	paVolChart.drawPoint(9, _float(paInfo['tx1']['volDrain'], 1000));
	paVolChart.highChart.redraw();

	paCurrChart.drawPoint(0, _float(paInfo['tx0']['currBia0'], 1000));
	paCurrChart.drawPoint(1, _float(paInfo['tx0']['currBia1'], 1000));
	paCurrChart.drawPoint(2, _float(paInfo['tx0']['currBia2'], 1000));
	paCurrChart.drawPoint(3, _float(paInfo['tx0']['currBia3'], 1000));
	paCurrChart.drawPoint(4, _float(paInfo['tx0']['currPath'], 1000));
	paCurrChart.drawPoint(5, _float(paInfo['tx1']['currBia0'], 1000));
	paCurrChart.drawPoint(6, _float(paInfo['tx1']['currBia1'], 1000));
	paCurrChart.drawPoint(7, _float(paInfo['tx1']['currBia2'], 1000));
	paCurrChart.drawPoint(8, _float(paInfo['tx1']['currBia3'], 1000));
	paCurrChart.drawPoint(9, _float(paInfo['tx1']['currPath'], 1000));
	paCurrChart.highChart.redraw();
}


function deal_temp_tgc(data){

	var temps = JSON.parse(data);
	for (var index = 0; index < TX_PATH; index++) {
		var dataTx = temps['tx' + index];
		var chartData = [];
		chartData.push(_float(dataTx['tx'], 100));
		chartData.push(_float(dataTx['if'], 100));
		chartData.push(_float(dataTx['rf'], 100));
		chartData.push(_float(dataTx['pa'], 100));
		tempChart.highChart.series[index].setData(chartData);
	}
	tempChart.highChart.redraw();
}

function deal_carrier_tgc(data){

	var carriers = JSON.parse(data);
	$("#carrier_info").empty();
	for(var index = 0; index < carrier_num; index++)
	{
			var data = carriers["carrier" + index];
			if(data["Power"] != "N/A" && data["TxFrq"] != "0")
			{
				$("#carrier_info").append("<tr>"+ index + "<\tr>");
				$("#carrier_info").children("tr").eq(index).append("<td>"+ (parseInt(index) + 1) + "</td>");
				$("#carrier_info").children("tr").eq(index).append("<td>"+ parseInt(data["Power"]) / 256 + "</td>");
				$("#carrier_info").children("tr").eq(index).append("<td>"+ data["TxFrq"] + "</td>");
				$("#carrier_info").children("tr").eq(index).append("<td>"+ data["TxNco"] + "</td>");
				$("#carrier_info").children("tr").eq(index).append("<td>"+ data["TxDatt"] + "</td>");
			}
			
	}

}


function pwr_data_present(data){

	for (var index = 0; index < TX_PATH; index++) {
		var dataTx = data['tx' + index];

		var chartData = powChart.xAxis.categories.map(function(item, dataIndex){
			var val = _float(dataTx[item], 100);
			if(val === "N/A"
				&& powChart.highChart.series[index].data[dataIndex] != undefined)
			{
				powChart.highChart.series[index].data[dataIndex].remove();
			}
			return val;
		});

		powChart.highChart.series[index].setData(chartData, false);
	}

	powChart.highChart.redraw();
}

function deal_pwr_tgc(data){
	//console.log(data);	
	var pwr = JSON.parse(data);
	pwr_data_present(pwr);
}


request.doAddRequest(dataRq);
//test_draw_chart();

//self.setTimeout("doAddRequest(dataRq)", 1000);
self.setInterval("request.updateData()", 1000);