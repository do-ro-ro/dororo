import os
import pandas as pd

# CSV 파일이 저장된 디렉토리
directory_path = './dolbal_data'

# 원본 파일의 인코딩과 새 파일의 인코딩
original_encoding = 'utf-8'  # 예: 'cp949', 'euc-kr', 'utf-16', 등등
new_encoding = 'euc-kr'  # 새로 저장할 인코딩

# 디렉토리 내 모든 CSV 파일을 읽고 새 인코딩으로 저장
for file_name in os.listdir(directory_path):
    if file_name.startswith('[EVENT]'):
        file_path = os.path.join(directory_path, file_name)
        try:
            # 원본 인코딩으로 파일을 읽습니다.
            df = pd.read_csv(file_path, encoding=original_encoding, on_bad_lines='skip')
            # 새 인코딩으로 파일을 다시 저장합니다.
            df.to_csv(file_path, encoding=new_encoding, index=False)
            print(f"File {file_name} has been re-encoded to {new_encoding}")
        except UnicodeDecodeError:
            print(f"Could not read {file_name} due to an encoding error.")
        except Exception as e:
            print(f"An error occurred while processing {file_name}: {e}")