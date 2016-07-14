<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;
//use Activity;

class Alumni extends Eloquent {

	use SoftDeletingTrait;
	
	protected $dates 		= ['deleted_at'];
	protected $softDelete 	= true;

	protected $table		= 'alumni';
	protected $guarded		= array();

	public static function boot() {

		parent::boot();

		// We set the deleted_by attribute before deleted event so we doesn't get an error if Customer was deleted by force (without soft delete).
		static::deleting(function($model){
			$model->deleted_by = Auth::user()->id;
			$model->save();
		});

	}

	
	public static function get_alumnis($id = null) {

		Activity::log('list alumni');

		$user_fields	= User::rights('admin') ? json_decode(Settings::get('viewables'), true) : json_decode(User::privilege('viewables'), true);

		$query			= DB::table('alumni');

		$query->select(DB::raw('alumni.id, logo, alumni.program_id'));
		$query->addSelect( array_keys($user_fields) );

		$query->join('programs', 'alumni.program_id', '=', 'programs.id');

		$query->whereNull('alumni.deleted_at');

		if (!User::rights('admin')) {

			$query->join('user_program', 'user_program.program_id', '=', 'programs.id');
			$query->where('user_program.user_id', '=', Auth::id());
			
		} 

		if (Input::get('program') != '') {

			$query->where('alumni.program_id', '=', Input::get('program'));

		}

		//do not include deactivated programs
		$query->whereNull('programs.deleted_at');

		if (Input::get('batch') != '') {

			$query->where('batch', '=', Input::get('batch'));

		}

		if (Input::get('search') != '' && in_array(Input::get('field'), array('firstname', 'lastname', 'position', 'company'))) {

			$query->where(function($q) {

				$q->where(Input::get('field'), 'LIKE' , '%' . Input::get('search') . '%');

			});

		}

		if (Input::get('status') == 'deleted') {
			$query->whereNotNull('alumni.deleted_at');
		} else {
			$query->whereNull('alumni.deleted_at');
		}

		//return single row
		if ($id !== null) {
			return $query->where('alumni.id' , '=', $id)->first();
		}

		$orderType	= 'ASC';
		if (Input::get('sort') == 'alumni.created_at') {
			$orderType = 'DESC';
		}

		$query->orderByRaw('TRIM(' . Input::get('sort', 'firstname') . ') ' . $orderType);

		$results			= $query->paginate(Input::get('size', 50))->toArray();
		$results['labels'] 	= $user_fields;

		return $results;

	}

}