let data
window.onload = () => {
    let form = document.querySelector("form")
    form.addEventListener('submit',handleSubmit)
}

const handleSubmit = () => {
    event.preventDefault()
    let form = new FormData(event.target)
    let questions = form.get('questions')
    let category = form.get('trivia_category')
    let difficulty = form.get('trivia_difficulty')
    let type = form.get('trivia_type')
    let xhr = new XMLHttpRequest()
    let url = `https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}&type=${type}`
    xhr.open('GET', url)
    xhr.send();

    xhr.onload = () => {
        data = JSON.parse(xhr.response);
        data = data.results
        renderTrivia()
    }
}

const renderTrivia = () => {
    console.log(data)
}