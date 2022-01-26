import { useCallback, useEffect, useMemo, useState } from "react";
import { getAll, getByName, Pokemon } from "./API";


interface PokemonWithPower extends Pokemon {
  power: number;
}

const calculatePower = (pokemon: Pokemon) =>
  pokemon.hp +
  pokemon.attack +
  pokemon.defense +
  pokemon.special_attack + 
  pokemon.special_defense +
  pokemon.speed;

  let tableRender = 0

const PokemonTable: React.FunctionComponent<{
  pokemon: PokemonWithPower[];
}> = ({ pokemon }) => {
  console.log(`tableRender ${tableRender++}`);
  return (
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Type</td>
          <td colSpan={6}>Stats</td>
          <td>Power</td>
        </tr>
      </thead>
      <tbody>
        {pokemon.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.type.join(",")}</td>
            <td>{p.hp}</td>
            <td>{p.attack}</td>
            <td>{p.defense}</td>
            <td>{p.special_attack}</td>
            <td>{p.special_defense}</td>
            <td>{p.speed}</td>
            <td>{p.power}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

let appRender = 0

function App() {
  console.log(`appRender ${appRender++}`);
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [threshold, setThreshold] = useState<number>(Number())
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    getByName(search).then(setPokemon)
  }, [search])
  const pokemonWithPower = useMemo(() => 
          pokemon.map((p) => ({...p, power: calculatePower(p)}))
  , [pokemon])
  const powerOverThreshold = useMemo(() =>
          pokemonWithPower.filter(p => p.power > threshold).length
  ,[pokemonWithPower, threshold])

  const onThresholdChange = useCallback(
    (e:React.ChangeEvent<HTMLInputElement> ) => {
      setThreshold(Number(e.target.value))
    },
    []
  )

  const onSearchChange = useCallback(
    (e:React.ChangeEvent<HTMLInputElement> ) => {
      setSearch(e.target.value)
    }, 
    [])

  const min = useMemo(
    () => Math.min(...pokemonWithPower.map(p => p.power))
  , [pokemonWithPower])

  const max = useMemo(
    () => Math.max(...pokemonWithPower.map(p => p.power))
  , [pokemonWithPower])

  return (
    <div>
      <div className="top-bar">
        <div>Search</div>
        <input type="text" value={search} onChange={onSearchChange} ></input>
        <div>Power threshold</div>
        <input type="text" value={threshold} onChange={onThresholdChange}></input>
        <div>Count over threshold: {powerOverThreshold} </div>
      </div>
      <div className="two-column">
        <PokemonTable pokemon={pokemonWithPower} />
        <div>
          <div>Min: {min} </div>
          <div>Max: {max} </div>
        </div>
      </div>
    </div>
  );
}

export default App;
