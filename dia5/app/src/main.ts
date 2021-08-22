import './style.css'
import { get, post, del } from './http'

type Car = {
  image: string
  brandModel: string
  year: string
  plate: string
  color: string
}

type Image = {
  src: string
  alt: string
}

type Element = {
  type: string
  value: string | Image
}

type ElementTypes = {
  [property: string]: (data: string | Image) => HTMLDivElement
  //text?: (value: string) => HTMLDivElement
  //color?: (value: string) => HTMLDivElement
}

const url = 'http://localhost:3333/cars'
const form = document.querySelector<HTMLDivElement>('[data-js="cars-form"]')!
const table = document.querySelector<HTMLDivElement>('[data-js="table"]')!

const getFormElement = (event) => (elementName: string) => {
  return event.target.elements[elementName]
}

const elementTypes: ElementTypes = {
  'image': createImage,
  'text': createText,
  'color': createColor,
}

function createImage (data: string | Image): HTMLDivElement {
  const td = document.createElement('td')
  const img = document.createElement('img')
  if(typeof data === 'object') {
    img.src = data.src
    img.alt = data.alt
  }
  img.width = 100
  td.appendChild(img)
  return td
}

function createText (value: string | Image): HTMLDivElement {
  const td = document.createElement('td')
  if(typeof value === 'string')
    td.textContent = value
  return td
}

function createColor (value: string | Image): HTMLDivElement {
  const td = document.createElement('td')
  const div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  if(typeof value === 'string')
    div.style.background = value
  td.appendChild(div)
  return td
}

form.addEventListener('submit', async (e: Event) => {
  e.preventDefault()
  const getElement = getFormElement(e)

  const data = {
    image: getElement('image').value,
    brandModel: getElement('brand-model').value,
    year: getElement('year').value,
    plate: getElement('plate').value,
    color: getElement('color').value,
  }

  const result = await post(url, JSON.stringify(data))

  if (result.error) {
    console.log('deu erro na hora de cadastrar', result.message)
    return
  }

  const noContent = document.querySelector('[data-js="no-content"]')
  if (noContent) {
    table.removeChild(noContent)
  }

  createTableRow(data)

  e.target.reset()
  image.focus()
})

function createTableRow (data: Car) {
  const elements: Element[] = [
    { type: 'image', value: { src: data.image, alt: data.brandModel } },
    { type: 'text', value: data.brandModel },
    { type: 'text', value: data.year },
    { type: 'text', value: data.plate },
    { type: 'color', value: data.color }
  ]

  const tr = document.createElement('tr')
  tr.dataset.plate = data.plate

  elements.forEach((element: Element) => {
    const td = elementTypes[element.type](element.value)
    tr.appendChild(td)
  })

  const button = document.createElement('button')
  button.textContent = 'Excluir'
  button.dataset.plate = data.plate

  button.addEventListener('click', handleDelete)

  tr.appendChild(button)

  table.appendChild(tr)
}

async function handleDelete (e) {
  const button = e.target
  const plate = button.dataset.plate
  
  const result = await del(url, JSON.stringify({ plate }))

  if (result.error) {
    console.log('erro ao deletar', result.message)
    return
  }

  const tr = document.querySelector<HTMLDivElement>(`tr[data-plate="${plate}"]`)!
  table.removeChild(tr)
  button.removeEventListener('click', handleDelete)

  const allTrs = table.querySelector('tr')
  if (!allTrs) {
    createNoCarRow()
  }
}

function createNoCarRow () {
  const tr = document.createElement('tr')
  const td = document.createElement('td')
  const thsLength: string = document.querySelectorAll('table th').length.toString()
  td.setAttribute('colspan', thsLength)
  td.textContent = 'Nenhum carro encontrado'

  tr.dataset.js = 'no-content'
  tr.appendChild(td)
  table.appendChild(tr)
}

async function main () {
  const result = await get(url)

  if (result.error) {
    console.log('Erro ao buscar carros', result.message)
    return
  }

  if (result.length === 0) {
    createNoCarRow()
    return
  }

  result.forEach(createTableRow)
}

main()