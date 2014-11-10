<?php if (php_sapi_name() !== 'cli') die('Only allowed on cli');

set_time_limit(0);

if (!isset($argv[1])) die('table to migrate is required');

$db1	= new Database(array(
		'dbname'	=> 'db_alumni',
		'user'		=> 'root',
		'pass'		=> '',
		'host'		=> 'localhost',
		'port'		=> 3306
	));

$db2	= new Database(array(
		'dbname'	=> 'alumni',
		'user'		=> 'root',
		'pass'		=> '',
		'host'		=> 'localhost',
		'port'		=> 3306
	));


switch ($argv[1]) {
	case 'alumni':

		$loop	= true;
		$start	= 0;
		$max	= 500;
		while ($loop) {

			$query 		= "SELECT * FROM tb_alumni LIMIT $start, $max";
			$results 	= $db1->query($query)->results();

			foreach ($results as $v) {
				
				echo $v['firstname'] . PHP_EOL;
				$insert = "INSERT INTO alumni (id,firstname,lastname,mi,nickname,gender,program_id,batch,position,company,no_work,no_home,no_fax,no_mobile,email_prefer,email_other,birthday,address,photo,created_at,deleted_at) 
							VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

				$response = $db2->db->prepare($insert)->execute(array(
						$v['id'],
						$v['firstname'],
						$v['lastname'],
						$v['mi'],
						$v['nickname'],
						$v['gender'],
						$v['programID'],
						$v['batch'],
						$v['position'],
						$v['company'],
						$v['workNo'],
						$v['homeNo'],
						$v['faxNo'],
						$v['mobileNo'],
						$v['prefEmail'],
						$v['otherEmail'],
						$v['birthdate'],
						$v['mailAddress'],
						$v['photo'],
						$v['dateAdded'],
						($v['isDeleted'] == 1 ? date('Y-m-d H:i:s') : NULL)
					));

			}

			$start	+= $max;
			echo PHP_EOL . '-----------BREAK------------' . PHP_EOL;
			sleep(5);
			if(!count($results) > 0) {
				$loop = false;
			}

		}

		break;

	case 'program' :

		$loop	= true;
		$start	= 0;
		$max	= 500;
		while ($loop) {

			$query 		= "SELECT * FROM tb_program LIMIT $start, $max";
			$results 	= $db1->query($query)->results();

			foreach ($results as $v) {
				
				echo $v['longname'] . PHP_EOL;
				$insert = "INSERT INTO programs (id,name,acronym,logo,created_at) 
							VALUE(?,?,?,?,?)";

				$response = $db2->db->prepare($insert)->execute(array(
						$v['id'],
						$v['longname'],
						$v['name'],
						$v['logo'],
						$v['dateCreated']
					));

			}

			$start	+= $max;
			echo PHP_EOL . '-----------BREAK------------' . PHP_EOL;
			sleep(5);
			if(!count($results) > 0) {
				$loop = false;
			}

		}

		break;

	case 'userprogram' :

		$loop	= true;
		$start	= 0;
		$max	= 500;
		while ($loop) {

			$query 		= "SELECT * FROM tb_userprogram LIMIT $start, $max";
			$results 	= $db1->query($query)->results();

			foreach ($results as $v) {
				
				echo $v['id'] . PHP_EOL;
				$insert = "INSERT INTO user_program (id,user_id,program_id,created_at) 
							VALUE(?,?,?,?)";

				$response = $db2->db->prepare($insert)->execute(array(
						$v['id'],
						$v['userID'],
						$v['programID'],
						date('Y-m-d H:i:s')
					));

			}

			$start	+= $max;
			echo PHP_EOL . '-----------BREAK------------' . PHP_EOL;
			sleep(5);
			if(!count($results) > 0) {
				$loop = false;
			}

		}

		break;

	case 'user' :

		$loop	= true;
		$start	= 0;
		$max	= 500;
		while ($loop) {

			$query 		= "SELECT * FROM tb_users LIMIT $start, $max";
			$results 	= $db1->query($query)->results();

			foreach ($results as $v) {
				
				echo $v['username'] . PHP_EOL;
				$insert = "INSERT INTO users (id,username,password,email,firstname,lastname,privilege_id,last_logged,created_at) 
							VALUE(?,?,?,?,?,?,?,?,?)";

				$response = $db2->db->prepare($insert)->execute(array(
						$v['id'],
						$v['username'],
						$v['password'],
						$v['email'],
						$v['firstname'],
						$v['lastname'],
						$v['p_id'],
						$v['lastLoggin'],
						$v['created_at'],
					));

			}

			$start	+= $max;
			echo PHP_EOL . '-----------BREAK------------' . PHP_EOL;
			sleep(5);
			if(!count($results) > 0) {
				$loop = false;
			}

		}

		break;
	
	default:
		# code...
		break;
}











/**
*  DB CLASS
*/
class Database{

	private $host;
	private $port;
	private $user;
	private $pass;
	private $dbname;

	private $dbh;
	private $sth;

	function __construct( $config = null, $persistent = true) {

		if( ! is_null($config) ) {
			$this->_set_config($config);
		} else {

			$this->host = DB_HOST;
			$this->port = DB_PORT;
			$this->user = DB_USER;
			$this->pass = DB_PASS;
			$this->dbname = DB_NAME;

		}

		$pdo_params = array(
	        PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
	        PDO::ATTR_PERSISTENT               => $persistent,
	        PDO::MYSQL_ATTR_INIT_COMMAND       => "set sql_mode='traditional'",
	        PDO::MYSQL_ATTR_INIT_COMMAND       => "SET NAMES 'utf8'"
	    );

	    $dsn = "mysql:dbname=".$this->dbname.";host=".$this->host;

	    if( $this->port !== null && $this->port != '' ) {
	    	$dsn .= ";port=".$this->port;
	    }

	    try {
	    	
		    $this->db = new PDO($dsn, $this->user, $this->pass, $pdo_params);

		    $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		    
		} catch (PDOException $e) {
		    die($e);
		}
	}

	private function _set_config( $config ) {

		foreach($config as $k=>$v) {
			$this->$k = $v;
		}

	}

	public function query($sql, $params = array()) {

		$this->sth = $this->db->prepare($sql);
		$this->sth->execute($params);
		return $this;

	}

	public function results($flag = PDO::FETCH_ASSOC) {

		return $this->sth->fetchAll($flag);

	}

	public function result($flag = PDO::FETCH_ASSOC) {

		return $this->sth->fetch($flag);

	}	

	public function column($index = 0) {

		return $this->sth->fetchColumn($index);

	}

	public function lastInsertId() {

	    return $this->dbh->lastInsertId();
	    
	}

}