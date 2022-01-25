import React, { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  PersistedClient,
  persistQueryClient,
} from 'react-query/persistQueryClient-experimental';
import { DrawerGallery } from './components/pages';
import GlobalStyle from './styles';

/**
 * [App is the main component of the application]
 *
 * @return {[JSX.Element]} [the rendered jsx element]
 */
const App: React.FC<{}> = () => {
  const [localStorageChecked, setLocalStorageChecked] = useState(false);
  const localStoragePersistor = createWebStoragePersistor({
    storage: window.localStorage,
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: Infinity,
        staleTime: Infinity,
      },
    },
  });
  let persistedQueryClient: PersistedClient | undefined;

  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
    maxAge: Infinity,
  });

  const prepareHydration = async () => {
    persistedQueryClient = await localStoragePersistor.restoreClient();
  };

  useEffect(() => {
    if (localStorageChecked) {
      return;
    }

    prepareHydration();
    setLocalStorageChecked(true);
  }, []);

  if (!localStorageChecked) {
    return <h1>Loading ...</h1>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <Hydrate state={persistedQueryClient?.clientState}>
        <DrawerGallery />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
