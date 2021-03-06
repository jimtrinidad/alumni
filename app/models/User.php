<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;
use Illuminate\Database\Eloquent\SoftDeletingTrait;

class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait, SoftDeletingTrait;

	protected $dates 		= ['deleted_at'];
	protected $softDelete 	= true;
	protected $guarded		= array();

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password', 'remember_token');


	public static function boot() {

		parent::boot();

		// We set the deleted_by attribute before deleted event so we doesn't get an error if Customer was deleted by force (without soft delete).
		static::deleting(function($model){
			$model->deleted_by = Auth::user()->id;
			$model->save();
		});

	}


	/**
	* Check user rights
	*/
	public static function rights($key) {

		$rights = json_decode(self::privilege('rights'), true);

		return (bool) in_array($key, $rights);

	}

	/**
	* Get user privilege
	*/
	public static function privilege($key) {

		$query	= DB::table('privilege')->where('key', '=', $key);

		$query->where('user_id', '=', Auth::id());

		$privilege	= $query->pluck('value');

		return ($privilege ? $privilege : '[]');

	}


}
