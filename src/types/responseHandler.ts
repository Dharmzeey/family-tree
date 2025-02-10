export interface ApiErrors {
    errors?: { [key: string]: string }
}

export function handleErrorsResponse(responseBody: ApiErrors): string | null {
    if (!responseBody.errors) {
        return null ;
    }

    // This function handle the scenario where more than one error is returned from the server, so it comes as "errors"
    if (responseBody.errors) {
        // Concatenate all errors into a single string
        const concatenatedErrors = Object.entries(responseBody.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join("\n ");

        return concatenatedErrors ;
    }
    return "Unexpected response format" ;
}