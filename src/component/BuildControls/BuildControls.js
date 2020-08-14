import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label: 'Meat',
        type: 'Meat',
    },
    {
        label: 'Cheese',
        type: 'Cheese',
    },
    {
        label: 'Salad',
        type: 'Salad',
    },
    {
        label: 'Bacon',
        type: 'Bacon',
    },
]

function BuildControls({totalPrice, disabledInfo, addIngredientHandler, removeIngredientHandler, purchasableInfo, ordered}) {
    return (
        <div className="BuildControls">
            <p>Current Price : <strong>{totalPrice}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                key={ctrl.label}
                label={ctrl.label} 
                disabledInfo={disabledInfo[ctrl.type]}
                addIngredientHandler={() => addIngredientHandler(ctrl.type)}
                removeIngredientHandler={() => removeIngredientHandler(ctrl.type)}
                purchasableInfo={purchasableInfo}
                />
            ))}
            <button 
                className="OrderButton" 
                disabled={!purchasableInfo}
                onClick={ordered}
            > ORDER NOW </button>
        </div>
    )
}

export default BuildControls;
