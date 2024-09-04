import ProductList from '../../components/ProductList';
import Navbar from '../../components/Navbar';

export default function ProductListPage() {
  return (
    <main className='flex min-h-screen flex-col gap-20 items-center p-24 w-screen'>
      <Navbar />
      <ProductList />
    </main>
  );
}
