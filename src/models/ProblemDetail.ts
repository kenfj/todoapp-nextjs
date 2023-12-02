import ValidationError from "./ValidationError";

// RFC7807 Error Response in Spring Boot 3
export type ProblemDetail = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  fieldErrors: [ValidationError];
}
