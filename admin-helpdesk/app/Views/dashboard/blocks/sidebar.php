<div class="sidebar" data-color="white" data-active-color="danger">
    <div class="logo">
        <a href="#" class="simple-text logo-mini">
        <!-- <div class="logo-image-small">
            <img src="<?= base_url() ?>/assets/dashboard-assets/images/logo-smk.png">
        </div> -->
        <!-- <p>CT</p> -->
        </a>
        <a href="#" class="simple-text logo-normal" style="font-size: 14px;">
            HELPDESK
        <!-- <div class="logo-image-big">
            <img src="<?= base_url() ?>/assets/dashboard-assets/img/logo-big.png">
        </div> -->
        </a>
    </div>
    <div class="sidebar-wrapper">
        <ul class="nav">
            <li class="<?php if($isPage == 'home') { ?>active<?php } ?>">
                <a href="<?= base_url() ?>/dashboard-admin/">
                    <i class="nc-icon nc-bank"></i>
                    <p>Dashboard</p>
                </a>
            </li>
            <?php if(session()->get('status') == '3') { ?>
            <li class="<?php if($isPage == 'karyawan') { ?>active<?php } ?>">
                <a href="<?= base_url() ?>/dashboard-admin/karyawan">
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                    <p>Karyawan</p>
                </a>
            </li>
            <?php } ?>
            <li class="<?php if($isPage == 'laporan-masalah') { ?>active<?php } ?>">
                <a href="<?= base_url() ?>/dashboard-admin/laporan-masalah">
                    <i class="fa fa-outdent" aria-hidden="true"></i>
                    <p>Laporan Masalah</p>
                </a>
            </li>
            <li class="<?php if($isPage == 'history') { ?>active<?php } ?>">
                <a href="<?= base_url() ?>/dashboard-admin/history-pekerjaan">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    <p>History Pekerjaan</p>
                </a>
            </li>
            <li class="<?php if($isPage == 'list-waktu') { ?>active<?php } ?>">
                <a href="<?= base_url() ?>/dashboard-admin/list-waktu-pengerjaan">
                    <i class="fa fa-outdent" aria-hidden="true"></i>
                    <p>List Waktu Pengerjaan</p>
                </a>
            </li>
        </ul>
    </div>
</div>