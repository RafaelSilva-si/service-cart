export class MissingParamError extends Error {
  status: number;
  constructor(paramError: string, status: number) {
    super(`Missing param ${paramError}`);
    this.name = 'MissingParamError';
    this.status = status || 400;
  }
}
