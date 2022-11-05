const editableStartTag = '[---editable---',
    hiddenStartTag = '[---hidden---',
    splitTag = '[!!@!!]',
    editableRegex = /(\[---editable---\n?(.*?)---editable---\]\n?)/gis,
    hiddenRegex = /(\[---hidden---\n?(.*?)---hidden---\]\n?)/gis;

export class CodeEditorRangesLogic {
    static getCodeRanges(code: string): {
        index: number;
        code: string;
        isEditable: boolean;
        isVisible: boolean;
    }[] {
        const codeRanges = code
            .replace(editableRegex, `${splitTag}$1${splitTag}`)
            .replace(hiddenRegex, `${splitTag}$1${splitTag}`)
            .split(splitTag)
            .map((codeRange, index) => {
                return {
                    index,
                    code: codeRange
                        .replace(editableRegex, '$2')
                        .replace(hiddenRegex, '$2'),
                    isEditable: codeRange.includes(editableStartTag),
                    isVisible: !codeRange.includes(hiddenStartTag),
                };
            });

        return codeRanges;
    }
    static getInitialLines(
        code: { code: string; isVisible: boolean }[]
    ): number[] {
        let lastLine = 1;
        const initialLines = code.map((codeRange) => {
            const initialLine = lastLine;
            if (codeRange.isVisible && codeRange.code) {
                lastLine += codeRange.code.split('\n').length;
            }
            return initialLine;
        });

        return initialLines;
    }
}
