
<?= $this->extend('layout-auth') ?>

<?= $this->section('content') ?>
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
				<form class="login100-form validate-form">
					<span class="login100-form-title p-b-33">
						<!-- <img style="width: auto; height: 50px" src="<?= base_url() ?>/assets/auth-assets/images/logo-smk.png" />  -->
						Login Admin
					</span>
					<input type="hidden" id="hidden-csrf" name="<?= csrf_token() ?>" value="<?= csrf_hash() ?>" />
					<div class="alert alert-success d-none" id="alert-success" role="alert"></div>
					<div class="alert alert-danger d-none" id="alert-failed" role="alert"></div>
					
					<div class="wrap-input100 validate-input" data-validate="Password is required">
						<input class="input100" id="no_pegawai_login" type="text" name="no_pegawai" placeholder="Nip">
						<span class="focus-input100-1"></span>
						<span class="focus-input100-2"></span>
					</div>

					<div class="wrap-input100 rs1 validate-input" data-validate="Password is required">
						<input class="input100" id="password" type="password" name="password" placeholder="Password">
						<span class="focus-input100-1"></span>
						<span class="focus-input100-2"></span>
					</div>

					<div class="container-login100-form-btn m-t-20">
						<button class="login100-form-btn" id="btn-login">
							<i class="fa fa-spinner fa-pulse fa-3x fa-fw d-none loading-proses-signup" style="font-size: 20px; margin-right: 10px;"></i>
							Sign in
						</button>
					</div>

					<!-- <div class="text-center p-t-45 p-b-4">
						<span class="txt1">
							Forgot
						</span>

						<a href="#" class="txt2 hov1">
							Username / Password?
						</a>
					</div> -->

					<div class="text-center p-t-45 p-b-4">
						<span class="txt1">
							Create an account?
						</span>

						<a href="<?= base_url() ?>/register" class="txt2 hov1">
							Sign up
						</a>
					</div>
					<div class="text-center">
						<small class="txt1" style="font-size: 10px;">
							Copyright by Helpdesk 2020
						</small>
					</div>
				</form>
			</div>
		</div>
	</div>

<?= $this->endSection() ?>