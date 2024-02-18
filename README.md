# cdk-s3-static-website

simple static website using s3 implemented by cdk.

## AWS Deployment

### requirements

- install cdk `npm install -g aws-cdk`
- to check cdk version `cdk --version`
- setup .env file in infra directory using .env-example
- run `cdk bootstrap` to setup cloudFormation if it is first time running in the selected aws region
- setup aws profile for your aws account `aws configure --profile=<aws-profile-name>`

### to deploy

- `cd infra`
- `cdk synth` --> generate cloud formation template
- `npm run test` perform the jest unit tests
- `cdk deploy --profile=<aws-profile-name>` --> deploy stack on cloud formation
- `cdk destroy --profile=<aws-profile-name>` --> destroy stack on cloud formation
- `cdk diff --profile=<aws-profile-name>` --> compare deployed stack with current state
