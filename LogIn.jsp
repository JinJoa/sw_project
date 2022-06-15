
<%

	if(isset($_POST['uid'])&&isset($_POST['pwd'])){
		$userid=$_POST['uid'];
		$userpw=$_POST['pwd'];
		
		if($userid==NULL || $userpw==NULL)
                {
			echo "<script>alert('빈칸을 모두 채워주세요');</script>";
			echo("<script>location.href='login.php'</script>");
                }

			userDB_Access UserDAO = new userDB_Access(); //DB엑세스 객체 생성
			int result = UserDAO.login($userID, $userpw);//로그인 시도 후 결과를 저장.
		
		if(result == 1){ //로그인 성공.
			session.setAttribute("userID", user.getUserID());//현재 접속 중인 사용자를 관리하기 위한 세션부여
			PrintWriter script = response.getWriter();
			echo("<script>location.href = 'buttonmain.js'</script>");
		}
		else if(result == 0){ //비밀번호 틀렸을 때
			PrintWriter script = response.getWriter();
			echo("<script>alert('비밀번호가 틀립니다.')
			history.back()
			</script>");
		}
		else if(result == -1){ //아이디가 틀렸을 때
			PrintWriter script = response.getWriter();
			echo("<script>
			alert('존재하지 않는 아이디입니다.')
			history.back()
			</script>");
		}
		else if(result == -2){ //DB오류가 발생했을 때.
			PrintWriter script = response.getWriter();
			echo("<script>
			alert('DB오류가 발생했습니다.')
			history.back()
			</script>");
		}
	
		



%>



<!DOCTYPE html>
<html lang="kr">
  <head>
    <meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="./style.css">
    <title>php로그인</title>
  </head>
  <body>
    <form  method="post" class="loginForm">
	<% if (!isset($_SESSION['user_id'])) { %>
		<h2>Login</h2>
      	<div class="idForm">
		  	<input type="text" name="uid" class="id" placeholder="ID">
    	</div>
		<div class="passForm">
			<input type="password" name="pwd" class="pw" placeholder="PW">
		</div>
      
	<% }%>
      	<input type="submit" value="Log In" class="btn">
		<div class="signUp">
		  Don't you have ID? <input type="button" value="Sign up" onclick="location.href='signUP.html'"/>
		</div>
	</form>
	<% if (isset($_SESSION['user_id'])) { %>
				<input type="button" value="로그아웃" onclick="location.href='logout.php'"/>
    		<% } %>
  </body>
</html>


