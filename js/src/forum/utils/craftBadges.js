import icon from 'flarum/helpers/icon';


export default function craftBadges(badges) {
  if (badges.length) {
    return [m('.cardBadges', [badges.map((badge) => {
      return [m('span.cardBadge.Badge.Badge--' + badge.attrs.type, {
        oncreate: function (vnode) {
          $(vnode.dom).tooltip({placement: 'right'});
        }, title: badge.attrs.label[0]
      }, [icon(badge.attrs.icon)])]
    })])];
  }
};
