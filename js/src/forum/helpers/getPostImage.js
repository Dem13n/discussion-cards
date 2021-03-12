export default function getPostImage(post, key = 0) {

  const regex = /<img(?!.*?class="emoji").*?src=[\'"](.*?)[\'"].*?>/;
  const image = app.forum.attribute('dem13nDiscussionCardsDefaultImage');
  const defaultImg = app.forum.attribute("baseUrl") + "/assets/" + image;

  if (post) {
    const src = regex.exec(post.contentHtml());
    if (typeof key === "number") {
      return (src) ? src[key + 1] : (image ? defaultImg : null);
    } else if (key === '~') {
      return src;
    }
  }

}
