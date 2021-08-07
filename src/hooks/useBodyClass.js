import { useEffect } from "react";

const useBodyClass = (classList='dummy-class') => {
    useEffect(() => {
        document.body.classList.add(classList);

        return () => {
            document.body.classList.remove(classList);
        }
    }, [classList]);

    return false;
}

export default useBodyClass;