export interface EmailData {
  email: string;
  template: string;
  subject: string;
  variables: {
    [key: string]: unknown;
  };
}
