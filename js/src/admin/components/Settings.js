import ExtensionPage from 'flarum/components/ExtensionPage';
import app from 'flarum/app';
import Stream from 'flarum/common/utils/Stream';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Switch from 'flarum/components/Switch';
import icon from 'flarum/helpers/icon';
import withAttr from 'flarum/utils/withAttr';

const sortTags = (tags) => flarum.core.compat['tags/utils/sortTags'](tags);


export default class Settings extends ExtensionPage {

  oninit(vnode) {
    super.oninit(vnode);
    this.allowedTags = JSON.parse(app.data.settings.dem13n_discussion_cards_allowedTags);
    this.defaultImg = Stream(app.data.settings.dem13n_discussion_cards_defaultImg);
    this.smallCards = Stream(app.data.settings.dem13n_discussion_cards_smallCards);
    this.cardBadges = Stream(app.data.settings.dem13n_discussion_cards_cardBadges);
    this.cardFooter = Stream(app.data.settings.dem13n_discussion_cards_cardFooter);
    this.previewText = Stream(app.data.settings.dem13n_discussion_cards_previewText);
  }

  content() {
    return [
      m('.ExtensionPage-settings', [
        m('.container', [
          m('Form', {
            onsubmit: this.onsubmit.bind(this),
          }, [
            m('.Form-group', [
              m('label', app.translator.trans('dem13n.admin.settings.default_img')),
              m('input.FormControl', {
                value: this.defaultImg() || false,
                oninput: withAttr('value', this.defaultImg),
              }),
            ]),
            m('.Form-group', [
              Switch.component(
                {
                  state: this.previewText() || false,
                  onchange: this.previewText,
                },
                app.translator.trans('dem13n.admin.settings.preview_text')
              ),
            ]),
            m('.Form-group', [
              Switch.component(
                {
                  state: this.cardBadges() || false,
                  onchange: this.cardBadges,
                },
                app.translator.trans('dem13n.admin.settings.badges')
              ),
            ]),
            m('.Form-group', [
              Switch.component(
                {
                  state: this.cardFooter(),
                  onchange: this.cardFooter,
                },
                app.translator.trans('dem13n.admin.settings.actor_info')
              ),
            ]),
            m('.Form-group', [
              m('label', app.translator.trans('dem13n.admin.settings.small_cards')),
              m('input.FormControl', {
                type: 'number',
                min: 0,
                value: this.smallCards(),
                oninput: withAttr('value', this.smallCards),
              }),
            ]),
            m('.Form-group', [
              m('label', app.translator.trans('dem13n.admin.settings.choose_tags')),
              m('.TagGroup', [
                m('ul.TagList', [
                  sortTags(app.store.all('tags')).map((tag) => {
                    const allowedTags = this.allowedTags;
                    return [
                      Switch.component({
                          id: tag.slug(),
                          state: (allowedTags.length) ? allowedTags.includes(tag.slug()) : false,
                          onchange: function () {
                            (this.state) ? allowedTags.indexOf(this.id) !== -1 && allowedTags.splice(allowedTags.indexOf(this.id), 1) : allowedTags.push(this.id);
                          },
                          className: 'switchTags'
                        }, m("li", {
                          style: {
                            color: tag.color(),
                            lineHeight: '20px',
                            fontSize: '16px',
                            marginLeft: !(tag.isPrimary() || tag.position() === null) ? '20px' : '',
                          }
                        }, icon(tag.icon()), tag.name())
                      )
                    ];
                  })
                ])
              ]),
              Button.component(
                {
                  type: 'submit',
                  className: 'Button Button--primary',
                  loading: this.loading
                },
                app.translator.trans('core.admin.settings.submit_button')
              ),
            ]),
          ]),
        ])
      ])
    ]
  };

  onsubmit(e) {
    e.preventDefault();
    if (this.loading) return;
    this.loading = true;
    saveSettings({
      dem13n_discussion_cards_defaultImg: this.defaultImg(),
      dem13n_discussion_cards_allowedTags: JSON.stringify(this.allowedTags),
      dem13n_discussion_cards_smallCards: this.smallCards(),
      dem13n_discussion_cards_cardBadges: this.cardBadges(),
      dem13n_discussion_cards_cardFooter: this.cardFooter(),
      dem13n_discussion_cards_previewText: this.previewText(),
    }).then(() => window.location.reload());
  }

}
