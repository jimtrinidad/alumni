<?php 

class UserController extends BaseController {

	public function index() {
		var_dump(User::can('admin'));
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

	}

	public function getRights() {

		$viewables_results	= User::can('admin') ? json_decode(Settings::get('viewables'), true) : json_decode(User::privilege('viewables'), true);
		$editables_results	= User::can('admin') ? json_decode(Settings::get('editables'), true) : json_decode(User::privilege('editables'), true);
		$viewables 			= array();
		$editables 			= array();

		foreach ($viewables_results as $k => $v) {
			$viewables[] = array(
					'id'	=> $k,
					'label'	=> $v
				);
		}

		foreach ($editables_results as $k => $v) {
			$editables[] = array(
					'id'	=> $k,
					'label'	=> $v
				);
		}

		return Response::json(array(
					'status'	=> true,
					'data'		=> array(
							'viewables'	=> $viewables,
							'editables'	=> $editables
						)
				));

	}

}