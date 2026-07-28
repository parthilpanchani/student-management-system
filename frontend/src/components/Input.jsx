function Input(props) {
    return (
        <input
            {...props}
            className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                mt-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
            "
        />
    );
}

export default Input;