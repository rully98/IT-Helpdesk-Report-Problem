<?php namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\I18n\Time;

class MOMessage extends Model
{
    protected $table = 'message_helpdesk'; 
    protected $primaryKey = 'id_message_helpdesk';

    protected $returnType = '\App\Entities\ENMessage';

    protected $allowedFields = [
        'id_message_helpdesk',
        'id_helpdesk',
        'nip_pengirim',
        'message',
        'message_updated_at',
        'message_created_at'
    ];

}