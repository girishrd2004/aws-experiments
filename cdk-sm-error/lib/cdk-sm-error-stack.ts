import { Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkSmErrorStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create a new secret
    const newSecret = new cdk.aws_secretsmanager.Secret(this, 'App1-Secret', {
      secretName: 'certificate/app1-test-cert',
    })

    // Retrview the secret. This is by purposet to simulate accesing existing secret.
    const secret  = cdk.aws_secretsmanager.Secret.fromSecretNameV2(this, 'App1-Secret-Existing', 'certificate/app1-test-cert');

    // Create a nre role
    const iamRole = new cdk.aws_iam.Role(this, 'App1-Role', {
      assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
      roleName: 'App1-Role'
    });

    // Grant read permission to the role.
    secret.grantRead(iamRole)

    // Exercise: Create new lambda function and assign the role created above.
  }
}
