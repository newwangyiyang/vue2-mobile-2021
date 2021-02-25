const plugin = require('tailwindcss/plugin');
const _ = require('lodash');
module.exports = {
  purge: ['./src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  important: false,
  theme: {
    extend: {
      colors: {
        bb: '#000',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities, addComponents, e, prefix, config }) {
      const sizeUtilities = _.map(
        Array.from(Array(400), (_item, index) => index + 1),
        (value) => {
          return {
            // height
            [`.${e(`h-${value}-px`)}`]: {
              height: `${value}px`,
            },
            // width
            [`.${e(`w-${value}-px`)}`]: {
              width: `${value}px`,
            },
            // padding
            [`.${e(`p-${value}-px`)}`]: {
              padding: `${value}px`,
            },
            [`.${e(`px-${value}-px`)}`]: {
              paddingLeft: `${value}px`,
              paddingRight: `${value}px`,
            },
            [`.${e(`py-${value}-px`)}`]: {
              paddingTop: `${value}px`,
              paddingBottom: `${value}px`,
            },
            [`.${e(`pt-${value}-px`)}`]: {
              paddingTop: `${value}px`,
            },
            [`.${e(`pb-${value}-px`)}`]: {
              paddingBottom: `${value}px`,
            },
            [`.${e(`pl-${value}-px`)}`]: {
              paddingLeft: `${value}px`,
            },
            [`.${e(`pr-${value}-px`)}`]: {
              paddingRight: `${value}px`,
            },
            // margin
            [`.${e(`m-${value}-px`)}`]: {
              margin: `${value}px`,
            },
            [`.${e(`mx-${value}-px`)}`]: {
              marginLeft: `${value}px`,
              marginRight: `${value}px`,
            },
            [`.${e(`my-${value}-px`)}`]: {
              marginTop: `${value}px`,
              marginBottom: `${value}px`,
            },
            [`.${e(`mt-${value}-px`)}`]: {
              marginTop: `${value}px`,
            },
            [`.${e(`mb-${value}-px`)}`]: {
              marginBottom: `${value}px`,
            },
            [`.${e(`ml-${value}-px`)}`]: {
              marginLeft: `${value}px`,
            },
            [`.${e(`mr-${value}-px`)}`]: {
              marginRight: `${value}px`,
            },
            // line-height
            [`.${e(`lh-${value}-px`)}`]: {
              lineHeight: `${value}px`,
            },
          };
        },
      );

      addUtilities(sizeUtilities);
    }),
  ],
};
