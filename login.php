
<?php

include('dbcon.php');

	if(isset($_POST['uid'])&&isset($_POST['pwd'])){
		$userid=$_POST['uid'];
		$userpw=$_POST['pwd'];
		
		if($userid==NULL || $userpw==NULL)
                {
			echo "<script>alert('빈칸을 모두 채워주세요');</script>";
			echo("<script>location.href='login.php';</script>");
                }




		$sql = "SELECT * FROM customer where CUS_ID='$userid' and CUS_PW='$userpw'";
		
		$stid = oci_parse($connect,$sql);

		oci_execute($stid);

		
		if($row = oci_fetch_array($stid,OCI_ASSOC+OCI_RETURN_NULLS)){

			$_SESSION['user_id'] = $userid;
			
			//admin 권한에 따른 is_admin확인			
			if($userid == 'admin'){
                                $_SESSION['is_admin'] = 1;
                        }
                        else{
                                $_SESSION['is_admin'] = 0;
                        }
			
			
			echo "사용자 이름:  $userid";

			echo "<script>alert('-로그인성공-');</script>";

			oci_free_statement($stid);
        	        oci_close($connect);
	
			echo("<script>location.replace('main.php');</script>");
		}
		else{
			echo "<script>alert('-로그인실패-\\r\\n아이디  $userid 가 존재하지 않거나 비밀번호가 틀립니다.');</script>";
		}


		oci_free_statement($stid);
		oci_close($connect);	
	}


?>



<!DOCTYPE html>
<html lang="kr">
  <head>
    <meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="./style.css">
    <title>php로그인</title>
  </head>
  <body>
    <form  method="post" class="loginForm">
	<?php if (!isset($_SESSION['user_id'])) { ?>
		<h2>Login</h2>
      	<div class="idForm">
		  	<input type="text" name="uid" class="id" placeholder="ID">
    	</div>
		<div class="passForm">
			<input type="password" name="pwd" class="pw" placeholder="PW">
		</div>
      
	<?php }?>
      	<input type="submit" value="Log In" class="btn">
		<div class="signUp">
		  Don't you have ID? <input type="button" value="Sign up" onclick="location.href='signUP.html'"/>
		</div>
	</form>
	<?php if (isset($_SESSION['user_id'])) { ?>
				<input type="button" value="로그아웃" onclick="location.href='logout.php'"/>
    		<?php } ?>
  </body>
</html>



