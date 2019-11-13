//lo re cambió y puso updateObject porque es un careta, creo q era más fácil antes. aunq debe ser buena práctica en ciertos casos. será más eficiente??? porque no preprocesa la función updateObject? googlear si es vrd q da mejor rendimiento


import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {    
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
        
    })
}

const fetchIngredientsFailed = (state, action) => {   
    return updateObject(state, {error: true})
}

const reducer = (state = initialState, action) => {
    switch(action.type){ //type es un payload
        case actionTypes.ADD_INGREDIENTS: 
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: 
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state);
        default:
            return state
    }
};

export default reducer

// import * as actionTypes from '../actions/actionsTypes';

// const initialState = {
//     ingredients: null,
//     totalPrice: 4,
//     error: false
// }

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }

// const reducer = (state = initialState, action) => {
//     switch(action.type){ //type es un payload
//         case actionTypes.ADD_INGREDIENTS:
//             return{
//                 ...state,
//                 ingredients: {
//                     //necesario para meterse dentro del objeto "ingredients"
//                     ...state.ingredients,
//                     [action.ingredientName]: state.ingredients[action.ingredientName] + 1
//                     //ingredientName es un payload
//                 },
//                 totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
//             }
//         case actionTypes.REMOVE_INGREDIENT:
//             return{
//                 ...state,
//                 ingredients: {
//                     //necesario para meterse dentro del objeto "ingredients"
//                     ...state.ingredients,
//                     [action.ingredientName]: state.ingredients[action.ingredientName] - 1
//                     //ingredientName es un payload
//                 },
//                 totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
//             }
//         case actionTypes.SET_INGREDIENTS: 
//             return{
//                 ...state,
//                 ingredients: {
//                     salad: action.ingredients.salad,
//                     bacon: action.ingredients.bacon,
//                     cheese: action.ingredients.cheese,
//                     meat: action.ingredients.meat
//                 },
//                 totalPrice: 4,
//                 error: false
//             }
//         case actionTypes.FETCH_INGREDIENTS_FAILED: 
//             return{
//                 ...state,
//                 error: true
//             }
//         default:
//             return state
//     }
// };

// export default reducer