export interface MyFormData {
  given_name?: string;
  family_name?: string;
}

export interface ValidationResult {
  result: boolean;
  errors: { [k in keyof MyFormData]: string };
}
