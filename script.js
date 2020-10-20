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
    let data;
    let xhr = new XMLHttpRequest()
    let url = `https://opentdb.com/api.php?amount=${questions}`
    xhr.open('GET', )
}