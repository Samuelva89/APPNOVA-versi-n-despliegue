
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './../src/auth/guards/roles.guard';
import { ProjectoDto, ProjectoEstado } from './../src/projecto/dto/projecto.dto';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('Projecto Controller - E2E Test', () => {
  let app: INestApplication;
  let mongooseConnection: Connection;

  // --- DATOS DE PRUEBA ---
  const projectoDePrueba: ProjectoDto = {
    fechaInicio: new Date('2025-01-01'),
    fechaFin: new Date('2025-12-31'),
    regional: 'Antioquia',
    municipio: 'Medellín',
    centroDeFormacion: 'Centro de Servicios y Gestión Empresarial',
    programaDeFormacion: 'ADSO',
    nombreDelSemilleroDeInvestigacion: 'Semillero ADSO',
    lineaDeInvestigacionAsociada: 'Línea de prueba',
    tituloDeProyecto: 'Mi Proyecto de Prueba E2E ' + Date.now(), // Título único
    resumen: 'Este es un resumen del proyecto.',
    palabrasClave: 'prueba, nestjs, dto',
    justificacion: 'Justificación de la prueba.',
    planteamientoDelProblema: 'Planteamiento del problema de la prueba.',
    estadoDelArte: 'Estado del arte opcional.',
    objetivoGeneral: 'Probar la creación de un proyecto.',
    objetivoEspecifico: 'Verificar que el DTO y el esquema funcionan.',
    beneficiarios: 'El equipo de desarrollo.',
    metodologia: 'Metodología de prueba con Supertest.',
    impactosEconomicoSocialAmbientalEsperados: 'Impacto positivo en el código.',
    resultadosEsperados: 'Un nuevo registro en la base de datos.',
    estado: ProjectoEstado.EN_DESARROLLO,
    bibliografia: 'Opcional',
    anexos: 'Opcional',
    // Campos de relación (opcionales para la creación básica)
    instructores: [],
    aprendices: [],
    cronograma: [],
    semillero: [],
    seguimiento: [],
    evidencias: [],
  };
  // -------------------------

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
    // Desactivamos el guard de autenticación para esta prueba
    .overrideGuard(AuthGuard('jwt'))
    .useValue({ canActivate: () => true })
    .overrideGuard(RolesGuard)
    .useValue({ canActivate: () => true })
    .compile();

    app = moduleFixture.createNestApplication();
    
    // Limpiar la base de datos antes de las pruebas
    mongooseConnection = app.get(getConnectionToken());
    await mongooseConnection.collection('projectos').deleteMany({});
    
    await app.init();
  });

  afterAll(async () => {
    // Cerrar la conexión a la base de datos y la app
    await mongooseConnection.close();
    await app.close();
  });

  it('debería crear un nuevo proyecto (POST /projecto)', () => {
    return request(app.getHttpServer())
      .post('/projecto')
      .send(projectoDePrueba)
      .expect(201) // Esperamos una respuesta "Created"
      .then((response) => {
        console.log('Respuesta del servidor:', response.body); // Mostramos la respuesta en consola
        expect(response.body).toBeDefined();
        expect(response.body.tituloDeProyecto).toEqual(projectoDePrueba.tituloDeProyecto);
      });
  });
});
