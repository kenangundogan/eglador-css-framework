export function generateAnimationClasses() {
    const animationClasses = {};

    animationClasses['animate-spin'] = `
        animation: spin 1s linear infinite;
    `;
    animationClasses['animate-ping'] = `
        animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
    `;
    animationClasses['animate-pulse'] = `
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    `;
    animationClasses['animate-bounce'] = `
        animation: bounce 1s infinite;
    `;

    const keyframes = `
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        @keyframes ping {
            75%, 100% {
                transform: scale(2);
                opacity: 0;
            }
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: .5;
            }
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(-25%);
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
                transform: translateY(0);
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
        }
    `;

    return {
        ...animationClasses,
        keyframes
    };
}
