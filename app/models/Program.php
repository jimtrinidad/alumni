<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Program extends Eloquent {

	use SoftDeletingTrait;
	
	protected $dates 		= ['deleted_at'];
	protected $softDelete 	= true;

	protected $table		= 'programs';

}