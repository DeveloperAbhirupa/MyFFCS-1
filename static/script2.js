//this function runs when any of the details button is clicked
function store(data){

    $.post("/timetable/save",data,function(res){

        if(res.status == "clashed"){
            alert("Slot(s) clashed! "+res.info+" Slot was clashed");
        } else if(res.status == "limit"){
            alert("You cannot register more than 27 credits! You can only register "+res.info+" more credits");
        } else{
            alert("Updated! As of now you have "+res.info+" credits");
            $("#courses").append("<br><button style='color:red'> Faculty: " + res.course.FACULTY + "<br>SLOT: " + res.course.SLOT + "<br>VENUE: " + res.course.VENUE+"</button><button onclick = 'del("+JSON.stringify(res.course)+")'>Delete</button>");
            $('#credits').html("Total Credits: "+ ( res.info ).toString() );
        }
    });

}





//deletes elements after clicking on button, reaches /timetable/delete using $.ajax's delete method

function del(element){

    $.ajax({
        url:'/timetable/del',
        type:'DELETE',
        data:element,
        success:function(){
            console.log("Successfully sent the delete request");
            location.reload();
        },
        error:function(){
            console.log("Error sending delete AJAX request");
        }
    });
}




function predictHandler(data){
    $("#code").val(data.code)
    $("#predictions").html('');
}



//TODO predictive text
$(document).ready( ()=>{

    $("#code").on("keyup",()=>{

        $.post('/timetable/predict', { code:$("#code").val().toUpperCase() }, (res)=>{

            var content = '',i=0;

            //shows only top 5 hits, and appends the details in contents
            for(element of res){
                content += "<button onclick = 'predictHandler("+JSON.stringify(element)+")'><h3>"+element.code+"   "+element.title+"</h3></button><br>";
            }

            //changes html of page to show prediction results
            $("#predictions").html(content);

        });


    });


});
