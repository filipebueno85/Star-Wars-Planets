import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchApiSW } from '../services/fetchApiSW';
import StarWasContext from './StarWasContext';

function StarWasProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planets2, setPlanets2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterPlanet, setFilterPlanet] = useState('');
  // const [filterBool, setFilterBool] = useState(false);
  const [selectFilter, setSelectFilter] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
  const [selectFilterOption, setSelectFilterOption] = useState('population');
  const [selectSizetFilter, setSelectSizeFilter] = useState([
    'maior que',
    'menor que',
    'igual a']);
  const [selectSizeFilterOption, setSelectSizeFilterOption] = useState('maior que');
  const [filterNumber, setFilterNumber] = useState('0');
  const [filters, setFilters] = useState([]);

  const [selectSort, setSelectSort] = useState('');
  const [sortOptions, setSortOptions] = useState('population');
  // filtros de comparação
  const filtered = useCallback(({ filterType,
    number, filterSize }) => {
    if (filterSize === 'maior que') {
      const newFilterPlanet = planets
        .filter((planet) => Number(planet[filterType]) > Number(number)
        && planet[filterType] !== 'unknown');
      return setPlanets(newFilterPlanet);
    }
    if (filterSize === 'menor que') {
      const newFilterPlanet = planets
        .filter((planet) => Number(planet[filterType]) < Number(number)
        && planet[filterType] !== 'unknown');
      return setPlanets(newFilterPlanet);
    }
    const newFilterPlanet = planets
      .filter((planet) => Number(planet[filterType]) === Number(number)
      && planet[filterType] !== 'unknown');
    return setPlanets(newFilterPlanet);
  }, [planets]);

  const removeSameFilters = useCallback(() => {
    const removedFilter = selectFilter
      .filter((element) => element !== selectFilterOption);
    setSelectFilter(removedFilter);
    setSelectFilterOption(removedFilter[0]);
  }, [selectFilter, selectFilterOption]);

  // função par remover todos os filtros
  const removeAllFilters = useCallback((removeAll) => {
    const removeAllF = filters.filter((filter) => {
      filter = removeAll;
      return filter;
    });
    setFilters(removeAllF);
    setPlanets(planets2);
    setSelectFilter(['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water']);
  }, [filters, planets2]);

  // remover filtros encadeados e unitarios
  const removeFilter = useCallback((filterSelect) => {
    const removeF = filters.filter((el) => el.filterType !== filterSelect);
    console.log(filterSelect);
    console.log(removeF);
    setFilters(removeF);
    setPlanets(planets2);
    setSelectFilter(['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water']);
  }, [filters, setPlanets, planets2]);

  const sortFilter = useCallback((() => {
    // console.log('aqui');
    const Um = -1;
    const planetSort = [...planets];
    if (selectSort === 'ASC') {
      const sortPlanets = planetSort
        .sort((a, b) => {
          if (b[sortOptions] === 'unknown') {
            return Um;
          }
          return (a[sortOptions] - b[sortOptions]);
        });
        // a[sortOptions] - b[sortOptions])
      setPlanets(sortPlanets);
    } else {
      const sortPlanets = planetSort
        .sort((a, b) => b[sortOptions] - a[sortOptions]);
      setPlanets(sortPlanets);
    }
  }), [planets, selectSort, sortOptions]);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    const filterObj = {
      filterType: selectFilterOption,
      filterSize: selectSizeFilterOption,
      number: filterNumber,
    };
    setFilters([...filters, filterObj]);
    // filtered(planets);
    removeSameFilters();
  }, [filterNumber,
    selectFilterOption,
    selectSizeFilterOption, filters, removeSameFilters]);

  const apiPlanets = async () => {
    setIsLoading(true);
    const result = await fetchApiSW();
    // const resultSort = result.sort();
    setPlanets(result);
    setPlanets2(result);
    setIsLoading(false);
  };

  useEffect(() => {
    apiPlanets();
  }, []);

  useEffect(() => {
    for (let index = 0; index < filters.length; index += 1) {
      filtered(filters[index]);
    }
  }, [filters]);

  const values = useMemo(() => ({
    sortOptions,
    setSortOptions,
    removeFilter,
    isLoading,
    sortFilter,
    selectSort,
    setSelectSort,
    removeAllFilters,
    handleClick,
    selectFilterOption,
    setSelectFilterOption,
    selectSizeFilterOption,
    setSelectSizeFilterOption,
    planets,
    planets2,
    filters,
    filterNumber,
    selectSizetFilter,
    setSelectSizeFilter,
    setFilterNumber,
    setFilters,
    filterPlanet,
    selectFilter,
    setSelectFilter,
    setFilterPlanet,
    setPlanets,
  }), [handleClick,
    isLoading,
    sortOptions,
    removeAllFilters,
    removeFilter,
    selectSort,
    sortFilter,
    selectFilterOption,
    selectSizeFilterOption,
    planets,
    planets2,
    filters,
    filterNumber,
    selectSizetFilter,
    filterPlanet,
    selectFilter]);

  return (
    <StarWasContext.Provider value={ values }>
      { children }
    </StarWasContext.Provider>
  );
}

export default StarWasProvider;

StarWasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
