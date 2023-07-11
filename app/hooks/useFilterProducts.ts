interface Product {
  product_id: number;
  symbol: string;
}

export function useFilterProducts(products: Product[] | null) {
  if (!products) {
    return null;
  }
  const PerpProducts = products.filter((product) =>
    product.symbol.includes('PERP'),
  );
  const SpotProducts = products.filter(
    (product) =>
      !product.symbol.includes('PERP') && !product.symbol.includes('USDC'),
  );
  const MMProducts = products.filter(
    (product) => !product.symbol.includes('PERP'),
  );

  const filteredProducts = {
    PerpProducts: [{ product_id: 'all', symbol: 'ALL-PERP' }, ...PerpProducts],
    SpotProducts: [{ product_id: 'all', symbol: 'ALL-SPOT' }, ...SpotProducts],
    MMProducts: [{ product_id: 'all', symbol: 'ALL-MKTS' }, ...MMProducts],
  };

  return filteredProducts;
}
