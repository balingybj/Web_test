var cellstate = {"0": "inactive","1": "inactive_active", "2": "active", "3": "active_inactive"};
var tgcopstate = {"0": "stop","1": "pause", "2": "bypass", "3": "normal"};
var tgcctrlstate = {"0": "init","1": "fast", "2": "slow", "3": "error"};
var rgcstate = {"0": "bypass","1": "normal", "2": "fail", "3": "stop"};
var vswrstate = {"0": "stop","1": "run"};
var alarmstate = {"0": "run","1": "stop"};
var dpdopstate = {"0": "wait_init","1": "init", "2": "stop", "3": "stop_run", "4": "run", "5": "run_stop"};
var dpdctrlstate = {"0": "hwbypass","1": "normal", "2": "swbypass"};

var alarmInfo = [{name: "PA high temperature", unit: "0.01℃"}, 
         {name: "PA over temperature", unit: "0.01℃"},
         {name: "PA low temperature", unit: "0.01℃"},
         {name: "PA over current", unit: "mA"},
         {name: "PA over volt", unit: "mV"},
         {name: "PA low volt", unit: "mV"},
         {name: "PSU Fault Alarm 5.5/12/28V", unit: "---"},
         {name: "tx path over output power", unit: "0.01dB"},
         {name: "tx path critical vswr", unit: "---"},
         {name: "tx path slight vswr", unit: "---"},
         {name: "tx path tgc error", unit: "---"},
         {name: "tx path over BbTssi", unit: "0.01dBfs"},
         {name: "tx path low BbTssi", unit: "0.01dBfs"},
         {name: "rx path over rssi", unit: "0.01dBm"},
         {name: "rx path low rssi", unit: "0.01dBm"},
         {name: "rx path agc alarm", unit: "0.01dB"},
         {name: "PSU low volt", unit: "mV"},
         {name: "RRU shock proof invalid", unit: "---"},
         {name: "PSU 12V fault", unit: "---"},
         {name: "TRX over temperature", unit: "0.01℃"},
         {name: "TRX high temperature", unit: "0.01℃"},
         {name: "RF over temperature", unit: "0.01℃"},
         {name: "RF high temperature", unit: "0.01℃"},
         {name: "Rru Cpu over temperature", unit: "0.01℃"},
         ];

var path_num = 4;
var carrier_num = 8;
var TX_PATH = 2;
var RX_PATH = 4;
var INVALID = "65535";
var CHAR_INVALID = "255";
var STR_INVALID = "N/A";
var QUIT_TIMEOUT = 10


function _float(_data, preci){
		if(_data == INVALID)return "N/A";
		return parseFloat(_data) / preci;
}	