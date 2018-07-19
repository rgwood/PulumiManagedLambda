Quick proof of concept for a Pulumi-defined Lambda function with DynamoDB, in TypeScript.

Basically [this Pulumi example](https://github.com/lindydonna/velocity-examples/tree/master/pulumi/pulumi-serverless) but converted (barely) to TypeScript.

The steps from there are mostly applicable - the only difference is that we need to do a TypeScript built step. Run the `build` NPM script before `pulumi update`, or use the `build-deploy` script that handles both.