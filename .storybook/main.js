module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-addon-sass-postcss',
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  framework: '@storybook/react'
}
