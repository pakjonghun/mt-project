## 프로젝트 이름 : MT(MovieTV)
- 노마드코더 react 인강을 보고 참고해서 만들었습니다.
---

## 설명

영화와 드라마 컨텐츠 내용 쉽게 찾아볼 수 있는 프로젝트 입니다.</br>

## 기술스택

react,
react-query, redux
tailwindcss

## 잘만들었다고 생각하는 이유

- 고민해서 기술스택을 적용함.
  - react-query : 자동으로 캐쉬화가 되어서 성능이 향상됨.
  - redux : chrome redux 디버깅 툴을 이용하여 스테이트 추적 관리가 편함.
  - tailwindcss : 비교적 작업속도가 빠르며, 똑같지 않는 스타일링이 가능함.

- 문제 해결을 위해서 고민함.
  - 스크롤시 리스트가 많아지면 끊기는 문제 해결을 위해 고민.
    - 처음에는 불필요한 작업을 수행하는줄 알고 코드 구조에서 원인을 찾으려고 함
    - 구글링 결과 비슷한 문제를 해결한 경우를 검색 하여 적용
    - react-query 의 useInfinity 훅 사용(캐쉬적용)
    - 화면에 보이지 않는 부분은 display:none 으로 처리(windowing 적용)</br>
  - 페이지네이션을 적용할때 다음페이지 에서 로딩 화면이 발생
    - react-query 의 preFetch 기능 활용</br>
  - iframe 태그가 로딩되는동안 화면이 끊기는 문제
    - 일정시간동안 기본이미지가 뜨도록 함</br>
  - 타입 및 구문이 중복되는 문제
    - try catch 구문은 react-query 의 onError에서 공통으로 처리
    - 중복되는 타입은 interface 의 상속 기능을 사용했다가 type 의 & 를 이용해서 최소화함
    - 공통으로 사용되는 훅을 별도로 만들어서 재사용(화면 너비 높이 측정)</br>
- 계속 문제점을 찾아서 고쳐나감
  - 중복되는 기능, 코드 최소화
  - 중복되는 컴포넌트 쪼개기</br>

## 해결해야 할 문제

- 여전히 무한로딩시 약간씩 끊김이 남아 있음.
- API_KEY 가 코드에 노출되어 있음(.env 에 숨겼다가 배포시 오류가 발생해서 코드에 넣었음. 현재 노출되있는 상태.)
- type 중복이 남아있음(계속 줄여보았으나 api 에서 타입이 맞지 않거나 데이터가 없는 부분이 있음)
- tailwindcss 로 div 배경화면을 다이나믹하게 부여할 수가 없었음.
  - styled-component와 같이 사용할 수도 있다고 하는데 중복되는 기능이 있어서 tailwindcss 만 적용
  - 현재는 styled 프롭스에 변경되는 이미지가 들어가 있음.
- 화면 반응형을 두가지 방법으로 중복 적용중임(react hook 으로 화면 변환 감지, tailwindcss 의 반응형 class 이용)</br>

## 관심사항

- 최적화(styled props에 넣어준 값은 꼭 useMemo 를 사용할 필요는 없다. 성능에 문제가 될때만 사용한다.)
- react-virtualized 에서 grid 방식의 무한스크롤은 권장하고 있지는 않았다(사용예가 별로 없고, 사용간 오히려 성능이 떨어진다며 제약사항도 보였음.)
- 그러나 grid 방식이 넓은 화면을 제대로 활용 할 수 있다고 생각해서 grid 방식으로 적용했다.
- 그리고 리스트가 많아질 때 화면끊임이 조금 더 개선되었다.

```
<WindowScroller>
      {({ height, scrollTop, isScrolling, onChildScroll }) => (
        <div className="mx-auto pt-10">
          <Header
            term={term}
            searchTareget={searchTareget}
            totalResult={totalResult}
            onSelected={onSelected}
          />
          <AutoSizer disableHeight>
            {({ width }) => (
              <Grid
                deferredMeasurementCache={cache}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
                autoHeight
                height={height}
                width={width}
                columnCount={colCount}
                columnWidth={width / colCount}
                overscanRowCount={0}
                rowCount={Math.ceil(itemCount / colCount)}
                onScroll={onChildScroll}
                cellRenderer={renderChild}
                rowHeight={cache.rowHeight}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </WindowScroller>
```

- 캐슁은 react-query를 사용하면 좋다는 생각을 했다. infinity-scroll 기능을 별도로 제공하고 있다.

```
const { isLoading, data, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery<TMDBData<MTType[]>>(
      [Paths.search, term],
      ({ pageParam = page }) => search(term, searchTarget, { pageParam }),
      {
        getNextPageParam: (last) => last.page + 1 || undefined,
        onSuccess: (data) => checkWarning(data.pages[data.pages.length - 1]),
      }
    );
```
