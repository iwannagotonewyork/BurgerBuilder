import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

const initialState = {

}

const orderReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return state;
        case actionTypes.PURCHASE_BURGER_FAIL:
            return state;
        default:
            return state;
    }
}

export default orderReducer;