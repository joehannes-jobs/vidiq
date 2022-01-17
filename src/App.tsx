import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
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
      <div className="App">
        <header className="text-3xl font-bold underline">
          <p>Hello VidIQ!</p>
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
