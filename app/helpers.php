<?php

namespace AppHelpers;

function programLogo($item) {

	$filepath 		= 'assets/img/program_logo/';		
	$item['logo'] 	= \File::exists(public_path($filepath . $item['logo'])) ? asset($filepath . $item['logo']) : asset($filepath . 'default.png');
	
	return $item;

}