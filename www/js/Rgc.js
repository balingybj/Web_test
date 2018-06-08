var dataRq = 
[
	{data:"carriercfg",  bindid:"cellcfg", cur:0, refresh:1, success:deal_carrier_rgc, error:undefined, extdata:undefined},
	{data:"pwrinfo",  bindid:"", cur:0, refresh:1, success:deal_pwr_rgc, error:undefined, extdata:undefined},
	{data:"att_rgc",  bindid:"", cur:0, refresh:1, success:deal_att_rgc, error:undefined, extdata:undefined},
];

var powElements = [

	{name: 'ANT0', data: [] },
	{name: 'ANT1', data: [] },
	{name: 'RXD0', data: [] },
	{name: 'RXD1', data: [] },

];

var powChart = new Chart('Power', 'dbfs', 'pow-chart','column');
powChart.addXData(powElements);
powChart.setXAxis({categories: ['BbRssi0', 'BbRssi1', 'BbRssi2','BbRssi3', 'IfRssi']});
powChart.highChart = new Highcharts.Chart(powChart);


function deal_att_rgc(data){

	var atts = JSON.parse(data);

	for(var index = 0; index < RX_PATH; index++)
	{
		var att = atts["rx" + index];
		//console.log(att);
		$("#att_info tr:eq(" + index + ") td:eq(1)").html(_float(att["att"],100));
		$("#att_info tr:eq(" + index + ") td:eq(2)").html(_float(att["Dvga"],100));
		$("#att_info tr:eq(" + index + ") td:eq(3)").html(_float(att["Datt"],100));
	}

}

function deal_carrier_rgc(data){
	//console.log(data);
	var carriers = JSON.parse(data);
	var tr_len = 0;
	$("#carrier_info").empty();
	for(var index = 0; index < carrier_num; index++)
	{
			var data = carriers["carrier" + index];
			if(data["RxNco"] != "N/A" && data["RxFrq"] != "0")
			{
				$("#carrier_info").append("<tr>"+ index + "<\tr>");
				$("#carrier_info").children("tr").eq(tr_len).append("<td>"+ (parseInt(index) + 1) + "</td>");
				$("#carrier_info").children("tr").eq(tr_len).append("<td>"+ data["RxFrq"] + "</td>");
				$("#carrier_info").children("tr").eq(tr_len).append("<td>"+ data["RxNco"] + "</td>");
				$("#carrier_info").children("tr").eq(tr_len).append("<td>"+ data["RxDatt"] + "</td>");
				tr_len++;
			}
	}
}

function _float(_data, preci){
		if(_data == INVALID)return "N/A";
		return parseFloat(_data) / preci;
}

function pwr_data_present(data){

	for (var index = 0; index < RX_PATH; index++) {
		var dataRx = data['Rx' + index];
		var chartData = [];
		chartData.push(_float(dataRx['BbRssi0'], 100));
		chartData.push(_float(dataRx['BbRssi1'], 100));
		chartData.push(_float(dataRx['BbRssi2'], 100));
		chartData.push(_float(dataRx['BbRssi3'], 100));
		chartData.push(_float(dataRx['IfRssi'], 100));
		powChart.highChart.series[index].setData(chartData);
	}
	powChart.highChart.redraw();
}

function deal_pwr_rgc(data){
	//console.log(data);	
	var pwr = JSON.parse(data);
	
	pwr_data_present(pwr);
}


request.doAddRequest(dataRq);

//self.setTimeout("doAddRequest(dataRq)", 1000);
self.setInterval("request.updateData()", 1000);