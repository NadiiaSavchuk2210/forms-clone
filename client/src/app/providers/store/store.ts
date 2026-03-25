import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '@/shared/api/baseApi';
import { formBuilderReducer } from '@/pages/form-builder/model/formBuilderSlice';
import { saveFormBuilderDraft } from '@/pages/form-builder/model/formBuilder.storage';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    formBuilder: formBuilderReducer,
  },
  middleware: (gDM) => gDM().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

store.subscribe(() => {
  saveFormBuilderDraft(store.getState().formBuilder);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
