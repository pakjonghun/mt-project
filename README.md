## MT(MovieTv)

## Description

영화와 드라마 컨텐츠 내용 쉽게 찾아볼 수 있는 프로젝트 입니다.

## 해야 할 일

- [ ] react-query 로 훅을 만들어서 일일히 캐쉬에 있는 데이터 갖고오는게 나은지 리덕스로 관리하는게 나은지 리덕스로 관리해도 캐쉬를 알아서 갖고 오게 만드는 방법은 없는지? 아니면 알아서 갖고 오는지 확인해야함
- [ ] 주소 기반 모달창의 중복인 경우 -> 홈에서 모달 열때, 영화 , 드라마에서 모달 열때 각각 주소를 어떻게 줄 건지 같은 주소를 줘도 상관없이 작동 하는지 확인해야함.
- [ ] 테일윈드에서 @layer 에서 태그별 클레스 지정 방법, 테그별 속성 지정 방법 이 작동을 안한ㄴ데 확인해야 한다.

## 개선예정

- 리덕스 -> 레코일
- useInfinityQuery 사용 개선
  - 마지막 페이지를 인직 못한다 마지막에서 계속 페이지에서 +1 을 하면서 통신을 함.
  - 리덕스에 저장하는 시점을 알지 못한다. useEffect dependency 에 먼가 더 넣어줘야 할 것 같다.
  - 검색 결과에 타입이 tv movie 가 아닌것도 다 뜬다. 이건 없애야 함.
  - 모달창이 안열리는 이유가 리덕스 저장 시점을 알지 못해서? 저장이 잘 안되서 인것 같다 확인해야 한다.
