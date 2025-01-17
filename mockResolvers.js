const mockResolvers = {
    Query: {
        mock_categories: () => [
            { id: '1', name: 'Electronics' },
            { id: '2', name: 'Books' },
        ],
        mock_shoppingLists: () => [
            {
                id: '1',
                name: 'Groceries',
                items: [{ id: '1', name: 'Apple', quantity: 5 }],
            },
            {
                id: '2',
                name: 'Office Supplies',
                items: [{ id: '2', name: 'Pens', quantity: 10 }],
            },
        ],
        mock_userProfile: () => ({
            id: '1',
            name: 'Mock User',
            email: 'mockuser@example.com',
        }),
    },
    Mutation: {
        mock_favoritesAddList: (_, { name }) => {
            console.log(`Mocking favoritesAddList for name: ${name}`);
            return { id: 'mock-id' };
        },
        mock_updateShoppingList: (_, { id, name }) => {
            console.log(
                `Mocking updateShoppingList for id: ${id}, name: ${name}`
            );
            return { id, name, items: [] };
        },
        mock_deleteShoppingList: (_, { id }) => {
            console.log(`Mocking deleteShoppingList for id: ${id}`);
            return true;
        },
    },
};

module.exports = mockResolvers;
