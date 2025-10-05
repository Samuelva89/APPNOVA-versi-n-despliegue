# Informe de Ejecución de Pruebas - Proyecto APPNOVA

**Fecha:** 01 de octubre de 2025
**Autor:** Samuel Velasquez (Generado por Gemini)

## 1. Pruebas Unitarias

---

| Campo | Descripción |
| :--- | :--- |
| **Número del Caso** | UT-001 |
| **Caso de Prueba** | Ejecución completa de la suite de pruebas unitarias. |
| **Descripción** | Verificar que todos los componentes y servicios individuales de todos los módulos funcionan como se espera de forma aislada. |
| **Tipo de Prueba** | Unitaria (White Box). |
| **Cómo se hará** | Ejecutar el comando `npm test` en el directorio del proyecto. |
| **Fin** | Asegurar la correcta funcionalidad de las unidades de código individuales y la lógica de negocio interna. |
| **Ambiente** | Entorno de desarrollo local (Node.js, Jest). |
| **Herramienta** | Jest. |
| **Salida Esperada** | Todas las 11 suites de pruebas (94 tests) deben pasar (`PASS`). |
| **Salida Obtenida** | Todas las 11 suites de pruebas (94 tests) pasaron (`PASS`). Sin embargo, se observó una advertencia. |
| **Resultado** | ✅ **APROBADO con Observaciones** |
| **Seguimiento** | La advertencia `A worker process has failed to exit gracefully` indica una posible fuga de recursos. Se recomienda investigar usando el flag `--detectOpenHandles` en Jest. |
| **Severidad** | **Media**. No impide el funcionamiento pero afecta la calidad y estabilidad de las pruebas. |
| **Evidencia** | ```text
> project-app-nova@0.0.1 test
> jest

PASS src/seguimiento/seguimiento.service.integration.spec.ts
PASS src/aprendiz/aprendiz.service.integration.spec.ts
PASS src/instructores/instructores.service.integration.spec.ts
...
(11 suites pasadas)

Test Suites: 11 passed, 11 total
Tests:       94 passed, 94 total
Time:        10.68 s

A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown.
``` |

## 2. Pruebas de Integración (End-to-End)

---

| Campo | Descripción |
| :--- | :--- |
| **Número del Caso** | E2E-001 |
| **Caso de Prueba** | Creación de un nuevo proyecto (`POST /projecto`). |
| **Descripción** | Verificar que el endpoint de creación de proyectos funciona correctamente en un entorno integrado, creando un registro en la base de datos. |
| **Tipo de Prueba** | Integración (Black Box). |
| **Cómo se hará** | Ejecutar el comando `npm run test:e2e`. |
| **Fin** | Asegurar que el flujo completo de creación de proyectos, incluyendo la interacción con la base de datos, es exitoso. |
| **Ambiente** | Entorno de desarrollo local (Node.js, Jest, Supertest, MongoDB In-Memory). |
| **Herramienta** | Jest, Supertest. |
| **Salida Esperada** | El servidor debe devolver un código de estado `201 Created`. |
| **Salida Obtenida** | El servidor devolvió un código de estado `500 Internal Server Error` debido a un error de clave duplicada en la base de datos. |
| **Resultado** | ❌ **FALLIDO** |
| **Seguimiento** | Se requiere una acción correctiva para limpiar la base de datos antes de la ejecución de cada prueba y evitar conflictos de datos. |
| **Severidad** | **Crítica**. Impide el funcionamiento de una característica principal del sistema. |
| **Evidencia** | ```text
FAIL test/projecto.e2e-spec.ts
  ● Projecto Controller - E2E Test › debería crear un nuevo proyecto (POST /projecto)

    expected 201 "Created", got 500 "Internal Server Error"

[Nest] ERROR [ExceptionsHandler] MongoServerError: E11000 duplicate key error collection: appnova.projectos index: titulo_1 dup key: { titulo: null }
``` |

---

| Campo | Descripción |
| :--- | :--- |
| **Número del Caso** | E2E-002 (Verificación de E2E-001) |
| **Caso de Prueba** | Verificación de la corrección en la creación de un nuevo proyecto. |
| **Descripción** | Volver a ejecutar la prueba de integración después de aplicar la corrección para asegurar que el problema de la base de datos ha sido resuelto. |
| **Tipo de Prueba** | Regresión / Confirmación. |
| **Cómo se hará** | Se modificó el archivo `test/projecto.e2e-spec.ts` para añadir un hook `beforeAll` que limpia la colección `projectos` y un `afterAll` que cierra la conexión. Luego, se ejecuta `npm run test:e2e`. |
| **Fin** | Confirmar que la acción correctiva fue efectiva y que el caso de prueba E2E-001 ahora pasa. |
| **Ambiente** | Entorno de desarrollo local (Node.js, Jest, Supertest, MongoDB In-Memory). |
| **Herramienta** | Jest, Supertest. |
| **Salida Esperada** | Todas las suites de pruebas de integración deben pasar (`PASS`). |
| **Salida Obtenida** | Todas las 2 suites de pruebas de integración pasaron (`PASS`). |
| **Resultado** | ✅ **APROBADO** |
| **Seguimiento** | El error crítico ha sido resuelto. El caso de prueba se cierra. |
| **Severidad** | N/A (Verificación). |
| **Evidencia** | ```text
> project-app-nova@0.0.1 test:e2e
> jest --config ./test/jest-e2e.json

PASS test/app.e2e-spec.ts
PASS test/projecto.e2e-spec.ts

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Time:        3.96 s
``` |
