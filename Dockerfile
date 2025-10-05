# Dockerfile para el proyecto NestJS

# Etapa 1: Construcción de la aplicación
# Usamos una imagen ligera de Node.js con Alpine Linux para la construcción.
# La nombramos 'builder' para poder referenciarla luego.
FROM node:22-alpine AS builder
# Establecemos el directorio de trabajo dentro del contenedor.
WORKDIR /usr/src/app

# Actualizamos los paquetes del sistema operativo para mitigar vulnerabilidades.
RUN apk update && apk upgrade

# Copiamos los archivos de definición de paquetes para instalar las dependencias.
COPY project-app-nova/package*.json ./

# Instalamos las dependencias del proyecto y corregimos vulnerabilidades conocidas.
RUN npm install
RUN npm audit fix

# Copiamos el resto del código fuente de la aplicación.
COPY project-app-nova/ ./

# Construimos la aplicación para producción.
RUN npm run build

# Etapa 2: Creación de la imagen de producción
# Partimos de la misma imagen base para mantener la consistencia.
FROM node:22-alpine
# Establecemos el directorio de trabajo.
WORKDIR /usr/src/app

# Actualizamos los paquetes del sistema operativo en la imagen final.
RUN apk update && apk upgrade

# Copiamos los archivos de paquetes desde la etapa de construcción.
COPY --from=builder /usr/src/app/package*.json ./

# Instalamos únicamente las dependencias de producción para reducir el tamaño de la imagen.
# También corremos 'npm audit fix' por si acaso.
RUN npm install --only=production
RUN npm audit fix

# Copiamos la aplicación ya compilada desde la etapa de construcción.
COPY --from=builder /usr/src/app/dist ./dist

# Exponemos el puerto en el que se ejecuta la aplicación.
EXPOSE 3000

# Comando para iniciar la aplicación cuando se inicie el contenedor.
CMD ["node", "dist/main"]
