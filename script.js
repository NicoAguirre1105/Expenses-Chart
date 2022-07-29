function main(data) {

    function hoverEffect() {
        for (let i = 0; i < days.length; i++) {
            days[i].addEventListener('mouseover', function (){mouseOver(i)})
            days[i].addEventListener('mouseout', function (){mouseOut(i)})
        }
    }

    function mouseOver(index) {
        hover_amounts[index].style.visibility = 'visible'
    }

    function mouseOut(index) {
        hover_amounts[index].style.visibility = 'hidden'
    }

    function selectDay() {
        days[date.getDay()].classList = 'progress-bar today'
    }

    const days = document.getElementsByClassName('progress-bar'),
        hover_amounts = document.getElementsByClassName('amount'),
        date = new Date
    
    let amounts = [],
        counter = 0, 
        max_value

    data.forEach(value => {
        amounts.push(value.amount)
        if (value.amount == data[0].amount) {
            max_value = value.amount
            return
        }
        if (max_value > value.amount) {
            return
        }
        max_value = value.amount
    });

    amounts.forEach(amount => {
        const value = (amount * 18) / max_value,
            height = value.toFixed(2) + 'vh',
            text = '$' + amount
        days[counter].style.height = height
        hover_amounts[counter].innerHTML = text
        counter ++
    });

    hoverEffect()
    selectDay()
}

fetch("data.json")
    .then(response => response.json())
    .then(json => {
        main(json)
    })