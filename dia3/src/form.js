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

const form = document.querySelector('[data-js="form-nome"]')

form.appendChild(document.createElement('hr'))

const select = document.createElement('select')
select.multiple = true

const cores = ['blue', 'green', 'red', 'pink', 'purple']

cores.forEach((cor) => {
    const option = document.createElement('option')
    option.value = cor
    option.textContent = cor
    select.appendChild(option)
})

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