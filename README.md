#redux-persist-error-handler

Provides a higher order component to wrap your app in, which purges the redux-persist persisted store if there is a fatal error. This avoids your app getting trapped in an infinite crash loop, where dodgy state causes a crash, and the same dodgy state is then rehydrated, causing another crash. Of course, you should fix the cause of the dodgy state, but let's at least be a bit graceful to users in the mean time.

##Usage
```javascript
import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { ErrorHandler } from 'redux-persist-error-handler';

import { App } from './App';
import { reducers } from './reducers';

const store = createStore(
  reducers,
  {},
);

const persistedStore = persistStore(store, { storage: AsyncStorage });

function App() {
  return (
    <ErrorHandler persistedStore={persistedStore}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorHandler>
  );
}

AppRegistry.registerComponent('MyApp', () => App);
```
