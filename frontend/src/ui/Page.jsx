function Page({ children, className = "" }) {
    return (
        <div
            className={`
                bg-gray-100
                dark:bg-gray-950
                min-h-full
                transition-colors
                duration-300
                ${className}
            `}
        >
            {children}
        </div>
    );
}

export default Page;