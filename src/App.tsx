import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Carousel } from './components/molecules';
import GlobalStyle from './styles';

const queryClient = new QueryClient();

/**
 * [App is the main component of the application]
 *
 * @return {[JSX.Element]} [the rendered jsx element]
 */
function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <GlobalStyle />
      <main className="App">
        <header className="text-3xl font-bold underline">
          <p>Hello VidIQ!</p>
        </header>
        <Carousel />
      </main>
    </QueryClientProvider>
  );
}

export default App;
