const fetchPokemon = ()  => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    
    const pokemonPromises = []

    for(i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
        fetch(getPokemonUrl(i)).then(response => response.json())
}

Promise.all(pokemonPromises)
    .then(pokemons => {
        const liPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)

            accumulator += `
            <li class="card ${types[0]}">
            <img class="card-image" alt="${pokemon.name}" src="${pokemon.sprites.other.dream_world.front_default}"></img> 
                 <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                 <p class="card-subtitle">${types.join(' | ')}</p>
            </li>`
            return accumulator
        }, '')

        const ul = document.querySelector('[data-js="pokedex"]')

        ul.innerHTML = liPokemons
    })

}
fetchPokemon()