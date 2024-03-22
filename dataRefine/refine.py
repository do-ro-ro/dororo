import os
import pandas as pd
import requests
import ConfigReader
import DatabaseObject

CR_INSTANCE = ConfigReader.PropertiesObject()    # config.ini의 정보를 읽어들이는 객체
API_KEY = CR_INSTANCE.get_property("KEY", "apiKey")    # ITS의 apiKey
POSTGRES_OBJECT = DatabaseObject.PostGresObject()    # db 연결과 쿼리 실행에 쓰일 객체

def convert_to_string_without_decimal(data_list):
    # 결과를 저장할 새로운 리스트
    converted_list = []
    for item in data_list:
        # item이 문자열이면서 .0을 포함하는 경우, 정수로 변환 후 문자열로
        if isinstance(item, float) and item.is_integer():
            converted_list.append(str(int(item)))
        elif isinstance(item, str) and '.0' in item:
            try:
                # 문자열에서 .0 제거를 시도
                numeric_value = float(item)
                if numeric_value.is_integer():
                    converted_list.append(str(int(numeric_value)))
                else:
                    converted_list.append(item)
            except ValueError:
                # 변환 실패시 원래 값 유지
                converted_list.append(item)
        else:
            converted_list.append(str(item))
    return converted_list

def get_accident():
    directory_path = './dolbal_data'
    acc_link_list = []    # 이벤트 유형이 "사고"인 데이터를 담을 리스트

    for file_name in os.listdir(directory_path):
        if file_name.startswith('Ac'):  # Ac_로 시작하는 파일 읽어오는 분기
            file_path = os.path.join(directory_path, file_name)
            try:
                df = pd.read_csv(file_path, encoding='EUC_KR', on_bad_lines='skip') # EUC_KR 인코딩으로 읽기 시도, 잘못된 행 무시
                f_column_data = df.iloc[:, 5]  # 5번째 열의 데이터를 가져옴(이벤트 유형)
                acc_df = df[f_column_data == '사고']    # 조건에 맞는 데이터만 필터링하여 리스트에 추가
                if not acc_df.empty:  # acc_df가 비어 있지 않은 경우에만 처리
                    acc_df_link_id_list = acc_df.iloc[:, 1].tolist()  # 'acc_df'의 두 번째 열 데이터 추출
                    temp_list = convert_to_string_without_decimal(acc_df_link_id_list)
                    for t in temp_list:
                        acc_link_list.append(t)
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
                acc_df_link_id_list = acc_df.iloc[:, 11].tolist()
                temp_list = convert_to_string_without_decimal(acc_df_link_id_list)
                for t in temp_list:
                    acc_link_list.append(t)
            except UnicodeDecodeError:
                print(f"Could not read {file_name} due to an encoding error.")
            except KeyError:
                print(f"The file {file_name} does not contain 'eventType' column.")

    return acc_link_list

def get_traffic():   # 교통량은 api를 통해 받아옴
    api_URL = "https://openapi.its.go.kr:9443/vdsInfo?apiKey=" + API_KEY + "&getType=json"
    res = requests.get(api_URL)
    parsed_res = res.json()
    data_list = parsed_res["body"]["items"]
    res_list = []
    for data in data_list:
        linkIds = data["linkIds"]
        volume = int(float(data["volume"]))    # linkIds에 해당하는 volumes
        linkIds_list = [str(x) for x in linkIds.split(',')]
        for i in range(len(linkIds_list)):
            res_list.append([linkIds_list[i], volume])

    return res_list

def do_query(param_list: list, query: str):    # POSTGRES_OBJECT를 이용해서 db 데이터 수정하는 로직
    for data in param_list:
        link_id = data[0]
        volume = data[1]  # 여기서 volume은 string이 아니라 integer 타입이어야 합니다.

        # 안전한 파라미터 바인딩을 사용합니다.
        # %s와 %s는 psycopg2에서 파라미터를 위한 placeholder입니다.
        # query에 들어갈 실제 값은 execute 함수의 두 번째 인자인 튜플에 들어갑니다.
        POSTGRES_OBJECT.execute(query, (volume, link_id))

def main():
    # accident_data_list = get_accident()
    # do_query(accident_data_list, "UPDATE links SET accident_volume = accident_volume + 1 WHERE link_id = %s")
    # traffic_data_list = get_traffic()
    # do_query(traffic_data_list, "UPDATE links SET traffic = traffic + %s WHERE link_id = %s")
    pass

if __name__ == "__main__":
    main()
