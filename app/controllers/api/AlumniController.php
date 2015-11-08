<?php 

class AlumniController extends BaseController {

	public function index() {

		return Alumni::get_alumnis();

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
		
		$validator = $this->validate();
		if ($validator->passes()) {

			$alumni = new Alumni;
			$alumni->fill(Input::all());
			$alumni->birthday	= date('Y-m-d', strtotime($alumni->birthday));
			$alumni->created_by	= Auth::id();

			if ($alumni->save()) {
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

			$alumni = Alumni::find($id);
			if ($alumni) {

				$alumni->fill(Input::except('logo','name','acronym'));
				$alumni->birthday	= date('Y-m-d', strtotime($alumni->birthday));
				$alumni->updated_by	= Auth::id();

				if ($alumni->save()) {
					return Response::json(array(
							'status'	=> true,
							'message'	=> $alumni->firstname . ' ' . $alumni->lastname . ' records has been saved successfully.',
							'data'		=> Alumni::get_alumnis($alumni->id)
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

		$messages = array(
			'email' 				=> 'The email field must be a valid email address.',
			'program_id.required'	=> 'The program field is required.'
		);

		$validator	= Validator::make(Input::all(), array(
				'firstname'		=> 'required',
				'lastname'		=> 'required',
				'program_id'	=> 'required',
				'email_prefer'	=> 'email',
				'email_other'	=> 'email',
			), $messages);

		return $validator;

	}

	public function destroy($id) {

		//single
		if (strpos($id, ',') === false) {

			$result = Alumni::find($id);

			if ($result) {

				if ($result->delete()) {
					
					return Response::json(array(
						'status'	=> true,
						'message'	=> 'Record has been deleted successfully.'
					));

				} else {

					return Response::json(array(
						'status'	=> false,
						'message'	=> 'Deleting record failed. Please try again.'
					));

				}

			} else {

					return Response::json(array(
						'status'	=> false,
						'message'	=> 'Deleting record failed! Record not found.'
					));

			}

		} else {

			//multiple
			$ids		= explode(',', $id);
			$deleted 	= Alumni::destroy($ids);

			if ($deleted > 0) {

				return Response::json(array(
						'status'	=> true,
						'message'	=> $deleted . ' record(s) has been deleted successfully.'
					));

			} else {

				return Response::json(array(
						'status'	=> false,
						'message'	=> 'Deleting records failed!'
					));

			}

		}

	}

}