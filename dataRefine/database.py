import psycopg2
import configReader

class PostGresObject():
    def __init__(self):
        self.db = psycopg2.connect(host=configReader["URL"]["serverURL"], dbname='dororo_test',user=configReader["KEY"]["postgreUserId"], password=configReader["KEY"]["postgreUserPassword"], port=configReader["URL"]["serverPort"])
        self.cursor = self.db.cursor()

    def __del__(self):
        self.db.close()
        self.cursor.close()

    def execute(self,query,args={}):
        self.cursor.execute(query,args)
        row = self.cursor.fetchall()
        return row

    def commit(self):
        self.cursor.commit()