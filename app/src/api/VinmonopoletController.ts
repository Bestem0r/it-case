async function getProductsLike(shortName: string) {
  const products = fetch(
    `https://apis.vinmonopolet.no/products/v0/details-normal?productShortNameContains=${shortName}&maxResults=1`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": "9ebb6ab93fa24c9db24e26832e024834",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    });

  return products;
}

export { getProductsLike };
