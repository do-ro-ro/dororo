import os
import pandas as pd
import requests
import ConfigReader
import DatabaseObject

CR_INSTANCE = ConfigReader.PropertiesObject()    # config.ini의 정보를 읽어들이는 객체
API_KEY = CR_INSTANCE.get_property("KEY", "apiKey")    # ITS의 apiKey
POSTGRES_OBJECT = DatabaseObject.PostGresObject()    # db 연결과 쿼리 실행에 쓰일 객체

def get_accident():
    directory_path = './dolbal_data'
    dataframes_list = []    # 이벤트 유형이 "사고"인 데이터를 담을 리스트

    for file_name in os.listdir(directory_path):
        if file_name.startswith('Ac'):  # Ac_로 시작하는 파일 읽어오는 분기
            file_path = os.path.join(directory_path, file_name)
            try:
                df = pd.read_csv(file_path, encoding='EUC_KR', on_bad_lines='skip') # EUC_KR 인코딩으로 읽기 시도, 잘못된 행 무시
                f_column_data = df.iloc[:, 5]  # 5번째 열의 데이터를 가져옴(이벤트 유형)
                acc_df = df[f_column_data == '사고']    # 조건에 맞는 데이터만 필터링하여 리스트에 추가
                dataframes_list.append(acc_df)
            except UnicodeDecodeError:
                print(f"Could not read {file_name} due to an encoding error.")
            except KeyError:
                print(f"The file {file_name} does not contain 'eventType' column.")
        elif file_name.startswith('[EVENT]'):   # [EVENT]로 시작하는 파일 읽어오는 분기
            file_path = os.path.join(directory_path, file_name)
            try:
                df = pd.read_csv(file_path, encoding='EUC_KR', on_bad_lines='skip') # EUC_KR 인코딩으로 읽기 시도, 잘못된 행 무시
                f_column_data = df.iloc[:, 7]  # 7번째 열의 데이터를 가져옴(이벤트 유형)
                acc_df = df[f_column_data == '사고']    # 조건에 맞는 데이터만 필터링하여 리스트에 추가
                dataframes_list.append(acc_df)
            except UnicodeDecodeError:
                print(f"Could not read {file_name} due to an encoding error.")
            except KeyError:
                print(f"The file {file_name} does not contain 'eventType' column.")
        print("개수: " + str(len(dataframes_list)))

    return dataframes_list

def get_traffic():   # 교통량은 api를 통해 받아옴
    api_URL = "https://openapi.its.go.kr:9443/vdsInfo?apiKey=" + API_KEY + "&getType=json"
    res = requests.get(api_URL)
    parsed_res = res.json()
    data_list = parsed_res["body"]["items"]
    for data in data_list:
        print(data)

    return data_list

def do_insert(accident_data_list: list, traffic_data_list: list):    # POSTGRES_OBJECT를 이용해서 db 데이터 수정하는 로직
    pass

def main():
    accident_data_list = get_accident()
    traffic_data_list = get_traffic()

if __name__ == "__main__":
    main()
