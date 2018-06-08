var dataRq = 
[
	{data:"alarm",  bindid:"", cur:0, refresh:1, success:deal_alarm_detail, error:undefined, extdata:undefined}
];

function deal_alarm_detail(data){
	var alarms = JSON.parse(data);
	var count = 0;
	$("#alarm_info").empty();

	for(var alarm in alarms)
	{	
		$("#alarm_info").append("<tr><\tr>");
		var string = alarmInfo[parseInt(alarms[alarm].id)].name;
		$("#alarm_info").children("tr").eq(count).append("<td>"+ string + "</td>");
		var path = (alarms[alarm].path == CHAR_INVALID)? "INVALID" : alarms[alarm].path;
		$("#alarm_info").children("tr").eq(count).append("<td>"+ path + "</td>");
		var carrier = (alarms[alarm].carrier == CHAR_INVALID)? "INVALID" : parseInt(alarms[alarm].carrier) + 1;
		$("#alarm_info").children("tr").eq(count).append("<td>"+ carrier + "</td>");
		count ++;
	}
	$("#alarm_value").children("div.value1").html("number: " + count);
}

request.doAddRequest(dataRq);

//self.setTimeout("doAddRequest(dataRq)", 1000);
self.setInterval("request.updateData()", 1000);