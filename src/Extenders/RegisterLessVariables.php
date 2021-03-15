<?php

namespace Dem13n\Discussion\Cards\Extenders;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Frontend\Assets;
use Flarum\Frontend\Compiler\Source\SourceCollector;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;
use Illuminate\Support\Arr;


class RegisterLessVariables implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container->resolving('flarum.assets.forum', function (Assets $assets) {
            $assets->css(function (SourceCollector $sources) {
                $sources->addString(function () {
                    $settings = app(SettingsRepositoryInterface::class);
                    $ext_settings = json_decode($settings->get('dem13n_discussion_cards'), true);

                    $vars = [
                        'desktop-card-width' => Arr::get($ext_settings, 'desktopCardWidth', '49') . '%',
                        'tablet-card-width' => Arr::get($ext_settings, 'tabletCardWidth', '49') . '%',
                    ];

                    return array_reduce(array_keys($vars), function ($string, $name) use ($vars) {
                        return $string . "@$name: {$vars[$name]};";
                    }, '');

                });
            });
        });
    }
}
