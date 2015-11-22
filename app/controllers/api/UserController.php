<?php 

class UserController extends BaseController {

	public function index() {

		$user_results		= User::orderBy('firstname')->select('id', 'username', 'firstname', 'lastname', 'photo', 'created_at')->get();
		$users 				= array();

		foreach ($user_results as $item) {

			$users[] 	= AppHelpers\userPhoto($item);

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

		$validator = $this->validate();
		if ($validator->passes()) {

			$user = new User;
			$user->fill(Input::all());
			$user->created_by	= Auth::id();

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

		$validator = $this->validate();
		if ($validator->passes()) {

			$user = user::find($id);
			if ($user) {

				$user->fill(Input::all());
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
							'data'		=> AppHelpers\userPhoto(User::where('id', '=', $id)->select('id', 'acronym', 'name', 'logo', 'created_at')->get()->first(), true)
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

	private function validate() {

		$validator	= Validator::make(Input::all(), array(
				'acronym'		=> 'required',
				'name'			=> 'required'
			));

		return $validator;

	}

	public function destroy($id) {

		$result = user::find($id);

		if ($result) {

			$result->delete();

			return Response::json(array(
					'status'	=> true,
					'message'		=> 'Record has been deleted successfully.'
				));

		} else {

			return Response::json(array(
					'status'	=> false,
					'message'	=> 'Deleting record failed! Record not found.'
				));

		}

	}

}