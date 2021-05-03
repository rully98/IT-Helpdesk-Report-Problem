<?php namespace App\Controllers\Dashboard;

use App\Services\ServicesKaryawan;
use App\Services\ServicesMasalah;

class DashboardMasalah extends \CodeIgniter\Controller
{
	protected $karyawan, $masalah;

	protected $data = [
		'isPage' => 'laporan-masalah',
		'title' => 'Masalah',
		'navbar' => 'Laporan Masalah'
	];

	public function __construct() 
	{
		$this->karyawan = new ServicesKaryawan;
		$this->masalah = new ServicesMasalah;
		$this->data['nav_countAdminOnline'] = $this->karyawan->countAdminOnline();
		$this->data['nav_countUserOnline'] = $this->karyawan->countUserOnline();
        helper(['form','date']);
	}

    public function index() {
		return view('dashboard/masalah/list-masalah', $this->data);
    }
    
}