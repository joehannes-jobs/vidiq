import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { DrawerGallery } from './components/pages';
import GlobalStyle from './styles';

const queryClient = new QueryClient();

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
