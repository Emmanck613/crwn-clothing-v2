import styled from 'styled-components';

import {
  BaseButton, 
  GoogleSignInButton, 
  InvertedButton
} from '../button/button.styles';

export const CartDropownContainer = styled.div`
  position: absolute;
  width: 240px;
  max-height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  overflow-y: auto;

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }

`;

export const EmptyMessage = styled.span`
    font-size: 18px;
    margin: 50px auto;

    ${CartDropownContainer} {

    }

`;

export const CartItems = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;
