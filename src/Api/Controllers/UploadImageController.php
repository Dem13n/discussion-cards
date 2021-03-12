<?php

namespace Dem13n\Discussion\Cards\Api\Controllers;

use Flarum\Api\Controller\ShowForumController;
use Flarum\Foundation\Paths;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Intervention\Image\ImageManagerStatic as Image;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;
use League\Flysystem\MountManager;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UploadImageController extends ShowForumController
{
    protected $settings;
    protected $paths;

    public function __construct(SettingsRepositoryInterface $settings, Paths $paths)
    {
        $this->settings = $settings;
        $this->paths = $paths;
    }

    public function data(ServerRequestInterface $request, Document $document)
    {
        $request->getAttribute('actor')->assertAdmin();

        $file = Arr::get($request->getUploadedFiles(), 'dem13n_discussion_cards_default_image');

        $tmpFile = tempnam($this->paths->storage . '/tmp', 'card_image');
        $file->moveTo($tmpFile);

        $image = Image::make($tmpFile)
            ->resize(400, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->encode('png');

        file_put_contents($tmpFile, $image);

        $mount = new MountManager([
            'source' => new Filesystem(new Local(pathinfo($tmpFile, PATHINFO_DIRNAME))),
            'target' => new Filesystem(new Local($this->paths->public . '/assets')),
        ]);

        if (($path = $this->settings->get($key = "dem13n_discussion_cards_default_image_path")) && $mount->has($file = "target://$path")) {
            $mount->delete($file);
        }

        $uploadName = 'card-image-' . Str::lower(Str::random(8)) . '.png';

        $mount->move('source://' . pathinfo($tmpFile, PATHINFO_BASENAME), "target://$uploadName");

        $this->settings->set($key, $uploadName);

        return parent::data($request, $document);
    }
}
