import app from 'flarum/app';
import { extend, override } from 'flarum/extend';
import DiscussionList from 'flarum/components/DiscussionList';
import DiscussionListState from 'flarum/states/DiscussionListState';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import Dropdown from 'flarum/components/Dropdown';
import IndexPage from 'flarum/components/IndexPage';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Placeholder from 'flarum/components/Placeholder';
import Button from 'flarum/components/Button';
import Link from 'flarum/components/Link';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import icon from 'flarum/helpers/icon';
import humanTime from 'flarum/utils/humanTime';
import craftTags from './utils/craftTags';
import craftBadges from './utils/craftBadges';
import { truncate } from 'flarum/utils/string';


function previewText(text, lenght = 150) {
  let preview;
  if (app.forum.attribute('previewText') === '1' && text.length) {
    preview = <div className="previewPost">
      {truncate(text, lenght)}
    </div>;
  } else {
    preview = '';
  }
  return preview;
}

function option(i) {
  const smallCards = app.forum.attribute('smallCards');
  return (i < smallCards) ? 'CardsListItem smallCard' : 'CardsListItem';
}

function getFirstImage(post) {
  const regex = /<img(?!.*?class="emoji").*?src=[\'"](.*?)[\'"].*?>/;
  const defaultImg = app.forum.attribute('defaultImg');
  if (post) {
    const src = regex.exec(post.contentHtml());
    return (src) ? src[1] : defaultImg;
  } else {
    return defaultImg;
  }
}

app.initializers.add('dem13n-discussion-cards', () => {

  extend(DiscussionListState.prototype, 'requestParams', function (params) {
    if (app.current.matches(IndexPage)) {
      params.include.push('firstPost');
    }
  });

  override(DiscussionList.prototype, 'view', function (original) {
    const allowedTags = JSON.parse(app.forum.attribute('allowedTags'));
    const state = this.attrs.state;
    const params = state.getParams();
    let loading;
    if (state.isLoading()) {
      loading = LoadingIndicator.component();
    } else if (state.moreResults) {
      loading = Button.component(
        {
          className: 'Button',
          onclick: state.loadMore.bind(state),
        },
        app.translator.trans('core.forum.discussion_list.load_more_button')
      );
    }
    if (state.empty()) {
      const text = app.translator.trans('core.forum.discussion_list.empty_text');
      return <div className="DiscussionList">{Placeholder.component({ text })}</div>;
    }
    if (app.current.matches(IndexPage) && allowedTags.length && allowedTags.includes(params.tags)) {
      return (
        <div className={'DiscussionList' + (state.isSearchResults() ? ' DiscussionList--searchResults' : '')}>
          <div class="DiscussionList-discussions flexCard">
            {state.discussions.map((discussion, i) => {
              return (
                <div key={discussion.id()} data-id={discussion.id()} className={option(i)}>
                  {DiscussionControls.controls(discussion, this).toArray().length
                    ? Dropdown.component(
                      {
                        icon: 'fas fa-ellipsis-v',
                        className: 'DiscussionListItem-controls',
                        buttonClassName: 'Button Button--icon Button--flat Slidable-underneath Slidable-underneath--right',
                      },
                      DiscussionControls.controls(discussion, this).toArray()
                    )
                    : ''}
                  <Link href={app.route.discussion(discussion, 0)} className="cardLink">
                    {(app.forum.attribute('cardBadges') === '1') ? craftBadges(discussion.badges().toArray()) : ''}
                    <img className="previewCardImg" alt={discussion.title()}
                      src={getFirstImage(discussion.firstPost())}></img>
                    <div className="cardTags">{craftTags(discussion.tags())}</div>
                    <div className="cardTitle">
                      <h2>{discussion.title()}</h2>
                    </div>
                    {previewText(discussion.firstPost().contentPlain())}
                    {(app.forum.attribute('cardFooter') === '1') ?
                      <div className="cardSpacer">
                        <div className="cardFooter">
                          <Link href={discussion.user() ? app.route.user(discussion.user()) : '#'}>
                            {avatar(discussion.user(), { className: 'Avatar--mini' })}
                          </Link>
                          <div className="actor">
                            {username(discussion.user())}
                            <div className="date">
                              {humanTime(discussion.createdAt())}
                            </div>
                          </div>
                          <Link href={app.route.discussion(discussion, discussion.lastPostNumber())} class="replies"
                            title={(discussion.replyCount() > 0) ? app.translator.trans('dem13n.forum.last_reply') + humanTime(discussion.lastPostedAt()) : ''}>
                            <div className="commentIcon">{icon('far fa-comment-alt')}</div>
                            {discussion.replyCount()}
                          </Link>
                        </div>
                      </div> : ''}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="DiscussionList-loadMore">{loading}</div>
        </div>
      );
    } else {
      return original();
    }
  })
}, -1);
