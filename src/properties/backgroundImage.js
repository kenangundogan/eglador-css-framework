export function generateBackgroundImageClasses() {
    return {
        'bg-none': 'background-image: none;',
        'bg-gradient-to-t': 'background-image: linear-gradient(to top, var(--kg-gradient-stops));',
        'bg-gradient-to-tr': 'background-image: linear-gradient(to top right, var(--kg-gradient-stops));',
        'bg-gradient-to-r': 'background-image: linear-gradient(to right, var(--kg-gradient-stops));',
        'bg-gradient-to-br': 'background-image: linear-gradient(to bottom right, var(--kg-gradient-stops));',
        'bg-gradient-to-b': 'background-image: linear-gradient(to bottom, var(--kg-gradient-stops));',
        'bg-gradient-to-bl': 'background-image: linear-gradient(to bottom left, var(--kg-gradient-stops));',
        'bg-gradient-to-l': 'background-image: linear-gradient(to left, var(--kg-gradient-stops));',
        'bg-gradient-to-tl': 'background-image: linear-gradient(to top left, var(--kg-gradient-stops));',
    };
}
