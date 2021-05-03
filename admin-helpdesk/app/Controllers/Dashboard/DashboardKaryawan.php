<?php namespace App\Controllers\Dashboard;

use App\Services\ServicesKaryawan;
use App\Services\ServicesDevisi;
use App\Validations\AllValidationsRules;

class DashboardKaryawan extends \CodeIgniter\Controller
{
	protected $karyawan, $devisi, $rules;

	protected $data = [
		'isPage' => 'karyawan',
		'title' => 'Karyawan',
		'navbar' => 'Karyawan'
	];

	public function __construct() 
	{
		$this->karyawan = new ServicesKaryawan;
		$this->devisi = new ServicesDevisi;
		$this->rules = new AllValidationsRules;
		$this->data['nav_countAdminOnline'] = $this->karyawan->countAdminOnline();
		$this->data['nav_countUserOnline'] = $this->karyawan->countUserOnline();
        helper(['form','date']);
	}

    public function index() {
		return view('dashboard/karyawan/list-karyawan', $this->data);
	}
	
	public function add() {

		if($this->request->getMethod() == 'post'){
			if($this->validate($this->rules->rulesKaryawan())){
				$result = $this->karyawan->addKaryawan($_POST);
				// var_dump($result);
				if($result == 0){

					session()->setFlashdata('status_code', 200);
					session()->setFlashdata('message', "Berhasil menambahkan data");
					
					return redirect()->to(current_url());
				}
			} else {
				$this->data['validation'] = $this->validator;
			}
		}

		$this->data['devisi'] = $this->devisi->getAllDevisi();
		// var_dump($this->data);
		return view('dashboard/karyawan/add-karyawan', $this->data);
	}
    
	public function settings() {

		if($this->request->getMethod() == 'post'){
			if($this->validate($this->rules->rulesUpdateKaryawan())){
				$result = $this->karyawan->updateKaryawan($_POST);
				// var_dump($_POST);
				if($result){

					session()->setFlashdata('status_code', 200);
					session()->setFlashdata('message', "Berhasil Update data");
					
					return redirect()->to(current_url());
				} else {
					session()->setFlashdata('status_code', 400);
					session()->setFlashdata('message', "Gagal Update data");
					
					return redirect()->to(current_url());
				}
				// var_dump($result);
			} else {
				$this->data['validation'] = $this->validator;
			}
		}

		$this->data['dataUser'] = $this->karyawan->getDataUserByNip();

		$this->data['devisi'] = $this->devisi->getAllDevisi();
		// var_dump($this->data);
		return view('dashboard/karyawan/setting-karyawan', $this->data);
	}
}