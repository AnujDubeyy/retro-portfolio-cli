#!/usr/bin/env node

import gradient from 'gradient-string';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';

import { t, sleep, typeText, clearScreen, checkTerminalSize, DIVIDER, currentTheme, setTheme } from './ui.js';
import { projects, playlists, profile, quotes } from './data.js';
import { showProjects, showSpotify, showAbout } from './screens.js';

function setupExitHandlers() {
  process.on('SIGINT', () => {
    process.stdout.write('\x1b[?25h'); // restore cursor always
    console.log(t.dim('\n\n  ✦ Signal received. Shutting down gracefully...\n'));
    process.exit(0);
  });
  process.on('uncaughtException', (err) => {
    process.stdout.write('\x1b[?25h');
    console.error(t.secondary(`\n  ⚠ Unexpected error: ${err.message}\n`));
    process.exit(1);
  });
}

const getGradient = () => {
  return currentTheme === 'loki'
    ? gradient([{ color: '#39FF14', pos: 0 }, { color: '#FFD700', pos: 1 }])
    : gradient([{ color: '#FF0000', pos: 0 }, { color: '#0000FF', pos: 1 }]);
};

async function bootSequence() {
  clearScreen();
  checkTerminalSize();

  console.log();
  for (let i = 0; i < 3; i++) {
    process.stdout.write(t.dim('  ░▒▓█▓▒░  AWAKENING GOD PROTOCOL  ░▒▓█▓▒░'));
    await sleep(120);
    process.stdout.write('\r' + ' '.repeat(60) + '\r');
    await sleep(80);
  }

  const gColor = (text) => t.primary(text);
  const spinner = createSpinner(gColor(' Requesting God api credits...')).start();
  await sleep(600);
  spinner.update({ text: gColor(' Forging timelines...') });
  await sleep(500);
  spinner.update({ text: gColor(' Injecting free-thinking logic...') });
  await sleep(500);
  spinner.update({ text: gColor(' Rendering interface...') });
  await sleep(400);
  spinner.success({ text: t.primary(' Protocol Online. Realizing god doesn\'t exist...\n') });

  await sleep(300);
}

async function showBanner() {
  const bannerText = figlet.textSync(profile.name, {
    font: 'ANSI Shadow',
    horizontalLayout: 'fitted',
  });

  console.log(getGradient().multiline(bannerText));
  console.log();
  console.log(t.dim('  ╔══════════════════════════════════════════════════════╗'));
  console.log(t.dim('  ║') + t.primary('   ⚡ ANDU CLI - PROMPT & LET AI THINK V1.1           ') + t.dim('║'));
  console.log(t.dim('  ╚══════════════════════════════════════════════════════╝'));
  console.log();
  await typeText(t.neutral('  > ' + profile.tagline), 20);
  console.log();
}

async function mainMenu() {
  while (true) {
    clearScreen();
    await showBanner();

    const q = quotes[Math.floor(Math.random() * quotes.length)] + ' ~ ANDU';

    const choices = [
      { name: `${t.primary('◈')}  ${t.bold('Projects')}      ${t.dim('— rastogi & the future')}`, value: 'projects' },
      { name: `${t.primary('♫')}  ${t.bold('Spotify')}       ${t.dim('— curated playlists')}`, value: 'spotify' },
      { name: `${t.primary('◎')}  ${t.bold('About me')}      ${t.dim('— ahh geez')}`, value: 'about' },
      new inquirer.Separator(DIVIDER()),
      { name: `${t.secondary('☯')}  ${t.bold('Different Shaders')} ${t.dim('— Toggle theme colors')}`, value: 'theme' },
      { name: `${t.secondary('⏻')}  ${t.bold('Exit')}          ${t.dim('— see you later')}`, value: 'exit' },
      new inquirer.Separator(' '),
      new inquirer.Separator(t.dim('  「 ' + q + ' 」'))
    ];

    const { section } = await inquirer.prompt([
      {
        type: 'list',
        name: 'section',
        message: getGradient()('  ◄ MAIN MENU ►'),
        choices,
        pageSize: 15,
        loop: false,
      },
    ]);

    clearScreen();

    switch (section) {
      case 'projects':
        await showProjects(projects);
        break;
      case 'spotify':
        await showSpotify(playlists);
        break;
      case 'about':
        await showAbout();
        break;
      case 'theme':
        setTheme(currentTheme === 'loki' ? 'spider' : 'loki');
        continue;
      case 'exit':
        console.log();
        for (let i = 0; i < 3; i++) {
          process.stdout.write(t.dim('  ░▒▓█▓▒░  TERMINATING PROTOCOLS  ░▒▓█▓▒░'));
          await sleep(120);
          process.stdout.write('\r' + ' '.repeat(60) + '\r');
          await sleep(80);
        }

        const crashSequence = [
          "tryin to log out...",
          "rolling out...",
          "1 2 3 4 5...",
          "67!",
          " *LAUGHS*",
          " *HAHAH*",
          " *DIES*"
        ];

        for (let i = 0; i < crashSequence.length; i++) {
          const text = crashSequence[i];
          const isError = i === crashSequence.length - 1;
          const display = isError ? t.primary(`  ✖${text}`) : t.secondary(`  ⠧${text}`);

          process.stdout.write('\r' + ' '.repeat(50));
          process.stdout.write('\r' + display);
          await sleep(400);
        }

        console.log('\n');
        process.exit(0);
    }

    console.log();
    console.log(DIVIDER());
    console.log();
  }
}

async function main() {
  setupExitHandlers();
  await bootSequence();
  await mainMenu();
}

main();
