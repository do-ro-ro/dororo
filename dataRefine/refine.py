import os
import pandas as pd
import requests
import configReader

crInstacne = configReader.PropertiesObject()
apiKey = crInstacne.getProperty("KEY", "apiKey")

def getAccident():
    # for data in dataframes_list:
    #     print(data)
    directory_path = './dolbal_data'
    dataframes_list = []

    for file_name in os.listdir(directory_path):
        if file_name.startswith('Ac'):
            file_path = os.path.join(directory_path, file_name)
            try:
                # CP949 인코딩으로 읽기 시도, 잘못된 행 무시
                df = pd.read_csv(file_path, encoding='EUC_KR', on_bad_lines='skip')
                f_column_data = df.iloc[:, 5]  # 'F' 열의 데이터를 가져옵니다.
                # 조건에 맞는 데이터만 필터링하여 리스트에 추가합니다.
                acc_df = df[f_column_data == '사고']
                dataframes_list.append(acc_df)
            except UnicodeDecodeError:
                print(f"Could not read {file_name} due to an encoding error.")
            except KeyError:
                print(f"The file {file_name} does not contain 'eventType' column.")
        if file_name.startswith('[EVENT]'):
            file_path = os.path.join(directory_path, file_name)
            try:
                # CP949 인코딩으로 읽기 시도, 잘못된 행 무시
                df = pd.read_csv(file_path, encoding='EUC_KR', on_bad_lines='skip')
                f_column_data = df.iloc[:, 7]  # 'F' 열의 데이터를 가져옵니다.
                # 조건에 맞는 데이터만 필터링하여 리스트에 추가합니다.
                acc_df = df[f_column_data == '사고']
                dataframes_list.append(acc_df)
            except UnicodeDecodeError:
                print(f"Could not read {file_name} due to an encoding error.")
            except KeyError:
                print(f"The file {file_name} does not contain 'eventType' column.")
        print("개수: " + str(len(dataframes_list)))

def getTraffic():
    apiURL = "https://openapi.its.go.kr:9443/vdsInfo?apiKey=" + apiKey + "&getType=json"
    res = requests.get(apiURL)
    parsedRes = res.json()
    data_list = parsedRes["body"]["items"]
    for data in data_list:
        print(data)

def main():
    # getAccident()
    # getTraffic()
    pass

if __name__ == "__main__":
    main()
