<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">

    <title>Test page</title>

    <!--Core CSS -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/bootstrap-reset.min.css" rel="stylesheet">
    <link href="assets/css/font-awesome.min.css" rel="stylesheet" />

    <!-- Custom styles for this template -->
    <link href="assets/css/style.css" rel="stylesheet">

</head>

<body>

    <section id="container">
        <!--header start-->
        <header class="header fixed-top clearfix">
            <!--logo start-->
            <div class="brand">

                <a href="index-2.html" class="logo">
                    <img src="http://placehold.it/168x32" alt="">
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
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <img alt="" src="http://placehold.it/29x29">
                            <span class="username">John Doe</span>
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu extended logout">
                            <li><a href="#"><i class=" fa fa-suitcase"></i>Profile</a>
                            </li>
                            <li><a href="#"><i class="fa fa-cog"></i> Settings</a>
                            </li>
                            <li><a href="login.html"><i class="fa fa-key"></i> Log Out</a>
                            </li>
                        </ul>
                    </li>

                </ul>
                <!--search & user info end-->
            </div>
        </header>
        <!--header end-->
        <aside>
            <div id="sidebar" class="nav-collapse">
                <!-- sidebar menu start-->
                <ul class="sidebar-menu" id="nav-accordion">
                    <li>
                        <a href="index-2.html">
                            <i class="fa fa-dashboard"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-laptop"></i>
                            <span>Layouts</span>
                        </a>
                        <ul class="sub">
                            <li><a href="boxed_page.html">Boxed Page</a>
                            </li>
                            <li><a href="horizontal_menu.html">Horizontal Menu</a>
                            </li>
                            <li><a href="language_switch.html">Language Switch Bar</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-book"></i>
                            <span>UI Elements</span>
                        </a>
                        <ul class="sub">
                            <li><a href="general.html">General</a>
                            </li>
                            <li><a href="buttons.html">Buttons</a>
                            </li>
                            <li><a href="widget.html">Widget</a>
                            </li>
                            <li><a href="slider.html">Slider</a>
                            </li>
                            <li><a href="tree_view.html">Tree View</a>
                            </li>
                            <li><a href="nestable.html">Nestable</a>
                            </li>
                            <li><a href="grids.html">Grids</a>
                            </li>
                            <li><a href="calendar.html">Calender</a>
                            </li>
                            <li><a href="draggable_portlet.html">Draggable Portlet</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="fontawesome.html">
                            <i class="fa fa-bullhorn"></i>
                            <span>Fontawesome </span>
                        </a>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-th"></i>
                            <span>Data Tables</span>
                        </a>
                        <ul class="sub">
                            <li><a href="basic_table.html">Basic Table</a>
                            </li>
                            <li><a href="responsive_table.html">Responsive Table</a>
                            </li>
                            <li><a href="dynamic_table.html">Dynamic Table</a>
                            </li>
                            <li><a href="editable_table.html">Editable Table</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-tasks"></i>
                            <span>Form Components</span>
                        </a>
                        <ul class="sub">
                            <li><a href="form_component.html">Form Elements</a>
                            </li>
                            <li><a href="advanced_form.html">Advanced Components</a>
                            </li>
                            <li><a href="form_wizard.html">Form Wizard</a>
                            </li>
                            <li><a href="form_validation.html">Form Validation</a>
                            </li>
                            <li><a href="file_upload.html">Muliple File Upload</a>
                            </li>
                            <li><a href="dropzone.html">Dropzone</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="mail.html">
                            <i class="fa fa-envelope"></i>
                            <span>Mail </span>
                        </a>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class=" fa fa-bar-chart-o"></i>
                            <span>Charts</span>
                        </a>
                        <ul class="sub">
                            <li><a href="morris.html">Morris</a>
                            </li>
                            <li><a href="chartjs.html">Chartjs</a>
                            </li>
                            <li><a href="flot_chart.html">Flot Charts</a>
                            </li>
                            <li><a href="c3_chart.html">C3 Chart</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class=" fa fa-bar-chart-o"></i>
                            <span>Maps</span>
                        </a>
                        <ul class="sub">
                            <li><a href="google_map.html">Google Map</a>
                            </li>
                            <li><a href="vector_map.html">Vector Map</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;" class="active">
                            <i class="fa fa-glass"></i>
                            <span>Extra</span>
                        </a>
                        <ul class="sub">
                            <li class="active"><a href="blank.html">Blank Page</a>
                            </li>
                            <li><a href="lock_screen.html">Lock Screen</a>
                            </li>
                            <li><a href="profile.html">Profile</a>
                            </li>
                            <li><a href="invoice.html">Invoice</a>
                            </li>
                            <li><a href="pricing_table.html">Pricing Table</a>
                            </li>
                            <li><a href="timeline.html">Timeline</a>
                            </li>
                            <li><a href="404.html">404 Error</a>
                            </li>
                            <li><a href="500.html">500 Error</a>
                            </li>
                            <li><a href="registration.html">Registration</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="login.html">
                            <i class="fa fa-user"></i>
                            <span>Login Page</span>
                        </a>
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
                <div class="row">
                    <div class="col-sm-12">
                        <section class="panel">
                            <header class="panel-heading">
                                Heading goes here..
                                <span class="tools pull-right">
                                    <a href="javascript:;" class="fa fa-chevron-down"></a>
                                    <a href="javascript:;" class="fa fa-cog"></a>
                                    <a href="javascript:;" class="fa fa-times"></a>
                                </span>
                            </header>
                            <div class="panel-body">
                                This is a sample page
                            </div>
                        </section>
                    </div>
                </div>
                <!-- page end-->
            </section>
        </section>
        <!--main content end-->

    </section>

    <!-- Placed js at the end of the document so the pages load faster -->

    <!--Core js-->
    <script src="assets/libs/jquery/jquery.min.js"></script>
    <script src="assets/libs/jquery/jquery.dcjqaccordion.2.7.js"></script>
    <script src="assets/libs/jquery/jquery.scrollTo.min.js"></script>
    <script src="assets/libs/jquery/jquery.nicescroll.js" type="text/javascript"></script>
    <script type="text/javascript" src="assets/libs/angular/angular.min.js"></script>
    <script type="text/javascript" src="assets/libs/ui-bootstrap-tpls.min.js"></script>

    <!--common script init for all pages-->
    <script src="assets/js/scripts.js"></script>

</body>

</html>