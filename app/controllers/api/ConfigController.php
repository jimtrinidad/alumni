<?php 

class ConfigController extends BaseController {

	public function getUserRights() {

		$viewables_results	= User::rights('admin') ? json_decode(Settings::get('viewables'), true) : json_decode(User::privilege('viewables'), true);
		$editables_results	= User::rights('admin') ? json_decode(Settings::get('editables'), true) : json_decode(User::privilege('editables'), true);
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

	public function getUserPrograms() {

		$program_results	= Program::get_by_user(Auth::id());
		$programs 			= array();

		foreach ($program_results as $item) {
			
			$programs[] 	= AppHelpers\programLogo($item);

		}

		if (count($programs)) {

			return Response::json(array(
					'status'	=> true,
					'data'		=> $programs
				));

		} else {

			return Response::json(array(
					'status'	=> false,
					'message'	=> 'Record not found!'
				));

		}

	}

}