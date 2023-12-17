export function formatPrice(price: number) {
  return price.toLocaleString('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });
}
