# Dockerfile para el proyecto NestJS

# Etapa 1: Construcción de la aplicación
# Usamos una imagen ligera de Node.js con Alpine Linux para la construcción.
# La nombramos 'builder' para poder referenciarla luego.
FROM node:22-alpine AS builder
# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el directorio de la aplicación NestJS
COPY project-app-nova ./project-app-nova

# Cambia el directorio de trabajo al de la aplicación NestJS
WORKDIR /app/project-app-nova

# Instala las dependencias
RUN npm install

# Construye la aplicación NestJS
RUN npm run build

# Etapa 2: Creación de la imagen de producción
# Partimos de la misma imagen base para mantener la consistencia.
FROM node:22-alpine
# Establecemos el directorio de trabajo.
WORKDIR /usr/src/app

# Actualizamos los paquetes del sistema operativo en la imagen final.
RUN apk update && apk upgrade

# Copiamos los archivos de paquetes desde la etapa de construcción.
COPY --from=builder /app/project-app-nova/package*.json ./

RUN npm install --only=production

# Copiamos la aplicación ya compilada desde la etapa de construcción.
COPY --from=builder /app/project-app-nova/dist ./dist

# Exponemos el puerto en el que se ejecuta la aplicación.
EXPOSE 3000

# Comando para iniciar la aplicación cuando se inicie el contenedor.
CMD ["node", "dist/main"]
