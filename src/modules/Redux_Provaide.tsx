"use client";

import { Provider } from 'react-redux';
import store from './createStore';

export const Redux_Provaider = ( { children  }  : { children: React.ReactNode  }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}