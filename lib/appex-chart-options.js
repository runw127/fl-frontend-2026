export const getYAxisConfig = (colors) => ({
  labels: getLabel(colors),
});

export const getXAxisConfig = (colors) => ({
  categories: [
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ],
  labels: getLabel(colors),
  axisBorder: {
    show: false,
  },
  axisTicks: {
    show: false,
  }

});

export const getLabel = (colors) => ({
  style: {
    colors: colors,
    fontFamily: "Inter",
  },
});

export const getGridConfig = (colors) => ({
  show: true,
  borderColor: colors,
  strokeDashArray: 10,
  position: "back",
});
