'use strict';
import { DynamoDB } from 'aws-sdk';
import {Handler, Context, Callback} from 'aws-lambda'

const dynamo = new DynamoDB.DocumentClient();

exports.handler = async (event: any, context: Context, callback: Callback) => {
    const route = event.pathParameters.proxy;
    const tableName = process.env.DYNAMODB_TABLE as string;

    // Get the existing count for the route.
    let value = (await dynamo.get({
        TableName: tableName,
        Key: { id: route }
    }).promise()).Item;

    let count = (value && value.count) || 0;

    // Increment the count and write it back to dynamo DB.
    await (dynamo.put({
        TableName: tableName,
        Item: { id: route, count: ++count }
    })).promise();

    console.log(`Got count ${count} for '${route}'`);

    return {
        statusCode: 200,
        body: JSON.stringify({ route, count })
    }
}