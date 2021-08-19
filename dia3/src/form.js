const inputNome = document.querySelector('[data-js="input-nome"]')

inputNome.addEventListener('input', (e) => {
    const palavras = e.target.value.split(' ')

    console.log(palavras)

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