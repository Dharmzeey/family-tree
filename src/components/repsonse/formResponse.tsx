import { ActionResponse } from "@/types/api";
import { ZodIssue } from "zod";

type FormMessageProps = {
    formState: ActionResponse, 
    errors: ZodIssue[] | undefined
}

export default function FormMessages({formState, errors}: FormMessageProps) {
    return (
        <>
            {
                formState.error && (
                    <div aria-live="polite" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-2 text-sm mb-4" role="status" >
                        {formState.error}
                    </div >
                )
            }
            {/* {
                errors && (
                    <div aria-live="polite" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-2 text-sm mb-4" role="status" >
                        {
                            errors.map((error, index) => (
                                <p key={index} > {error.message} </p>
                            ))
                        }
                    </div >
                )
            } */}
            {
                formState.message && (
                    <div aria-live="polite" className="bg-green-100 border border-green-400 text-green-600 px-4 py-3 rounded mt-2 text-sm mb-4" role="status" >
                        {formState.message}
                    </div >
                )
            }
        </>
    )
}