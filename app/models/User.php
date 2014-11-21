<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

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


	/**
	* Check user rights
	*/
	public static function can($key) {

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
