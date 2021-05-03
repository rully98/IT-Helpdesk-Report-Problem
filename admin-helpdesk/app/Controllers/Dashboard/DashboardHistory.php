<?php namespace App\Controllers\Dashboard;

use App\Services\ServicesKaryawan;
use App\Services\ServicesMasalah;

class DashboardHistory extends \CodeIgniter\Controller 
{
	protected $karyawan, $masalah;

	protected $data = [
		'isPage' => 'history',
		'title' => 'History Pekerjaan',
		'navbar' => 'History Pekerjaan'
	];

	public function __construct() 
	{
		$this->karyawan = new ServicesKaryawan;
		$this->data['nav_countAdminOnline'] = $this->karyawan->countAdminOnline();
		$this->data['nav_countUserOnline'] = $this->karyawan->countUserOnline();
        helper(['form','date']);
    }
    
    public function index(){
		return view('dashboard/history/list-history', $this->data);
    }
}