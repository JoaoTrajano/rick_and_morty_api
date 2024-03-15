export class ApplicationOutput<Output = unknown, Metadata = unknown> {
  public value: Output
  public metadata?: Metadata

  constructor(value?: Output, metadata?: Metadata) {
    this.value = value ?? (undefined as Output)
    this.metadata = metadata ?? (undefined as Metadata)
  }

  public serialize(statusCode: number): {
    statusCode: number
    value?: Output
    metadata?: Metadata
  } {
    return {
      statusCode,
      value: this.value,
      metadata: this.metadata,
    }
  }

  public toHttpResponse(): any {
    const responses = {
      ErrorApplicationOutput: 500,
      ValidationErrorApplicationOutput: 400,
      UnauthorizedErrorApplicationOutput: 401,
      NotFoundErrorApplicationOutput: 404,
      UpdatedApplicationOutput: 200,
      DeletedApplicationOutput: 204,
      ApplicationOutput: 200,
      CreatedApplicationOutput: 201,
      undefined: 200,
    }

    const statusCode =
      responses[this?.constructor.name as keyof typeof responses]

    const serializedResponse = this?.serialize(statusCode)
    return serializedResponse
  }
}
