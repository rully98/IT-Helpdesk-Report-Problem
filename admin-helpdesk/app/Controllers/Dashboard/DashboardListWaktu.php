<?php namespace App\Controllers\Dashboard;

use App\Services\ServicesKaryawan;

class DashboardListWaktu extends \CodeIgniter\Controller
{
	protected $karyawan;

	public function __construct() 
	{
		$this->karyawan = new ServicesKaryawan;
    }
    
	public function index() 
	{
		$data['nav_countAdminOnline'] = $this->karyawan->countAdminOnline();
		$data['nav_countUserOnline'] = $this->karyawan->countUserOnline();
		$data['isPage'] = 'list-waktu';
		$data['title'] = 'List Waktu Pengerjaan';
		$data['navbar'] = 'List Waktu Pengerjaan';
        return view('dashboard/listwaktu/list_waktu_pengerjaan', $data);
	}

}
