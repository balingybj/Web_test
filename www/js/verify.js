

$.ajax({
			dataType: "text",
			url: "/cgi-bin/main.cgi?cur_time=" + new Date().getTime(),
			data: "verify",
			method: "POST"
		}).done(
			function (result) {
				// body...
				console.log("YYYY" + result + "HHHH");
				if(result === 'fail'){
					self.location = '../index.html';
				}
			}
		).fail(
			function(result){
				console.log(result);
				self.location = '../index.html';
			}
			
		);

var TIME_OUT = 1800000;
var timeout = setTimeout("timeout_quit()", TIME_OUT);

function clear_timeout(){

	clearTimeout(timeout);
	timeout = setTimeout("timeout_quit()", TIME_OUT);
}

document.onmousemove = clear_timeout;
document.onkeydown = clear_timeout;
document.onclick = clear_timeout;

function timeout_quit(){
	self.location = '../index.html';
}
