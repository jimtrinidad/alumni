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

		$query	= DB::table('settings')->where('key', '=', $key);

		$settings	= $query->pluck('value');

		return ($settings ? $settings : '[]');

	}


}
