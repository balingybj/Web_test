var dataRq = 
[
	{data:"version",  bindid:"", cur:0, refresh:1, success:deal_version, error:undefined, extdata:undefined},
];

function deal_version(data){
	var ver = JSON.parse(data);
	var tr_list = $("#version > tbody").children("tr");	
	tr_list.eq(0).find("td").eq(1).html(ver["hwtype"]);
	tr_list.eq(1).find("td").eq(1).html(ver["author"]);
	tr_list.eq(2).find("td").eq(1).html(ver["buildtime"]);
	tr_list.eq(3).find("td").eq(1).html(ver["dpd"]);
	tr_list.eq(4).find("td").eq(1).html("0x" + parseInt(ver["fpga"]).toString(16));
}


request.doAddRequest(dataRq);
request.updateData();
