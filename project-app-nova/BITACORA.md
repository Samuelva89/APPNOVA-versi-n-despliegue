---

### **Commit: `N/A` (feat: Configuración de Permisos para el Rol DINAMIZADOR)**
- **Fecha:** 2025-09-08
- **Autor:** Gemini CLI
- **Descripción Detallada:** Se configuraron los permisos de acceso para el rol `DINAMIZADOR` en los diferentes módulos de la aplicación, alineando la funcionalidad con sus responsabilidades.
    - **Módulo `Seguimiento`:** Se ajustó para que el `DINAMIZADOR` tenga control total (CRUD completo) sobre los seguimientos. El `LIDER_DE_PROYECTO` mantiene su acceso de superusuario.
    - **Módulos de Solo Lectura:** Se configuró el acceso de solo lectura (métodos `GET`) para el `DINAMIZADOR` en los módulos `aprendiz`, `cronograma`, `evidencias`, `instructores`, `projecto`, `semillero` y `user`. Las operaciones de escritura ( `POST`, `PUT`, `PATCH`, `DELETE`) en estos módulos permanecen restringidas al `LIDER_DE_PROYECTO`.
    - **Implementación de Guardianes a Nivel de Método:** Para lograr esta granularidad de permisos, se eliminaron los guardianes a nivel de clase en los controladores y se aplicaron a nivel de método, utilizando `@UseGuards(AuthGuard('jwt'), RolesGuard)` y `@Roles()` según la lógica de acceso requerida.

---

### **Commit: `N/A` (feat: Implementación de Control de Acceso y Superusuario)**
- **Fecha:** 2025-09-08
- **Autor:** Gemini CLI
- **Descripción Detallada:** Se implementó un sistema de control de acceso basado en roles (RBAC) robusto y se aseguró el acceso a todos los módulos de la aplicación.
    - **Rol de Superusuario:** Se modificó el `RolesGuard` para que el rol `LIDER_DE_PROYECTO` tenga acceso irrestricto a todos los endpoints protegidos, funcionando como un superusuario.
    - **Seguridad por Defecto:** Se fortaleció el `RolesGuard` para que, si una ruta no especifica roles, deniegue el acceso por defecto a cualquier usuario que no sea `LIDER_DE_PROYECTO`. Este cambio previene accesos no autorizados.
    - **Protección de Módulos CRUD:** Se aplicó una protección a nivel de controlador (`@UseGuards(AuthGuard('jwt'), RolesGuard)`) a todos los módulos principales (`aprendiz`, `cronograma`, `evidencias`, `instructores`, `projecto`, `seguimiento`, `semillero`, `user`). Esto restringe todas las operaciones CRUD de estas entidades al `LIDER_DE_PROYECTO`.
    - **Consistencia de Código:** Se limpiaron y estandarizaron las importaciones y decoradores en los controladores afectados para mantener la consistencia en todo el proyecto.
    - **Actualización de Pruebas:** Se actualizaron las pruebas unitarias del `RolesGuard` para verificar la nueva lógica de superusuario y de seguridad por defecto, asegurando la robustez de los cambios.

---

### **Commit: `N/A` (fix: Corrección de Pruebas y Formato)**
- **Fecha:** 2025-09-08
- **Autor:** Gemini CLI
- **Descripción Detallada:** Se realizaron correcciones en el código para asegurar la calidad y el correcto funcionamiento de las pruebas automatizadas.
    - **Corrección de Formato (Linting):** Se ejecutó ESLint con la opción `--fix` para corregir problemas de formato en el archivo `src/auth/guards/roles.guard.spec.ts`, asegurando que el código cumpla con las convenciones de estilo del proyecto.
    - **Configuración de Pruebas (Jest):** Se solucionó un error crítico que impedía la ejecución de las pruebas. El problema se debía a que Jest no podía resolver las rutas de importación con el alias `src/`. Se corrigió añadiendo un `moduleNameMapper` a la configuración de Jest en el archivo `package.json`.
    - **Verificación:** Tras las correcciones, el comando `npm run test` se ejecuta exitosamente, y todas las pruebas pasan.

---

### **Commit: `163fbaa` (feat: Implementación del Módulo de Autenticación)**
- **Fecha:** 2025-08-25
- **Autor:** Gemini CLI
- **Descripción Detallada:** Se ha implementado el módulo de autenticación básico para la aplicación.
    - **Configuración de Entorno:** Se migró la configuración de la base de datos para utilizar variables de entorno a través de un archivo `.env` y el módulo `@nestjs/config`. Se eliminó el archivo `database.config.ts` obsoleto.
    - **Autenticación de Usuarios:** Se implementaron las funcionalidades de registro y login de usuarios.
    - **Hashing de Contraseñas:** Se utiliza `bcrypt` para el hashing seguro de las contraseñas de los usuarios.
    - **Generación de Tokens:** Se implementó la generación de JSON Web Tokens (JWT) para la gestión de sesiones de usuario.
    - **Estrategias de Autenticación:** Se configuraron `LocalStrategy` para la autenticación por credenciales y `JwtStrategy` para la validación de tokens.
    - **Actualización de DTOs:** Se ajustaron los DTOs de autenticación (`LoginAuthDto`, `RegisterAuthDto`) para que coincidan con el esquema de usuario (`UserSchema`).
    - **Corrección de Errores:** Se resolvieron varios errores de compilación relacionados con rutas de importación, métodos de `UserService` (`create`, `findOneByEmail`) y la instalación de `passport-jwt`.