import { TextService } from './TextService';

describe('TextService', () => {
    // beforeAll(() => {
    //     jest.useFakeTimers();
    //     jest.spyOn(global, 'setTimeout');
    // });
    // afterAll(() => {
    //     jest.useRealTimers();
    //     jest.clearAllTimers();
    // });
    it('should test URLToTitle', () => {
        expect(TextService.URLToTitle('01-js-basics')).toBe('01 - JS Basics');
        expect(TextService.URLToTitle('01-js-02-to-a-basics')).toBe(
            '01 - JS 02 to a Basics'
        );
    });
});
