<?php 

class UserController extends BaseController {

	public function index() {

		$user_results		= User::withTrashed()->orderBy('deleted_at')->orderBy('firstname')->select('id', 'username', 'email', 'firstname', 'lastname', 'photo', 'created_at', 'deleted_at')->get();
		$users 				= array();

		foreach ($user_results as $item) {

			$item 	= AppHelpers\userPhoto($item);
			$item['active'] = 1;
			if ($item['deleted_at'] != null) {
				$item['active'] = 0;
			}

			$users[] = $item;

		}

		if (count($users)) {

			return Response::json(array(
					'status'	=> true,
					'data'		=> $users
				));

		} else {

			return Response::json(array(
					'status'	=> false,
					'message'	=> 'Record not found!'
				));

		}

	}

	public function show($id) {

		$result = User::find($id);

		if ($result) {

			return Response::json(array(
					'status'	=> true,
					'data'		=> AppHelpers\userPhoto($result)
				));

		} else {

			return Response::json(array(
					'status'	=> false,
					'message'	=> 'Record not found!'
				));

		}

	}

	public function store() {

		$validator = $this->validate('new');
		if ($validator->passes()) {

			$user = new User;
			$user->fill(Input::only('username','firstname','lastname','email'));
			$user->password 	= Hash::make(Input::get('password'));
			$user->created_by	= Auth::id();

			if ($user->save()) {

				if (Input::hasFile('photo')) {

					$file 		= Input::file('photo');
					$photoName	= $user->id . '-photo.' . $file->getClientOriginalExtension();

					$file->move(Config::get('constants.USER_PHOTO_PATH'), $photoName);

					Image::make(Config::get('constants.USER_PHOTO_PATH') . $photoName,array(
					    'width' => 300,
					    'height' => 300
					))->save();

					$user->photo = $photoName;

					$user->save();

				}

				return Response::json(array(
						'status'	=> true,
						'message'	=> 'Record has been saved successfully.'
					));
			}

		} else {
			return Response::json(array(
					'status'	=> false,
					'message'	=> $validator->messages()
				));
		}

	}

	public function update($id) {

		$validator = $this->validate('update');
		if ($validator->passes()) {

			$user = User::find($id);
			if ($user) {

				$user->fill(Input::only('username','firstname','lastname','email'));

				if (Input::get('pwoption') == 'change') {
					$user->password = Hash::make(Input::get('password'));
				}

				$user->updated_by	= Auth::id();
				if (Input::hasFile('photo')) {

					$file 		= Input::file('photo');
					$photoName	= $user->id . '-photo.' . $file->getClientOriginalExtension();

					$file->move(Config::get('constants.USER_PHOTO_PATH'), $photoName);

					Image::make(Config::get('constants.USER_PHOTO_PATH') . $photoName,array(
					    'width' => 300,
					    'height' => 300
					))->save();

					$user->photo = $photoName;

				}

				if ($user->save()) {
					return Response::json(array(
							'status'	=> true,
							'message'	=> $user->name . ' has been updated successfully.',
							'data'		=> AppHelpers\userPhoto(User::where('id', '=', $id)->select('id', 'username', 'email', 'firstname', 'lastname', 'photo', 'created_at')->get()->first(), true)
						));
				}
			} else {
				return Response::json(array(
						'status'	=> false,
						'code'		=> 400,
						'message'	=> 'Record not found.'
					));
			}

		} else {
			return Response::json(array(
					'status'	=> false,
					'message'	=> $validator->messages()
				));
		}

	}

	private function validate($method) {

		$rules = array(
				'firstname'		=> 'required',
				'lastname'		=> 'required'
			);

		if (Input::get('pwoption','change') == 'change') {
			$rules['password'] = 'required|min:3|confirmed';
		}

		if ($method == 'update') {
			$rules['username']	= 'required|alpha_num|min:3|max:32|unique:users,username,' . Input::get('id');
			$rules['email']		= 'required|email|unique:users,email,' . Input::get('id');
		} else {
			$rules['username']	= 'required|alpha_num|min:3|max:32|unique:users,username';
			$rules['email']		= 'required|email|unique:users,email';
		}

		$validator	= Validator::make(Input::all(), $rules);	

		return $validator;

	}

	public function destroy($id) {

		$result = User::find($id);

		if ($result) {

			$result->delete();

			return Response::json(array(
					'status'	=> true,
					'message'		=> 'Record has been disabled successfully.'
				));

		} else {

			return Response::json(array(
					'status'	=> false,
					'message'	=> 'Disable record failed! Record not found.'
				));

		}

	}

	public function forceDelete($id) {

		$result = User::withTrashed()->find($id);

		if ($result) {

			$result->forceDelete();

			return Response::json(array(
					'status'	=> true,
					'message'		=> 'Record has been deleted successfully.'
				));

		} else {

			return Response::json(array(
					'status'	=> false,
					'message'	=> 'Delete record failed! Record not found.'
				));

		}

	}

	public function restore($id) {

		if (User::withTrashed()->where('id', $id)->restore()) {

			return Response::json(array(
					'status'	=> true,
					'message'		=> 'Record has been restored successfully.'
				));

		} else {

			return Response::json(array(
					'status'	=> false,
					'message'	=> 'Restoring record failed! Record not found.'
				));

		}

	}

}