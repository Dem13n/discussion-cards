export default function getPostImage(post, key = 1) {

  const regex = /<img(?!.*?class="emoji").*?src=[\'"](.*?)[\'"].*?>/;
  const image = app.forum.attribute('dem13nDiscussionCardsDefaultImage');
  const defaultImg = app.forum.attribute("baseUrl") + "/assets/" + image;

  if (post) {
    const src = regex.exec(post.contentHtml());
    if (typeof key === "number" && key > 0) {
      return (src) ? src[key] : (image ? defaultImg : null);
    } else if (key === '~') {
      return src;
    }
  }

}
