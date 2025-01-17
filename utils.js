require('dotenv').config();

const { getIntrospectionQuery, buildClientSchema } = require('graphql');
const fetch = require('cross-fetch');

async function getRemoteSchema() {
    const LIVE_SERVER_URL = process.env.LIVE_SERVER_URL;

    if (!LIVE_SERVER_URL) {
        throw new Error('LIVE_SERVER_URL is not defined in the .env file');
    }

    const response = await fetch(LIVE_SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
    });

    const { data, errors } = await response.json();
    if (errors) {
        throw new Error(`Failed to fetch schema: ${JSON.stringify(errors)}`);
    }

    return buildClientSchema(data);
}

module.exports = { getRemoteSchema };
