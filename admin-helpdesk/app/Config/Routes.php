<?php namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App');
$routes->setDefaultController('Controllers\Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
// $routes->set404Override(function() {
//     echo view('errors/error404.php');
// });
$routes->setAutoRoute(true);

/**
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.

$routes->get('/', 'Controllers\Home::index');

/* DASHBOARD ADMIN */
$routes->group('dashboard-admin', function($routes)
{
	$routes->get('/', 'Controllers\Dashboard\DashboardHome::index');
	$routes->get('home', 'Controllers\Dashboard\DashboardHome::home');

	$routes->group('karyawan', function($routes)
	{
		$routes->get('/', 'Controllers\Dashboard\DashboardKaryawan::index', ['filter' => 'isSuperAdmin_Filters']);

		$routes->get('add', 'Controllers\Dashboard\DashboardKaryawan::add', ['filter' => 'isSuperAdmin_Filters']);
		$routes->post('add', 'Controllers\Dashboard\DashboardKaryawan::add', ['filter' => 'isSuperAdmin_Filters']);

		$routes->get('settings', 'Controllers\Dashboard\DashboardKaryawan::settings');
		$routes->post('settings', 'Controllers\Dashboard\DashboardKaryawan::settings');

		/* Services Data */
		$routes->get('listdata', 'Services\ServicesKaryawan::listData', ['filter' => 'isSuperAdmin_Filters']);
		$routes->post('update_status__', 'Services\ServicesKaryawan::updateStatusUser__', ['filter' => 'isSuperAdmin_Filters']);

	});

	$routes->group('list-waktu-pengerjaan', function($routes)
	{
		$routes->get('/', 'Controllers\Dashboard\DashboardListWaktu::index');

		/* Services Data */
		
		$routes->post('add', 'Services\ServicesListWaktu::add', ['filter' => 'isSuperAdmin_Filters']);
		$routes->post('update', 'Services\ServicesListWaktu::update', ['filter' => 'isSuperAdmin_Filters']);
		$routes->get('listdata', 'Services\ServicesListWaktu::listData');

	});

	$routes->group('laporan-masalah', function($routes)
	{
		$routes->get('/', 'Controllers\Dashboard\DashboardMasalah::index');

		/* Services Data */
		$routes->get('listdata', 'Services\ServicesMasalah::listData');
		$routes->post('update_status_masalah__', 'Services\ServicesMasalah::updateStatusMasalah__');

	});

	$routes->group('pesan', function($routes) 
	{
		$routes->get('/', 'Services\ServicesMessage::listData');
		$routes->post('add', 'Services\ServicesMessage::add');
	});

	$routes->group('history-pekerjaan', function($routes) 
	{
		$routes->get('/', 'Controllers\Dashboard\DashboardHistory::index');

		/* Services Data */
		$routes->get('listdata', 'Services\ServicesMasalah::listDataHistory');
	});

});

/* Services For Mobile Apps */
$routes->group('api', function($routes) {
	/* GET DATA */
	$routes->get('list-masalah', 'Controllers\User\Masalah::listMasalah');
	$routes->get('detail-masalah', 'Controllers\User\Masalah::detailMasalah');

	/* POST DATA */
	$routes->post('login', 'Controllers\User\Auth::login');
	$routes->post('logout', 'Controllers\User\Auth::logout');
	$routes->post('register', 'Controllers\User\Auth::register');
	$routes->post('add-masalah', 'Controllers\User\Masalah::addMasalah');
	$routes->post('done-masalah', 'Controllers\User\Masalah::updateMasalah');
});

/* Services For Test Mobile Apps */
$routes->group('test', function($routes) {
	$routes->get('login', 'Controllers\Test\Auth::login');

	$routes->post('proses-login', 'Controllers\Test\Auth::loginProsess');
});

/* AUTH */
$routes->get('/login', 'Controllers\Auth\Auth::login');
$routes->get('/logout', 'Controllers\Auth\Auth::logout');
$routes->post('/proses-login', 'Services\ServicesAuth::prosesLogin');

/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need to it be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
