import React from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import winston from 'winston';
import GlobalStyle from './App';

const queryClient = new QueryClient();
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

/**
 * [App is the main component of the application]
 *
 * @return {[Element]} [the rendered jsx element]
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <GlobalStyle />
      <div className="App">
        <header className="App-header">
          <p>Hello VidIQ!</p>
        </header>
      </div>
    </QueryClientProvider>
  );
}

setLogger(logger);

export { logger };

export default App;
