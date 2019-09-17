var answers = []; 
function checkIfDuplicateExists(w){
    return new Set(w).size !== w.length 
}

$('input[type=radio]').click(function () {
    var answer = $(this).val();
    var question = $(this).attr('name');
    
    answers.push({ answer, question });
    let answersQuestion = answers.map(a => a.question); 
    let toSplice = answersQuestion.indexOf(question)
    if (checkIfDuplicateExists(answersQuestion)) {
        answers.splice(toSplice, 1); 
    } 
});



$('#submit').on('click', function (e) {
    e.preventDefault();

 $('#myModal').modal('show')
    var data = {};
    data.name = $('#name').val();
    data.picture = $('#picture').val()
    data.responses = answers
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/api/new',						
        success: function(data) {
            $('#matchContainer').append(`<h2>${data[0].name}</h2>
            <img src="${data[0].picture}" style:"height: 200px; width: 200px; class="img-fluid" max-width: 200px; max-height: 200px" alt="No picture found"  >`)
        }
    });
});

$('#routeHome').on('click', () => {
    location.href = '/'
})