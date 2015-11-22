<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Program extends Eloquent {

	use SoftDeletingTrait;
	
	protected $dates 		= ['deleted_at'];
	protected $softDelete 	= true;

	protected $table		= 'programs';
	protected $guarded		= array();

	public static function boot() {

		parent::boot();

		// We set the deleted_by attribute before deleted event so we doesn't get an error if Customer was deleted by force (without soft delete).
		static::deleting(function($model){
			$model->deleted_by = Auth::user()->id;
			$model->save();
		});

	}

	public static function get_by_user($user) {

		$query	= DB::table('programs');

		$query->select(DB::raw('programs.*'));

		if (!User::rights('admin')) {
			$query->join('user_program', function($join) use ($user) {
				$join->on('user_program.program_id', '=', 'programs.id')->where('user_program.user_id' , '=', DB::raw($user));
			});
		}

		//do not include deactivated programs
		$query->whereNull('programs.deleted_at');

		$query->orderBy('programs.acronym', 'asc');

		return $query->get();

	}

}