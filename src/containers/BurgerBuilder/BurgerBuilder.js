import React from 'react';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/orderSummary/orderSummary';
import axios from '../../axios-orders';
import Spinner from '../../component/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../Store/actions/index';

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,  //Order Now Button Click or not ?
        }
    }
    
    componentDidMount() {
        this.props.initIngredient();
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        }else {
            this.props.history.push('/Auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.purchasedInit();
        this.props.history.push('/checkout');
    }

    updatePurchaseState = (updatedIngredients) => { //ORDER NOW 버튼 disalbed 속성 설정해주는 함수
        const sum = Object.keys(updatedIngredients) // [Meat, Cheese, Salad, Bacon]
            .map(ingre => {
                return updatedIngredients[ingre]; // [0, 0, 0, 0]
            })
            .reduce((acc, el) => {
                return acc + el;
            }, 0);
        return sum > 0;
    }

    addIngredientHandler = (type) => {
        this.props.addIngredient(type);
        this.updatePurchaseState(this.props.ingre);
    }

    removeIngredientHandler = (type) => {
        this.props.removeIngredient(type);
        this.updatePurchaseState(this.props.ingre);
    }

    render() {
        const disabledInfo = {
            ...this.props.ingre
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        const { purchasing } = this.state;

        // orderSummary Config
        let orderSummary = null;
        if(this.props.ingre) {
            orderSummary = (
                        <OrderSummary 
                            continueClicked={this.purchaseContinueHandler} 
                            cancleClicked={this.purchaseCancelHandler} 
                            totalPrice={this.props.totPrice}
                            ingredients={this.props.ingre}>
                        </OrderSummary>
            )
            if(this.state.onOrder) {
                orderSummary = <Spinner></Spinner>
            }
        }

        // BurgerBuilder Config
        let burger = this.props.err ? <p style={{textAlign: "center"}}>You can't load ingredients</p> : <Spinner />
        if(this.props.ingre) {
            burger = (
                <>
                    <Burger ingredient={this.props.ingre}/>
                    <BuildControls 
                            totalPrice={this.props.totPrice}
                            disabledInfo={disabledInfo} 
                            addIngredientHandler={(type) => this.addIngredientHandler(type)} 
                            removeIngredientHandler={(type) => this.removeIngredientHandler(type)}
                            isAuth={this.props.isAuthenticated}
                            purchasableInfo={this.updatePurchaseState(this.props.ingre)}
                            ordered={this.purchaseHandler}
                    />
                </>
            )
        }

        return (
            <>
                {burger}
                <Modal modalClosed={this.purchaseCancelHandler} show={purchasing}>
                    {orderSummary}
                </Modal>
            </>
        )
    } 
}

const mapStateToProps = state => {
    return {
        ingre: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingreName) => dispatch(actions.addIngredient(ingreName)),
        removeIngredient: (ingreName) => dispatch(actions.removeIngredient(ingreName)),
        initIngredient: () => dispatch(actions.initIngredient()),
        purchasedInit: () => dispatch(actions.purchaseInit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));


