async function searchPokemon() {
    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase()
    const infoDiv = document.getElementById('pokemonInfo')

    if (!pokemonInput) {
        alert("Por favor, digite um nome ou ID de pokémon.")
        return
    }

    infoDiv.innerHTML = '<div class="loading">Carregando...</div>'

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`)
        if (!response.ok) {
            throw new Error("Pokémon não encontrado!")
        }
        const data = await response.json()
        displayPokemon(data)
    } catch (error) {
        infoDiv.innerHTML = `<div class="error">${error.message}</div>`
    }
}

function displayPokemon(pokemon) {
    const infoDiv = document.getElementById('pokemonInfo')
    const types = pokemon.types.map(type => type.type.name)

    const typeColors = {
        fire: '#FDDFDF',
        grass: '#DEFDE0',
        electric: '#FCF7DE',
        water: '#DEF3FD',
        ground: '#F4E7DA',
        rock: '#D5D5D4',
        fairy: '#FCEAFF',
        poison: '#98D7A5',
        bug: '#F8D5A3',
        dragon: '#97B3A6',
        psychic: '#EAEDA1',
        flying: '#F5F5F5',
        fighting: '#E6E0D4',
        normal: '#F5F5F5'
    }

    const color = typeColors[types[0]] || '#F5F5F5'

    infoDiv.innerHTML = `
        <h2>#${pokemon.id} - ${pokemon.name.toUpperCase()}</h2>
        <img class="pokemon-image" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <div class="types">
            ${types.map(type => `
                <div class="type" style="background-color: ${typeColors[type] || '#777'}">
                    ${type.toUpperCase()}
                </div>`).join('')}
        </div>
        <p> Altura: ${pokemon.height / 10} m </p>
        <p> Peso: ${pokemon.weight / 10} kg </p>
    `
    infoDiv.style.backgroundColor = color
}
