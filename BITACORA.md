# Bitácora del Proyecto APPNOVA

Este documento sirve como un diario de desarrollo y una guía de la evolución del proyecto APPNOVA. Detalla la estructura actual, el propósito de sus componentes y el historial de cambios significativos.

## 1. Resumen del Proyecto

APPNOVA es una aplicación de backend construida con el framework NestJS. Su propósito es gestionar las entidades y procesos relacionados con proyectos de desarrollo, incluyendo aprendices, instructores, cronogramas, seguimientos y evidencias. Utiliza MongoDB como base de datos a través de Mongoose para la persistencia de datos.

## 2. Estructura del Proyecto

El proyecto está organizado en módulos, cada uno representando una entidad principal de la aplicación:

- **`user`**: Gestiona los usuarios generales del sistema.
- **`auth`**: Maneja la autenticación y la seguridad.
- **`aprendiz`**: Gestiona la información de los aprendices.
- **`instructores`**: Gestiona la información de los instructores.
- **`semillero`**: Administra los semilleros de investigación.
- **`projecto`**: Se encarga de la información de los proyectos.
- **`cronograma`**: Gestiona las actividades y fechas de los proyectos.
- **`seguimiento`**: Permite registrar observaciones y seguimientos a los proyectos.
- **`evidencias`**: Administra las evidencias o entregables asociados a los proyectos.

## 3. Historial de Cambios

A continuación se presenta un resumen del historial de commits, desde el más reciente al más antiguo.

---

### **Commit: `295482d` (feat: Implementar y estandarizar CRUDs en la aplicación)**
- **Fecha:** 2025-08-25
- **Autor:** samuelva89
- **Descripción Detallada:** Este fue un commit masivo que representó un gran avance en la madurez del proyecto.
    - **Implementación de CRUDs:** Se completó la funcionalidad para Crear, Leer, Actualizar y Eliminar (CRUD) en los módulos de `Evidencias`, `Projecto` y `Seguimiento`, que previamente eran solo esqueletos.
    - **Estandarización:** Se unificó el estilo del código en todos los controladores, estandarizando los tipos de retorno de las funciones (usando `Promise<T>`) y los métodos HTTP.
    - **Corrección de Errores Críticos:** Se solucionaron dos bugs importantes en el módulo de `Seguimiento`:
        1. Se corrigió un error de inyección de dependencias del modelo de Mongoose.
        2. Se alineó el esquema de la base de datos con la interfaz de TypeScript para incluir relaciones con `Proyecto` y `User`.
    - **Limpieza de Código:** Se eliminó el módulo obsoleto e innecesario `instructores-projecto`.
    - **Correcciones de Linter:** Se solucionaron múltiples advertencias y errores de ESLint en todo el código para mejorar la calidad y el tipado seguro.

---

### **Commit: `ee2b105` (Actualización del CRUD)**
- **Fecha:** 2025-08-13
- **Autor:** samuelva89
- **Descripción:** Un commit intermedio que probablemente continuó el desarrollo de las funcionalidades CRUD.

---

### **Commit: `f540a6e` (se crea crud de aprendiz gia para desarrollo)**
- **Fecha:** 2025-08-08
- **Autor:** samuelva89
- **Descripción:** Marca la creación de la funcionalidad CRUD inicial para el módulo de `Aprendiz`, sirviendo como base para los demás módulos.

---

### **Commit: `dab4416` (feat: add modules for core features)**
- **Fecha:** 2025-08-04
- **Autor:** samuelva89
- **Descripción:** Se crearon los esqueletos de los módulos principales (`User`, `Auth`, `Projecto`, `Aprendiz`), estableciendo la arquitectura base de la aplicación.

---

### **Commit: `2281ca0` (Se agrega archivo para carga de documentacion APPNOVA)**
- **Fecha:** 2025-07-31
- **Autor:** samuelva89
- **Descripción:** Se añadió la documentación inicial al proyecto.

---

### **Commit: `1a380b3` (se agrega todo el paquete de nestjs para iniciar con la modulacion del backend)**
- **Fecha:** 2025-07-31
- **Autor:** samuelva89
- **Descripción:** Se inicializó el proyecto base de NestJS, preparando el terreno para el desarrollo.

---

### **Commit: `38afa3c` (Initial commit)**
- **Fecha:** 2025-07-24
- **Autor:** Samuelva89
- **Descripción:** El primer commit, que marca el nacimiento del repositorio.
