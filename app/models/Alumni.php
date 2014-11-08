<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Alumni extends Eloquent {

	use SoftDeletingTrait;
	
	protected $dates 		= ['deleted_at'];
	protected $softDelete 	= true;

	protected $table		= 'alumni';

	
	public static function get_listing() {

		$query	= DB::table('alumni');

		$query->join('programs', 'alumni.program_id', '=', 'programs.id');

		$query->select(DB::raw('alumni.*, name, acronym, logo'));

		if (Input::get('program')) {

			$query->where('program_id', '=', Input::get('program'));

		}

		if (Input::get('batch')) {

			$query->where('batch', '=', Input::get('batch'));

		}

		if (Input::get('search') && in_array(Input::get('field'), array('firstname', 'lastname', 'position', 'company'))) {

			$query->where(function($q) {

				$q->where(Input::get('field'), 'LIKE' , '%' . Input::get('search') . '%');

			});

		}

		return $query->paginate(Input::get('size', 100));

	}

}