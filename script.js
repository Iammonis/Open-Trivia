let data
window.onload = () => {
    let form = document.querySelector("form")
    form.addEventListener('submit',handleSubmit)

    let printDiv = document.querySelector("#trivia")
    printDiv.addEventListener('click', event => {
        if(event.target.className === 'buttonClass'){
            let parent = event.target.parentElement
            let input = parent.querySelectorAll("input")
            if(input[0].checked){
                checkAns(parent, input[0])
            }
            else if(input[1].checked){
                checkAns(parent,input[1]) 
            }
        }
    })
}

const handleSubmit = () => {
    event.preventDefault()
    let form = new FormData(event.target)
    let questions = form.get('questions')
    let category = form.get('trivia_category')
    let difficulty = form.get('trivia_difficulty')
    // let type = form.get('trivia_type')
    let xhr = new XMLHttpRequest()
    let url = `https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}&type=boolean`
    xhr.open('GET', url)
    xhr.send();

    xhr.onload = () => {
        data = JSON.parse(xhr.response);
        data = data.results
        console.log(data)
        renderTrivia()
    }
}

const renderTrivia = () => {
    let print = document.querySelector("#trivia")
    print.innerHTML=""

    for(let i=0; i<data.length; i++){

        let div = document.createElement("div")
        let div1 = document.createElement("div")
        let h2 = document.createElement("h2")

        let r1 = document.createElement("input")
        let r2 = document.createElement("input")
        
        let p1 = document.createElement("p")
        let p2 = document.createElement("p")

        let btn = document.createElement("button")

        h2.innerHTML = `Question no. ${i+1} - ${data[i].question}`

        if(data[i].incorrect_answers[0] == "True"){
            r1.setAttribute("type",'radio')
            r1.setAttribute("name",'ans')
            r1.setAttribute('value','correct')
            p1.innerHTML = "True"

            r2.setAttribute("type",'radio')
            r2.setAttribute("name",'ans')
            r2.setAttribute('value','incorrect')
            p2.innerHTML = "False"
        }
        else if(data[i].incorrect_answers[0] == "False"){
            r1.setAttribute("type",'radio')
            r1.setAttribute("name",'ans')
            r1.setAttribute('value','incorrect')
            p1.innerHTML = "True"

            r2.setAttribute("type",'radio')
            r2.setAttribute("name",'ans')
            r2.setAttribute('value','correct')
            p2.innerHTML = "False"
        }

        btn.setAttribute('class','buttonClass')
        btn.innerHTML = 'Submit Answer'

        div1.append(r1,p1,r2,p2)
        div.append(h2)
        div.append(div1)
        div.append(btn)
        print.append(div)
    }            

}

const checkAns = (parent, input) => {

    let para = document.createElement('p')
    para.style.fontSize = "24px"

    if(input.value == "correct"){
        parent.querySelector("button").remove()
        let div = parent.querySelector("div")
        let correct = input.nextSibling
        div.querySelector("input").remove()
        div.querySelector("input").remove()

        correct.style.color = "#32C809"
        correct.style.fontSize = "22px"
        para.innerHTML = "CORRECT ANSWER"
        parent.append(para)

        if(correct.nextSibling !== null){
            correct.nextSibling.style.color = "#F32013"
        }
        else if(correct.previousSibling !== null){
            correct.previousSibling.style.color = "#F32013"
        }
    
    }
    else{
        parent.querySelector("button").remove()
        let div = parent.querySelector("div")
        let incorrect = input.nextSibling
        div.querySelector("input").remove()
        div.querySelector("input").remove()

        incorrect.style.color = "#F32013"
        incorrect.style.fontSize = "22px"
        para.innerHTML = "INCORRECT ANSWER"
        parent.append(para)

        if(incorrect.nextSibling !== null){
            incorrect.nextSibling.style.color = "#32C809"
        }
        else if(incorrect.previousSibling !== null){
            incorrect.previousSibling.style.color = "#32C809"
        }
    }
}