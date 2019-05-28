import { SchemaType } from '@eva-design/dss';

export const schema: SchemaType = {
  version: 1.0,
  components: {
    Button: {
      meta: {
        scope: 'all',
        parameters: {
          minHeight: {
            type: 'number',
          },
          minWidth: {
            type: 'number',
          },
          padding: {
            type: 'number',
          },
          borderWidth: {
            type: 'number',
          },
          borderRadius: {
            type: 'number',
          },
          borderColor: {
            type: 'string',
          },
          backgroundColor: {
            type: 'string',
          },
          textMarginHorizontal: {
            type: 'number',
          },
          textFontSize: {
            type: 'number',
          },
          textFontWeight: {
            type: 'string',
          },
          textColor: {
            type: 'number',
          },
          iconWidth: {
            type: 'number',
          },
          iconHeight: {
            type: 'number',
          },
          iconMarginHorizontal: {
            type: 'number',
          },
          iconTintColor: {
            type: 'string',
          },
        },
        appearances: {
          filled: {
            default: true,
          },
          outline: {
            default: false,
          },
        },
        variantGroups: {
          status: {
            primary: {
              default: true,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
          },
          size: {
            tiny: {
              default: false,
            },
            small: {
              default: false,
            },
            medium: {
              default: true,
            },
            large: {
              default: false,
            },
            giant: {
              default: true,
            },
          },
        },
        states: {
          disabled: {
            default: false,
            priority: 0,
            scope: 'all',
          },
          active: {
            default: false,
            priority: 1,
            scope: 'all',
          },
        },
      },
      appearances: {
        filled: {
          mapping: {
            borderRadius: 6,
            textColor: 'text-primary-inverse',
            textFontWeight: 800,
            iconTintColor: '#ffffff',
            iconMarginHorizontal: 4,
          },
          variantGroups: {
            status: {
              primary: {
                backgroundColor: '#2196F3',
                state: {
                  active: {
                    backgroundColor: '#1E88E5',
                  },
                },
              },
              success: {
                backgroundColor: '#4CAF50',
                state: {
                  active: {
                    backgroundColor: '#43A047',
                  },
                },
              },
              info: {
                backgroundColor: '#03A9F4',
                state: {
                  active: {
                    backgroundColor: '#039BE5',
                  },
                },
              },
              warning: {
                backgroundColor: '#FFC107',
                state: {
                  active: {
                    backgroundColor: '#FFB300',
                  },
                },
              },
              danger: {
                backgroundColor: '#F44336',
                state: {
                  active: {
                    backgroundColor: '#E53935',
                  },
                },
              },
            },
            size: {
              tiny: {
                minHeight: 16,
                minWidth: 16,
                padding: 3,
                textFontSize: 10,
                textMarginHorizontal: 3,
                iconWidth: 11,
                iconHeight: 11,
                iconMarginHorizontal: 3,
              },
              small: {
                minHeight: 20,
                minWidth: 20,
                padding: 3.5,
                textFontSize: 11,
                textMarginHorizontal: 3.5,
                iconWidth: 12,
                iconHeight: 12,
                iconMarginHorizontal: 3.5,
              },
              medium: {
                minHeight: 24,
                minWidth: 24,
                padding: 4,
                textFontSize: 12,
                textMarginHorizontal: 4,
                iconWidth: 13,
                iconHeight: 13,
                iconMarginHorizontal: 4,
              },
              large: {
                minHeight: 30,
                minWidth: 30,
                padding: 4.5,
                textFontSize: 13,
                textMarginHorizontal: 4.5,
                iconWidth: 14,
                iconHeight: 14,
                iconMarginHorizontal: 4.5,
              },
              giant: {
                minHeight: 36,
                minWidth: 36,
                padding: 5,
                textFontSize: 14,
                textMarginHorizontal: 5,
                iconWidth: 15,
                iconHeight: 15,
                iconMarginHorizontal: 5,
              },
            },
          },
        },
        outline: {
          mapping: {
            borderWidth: 2,
          },
          variantGroups: {
            status: {
              primary: {
                backgroundColor: 'transparent',
                borderColor: '#2196F3',
                textColor: '#2196F3',
                iconTintColor: '#2196F3',
                state: {
                  active: {
                    backgroundColor: 'transparent',
                    borderColor: '#1E88E5',
                    textColor: '#1E88E5',
                    iconTintColor: '#1E88E5',
                  },
                },
              },
              success: {
                backgroundColor: 'transparent',
                borderColor: '#4CAF50',
                textColor: '#4CAF50',
                iconTintColor: '#4CAF50',
                state: {
                  active: {
                    backgroundColor: 'transparent',
                    borderColor: '#43A047',
                    textColor: '#43A047',
                    iconTintColor: '#43A047',
                  },
                },
              },
              info: {
                backgroundColor: 'transparent',
                borderColor: '#03A9F4',
                textColor: '#03A9F4',
                iconTintColor: '#03A9F4',
                state: {
                  active: {
                    backgroundColor: 'transparent',
                    borderColor: '#039BE5',
                    textColor: '#039BE5',
                    iconTintColor: '#039BE5',
                  },
                },
              },
              warning: {
                backgroundColor: 'transparent',
                borderColor: '#FFC107',
                textColor: '#FFC107',
                iconTintColor: '#FFC107',
                state: {
                  active: {
                    backgroundColor: 'transparent',
                    borderColor: '#FFB300',
                    textColor: '#FFB300',
                    iconTintColor: '#FFB300',
                  },
                },
              },
              danger: {
                backgroundColor: 'transparent',
                borderColor: '#F44336',
                textColor: '#F44336',
                iconTintColor: '#F44336',
                state: {
                  active: {
                    backgroundColor: 'transparent',
                    borderColor: '#E53935',
                    textColor: '#E53935',
                    iconTintColor: '#E53935',
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
