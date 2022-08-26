module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    "^react($|/.+)": "<rootDir>/node_modules/react$1", // makes sure all React imports are running off of the one in this package.
  },
}
