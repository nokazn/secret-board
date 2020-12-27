import pug from 'pug';

const html = pug.renderFile('src/views/posts.pug', {
  posts: [
    {
      content: "<script>alert('test');</script>",
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
    expect(html.includes("&lt;script&gt;alert('test');&lt;/script&gt;")).toBe(true);
  });
});
