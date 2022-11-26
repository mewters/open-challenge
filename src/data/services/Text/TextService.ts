export class TextService {
    static URLToTitle(url: string) {
        return url
            .replace(/-/g, ' ')
            .replace(/^(\d{2}) /, '$1 - ')
            .split(' ')
            .map((word) => {
                if (word.toLocaleLowerCase() === 'js') {
                    return 'JS';
                } else if (word.length > 2) {
                    return word[0].toUpperCase() + word.slice(1);
                }
                return word;
            })
            .join(' ');
    }
}
