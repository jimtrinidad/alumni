<?php

class AppController extends BaseController {

	public function index() {

		$viewData	= array(
				'permissions' => base64_encode(User::privilege('rights'))
			);
		
		return View::make('index', $viewData);
	}

	//resizing image using Folkloreatelier/laravel-image
	// public function resize() {

	// 	$path  	= public_path() . '/assets/img/programs/original/';
	// 	$output	= public_path() . '/assets/img/programs/thumb/';
	// 	$files = File::allFiles($path);

	// 	foreach ($files as $file) {

	// 		if ($file->getExtension() == 'jpeg') {

	// 			$thumbfile = $output . $file->getFilename();
	// 			Image::make($file->getPathname(),array(
	// 			    'width' => 300,
	// 			    'height' => 300
	// 			))->save($thumbfile);

	// 		}

	// 	}

	// }

}