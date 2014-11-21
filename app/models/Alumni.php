<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Alumni extends Eloquent {

	use SoftDeletingTrait;
	
	protected $dates 		= ['deleted_at'];
	protected $softDelete 	= true;

	protected $table		= 'alumni';

	
	public static function get_listing() {

		$user_fields	= User::can('admin') ? json_decode(Settings::get('viewables'), true) : json_decode(User::privilege('viewables'), true);

		$query			= DB::table('alumni');

		$query->select(DB::raw('alumni.id, name, acronym, logo'));
		$query->addSelect( array_keys($user_fields) );

		$query->join('programs', 'alumni.program_id', '=', 'programs.id');

		if (!User::can('admin')) {

			$query->join('user_program', 'user_program.program_id', '=', 'programs.id');
			$query->where('user_program.user_id', '=', Auth::id());
			
		} 

		if (Input::get('program') != '') {

			$query->where('alumni.program_id', '=', Input::get('program'));

		}

		if (Input::get('batch') != '') {

			$query->where('batch', '=', Input::get('batch'));

		}

		if (Input::get('search') != '' && in_array(Input::get('field'), array('firstname', 'lastname', 'position', 'company'))) {

			$query->where(function($q) {

				$q->where(Input::get('field'), 'LIKE' , '%' . Input::get('search') . '%');

			});

		}

		$query->orderBy(Input::get('sort', 'firstname'));

		$results			= $query->paginate(Input::get('size', 50))->toArray();
		$results['fields'] 	= $user_fields;

		return $results;

	}

}