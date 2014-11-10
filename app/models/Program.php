<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Program extends Eloquent {

	use SoftDeletingTrait;
	
	protected $dates 		= ['deleted_at'];
	protected $softDelete 	= true;

	protected $table		= 'programs';

	public static function get_by_user($user) {

		$query	= DB::table('programs');

		$query->select(DB::raw('programs.*, user_program.user_id'));

		$query->join('user_program', function($join) use ($user) {
			$join->on('user_program.program_id', '=', 'programs.id')->where('user_program.user_id' , '=', DB::raw($user));
		});

		return $query->get();

	}

}