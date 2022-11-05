import { CodeEditorRangesLogic } from './CodeEditorRanges.logic';

const exampleCode = `
const a = 1;
[---hidden---
const b = 2;
---hidden---]
const c = 3;
[---editable---
const d = 4;
---editable---]
const e = 5;
`;

describe('CodeEditorRangesLogic', () => {
    it('should split code in ranges', () => {
        const codeRanges = CodeEditorRangesLogic.getCodeRanges(exampleCode);
        expect(codeRanges).toHaveLength(5);

        expect(codeRanges[0].code).toContain('const a = 1;');
        expect(codeRanges[0].isEditable).toBeFalsy();
        expect(codeRanges[0].isVisible).toBeTruthy();

        expect(codeRanges[1].code).toContain('const b = 2;');
        expect(codeRanges[1].isEditable).toBeFalsy();
        expect(codeRanges[1].isVisible).toBeFalsy();

        expect(codeRanges[2].code).toContain('const c = 3;');
        expect(codeRanges[2].isEditable).toBeFalsy();
        expect(codeRanges[2].isVisible).toBeTruthy();

        expect(codeRanges[3].code).toContain('const d = 4;');
        expect(codeRanges[3].isEditable).toBeTruthy();
        expect(codeRanges[3].isVisible).toBeTruthy();

        expect(codeRanges[4].code).toContain('const e = 5;');
        expect(codeRanges[4].isEditable).toBeFalsy();
        expect(codeRanges[4].isVisible).toBeTruthy();

        const fullCode = codeRanges.map((codeRange) => codeRange.code).join('');
        expect(fullCode).not.toContain('---hidden---');
        expect(fullCode).not.toContain('---editable---');
    });

    it('should get initial lines', () => {
        const codeRanges = CodeEditorRangesLogic.getCodeRanges(exampleCode);
        const initialLines = CodeEditorRangesLogic.getInitialLines(codeRanges);
        expect(initialLines).toHaveLength(5);
        expect(initialLines[0]).toBe(1);
        expect(initialLines[1]).toBe(4);
        expect(initialLines[2]).toBe(4);
        expect(initialLines[3]).toBe(6);
        expect(initialLines[4]).toBe(8);
    });
});
