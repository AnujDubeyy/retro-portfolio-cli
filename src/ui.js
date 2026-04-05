import chalk from 'chalk';

export let currentTheme = 'loki'; // 'loki' or 'spider'

export const t = {
    primary: (text) => {
        if (currentTheme === 'loki') return chalk.hex('#39FF14')(text); // Green
        if (currentTheme === 'spider') return chalk.hex('#FF0000')(text); // Red
    },
    secondary: (text) => {
        if (currentTheme === 'loki') return chalk.hex('#FFD700')(text); // Gold
        if (currentTheme === 'spider') return chalk.hex('#0000FF')(text); // Blue
    },
    accent: (text) => {
        if (currentTheme === 'loki') return chalk.hex('#00FF00').bold(text);
        if (currentTheme === 'spider') return chalk.hex('#FF0000').bold(text);
    },
    neutral: (text) => chalk.hex('#E0E0E0')(text),
    dim: (text) => chalk.hex('#555566')(text),
    bold: (text) => chalk.bold(text)
};

export function setTheme(themeName) {
    currentTheme = themeName;
}

export const DIVIDER = () => t.dim('─'.repeat(60));
export const SCANLINE = () => t.dim('░'.repeat(60));

export function sectionTitle(text) {
    return `\n${DIVIDER()}\n  ${t.secondary('►')} ${t.bold(t.primary(text))}\n${DIVIDER()}`;
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function typeText(text, delay = 18) {
    for (const char of text) {
        process.stdout.write(char);
        await sleep(delay);
    }
    process.stdout.write('\n');
}

export function checkTerminalSize() {
    const cols = process.stdout.columns || 80;
    const rows = process.stdout.rows || 24;
    if (cols < 60 || rows < 20) {
        console.log(
            t.secondary('\n⚠  Your terminal is a bit small (' + cols + '×' + rows + ').')
        );
    }
}

export function clearScreen() {
    process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
}
