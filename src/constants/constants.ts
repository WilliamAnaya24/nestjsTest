import { ErrorDto } from './dto/error.dto';
import { SuccessExercise3Dto, SuccessExerciseTwoDto } from './dto/success.dto';

export const Constants = {
  repositories: {
    repositories: [
      {
        id: 1,
        state: 604,
      },
      {
        id: 2,
        state: 605,
      },
      {
        id: 3,
        state: 606,
      },
    ],
  },
  messages: {
    errors: {
      badRequest: {
        description: 'Bad Request',
      },
      unauthorized: {
        description: 'Unauthorized',
      },
      forbidden: {
        description: 'Forbidden',
      },
      notFound: {
        description: 'Not Found',
      },
      internalServerError: {
        description: 'Internal server error',
      },
      notImplemented: {
        description: 'Not implemented',
      },
      badGateway: {
        description: 'Bad Gateway',
      },
      serviceUnavailable: {
        description: 'Service Unavailable',
      },
      type: ErrorDto,
      tribuNoRegistrada: 'La Tribu no se encuentra registrada',
      tribuNoCumpleCoverage:
        'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
    },
    success: {
      success: {
        description: 'Success',
      },
      created: {
        description: 'created',
      },
      exerciseTwoResponse: SuccessExerciseTwoDto,
      exerciseThreeResponse: SuccessExercise3Dto,
    },
    states: {
      enable: 'Habilitado',
      disable: 'Inactivo',
    },
  },
};
