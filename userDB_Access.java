
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
//================================DB�� ������ �� ���� �޼������ ��Ƴ��� Ŭ����==============================
public class userDB_Access {
	
	private Connection conn;					//DB�� ������ �� �ְ� ���ִ� ��ü
	private PreparedStatement pstat; 			//DB�� ���� ���������� ���� ��ü
	private ResultSet result; 					//DB�� ������ ���� ��������� ���� ��ü
	
	public userDB_Access() {					//try-catch������ �Ͽ��� �ڵ����� DB�� ������ �� �ְ� �� �Ѵ�.
		try {
			String dbURL = "jdbc:mysql://localhost:3306/";	//�������� DB�� �ּ�
			String dbAccount = "";
			String dbPW = "";
			Class.forName("com.mysql.jdbc.Driver");				//mySQL�� ������ �� �ְ��ϴ� �Ű�ü ���̺귯��
			conn = DriverManager.getConnection(dbURL, dbAccount, dbPW); 	//������ ���̺귯���� �����ϰ� ���������� ����.
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public int login(String userID, String userPassword) {	//�α��� �õ����ִ� �Լ�.
		//user ���̺����� �ش� ������� ��й�ȣ�� ������ �� �ֵ��� �ϴ� ���ɾ�.
		//�̸� �ڵ忡�� �غ�� �������� ����ϵ��� �����ν� SQL Injection���� ��ŷ����� ����� �� �ִ�.
		String SQL = "SELECT userPassword FROM USER WHERE userID = ?";//���� �غ�
		try {
			pstat = conn.prepareStatement(SQL);  	//�غ�� ���� �ֱ�
			pstat.setString(1, userID);				// SQL���ڿ��� ? ��� �� ������ �������ش�.
			result = pstat.executeQuery(); 			//result�� DB ���� ��ȸ�� �� ����� ����ִ´�.
			
			if(result.next()) {						//����� ������ �� ����
				if(result.getString(1).equals(userPassword)) {		//result�� ������ userPassword�� ���� �� ����
					return 1; //�α��� ����.
				}
				return 0; //��й�ȣ�� Ʋ��.
			}
			return -1;		//���̵� �������� ����.
				
		} catch (Exception e) {
			e.printStackTrace();
		}	
		return -2; 			//�����ͺ��̽� ����
	}
	
	public int Ranking_list(){
		String SQL = "SELECT userID, account from USER ORDER BY account DESC"
		pstat = conn.prepareStatement(SQL);
		result = stat.executeQuery();
	}
	
	public int signup(User user) {
		String SQL = "INSERT INTO USER VALUES (?, ?, ?)";	//user���̺��� �� ���� ����ִ´�.
		try {
			pstat = conn.prepareStatement(SQL);
			pstat.setString(1, user.getUserID());
			pstat.setString(2, user.getUserPassword());
			pstat.setString(3, 500);
			return pstat.executeUpdate();			//0�̻��� ���� ��ȯ
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -1;			//�����ͺ��̽� ����
	}

	public int UpdateAccount(String userID, int account) {
		String SQL = "UPDATE USER SET account = ? WHERE userID = ?"
		pstat = conn.prepareStatement(SQL);
		pstat.setString(1, account);
		pstat.setString(2, userID);
	}

	public int delUser(User user) {
		String SQL = "DELETE FROM USER WHERE userID = ?";	//user���̺��� �� ���� ����ִ´�.
		try {
			pstat = conn.prepareStatement(SQL);
			pstat.setString(1, user.getUserID());
			return 1			//0�̻��� ���� ��ȯ
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -1;			//�����ͺ��̽� ����
	}
}
