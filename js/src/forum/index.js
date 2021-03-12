import app from 'flarum/app';
import {extend, override} from 'flarum/extend';
import DiscussionList from 'flarum/components/DiscussionList';
import DiscussionListState from 'flarum/states/DiscussionListState';
import IndexPage from 'flarum/components/IndexPage';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Placeholder from 'flarum/components/Placeholder';
import Button from 'flarum/components/Button';
import CardItem from './components/CardItem';
import ListItem from './components/ListItem';


app.initializers.add('dem13n/discussion/cards', () => {

  extend(DiscussionListState.prototype, 'requestParams', function (params) {
    if (app.current.matches(IndexPage)) {
      params.include.push(['firstPost', 'posts', 'posts.user']);
    }
  });

  override(DiscussionList.prototype, 'view', function (original) {
    const settings = JSON.parse(app.forum.attribute('dem13nDiscussionCards'));
    const state = this.attrs.state;
    const params = state.getParams();
    let loading;
    if (state.isLoading()) {
      loading = m(LoadingIndicator);
    } else if (state.moreResults) {
      loading = m(Button, {
          className: 'Button',
          onclick: state.loadMore.bind(state),
        }, app.translator.trans('core.forum.discussion_list.load_more_button')
      );
    }
    if (state.empty()) {
      const text = app.translator.trans('core.forum.discussion_list.empty_text');
      return <div className="DiscussionList">{m(Placeholder, {text})}</div>;
    }
    if (app.current.matches(IndexPage) && ((settings.allowedTags.length && settings.allowedTags.includes(params.tags)) || (!params.tags && settings.onIndexPage === 1))) {
      return (
        <div className={'DiscussionList' + (state.isSearchResults() ? ' DiscussionList--searchResults' : '')}>
          <div class="DiscussionList-discussions flexCard">
            {state.discussions.map((discussion, i) => {
              if (i < settings.smallCards) {
                return m(CardItem, {discussion: discussion});
              } else {
                return m(ListItem, {discussion: discussion});
              }
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


// Expose compat API
import extCompat from './compat';
import { compat } from '@flarum/core/forum';

Object.assign(compat, extCompat);
