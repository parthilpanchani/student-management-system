function Input({ className = "", ...props }) {
    return (
        <input
            {...props}
            className={`
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                dark:border-gray-600
                bg-white
                dark:bg-gray-800
                text-gray-900
                dark:text-white
                placeholder:text-gray-400
                dark:placeholder:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
                ${className}
            `}
        />
    );
}

export default Input;