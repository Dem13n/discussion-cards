import Component from 'flarum/common/Component';
import avatar from 'flarum/common/helpers/avatar';
import icon from 'flarum/common/helpers/icon';
import Link from 'flarum/common/components/Link';


export default class LastReplies extends Component {

  oninit(vnode) {
    super.oninit(vnode);
    this.discussion = this.attrs.discussion;
  }

  view() {
    const discussion = this.discussion;

    // let's assume that the last 10 posts will be enough for us to identify 3 unique users
    const posts = discussion.posts().splice(-10);

    const filteredPosts = posts
      .filter((post) => {
        return !post.isHidden() && post.number() !== 1 && post.contentType() === "comment";
      })
      .sort((a, b) => b.createdAt() - a.createdAt());

    const groupedUsers = filteredPosts
      .map(post => post.user())
      .filter((user, i, self) => {
        return self.indexOf(user) === i
      })
      .reverse()
      // last 3 users
      .splice(-3);


    return groupedUsers.map(user => {
      return avatar(user, {className: 'Avatar--mini'})
    })

  }

}
