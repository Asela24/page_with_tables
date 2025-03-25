import { z } from 'zod';
import { loginFormSchema } from '../utils/validation';

export type FormFields = z.infer<typeof loginFormSchema>;