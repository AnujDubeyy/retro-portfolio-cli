import { t, sectionTitle, DIVIDER, sleep, typeText, currentTheme } from './ui.js';
import { profile } from './data.js';
import boxen from 'boxen';
import open from 'open';
import inquirer from 'inquirer';

// ─── Projects ─────────────────────────────────────────────────────
export async function showProjects(projects) {
    console.log(sectionTitle('PROJECTS'));
    console.log();

    const choices = projects.map((p, i) => ({
        name: `${t.primary(p.name)}  ${t.dim('—')}  ${t.neutral(p.description)}  ${t.dim(p.tags.map(tag => `[${tag}]`).join(' '))}`,
        value: i,
    }));
    choices.push(new inquirer.Separator(DIVIDER()));
    choices.push({ name: t.secondary('← Back to menu'), value: -1 });

    const { idx } = await inquirer.prompt([
        {
            type: 'list',
            name: 'idx',
            message: t.secondary('Select a project to view details:'),
            choices,
            pageSize: 10,
            loop: false,
        },
    ]);

    if (idx === -1) return;

    const project = projects[idx];
    console.log();
    console.log(
        boxen(
            t.bold(t.primary(project.name)) + '\n\n' +
            t.neutral(project.description) + '\n\n' +
            t.dim('URL: ') + t.secondary(project.url) + '\n' +
            t.dim('Tags: ') + project.tags.map(tg => t.primary(`[${tg}]`)).join(' '),
            {
                padding: 1,
                margin: { left: 2 },
                borderStyle: 'round',
                borderColor: currentTheme === 'loki' ? 'green' : 'blue',
                title: '📂 PROJECT DETAIL',
                titleAlignment: 'center',
            }
        )
    );

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: t.secondary('What next?'),
            choices: [
                { name: t.primary('🌐 Open in browser'), value: 'open' },
                { name: t.secondary('← Back to projects'), value: 'back' },
                { name: t.secondary('← Back to menu'), value: 'menu' },
            ],
        },
    ]);

    if (action === 'open') {
        try {
            await open(project.url);
            console.log(t.primary(`  ✓ Opened ${project.url}`));
        } catch {
            console.log(t.secondary(`  ⚠ Could not open URL: ${project.url}`));
        }
        await sleep(800);
    }

    if (action === 'back') {
        await showProjects(projects);
    }
}

// ─── Spotify ──────────────────────────────────────────────────────
export async function showSpotify(playlists) {
    console.log(sectionTitle('SPOTIFY'));
    console.log();

    const choices = playlists.map(p => ({
        name: t.primary(p.name),
        value: p.url,
    }));
    choices.push(new inquirer.Separator(DIVIDER()));
    choices.push({ name: t.secondary('← Back to menu'), value: 'back' });

    const { url } = await inquirer.prompt([
        {
            type: 'list',
            name: 'url',
            message: t.secondary('Pick a playlist to open:'),
            choices,
            loop: false,
        },
    ]);

    if (url === 'back') return;

    try {
        await open(url);
        console.log(t.primary(`  ✓ Opening playlist in Spotify...`));
    } catch {
        console.log(t.secondary(`  ⚠ Could not open URL: ${url}`));
    }
    await sleep(600);
    await showSpotify(playlists);
}

// ─── About ────────────────────────────────────────────────────────
export async function showAbout() {
    console.log(sectionTitle('ABOUT ME'));
    console.log();

    const bioText = profile.bio.map(l => '  > ' + l).join('\n');
    const loreContent = bioText + '\n\n' +
        t.dim('  Currently building: ') + t.primary(profile.currentlyBuilding);

    const loreBox = boxen(loreContent, {
        padding: 1,
        margin: { left: 2 },
        borderStyle: 'round',
        borderColor: currentTheme === 'loki' ? 'green' : 'red',
        title: 'THE LORE',
        titleAlignment: 'center',
    });

    const interestsText = profile.interests.map(i => `  ${t.primary('»')} ${t.neutral(i)}`).join('\n');
    const interestsBox = boxen(interestsText, {
        padding: 1,
        margin: { left: 2 },
        borderStyle: 'round',
        borderColor: currentTheme === 'loki' ? 'yellow' : 'blue',
        title: 'INTERESTS',
        titleAlignment: 'center',
    });

    const loreLines = loreBox.split('\n');
    for (const line of loreLines) {
        console.log(line);
        await sleep(25);
    }
    console.log();

    const intLines = interestsBox.split('\n');
    for (const line of intLines) {
        console.log(line);
        await sleep(25);
    }
    console.log();

    await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: t.secondary('What next?'),
            choices: [
                { name: t.secondary('← Back to menu'), value: 'back' },
            ],
        },
    ]);
}
