import type { Route } from './+types/notes[.]rss';
import { prisma } from '~/../db';

function escapeCdata(s: string) {
  return s.replace(/\]\]>/g, ']]]]><![CDATA[>');
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');
  if (!host) {
    throw new Error('Could not determine domain URL.');
  }
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;
  const notesUrl = `${domain}/notes`;

  const rssString = `
    <rss xmlns:blogChannel="${notesUrl}" version="2.0">
      <channel>
        <title>React Router v7 Notes</title>
        <link>${notesUrl}</link>
        <description>A collection of helpful notes</description>
        <language>en-us</language>
        <generator>React Router v7 Notes</generator>
        <ttl>40</ttl>
        ${notes
          .map(note => {
            return `
            <item>
              <title><![CDATA[${escapeCdata(note.title)}]]></title>
              <description><![CDATA[${escapeHtml(note.title)} - React Router v7 Notes]]></description>
              <pubDate>${note.createdAt.toUTCString()}</pubDate>
              <link>${notesUrl}/${note.id}</link>
              <guid>${notesUrl}/${note.id}</guid>
            </item>
          `.trim();
          })
          .join('\n')}
      </channel>
    </rss>
  `.trim();

  return new Response(rssString, {
    headers: {
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      'Content-Length': String(Buffer.byteLength(rssString)),
      'Content-Type': 'application/xml',
    },
  });
};
