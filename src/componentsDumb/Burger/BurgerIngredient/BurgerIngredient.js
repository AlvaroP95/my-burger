import React from 'react';

const burgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type){
        case('bread-bottom'):
            ingredient = <div className={classes.breadBottom}></div>;
            break;
        case('bread-top'):
        ingredient = (
            <div className={classes.breadBottom}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case('meat'):
            ingredient = <div className={classes.breadBottom}></div>;
            break;
        case('cheese'):
            ingredient = <div className={classes.breadBottom}></div>;
            break;
        case('bacon'):
            ingredient = <div className={classes.breadBottom}></div>;
            break;
        case('salad'):
            ingredient = <div className={classes.breadBottom}></div>;
            break;
        default:
            ingredient = null;        
    }
    return ingredient;
};

export default burgerIngredient;