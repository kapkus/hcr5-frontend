import { createTheme } from "@mui/material";
import appConfig from "../../../config/appConfig";

const { colors } = appConfig.constants;

const sceneModalTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.darkTransparent,
                    color: "white",
                    borderColor: colors.lightBorder,
                    borderRadius: 0,
                    '&:hover': {
                        borderColor: "white",
                        backgroundColor: colors.dimmedTransparent,
                    },
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    pointerEvents: 'none',
                    zIndex: 1100
                }
            }
        },
        MuiDialogContent: {
            styleOverrides: {
                color: "white",
                
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    cursor: 'move',
                    pointerEvents: 'auto', 
                    fontSize: '1rem', 
                    padding: "8px 16px",
                    borderBottom: "1px solid black",
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                color: "white"
            }
        },
        MuiTextField: {
            defaultProps: {
                inputProps: {
                    style: { MozAppearance: 'textfield' },
                },
            },
            styleOverrides: {
                root: {
                    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                        display: 'none',
                    },
                    '& input[type=number]': {
                        MozAppearance: 'textfield',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '& > *': {
                        transition: 'color 0.3s ease',
                    },
                    '&:hover > *': {
                        color: colors.fontDefault,
                    },
                }
            }
        }
        
    }
});

export default sceneModalTheme;