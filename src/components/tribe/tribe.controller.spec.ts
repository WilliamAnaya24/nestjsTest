import { Test, TestingModule } from '@nestjs/testing';
import { TribeController } from './tribe.controller';
import { TribeService } from './tribe.service';
import { response } from 'express';

describe('TribeController', () => {
  let controller: TribeController;
  const DTOMOCK = {
    repositories: [
      {
        id: '1', // identificador del repositorio
        name: 'cd-common-utils', // nombre del repositorio
        tribe: 'Centro Digital', // nombre de la tribu
        organization: 'Banco', // nombre de la organización
        coverage: '35%', // cobertura de pruebas unitarias
        codeSmells: 0,
        bugs: 0,
        vulnerabilities: 0,
        hotspots: 0,
        verificationState: 'Verificado', // Estado de verificación (Mock)
        state: 'Habilitado', // Estado del repositorio (state)
      },
      {
        id: '2',
        name: 'cd-common-text',
        tribe: 'Centro Digital',
        organization: 'Banco',
        coverage: '75%',
        codeSmells: 1,
        bugs: 0,
        vulnerabilities: 2,
        hotspots: 0,
        verificationState: 'En espera',
        state: 'Archivado',
      },
    ],
  };

  const TribeMockService = {
    find: jest.fn().mockImplementation(() => DTOMOCK),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TribeController],
      providers: [TribeService],
    })
      .overrideProvider(TribeService)
      .useValue(TribeMockService)
      .compile();

    controller = module.get<TribeController>(TribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get repositories by tribe', () => {
    const dto = {
      repositories: [
        {
          id: '1', // identificador del repositorio
          name: 'cd-common-utils', // nombre del repositorio
          tribe: 'Centro Digital', // nombre de la tribu
          organization: 'Banco', // nombre de la organización
          coverage: '35%', // cobertura de pruebas unitarias
          codeSmells: 0,
          bugs: 0,
          vulnerabilities: 0,
          hotspots: 0,
          verificationState: 'Verificado', // Estado de verificación (Mock)
          state: 'Habilitado', // Estado del repositorio (state)
        },
        {
          id: '2',
          name: 'cd-common-text',
          tribe: 'Centro Digital',
          organization: 'Banco',
          coverage: '75%',
          codeSmells: 1,
          bugs: 0,
          vulnerabilities: 2,
          hotspots: 0,
          verificationState: 'En espera',
          state: 'Archivado',
        },
      ],
    };
    expect(controller.find(22)).toEqual(dto);
    expect(TribeMockService.find).toHaveBeenCalled();
  });

  it('should get download csv by tribe', () => {
    const dto = {
      repositories: [
        {
          id: '1', // identificador del repositorio
          name: 'cd-common-utils', // nombre del repositorio
          tribe: 'Centro Digital', // nombre de la tribu
          organization: 'Banco', // nombre de la organización
          coverage: '35%', // cobertura de pruebas unitarias
          codeSmells: 0,
          bugs: 0,
          vulnerabilities: 0,
          hotspots: 0,
          verificationState: 'Verificado', // Estado de verificación (Mock)
          state: 'Habilitado', // Estado del repositorio (state)
        },
        {
          id: '2',
          name: 'cd-common-text',
          tribe: 'Centro Digital',
          organization: 'Banco',
          coverage: '75%',
          codeSmells: 1,
          bugs: 0,
          vulnerabilities: 2,
          hotspots: 0,
          verificationState: 'En espera',
          state: 'Archivado',
        },
      ],
    };
    expect(controller.export(22, response)).toEqual(dto);
    expect(TribeMockService.find).toHaveBeenCalled();
  });
});
