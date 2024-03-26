import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'

export const store = configureStore({    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }), 
    reducer: {
        auth: authSlice.reducer,
} })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch