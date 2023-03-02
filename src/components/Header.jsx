import React, { useContext } from 'react';
import starwagif from '../assets/starwasplanets.gif';
import StarWasContext from '../context/StarWasContext';

function Header() {
  const {
    // sortOptions,
    setSortOptions,
    sortFilter,
    // selectSort,
    setSelectSort,
    removeAllFilters,
    removeFilter,
    handleClick,
    filterNumber,
    selectSizetFilter,
    selectSizeFilterOption,
    setSelectSizeFilterOption,
    setFilterNumber,
    filters,
    // setFilters,
    selectFilterOption,
    filterPlanet,
    selectFilter,
    setSelectFilterOption,
    setFilterPlanet,
  } = useContext(StarWasContext);
  return (
    <header>
      <div className="starWas-logo">
        <img src={ starwagif } alt="star-was" />
      </div>
      <form>
        <input
          placeholder="Busque um Planeta!"
          data-testid="name-filter"
          type="text"
          name="planet"
          value={ filterPlanet }
          id=""
          onChange={ ({ target }) => setFilterPlanet(target.value) }
        />
        <div className="form-selects">
          <label htmlFor="column">
            {/* Coluna */}
            <select
              name="selectFilterOption"
              id="column"
              data-testid="column-filter"
              value={ selectFilterOption }
              onChange={ ({ target }) => setSelectFilterOption(target.value) }
            >
              {selectFilter.map((string) => (
                <option key={ string } value={ string }>
                  {string}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="operador">
            {/* Operador */}
            <select
              name="selecSizetFilter"
              id="operador"
              data-testid="comparison-filter"
              value={ selectSizeFilterOption }
              onChange={ ({ target }) => setSelectSizeFilterOption(target.value) }
            >
              {selectSizetFilter.map((select) => (

                <option key={ select } value={ select }>
                  {select}
                </option>
              ))}
            </select>
          </label>

        </div>
        <input
          type="number"
          data-testid="value-filter"
          name="filterNumber"
          value={ filterNumber }
          onChange={ ({ target }) => setFilterNumber(target.value) }
          id=""
        />
        <button
          onClick={ handleClick }
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
        <select
          name="sortOptions"
          id=""
          data-testid="column-sort"
          onChange={ ({ target }) => setSortOptions(target.value) }
        >
          {selectFilter.map((string) => (
            <option key={ string } value={ string }>
              {string}
            </option>
          ))}
        </select>
        <div className="radio-container">
          <label htmlFor="ASC">
            <input
              className="input-radio"
              type="radio"
              name="order"
              value="ASC"
              id="ASC"
              data-testid="column-sort-input-asc"
              onChange={ ({ target }) => setSelectSort(target.value) }
            />
            ascendente
          </label>
          <label htmlFor="DESC">
            <input
              className="input-radio"
              data-testid="column-sort-input-desc"
              type="radio"
              name="order"
              value="DESC"
              id="DESC"
              onChange={ ({ target }) => setSelectSort(target.value) }
            />
            descendente
          </label>
        </div>
        <div>
          <button
            onClick={ sortFilter }
            data-testid="column-sort-button"
            type="button"
          >
            Ordenar

          </button>
          <button
            onClick={ () => removeAllFilters() }
            type="button"
            data-testid="button-remove-filters"
          >
            Remover Filtros
          </button>
        </div>
      </form>
      {filters.map((filter, index) => (
        <div className="filter-container" data-testid="filter" key={ index }>
          <p>
            { filter.filterType.split('_').join(' ').toUpperCase() }
          </p>
          <p>
            { filter.filterSize }
          </p>
          <p>
            { filter.number }
          </p>
          <button
            onClick={ () => removeFilter(filter.filterType) }
            type="button"
          >
            x
          </button>
        </div>
      ))}
    </header>
  );
}

export default Header;
