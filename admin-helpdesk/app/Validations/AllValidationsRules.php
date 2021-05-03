<?php namespace App\Validations;

class AllValidationsRules 
{

    public function rulesKaryawan() {
        $rules = [
            'nip' => [
                'rules' => 'required|integer|is_unique[karyawan.nip]',
                'errors' => [
                    'required' => 'Nip tidak boleh kosong',
                    'integer' => 'Nip harus berupa angka',
                    'is_unique' => 'Nip Sudah ada sebelumnya, harus unique'
                ]
            ],
            'nama' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Nama tidak boleh kosong'
                ]
            ],
            'jk' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Jenis kelamin tidak boleh kosong'
                ]
            ], 
            'no_hp' => [
                'rules' => 'required|integer',
                'errors' => [
                    'required' => 'No Hp tidak boleh kosong',
                    'integer' => 'No Hp harus berupa angka'
                ]
            ], 
            'email' => [
                'rules' => 'required|valid_email',
                'errors' => [
                    'required' => 'Email tidak boleh kosong',
                    'valid_email' => 'Format Email tidak valid'
                ]
            ],
            'id_devisi' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Devisi tidak boleh kosong',
                ]
            ],
            'jabatan' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Jabatan tidak boleh kosong',
                ]
            ],
            'status_u' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Status User tidak boleh kosong',
                ]
            ]
        ];
        return $rules;
    }

    public function rulesUpdateKaryawan() {
        $rules = [
            'nip' => [
                'rules' => 'required|integer',
                'errors' => [
                    'required' => 'Nip tidak boleh kosong',
                    'integer' => 'Nip harus berupa angka',
                ]
            ],
            'nama' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Nama tidak boleh kosong'
                ]
            ],
            'jk' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Jenis kelamin tidak boleh kosong'
                ]
            ], 
            'no_hp' => [
                'rules' => 'required|integer',
                'errors' => [
                    'required' => 'No Hp tidak boleh kosong',
                    'integer' => 'No Hp harus berupa angka',
                ]
            ], 
            'email' => [
                'rules' => 'required|valid_email',
                'errors' => [
                    'required' => 'Email tidak boleh kosong',
                    'valid_email' => 'Format Email tidak valid'
                ]
            ],
            'id_devisi' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Devisi tidak boleh kosong',
                ]
            ],
            'jabatan' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Jabatan tidak boleh kosong',
                ]
            ]
        ];
        return $rules;
    }
}