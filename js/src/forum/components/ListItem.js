import Component from "flarum/common/Component";
import craftBadges from "../utils/craftBadges";
import getPostImage from "../helpers/getPostImage";
import craftTags from "../utils/craftTags";
import humanTime from 'flarum/common/utils/humanTime';
import icon from 'flarum/common/helpers/icon';
import username from 'flarum/common/helpers/username';
import avatar from 'flarum/common/helpers/avatar';
import Dropdown from 'flarum/common/components/Dropdown';
import DiscussionControls from 'flarum/forum/utils/DiscussionControls';
import Link from 'flarum/common/components/Link';
import {truncate} from 'flarum/common/utils/string';
import LastReplies from './LastReplies';


export default class listItem extends Component {

  oninit(vnode) {
    super.oninit(vnode);
  }

  view() {

    const discussion = this.attrs.discussion;
    const settings = JSON.parse(app.forum.attribute('dem13nDiscussionCards'));
    const attrs = {};
    attrs.className = "wrapImg" + (settings.cardFooter === 1 ? " After" : '');
    const image = getPostImage(discussion.firstPost());
    const media = image
      ? <img src={image}
             className="previewCardImg"
             alt={discussion.title()}
             loading="lazy"/>
      : <div className="imgStub"/>

    return (
      <div key={discussion.id()}
           data-id={discussion.id()}
           className={"CardsListItem List" + (discussion.isHidden() ? " Hidden" : "")}>
        {DiscussionControls.controls(discussion, this).toArray().length
          ? m(Dropdown, {
            icon: 'fas fa-ellipsis-v',
            className: 'DiscussionListItem-controls',
            buttonClassName: 'Button Button--icon Button--flat Slidable-underneath Slidable-underneath--right',
          }, DiscussionControls.controls(discussion, this).toArray())
          : ''}
        <Link href={app.route.discussion(discussion, 0)}
              className="cardLink">

          {settings.cardBadges === 1
            ? craftBadges(discussion.badges().toArray())
            : ''}

          <div className="cardGrid">

            <div className="rowSpan-3 colSpan">
              <div {...attrs}>
                {media}

                {settings.cardFooter === 1
                  ? <div className="cardFoot">
                    <div className="Author">
                      {username(discussion.user())}
                    </div>
                    <div className="Date">
                      {humanTime(discussion.createdAt())}
                    </div>
                  </div>
                  : ''}

              </div>
            </div>

            <div className="rowSpan-3 colSpan-2">

              <div className="flexBox">
                <div className="cardTitle">
                  <h2 title={discussion.title()} className="title">{truncate(discussion.title(), 80)}</h2>
                </div>
                <div className="cardTags">{craftTags(discussion.tags())}</div>
              </div>

              {settings.previewText === 1
                ? <div className="previewPost">{truncate(discussion.firstPost().contentPlain(), 150)}</div>
                : ''}

              {app.screen() === 'phone' && settings.Replies === 1
                ? <div className="cardSpacer">
                  <Link
                    className="Replies"
                    href={app.route.discussion(discussion, discussion.lastPostNumber())}>
                    <div className="Left">
                      <div className="Avatars">
                        {m(LastReplies, {discussion: discussion})}
                      </div>
                      <div className="Repcount">
                        {app.translator.trans('dem13n.forum.replies', {count: discussion.replyCount() || '0'})}
                      </div>
                    </div>
                    <div className="Arrow">
                      {icon('fas fa-angle-right')}
                    </div>
                  </Link>
                </div>
                : ''}
            </div>
          </div>
        </Link>
      </div>
    );

  }

}
