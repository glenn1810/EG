import { HighLightStatus } from './highlight-status.model';

export interface User extends HighLightStatus  {
  id: number,
  name: string,
  email: string,
  phone: string
}
