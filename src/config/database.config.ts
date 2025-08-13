/**
 * CONFIGURACIÓN DE BASE DE DATOS
 *
 * Esta carpeta se creó para centralizar toda la configuración de conexión
 * a la base de datos MongoDB en diferentes entornos de desarrollo.
 *
 * Propósito:
 * - Separar la configuración de la lógica de negocio
 * - Permitir diferentes configuraciones según el entorno
 * - Facilitar el mantenimiento y cambios de configuración
 * - Seguir buenas prácticas de arquitectura limpia
 */

/**
 * Configuración de la base de datos para diferentes entornos
 * Cada entorno tiene su propia URI y opciones de conexión
 */
export const databaseConfig = {
  /**
   * ENTORNO DE DESARROLLO
   * Se usa cuando estás desarrollando localmente en tu máquina
   * - URI: Conecta a MongoDB local en el puerto 27017
   * - Base de datos: 'appnova' (nombre de tu proyecto)
   */
  development: {
    uri: 'mongodb://localhost:27017/appnova',
  },

  /**
   * ENTORNO DE PRODUCCIÓN
   * Se usa cuando la aplicación está en un servidor real
   * - URI: Puede venir de una variable de entorno o usar la local por defecto
   * - Base de datos: La misma 'appnova' pero en servidor de producción
   */
  production: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/appnova',
  },

  /**
   * ENTORNO DE PRUEBAS
   * Se usa para ejecutar tests sin afectar la base de datos principal
   * - URI: Conecta a una base de datos separada 'appnova_test'
   * - Base de datos: 'appnova_test' (separada de desarrollo)
   */
  test: {
    uri: 'mongodb://localhost:27017/appnova_test',
  },
};

/**
 * FUNCIÓN PARA OBTENER LA CONFIGURACIÓN SEGÚN EL ENTORNO
 *
 * Esta función determina automáticamente qué configuración usar
 * basándose en la variable de entorno NODE_ENV
 *
 * @returns {Object} Configuración de la base de datos para el entorno actual
 *
 * Ejemplos de uso:
 * - NODE_ENV=development → usa configuración de desarrollo
 * - NODE_ENV=production → usa configuración de producción
 * - NODE_ENV=test → usa configuración de pruebas
 * - Sin NODE_ENV → usa configuración de desarrollo por defecto
 */
export const getDatabaseConfig = () => {
  // Obtiene el entorno actual o usa 'development' por defecto
  const environment = (process.env.NODE_ENV ||
    'development') as keyof typeof databaseConfig;

  // Retorna la configuración correspondiente al entorno
  return databaseConfig[environment];
};

/**
 * EXPLICACIÓN DE LAS OPCIONES DE CONEXIÓN:
 *
 * useNewUrlParser: true
 * - Habilita el nuevo parser de URLs de MongoDB
 * - Mejora el rendimiento y la compatibilidad
 * - Es la opción recomendada para versiones modernas
 *
 * useUnifiedTopology: true
 * - Habilita la nueva topología de MongoDB
 * - Mejora la gestión de conexiones
 * - Es la opción recomendada para versiones modernas
 *
 * NOTA: Estas opciones son necesarias para evitar warnings
 * en versiones modernas de MongoDB y Mongoose
 */
