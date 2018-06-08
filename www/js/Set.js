  
    var dataRq = {data:"para",  bindid:"", cur:0, refresh:1, success:deal_alarm_thresh, error:undefined, extdata:undefined};
    request.requestData(dataRq);
    var postRq = {data:{}, success:request_result, error:undefined, extdata:undefined};

    function request_result(data){

      //console.log(data);
      var result = (parseInt(data) == 0)? "success!" : "fail!";
      
      if(result === "success!")
      {
        setTimeout(function(){request.requestData(dataRq)}, 1000);
      }
      else request.requestData(dataRq);
      alert(result);

    }

/*
    function deal_alarm_thresh(data) {
      // body...
      
      var alarm = JSON.parse(data);
      console.log(alarm["DisThresh"]);
      $(".input-small").each(function(){
          var slash = this.name.search(/_/);
          var name = parseInt(this.name.slice(0, slash));
          var col = parseInt(this.name.slice(slash + 1));
          var val = col? alarm.DisThresh : alarm.Thresh;
          $(this).val(val[name]);
      });
      console.log(alarm.Thresh);
      
    }
*/

    function deal_alarm_thresh(data) {

      var alarm = JSON.parse(data);


      console.log(data);

      $("#threshValue").empty();

      for(var id in alarm.Thresh){

        //console.log(alarm_string[parseInt(id)]);
        $("#threshValue").append("<tr></tr>");
        var row = $("#threshValue").children("tr").eq(id);

        //console.log(alarmInfo[1].name + id );

        row.append("<td>"+ alarmInfo[parseInt(id)].name + "</td>");        
        //var input = "<td><input type=\"text\" placeholder=\"\" class=\"input-small\" style=\"height: 30px\" name=0_0 value=" + alarm.Thresh[id] + "></td>";
        var input = "<td><input type=\"text\" placeholder=\"\" class=\"input-small\" style=\"margin:0\" name=" + id + "_0 value=" + alarm.Thresh[id] + "></td>";
        row.append(input);
        var input = "<td><input type=\"text\" placeholder=\"\" class=\"input-small\" style=\"margin:0\" name=" + id + "_1 value=" + alarm.DisThresh[id] + "></td>";
        row.append(input);
        row.append("<td>"+ alarmInfo[parseInt(id)].unit + "</td>");
        //row.append("<td><input type=\"text\" placeholder=\"\" class=\"input-small\" style=\"height: 30px\" name=0_0></td>");
        //row.children("td").eq(1).append("<input type=\"text\" placeholder=\"\" class=\"input-small\" style=\"height: 30px\" name=0_0>");
      }
      $(".input-small").each(function(){
        $(this).change(function(){
          console.log(this.name);
          postRq.data[this.name] = parseInt(this.value);
        });
      });
      /*
        $("#threshValue").append("<tr>"+ index + "<\tr>");
        $("#carrier_info").children("tr").eq(index).append("<td>"+ (parseInt(index) + 1) + "</td>");
        $("#carrier_info").children("tr").eq(index).append("<td>"+ parseInt(data["Power"]) / 256 + "</td>");
        $("#carrier_info").children("tr").eq(index).append("<td>"+ data["TxFrq"] + "</td>");
        $("#carrier_info").children("tr").eq(index).append("<td>"+ data["TxNco"] + "</td>");
        $("#carrier_info").children("tr").eq(index).append("<td>"+ data["TxDatt"] + "</td>");
*/

    }



    function checkForm() {
      //var form = new FormData(document.getElementById("cell_cfg"));
      
      postRq.data["cmd"] = parseInt($("#alarm_thre").attr("value"));
      console.log(postRq.data);
      request.requestData(postRq);
      postRq.data = {};
      return false;
    }