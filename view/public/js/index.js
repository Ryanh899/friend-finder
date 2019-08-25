//display page
function displayPage () {
    $.get('/')
}

//post button
$('#submit').on('click', () => {
    $.ajax({
        method: "POST",
        url: "/api/survey" 
      }).then(displayPage)
      .catch((err) => { if (err) throw err; })
})