import { Box, Button, TextField, Typography } from "@mui/material"
import { fontSize } from "@mui/system"
import theme from "../../styles/theme"


const ResumeBox = ()=>{
    return(
        <Box
            sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: "8px",
                    mt:"24px",
                    mx:"16px",
                    width: "100%",
                    fontSize: theme.typography.fontSize[4],
                    color: theme.palette.quaternary.contrastText,
                }}
            >
                <Typography
                    sx={{
                        fontWeight: theme.typography.fontWeightMedium,
                    }}
                >
                    999 Productos
                </Typography>
                <Typography
                    sx={{
                        fontWeight: theme.typography.fontWeightLight,
                        whiteSpace:"nonwrap",
                    }}
                >
                    $ 215.999
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt:"8px",
                    mb:"24px",
                    mx:"16px",
                    width:"100%",
                    fontSize: theme.typography.fontSize[4],
                    color: theme.palette.quaternary.contrastText,
                }}
            >
                <Typography
                    sx={{
                        fontWeight: theme.typography.fontWeightMedium,
                    }}
                >
                    Envío
                </Typography>
                <Typography
                    sx={{
                        whiteSpace:"nonwrap",
                        fontWeight: theme.typography.fontWeightLight,
                    }}
                >
                    $ 215.999
                </Typography>
            </Box>
            <Box
                width={"100%"}
            >
                <Typography
                    sx={{
                        fontSize: theme.typography.fontSize[4],
                        fontWeight: theme.typography.fontWeightMedium,
                        color: theme.palette.quaternary.contrastText,
                        px:"16px"
                    }}
                >
                    Código de descuento / Giftcard
                </Typography>
            </Box>
            <Box
                minWidth={"100%"}
                mt="16px"
                display={"flex"}
            >
                <TextField placeholder="INGRESAR CÓDIGO"
                    size="small"
                    
                    sx={{
                        fontWeight: 300,
                        color: "#BABCBE",
                        width:"167px",
                        ml:"16px",
                        mixBlendMode: "normal",
                        borderRadius:"4px",
                        "& input":{
                            fontFamily: theme.typography.fontFamily,
                            padding:"7px 0px 7px 12px",
                            fontSize: "1.1vw"
                        }
                    }}
                >
                    
                </TextField>
                <Button
                    sx={{
                    borderRadius: "4.3px",
                    color: "#FFFFFF",
                    height: "32px",
                    padding:"9px 18px",
                    width: "80px",
                    fontSize: theme.typography.fontSize[0],
                    backgroundColor: "#969696",
                    mx:"16px",
                    "&:hover":{
                        backgroundColor: "#969696",
                    }
                    }}
                >
                    VALIDAR
                </Button>
            </Box>
            <Box
                width={"100%"}
                mr="16px"
                mt="24px"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    sx={{
                        fontSize: theme.typography.fontSize[7],
                        fontWeight: theme.typography.fontWeightMedium,
                        color: "#424143",
                        pl:"16px"
                    }}
                >
                    TOTAL:
                </Typography>
                <Typography
                    sx={{
                        fontSize: theme.typography.fontSize[7],
                        fontWeight: theme.typography.fontWeightLight,
                        color: "#424143",
                        whiteSpace:"nonwrap"
                        }}
                >
                    $ 215.999
                </Typography>
            </Box>

            <Box mt={"24px"} width={"264px"} height={"172px"} border={"1px solid pink"} borderRadius={"8px"}>
                BANNER
            </Box>

            <Box sx={{
                width:"100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <Button
                sx={{
                    height: "32px",
                    padding:"9px 18px",
                    width: "100%",
                    fontSize: theme.typography.fontSize[3],
                    backgroundColor: "#FFFC31",
                    boxShadow:"0px 0px 6px rgba(66, 65, 67, 0.1)",
                    borderRadius:"20px",
                    ml:"16px",
                    my:"24px",
                    "& input":{

                    },
                    }}
                >
                    FINALIZAR COMPRA
                </Button>
            </Box>
        </Box>
    )
}

export default ResumeBox