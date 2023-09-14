import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./root-reducer";
// import logger from "redux-logger";

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) return next(action);

    console.log("TYPE: ", action.type);
    console.log("PAYLOAD: ", action.payload);
    console.log("CURRRENT STATE: ", store.getState());

    next(action);

    console.log("NEXT STATE: ", store.getState());
};
const middleWares = [loggerMiddleware];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
