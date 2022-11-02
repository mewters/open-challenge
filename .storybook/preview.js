import StoryThemeProvider from '../src/ui/theme/StoryThemeProvider';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            icon: 'circlehollow',
            items: [
                { value: 'light', icon: 'circlehollow', title: 'light' },
                { value: 'dark', icon: 'circle', title: 'dark' },
                {
                    value: 'side-by-side',
                    icon: 'sidebar',
                    title: 'side by side',
                },
            ],
        },
    },
};

export const decorators = [StoryThemeProvider];
