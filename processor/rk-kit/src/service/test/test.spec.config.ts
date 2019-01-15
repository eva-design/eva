export const mapping = {
  Test: {
    meta: {
      variants: {
        status: [
          'success',
          'info',
        ],
        size: [
          'small',
          'big',
        ]
      },
      states: [
        'checked',
        'disabled',
        'active',
      ]
    },
    appearance: {
      default: {
        mapping: {
          size: 36,
          innerSize: 24,
          borderWidth: 2,
          borderColor: 'grayPrimary',
          selectColor: 'transparent',
          state: {
            active: {
              borderColor: 'grayDark',
            },
            checked: {
              borderColor: 'bluePrimary',
              selectColor: 'bluePrimary',
            },
            disabled: {
              borderColor: 'grayLight',
            },
            'checked.active': {
              borderColor: 'blueDark',
            },
            'checked.disabled': {
              selectColor: 'grayPrimary',
            },
          },
        },
        variant: {
          status: {
            info: {
              mapping: {
                state: {
                  checked: {
                    borderColor: 'orangePrimary',
                    selectColor: 'orangePrimary',
                  },
                  'checked.active': {
                    borderColor: 'orangeDark',
                  },
                },
              },
            },
            success: {
              mapping: {
                state: {
                  checked: {
                    borderColor: 'tealPrimary',
                    selectColor: 'tealPrimary',
                  },
                  'checked.active': {
                    borderColor: 'tealDark',
                  },
                },
              },
            },
          },
          size: {
            big: {
              mapping: {
                size: 42,
                innerSize: 28,
              },
            },
            small: {
              mapping: {
                size: 30,
                innerSize: 20,
              },
            },
          },
        },
      },
      custom: {
        mapping: {
          borderWidth: 4,
          state: {
            active: {
              borderColor: 'grayLight',
            },
          },
        },
        variant: {
          status: {
            success: {
              mapping: {
                borderColor: 'tealPrimary',
              },
            },
          },
        },
      },
    },
  },
  Empty: {
    meta: {
      variants: {},
      states: [],
    },
    appearance: {},
  },
};