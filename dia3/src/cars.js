const form = document.querySelector('[data-js="form-cars"]')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const table = document.querySelector('[data-js="table-body"]')

    const row = document.createElement('tr')
    const elements = [...e.target.elements]

    elements.forEach((elemento) => {
        if(elemento.value !== '') {
            const field = document.createElement('td')    
            field.textContent = elemento.value
            row.appendChild(field)
        }        
    })

    table.appendChild(row) 

    e.target.reset()

    const imgInput = e.target.elements['input-img']
    imgInput.focus()       
})