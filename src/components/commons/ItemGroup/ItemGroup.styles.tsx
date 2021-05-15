import styled from 'styled-components';

export const ItemGroup = styled.div`
  border: 1px solid ${({ theme }) => theme.GRAY_400};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.GRAY_100};
  padding: 36px 39px;
  border-bottom: 2px solid ${({ theme }) => theme.GRAY_400};
  color: ${({ theme }) => theme.TEXT_COLOR};
  font-size: 20px;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

export const HeaderText = styled.span``;

export const HeaderLink = styled.button``;

export const ItemContainer = styled.div``;
