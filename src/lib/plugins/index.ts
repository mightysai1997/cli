import * as rubygemsPlugin from './rubygems';
import * as mvnPlugin from 'snyk-mvn-plugin';
import * as gradlePlugin from 'snyk-gradle-plugin';
import * as sbtPlugin from 'snyk-sbt-plugin';
import * as pythonPlugin from 'snyk-python-plugin';
import * as goPlugin from 'snyk-go-plugin';
import * as nugetPlugin from 'snyk-nuget-plugin';
import * as phpPlugin from 'snyk-php-plugin';
import * as legacyNodejsPlugin from './nodejs-plugin';
import * as nodejsPlugin from 'snyk-nodejs-plugin';
import * as cocoapodsPlugin from '@snyk/snyk-cocoapods-plugin';
import * as hexPlugin from '@snyk/snyk-hex-plugin';
import * as swiftPlugin from 'snyk-swiftpm-plugin';
import * as types from './types';
import {
  SupportedPackageManagers,
  SupportedPackageManagersUnderFeatureFlag,
} from '../package-managers';
import { UnsupportedPackageManagerError } from '../errors';

export function loadPlugin(
  packageManager:
    | SupportedPackageManagers
    | SupportedPackageManagersUnderFeatureFlag
    | undefined,
): types.Plugin {
  switch (packageManager) {
    case 'npm': {
      return legacyNodejsPlugin;
    }
    case 'rubygems': {
      return rubygemsPlugin;
    }
    case 'maven': {
      return mvnPlugin;
    }
    case 'gradle': {
      return gradlePlugin;
    }
    case 'sbt': {
      return sbtPlugin;
    }
    case 'yarn': {
      return legacyNodejsPlugin;
    }
    case 'pip':
    case 'poetry': {
      return pythonPlugin;
    }
    case 'golangdep':
    case 'gomodules':
    case 'govendor': {
      return goPlugin;
    }
    case 'nuget': {
      return nugetPlugin;
    }
    case 'paket': {
      return nugetPlugin;
    }
    case 'composer': {
      return phpPlugin;
    }
    case 'cocoapods': {
      return cocoapodsPlugin;
    }
    case 'hex': {
      return hexPlugin;
    }
    case 'swift': {
      return swiftPlugin;
    }
    default: {
      throw new UnsupportedPackageManagerError(packageManager);
    }
  }
}

export function loadPluginUnderFeatureFlag(
  packageManager:
    | SupportedPackageManagers
    | SupportedPackageManagersUnderFeatureFlag
    | undefined,
): types.Plugin {
  switch (packageManager) {
    case 'pnpm': {
      return nodejsPlugin;
    }
    default: {
      throw new UnsupportedPackageManagerError(packageManager);
    }
  }
}
