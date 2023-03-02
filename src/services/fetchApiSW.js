export const fetchApiSW = async () => {
  // try {
  const URL = 'https://swapi.dev/api/planets';
  const response = await fetch(URL);
  const data = await response.json();
  data.results.map((res) => delete res.residents);
  // data.map((res) => delete res.residents);
  // console.log(data);
  return data.results;
  // } catch (error) {
  //   console.error(error);
  // }
};
