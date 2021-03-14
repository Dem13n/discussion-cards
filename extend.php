<?php

namespace Dem13n\Discussion\Cards;

use Flarum\Extend;
use Flarum\Api\Controller\ListDiscussionsController;
use Dem13n\Discussion\Cards\Api\Controllers\UploadImageController;
use Dem13n\Discussion\Cards\Api\Controllers\DeleteImageController;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),

    (new Extend\Locales(__DIR__ . '/locale')),

    (new Extend\ApiController(ListDiscussionsController::class))
        ->addInclude(['firstPost', 'posts', 'posts.user']),

    new Extenders\RegisterLessVariables(),

    (new Extend\Settings())
        ->serializeToForum('dem13nDiscussionCards', 'dem13n_discussion_cards')
        ->serializeToForum('dem13nDiscussionCardsDefaultImage', 'dem13n_discussion_cards_default_image_path'),

    (new Extend\Routes('api'))
        ->post('/dem13n_discussion_cards_default_image', 'dem13n_discussion_cards_default_image', UploadImageController::class)
        ->delete('/dem13n_discussion_cards_default_image', 'dem13n_discussion_cards_default_image.delete', DeleteImageController::class)
];
