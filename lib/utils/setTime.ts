const timeSet = (data: Date) => {
  const formattedDateTime: string = `${data.getFullYear()}-${
    (data.getMonth() + 1)
      .toString()
      .padStart(2, "0")
  }-${data.getDate().toString().padStart(2, "0")} ${
    data
      .getHours()
      .toString()
      .padStart(2, "0")
  }:${data.getMinutes().toString().padStart(2, "0")}`;

  return formattedDateTime;
};

export {timeSet};