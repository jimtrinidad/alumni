<?php

namespace AppHelpers;

function programLogo($item) {

	$filepath 		= 'assets/img/programs/';
	$item['logo'] 	= \File::exists(public_path($filepath . $item['logo'])) ? asset($filepath . $item['logo']) : asset($filepath . 'default.png');
	
	return $item;

}