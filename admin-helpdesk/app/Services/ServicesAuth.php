<?php namespace App\Services;

use App\Entities\ENKaryawan;
use App\Models\MOKaryawan;

class ServicesAuth extends \CodeIgniter\Controller
{
	protected $Admin, $AdminEN, $request;

	public function __construct()
	{
		$this->Admin = new MOKaryawan();
		$this->AdminEN = new ENKaryawan();
		$this->request = \Config\Services::request();
    }

	public function prosesLogin() {

        if ($this->request->isAJAX()) {
			$nip = $this->request->getPost('nip');
			$password = $this->request->getPost('password');

			$where = "karyawan.status_u != '2' AND karyawan.status_a != '2'";

			$admin = $this->Admin->where($where)
								->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
								->find($nip);

			// echo json_encode($admin);
			
			if($admin){
				$cek_password = password_verify($password, $admin->password);
				if($cek_password){

					$newdata = [
						'nip' => $admin->nip,
						'nama'  => $admin->nama,
						'email'     => $admin->email,
						'status' => $admin->status_u,
						'isLoggedIn' => true
					];

					$this->AdminEN->status_o = 1;
					$this->AdminEN->nip = $admin->nip;

					$this->Admin->update($admin->nip, $this->AdminEN);
					
					session()->set($newdata);

					$data['status'] = 200;
					$data['message'] = 'Berhasil';
					$data['token'] = csrf_hash();
					echo json_encode($data);
					
				} else {
					$data['status'] = 404;
					$data['message'] = 'Password anda salah!';
					$data['token'] = csrf_hash();
					echo json_encode($data);
				}
			} else {
				$data['status'] = 404;
				$data['message'] = 'Nip tidak ditemukan!';
				$data['token'] = csrf_hash();
				echo json_encode($data);
			}

		} else {
			return redirect()->to('/login');
		}
	}
}