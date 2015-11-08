<?php 

class ProgramController extends BaseController {

	public function index() {

		$program_results	= Program::orderBy('name')->get();
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

	public function show($id) {

		$result = Program::find($id);

		if ($result) {

			return Response::json(array(
					'status'	=> true,
					'data'		=> $this->format_program($result)
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

		$result = Program::find($id);

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