export async function loadExchange(date) {
  const response = await fetch(`https://api.exchangeratesapi.io/${date}?symbols=CAD&base=USD`);
  const json = await response.json();
  const {
    rates: { CAD },
  } = json;
  return CAD;
}
