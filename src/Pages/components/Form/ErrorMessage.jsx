const ErrorMessage = ({ visibility, message }) => {
    return (
        <>
            {visibility && (
                <span className="text-xs text-red-500">
                    {message || "This field is required"}
                </span>
            )}
        </>
    );
};

export default ErrorMessage