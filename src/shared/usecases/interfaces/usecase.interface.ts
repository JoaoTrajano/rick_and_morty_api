export interface ApplicationUseCase<Input = unknown, Output = unknown> {
  execute: (input: Input) => Promise<Output> | Output
}
