define(["jquery","windows/windows","websockets/binary_websockets","datatables","jquery-growl"],function(a,b,c){"use strict";function d(b){require(["css!profittable/profitTable.css"]),b.click(function(){f?f.dialog("open"):c.cached.authorize().then(e)["catch"](function(b){a.growl.error({message:b.message})})})}function e(){f=b.createBlankWindow(a("<div/>"),{title:"Profit Table",width:900}),require(["text!profittable/profitTable.html"],function(b){b=a(b),b.appendTo(f),g=b,g=g.dataTable({data:[],columnDefs:[{targets:6,createdCell:function(b,c){var d=0>c?"red":c>0?"green":"";d&&a(b).addClass(d)}}],paging:!1,ordering:!1,searching:!0,processing:!0}),g.parent().addClass("hide-search-input"),g.api().columns().every(function(){var b=this;a("input",this.header()).on("keyup change",function(){b.search()!==this.value&&b.search(this.value).draw()})});var d=function(b){var d=a("#"+g.attr("id")+"_processing").css("top","200px").show(),e={profit_table:1,description:1,sort:"DESC"};b?e.date_from=e.date_to=b:e.limit=10;var f=function(a){var b=a.profit_table&&a.profit_table.transactions||[],c=function(a){var b=new Date(1e3*a);return b.getUTCFullYear()+"-"+("00"+(b.getUTCMonth()+1)).slice(-2)+"-"+("00"+b.getUTCDate()).slice(-2)+" "+("00"+b.getUTCHours()).slice(-2)+":"+("00"+b.getUTCMinutes()).slice(-2)+":"+("00"+b.getUTCSeconds()).slice(-2)},e=b.map(function(a){return[c(a.purchase_time),a.contract_id,a.longcode,a.buy_price,c(a.sell_time),a.sell_price,(parseFloat(a.buy_price)-parseFloat(a.sell_price)).toFixed(2)]});g.api().rows().remove(),g.api().rows.add(e),g.api().draw(),d.hide()};c.send(e).then(f)["catch"](function(b){f({}),a.growl.error({message:b.message})})};d(),f.addDateToHeader({title:"Jump to: ",date:null,changed:d,cleared:d}),f.dialog("open")})}var f=null,g=null;return{init:d}});