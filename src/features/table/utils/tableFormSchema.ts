import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import utc from "dayjs/plugin/utc";
import { z } from "zod";

dayjs.extend(utc);
dayjs.extend(isSameOrBefore);

const isValidDayjs = (date: unknown): date is Dayjs =>
  dayjs.isDayjs(date) && date.isValid();
const isNotFutureDate = (date: Dayjs) =>
  date.isSameOrBefore(dayjs.utc(), "day");
const toUtcISOString = (value: Dayjs | string) =>
  dayjs.utc(value).toISOString();

const DATE_ERRORS = {
  INVALID: "Date is invalid",
  FUTURE: "Date cannot be in the future",
};

const REQUIRED_ERROR = (field: string) => `${field} is required`;

export const dateSchema = z
  .custom<Dayjs | string>()
  .refine((date) => isValidDayjs(dayjs.utc(date)), DATE_ERRORS.INVALID)
  .refine((date) => isNotFutureDate(dayjs.utc(date)), DATE_ERRORS.FUTURE)
  .transform(toUtcISOString);

const FIELD_SCHEMAS = {
  id: z.string(),
  companySigDate: dateSchema,
  companySignatureName: z
    .string()
    .min(1, REQUIRED_ERROR("Company signature name")),
  documentName: z.string().min(1, REQUIRED_ERROR("Document name")),
  documentStatus: z.string().min(1, REQUIRED_ERROR("Document status")),
  documentType: z.string().min(1, REQUIRED_ERROR("Document type")),
  employeeNumber: z.string().min(1, REQUIRED_ERROR("Employee number")),
  employeeSigDate: dateSchema,
  employeeSignatureName: z
    .string()
    .min(1, REQUIRED_ERROR("Employee signature name")),
};

export const tableFormSchema = z.object(FIELD_SCHEMAS);
export type TableFormSchema = z.infer<typeof tableFormSchema>;
