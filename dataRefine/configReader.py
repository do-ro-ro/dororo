import configparser as cp

class PropertiesObject():
    def __init__(self):
        self.properties = cp.ConfigParser()
        self.properties.read("config.ini")

    def getProperty(self, section, key):
        return self.properties.get(section, key)
