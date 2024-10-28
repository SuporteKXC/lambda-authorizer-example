import { CognitoJwtVerifier } from "aws-jwt-verify";
import { SimpleJwksCache } from "aws-jwt-verify/jwk";
import { SimpleJsonFetcher } from "aws-jwt-verify/https";

// const verifierOld = CognitoJwtVerifier.create({
//   userPoolId: "<user_pool_id>",
//   tokenUse: "access",
//   clientId: "<client_id>",
// },
// {
//   jwksCache: new SimpleJwksCache({
//     fetcher: new SimpleJsonFetcher({
//       defaultRequestOptions: {
//         responseTimeout: 6000,
//       },
//     }),
//   }),
// });

// const verifierNew = CognitoJwtVerifier.create({
//   userPoolId: "<user_pool_id>",
//   tokenUse: "access",
//   clientId: "<client_id>",
// },
// {
//   jwksCache: new SimpleJwksCache({
//     fetcher: new SimpleJsonFetcher({
//       defaultRequestOptions: {
//         responseTimeout: 6000,
//       },
//     }),
//   }),
// });

export async function handler (event, context ) {

  console.log('Received event:', JSON.stringify(event, null, 2));

  const token = event.headers['Authorization']

  let authorizedUser = null

  try {

    // try {
    //   const payload = await verifier.verify(
    //     token // the JWT as string
    //   );
    //   console.log("Token is valid. Payload:", payload);
    //   authorizedUser = payload
    // } catch {
    //   console.log("Token not valid!");
    //   return authorizerResponse('Deny', authorizerContext)
    // }

    // try {
    //   const payload = await verifier.verify(
    //     "eyJraWQeyJhdF9oYXNoIjoidk..." // the JWT as string
    //   );
    //   console.log("Token is valid. Payload:", payload);
    //   authorizedUser = payload
    // } catch {
    //   console.log("Token not valid!");
    //   return authorizerResponse('Deny', authorizerContext)
    // }
    
    // //Esse objeto só pode conter string/number/bool
    // const authorizerContext = {
    //   'userId': authorizedUser.sub,
    //   'userPool': '....'
    // }

    //Para teste
    if(token){
      return authorizerResponse('Allow', {})
    }else{
      return authorizerResponse('Deny', {})
    }

  } catch (err) {
      console.log('Erro!')
      console.log(err)

      return authorizerResponse('Deny', authorizerContext)
  } 
};

function authorizerResponse (effect, authorizerContext, principalId) {

  const response = {
    principalId: principalId ? principalId : 'guest',
    context: authorizerContext,
    policyDocument: {
        Version: '2012-10-17',
        Statement: [
            {
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: '*',
            },
        ],
    },
  }

  console.log(response)

  return response
}
