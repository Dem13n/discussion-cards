module.exports=function(t){var e={};function s(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,s),r.l=!0,r.exports}return s.m=t,s.c=e,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(o,r,function(e){return t[e]}.bind(null,r));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=22)}([function(t,e){t.exports=flarum.core.compat.app},function(t,e){t.exports=flarum.core.compat["helpers/icon"]},function(t,e){t.exports=flarum.core.compat["components/Link"]},function(t,e){t.exports=flarum.core.compat["components/Button"]},function(t,e){t.exports=flarum.core.compat["tags/utils/sortTags"]},,,function(t,e){t.exports=flarum.core.compat.extend},function(t,e){t.exports=flarum.core.compat["utils/DiscussionControls"]},function(t,e){t.exports=flarum.core.compat["components/IndexPage"]},function(t,e){t.exports=flarum.core.compat["utils/humanTime"]},,function(t,e){t.exports=flarum.core.compat["components/DiscussionList"]},function(t,e){t.exports=flarum.core.compat["states/DiscussionListState"]},function(t,e){t.exports=flarum.core.compat["components/DiscussionListItem"]},function(t,e){t.exports=flarum.core.compat["components/Dropdown"]},function(t,e){t.exports=flarum.core.compat["components/LoadingIndicator"]},function(t,e){t.exports=flarum.core.compat["components/Placeholder"]},function(t,e){t.exports=flarum.core.compat["helpers/avatar"]},function(t,e){t.exports=flarum.core.compat["helpers/username"]},,,function(t,e,s){"use strict";s.r(e);var o=s(0),r=s.n(o),a=s(7),n=s(12),i=s.n(n),c=s(13),u=s.n(c),l=s(14),d=s.n(l),f=s(8),p=s.n(f),g=s(15),v=s.n(g),x=s(9),b=s.n(x),h=s(16),y=s.n(h),N=s(17),L=s.n(N),D=s(3),P=s.n(D),S=s(2),_=s.n(S),C=s(18),j=s.n(C),B=s(19),O=s.n(B),I=s(1),T=s.n(I),M=s(10),A=s.n(M),k=s(4),w=s.n(k);function R(t){return t<r.a.forum.attribute("smallCards")?"CardsListItem smallCard":"CardsListItem"}function F(t){var e=r.a.forum.attribute("defaultImg");if(t){var s=/<img(?!.*?class="emoji").*?src=[\'"](.*?)[\'"].*?>/.exec(t.contentHtml());return s?s[1]:e}return e}r.a.initializers.add("dem13n-discussion-cards",(function(){Object(a.extend)(u.a.prototype,"requestParams",(function(t){r.a.current.matches(b.a)&&t.include.push("firstPost")})),Object(a.override)(i.a.prototype,"view",(function(){var t,e=this,s=JSON.parse(r.a.forum.attribute("allowedTags")),o=this.attrs.state,a=o.getParams();if(o.isLoading()?t=y.a.component():o.moreResults&&(t=P.a.component({className:"Button",onclick:o.loadMore.bind(o)},r.a.translator.trans("core.forum.discussion_list.load_more_button"))),o.empty()){var n=r.a.translator.trans("core.forum.discussion_list.empty_text");return m("div",{className:"DiscussionList"},L.a.component({text:n}))}return r.a.current.matches(b.a)&&s.length&&s.includes(a.tags)?m("div",{className:"DiscussionList"+(o.isSearchResults()?" DiscussionList--searchResults":"")},m("div",{class:"DiscussionList-discussions flexCard"},o.discussions.map((function(t,s){return m("div",{key:t.id(),"data-id":t.id(),className:R(s)},p.a.controls(t,e).toArray().length?v.a.component({icon:"fas fa-ellipsis-v",className:"DiscussionListItem-controls",buttonClassName:"Button Button--icon Button--flat Slidable-underneath Slidable-underneath--right"},p.a.controls(t,e).toArray()):"",m(_.a,{href:r.a.route.discussion(t,0)},"1"===r.a.forum.attribute("cardBadges")?function(t){if(t.length)return[m(".cardBadges",[t.map((function(t){return[m("span.cardBadge.Badge.Badge--"+t.attrs.type,{oncreate:function(t){$(t.dom).tooltip({placement:"right"})},title:t.attrs.label[0]},[T()(t.attrs.icon)])]}))])]}(t.badges().toArray()):"",m("img",{className:"previewCardImg",alt:t.title(),src:F(t.firstPost())}),m("div",{className:"cardTags"},function(t){if(t)return[w()(t).map((function(t){return[m(_.a,{className:"cardTag",style:{backgroundColor:t.color()},href:app.route("tag",{tags:t.slug()})},t.name())]}))]}(t.tags())),m("div",{className:"cardTitle"},m("h2",null,t.title())),"1"===r.a.forum.attribute("cardFooter")?m("div",{className:"cardSpacer"},m("div",{className:"cardFooter"},m(_.a,{href:t.user()?r.a.route.user(t.user()):"#"},j()(t.user(),{className:"Avatar--mini"})),m("div",{className:"actor"},O()(t.user()),m("div",{className:"date"},A()(t.createdAt()))),m(_.a,{href:r.a.route.discussion(t,t.lastPostNumber()),class:"replies",title:t.replyCount()>0?r.a.translator.trans("dem13n.forum.last_reply")+A()(t.lastPostedAt()):""},m("div",{className:"commentIcon"},T()("far fa-comment-alt")),t.replyCount()))):""))}))),m("div",{className:"DiscussionList-loadMore"},t)):m("div",{className:"DiscussionList"+(o.isSearchResults()?" DiscussionList--searchResults":"")},m("ul",{className:"DiscussionList-discussions"},o.discussions.map((function(t){return m("li",{key:t.id(),"data-id":t.id()},d.a.component({discussion:t,params:a}))}))),m("div",{className:"DiscussionList-loadMore"},t))}))}))}]);
//# sourceMappingURL=forum.js.map