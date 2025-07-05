import dotenv from 'dotenv';
import { Client } from '@notionhq/client';

dotenv.config();
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const db = process.env.NOTION_DATABASE_ID

export const obtenerDB = async (db_id) => {
    try {
        const response = await notion.databases.query({ database_id: db_id });
        return response;
    } catch (error) {
        console.error(`Error al obtener la db ${db_id}`, error.message);
        return null;
    }
}

export const formatearProyectoDesdeDB = (item) => {
    try {
        const propiedadesPagina = {
            Portada: item.cover 
                ? (item.cover.type === 'external' 
                    ? item.cover.external.url 
                    : item.cover.file.url) 
                : null,
            Emoji_Icono: {
                tipo: item.icon?.type || null,
                icono: item.icon 
                    ? (item.icon.type === 'external' 
                        ? item.icon.external.url 
                        : item.icon.emoji)
                    : null
            },
            Titulo: item.properties.Nombre?.title[0]?.text?.content || 'Sin título',
            Estado: {
                nombre: item.properties.Estado?.status?.name || 'Sin estado',
                color: item.properties.Estado?.status?.color || 'default'
            },
            Tecnologias: item.properties['Tecnología']?.multi_select?.map(tech => ({
                nombre: tech.name,
                color: tech.color
            })) || [],
            Tipo_Proyecto: {
                nombre: item.properties['Proyecto']?.select?.name || 'Sin tipo',
                color: item.properties['Proyecto']?.select?.color || 'default'
            }
        }

        return propiedadesPagina;
    } catch (error) {
        console.error(`Error al formatear proyecto:`, error.message);
        return null;
    }
}

export const obtenerProyectosAleatorios = async () => {
    const limit = 5;
    const db_response = await obtenerDB(db);
    
    if (!db_response || !db_response.results) {
        console.error('No se pudo obtener la base de datos');
        return [];
    }

    const proyectos = db_response.results;
    const listaElegidos = [];

    // Elección aleatoria sin repetición
    const indices = Array.from(Array(proyectos.length).keys());
    
    for (let i = 0; i < Math.min(limit, proyectos.length); i++) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        const proyectoElegido = proyectos[indices[randomIndex]];
        
        // Formatear el proyecto directamente desde los datos de la DB
        const proyectoFormateado = formatearProyectoDesdeDB(proyectoElegido);
        
        if (proyectoFormateado) {
            listaElegidos.push(proyectoFormateado);
        }
        
        indices.splice(randomIndex, 1); // Elimina para evitar repetición
    }

    // console.log(listaElegidos);
    return listaElegidos;
}

export const obtenerTodosLosProyectos = async () => {
    const db_response = await obtenerDB(db);
    
    if (!db_response || !db_response.results) {
        console.error('No se pudo obtener la base de datos');
        return [];
    }

    const proyectosFormateados = db_response.results
        .map(item => formatearProyectoDesdeDB(item))
        .filter(proyecto => proyecto !== null); // Filtra proyectos que no se pudieron formatear

    // console.log(proyectosFormateados);
    return proyectosFormateados;
}

// Uso del código refactorizado
// const proyectosAleatorios = await obtenerProyectosAleatorios();
// console.log(proyectosAleatorios);