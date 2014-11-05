<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Alumni extends Eloquent {

	use SoftDeletingTrait;
	
	protected $dates 		= ['dateDeleted'];
	protected $softDelete 	= true;

	protected $table		= 'tb_alumni';

	
	public static function get_listing() {

		$query	= DB::table('tb_alumni');

		$query->join('tb_program', 'tb_alumni.programID', '=', 'tb_program.id');

		$query->select(DB::raw('tb_alumni.*, longname, name, logo'));

		if (Input::get('program')) {

			$query->where('programID', '=', Input::get('program'));

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