import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import './cart-dropdown.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import CardItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        cartItems.length 
          ?
        (cartItems.map(({id, ...otherItemProps}) => (
          <CardItem key={id} {...otherItemProps} />
        ))) 
          :
        (<span className='empty-message'>Your cart is empty</span>)
      }
    </div>
    <CustomButton onClick={() => { dispatch(toggleCartHidden()); history.push('/checkout');}}>
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})
export default withRouter(connect(mapStateToProps)(CartDropdown));