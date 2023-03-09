# Electricity_meter
# 전기 계량기 인식 프로젝트

## 1.개요
![Screenshot 2023-02-27 at 9 51 09 AM](https://user-images.githubusercontent.com/107936957/223613984-9705a61e-3c30-44b7-bfb9-b4efbccaa7bb.png)
중앙일보
![Screenshot 2023-02-27 at 9 58 09 AM](https://user-images.githubusercontent.com/107936957/223613995-a0558bab-d5b7-45c1-a54e-c8b4610b53df.png)
더스쿠프

세계적인 에너지 위기가 지속되고 있는 상황에서 정부 에너지 공급회사들의 재무 위기는 상황을 더 악화 시켰고 위기를 극복하기 위해서는 에너지 요금의 조정은 불가피하게 되었습니다.
30조라는 대규모 적자를 해소 하려면 현제 kWh당 19.3원 인상을 시작으로 kWh당 51.6원 까지 바라보고 있습니다. 4인기준 월 전기요금으로 환산하면 1만5841원에 해당합니다.
자영업을 하시는 분들께는 더욱 크게 다가올 것으로 생각됩니다.

## 2.주제
### 전기계량기 인식 및 관리 프로젝트
월별 중간중간 전기계량기의 수치를 입력시켜 전기요금을 계산하고 전년, 전월 대비 요금과 비교하여 
시각화하고 사용자가 미리 대비 할 수 있게 하는 것이 목표입니다.

## 3. 진행순서
1. **계량기 이미지 수집**
    계량기 이미지를 직접 촬영하여 수집
    ![Screenshot 2023-03-08 at 12 46 57 PM](https://user-images.githubusercontent.com/107936957/223614623-a335806c-654d-4230-b18c-dfddfc4f7cf9.png)

2. **숫자 라벨링**
    CVAT를 이용한 라벨링 작업
    
3. **수치인식 및 계산**  
    전월 누적 수전 유효전력량 - 현재 누적 수전 유효 전력량
    
4. **전기요금 계산**    
    다양한 전기요금 계산식을 통해 인식시킨 수치를 바탕으로 계산하도록 합니다.
    
5. **웹 서비스화**\
    웹을 통해 계산한 전기요금을 사용자가 볼 수 있도록 월, 년, 평균 등 여러 수치의 차트로 구현 할 것입니다.
    
    
### time tabel   
2023.03.07 프로젝트 계획 발표 및 시작
- 2023.03.07 데이터 수집 완료(image resize 680, 510)
- 2023.03.08 labeling 완료
- 2023.03.09 YOLOv5 모델 학습완료\
    accurancy 0.65 미만
    - 개선방안\
        데이터 추가 수집\
        OCR시도\
        CNN으로 전환
