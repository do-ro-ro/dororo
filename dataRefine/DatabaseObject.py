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

    def execute(self, query, args={}):
        self.cursor.execute(query, args)
        return self.cursor.fetchall()

    def commit(self):
        self.db.commit()