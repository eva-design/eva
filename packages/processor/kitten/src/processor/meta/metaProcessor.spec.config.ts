export const mapping = {
  Radio: {
    meta: {
      variants: {
        status: [
          'error',
        ],
        size: [
          'small',
          'big',
        ],
      },
      states: [
        'checked',
        'disabled',
        'active',
      ],
    },
    appearance: {
      default: {
        mapping: {
          size: 36,
          innerSize: 24,
          highlightSize: 60,
          borderWidth: 2,
          borderColor: 'gray-primary',
          selectColor: 'transparent',
          highlightColor: 'transparent',
          state: {
            active: {
              borderColor: 'gray-dark',
              highlightColor: 'gray-light',
            },
            checked: {
              borderColor: 'blue-primary',
              selectColor: 'blue-primary',
            },
            disabled: {
              borderColor: 'gray-light',
            },
            'checked.active': {
              borderColor: 'blue-dark',
            },
            'checked.disabled': {
              selectColor: 'gray-primary',
            },
          },
        },
        variant: {
          status: {
            error: {
              mapping: {
                borderColor: 'pink-primary',
                state: {
                  checked: {
                    borderColor: 'pink-primary',
                    selectColor: 'pink-primary',
                  },
                  'checked.active': {
                    borderColor: 'pink-primary',
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
                highlightSize: 70,
              },
            },
            small: {
              mapping: {
                size: 30,
                innerSize: 20,
                highlightSize: 50,
              },
            },
          },
        },
      },
      custom: {
        mapping: {
          size: 55,
          innerSize: 33,
          highlightSize: 67,
          borderWidth: 3,
          state: {
            checked: {
              borderColor: 'blue-test1',
            },
          },
        },
        variant: {
          size: {
            big: {
              mapping: {
                size: 66,
                innerSize: 34,
                highlightSize: 60,
                state: {
                  active: {
                    testToken: 'test-token',
                  },
                },
              },
            },
            small: {
              mapping: {
                size: 30,
                innerSize: 20,
                highlightSize: 50,
                state: {
                  checked: {
                    selectColor: 'blue-test',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const emptyMapping = {
  Test: {
    meta: {
      variants: {
        status: [
          'error',
          'info',
        ],
        size: [
          'small',
          'big',
        ],
      },
      states: [
        'checked',
        'disabled',
        'active',
      ],
    },
    appearance: {
      default: {
        mapping: {
          size: 36,
          innerSize: 24,
          highlightSize: 60,
          borderWidth: 2,
          borderColor: 'gray-primary',
          selectColor: 'transparent',
          highlightColor: 'transparent',
        },
        variant: {
          status: {
            error: {
              mapping: {
                borderColor: 'pink-primary',
                state: {
                  checked: {
                    borderColor: 'pink-primary',
                    selectColor: 'pink-primary',
                  },
                  'checked.active': {
                    borderColor: 'pink-primary',
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
                highlightSize: 70,
              },
            },
            small: {
              mapping: {
                size: 30,
                innerSize: 20,
                highlightSize: 50,
              },
            },
          },
        },
      },
      custom: {
        mapping: {
          size: 55,
          innerSize: 33,
          highlightSize: 67,
          borderWidth: 3,
        },
        variant: {
          status: {
            info: {
              mapping: {
                size: 66,
                innerSize: 34,
                highlightSize: 60,
              },
            },
          },
        },
      },
      superCustom: {
        mapping: {
          size: 55,
          innerSize: 33,
          highlightSize: 67,
          borderWidth: 3,
        },
        variant: {},
      },
    },
  },
};
