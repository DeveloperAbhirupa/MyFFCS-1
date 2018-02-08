
$(document).ready(function(){

    ///This function not running even after adding event listener on buttons TODO
    function store(element){
        alert(element.name);
    }






    $("#btn").on("click",function(){

        //input will be posted to the server
        var input = { /*$("input").attr("name")*/CODE : $("input").val() };



        //Post AJAX request to server and fetch JSON data
        $.post("/",input,function(res){


            //Clear the html of data
            $("#data").html('');


            //parse the JSON that we have got back into object
            res = JSON.parse(res);



            //set content of body
            var content = "<div class = 'content'> <h2>Theory</h2><br><h3>Morning slots</h3>";

            res.theory.morning.forEach(function(element){

                content += "<br><br><br><button onclick = 'store(" + element + " )'>Faculty: " + element.FACULTY + "<br>SLOT: " + element.SLOT + "<br>VENUE: " + element.VENUE+"</button>";

            });

                content += "<h3>Evening slots</h3>";


            res.theory.evening.forEach(function(element){

                content += "<br><br><br><button onclick = 'store(" + element + " )'>Faculty: " + element.FACULTY + "<br>SLOT: " + element.SLOT + "<br>VENUE: " + element.VENUE+"</button>";

            });

                content += "<h2>Lab</h2><br><h3>Morning slots</h3>";

            res.lab.morning.forEach(function(element){

                content += "<br><br><br><button onclick = 'store(" + element + " )'>Faculty: " + element.FACULTY + "<br>SLOT: " + element.SLOT + "<br>VENUE: " + element.VENUE+"</button>";

            });


            content += "<h3>Evening slots</h3>";


            res.lab.evening.forEach(function(element){

                content += "<br><br><br><button onclick = 'store(" + element + " )'>Faculty: " + element.FACULTY + "<br>SLOT: " + element.SLOT + "<br>VENUE: " + element.VENUE+"</button>";

            });

            content += "<h2>Project</h2>";

            res.project.forEach(function(element){

                content += "<br><br><br><button onclick = 'store(" + element + " )'>Faculty: " + element.FACULTY + "<br>SLOT: " + element.SLOT + "</button>";

            });

            content+="</div>"

            //put content html
            $("#data").html(content);

        });



            //stop the form from completing submit action
            return false;

    });



});
