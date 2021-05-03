<?php namespace App\Controllers\Test;

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
		return view('test/login');
    }
    
	public function loginProsess()
	{
		
        $data['data'] = $this->request->getJson();

        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);
        
	}
       
}