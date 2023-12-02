// ControllerAdvice MethodArgumentNotValidException FieldError
type ValidationError = {
  field: string;
  type: string;
  message: string;
}

export default ValidationError
