import { RelationData } from "@/types/relatives";
import { useState } from "react";

type EditInputProp = {
    inputFor: string;
    inputText: string;
    inputType: string;
    inputId: string;
    inputName: string;
    placeholder: string;
    defaultValue?: string;
    required?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
};

type PasswordProp = {
    inputFor: string;
    inputText: string;
    inputId: string;
    inputName: string;
    placeholder: string;
    error?: string;
};


type EditTextAreaProp = {
    inputFor: string;
    inputText: string;
    inputId: string;
    inputName: string;
    defaultValue?: string;
    required?: boolean
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
};

type EditSelectProp = {
    label: string;
    name: string;
    id: string;
    defaultValue?: string;
    data: RelationData[] | undefined
    handleStateChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
}


type ViewInputProp = {
    heading: string;
    text: string;
}

function EditableInputFIeld(inputProp: EditInputProp) {
    return (
        <>
            <div className="my-2 w-[min(80%,40rem)]">
                <label htmlFor={inputProp.inputFor} className="text-sm font-medium">{inputProp.inputText}</label> {inputProp.required && <span className="text-red-600 text-xl">*</span>}
                <br />
                <input
                    type={inputProp.inputType}
                    id={inputProp.inputId}
                    name={inputProp.inputName}
                    // will be required by default, it will be turned off when the component is invoked
                    required={inputProp.required}
                    placeholder={inputProp.placeholder}
                    className="mt-1 block w-full px-3 py-3 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={inputProp.defaultValue}
                    onChange={inputProp.onChange}
                />
                {/* Render error message if it exists */}
                {inputProp.error && <p style={{ color: 'red' }}>{inputProp.error}</p>}

            </div>
        </>
    );
}

function PasswordField(passwordProp: PasswordProp) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="my-2 w-[min(80%,40rem)]">
                <label htmlFor={passwordProp.inputFor} className="text-sm font-medium">{passwordProp.inputText}</label> <span className="text-red-600 text-xl">*</span>
                <br />
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id={passwordProp.inputId}
                        name={passwordProp.inputName}
                        required
                        placeholder={passwordProp.placeholder}
                        className="mt-1 block w-full px-3 py-3 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-3 flex items-center text-sm text-blue-500 focus:outline-none focus:font-extrabold"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                {/* Render error message if it exists */}
                {passwordProp.error && <p style={{ color: 'red' }}>{passwordProp.error}</p>}
            </div>
        </>
    );
}


function ImageInputField(inputProp: EditInputProp) {
    return (
        <>
            <div className="my-2 w-[min(80%,40rem)]">
                <label htmlFor={inputProp.inputFor} className="text-sm font-medium">{inputProp.inputText}</label> {inputProp.required && <span className="text-red-600 text-xl">*</span>}
                <br />
                <input
                    type={inputProp.inputType}
                    id={inputProp.inputId}
                    name={inputProp.inputName}
                    // will be required by default, it will be turned off when the component is invoked
                    required={inputProp.required}
                    placeholder={inputProp.placeholder}
                    className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={inputProp.defaultValue}
                    onChange={inputProp.onChange}
                    accept="image/*"
                />
                {/* Render error message if it exists */}
                {inputProp.error && <p style={{ color: 'red' }}>{inputProp.error}</p>}

            </div>
        </>
    );
}


function EditableTextAreaFIeld(inputProp: EditTextAreaProp) {
    return (
        <>
            <div className="my-2 w-[min(80%,40rem)]">
                <label htmlFor={inputProp.inputFor}>{inputProp.inputText}</label>
                <br />
                <textarea
                    id={inputProp.inputId}
                    name={inputProp.inputName}
                    // will be required by default, it will be turned off when the component is invoked
                    required={inputProp.required}
                    className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={inputProp.defaultValue}
                    onChange={inputProp.onChange}
                    rows={7}
                ></textarea>
                {/* Render error message if it exists */}
                {inputProp.error && <p style={{ color: 'red' }}>{inputProp.error}</p>}

            </div>
        </>
    );
}


function EditableSelectField(inputProp: EditSelectProp) {
    return (
        <>
            <div className="my-2 w-[min(80%,40rem)]">
                <label htmlFor={inputProp.name}>{inputProp.label}</label> <span className="text-red-600 text-xl">*</span>
                <select name={inputProp.name} id={inputProp.id} onChange={inputProp.handleStateChange} defaultValue={inputProp.defaultValue} className="px-2 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full rounded min-h-8 text-black" required >
                    <option value="">---</option>
                    {
                        inputProp.data?.map((relation) => (
                            <option key={relation.id} value={relation.id} >{relation.name}</option>
                        ))
                    }

                </select>
            </div>
        </>
    )
}



function ViewingInputField(inputProp: ViewInputProp) {
    return (
        <>
            <div className="my-2 w-[min(80%,40rem)]">
                <h2 className="mb-1">{inputProp.heading}</h2>
                <div className="px-3 py-3 border border-input-border-color w-full rounded min-h-8">
                    {inputProp.text}
                </div>
            </div>
        </>
    )
}


export { EditableInputFIeld, EditableTextAreaFIeld, EditableSelectField, PasswordField, ImageInputField, ViewingInputField };