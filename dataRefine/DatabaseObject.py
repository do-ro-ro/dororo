import psycopg2
import ConfigReader

CR_INSTANCE = ConfigReader.PropertiesObject()
SERVER_URL = CR_INSTANCE.get_property("URL", "serverURL")
CONNECTION_PORT = CR_INSTANCE.get_property("DB", "connectionPort")
CONNECTION_DB = CR_INSTANCE.get_property("DB", "connectionDB")
POSTGRES_USER_ID = CR_INSTANCE.get_property("DB", "postgresUserId")
POSTGRES_USER_PASSWORD = CR_INSTANCE.get_property("DB", "postgresUserPassword")

class PostGresObject():
    def __init__(self):
        self.db = psycopg2.connect(host=SERVER_URL, dbname=CONNECTION_DB, user=POSTGRES_USER_ID, password=POSTGRES_USER_PASSWORD, port=CONNECTION_PORT)
        self.cursor = self.db.cursor()

    def __del__(self):
        self.cursor.close()
        self.db.close()

    def execute(self, query, args=None):
        try:
            self.cursor.execute(query, args)
            # 변경 쿼리(INSERT, UPDATE, DELETE) 후에는 fetchall()을 호출하지 않습니다.
            # fetchall()은 SELECT 쿼리의 결과를 가져올 때 사용합니다.
            # UPDATE 쿼리의 경우, 커밋만 하면 됩니다.
            self.db.commit()
        except Exception as e:
            print(f"An error occurred: {e}")
            self.db.rollback()
            # 오류 발생 시 롤백

    def commit(self):
        self.db.commit()