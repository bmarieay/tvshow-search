const form = document.querySelector('#searchForm')
const input = document.querySelector('input');

const processQuery = async () => {
    // const res =  await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    //instead of above we should use config object
    // const res =  await axios.get(`https://api.tvmaze.com/search/shows`, config)
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm }}
    const res =  await axios.get(`https://api.tvmaze.com/search/shows`, config)
    return res;
}
const makeShows = (shows) => {
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

const deleteShows = function () {
    const figures = document.querySelectorAll('figure')
    for(let figure of figures){
        figure.remove();
    }
}

form.addEventListener('submit', async function (e){
    e.preventDefault();
    deleteShows();
    let response = await processQuery()
    makeShows(response.data)
    this.elements.query.value = '';
})

input.addEventListener('input', async function () {
    deleteShows();
    let response = await processQuery()
    makeShows(response.data)
})

//======

