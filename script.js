const baseURL = 'https://pokeapi.co/api/v2/'

const getPokemon = async () => {
    try {
        let response = await fetch(`${baseURL}pokemon`);
        let data = await response.json()

        let pokemonResponse = await fetch(`${baseURL}pokemon/${Math.floor(Math.random() * data.count)}`)
        let pokemonData = await pokemonResponse.json()
        let pokemonFighter = {
            name: pokemonData.name,
            image: pokemonData.sprites.back_default
        }
        return pokemonFighter;    
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}

const getDog = async () => {
    try {
        let dogResponse = await fetch('https://dog.ceo/api/breeds/image/random')
        let dogFighter = await dogResponse.json()
        return dogFighter;    
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}

const getFighters = async () => {
    try {
        const pokemonFighter = await getPokemon().then(data => data);
        const dogFighter = await getDog().then(data => data);
        const fighters = [pokemonFighter, dogFighter];
        return fighters;
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    } 
}

document.getElementById('fight').addEventListener('click', () => {
    getFighters()
    .then( ([pokemon, dog]) => {
        document.getElementById('pokemon').innerHTML = `<p>${pokemon.name}</p> <img src="${pokemon.image}">`;
        document.getElementById('dog').innerHTML = `<img src="${dog.message}">`;
    });
})