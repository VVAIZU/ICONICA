import { useRouter } from 'next/router';
import EditProduct from '../components/EditProduct';

function EditProductPage() {
  const router = useRouter();
  const { productId } = router.query;

  return (
    <div>
      <h1>Edit Product Page</h1>
      {productId && <EditProduct productId={productId} />}
    </div>
  );
}

export default EditProductPage;