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

function userPhoto($item, $recache = false) {

	$ts = '';
	if ($recache) {
		$ts = '?' . time();
	}

	$filepath 		= \Config::get('constants.USER_PHOTO_PATH');

	if (is_string($item)) {
		return !empty($item) && \File::exists(public_path($filepath . $item)) ? asset($filepath . $item) . $ts : asset($filepath . 'default.png');
	}

	$item['photo'] 		= !empty($item['photo']) && \File::exists(public_path($filepath . $item['photo'])) ? asset($filepath . $item['photo']) . $ts : asset($filepath . 'default.png');
	
	return $item;

}