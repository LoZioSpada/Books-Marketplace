const url = "https://striveschool-api.herokuapp.com/books"

const ricerca = document.querySelector('#ricerca')

// FUNZIONE PER FAR APPARIRE TUTTI I LIBRI COME CARD NEL BODY
const getBooks = () => {
    fetch(url)
        .then(response => response.json())
        .then(result => {
            let contenuto = document.querySelector('.book .row')
            contenuto.innerHTML = result.map((book) => {
                // CREAZIONE CARD
                return `
                <div class="col-6 col-md-3">
                    <div class="card mb-5" id="book_${book.asin}">
                        <img src='${book.img}' class="card-img-top">
                        <div class="card-body p-1">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">Category: ${book.category}</p>
                            <p class="card-text"> Price: ${book.price}</p>
                            <div class="d-flex justify-content-around align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16" onclick="aggiungiAlCarrello('${book.title}', '${book.price}', '${book.asin}' )">
                                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div> `
            }).join('')
        })
        .catch(error => console.log(error))
}

window.onload = () => {
    getBooks()
}


//FUNZIONE PER FAR UTILIZZARE LA RICERCA E DEVE FILTRARE IN BASE ALLE PRIME 3 LETTERE SCRITTE
const searchBook = (event) => {
    let query = event.target.value
    let tuttiTitoli = document.querySelectorAll('.card-title')
    console.log(query, tuttiTitoli[0].innerText.toLowerCase().includes(query.toLowerCase()))

    tuttiTitoli.forEach((title) => {
        const cardCorrente = title.parentElement.parentElement.parentElement
        if (!title.innerText.toLowerCase().includes(query.toLowerCase())) {
            cardCorrente.style.display = 'none'
        } else {
            cardCorrente.style.display = 'block'
        }
    })
}


// FUNZIONE PER AGGIUNGERE AL CARRELLO I LIBRI SELEZIONATI
const aggiungiAlCarrello = (title, price, asin) => {
    const book = document.querySelector('#book_' + asin)
    book.style.border = '1px solid red'
    const cart = document.querySelector('.list')
    cart.innerHTML +=
    `
        <li> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" onclick='rimuoviDalCarrello(event, ${asin}, ${price})'>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg> ${title}, ${price}</li>
    `
    const totale = document.querySelector('.totalCart')
    totale.innerText = (Number(totale.innerText) + Number(price)).toFixed(2)
}


// FUNZIONE PER RIMUOVERE IL CONTENUTO DAL CARRELLO
const rimuoviDalCarrello = (event, asin, price) => {
    event.target.closest("li").remove()
    const totale = document.querySelector('.totalCart')
    totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2)
    const book = document.querySelector('#book_' + asin)
    book.style.border = 'none'
}


// FUNZIONE PER SVUOTARE IL CARRELLO
const svuotaCarrello = () => {
    document.querySelector('.list').innerHTML = ""
    document.querySelectorAll('.card').forEach(card => card.style.border = 'none')
    const totale = document.querySelector('.totalCart')
    totale.innerText = '0'
}