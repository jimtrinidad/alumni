<?php

class Settings extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'settings';


	/**
	* Get item by key
	*/
	public static function get($key) {

		$query	= DB::table('privilege')->where('key', '=', $key);

		$query->where('user_id', '=', Auth::id());

		$privilege	= $query->pluck('value');

		return ($privilege ? $privilege : '[]');

	}


}
