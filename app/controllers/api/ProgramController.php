<?php 

class ProgramController extends BaseController {

	public function index() {

		$program_results	= Program::withTrashed()->orderBy('deleted_at')->orderBy('name')->select('id', 'acronym', 'name', 'logo', 'created_at', 'deleted_at')->get();
		$programs 			= array();

		foreach ($program_results as $item) {

			$item 	= AppHelpers\programLogo($item);
			$item['active'] = 1;
			if ($item['deleted_at'] != null) {
				$item['active'] = 0;
			}
			$programs[] = $item;

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
					'data'		=> AppHelpers\programLogo($result)
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

			$program = new Program;
			$program->fill(Input::only('acronym','name'));
			$program->created_by	= Auth::id();
			$program->acronym 		= strtoupper($program->acronym);

			if ($program->save()) {

				if (Input::hasFile('logo')) {

					$file 		= Input::file('logo');
					$logoName	= $program->id . '-logo.' . $file->getClientOriginalExtension();

					$file->move(Config::get('constants.PROGRAM_LOGO_PATH'), $logoName);

					Image::make(Config::get('constants.PROGRAM_LOGO_PATH') . $logoName,array(
					    'width' => 300,
					    'height' => 300
					))->save();

					$program->logo = $logoName;
					$program->save();

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

		$validator = $this->validate();
		if ($validator->passes()) {

			$program = Program::find($id);
			if ($program) {

				$program->fill(Input::only('acronym','name'));
				$program->updated_by	= Auth::id();
				$program->acronym 		= strtoupper($program->acronym);
				if (Input::hasFile('logo')) {

					$file 		= Input::file('logo');
					$logoName	= $program->id . '-logo.' . $file->getClientOriginalExtension();

					$file->move(Config::get('constants.PROGRAM_LOGO_PATH'), $logoName);

					Image::make(Config::get('constants.PROGRAM_LOGO_PATH') . $logoName,array(
					    'width' => 300,
					    'height' => 300
					))->save();

					$program->logo = $logoName;

				}

				if ($program->save()) {
					return Response::json(array(
							'status'	=> true,
							'message'	=> $program->name . ' has been updated successfully.',
							'data'		=> AppHelpers\programLogo(Program::where('id', '=', $id)->select('id', 'acronym', 'name', 'logo', 'created_at')->get()->first(), true)
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

		$result = Program::find($id);

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

		$result = Program::withTrashed()->find($id);

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

		if (Program::withTrashed()->where('id', $id)->restore()) {

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