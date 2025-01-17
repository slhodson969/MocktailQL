const { gql } = require('graphql-request');

const mockTypeDefs = gql`
    type Query {
        mock_categories: [MockCategory]
        mock_shoppingLists: [MockShoppingList]
        mock_userProfile: MockUserProfile
    }

    type Mutation {
        mock_favoritesAddList(name: String!): MockFavoritesList
        mock_updateShoppingList(id: ID!, name: String!): MockShoppingList
        mock_deleteShoppingList(id: ID!): Boolean
    }

    type MockCategory {
        id: ID!
        name: String!
    }

    type MockShoppingList {
        id: ID!
        name: String!
        items: [MockShoppingItem]
    }

    type MockShoppingItem {
        id: ID!
        name: String!
        quantity: Int!
    }

    type MockFavoritesList {
        id: ID!
    }

    type MockUserProfile {
        id: ID!
        name: String!
        email: String!
    }
`;

module.exports = mockTypeDefs;
