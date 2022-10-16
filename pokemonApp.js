// const axios = require('axios').default;

// var URL = "https://pokeapi.co/api/v2/pokemon/";

// var pokemon = (pokemon) => {
//     axios.get(`${URL}${pokemon}`)
//     .then((resp) => resp.data)
//     .then((data) => {
//         console.log(data.abilities);
//         console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
//         console.log(data.sprites);
//     })
//     .catch((err) => console.log(err))
// }

// pokemon("ditto");

const axios = require('axios');

const URL = `https://pokeapi.co/api/v2/pokemon/`;
let getPokemon = async(pokemonName) => {
    let res = await axios.get(`${URL}${pokemonName}`);
    res = res.data;
    // console.log(res);
    // console.log(res.abilities);
    // console.log(res.sprites["back_default"]);
    // for(let i = 0;i<res.sprites.length;i++){
    //     console.log(res.sprites[i]);
    // }
    for (const key in res.sprites) {
        console.log(typeof res.sprites[key]);
    }
}
getPokemon(`ditto`);
