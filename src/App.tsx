import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';

import { DrawerGallery } from './components/pages';
import GlobalStyle from './styles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

localStoragePersistor.restoreClient();

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
  maxAge: Infinity,
});

/**
 * [App is the main component of the application]
 *
 * @return {[JSX.Element]} [the rendered jsx element]
 */
const App: React.FC<{}> = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <GlobalStyle />
    <DrawerGallery />
  </QueryClientProvider>
);

export default App;
