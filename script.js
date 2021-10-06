const baseURL = 'https://pokeapi.co/api/v2/'

async function getPokemon(name) {
    try {
        let response = await fetch(`${baseURL}pokemon`);
        let data = await response.json()
        let countResponse = await fetch(`${baseURL}pokemon?limit=${data.count}`);
        let countData = await countResponse.json()
        let pokemonResponse = await fetch(`${countData.results[Math.floor(Math.random() * countData.results.length)].url}`)
        let pokemonData = await pokemonResponse.json()
        let pokemonFighter = {
            name: pokemonData.name,
            image: pokemonData.sprites.back_default
        }
        let dogResponse = await fetch('https://dog.ceo/api/breeds/image/random')
        let dogFighter = await dogResponse.json()
        let fighters = [pokemonFighter, dogFighter]
        return fighters;    
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}

// fetch('https://pokeapi.co/api/v2/pokemon/ditto')
//     .then(response => response.json())
//     .then(json => console.log(json.sprites.back_default))

document.getElementById('fight').addEventListener('click', () => {
    getPokemon()
        .then(data=> { 
            document.getElementById('pokemon').innerHTML = `<p>${data[0].name}</p> <img src="${data[0].image}">`;
            document.getElementById('dog').innerHTML = `<img src="${data[1].message}">`;
        })
})