import { useEffect } from "react";
import { useSelector } from "react-redux";

function ThemeManager() {

    const darkMode = useSelector(
        (state) => state.theme.darkMode
    );

    useEffect(() => {

        document.documentElement.classList.toggle(
            "dark",
            darkMode
        );

    }, [darkMode]);

    return null;
}

export default ThemeManager;