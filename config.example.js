module.exports = {
  matrix: {
    domain: 'https://your_homeserver.com',
    user: '@your_user:your_homeserver.com',
    password: 'your_password',
    domains: [ 'your_homeserver.com' ],
    manualVerify: false,
  },
  fediverse: {
    domain: 'https://your_federation.com',
    username: '',
    password: '',
    client_name: 'ligh7hau5',
    subject: '',
    tipping: false,
    mimetypes: {
      whitelist: [],
      blacklist: []
    }
  },
  archive: {
    domain: 'archive.is',
    userAgent: 'Mozilla/4.0 (compatible; Beep Boop)'
  },
  nitter: {
    domain: 'nitter.fdn.fr',
    fallback: 'nitter.snopyta.org',
    userAgent: 'Mozilla/4.0 (compatible; Beep Boop)',
    domains: [ 'nitter.snopyta.org', 'nitter.net', 'www.nitter.net', 'twitter.com', 'www.twitter.com', 'mobile.twitter.com', 'm.twitter.com', 'nitter.fdn.fr' ],
    check: '(✅)'
  },
  invidious: {
    domain: 'invidious.fdn.fr',
    fallback: 'invidious.snopyta.org',
    userAgent: 'Mozilla/4.0 (compatible; Beep Boop)',
    domains: [ 'invidious.snopyta.org', 'invidious.xyz', 'youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com', 'invidious.fdn.fr' ]
  }
};
