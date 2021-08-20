async function getCars(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response
}

const cars = await getCars('http://localhost:3333/cars')
    .then((result) => result.ok && result.json())

const propriedades = ['image', 'brandModel', 'year', 'plate', 'color']

const tbody = document.querySelector('[data-js="table-body"]')

if(cars.length === 0) {
    const tr = document.createElement('tr')
    tr.textContent = 'Nenhum carro encontrado'
    tbody.appendChild(tr)
} else {
    cars.forEach((car) => {
        const tr = document.createElement('tr')
        propriedades.forEach((propriedade) => {
            const td = document.createElement('td')
            td.textContent = car[propriedade]
            tr.appendChild(td)
        })
        tbody.appendChild(tr)
    })
}