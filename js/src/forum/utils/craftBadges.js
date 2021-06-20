import icon from 'flarum/common/helpers/icon';

export default function craftBadges(badges) {
  if (badges.length) {
    return [m('.cardBadges', [badges.map((badge) => {
      return [m('span.cardBadge.Badge.Badge--' + badge.attrs.type, {
        'data-original-title': badge.attrs.label[0],
        oncreate: (vnode) => $(vnode.dom).tooltip({placement: 'right'})
      }, [icon(badge.attrs.icon)])]
    })])];
  }
};
