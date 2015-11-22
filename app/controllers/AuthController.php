<?php

class AuthController extends BaseController {

	public function login() {

		if (Auth::check()) return Redirect::home();

		$viewData	= array();
		if (Request::isMethod('post')) {

			/*
			* Temporary script to update md5 to hash
			*/
			$user = User::where('username', '=', Input::get('username'))->first();
			if(isset($user)) {
			    if($user->password == md5(Input::get('password'))) { // If their password is still MD5
			        $user->password = Hash::make(Input::get('password')); // Convert to new format
			        $user->save();
			        Input::replace(array('password' => $user->password));
			    }
			}

			if (Auth::attempt( array( 'username' => Input::get('username'), 'password' => Input::get('password') ) )) {
				$user->last_logged = new DateTime();
				$user->save();
				return Redirect::home();
			} else {
				$viewData['error']	= 'The username or password entered is incorrect.';
			}

		}

		return View::make('Auth/login', $viewData);
	}

	public function logout() {
		Auth::logout();
		return Redirect::to('login');
	}

}