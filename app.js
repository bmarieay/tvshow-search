const form = document.querySelector('#searchForm')
const input = document.querySelector('input');
form.addEventListener('submit', async function (e){
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm }}
    // const res =  await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    //instead of above we should use config object
    const res =  await axios.get(`https://api.tvmaze.com/search/shows`, config)
    makeImages(res.data)
    console.log(res.data)
    form.elements.query.value = '';
})
const deleteButton = document.querySelector('#delete')

deleteButton.addEventListener('click', () => {
    deleteShows();
})


input.addEventListener('input', async function () {
    deleteShows();
    const searchTerm = form.elements.query.value;
    console.log(searchTerm)
    const config = { params: { q: searchTerm }}
    const res =  await axios.get(`https://api.tvmaze.com/search/shows`, config)
    makeImages(res.data)
})

const deleteShows = function () {
    const figures = document.querySelectorAll('figure')
    for(let figure of figures){
        figure.remove();
    }
}

const makeImages = (shows) => {
    for(let result of shows){
        if(result.show.image){
            const container = document.createElement('FIGURE');
            const img = document.createElement('IMG');
            const title = document.createElement('FIGCAPTION')
            title.textContent = result.show.name;
            img.src = result.show.image.medium;
            container.append(img)
            container.append(title)
            container.style.display = 'inline-block'
            title.style.textAlign = 'center'
            document.body.append(container);
        }
    }
}


//======

