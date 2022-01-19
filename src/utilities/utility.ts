import { BasicData, Warning } from "./../apis/types";
import { UseToastOptions } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";
type Image = "w500" | "original";

export const getId = () => Math.random().toString(20).substring(0, 12);

export const getImageUrl = (id: string, size: Image = "w500") =>
  `https://image.tmdb.org/t/p/${size}/${id}`;

export const textCutter = (text: string, length: number) =>
  text.length > length ? `${text.substring(0, length)}...` : text;

export const getVideoUrl = (key: string) =>
  `https://www.youtube.com/embed/${key}?autoplay=1&allowfullscreen&controls=2&showinfo-0&modesbranding=1`;

const querySuccessHandler = (warning: Warning) => {
  const toast = createStandaloneToast();
  const options: UseToastOptions = {
    title: warning.code,
    description: warning.message,
    status: "warning",
  };

  toast.closeAll();
  toast(options);
};

export const checkWarning = <T extends BasicData>(data: T) => {
  if (data.status_code && data.status_message) {
    querySuccessHandler({
      code: data.status_code,
      message: data.status_message,
    });
  }
};
