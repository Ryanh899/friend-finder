var answers = []; 

$('input[type=radio]').click(function () {
    var answer = $(this).val();
    var question = $(this).attr('name');
    
    answers.push({ answer, question });
});



$('#submit').on('click', function (e) {
    e.preventDefault();
    console.log('select_link clicked');

    for (var i = 0; i < answers.length; i++) {
        if (answers[i].question === answers[i++].question) {
            let bye = answers.splice(answers[i], 1); 
        }
    }



    var data = {};
    data.name = $('#name').val();
    data.picture = $('#picture').val()
    data.responses = answers
    console.log(data)

    // $.ajax({
    //     type: 'POST',
    //     data: JSON.stringify(data),
    //     contentType: 'application/json',
    //     url: 'http://localhost:3000/api/new',						
    //     success: function(data) {
    //         console.log('success');
    //         console.log(JSON.stringify(data));
    //     }
    // });

});