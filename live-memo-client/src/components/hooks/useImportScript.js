import { useEffect } from 'react';

const useImportScript = resourceUrl => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = resourceUrl;
        script.async = true;
        document.head.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, [resourceUrl]);
};
export default useImportScript;