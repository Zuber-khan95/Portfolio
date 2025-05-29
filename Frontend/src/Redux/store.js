import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import flashMessagesReducer from './flashSlice';
const store=configureStore({
reducer:{
    auth:authReducer,
    flashMessages:flashMessagesReducer,
}
});
export default store;