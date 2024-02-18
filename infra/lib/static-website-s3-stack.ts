import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";

interface StaticWebsiteS3StackProps extends cdk.StackProps {
  rootDomainName: string;
}

export class StaticWebsiteS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StaticWebsiteS3StackProps) {
    super(scope, id, props);

    // define log bucket
    const logBucket = new s3.Bucket(this, "logs", {
      bucketName: `logs.${props.rootDomainName}.bucket`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
    // define website bucket
    // see this issue https://github.com/aws/aws-cdk/issues/26559 for setting acl and bucket policy
    // https://github.com/aws/aws-cdk/issues/25983
    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      bucketName: `${props.rootDomainName}.bucket`,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "error.html",
      // publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      serverAccessLogsBucket: logBucket,
      autoDeleteObjects: true,
      blockPublicAccess: {
        blockPublicAcls: true,
        ignorePublicAcls: true,
        restrictPublicBuckets: false,
        blockPublicPolicy: false,
      },
    });
    // add bucket policy
    // {
    //   Version: "2012-10-17",
    //   Statement: [
    //     {
    //       Sid: "Allow Public Access to All Objects",
    //       Effect: "Allow",
    //       Principal: "*",
    //       Action: "s3:GetObject",
    //       Resource: `arn:aws:s3:::${props.rootDomainName}.bucket/*`,
    //     },
    //   ],
    // };
    websiteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["s3:GetObject"],
        resources: [websiteBucket.arnForObjects("*")],
        principals: [new iam.StarPrincipal()],
      })
    );
    // add files to bucket
    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset("../website")],
      destinationBucket: websiteBucket,
    });
  }
}
