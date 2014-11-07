<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Program extends Eloquent {

	use SoftDeletingTrait;
	
	protected $dates 		= ['dateDeleted'];
	protected $softDelete 	= true;

	protected $table		= 'tb_program';

}