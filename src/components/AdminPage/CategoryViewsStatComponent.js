import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getAllCategoryViews } from "../../services/categoriesService";

// // utitly method
// const randomColorArrayGenerator = (length) => {
//   const colorsArray = [];
//   for (let i = 0; i < length; i += 1) {
//     colorsArray.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
//   }
//   console.log(colorsArray);
//   return colorsArray;
// };
export const CategoryViewsStatComponent = () => {
  const [categoryViewsData, setCategoryViewsData] = useState();
  const [charData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Category View Stats",
        backgroundColor: [],
        data: [],
      },
    ],
  });
  useEffect(async () => {
    const response = await getAllCategoryViews();
    setCategoryViewsData(response.data);
  }, []);

  useEffect(() => {
    if (categoryViewsData) {
      setChartData({
        labels: categoryViewsData.map((data) => data["category.name"]),
        datasets: [
          {
            label: "Category View Stats",
            backgroundColor: [
              "#32a85a",
              "#2f31a3",
              "#2e72a6",
              "#2da82f",
              "#9e2ba6",
              "#c2465d",
              "#c2af44",
              "#de7233",
              "#473f3f",
            ],
            hoverBorderColor: "black",
            data: categoryViewsData.map((data) => data.categoryTotalViewCount),
          },
        ],
      });
    }
  }, [categoryViewsData]);
  return !categoryViewsData ? null : (
    <div>
      <Pie
        data={charData}
        options={{
          title: {
            display: true,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};
