import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { StaticWebsiteS3Stack } from "../lib/static-website-s3-stack";

test("static website created", () => {
  const app = new cdk.App();
  const stack = new StaticWebsiteS3Stack(app, "MyTestStack", {
    rootDomainName: "test-bucket-name",
    env: {
      account: "test-account",
      region: "us-east-1",
    },
  });
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
