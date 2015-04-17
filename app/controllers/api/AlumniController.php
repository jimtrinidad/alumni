<?php 

class AlumniController extends BaseController {

	public function index() {

		return Alumni::get_listing();

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

	public function store() {
		sleep(5);
		return Response::json(array('type'=>'add', 'data' => Input::all()));
	}

	public function update($id) {
		sleep(5);
		return Response::json(array('type'=>'edit', 'data' => Input::all()));
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

}