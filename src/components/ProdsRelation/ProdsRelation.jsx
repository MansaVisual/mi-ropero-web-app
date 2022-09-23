import { Box, Grid, Link } from "@mui/material"
import SliderProd from "../../components/SliderProd/SliderProd";
import theme from "../../styles/theme";
import Chip from "../Chip/Chip"

const ProdsRelation = ()=>{
    return(
        <Grid item xs={12} sm={12} md={12}>
            <Box sx={{ mt: "40px", textAlign: "center" }}>
                <Chip primary>Productos relacionados</Chip>
            </Box>
            <Box sx={{ mt: "24px", mb: "28px" }}>
                <SliderProd />
            </Box>
            <Box sx={{ textAlign: "center" }}>
                <Link
                sx={{
                    color: theme.palette.tertiary.main,
                    fontSize: theme.typography.fontSize[4],
                }}
                >
                    VER TODOS LOS PRODUCTOS RELACIONADOS
                </Link>
            </Box>
        </Grid>
    )
}

export default ProdsRelation