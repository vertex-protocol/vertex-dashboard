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
    (product) => !product.symbol.includes('PERP'),
  );
  const MMProducts = products.filter(
    (product) => !product.symbol.includes('PERP'),
  );

  return {
    PerpProducts,
    SpotProducts,
    MMProducts,
  };
}
