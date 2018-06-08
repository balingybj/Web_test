var dataRq = 
[
	{data:"antstate",  cur:0, refresh:1, success:deal_ant_state, error:undefined, extdata:undefined},
	{data:"switch",  cur:0, refresh:1, success:deal_switch_state, error:undefined, extdata:undefined},
	//{data:"alarm",  bindid:"", refresh:10, success:deal_alarm_info, error:undefined, extdata:undefined},
];

$(function(){
	$(".switch input").bootstrapSwitch();
	//$("#T0C0 input").bootstrapSwitch("state", false);
});

function deal_cell_state(data){
		$("#cell_state").html(cellstate[data]);
	
	}

function ant_info(index, data){
	
	var __id = "ant" + index;
	var _ant = data[__id];
	__id = "#" + __id + " > table tbody";
 	var id = ["Power","TxNo","RxNo","TxMidFrq","RxMidFrq"];
 	var unit = [" dbm","",""," KHz"," KHz"];
 	var tr_list = $(__id).children("tr");
 	for (var tr = 0; tr < tr_list.length; tr++)
 	{
 		tr_list.eq(tr).find("td").eq(0).html(id[tr]);
 		
 		if(id[tr] == "TxNo" || id[tr] == "RxNo")
 		{
 			var val = parseInt(_ant[id[tr]]);
 			if(val >> index & 0x01)
 			{
 				val = index + 1;	
 			}
 			tr_list.eq(tr).find("td").eq(1).html(val);
 		}
 		else
 		{
 			var val = _ant[id[tr]];
 			if(id[tr] == "Power")
 			{
 				val = _float(val,100);
 			}
 			tr_list.eq(tr).find("td").eq(1).html(val + unit[tr]);
 			//tr_list.eq(tr).find("td").eq(2).html(unit[tr]);
 		}
 		
 	}
}

function ant_img(data){
	var ds= parseInt(data.DlStateMap);
	var us= parseInt(data.UlStateMap);
	var as= parseInt(data.DlAlarmMap);
	for(var index = 0; index < path_num; index++)
	{
		var stat = "rest";
		var info = "idle";

		if((us >> index) & 0x01)
		{
			stat = "running";
			info = "Rx";
			if((ds >> index) & 0x01)
			{
				info += ",Tx";	
			}
		}
		else if((ds >> index) & 0x01)
		{
				stat = "running";
				info = "Tx";
		}	
		var ant = "#ant" + index;
		$(ant + " > span" ).html(info);
		$(ant + " > img").attr("src", "../img/"+stat+".PNG");
	}
	
}

function deal_ant_state(data){
	//console.log(data);
	var data_parse = JSON.parse(data);
	ant_img(data_parse);
	deal_cell_state(data_parse.CellState);
	for(var index = 0; index < path_num; index++)
	{
		ant_info(index, data_parse);
	}
}

function deal_switch_state(data){
	var switchState  = JSON.parse(data);
	console.log(data);
	$(".switch").each(function(){
		var id = $(this).attr("id");
		var cap = id.slice(0,1);
		var val;
		switch(cap){
			case "T":
				val = parseInt(switchState["tx" + id.slice(1,2)]["carrier" + id.slice(-1)]);
				break;
			case "R":
				val = parseInt(switchState["rx" + id.slice(1,2)]["carrier" + id.slice(-1)]);
				break;
			case "F":
				val = parseInt(switchState["fb" + id.slice(2,3)]);
				if(val > 0){
					$("#"+id+" input").bootstrapSwitch("onText", (val === 1)? "FB" : "VSWR");
				}
				break;
			case "P":
				var name = id.slice(3);
				var index = id.slice(2,3);
				if(name === "PRO"){
					val = parseInt(switchState["pa"+index]["protect"]);
				}else if(name === "Drain"){
					val = parseInt(switchState["drain"]);
				}
				else val = parseInt(switchState["pa"+index]["status"]);
				break;
		}
		$("#"+id+" input").bootstrapSwitch("state", val);

	});
}


request.doAddRequest(dataRq);

//self.setTimeout("doAddRequest(dataRq)", 1000);
self.setInterval("request.updateData()", 1000);

