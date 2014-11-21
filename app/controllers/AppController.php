<?php

class AppController extends BaseController {

	public function index() {

		$viewData	= array(
				'permissions' => base64_encode(User::privilege('rights'))
			);
		
		return View::make('index', $viewData);
	}

}