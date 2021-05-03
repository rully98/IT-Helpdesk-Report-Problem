<?php namespace App\Controllers\Dashboard;

use App\Services\ServicesKaryawan;
use App\Services\ServicesMasalah;

class DashboardHome extends \CodeIgniter\Controller
{
	protected $karyawan, $masalah;

	public function __construct() 
	{
		$this->karyawan = new ServicesKaryawan;
		$this->masalah = new ServicesMasalah;
	}

	public function index()
	{
        return redirect()->to('/dashboard-admin/home');
	}

	public function home() 
	{

		$data['count_all_masalah'] = $this->masalah->countAllMasalah();
		$data['count_all_useradmin'] = $this->karyawan->countAllKaryawan();
		$data['nav_countAdminOnline'] = $this->karyawan->countAdminOnline();
		$data['nav_countUserOnline'] = $this->karyawan->countUserOnline();
		$data['isPage'] = 'home';
		$data['title'] = 'Dashboard';
		$data['navbar'] = 'Selamat Datang';
		return view('dashboard/dashboard_home', $data);
	}

}
