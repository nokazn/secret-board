import pug from 'pug';

const html = (content: string) =>
  pug.renderFile('src/views/posts.pug', {
    posts: [
      {
        content,
        postedBy: 'guest1',
        trackingCookie: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    users: 'guest1',
  });

describe('posts page', () => {
  it('escape script tag', () => {
    const template = html("<script>alert('test');</script>");
    expect(template.includes("&lt;script&gt;alert('test');&lt;/script&gt;")).toBe(true);
  });

  it('escape script tag', () => {
    const template = html('a  a ');
    expect(template.includes('a  a ')).toBe(true);
  });
});
