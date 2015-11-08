<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Program extends Eloquent {

	use SoftDeletingTrait;
	
	protected $dates 		= ['deleted_at'];
	protected $softDelete 	= true;

	protected $table		= 'programs';

	public static function get_by_user($user) {

		$query	= DB::table('programs');

		$query->select(DB::raw('programs.*'));

		if (!User::can('admin')) {
			$query->join('user_program', function($join) use ($user) {
				$join->on('user_program.program_id', '=', 'programs.id')->where('user_program.user_id' , '=', DB::raw($user));
			});
		}

		$query->orderBy('programs.acronym', 'asc');

		return $query->get();

	}

}