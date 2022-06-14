
<?php
include ('dbcon.php');
                $id=$_POST['userid'];
                $pw=$_POST['userpw'];
                $name=$_POST['name'];
                $tel=$_POST['tel'];
		$sex=$_POST['sex'];




		if($id==NULL || $pw==NULL || $name==NULL || $tel==NULL || $tel==NULL)
		{
			echo "빈칸을 모두 채워주세요";
			echo "<a href=signUP.html>back page</a>";
			exit();
		}

		$check  = "SELECT *  FROM customer WHERE CUS_ID = '$id'";

		$result = oci_parse($connect, $check);

		oci_execute($result);

		if(oci_fetch_array($result,OCI_ASSOC+OCI_RETURN_NULLS ==  1)){
			echo "중복된 id입니다.";
			echo "<a href=signUP.html>back page</a>";
			exit();
		}

                $sql = "INSERT INTO customer( CUS_ID,CUS_PW,CUS_NAME,CUS_TEL,SEX)
                        VALUES('$id','$pw','$name','$tel','$sex')";
	
                $stid = oci_parse($connect,$sql);

                oci_execute($stid);


                oci_free_statement($stid);
                oci_close($connect);

		echo "<a href=login.php>back page</a>";
		$errMSG = "회원가입성공";
?>

