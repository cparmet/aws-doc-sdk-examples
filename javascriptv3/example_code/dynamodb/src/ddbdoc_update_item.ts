/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with AWS SDK for JavaScript version 3 (v3),
which is pending release.  The preview version of the SDK is available
at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html.

Purpose:
ddbdoc_update_item.ts demonstrates how to use DynamoDB utilities to create or update an item in an Amazon DynamoDB table.

Inputs (replace in code):
- TABLE_NAME
- REGION
- NEW_ATTRIBUTE_VALUE_1
- NEW_ATTRIBUTE_VALUE_2

Running the code:
ts-node ddbdoc_update_item.ts
*/
// snippet-start:[dynamodb.JavaScript.docClient.updateV3]

// Import required AWS SDK clients and commands for Node.js
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

// Set the parameters
const params = {
  TableName: "TABLE_NAME",
  // Convert the key JavaScript object you are deleting to the required DynamoDB format
  Key: marshall({
    primaryKey: VALUE, // For example, "Season: 2"
    sortKey: VALUE, // For example,  "Episode: 1" (only required if table has sort key)
  }),
  // Define expressions for the new or updated attributes
  UpdateExpression: "set ATTRIBUTE_NAME_1 = :t, ATTRIBUTE_NAME_2 = :s", // For example, "'set Title = :t, Subtitle = :s'"
  /*
  Convert the attribute JavaScript object you are deleting to the required DynamoDB format. The format of values
  specifies the datatype. The following list demonstrates different datatype formatting requirements:
  HashKey: "hashKey",
  NumAttribute: 1,
  BoolAttribute: true,
  ListAttribute: [1, "two", false],
  MapAttribute: { foo: "bar" },
  NullAttribute: null
   */
  ExpressionAttributeValues: marshall({
    ":t": NEW_ATTRIBUTE_VALUE_1, // For example "':t' : 'NEW_TITLE'"
    ":s": NEW_ATTRIBUTE_VALUE_2, // For example " ':s' : 'NEW_SUBTITLE'"
  }),
};

// Create DynamoDB document client
const client = new DynamoDB({ region: "REGION" });

const run = async () => {
  try {
    const { Item } = await client.updateItem(params);
    console.log("Success - updated");
  } catch (err) {
    console.log("Error", err);
  }
};
run();
// snippet-end:[dynamodb.JavaScript.docClient.updateV3]
