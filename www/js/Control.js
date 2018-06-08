
self.setInterval("request.updateData()", 1000);

function request_result(data) {
  // body... 

  console.log(data);

  var result = (parseInt(data) == 0)? "success!" : "fail!";

  alert(result);
}

function checkForm() {
  //var form = new FormData(document.getElementById("cell_cfg"));
  postRq = {data:{}, success:request_result, error:undefined, extdata:undefined};
  var form_data = $("#cell_cfg").serializeArray();
  $.each(form_data, function () {
    // body...
    postRq.data[this.name] = parseInt(this.value);
  });
  postRq.data["cmd"] = parseInt($("#cell_cfg").attr("value"));

  console.log(postRq.data)
  if(isNaN(postRq.data["power"]) || isNaN(postRq.data["freq"]))
  {
    alert("please set power and freq!");
    console.log("please set power and freq!");
  }
  else
  {
    request.requestData(postRq);
  }

  return false;
}

function pa0DrainSwitchOff(){
  alert("pa0DrainSwitchOff()");
}

function pa0DrainSwitchOn(){
  alert("pa0DrainSwitchOn()");
}

function pa1DrainSwitchOn(){
  alert("pa1DrainSwitchOn()");
}

function pa1DrainSwitchOff(){
  alert("pa1DrainSwitchOff()");
}

function pa1SwitchOn(){
  alert("pa1SwitchOn()");
}

function pa1SwitchOff(){
  alert("pa1SwitchOff()");
}

function pa0SwitchOn(){
  alert("pa0SwitchOn()");
}

function pa0SwitchOff(){
  alert("pa0SwitchOff()");
}