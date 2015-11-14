<?php

namespace AppHelpers;

function programLogo($item, $recache = false) {

	$ts = '';
	if ($recache) {
		$ts = '?' . time();
	}

	$filepath 		= \Config::get('constants.PROGRAM_LOGO_PATH');
	$item['logo'] 	= !empty($item['logo']) && \File::exists(public_path($filepath . $item['logo'])) ? asset($filepath . $item['logo']) . $ts : asset($filepath . 'default.png');
	
	return $item;

}