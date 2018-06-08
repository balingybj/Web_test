function tgc_state(data, index){
	$("#tgc_value").children("div.value" + index).html("ctrl{0}: {1}, op{0}: {2}".format(index, tgcctrlstate[data["CtrlState"]], tgcopstate[data["OpState"]]));
} 

function rgc_state(data, index){
	$("#rgc_value").children("div.value" + index).html("state{0}: {1}".format(index, rgcstate[data]));
}

function update_simple_module(module, state)
{
	$(module).children("div.value").html("state: {0}".format(state));
}

function dpd_state(ctrl, op){
	$("#dpd_value").children("div.value").html("ctrl: {0}, op: {1}".format(dpdctrlstate[ctrl],dpdopstate[op]));
}

function alarm_state(state){
	$("#alarm_value").children("div.value0").html("state: {0}".format(alarmstate[state]));
}

function deal_modules_info(data) {
	//console.log(data);
	var modules = JSON.parse(data);
	for (var i = 0; i < TX_PATH; i++) {
		tgc_state(modules["tgc"+i], i);
	}
	for (var i = 0; i < RX_PATH; i++) {
		rgc_state(modules["rgc"+i], i);
	}
	//update_simple_module("#vswr_value", vswrstate[modules["vswr"]]);
	alarm_state(modules["alarm"]);
	$("#alarm_value").children("div.value1").html("number: " + modules["alarmnum"]);
	dpd_state(modules["dpdCtrlState"], modules["dpdOpState"]);
}

function Request() {
	
	this.dataRq = [{data:"modulesinfo",  bindid:"", cur:0, refresh:1, success:deal_modules_info, error:undefined, extdata:undefined}];
	this.doAddRequest = function (reqs) {
		for(var index = 0, len = reqs.length; index < len; index++)
		{
			this.dataRq.push(reqs[index]);
		}
		
	};
	this.requestData = function (req){
		$.ajax({
			dataType: "text",
			url: "/cgi-bin/main.cgi?cur_time=" + new Date().getTime(),
			data: req.data,
			method: "POST"
		}).done(
			function(backdata){
					if(req.success != undefined)
					{
							req.success(backdata);
					}
				}
		).fail(
			function(backdata){
					if(req.error != undefined)
					{
						console.log(backdata);
						req.error(backdata);	
					}
				}
			
		);
	};
	this.updateData = function (){
		for (var index in this.dataRq){	
			this.dataRq[index].cur++;
			if(this.dataRq[index].cur >= this.dataRq[index].refresh)
			{
				this.dataRq[index].cur = 0;
				this.requestData(this.dataRq[index]);
			}
		}
	};
}

var request = new Request()


