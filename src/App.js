import React, { Component } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client';
import NavBar from './components/navbar';
import Main from './components/main';
import './assets/css/styles.css';
import { onError } from '@apollo/client/link/error';

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: 'https://pangaea-interviews.now.sh/api/graphql',
// });

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'https://pangaea-interviews.now.sh/api/graphql' }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

class App extends Component {
  state = {};
  render() {
    return (
      <ApolloProvider client={client}>
        <React.Fragment>
          <NavBar></NavBar>
          <Main></Main>
        </React.Fragment>
      </ApolloProvider>
    );
  }
}

export default App;
