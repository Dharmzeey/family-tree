import { useFormStatus } from "react-dom";

type SubmitButtonProp = {
    buttonText: string;
    pendingText: string;
};

type ActioButtonProp = {
    buttonText: string;
    onClick: () => void;
}
export function SubmitButton(buttonProp: SubmitButtonProp) {
    const { pending } = useFormStatus();

    return (
        <div className="flex justify-center mt-4">
            <button
                type="submit"
                aria-disabled={pending}
                disabled={pending}
                className="w-full bg-blue-500 text-white py-2 px-4 cursor-pointer rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {pending ? buttonProp.pendingText : buttonProp.buttonText.toUpperCase()}
            </button>
        </div>
    );
}

export function ActionButton(buttonProp: ActioButtonProp) {
    const { pending } = useFormStatus();

    return (
        <div className="flex justify-center">
            <button
                type="button"
                aria-disabled={pending}
                disabled={pending}
                onClick={buttonProp.onClick}
                className="w-full bg-blue-500 text-white py-2 px-4 cursor-pointer rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                { buttonProp.buttonText.toUpperCase()}
            </button>
        </div>
    );
}
