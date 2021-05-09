import * as Styled from './CartItem.styles';
import Checkbox from '../../commons/Checkbox/Checkbox';
import NumberInput from '../../commons/NumberInput/NumberInput';
import trashCanSVG from '../../../assets/svgs/trash-can.svg';
import noImagePNG from '../../../assets/images/no-image.png';

export interface Props {
  name: string;
  price: string;
  thumbnail?: string;
}

const CartItem = ({ name, price, thumbnail = noImagePNG }: Props) => {
  return (
    <Styled.CartItem>
      <Checkbox />
      <Styled.Thumbnail src={thumbnail} alt="cart item thumbnail" />
      <Styled.ItemContentWrapper>
        <Styled.ItemContentTop>
          <Styled.ItemName>{name}</Styled.ItemName>
          <img src={trashCanSVG} alt="cart item delete button" />
        </Styled.ItemContentTop>
        <Styled.ItemContentBottom>
          <NumberInput initValue={1} />
          <Styled.Price>{price}원</Styled.Price>
        </Styled.ItemContentBottom>
      </Styled.ItemContentWrapper>
    </Styled.CartItem>
  );
};

export default CartItem;
