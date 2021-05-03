<?php namespace App\Controllers\User;

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
			
		$nip = $this->request->getJson()->nip;
		$password = $this->request->getJson()->password;
		 
		$where = "karyawan.status_a <> '2' && karyawan.status_u = '2'";

		$admin = $this->Admin->where($where)
							->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
							->find($nip);

		// $data['result'] = $admin;

		// $data['data'] = $this->request->getJson()->nip;
		// $data['password'] = $this->request->getJson()->password;

		if($admin) {

			$cek_password = password_verify($password, $admin->password);
			if($cek_password){

				$this->AdminEN->status_o = 1;
				$this->AdminEN->nip = $nip;

				$this->Admin->update($nip, $this->AdminEN);

				$data['status'] = 200;
				$data['message'] = 'Berhasil';
				$data['result'] = [
					'nip' => $admin->nip,
					'nama' => $admin->nama,
					'email' => $admin->email,
					'id_devisi' => $admin->id_devisi,
					'status_a' => $admin->status_a,
					'status_o' => $admin->status_o,
					'status_u' => $admin->status_u
				];
				
			} else {

				$data['status'] = 404;
				$data['message'] = 'Password anda salah!';
				$data['result'] = null;
			}

		} else {
			
			$data['status_code'] = 404;
			$data['message'] = 'Nip tidak ditemukan atau belum di verifikasi oleh admin!';
			$data['result'] = null;
		}

		$this->response->setHeader('Content-Type', 'application/json');
		return $this->response->setJSON($data);
	}

	public function logout()
	{
		$nip = $this->request->getJson()->nip;
		
		$this->AdminEN->status_o = 2;
		$this->AdminEN->nip = $nip;

		$this->Admin->update($nip, $this->AdminEN);

		$data['status'] = 200;
		$data['message'] = 'Berhasil';

		$this->response->setHeader('Content-Type', 'application/json');
		return $this->response->setJSON($data);
	}
	
	public function register()
	{
		
		$nip = $this->request->getJson()->nip;
		$password = $this->request->getJson()->password;

		$where = "karyawan.status_a != '1' && karyawan.status_u = 2";

		$admin = $this->Admin->where($where)
							->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
							->find($nip);
		if($admin) {

			$this->AdminEN->password = $password;
			$this->AdminEN->nip = $nip;
			$result = $this->Admin->update($nip, $this->AdminEN);

			$data['status_code'] = 200;
			$data['message'] = 'Berhasil register, silahkan tunggu untuk proses verifikasi akun oleh admin kami';
			$data['result'] = $result;

		} else {

			$data['status_code'] = 404;
			$data['message'] = 'Nip tidak terdaftar atau sudah pernah registrasi sebelumnya, anda bisa menghubungi admin kami!';
			$data['result'] = $admin;
		}

        $this->response->setHeader('Content-Type', 'application/json');
		return $this->response->setJSON($data);
		
    }
       
}