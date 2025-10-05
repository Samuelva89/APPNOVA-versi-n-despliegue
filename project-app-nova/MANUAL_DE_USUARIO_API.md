# Manual de Usuario (API) - Proyecto APPNOVA

**Versión:** 2.0
**Fecha:** 01 de octubre de 2025

## 1. Introducción

Este documento describe la API RESTful para el proyecto APPNOVA. Proporciona la información necesaria para que los desarrolladores interactúen con los recursos del sistema, como usuarios, proyectos, aprendices, etc.

### 1.1. URL Base

Todas las rutas de la API son relativas a la URL base del servidor.

`http://<host_del_servidor>/api`

### 1.2. Autenticación

La mayoría de los endpoints de esta API están protegidos. Para acceder a ellos, es necesario obtener un **Token de Acceso (JWT)** y presentarlo en cada solicitud.

El flujo es el siguiente:

1.  Enviar credenciales (email y contraseña) al endpoint `POST /auth/login`.
2.  Si las credenciales son válidas, el servidor devolverá un `access_token`.
3.  En las solicitudes a endpoints protegidos, se debe incluir este token en la cabecera `Authorization` con el formato `Bearer`.

**Ejemplo de Cabecera:**
```
Authorization: Bearer <tu_access_token>
```

---

## 2. Módulo de Autenticación (`/auth`)

Endpoints públicos para el registro y la autenticación de usuarios.

### `POST /auth/register`

-   **Descripción:** Registra un nuevo usuario en el sistema.
-   **Autenticación:** No requerida.

### `POST /auth/login`

-   **Descripción:** Autentica a un usuario y devuelve un token de acceso.
-   **Autenticación:** No requerida.

---

## 3. Módulo de Usuarios (`/user`)

Gestiona las cuentas de usuario del sistema. Todos los endpoints aquí requieren autenticación.

### `GET /user`
-   **Descripción:** Obtiene una lista de todos los usuarios.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`.

### `POST /user`
-   **Descripción:** Crea un nuevo usuario.
-   **Roles Permitidos:** **¡No definido!**
-   **NOTA DE SEGURIDAD:** Cualquier usuario autenticado puede crear otros usuarios. Se recomienda restringir a `LIDER_DE_PROYECTO`.

### `PUT /user/:id`
-   **Descripción:** Actualiza la información de un usuario.
-   **Roles Permitidos:** **¡No definido!**
-   **NOTA DE SEGURIDAD:** Cualquier usuario autenticado puede intentar actualizar a otros. Se recomienda restringir.

---

## 4. Módulo de Aprendices (`/aprendiz`)

Gestiona los perfiles detallados de los aprendices.

### `GET /aprendiz`
-   **Descripción:** Obtiene una lista de todos los aprendices.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`, `DINAMIZADOR`, `LIDER_DE_SEMILLERO`, `COINVESTIGADOR`, `INVESTIGADOR`.

### `POST /aprendiz`
-   **Descripción:** Crea un nuevo perfil de aprendiz.
-   **Roles Permitidos:** **¡No definido!**
-   **NOTA DE SEGURIDAD:** Cualquier usuario autenticado puede crear perfiles. Se recomienda restringir a roles de gestión.

---

## 5. Módulo de Instructores (`/instructores`)

Gestiona los perfiles detallados de los instructores.

### `GET /instructores`
-   **Descripción:** Obtiene una lista de todos los instructores.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`, `DINAMIZADOR`, `LIDER_DE_SEMILLERO`, `COINVESTIGADOR`, `INVESTIGADOR`.

### `POST /instructores`
-   **Descripción:** Crea un nuevo perfil de instructor.
-   **Roles Permitidos:** **¡No definido!**
-   **NOTA DE SEGURIDAD:** Cualquier usuario autenticado puede crear perfiles. Se recomienda restringir a roles de gestión.

---

## 6. Módulo de Proyectos (`/projecto`)

El módulo central de la aplicación. Gestiona todo el ciclo de vida de los proyectos.

### `GET /projecto`
-   **Descripción:** Obtiene una lista de proyectos. La lista se filtra automáticamente según el rol del usuario.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`, `DINAMIZADOR`, `COINVESTIGADOR`, `INVESTIGADOR`, `LIDER_DE_SEMILLERO`.

### `POST /projecto`
-   **Descripción:** Crea un nuevo proyecto.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`.

### `GET /projecto/:id`
-   **Descripción:** Obtiene un proyecto específico. El acceso se verifica para asegurar que el usuario tenga relación con el proyecto.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`, `DINAMIZADOR`, `COINVESTIGADOR`, `INVESTIGADOR`, `LIDER_DE_SEMILLERO`.

### `DELETE /projecto/:id`
-   **Descripción:** Elimina un proyecto.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`.

---

## 7. Módulo de Semilleros (`/semillero`)

Gestiona los semilleros de investigación.

### `GET /semillero`
-   **Descripción:** Obtiene una lista de todos los semilleros.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`, `DINAMIZADOR`, `LIDER_DE_SEMILLERO`.

### `POST /semillero`
-   **Descripción:** Crea un nuevo semillero.
-   **Roles Permitidos:** **¡No definido!**
-   **NOTA DE SEGURIDAD:** Cualquier usuario autenticado puede crear semilleros. Se recomienda restringir.

---

## 8. Módulo de Cronogramas (`/cronograma`)

Gestiona las actividades y fechas de un proyecto.

### `GET /cronograma`
-   **Descripción:** Obtiene todos los cronogramas.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`, `DINAMIZADOR`, `LIDER_DE_SEMILLERO`, `COINVESTIGADOR`, `INVESTIGADOR`.

### `POST /cronograma`
-   **Descripción:** Crea un nuevo cronograma para un proyecto.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`, `COINVESTIGADOR`, `INVESTIGADOR`.

---

## 9. Módulo de Evidencias (`/evidencias`)

Gestiona la subida de archivos asociados a un proyecto.

### `POST /evidencias/upload`
-   **Descripción:** Sube un archivo como evidencia para un proyecto. La petición debe ser de tipo `multipart/form-data`.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`, `COINVESTIGADOR`, `INVESTIGADOR`.

### `GET /evidencias`
-   **Descripción:** Obtiene una lista de todas las evidencias.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`, `DINAMIZADOR`, `LIDER_DE_SEMILLERO`, `COINVESTIGADOR`, `INVESTIGADOR`.

---

## 10. Módulo de Seguimiento (`/seguimiento`)

Gestiona las actas y observaciones de seguimiento de los proyectos.

### `GET /seguimiento`
-   **Descripción:** Obtiene todos los registros de seguimiento.
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`, `DINAMIZADOR`, `COINVESTIGADOR`, `INVESTIGADOR`, `LIDER_DE_SEMILLERO`.

### `POST /seguimiento`
-   **Descripción:** Crea un nuevo registro de seguimiento (acta).
-   **Roles Permitidos:** `LIDER_DE_PROYECTO`, `DINAMIZADOR`.

---

*Fin del documento (versión 2.0 - Actualizada).*
