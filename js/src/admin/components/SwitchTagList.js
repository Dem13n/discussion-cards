import Component from "flarum/common/Component";

import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import app from 'flarum/app';
import Stream from 'flarum/common/utils/Stream';
import Button from 'flarum/common/components/Button';
import saveSettings from 'flarum/admin/utils/saveSettings';
import Switch from 'flarum/common/components/Switch';
import icon from 'flarum/common/helpers/icon';
import withAttr from 'flarum/common/utils/withAttr';
import sortTags from 'flarum/tags/utils/sortTags';

export default class SwitchTagList extends Component {

  oninit(vnode) {
    super.oninit(vnode);
    this.tags = this.attrs.tags;
  }

  view() {

    return m('.TagGroup', [
      m('ul.TagList', [
        sortTags(app.store.all('tags')).map((tag) => {
          const allowedTags = this.tags;
          return [
            m(Switch, {
                id: tag.slug(),
                state: (allowedTags.length) ? allowedTags.includes(tag.slug()) : false,
                onchange: function () {
                  this.state
                    ? allowedTags.indexOf(this.id) !== -1 && allowedTags.splice(allowedTags.indexOf(this.id), 1)
                    : allowedTags.push(this.id);
                },
                className: 'switchTags'
              }, m("li", {
                style: {
                  color: tag.color(),
                  lineHeight: '20px',
                  fontSize: '16px',
                  marginLeft: !(tag.isPrimary() || tag.position() === null) ? '20px' : 0,
                }
              }, icon(tag.icon()), tag.name())
            )
          ];
        })
      ])
    ])

  }

}
