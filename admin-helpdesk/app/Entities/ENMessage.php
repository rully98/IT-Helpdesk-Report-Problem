<?php namespace App\Entities;

use CodeIgniter\Entity;

class ENMessage extends Entity
{
    protected $id_message_helpdesk;
    protected $id_helpdesk;
    protected $nip_pengirim;
    protected $message;
    protected $message_updated_at;
    protected $message_created_at;
}