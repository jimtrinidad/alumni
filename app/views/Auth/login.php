<!DOCTYPE html>
<html>
    <head>
        <title>Alumni Login</title>
        <link rel="stylesheet" type="text/css" href="assets/css/bootstrap-libraries.css">
        <link rel="stylesheet" type="text/css" href="assets/css/login.css">
    </head>
    <body class="login-body">
        <div class="container">
            <form method="post" class="form-signin" novalidate>
                <h2 class="form-signin-heading">Alumni Panel Login</h2>
                <div class="login-wrap">
                    <div class="user-login-info">
                        <input type="text" name="username" class="form-control" placeholder="Username" required autofocus autocomplete="off">
                        <input type="password" name="password" class="form-control" placeholder="Password" required>
                    </div>
                    <label class="checkbox">
                        <?php echo isset($error) ? '<span class="error-msg" >' . $error . '</span>' : ''; ?>
                    </label>
                    <button class="btn btn-lg btn-login btn-block" type="submit">Sign in</button>
                </div>
            </form>
        </div>
    </body>
</html>