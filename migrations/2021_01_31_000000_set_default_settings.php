<?php

use Flarum\Database\Migration;

$settings = [
    'previewText' => 0,
    'cardBadges' => 0,
    'cardFooter' => 0,
    'Replies' => 0,
    'onIndexPage' => 0,
    'smallCards' => 10,
    'allowedTags' => []
];

$jsonSettings = json_encode($settings);

return Migration::addSettings([
    'dem13n_discussion_cards' => $jsonSettings,
    'dem13n_discussion_cards_default_image_path' => null
]);
