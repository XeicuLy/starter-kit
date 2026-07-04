import type { ChangelogConfig } from 'changelogen';

const config: Partial<ChangelogConfig> = {
  types: {
    feat: { title: '✨ Features', semver: 'minor' },
    fix: { title: '🐛 Bug Fixes', semver: 'patch' },
    refactor: { title: '♻️ Refactors', semver: 'patch' },
    docs: { title: '📖 Documentation', semver: 'patch' },
    chore: { title: '🏡 Chore' },
    ci: { title: '🤖 CI' },
  },
};

export default config;
