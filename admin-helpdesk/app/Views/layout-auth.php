<!DOCTYPE html>
<html lang="en">
<head>
	<title><?= $title ?></title>
	<meta charset="UTF-8">
	<?= csrf_meta() ?>
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<!-- <link rel="icon" type="image/png" href="<?= base_url() ?>/assets/auth-assets/images/logo-smk.png"/> -->
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>/assets/auth-assets/vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>/assets/auth-assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>/assets/auth-assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>/assets/auth-assets/vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>/assets/auth-assets/vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>/assets/auth-assets/vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>/assets/auth-assets/vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>/assets/auth-assets/vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>/assets/auth-assets/css/util.css">
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>/assets/auth-assets/css/main.css">
<!--===============================================================================================-->
</head>
<body>

	<div class="loading-regis d-none">
		<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
		<span>Sedang Mengecek No Pegawai Anda Di Database</span>
	</div>

    <?= $this->renderSection('content') ?>

<!--===============================================================================================-->
	<script src="<?= base_url() ?>/assets/auth-assets/vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="<?= base_url() ?>/assets/auth-assets/vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="<?= base_url() ?>/assets/auth-assets/vendor/bootstrap/js/popper.js"></script>
	<script src="<?= base_url() ?>/assets/auth-assets/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="<?= base_url() ?>/assets/auth-assets/vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="<?= base_url() ?>/assets/auth-assets/vendor/daterangepicker/moment.min.js"></script>
	<script src="<?= base_url() ?>/assets/auth-assets/vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="<?= base_url() ?>/assets/auth-assets/vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<script src="<?= base_url() ?>/assets/auth-assets/js/main.js"></script>

	<script>
		$(document).ready(function() {

			$('#btn-login').click(function(){
				$('.loading-proses-signup').removeClass('d-none');

				$('#alert-success').text('');
				$('#alert-failed').text('');
				$("#alert-success").addClass('d-none');
				$("#alert-failed").addClass('d-none');

				$('#password').attr("disabled", true);
				$('#btn-login').attr("disabled", true);
				$('#no_pegawai_login').attr("disabled", true);

				var noPegawai = $("#no_pegawai_login").val();
				var Mypassword = $("#password").val();

				var csrfName = $('#hidden-csrf').attr('name');
				var csrfHash = $('#hidden-csrf').val();

				$.ajax({  
					url: "<?php echo base_url('proses-login'); ?>",
					type: 'POST',
					dataType:'json',
					data: {nip: noPegawai, password: Mypassword, [csrfName]: csrfHash },
					success:function(response){

						$('#hidden-csrf').val(response.token);

						// console.log(response);

						$('.loading-proses-signup').addClass('d-none');

						if(response.status == 200){
							$('#alert-success').text(response.message);
							$("#alert-success").removeClass('d-none');

							$('#password').val('');
							$('#no_pegawai_login').val('');

							$('#no_pegawai_login').removeAttr("disabled");
							$('#password').removeAttr("disabled");
							$('#btn-login').removeAttr("disabled");

							setTimeout(function(){
								$("#alert-success").addClass('d-none');
							}, 3000);

							window.location.replace("<?= base_url() ?>/dashboard-admin/");

						} else {
							$('#alert-failed').text(response.message);
							$("#alert-failed").removeClass('d-none');

							$('#no_pegawai_login').removeAttr("disabled");
							$('#password').removeAttr("disabled");
							$('#btn-login').removeAttr("disabled");
							
							setTimeout(function(){
								$("#alert-failed").addClass('d-none');
							}, 7000);
						}
						

					}  
				});
			})
		})
	</script>

</body>
</html>