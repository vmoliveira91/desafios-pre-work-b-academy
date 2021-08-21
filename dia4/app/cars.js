const url = 'http://localhost:3333/cars'
const propriedades = ['image', 'brandModel', 'year', 'plate', 'color']
const tbody = document.querySelector('[data-js="table-body"]')
const form = document.querySelector('[data-js="form-cars"]')

const getCars = (url) => {
    const cars = fetch(url)
        .then((result) => result.json())
    
    return cars
}

const addButtonListener = (button) => {
    button.addEventListener('click', async (e) => {
        e.preventDefault

        const plate = e.target.value
        
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plate: plate,
            })
        })
        .then((result) => result.json())

        if(response.message === `O carro com placa ${plate} foi removido com sucesso`) {
            const row = e.target.parentElement.parentElement
            row.innerHTML = ''
        }

        const cars = await getCars(url)
        
        if(cars.length === 0) {
            const tr = document.createElement('tr')
            tr.textContent = 'Nenhum carro encontrado'
            tr.classList.add('empty')
            tbody.appendChild(tr)
        }        
    })    
}

const fillRow = (car) => {
    const tr = document.createElement('tr')

    propriedades.forEach((propriedade) => {
        const td = document.createElement('td')
        td.textContent = car[propriedade]
        tr.appendChild(td)
    })

    const td = document.createElement('td')
    const button = document.createElement('button')
    
    button.value = car['plate']
    button.textContent = 'Deletar'
    button.classList.add('delete')
    addButtonListener(button)

    td.appendChild(button)
    tr.appendChild(td)

    return tr
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const elements = [...e.target.elements]

    const car = {
        image: elements[0].value,
        brandModel: elements[1].value,
        year: elements[2].value,
        plate: elements[3].value,
        color: elements[4].value,
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })
    .then((result) => result.json())

    if(response.error) {
        const alreadyHasErrorMessage = document.querySelector('h3')
        if(alreadyHasErrorMessage === null) {
            const h3 = document.createElement('h3')
            h3.textContent = response.message
            h3.style.color = 'red'
            form.appendChild(h3)
        } else {
            alreadyHasErrorMessage.textContent = response.message
        }
    } else {
        const empty = document.querySelector('.empty')
        if(empty !== null)
            empty.innerHTML = ''
        
        const error = document.querySelector('h3')
        if(error !== null)
            error.innerHTML = ''
        
        tbody.appendChild(fillRow(car))
        
        e.target.reset()
        
        const imgInput = e.target.elements['image']
        imgInput.focus()       
    }    
})

const cars = await getCars(url)

if(cars.length === 0) {
    const tr = document.createElement('tr')
    tr.textContent = 'Nenhum carro encontrado'
    tr.classList.add('empty')
    tbody.appendChild(tr)
} else {
    cars.forEach((car) => {
        tbody.appendChild(fillRow(car))
    })
}