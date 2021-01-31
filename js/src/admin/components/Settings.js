import ExtensionPage from 'flarum/components/ExtensionPage';
import app from 'flarum/app';
import sortTags from 'flarum/tags/utils/sortTags';
import Stream from 'flarum/common/utils/Stream';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Switch from 'flarum/components/Switch';
import icon from 'flarum/helpers/icon';
import withAttr from 'flarum/utils/withAttr';


export default class Settings extends ExtensionPage {

  oninit(vnode) {
    super.oninit(vnode);
    this.allowedTags = JSON.parse(app.data.settings.dem13n_allowedTags);
    this.defaultImg = Stream(app.data.settings.dem13n_defaultImg);
    this.smallCards = Stream(app.data.settings.dem13n_smallCards);
    this.cardBadges = Stream(app.data.settings.dem13n_cardBadges);
    this.cardFooter = Stream(app.data.settings.dem13n_cardFooter);
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
                          state: allowedTags.includes(tag.slug()),
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
      dem13n_defaultImg: this.defaultImg(),
      dem13n_allowedTags: JSON.stringify(this.allowedTags),
      dem13n_smallCards: this.smallCards(),
      dem13n_cardBadges: this.cardBadges(),
      dem13n_cardFooter: this.cardFooter(),
    }).then(() => window.location.reload());
  }

}
