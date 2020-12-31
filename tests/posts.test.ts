import pug from 'pug';

const html = (content: string) =>
  pug.renderFile('src/views/posts.pug', {
    posts: [
      {
        content,
        postedBy: 'guest1',
        trackingCookie: '1140140901232_0292q093j0q9ij2fq0er09reaui32egrerj2q0k0kg09',
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
    const template = html('This is a text with spaces.');
    expect(template.includes('This is a text with spaces.')).toBe(true);
  });
});
