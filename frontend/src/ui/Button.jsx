function Button({
    children,
    className = "",
    variant = "primary",
    ...props
}) {

    const styles = {
        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",

        success:
            "bg-green-600 hover:bg-green-700 text-white",

        danger:
            "bg-red-600 hover:bg-red-700 text-white",

        secondary:
            "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white",
    };

    return (

        <button
            {...props}
            className={`px-6 py-3 rounded-lg font-medium transition ${styles[variant]} ${className}`}
        >
            {children}
        </button>

    );

}

export default Button;