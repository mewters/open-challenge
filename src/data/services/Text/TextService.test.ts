import { TextService } from './TextService';

describe('TextService', () => {
    it('should test URLToTitle', () => {
        expect(TextService.URLToTitle('01-js-basics')).toBe('01 - JS Basics');
        expect(TextService.URLToTitle('01-js-02-to-a-basics')).toBe(
            '01 - JS 02 to a Basics'
        );
        expect(TextService.URLToTitle('01-js-01-to-a-basics')).toBe(
            '01 - JS 01 to a Basics'
        );
        expect(TextService.URLToTitle('01-js-basics-01')).toBe(
            '01 - JS Basics 01'
        );
        expect(TextService.URLToTitle('01-js-01-to-a-basics-01')).toBe(
            '01 - JS 01 to a Basics 01'
        );
    });
    it('should test titleToURL', () => {
        expect(TextService.titleToURL('01 - JS Basics')).toBe('01-js-basics');
        expect(
            TextService.titleToURL('01 - JS !@#$%&*()[] 02 to a Basics')
        ).toBe('01-js-02-to-a-basics');
        expect(TextService.titleToURL('01 - JS 01 to a Basics')).toBe(
            '01-js-01-to-a-basics'
        );
        expect(TextService.titleToURL('01 - JS Basics 01')).toBe(
            '01-js-basics-01'
        );
        expect(TextService.titleToURL('01 - JS 01 to a Basics 01')).toBe(
            '01-js-01-to-a-basics-01'
        );
    });
});
