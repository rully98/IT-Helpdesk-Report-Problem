<div id="test-login"></div>


<?php if(getenv('CI_ENVIRONMENT') == 'development') { ?>
    <script src="<?= base_url() ?>/assets/reactjs/vendor/react.development.js"></script>
    <script src="<?= base_url() ?>/assets/reactjs/vendor/react-dom.development.js"></script>
<?php } else { ?>
    <script src="<?= base_url() ?>/assets/reactjs/vendor/react.production.min.js"></script>
    <script src="<?= base_url() ?>/assets/reactjs/vendor/react-dom.production.min.js"></script>
<?php } ?>

<script src="<?= base_url() ?>/assets/reactjs/vendor/babel.min.js"></script>
<script src="<?= base_url() ?>/assets/reactjs/vendor/axios.min.js"></script>

<script src="<?= base_url() ?>/assets/dashboard-assets/js/moment-with-locales.min.js"></script>
<script type="text/babel" id="scripts-list-data" src="<?= base_url() ?>/assets/reactjs/test-login.js?endpoint=<?= base_url(); ?>"></script>