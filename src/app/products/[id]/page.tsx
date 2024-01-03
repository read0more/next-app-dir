import ProductDetail from '@/components/ProductDetail';
import axios from 'axios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  try {
    // 이건 cache에서 안가져오는 모양...
    console.time('getProduct in metadata');
    const product = await getProduct(id);
    console.timeEnd('getProduct in metadata');

    return {
      title: product?.name,
      description: product?.description,
      openGraph: {
        url: `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`,
        title: product?.name,
        description: product?.description,
        images: [
          {
            url: product?.image_url,
            width: 300,
            height: 300,
            alt: product?.name,
          },
        ],
      },
    };
  } catch (e) {
    notFound();
  }
}

// async function getProduct(id: string) {
//   const { data: product } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`,
//   );

//   return product;
// }

const getProduct = cache(async (id: string) => {
  // TODO: 나중에 swegger + Open API generator로 타입 자동 생성한거 이용하기
  const { data: product } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`,
  );

  return product;
});

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  try {
    console.time('getProduct1');
    const product = await getProduct(id);
    console.timeEnd('getProduct1');

    // getProduct를 cahce한 덕에 product2는 빠르게 가져온다.
    console.time('getProduct2');
    const product2 = await getProduct(id);
    console.log(product2);
    console.timeEnd('getProduct2');
    if (!product) throw new Error('Not found');
    return <ProductDetail product={product} />;
  } catch (e) {
    notFound();
  }
}
