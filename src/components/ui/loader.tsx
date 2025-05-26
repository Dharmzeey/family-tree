interface loaderProp {
    headerText?: string;
    subText?: string;
}

export function Loader(text: loaderProp) {
    return <div className="flex flex-col justify-center items-center h-[40vh] text-white">
        <svg className="animate-spin h-8 w-8 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        {text.headerText && <span className="text-lg font-semibold">{text.headerText}</span>}
        {text.subText && <span className="text-sm text-white/70 mt-1">{text.subText}</span>}
    </div>
}

export function DotsLoader() {
    return (
        <div className="flex flex-col justify-center items-center h-[40vh] text-white">
            <div className="flex space-x-2 mb-4">
                <span className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
        </div>
    );
}