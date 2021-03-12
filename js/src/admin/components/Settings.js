import ExtensionPage from 'flarum/components/ExtensionPage';
import app from 'flarum/app';
import Stream from 'flarum/common/utils/Stream';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Switch from 'flarum/components/Switch';
import icon from 'flarum/helpers/icon';
import withAttr from 'flarum/utils/withAttr';
import sortTags from 'flarum/tags/utils/sortTags';
import UploadImageButton from 'flarum/components/UploadImageButton';
import SwitchTagList from './switchTagList';


export default class Settings extends ExtensionPage {

  oninit(vnode) {
    super.oninit(vnode);
    this.settings = JSON.parse(app.data.settings.dem13n_discussion_cards || null);
  }

  content() {

    if (!this.settings) {
      return m('.ExtensionPage-settings', [
        m('.container', {
          style: {color: 'red', fontWeight: 'bold'}},
          icon('fas fa-exclamation-triangle', {style: {fontSize: '24px', marginRight: '10px'}}),
          app.translator.trans('dem13n.admin.settings.settings_error'))
      ]);
    }

    const settings = this.settings;

    app.forum.data.attributes.dem13n_discussion_cards_default_imageUrl =
      app.forum.attribute("baseUrl") + "/assets/" +
      app.data.settings.dem13n_discussion_cards_default_image_path;

    return [
      m('.ExtensionPage-settings', [
        m('.container', [
          m('Form', {
            onsubmit: this.onsubmit.bind(this),
          }, [
            m('.Form-group', [
              m('label', app.translator.trans('dem13n.admin.settings.default_img')),
              m(UploadImageButton, {name: "dem13n_discussion_cards_default_image"}),
            ]),
            m('.Form-group', [
              m(Switch, {
                  state: settings.previewText || false,
                  onchange: () => {
                    settings.previewText ^= true
                  },
                }, app.translator.trans('dem13n.admin.settings.preview_text')
              ),
            ]),
            m('.Form-group', [
              m(Switch, {
                  state: settings.cardBadges || false,
                  onchange: () => {
                    settings.cardBadges ^= true
                  },
                },
                app.translator.trans('dem13n.admin.settings.badges')
              ),
            ]),
            m('.Form-group', [
              m(Switch, {
                  state: settings.cardFooter,
                  onchange: () => {
                    settings.cardFooter ^= true
                  },
                }, app.translator.trans('dem13n.admin.settings.actor_info')
              ),
            ]),
            m('.Form-group', [
              m(Switch, {
                  state: settings.Replies,
                  onchange: () => {
                    settings.Replies ^= true
                  },
                }, app.translator.trans('dem13n.admin.settings.show_replies')
              ),
            ]),
            m('.Form-group', [
              m(Switch, {
                  state: settings.onIndexPage,
                  onchange: () => {
                    settings.onIndexPage ^= true
                  },
                }, app.translator.trans('dem13n.admin.settings.output_on_index_page')
              ),
            ]),
            m('.Form-group', [
              m('label', app.translator.trans('dem13n.admin.settings.small_cards')),
              m('input.FormControl', {
                type: 'number',
                min: 0,
                value: settings.smallCards,
                oninput: e => {
                  settings.smallCards = e.target.value;
                }
              }),
            ]),
            m('.Form-group', [
              m('label', app.translator.trans('dem13n.admin.settings.choose_tags')),
              m(SwitchTagList, {tags: settings.allowedTags}),
              m(Button, {
                  type: 'submit',
                  className: 'Button Button--primary',
                  loading: this.loading
                }, app.translator.trans('core.admin.settings.submit_button')
              ),
            ]),
          ]),
        ])
      ])
    ]


  }

  onsubmit(e) {
    e.preventDefault();
    if (this.loading) return;
    this.loading = true;
    saveSettings({
      dem13n_discussion_cards: JSON.stringify(this.settings),
    }).then(() => window.location.reload());
  }

}
