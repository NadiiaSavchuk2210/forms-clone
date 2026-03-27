import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { saveFormBuilderDraft } from '@/pages/form-builder/model/lib/formBuilder.storage';
import { formBuilderReducer } from '@/pages/form-builder/model/slice/formBuilderSlice';
import { baseApi } from '@/shared/api/baseApi';

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
