import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

/**
 * [App is the main component of the application]
 *
 * @return {[Element]} [the rendered jsx element]
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <div className="App">
        <header className="App-header">
          <p>Hello VidIQ!</p>
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
