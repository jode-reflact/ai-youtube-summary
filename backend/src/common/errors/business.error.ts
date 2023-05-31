export class BusinessError extends Error {
  descriptionCode: string;

  constructor(message: string, descriptionCode: string) {
    super(message);
    this.descriptionCode = descriptionCode;
  }
}
