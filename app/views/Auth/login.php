<!DOCTYPE html>
<html>
<head>
  <title>Alumni Login</title>
  <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="assets/css/bootstrap-theme.min.css">
  <link rel="stylesheet" type="text/css" href="assets/css/login.css">
</head>
<body>
	<div class="container">
	    <div class="row">
	        <div class="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
	            <h1 class="text-center login-title">Alumni Panel Login</h1>
	            <div class="account-wall">
	                <img class="profile-img" src="data:image/png;base64,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"
	                    alt="">
	                <form method="post" class="form-signin">
		                <input type="text" name="username" class="form-control" placeholder="Username" required autofocus>
		                <input type="password" name="password" class="form-control" placeholder="Password" required>
		                <?php echo isset($error) ? '<span class="error-msg" >' . $error . '</span>' : ''; ?>
		                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
	                </form>
	            </div>
	        </div>
	    </div>
	</div>
</body>
</html>