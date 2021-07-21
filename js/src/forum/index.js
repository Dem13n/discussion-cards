import app from 'flarum/app';
import {extend, override} from 'flarum/extend';
import DiscussionList from 'flarum/forum/components/DiscussionList';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';
import IndexPage from 'flarum/forum/components/IndexPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import Button from 'flarum/common/components/Button';
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
    if (state.isInitialLoading() || state.isLoadingNext()) {
      loading = <LoadingIndicator/>;
    } else if (state.hasNext()) {
      loading = Button.component(
        {
          className: 'Button',
          onclick: state.loadNext.bind(state),
        },
        app.translator.trans('core.forum.discussion_list.load_more_button')
      );
    }
    if (state.isEmpty()) {
      const text = app.translator.trans('core.forum.discussion_list.empty_text');
      return <div className="DiscussionList">{m(Placeholder, {text})}</div>;
    }
    if (app.current.matches(IndexPage) && ((settings.allowedTags.length && settings.allowedTags.includes(params.tags)) || (!params.tags && settings.onIndexPage === 1))) {
      return (
        <div className={'DiscussionList' + (state.isSearchResults() ? ' DiscussionList--searchResults' : '')}>
          <div class="DiscussionList-discussions flexCard">
            {state.getPages().map((pg, o) => {
              return pg.items.map((discussion, i) => {
                return (i < settings.smallCards && o === 0)
                  ? m(CardItem, {discussion: discussion})
                  : m(ListItem, {discussion: discussion})
              });
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
import {compat} from '@flarum/core/forum';

Object.assign(compat, extCompat);
