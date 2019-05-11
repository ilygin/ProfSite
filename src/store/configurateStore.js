import rootReducer from '../../src/reducers/';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

export default function configurateStore(initialState) {
    const store = createStore(rootReducer, applyMiddleware(
        thunkMiddleware, // позволяет нам отправлять функции
        logger
    ));

    if (module.hot) {
        module.hot.accept('../../src/reducers/', () => {
            const nextRootReducers = require('../../src/reducers/');
            store.replaceReducer(nextRootReducers);
        })
    }

    return store;
}