<?php

namespace Dem13n\Discussion\Cards\Api\Controllers;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Foundation\Paths;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\EmptyResponse;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;
use Psr\Http\Message\ServerRequestInterface;

class DeleteImageController extends AbstractDeleteController
{
    protected $settings;
    protected $paths;

    public function __construct(SettingsRepositoryInterface $settings, Paths $paths)
    {
        $this->settings = $settings;
        $this->paths = $paths;
    }

    protected function delete(ServerRequestInterface $request)
    {
        $request->getAttribute('actor')->assertAdmin();

        $path = $this->settings->get($key = "dem13n_discussion_cards_default_image_path");

        $this->settings->set($key, null);

        $uploadDir = new Filesystem(new Local($this->paths->public.'/assets'));

        if ($uploadDir->has($path)) {
            $uploadDir->delete($path);
        }

        return new EmptyResponse(204);
    }
}
