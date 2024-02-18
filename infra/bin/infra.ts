#!/usr/bin/env node
import * as dotenv from "dotenv";
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { StaticWebsiteS3Stack } from "../lib/static-website-s3-stack";

dotenv.config();

const awsAccount = process.env.AWS_ACCOUNT as string;
if (!awsAccount) {
  throw new Error("AWS_ACCOUNT is required");
}

const awsRegion = process.env.AWS_REGION as string;
if (!awsRegion) {
  throw new Error("AWS_REGION is required");
}

const env = {
  account: awsAccount,
  region: awsRegion,
};

const rootDomainName = process.env.rootDomainName as string;
if (!rootDomainName) {
  throw new Error("rootDomainName is required");
}

const app = new cdk.App();
new StaticWebsiteS3Stack(app, "StaticWebsiteS3Stack", {
  env,
  rootDomainName,
});
