<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>

	<meta charset="UTF-8">
	<title>Alumni Panel</title>

	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-theme.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-reset.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/loading-bar.min.css">

	<!-- Custom styles for this template -->
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">

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
					<a>
						<img alt="" src="http://placehold.it/29x29">
						<span class="username">John Doe</span>
					</a>
					<li class="dropdown hidden">
						<a data-toggle="dropdown" class="dropdown-toggle" href="#">
							<img alt="" src="http://placehold.it/29x29">
							<span class="username">John Doe</span>
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu extended logout">
							<li>
								<a href="#"><i class=" fa fa-suitcase"></i>Profile</a>
							</li>
							<li>
								<a href="#"><i class="fa fa-cog"></i> Settings</a>
							</li>
							<li>
								<a href="login.html"><i class="fa fa-power-off"></i> Log Out</a>
							</li>
						</ul>
					</li>

				</ul>

			</div>
		</header>
		<!--header end-->

		<aside>
			<div id="sidebar" class="nav-collapse">
				<!-- sidebar menu start-->
				<ul class="sidebar-menu" id="nav-accordion">
					<li>
						<a href="#/">
							<i class="fa fa-dashboard"></i><span> Dashboard</span>
						</a>
					</li>
					<li>
					<li>
						<a href="#/alumni">
							<i class="fa fa-group"></i><span> Alumni</span>
						</a>
					</li>
					<li>
						<a href="#/programs">
							<i class="fa fa-institution"></i><span> Programs</span>
						</a>
					</li>
					<li>
						<a href="#/programs">
							<i class="fa fa-institution"></i><span> Users</span>
						</a>
					</li>
					<li class="sub-menu">
						<a href="javascript:;">
							<i class="fa fa-cog"></i><span> Settings</span>
						</a>
						<ul class="sub">
							<li>
								<a href="basic_table.html">Notifications</a>
							</li>
							<li>
								<a href="responsive_table.html">Displayed Data</a>
							</li>
							<li>
								<a href="dynamic_table.html">Security</a>
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
	<script type="text/javascript" src="assets/libs/require.js"></script>

	<script type="text/javascript" src="assets/libs/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="assets/libs/jquery/jquery.dcjqaccordion.2.7.js"></script>
	<script type="text/javascript" src="assets/libs/jquery/jquery.scrollTo.min.js"></script>
	<script type="text/javascript" src="assets/libs/jquery/jquery.nicescroll.js" type="text/javascript"></script>

	<script type="text/javascript" src="app/app.js"></script>
	<script type="text/javascript" src="app/shared/modules/lazyload.module.js"></script>
	<script type="text/javascript" src="app/shared/modules/ui-bootstrap-tpls.min.js"></script>
	<script type="text/javascript" src="app/shared/modules/loading-bar.min.js"></script>

	<script type="text/javascript" src="assets/js/scripts.js"></script>

</body>
</html>