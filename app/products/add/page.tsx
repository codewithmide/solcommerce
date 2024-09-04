import ProductForm from '@/app/components/ProductForm';
import Navbar from '@/app/components/Navbar';

export default function AddProductPage() {
  return (
    <main className='flex min-h-screen flex-col gap-20 items-center p-24 w-screen'>
      <Navbar />
      <ProductForm />
    </main>
  );
}
