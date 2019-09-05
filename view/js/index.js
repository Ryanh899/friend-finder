var answers = []; 
function checkIfDuplicateExists(w){
    return new Set(w).size !== w.length 
}

$('input[type=radio]').click(function () {
    var answer = $(this).val();
    var question = $(this).attr('name');
    
    answers.push({ answer, question });
    let answersQuestion = answers.map(a => a.question); 
    console.log(answers, answersQuestion); 
    console.log(answersQuestion.indexOf(question))
    let toSplice = answersQuestion.indexOf(question)
    if (checkIfDuplicateExists(answersQuestion)) {
        answers.splice(toSplice, 1); 
    } 
    console.log(`spliced answers: ${JSON.stringify(answers)}`)
});



$('#submit').on('click', function (e) {
    e.preventDefault();
    console.log('select_link clicked');


 $('#myModal').modal('show')
    var data = {};
    data.name = $('#name').val();
    data.picture = $('#picture').val()
    data.responses = answers
    console.log(data)

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/api/new',						
        success: function(data) {
            console.log('success');
            console.log(JSON.stringify(data));
            console.log(data); 
            console.log(data[0].name)

            $('#matchContainer').append(`<h2>${data[0].name}</h2>
            <img src="${data[0].picture}" alt="No picture found"  >`)
        }
    });
    
});

$('#routeHome').on('click', () => {
    console.log('go Home')
    $.get('/')
})