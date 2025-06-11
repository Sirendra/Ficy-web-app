import { GenericResponse } from '../interfaces/generic-response.interface';

export const extractDataFromResponse = <T>(
  response: GenericResponse<T>
): T | undefined => {
  return response.data;
};
