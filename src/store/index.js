import {configureStore} from '@reduxjs/toolkit';
import { rtkQueryErrorLogger } from './middleware/errorhandler';
import { setupListeners } from '@reduxjs/toolkit/query'
import rootReducer from './rootReducer';
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat([rtkQueryErrorLogger]),

});
setupListeners(store.dispatch)
export default store;
