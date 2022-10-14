import React from 'react';
import { Grid } from '@mui/material';
import MiPerfil from '../../components/PerfilActions/MiPerfil';
import MisOfertas from '../../components/PerfilActions/MisOfertas';
import MisDatos from '../../components/PerfilActions/MisDatos';
import MisFavoritos from '../../components/PerfilActions/MisFavoritos';
import MisDirecciones from '../../components/PerfilActions/MisDirecciones';
import MisCompras from '../../components/PerfilActions/MisCompras';
import { useParams } from 'react-router-dom';
import DetalleCompra from '../../components/PerfilActions/DetalleCompra';
import MisMensajes from '../../components/PerfilActions/MisMensajes';
import NuevaDireccion from '../../components/PerfilActions/NuevaDireccion';
import EditarDireccion from '../../components/PerfilActions/EditarDireccion';

const Perfil = () => {
  const params = useParams();

  return (
    <Grid className='gridContainer'>
      {params.perfilSeccion === undefined && <MiPerfil />}
      {params.perfilSeccion === 'OFERTAS REALIZADAS' && <MisOfertas />}
      {params.perfilSeccion === 'MIS DATOS' && <MisDatos />}
      {params.perfilSeccion === 'MIS FAVORITOS' && <MisFavoritos />}
      {params.perfilSeccion === 'MIS DIRECCIONES' && <MisDirecciones />}
      {params.perfilSeccion === 'MIS COMPRAS' && <MisCompras />}
      {params.perfilSeccion === 'MIS COMPRAS DETALLE' && <DetalleCompra />}
      {params.perfilSeccion === 'MIS MENSAJES' && <MisMensajes />}
      {params.perfilSeccion === 'NUEVA DIRECCION' && <NuevaDireccion />}
      {params.perfilSeccion === 'EDITAR DIRECCION' && <EditarDireccion />}
    </Grid>
  );
};

export default Perfil;
