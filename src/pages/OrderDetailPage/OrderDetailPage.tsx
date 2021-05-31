import * as Styled from './OrderDetailPage.styles';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import ItemGroup from '../../components/commons/ItemGroup/ItemGroup';
import ListItem from '../../components/commons/ListItem/ListItem';
import Button from '../../components/commons/Button/Button';
import leftArrowSVG from '../../assets/svgs/left-arrow.svg';
import { COLORS, PATH } from '../../constants';
import TotalPrice from '../../components/OrderDetailPage/TotalPrice/TotalPrice';
import useOrderDetail from '../../hooks/useOrderDetail';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import { useHistory } from 'react-router';
import { getMoneyString } from '../../utils/format';
import { requestAddProductToCart } from '../../apis';
import { Product } from '../../type';
import useSnackbar from '../../hooks/layout/useSnackbar';
import useConfirmModal from '../../hooks/layout/useConfirmModal';
import useCart from '../../hooks/useCart';
import { TEST_ID } from '../../constants/test';

const OrderDetailPage = () => {
  const [orderId] = window.location.hash.split('/').slice(-1);
  const history = useHistory();

  const { isCartHasProduct } = useCart();
  const { orderItems, loading, responseOK, getOrderedProduct } = useOrderDetail(orderId);
  const { showSnackbar, SnackbarContainer } = useSnackbar();

  const { changeConfirmAction, showConfirmModal, ConfirmModalContainer } = useConfirmModal();

  const onCartButtonClick = async (id: Product['id']) => {
    const product = getOrderedProduct(id);
    if (!product) {
      return;
    }

    if (isCartHasProduct(product.name)) {
      showSnackbar(`'${product.name}'은(는) 이미 장바구니에 담긴 상품입니다`);
      return;
    }

    showConfirmModal(`'${product?.name}'을(를) 장바구니에 담으시겠습니까?`);
    changeConfirmAction(async () => {
      try {
        await requestAddProductToCart(product.id);
        showSnackbar(`'${product?.name}'을(를) 장바구니에 담았습니다.`);
      } catch (error) {
        showSnackbar('상품을 장바구니에 담지 못했습니다.');
      }
    });
  };

  const onOrderListLinkButtonClick = () => {
    history.push(PATH.ORDER_LIST);
  };

  const orderItemList = orderItems.map(orderItem => (
    <Styled.OrderWrapper key={orderItem.id}>
      <ListItem
        size="MD"
        name={orderItem.name}
        price={orderItem.price}
        quantity={orderItem.quantity}
        thumbnail={orderItem.thumbnail}
      />
      <Button size="SM" onClick={() => onCartButtonClick(orderItem.id)}>
        장바구니 담기
      </Button>
    </Styled.OrderWrapper>
  ));

  const totalPrice = getMoneyString(
    orderItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0)
  );

  if (loading) {
    return <Loading />;
  }

  if (!loading && !responseOK) {
    return <NotFound message="주문 목록 정보를 불러올 수 없습니다." />;
  }

  return (
    <Styled.OrderListPage data-testid={TEST_ID.ORDER_DETAIL_PAGE}>
      <Styled.PageWrapper>
        <Styled.PageTitleWrapper>
          <PageTitle>주문내역상세</PageTitle>
        </Styled.PageTitleWrapper>
        <Styled.ItemGroupWrapper>
          <ItemGroup headerText={`주문번호 : ${orderId}`}>{orderItemList}</ItemGroup>
        </Styled.ItemGroupWrapper>
        <Styled.PageBottom>
          <Button size="MD" backgroundColor={COLORS.BROWN_500} onClick={onOrderListLinkButtonClick}>
            <img src={leftArrowSVG} alt="주문목록 돌아가기" />
            &nbsp;&nbsp;주문목록 돌아가기
          </Button>
          <TotalPrice title="결제금액 정보" priceLabel="총 결제금액" price={totalPrice} />
        </Styled.PageBottom>
      </Styled.PageWrapper>
      <SnackbarContainer />
      <ConfirmModalContainer />
    </Styled.OrderListPage>
  );
};

export default OrderDetailPage;
