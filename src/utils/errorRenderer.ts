import { ZodIssue } from "zod";

const getErrorField = (fieldName: string, errors: ZodIssue[] | undefined) => {
    return errors
        ?.filter((error) => error.path.includes(fieldName))
        .map((error) => error.message)
        .join(", ");
};
export { getErrorField }
