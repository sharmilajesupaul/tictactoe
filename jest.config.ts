import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  transform: {
    '\\.[jt]sx?$': ['ts-jest', {
      useESM: true,
      isolatedModules: true,
    }],
  },
  testEnvironment: 'node',
};

export default config;