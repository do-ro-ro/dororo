import psycopg2
import configReader

crInstacne = configReader.PropertiesObject()
serverURL = crInstacne.getProperty("URL", "serverURL")
connectionPort = crInstacne.getProperty("DB", "connectionPort")
connectionDB = crInstacne.getProperty("DB", "connectionDB")
postgresUserId = crInstacne.getProperty("DB", "postgresUserId")
postgresUserPassword = crInstacne.getProperty("DB", "postgresUserPassword")

class PostGresObject():
    def __init__(self):
        self.db = psycopg2.connect(host=serverURL, dbname=connectionDB, user=postgresUserId, password=postgresUserPassword, port=connectionPort)
        self.cursor = self.db.cursor()

    def __del__(self):
        self.db.close()
        self.cursor.close()

    def execute(self, query, args={}):
        self.cursor.execute(query, args)
        row = self.cursor.fetchall()
        return row

    def commit(self):
        self.cursor.commit()