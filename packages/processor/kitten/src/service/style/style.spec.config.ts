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

export const groupMapping = {
  Test: {
    meta: {
      variants: {
        size: [
          'small',
          'big',
        ],
        status: [
          'primary',
          'success',
        ],
      },
      states: [
        'active',
      ],
    },
    appearance: {
      default: {
        mapping: {
          backgroundColor: 'default',
          text: {
            fontSize: 16,
            color: 'default',
          },
          state: {
            active: {
              backgroundColor: 'default-dark',
            },
          },
        },
        variant: {
          size: {
            small: {
              mapping: {
                text: {
                  fontSize: 10,
                },
              },
            },
            big: {
              mapping: {
                text: {
                  fontSize: 20,
                },
              },
            },
          },
          status: {
            primary: {
              mapping: {
                backgroundColor: 'primary',
                state: {
                  active: {
                    backgroundColor: 'primary-dark',
                  },
                },
              },
            },
            success: {
              mapping: {
                backgroundColor: 'success',
                state: {
                  active: {
                    backgroundColor: 'success-dark',
                  },
                },
              },
            },
          },
        },
      },
      outline: {
        mapping: {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: 'outline-default',
          text: {
            color: 'outline-default',
          },
          state: {
            active: {
              backgroundColor: 'transparent',
              borderColor: 'outline-default-dark',
              text: {
                color: 'outline-default-dark',
              },
            },
          },
        },
        variant: {
          status: {
            primary: {
              mapping: {
                backgroundColor: 'transparent',
                borderColor: 'primary',
                text: {
                  color: 'primary',
                },
                state: {
                  active: {
                    backgroundColor: 'transparent',
                    borderColor: 'primary-dark',
                    text: {
                      color: 'primary-dark',
                    },
                  },
                },
              },
            },
            success: {
              mapping: {
                backgroundColor: 'transparent',
                borderColor: 'success',
                state: {
                  active: {
                    backgroundColor: 'transparent',
                    borderColor: 'success-dark',
                    text: {
                      color: 'success-dark',
                    },
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

