<?php 

class UserController extends BaseController {

	public function index() {

	}

	public function show($id) {

		$result = Alumni::find($id);

		if ($result) {

			return Response::json(array(
					'status'	=> true,
					'data'		=> $result
				));

		} else {

			return Response::json(array(
					'status'	=> false,
					'message'	=> 'Record not found!'
				));

		}

	}

	public function create() {

	}

	public function update($id) {
		
	}

	public function destroy($id) {

		$result = Alumni::find($id);

		if ($result) {

			$result->delete();

			return Response::json(array(
					'status'	=> true,
					'data'		=> 'Record has been deleted successfully.'
				));

		} else {

			return Response::json(array(
					'status'	=> false,
					'message'	=> 'Deleting record failed! Record not found.'
				));

		}

	}

	public function getRights() {

		$result = User::rights();

		if ($result) {

			return Response::json(array(
					'status'	=> true,
					'data'		=> json_decode($result, true)
				));

		} else {

			return Response::json(array(
					'status'	=> false,
					'message'	=> 'Record not found!'
				));

		}

	}

}