<?php namespace App\Controllers\Auth;

use App\Entities\ENKaryawan;
use App\Models\MOKaryawan;

class Auth extends \CodeIgniter\Controller
{
	protected $Admin, $AdminEN, $request;

	public function __construct()
	{
		$this->Admin = new MOKaryawan();
		$this->AdminEN = new ENKaryawan();
		$this->request = \Config\Services::request();
	}
	
	public function login()
	{

		if(session()->get('isLoggedIn'))
			return redirect()->to('/dashboard-admin/home');
		
        $data['title'] = 'Login Admin';
		return view('auth/login', $data);
	}

	public function logout()
	{
		if(session()->get('nip'))
		{
			$this->AdminEN->status_o = 2;
			$this->AdminEN->nip = session()->get('nip');
			
			$this->Admin->update(session()->get('nip'), $this->AdminEN);

			session()->destroy();
			
			return redirect()->to('/login');
		} else {
			return redirect()->to('/login');
		}
    }

}
