import ProductDetail from '@/components/ProductDetail';
import axios from 'axios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProduct(id);

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

async function getProduct(id: string) {
  // TODO: 나중에 swegger + Open API generator로 타입 자동 생성한거 이용하기
  const { data: product } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`,
  );

  return product;
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  try {
    const product = await getProduct(id);
    if (!product) throw new Error('Not found');
    return <ProductDetail product={product} />;
  } catch (e) {
    notFound();
  }
}
