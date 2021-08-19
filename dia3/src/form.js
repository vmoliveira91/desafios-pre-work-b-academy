import './style.css'

const inputNome = document.querySelector('[data-js="input-nome"]')

inputNome.addEventListener('input', (e) => {
    const palavras = e.target.value.split(' ')

    const palavrasFormatadas = palavras.map((palavra) => {
        switch(palavra.toLowerCase()) {
            case '':
            case 'de':
            case 'da':
            case 'das':
            case 'do':
            case 'dos':
                return palavra.toLowerCase()
            default:
                return palavra[0].toUpperCase() + palavra.slice(1).toLowerCase()
        }
    })

    e.target.value = palavrasFormatadas.join(' ')
})

const form = document.querySelector('[data-js="form"]')

form.appendChild(document.createElement('hr'))

const select = document.createElement('select')
select.multiple = true

const option1 = document.createElement('option')
option1.value = 'blue'
option1.textContent = 'Blue'

const option2 = document.createElement('option')
option2.value = 'green'
option2.textContent = 'Green'

const option3 = document.createElement('option')
option3.value = 'red'
option3.textContent = 'Red'

const option4 = document.createElement('option')
option4.value = 'pink'
option4.textContent = 'Pink'

const option5 = document.createElement('option')
option5.value = 'purple'
option5.textContent = 'Purple'

select.appendChild(option1)
select.appendChild(option2)
select.appendChild(option3)
select.appendChild(option4)
select.appendChild(option5)

form.appendChild(select)

form.appendChild(document.createElement('hr'))

select.addEventListener('change', (e) => {
    const existentes = document.querySelectorAll('div.container')

    for(let i = 0; i < existentes.length; i++)
        form.removeChild(existentes[i])

    const selecteds = [...e.target.selectedOptions]
    
    selecteds.map((elemento) => {
        const div = document.createElement('div')
        div.classList.add('container')
        div.classList.add(elemento.value)
        
        form.appendChild(div)
    })
})