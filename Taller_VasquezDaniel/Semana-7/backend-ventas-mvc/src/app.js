import express from 'express';
import cors from "cors";
import productoRoutes from './routes/productoRoutes.js';

const app = express();
// Permitir solicitudes desde nuestro frontend
app.use(cors({
  origin: "http://localhost:5173"
}));

// Configurar el middleware JSON, interpretar cuerpos de json
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API Sistema de Ventas MVC");
});

// Registrar las rutas
app.use("/api/productos", productoRoutes);

export default app;



