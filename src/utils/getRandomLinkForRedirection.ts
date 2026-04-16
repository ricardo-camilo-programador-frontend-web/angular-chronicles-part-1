export function getRandomLinkForRedirection() {
  const links = [
    'https://www.linkedin.com/in/ricardo-camilo-programador-frontend-web-developer/',
    'https://www.instagram.com/ricardo.camilo.dev/',
    'https://ricardo-camilo-dev-frontend-web.netlify.app/',
  ];

  return links[Math.floor(Math.random() * links.length)];
}