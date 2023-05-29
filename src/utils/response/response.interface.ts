export interface RMessage {
  readonly value: string;
  readonly property: string;
  readonly constraint: string[];
}

export interface IResponse {
  readonly statusCode: number;
  readonly message?: string;
  readonly errors?: RMessage[];
  readonly data?: Record<string, any> | Record<string, any>[];
}