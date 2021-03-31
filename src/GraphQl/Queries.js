import { gql } from '@apollo/client';

export const LOAD_PRODUCTS = gql`
  query ProductQuery {
    products {
      id
      title
      image_url
      price(currency: USD)
    }
    currency
  }
`;

export const GET_PRICE = gql`
  query Products($currency: Currency) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
    currency
  }
`;
