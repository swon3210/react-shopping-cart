import { useHistory } from 'react-router-dom';

import ProductGridItem from '../../components/ProductListPage/ProductGridItem/ProductGridItem';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';

import useProducts from '../../hooks/products';

import { PATH, STATUS_CODE } from '../../constants';
import { getMoneyString } from '../../utils/format';

import * as Styled from './ProductListPage.styles';
import { requestAddProductToCart } from '../../apis';
import { Product } from '../../type';

const ProductListPage = () => {
  const history = useHistory();
  const { products, loading, error } = useProducts();

  const onProductItemClick = (productId: string) => {
    history.push({ pathname: `${PATH.PRODUCT_DETAIL}/${productId}`, state: { productId } });
  };

  const onCartButtonClick = async (id: Product['id']) => {
    const product = products.find(product => product.id === id);
    if (!product) {
      return;
    }

    try {
      await requestAddProductToCart(product.id);
      alert(`'${product?.name}'을(를) 장바구니에 담았습니다.`);
    } catch (error) {
      if (error.status === STATUS_CODE.POST_FAILURE) {
        alert(`'${product?.name}'는 이미 장바구니에 담긴 상품입니다.`);
        return;
      }
      console.error(error);
    }
  };

  const productGridItemList = products.map((product: Product) => (
    <ProductGridItem
      onClick={() => onProductItemClick(product.id)}
      onCartButtonClick={() => onCartButtonClick(product.id)}
      key={product.id}
      name={product.name}
      price={getMoneyString(product.price)}
      thumbnail={product.thumbnail}
    />
  ));

  if (loading) {
    return <Loading />;
  }

  if (!loading && error) {
    return <NotFound message="상품 정보를 불러올 수 없습니다." />;
  }

  return <Styled.ProductListPage>{productGridItemList}</Styled.ProductListPage>;
};

export default ProductListPage;
