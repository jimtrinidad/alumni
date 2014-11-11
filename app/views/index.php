<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>

	<meta charset="UTF-8">
	<title>Alumni Panel</title>

	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-reset.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/loading-bar.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/animate.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/animations.css">

	<!-- Custom styles for this template -->
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
	<link rel="stylesheet" type="text/css" href="assets/css/overwrites.css">

</head>
<body>

    <section id="container">

		<!--header start-->
		<header class="header fixed-top clearfix">
			<!--logo start-->
			<div class="brand">

				<a href="#/" class="logo">
					<span>Alumni Panel</span>
				</a>
				<div class="sidebar-toggle-box">
					<div class="fa fa-bars"></div>
				</div>
			</div>
				<!--logo end-->

			<div class="top-nav clearfix">

				<!--search & user info start-->
				<ul class="nav pull-right top-menu">

					<!-- user login dropdown start-->
					<li class="dropdown">
						<a class="dropdown-toggle">
							<img alt="" src="http://placehold.it/29x29">
							<span class="username"><?php echo ucfirst(Auth::user()->firstname . ' ' . Auth::user()->lastname); ?></span>
						</a>
					</li>

				</ul>

			</div>
		</header>
		<!--header end-->

		<aside>
			<div id="sidebar" class="nav-collapse" ng-controller="HeaderController">
				<!-- sidebar menu start-->
				<ul class="sidebar-menu" id="nav-accordion">
					<li>
						<a href="#/" ng-class="{ active: isActive('/') }">
							<i class="fa fa-dashboard"></i><span> Dashboard</span>
						</a>
					</li>
					<li>
					<li>
						<a href="#/alumni" ng-class="{ active: isActive('/alumni') }">
							<i class="fa fa-group"></i><span> Alumni</span>
						</a>
					</li>
					<li>
						<a href="#/programs" ng-class="{ active: isActive('/programs') }">
							<i class="fa fa-institution"></i><span> Programs</span>
						</a>
					</li>
					<li>
						<a href="#/users" ng-class="{ active: isActive('/users') }">
							<i class="fa fa-user"></i><span> Users</span>
						</a>
					</li>
					<li class="sub-menu">
						<a href="javascript:;" ng-class="{ active: isActive('/settings', 1) }">
							<i class="fa fa-cog"></i><span> Settings</span>
						</a>
						<ul class="sub">
							<li ng-class="{ active: isActive('/settings/general') }">
								<a href="#/settings/general">General Settings</a>
							</li>
							<li ng-class="{ active: isActive('/settings/notifications') }">
								<a href="#/settings/notifications">Notifications</a>
							</li>
							<li ng-class="{ active: isActive('/settings/security') }">
								<a href="#/settings/security">Security</a>
							</li>
						</ul>
					</li>
					<li>
						<a href="logout"><i class="fa fa-power-off"></i><span> Logout</span></a>
					</li>
				</ul>
				<!-- sidebar menu end-->
			</div>
		</aside>
		<!--sidebar end-->

		<!--main content start-->
		<section id="main-content">
			<section class="wrapper">
				<!-- page start-->
				<div ng-view></div>
				<!-- page end-->
			</section>
		</section>
		<!--main content end-->

	</section>
	
	<script type="text/javascript" src="assets/libs/angular/angular.min.js"></script>
	<script type="text/javascript" src="assets/libs/angular/angular-route.min.js"></script>
	<script type="text/javascript" src="assets/libs/angular/angular-animate.min.js"></script>
	<script type="text/javascript" src="assets/libs/angular/angular-resource.min.js"></script>
	<script type="text/javascript" src="assets/libs/require.js"></script>

	<script type="text/javascript" src="app/app.js"></script>
	<script type="text/javascript" src="app/shared/modules.js"></script>
	<script type="text/javascript" src="app/shared/controllers.js"></script>
	<script type="text/javascript" src="app/shared/directives.js"></script>

	<script type="text/javascript" src="assets/libs/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="assets/libs/jquery/jquery.dcjqaccordion.2.7.js"></script>
	<script type="text/javascript" src="assets/libs/jquery/jquery.scrollTo.min.js"></script>
	<script type="text/javascript" src="assets/libs/jquery/jquery.nicescroll.js" type="text/javascript"></script>

	<script type="text/javascript" src="assets/js/scripts.js"></script>

</body>
</html>