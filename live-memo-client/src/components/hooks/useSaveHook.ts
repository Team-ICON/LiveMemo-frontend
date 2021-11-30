
import { useCallback, useState } from 'react';
import { useHelpers, useKeymap } from '@remirror/react';


async function saveContent(content: string) {
    // Fake API call
    console.log("qqq")
}

interface UseSaveHook {
    saving: boolean;
    error: Error | undefined;
}

// Create a hook which saves the content as markdown whenever `Ctrl-s` on Mac `Cmd-s` is pressed.
function useSaveHook() {
    const helpers = useHelpers();
    const [state, setState] = useState<UseSaveHook>({ saving: false, error: undefined });

    useKeymap(
        'Mod-s',
        useCallback(() => {
            // Convert the editor content to markdown.
            const markdown = helpers.getMarkdown();

            setState({ saving: true, error: undefined });

            saveContent(markdown)
                .then(() => {
                    setState({ saving: false, error: undefined });
                })
                .catch((error) => {
                    setState({ saving: true, error });
                });

            return true;
        }, [helpers]),
    );

    return state;
}

export default useSaveHook