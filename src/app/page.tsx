import ProductList from '@/components/ProductList';
import { Container } from '@mui/material';
import { main } from './page.css';

export default function Home() {
  return (
    <Container className={main}>
      <ProductList />
    </Container>
  );
}
