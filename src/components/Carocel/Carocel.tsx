import React from "react";
import useResponse from "./hooks/useResponse";
import useSlider from "./hooks/useSlideHandle";
import CarocelWrapper from "./components/CarocelWrapper";
import Items from "./components/Items";

export type ItemProp = {
  title: string;
  backdrop_path: string;
  id: number;
};

interface CarocelProps {
  itemCount?: number;
  data: ItemProp[];
  path: string;
}

const Carocel: React.FC<CarocelProps> = ({ path, itemCount = 3, data }) => {
  const slider = useSlider();
  const response = useResponse(itemCount);

  const singleSliderData = data.slice(
    2 + (slider.index - 1) * response.count,
    2 + response.count + (slider.index - 1) * response.count
  );

  return (
    <CarocelWrapper
      slider={slider}
      dataLength={data.length}
      response={response}
    >
      <Items path={path} singleSliderData={singleSliderData} />
    </CarocelWrapper>
  );
};

export default Carocel;
