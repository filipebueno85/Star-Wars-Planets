import React, { useContext } from 'react';
import StarWasContext from '../context/StarWasContext';

function Table() {
  const { planets, filterPlanet, isLoading } = useContext(StarWasContext);
  if (isLoading) {
    return (<p>Carregando...</p>);
  }
  if (planets.length !== 0) {
    const headers = Object.keys(planets[0]);
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={ header }>{header.split('_').join(' ').toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            { planets
              ?.filter((e) => e.name.toLowerCase().includes(filterPlanet.toLowerCase()))
              .map((planet) => (
                <tr key={ planet.name }>
                  <td data-testid="planet-name">{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>
                    {planet.films.map((film) => (
                      <p key={ film }>{film}</p>
                    ))}
                  </td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
